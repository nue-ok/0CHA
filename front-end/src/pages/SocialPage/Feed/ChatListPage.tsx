import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import BottomNav from '../../../components/Common/BottomNav';
import Header from '../../../components/Common/Header';
import TextArea from '../../../components/Common/TextArea';
import Button from '../../../components/Common/Button';
import Image from '../../../components/Common/Image';
import Conversation from '../../../components/SNS/Conversation'; // 최근 채팅

import test from '../../../asset/img/testImg.png';
import { SnsChatList } from '../../../lib/api/sns-api';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    overflow: auto;
    padding: 57px 25px 68px 25px;
  `,
  NoChatMessage: styled.div`
    text-align: center;
    color: ${(props) => props.theme.textColor};
    margin-top: 20px;
    font-size: 14px;
    font-weight: 600;
  `,
};

interface Chat {
  userId: number;
  profileImage: string | null;
  nickname: string;
  lastMessage: string;
  roomId: number;
}

const ChatListPage = (): JSX.Element => {
  const [chatList, setChatList] = useState<Chat[]>([]);
  const user = localStorage.getItem('user');
  const parsedUser = user ? JSON.parse(user) : null;

  const getChatList = async () => {
    if (parsedUser && parsedUser.id) {
      await SnsChatList(
        (resp) => {
          setChatList(resp.data);
        },
        (err) => {
          console.log(err);
        },
      );
    }
  };

  useEffect(() => {
    getChatList();
  }, []);

  return (
    <>
      <Header text="채팅 목록" />
      <s.Container>
        {chatList.length > 0 ? (
          chatList.map((chat) => (
            <Conversation
              key={chat.userId}
              profileImage={chat.profileImage || test} // profileImage가 null이면 기본 이미지 사용
              nickname={chat.nickname}
              lastMessage={chat.lastMessage || '최근 메시지가 없습니다.'}
              roomId={chat.roomId || 1}
              userId={chat.userId}
            />
          ))
        ) : (
          <s.NoChatMessage>현재 진행 중인 채팅이 없습니다.</s.NoChatMessage>
        )}
      </s.Container>

      <BottomNav />
    </>
  );
};

export default ChatListPage;
