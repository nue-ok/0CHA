import React, { useEffect } from 'react';
import styled from 'styled-components';
import Input from '../../components/Common/Input';
import FitnessListTopNav from '../../components/Fitness/Etc/FitnessListTopNav';
import FitnessList from '../../components/Fitness/List/FitnessList';
import { FitnessData } from '../../util/TestData';
import Button from '../../components/Common/Button';
import BottomNav from '../../components/Common/BottomNav';
import { Outlet, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../lib/hook/useReduxHook';
import { navActions, selectNav } from '../../store/nav';
import { useBottomNavHook } from '../../lib/hook/useBottomNavHook';
import { pageActions } from '../../store/page';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    overflow: auto;
  `,
  HeaderArea: styled.div`
    width: 100%;
    max-width: 800px;
    position: fixed;
    background-color: ${(props) => props.theme.bgColor};
  `,
  MainArea: styled.div`
    height: 100%;
    padding: 120px 0 140px;
    border: 1px solid red;
    overflow: auto;
  `,
  InputArea: styled.div`
    width: 80%;
    margin: 10px auto;
  `,
  FitnessArea: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  `,
  Btn: styled.button`
    width: 169px;
    height: 40px;
    font-size: 14px;
    font-weight: 500;
    margin: 10px auto;
    display: block;
    position: fixed;
    background-color: ${(props) => props.theme.mainColor};
    border-radius: 10px;
    bottom: 70px;
    left: 0;
    right: 0;
  `,
};

const SocialPage = (): JSX.Element => {
  useBottomNavHook('sns');
  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => {
      dispatch(pageActions.changeSnsType('feed'));
    };
  });
  return (
    <s.Container>
      <Outlet />
      <BottomNav />
    </s.Container>
  );
};

export default SocialPage;
