import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router';
import BottomNav from '../../../components/Common/BottomNav';
import Button from '../../../components/Common/Button';
import Image from '../../../components/Common/Image';
import IconSvg from '../../../components/Common/IconSvg';
import Input from '../../../components/Common/Input';
import Chat from '../../../components/SNS/Chat';
import { ReactComponent as back } from '../../../asset/img/svg/back.svg';
import { SnsChatEnter, SnsChat, UserPage } from '../../../lib/api/sns-api';
import testImg from '../../../asset/img/testImg.png';

import SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';

// 스타일드 컴포넌트를 사용해 UI 요소 스타일링
const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    overflow: auto;
    padding: 57px 25px 138px 25px;
  `,
  ProfileText: styled.div`
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    font-weight: 400;
    margin-left: 15px;
  `,
  ProfileArea: styled.div`
    display: flex;
    align-items: center;
    margin-left: 20px;
    cursor: pointer;
  `,
  ChatHeader: styled.section`
    max-width: 800px;
    width: 100%;
    height: 57px;
    position: fixed;
    display: flex;
    align-items: center;
    padding: 0 10px;
    background-color: ${(props) => props.theme.bgColor};
  `,
  InputArea: styled.div`
    height: 70px;
    background-color: ${(props) => props.theme.bgColor};
    width: 100%;
    display: flex;
    align-items: center;
  `,
  Input: styled.div`
    flex: 1 0 auto;
  `,
  Send: styled.div`
    width: 100%;
    max-width: 800px;
    padding: 0 15px;
    position: fixed;
    bottom: 68px;
  `,
  LoadingMessage: styled.div`
    color: ${(props) => props.theme.textColor};
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
    font-weight: 500;
  `,
};

// 채팅 페이지 컴포넌트
const ChatPage = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = useParams<{ userId: string }>();

  // 상태 변수: 닉네임과 프로필 이미지
  const [nickname, setNickname] = useState<string | null>(location.state?.nickname || null);
  const [profileImage, setProfileImage] = useState<string | null>(location.state?.profileImage || null);

  // 상태 변수: 메시지 목록과 현재 작성 중인 메시지
  const [messages, setMessages] = useState<{ senderId: number; message: string }[]>([]);
  const [messageContent, setMessageContent] = useState('');
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 추가

  // 상태 변수: 채팅방 ID
  const roomIdRef = useRef<number | null>(null);

  // Ref for the container to scroll
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 로컬 스토리지에서 현재 사용자 ID 가져오기
  const currentUserId = (() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      return user.id;
    }
    return null;
  })();

  // 사용자 정보 로드 및 초기 설정
  useEffect(() => {
    if (!currentUserId || userId === String(currentUserId)) {
      navigate(-1);
      return;
    }

    const fetchUserInfo = async () => {
      if (userId) {
        try {
          await UserPage(
            parseInt(userId, 10),
            (resp) => {
              setProfileImage(
                'https://i11b310.p.ssafy.io/images/' + resp.data.profileImage.split('/home/ubuntu/images/')[1],
              );
              setNickname(resp.data.nickname);
            },
            (err) => {
              console.log(err);
            },
          );
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      }
    };

    fetchUserInfo();
  }, [userId, location.state]);

  // 채팅방에 들어가는 함수
  const enterChatRoom = async (): Promise<number | null> => {
    if (userId) {
      try {
        const response = await SnsChatEnter(
          parseInt(userId, 10),
          (resp) => {
            roomIdRef.current = resp.data;
          },
          (err) => {
            console.log(err);
          },
        );
        return roomIdRef.current;
      } catch (error) {
        console.log('Error entering chat room:', error);
      }
    }
    return null;
  };

  // 이전 채팅 내역 가져오기
  const loadChatHistory = async (roomId: number) => {
    try {
      await SnsChat(
        roomId,
        (resp) => {
          setMessages(resp.data); // 서버에서 가져온 메시지 기록을 상태에 저장
          setLoading(false); // 로딩 상태 해제
          scrollToBottom(); // 채팅 내역을 불러온 후 스크롤을 맨 아래로 이동
        },
        (err) => {
          setLoading(false); // 오류 발생 시에도 로딩 상태 해제
        },
      );
    } catch (error) {
      setLoading(false); // 오류 발생 시에도 로딩 상태 해제
    }
  };

  // WebSocket 연결 설정
  useEffect(() => {
    const connectWebSocket = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!accessToken || !refreshToken) {
        return;
      }

      // SockJS와 STOMP 클라이언트 초기화
      const socket = new SockJS('/api/ws'); // SockJS 엔드포인트 설정 + 개발 환경에서는 /proxy/ws 더해주기
      const client = new Client({
        webSocketFactory: () => socket, // SockJS를 WebSocket으로 사용
        connectHeaders: {
          Authorization: `Bearer ${accessToken}`, // JWT 토큰을 Authorization 헤더에 포함
          RefreshToken: refreshToken, // RefreshToken을 헤더에 포함
        },
        debug: (str: string) => {
          console.log(str); // 디버그 메시지 출력
        },
        onConnect: async (frame) => {
          // enterChatRoom이 완료된 후 roomId를 사용하여 구독
          const roomId = await enterChatRoom();

          if (roomId) {
            await loadChatHistory(roomId); // 채팅방에 들어간 후 채팅 내역 로드

            client.subscribe(`/topic/chat/${roomId}`, (message: IMessage) => {
              showMessage(JSON.parse(message.body));
            });
          } else {
            setLoading(false); // 오류 발생 시 로딩 상태 해제
          }
        },
        onStompError: (frame) => {
          setLoading(false); // 오류 발생 시 로딩 상태 해제
        },
      });

      // STOMP 클라이언트 활성화
      client.activate();
      setStompClient(client);

      // 컴포넌트가 언마운트될 때 WebSocket 연결 해제
      return () => {
        if (client) {
          client.deactivate();
        }
      };
    };

    connectWebSocket();
  }, [userId]);

  // 메시지를 화면에 표시하는 함수
  const showMessage = (message: { senderId: number; message: string; sendAt: string }) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  // 메시지를 추적해 변화가 생기면 스크롤을 맨 아래로
  useEffect(() => {
    scrollToBottom(); // 새로운 메시지가 추가되면 스크롤을 맨 아래로 이동
  }, [messages]);

  // 메시지를 전송하는 함수
  const sendMessage = () => {
    if (!stompClient || !roomIdRef.current) {
      console.error('WebSocket is not connected or roomId is not set');
      return;
    }

    if (messageContent) {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!accessToken || !refreshToken) {
        console.error('No access or refresh token found in localStorage');
        return;
      }

      const sendAt = new Date().toISOString(); // 현재 시간을 ISO 형식으로 가져오기

      stompClient.publish({
        destination: `/app/chat/${roomIdRef.current}`, // 메시지를 전송할 목적지
        body: JSON.stringify({
          senderId: currentUserId,
          message: messageContent,
          sendAt: sendAt, // 현재 시간을 함께 전송
        }),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          RefreshToken: refreshToken,
        },
      });

      setMessageContent(''); // 전송 후 입력 필드 초기화
    }
  };

  // 스크롤을 맨 아래로 이동하는 함수
  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  // 프로필 페이지로 이동하는 함수
  const handleMovePage = (): void => {
    navigate(`/sns/profile/${userId}`);
  };

  // 메시지 입력 필드 값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageContent(e.target.value);
  };

  return (
    <>
      <s.ChatHeader>
        <IconSvg width="25" height="25" Ico={back} cursor="pointer" onClick={() => navigate(-1)} />
        <s.ProfileArea onClick={handleMovePage}>
          <Image width="40px" height="40px" src={profileImage || testImg} />
          <s.ProfileText>{nickname}</s.ProfileText>
        </s.ProfileArea>
      </s.ChatHeader>

      <s.Container ref={containerRef}>
        {loading ? (
          <s.LoadingMessage>
            채팅방 로딩중입니다. <br /> 잠시만 기다려 주세요.
          </s.LoadingMessage>
        ) : (
          messages.map((msg, index) => (
            <Chat key={index} isMyChat={msg.senderId === currentUserId} content={msg.message} />
          ))
        )}
      </s.Container>

      <s.Send>
        <s.InputArea>
          <s.Input>
            <Input width="100%" height="40px" placeholder="내용 입력" value={messageContent} onChange={handleChange} />
          </s.Input>
          <Button
            width="64px"
            height="40px"
            size="14px"
            bold="500"
            type="main"
            margin="0 0 0 10px"
            onClick={sendMessage}
          >
            전송
          </Button>
        </s.InputArea>
      </s.Send>

      <BottomNav />
    </>
  );
};

export default ChatPage;
