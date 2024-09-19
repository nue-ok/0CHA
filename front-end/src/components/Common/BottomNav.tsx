import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as home } from '../../asset/img/svg/home.svg';
import { ReactComponent as fitness } from '../../asset/img/svg/fitness.svg';
import { ReactComponent as routine } from '../../asset/img/svg/calendar.svg';
import { ReactComponent as ai } from '../../asset/img/svg/ai.svg';
import { ReactComponent as sns } from '../../asset/img/svg/sns.svg';
import IconSvg from './IconSvg';
import { useNavigate } from 'react-router';

import { useAppSelector } from '../../lib/hook/useReduxHook';
import { selectNav } from '../../store/nav';

const s = {
  Container: styled.section`
    width: 100%;
    max-width: 800px;
    height: 68px;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: ${(props) => props.theme.bgColor};
  `,
  IconArea: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  `,
};

const BottomNav = (): JSX.Element => {
  const navigate = useNavigate();
  const nav = useAppSelector(selectNav);
  // const dispatch = useAppDispatch();

  // const changeHandle = (mode: string) => {
  //   dispatch(navActions.change(mode));
  // };

  const handleClickIcon = (mode: string) => {
    // changeHandle(mode);
    navigate('/' + mode);
  };

  const getColor = (mode: string) => {
    return nav === mode ? '#ccff33' : '#ffffff';
  };

  return (
    <s.Container>
      <s.IconArea onClick={() => handleClickIcon('main')}>
        <IconSvg width="25" height="40" color={getColor('main')} Ico={home} />
      </s.IconArea>
      <s.IconArea onClick={() => handleClickIcon('fitness')}>
        <IconSvg width="25" height="40" color={getColor('fitness')} Ico={fitness} />
      </s.IconArea>
      <s.IconArea onClick={() => handleClickIcon('record')}>
        <IconSvg width="25" height="40" color={getColor('record')} Ico={routine} />
      </s.IconArea>
      <s.IconArea onClick={() => handleClickIcon('ai')}>
        <IconSvg width="25" height="40" color={getColor('ai')} Ico={ai} />
      </s.IconArea>
      <s.IconArea onClick={() => handleClickIcon('sns')}>
        <IconSvg width="25" height="40" color={getColor('sns')} Ico={sns} />
      </s.IconArea>
    </s.Container>
  );
};

export default BottomNav;
