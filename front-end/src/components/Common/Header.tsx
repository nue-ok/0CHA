import React from 'react';
import styled from 'styled-components';
import { ReactComponent as back } from '../../asset/img/svg/back.svg';
import IconSvg from './IconSvg';
import { useNavigate } from 'react-router';

const s = {
  Container: styled.section`
    max-width: 800px;
    width: 100%;
    height: 57px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${(props) => props.theme.bgColor};
    position: fixed;
    /* z-index: 100; */
  `,
  BasicArea: styled.div`
    width: 70%;
    height: 100%;
    margin: 0 10px;
    display: flex;
    align-items: center;
  `,
  Title: styled.span`
    width: 100%;
    color: ${(props) => props.theme.textColor};
    font-size: 18px;
    font-weight: bold;
    margin-left: 20px;
    cursor: default;
  `,
};

interface HeaderProps {
  text?: string;
  children?: React.ReactNode;
  onBack?: Function;
}

const Header = (props: HeaderProps): JSX.Element => {
  const navigate = useNavigate();

  const onClickBack = () => {
    props.onBack !== undefined ? props.onBack() : navigate(-1);
  };
  return (
    <s.Container>
      <s.BasicArea>
        <IconSvg width="25" height="25" Ico={back} cursor="pointer" onClick={onClickBack} />
        <s.Title>{props.text}</s.Title>
      </s.BasicArea>
      {props.children}
    </s.Container>
  );
};

export default Header;
