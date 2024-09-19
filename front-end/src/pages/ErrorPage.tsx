import React, { useEffect } from 'react';
import styled from 'styled-components';
import IconSvg from '../components/Common/IconSvg';
import { ReactComponent as Logo } from '../asset/img/svg/0CHA.svg';
import Text from '../components/Common/Text';
import { useNavigate } from 'react-router';
import Button from '../components/Common/Button';
const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    overflow: auto;
  `,
  MainArea: styled.div`
    width: fit-content;
    margin: 0 auto;
    position: relative;
    bottom: 50%;
    top: 50%;
    transform: translate(0, -50%);
    text-align: center;
  `,
};

const ErrorPage = (): JSX.Element => {
  const navigate = useNavigate();
  const isLogin = localStorage.getItem('accessToken');
  const handleMovePage = () => {
    isLogin ? navigate('/main') : navigate('/login');
  };
  return (
    <s.Container>
      <s.MainArea>
        <Text
          children="잘못된 접근입니다."
          color="textColor"
          size="20px"
          bold="700"
          display="block"
          width="100%"
          textalian="center"
        />
        <Button
          children="뒤로가기"
          width="80%"
          height="40px"
          bold="500"
          display="block"
          margin="20px auto"
          onClick={handleMovePage}
        />
      </s.MainArea>
    </s.Container>
  );
};

export default ErrorPage;
