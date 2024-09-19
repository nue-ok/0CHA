import React from 'react';
import styled from 'styled-components';
import Input from '../Common/Input';
import Button from '../Common/Button';

const s = {
  Container: styled.div`
    width: 90%;
  `,
  InfoNameBox: styled.div`
    width: 100%;
    display: flex;
    justify-content: left;
  `,
  InputHeader: styled.p`
    text-align: left;
    /* width: 90px; */
    color: ${(props) => props.theme.textColor};
    margin-bottom: 5px;
    font-size: 16px;
  `,
  InputArea: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  `,
  InputBox: styled.div`
    flex: 1;
    margin-right: 10px;
  `,
  InputBtn: styled.div`
    flex-shrink: 0;
  `,
  ErrorText: styled.p`
    color: ${(props) => props.theme.mainColor};
    font-size: 12px;
    margin-left: 10px;
    margin-top: 5px;
  `,
  ExistedTest: styled.p`
    color: ${(props) => props.theme.mainColor};
    font-size: 12px;
    margin-bottom: 10px;
  `,
};

interface EmailAreaProps {
  email: string;
  verificationCode: string;
  emailError: string;
  verificationBtnText: string;
  verificationBtnType: string;
  confirmBtnText: string;
  confirmBtnType: string;
  emailInfoMessage?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendVerificationCode: () => void;
  onCheckVerificationCode: () => void;
}

const EmailArea: React.FC<EmailAreaProps> = ({
  email,
  verificationCode,
  emailError,
  verificationBtnText,
  verificationBtnType,
  confirmBtnText,
  confirmBtnType,
  emailInfoMessage,
  onChange,
  onSendVerificationCode,
  onCheckVerificationCode,
}) => {
  return (
    <s.Container>
      <s.InfoNameBox>
        <s.InputHeader children="이메일" />
        {emailError && <s.ErrorText>{emailError}</s.ErrorText>}
      </s.InfoNameBox>
      <s.InputArea>
        <s.InputBox>
          <Input
            width="100%"
            height="40px"
            placeholder="이메일을 입력해주세요."
            type="text"
            name="email"
            value={email}
            onChange={onChange}
          />
        </s.InputBox>
        <s.InputBtn>
          <Button
            width="85px"
            height="40px"
            type={verificationBtnType}
            children={verificationBtnText}
            onClick={onSendVerificationCode}
            bold="500"
            size="12px"
          />
        </s.InputBtn>
      </s.InputArea>
      {emailInfoMessage && <s.ExistedTest children={emailInfoMessage} />}
      <s.InfoNameBox>
        <s.InputHeader children="인증번호" />
      </s.InfoNameBox>
      <s.InputArea>
        <s.InputBox>
          <Input
            width="100%"
            height="40px"
            placeholder="인증번호 6자리 입력"
            type="text"
            name="verificationCode"
            value={verificationCode}
            onChange={onChange}
          />
        </s.InputBox>
        <s.InputBtn>
          <Button
            width="85px"
            height="40px"
            type={confirmBtnType}
            children={confirmBtnText}
            onClick={onCheckVerificationCode}
            bold="500"
          />
        </s.InputBtn>
      </s.InputArea>
    </s.Container>
  );
};

export default EmailArea;
