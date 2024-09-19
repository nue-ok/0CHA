import React, { useEffect } from 'react';
import styled from 'styled-components';
import IconSvg from '../components/Common/IconSvg';
import { ReactComponent as Logo } from '../asset/img/svg/0CHA.svg';
import Text from '../components/Common/Text';
import { useNavigate } from 'react-router';
const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
  `,
  MainArea: styled.div`
    width: fit-content;
    margin: 0 auto;
    /* border: 1px solid red; */
    position: relative;
    bottom: 50%;
    top: 50%;
    transform: translate(0, -50%);
    text-align: center;
  `,
};

const SplashPage = (): JSX.Element => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  }, []);

  return (
    <s.Container>
      <s.MainArea>
        <IconSvg width="100%" height="" Ico={Logo} />
        <Text
          children="헬스인들의 모든 것"
          color="textColor"
          size="14px"
          bold="700"
          display="block"
          margin="10px auto"
          width="100%"
          textalian="right"
        />
        <Text
          children="로딩중입니다. 잠시만 기다려주세요."
          color="textColor"
          size="14px"
          bold="700"
          display="block"
          margin="100px auto 0"
          width="100%"
          textalian="center"
        />
      </s.MainArea>
    </s.Container>
  );
};

export default SplashPage;
