import React from 'react';
import { useLocation } from 'react-router';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../lib/hook/useReduxHook';
import {
  pageActions,
  selectIsEmail,
  selectIsFinish,
  selectIsPlay,
  selectIsPw,
  selectIsScan,
  selectIsSign,
} from '../store/page';

export const PrivateRoute = () => {
  const location = useLocation();
  const isPlay = useAppSelector(selectIsPlay);
  const isFinish = useAppSelector(selectIsFinish);
  const isScan = useAppSelector(selectIsScan);
  const dispatch = useAppDispatch();
  if (isPlay && !!isFinish && location.pathname !== '/play') {
    dispatch(pageActions.toogleIsPlay(false));
  }
  if (isFinish && isPlay && location.pathname !== '/play') {
    dispatch(pageActions.toogleIsFinish(false));
  }
  if (isScan && location.pathname !== '/record/inbody/scan') {
    dispatch(pageActions.toogleIsScan(false));
  }
  const checkLogin = !!localStorage.getItem('accessToken');
  // const checkLogin = true;

  if (!checkLogin) {
    alert('로그인 후 접근 가능합니다.');
  }
  return checkLogin ? <Outlet /> : <Navigate to={'/login'} />;
};

export const PublicRoute = () => {
  const location = useLocation();
  const isSign = useAppSelector(selectIsSign);
  const isEmail = useAppSelector(selectIsEmail);
  const isPw = useAppSelector(selectIsPw);
  const dispatch = useAppDispatch();
  if (isSign && location.pathname !== '/signup') {
    dispatch(pageActions.OffPageChange());
  }
  if (isEmail && location.pathname !== '/find/email') {
    dispatch(pageActions.toogleIsEmail(false));
  }
  if (isPw && location.pathname !== '/find/password') {
    dispatch(pageActions.toogleIsPw(false));
  }
  sessionStorage.removeItem('persist:redux-state');
  const checkLogin = !!localStorage.getItem('accessToken');
  // const checkLogin = false;
  if (checkLogin) {
    alert('비정상적인 접근 : 로그인유저가 public 접근');
  }
  return checkLogin ? <Navigate to={'*'} /> : <Outlet />;
};
