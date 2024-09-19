import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../../../components/Common/Input';
import Button from '../../../components/Common/Button';
import Text from '../../../components/Common/Text';
import { ReactComponent as Logo } from '../../../asset/img/svg/0CHA.svg';
import { ReactComponent as google } from '../../../asset/img/svg/google.svg';
import { ReactComponent as kakao } from '../../../asset/img/svg/kakao.svg';
import { ReactComponent as git } from '../../../asset/img/svg/git.svg';
import { useNavigate } from 'react-router';
import { login, MoveKaKao } from '../../../lib/api/user-api';
import IconSvg from '../../../components/Common/IconSvg';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    overflow: auto;
  `,
  Title: styled.div`
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: end;
    margin-bottom: 30px;
  `,
  LoginArea: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  InputArea: styled.div`
    width: 80%;
    /* border: 1px solid red; */
    margin: 0px auto;
  `,
  LoginCheckInput: styled.input`
    accent-color: '#ccff33';
  `,
  LoginLabel: styled.label`
    font-size: 14px;
    color: ${(props) => props.theme.textColor};
  `,
  TextBtnArea: styled.div`
    text-align: center;
    color: ${(props) => props.theme.textColor};
    width: 230px;
    /* border: 1px solid red; */
    display: flex;
    justify-content: space-around;
    margin-bottom: 50px;
  `,
  SnsText: styled.span`
    color: #666666;
    font-size: 14px;
  `,
  snsArea: styled.div`
    width: 250px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 20px auto;
  `,
};
interface dataType {
  email: string;
  password: string;
}

const LoginPage = (): JSX.Element => {
  const [data, setData] = useState<dataType>({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleMovePage = (path: string): void => {
    navigate(path);
  };

  // 로그인
  const postLogin = async () => {
    login(
      data,
      (resp) => {
        localStorage.setItem('accessToken', resp.data.accessToken);
        localStorage.setItem('refreshToken', resp.data.refreshToken);
        navigate('/main');
      },
      (error) => {
        alert('아이디 및 비밀번호를 다시 확인해주세요.');
      },
    );
  };

  const handleMoveSocial = async (path: string) => {
    // navigate(`/oauth/${path}`);
    // window.location.href = `${process.env.REACT_APP_SOCIAL_BASE_URL}/oauth/${path}`;
    // await MoveKaKao(
    //   path,
    //   (resp) => {
    //     window.location.href = resp.request.responseURL;
    //   },
    //   (error) => {
    //     alert(error);
    //   },
    // );
    window.location.href = 'https://i11b310.p.ssafy.io/api/oauth/kakao';
  };

  return (
    <s.Container>
      <s.Title>
        <Logo />
      </s.Title>
      <s.LoginArea>
        <Input
          width="80%"
          height="40px"
          placeholder="이메일"
          margin="5px auto"
          type="text"
          name="email"
          value={data.email}
          onChange={handleChangeValue}
        />
        <Input
          width="80%"
          height="40px"
          placeholder="비밀번호"
          margin="5px auto"
          type="password"
          name="password"
          value={data.password}
          onChange={handleChangeValue}
        />
        {/* <s.InputArea>
          <s.LoginCheckInput type="checkbox" style={{ accentColor: '#ccff33' }} id="autoLogin" />
          <s.LoginLabel htmlFor="autoLogin">자동 로그인</s.LoginLabel>
        </s.InputArea> */}
        <Button
          width="80%"
          height="40px"
          type="main"
          display="block"
          margin="30px auto"
          children="로그인"
          onClick={postLogin}
        />
        <s.TextBtnArea>
          <Text
            type="guide"
            children="회원가입"
            size="14px"
            onClick={() => {
              handleMovePage('/signup');
            }}
            cursor="pointer"
          />
          <Text
            type="guide"
            children="이메일 찾기"
            size="14px"
            onClick={() => {
              handleMovePage('/find/email');
            }}
            cursor="pointer"
          />
          <Text
            type="guide"
            children="비밀번호 찾기"
            size="14px"
            onClick={() => {
              handleMovePage('/find/password');
            }}
            cursor="pointer"
          />
        </s.TextBtnArea>
        {/* <s.SnsText>SNS 로그인</s.SnsText>
        <s.snsArea>
          <IconSvg width="40" height="40" Ico={kakao} cursor="pointer" onClick={() => handleMoveSocial('kakao')} />
          <IconSvg width="40" height="40" Ico={google} cursor="pointer" onClick={() => handleMoveSocial('google')} />
          <IconSvg width="40" height="40" Ico={git} cursor="pointer" onClick={() => handleMoveSocial('github')} />
        </s.snsArea> */}
      </s.LoginArea>
    </s.Container>
  );
};

export default LoginPage;
