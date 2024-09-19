import React from 'react';
import styled from 'styled-components';
import Button from '../../../components/Common/Button';
import Header from '../../../components/Common/Header';
import { useLocation, useNavigate } from 'react-router';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    /* display: flex;
    flex-direction: column;
    align-items: center; */
    /* padding: 10px; */
  `,
  BinArea: styled.div`
    width: 100%;
    height: 60px;
  `,
  ResultArea: styled.div`
    width: 90%;
    /* height: 100%; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.formBgColor};
    padding: 120px 0 80px;
    border-radius: 10px;
    text-align: center;
    overflow: auto;
    margin: 0 auto;
  `,
  Message: styled.span`
    color: ${(props) => props.theme.textColor};
    font-size: 20px;
    margin-bottom: 20px;
    width: 100%;
    text-align: left;
    font-weight: 500;
  `,
  Email: styled.span`
    color: ${(props) => props.theme.mainColor};
    font-size: 24px;
    margin-bottom: 80px;
    width: 100%;
    text-align: left;
    font-weight: 700;
  `,
  BtnArea: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  `,
  Button: styled(Button)`
    width: 48%;
    height: 40px;
    border-radius: 5px;
  `,
};

const FindEmailResultPage = (): JSX.Element => {
  const navigate = useNavigate();
  const result = useLocation().state?.result;
  const handleMovePage = (path: string): void => {
    navigate(path);
  };

  return (
    <s.Container>
      <Header text="이메일 찾기" onBack={() => navigate('../../login')} />
      <s.BinArea></s.BinArea>
      <s.ResultArea>
        <s.Message children={`${result?.name}님의 이메일은`} />
        <s.Email>
          {result?.email}
          <s.Message children="입니다." />
        </s.Email>
        <s.BtnArea>
          <Button
            width="48%"
            height="40px"
            onClick={() => handleMovePage('../password')}
            children="비밀번호 찾기"
            bold="500"
          />
          <Button
            width="48%"
            height="40px"
            type="main"
            onClick={() => handleMovePage('../../login')}
            children="로그인"
            bold="500"
          />
        </s.BtnArea>
      </s.ResultArea>
    </s.Container>
  );
};

export default FindEmailResultPage;
