import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../../../components/Common/Input';
import Button from '../../../components/Common/Button';
import Header from '../../../components/Common/Header';
import { useLocation, useNavigate } from 'react-router';
import { resetPw } from '../../../lib/api/user-api';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  ChangePasswordArea: styled.div`
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 60px 10px 70px;
  `,
  PasswordArea: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  `,
  InputArea: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  `,
  InputHeader: styled.p`
    text-align: left;
    /* width: 90px; */
    color: ${(props) => props.theme.textColor};
    margin-bottom: 5px;
    font-size: 16px;
  `,
  BetweenText: styled.span`
    color: ${(props) => props.theme.textColor};
    font-size: 16px;
  `,
  ButtonArea: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  `,
  InputBox: styled.div`
    flex: 1;
    margin-right: 10px;
  `,
  InputButton: styled.div`
    flex-shrink: 0;
  `,
  InfoNameBox: styled.div`
    width: 100%;
    display: flex;
    justify-content: left;
  `,
  ErrorText: styled.p`
    color: ${(props) => props.theme.mainColor};
    font-size: 12px;
    margin-left: 5px;
  `,
};

interface dataType {
  pw: string;
  pwCheck: string;
}

const ResetPasswordPage = (): JSX.Element => {
  const navigate = useNavigate();
  const email = useLocation().state?.email;
  const [data, setData] = useState<dataType>({
    pw: '',
    pwCheck: '',
  });

  // 비밀번호
  const [pwError, setPwError] = useState('');
  const [pwCheckError, setPwCheckError] = useState('');

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // 비밀번호 필드
    if (name === 'pw') {
      const pwRegex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[~!@#$%^&*()])[a-zA-Z0-9~!@#$%^&*()]+$/;
      if (value.length === 0) {
        setPwError('');
      } else if (!pwRegex.test(value) || value.length < 8) {
        setPwError('영소문자, 숫자, 특수문자를 포함한 8~16자로 입력하세요.');
      } else {
        setPwError('');
      }
      if (value.length === 16) {
        return;
      }
    }

    // 비밀번호 확인 필드
    if (name === 'pwCheck') {
      if (value.length !== 0) {
        if (value === data.pw) {
          setPwCheckError('');
        } else {
          setPwCheckError('비밀번호가 틀립니다.');
        }
      } else {
        setPwCheckError('');
      }
    }

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    // 입력 조건을 모두 충족한 경우
    if (data.pw.length !== 0 && data.pwCheck.length !== 0 && pwError === '' && pwCheckError === '') {
      const param = {
        email,
        password: data.pw,
      };
      await resetPw(
        param,
        (resp) => {
          alert('비밀번호가 변경되었습니다.');
          navigate('/login');
        },
        (error) => {},
      );
    } else {
      // 입력 조건을 미충족한 경우
    }
  };

  return (
    <s.Container>
      <Header text="비밀번호 변경" onBack={() => navigate('../../login')} />
      <s.ChangePasswordArea>
        <s.PasswordArea>
          <s.InfoNameBox>
            <s.InputHeader children="비밀번호" style={{ minWidth: '60px' }} />
            {pwError && <s.ErrorText>{pwError}</s.ErrorText>}
          </s.InfoNameBox>
          <s.InputArea>
            <Input
              width="100%"
              height="40px"
              placeholder="비밀번호"
              margin="5px auto"
              type="password"
              name="pw"
              value={data.pw}
              onChange={handleChangeValue}
            />
          </s.InputArea>
          <s.InfoNameBox>
            <s.InputHeader children="비밀번호 확인" />
            {pwCheckError && <s.ErrorText>{pwCheckError}</s.ErrorText>}
          </s.InfoNameBox>
          <s.InputArea>
            <Input
              width="100%"
              height="40px"
              placeholder="비밀번호 확인"
              margin="5px auto"
              type="password"
              name="pwCheck"
              value={data.pwCheck}
              onChange={handleChangeValue}
            />
          </s.InputArea>
        </s.PasswordArea>

        <s.ButtonArea>
          <Button width="48%" height="40px" children="이전" onClick={() => navigate('../../login')} bold="500" />
          <Button width="48%" height="40px" type="main" children="비밀번호 변경" onClick={handleSubmit} bold="500" />
        </s.ButtonArea>
      </s.ChangePasswordArea>
    </s.Container>
  );
};

export default ResetPasswordPage;
