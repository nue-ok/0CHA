import React from 'react';
import styled from 'styled-components';

const s = {
  Container: styled.section`
    height: 40px;
    display: flex;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 25px;
  `,
  MyChat: styled.div`
    background-color: ${(props) => props.theme.subColor};
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    font-weight: 500;
    max-width: 70%;
    padding: 15px;
    display: inline-block;
    overflow: break-word;
    word-break: break-all;
    border-radius: 10px;
    margin: 10px 0;
  `,
  YourChat: styled.div`
    background-color: ${(props) => props.theme.mainColor};
    color: ${(props) => props.theme.bgColor};
    font-size: 14px;
    font-weight: 500;
    max-width: 70%;
    padding: 15px;
    display: inline-block;
    overflow: break-word;
    word-break: break-all;
    border-radius: 10px;
    margin: 10px 0;
  `,
  MyChatArea: styled.div`
    display: flex;
    justify-content: end;
  `,
  YourChatArea: styled.div`
    display: flex;
  `,
  text: styled.div`
    display: inline-block;
  `,
};

interface CommentProps {
  isMyChat: boolean;
  content: string;
}

const Chat = (props: CommentProps): JSX.Element => {
  const { isMyChat, content } = props;
  return (
    <>
      {isMyChat === true ? (
        <s.MyChatArea>
          <s.MyChat>{content}</s.MyChat>
        </s.MyChatArea>
      ) : (
        <s.YourChatArea>
          <s.YourChat>{content}</s.YourChat>
        </s.YourChatArea>
      )}
    </>
  );
};

export default Chat;
