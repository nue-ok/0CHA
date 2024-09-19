import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { darkTheme } from './styles/theme';
import GlobalStyle from './styles/global-styles';
import LoginPage from './pages/LoginBefore/Login/LoginPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PrivateRoute, PublicRoute } from './pages/IsLoginPage';
import SignUpPage from './pages/LoginBefore/SignUp/SignUpPage';
import SplashPage from './pages/SplashPage';
import PlusInfoPage from './pages/LoginAfter/PlusInfo/PlusInfoPage';
import FindEmailPage from './pages/LoginBefore/FindEmail/FindEmailPage';
import FindPasswordPage from './pages/LoginBefore/FindPassword/FindPasswordPage';
import FindEmailResultPage from './pages/LoginBefore/FindEmail/FindEmailResultPage';
import ChangePasswordPage from './pages/LoginAfter/ChangePassword/ChangePasswordPage';
import ResetPasswordPage from './pages/LoginBefore/ResetPassword/ResetPasswordPage';
import MainPage from './pages/Main/MainPage';
import AIMainPage from './pages/AI/AIMainPage';
import FitnessListPage from './pages/Fitness/FitnessListPage';
import FitnessDetailPage from './pages/Fitness/FitnessDetailPage';
import FitnessRoutineDetatilPage from './pages/Fitness/FitnessRoutineDetailPage';
import FitnessRoutineListPage from './pages/Fitness/FitnessRoutineListPage';
import FitnessPlayPage from './pages/Fitness/FitnessPlayPage';
import FitnessFinishPage from './pages/Fitness/FitnessFinishPage';
import RecordMainPage from './pages/Record/RecordMainPage';
import RecordInBodyScanPage from './pages/Record/RecordInBodyScanPage';
import RecordInBodyScanResultPage from './pages/Record/RecordInBodyScanResultPage';
import RecordInBodyChartPage from './pages/Record/RecordInBodyChartPage';
import RecordFitnessChartPage from './pages/Record/RecordFitnessChartPage';
import ProfileMainPage from './pages/Profile/ProfileMain/ProfileMainPage';
import UpdateMyInfoPage from './pages/Profile/UpdateMyInfo/UpdateMyInfoPage';
import UpdateProfilePage from './pages/Profile/UpdateProfile/UpdateProfilePage';
import FitnessPage from './pages/Fitness/FitnessPage';
import RecordPage from './pages/Record/RecordPage';
import SocialPage from './pages/SocialPage/SocialPage';
import FeedPage from './pages/SocialPage/Feed/FeedPage';
import CreateFeedPage from './pages/SocialPage/Feed/CreateFeedPage';
import UserPostPage from './pages/SocialPage/Feed/UserPostPage';
import MarketPage from './pages/SocialPage/Market/MarketPage';
import UploadItemPage from './pages/SocialPage/Market/UploadItemPage';
import ChatListPage from './pages/SocialPage/Feed/ChatListPage';
import ChatPage from './pages/SocialPage/Feed/ChatPage';
import NotificationPage from './pages/SocialPage/Feed/NotificationPage';
import ErrorPage from './pages/ErrorPage';
import { useAppSelector } from './lib/hook/useReduxHook';
import { selectIsEmail, selectIsFinish, selectIsPlay, selectIsPw, selectIsScan, selectIsSign } from './store/page';
import TestPlanSetPage from './pages/Fitness/TestPlanSetPage';
import UpdateItemPage from './pages/SocialPage/Market/UpdateItemPage';
import UpdateFeedPage from './pages/SocialPage/Feed/UpdateFeedPage ';
import UserFeedPage from './pages/SocialPage/Feed/UserFeedPage';
import SocialLoginPage from './pages/SocialLoginPage';

const s = {
  Background: styled.section`
    width: 100vw;
    height: 100%;
    background-color: #f1f3f5;
    position: absolute;
    font-size: 80px;
    line-height: 70px;
  `,
  Container: styled.div`
    max-width: 800px;
    height: 100vh;
    position: relative;
    margin: 0 auto;
    background-color: ${(props) => props.theme.bgColor};
    overflow: auto;
  `,
  test: styled.div`
    width: 100%;
    height: 100%;
    background-color: yellow;
    border: 1px solid red;
    display: flex;
  `,
};

function App() {
  const isSign = useAppSelector(selectIsSign);
  const isEmail = useAppSelector(selectIsEmail);
  const isPw = useAppSelector(selectIsPw);
  const isPlay = useAppSelector(selectIsPlay);
  const isFinish = useAppSelector(selectIsFinish);
  const isScan = useAppSelector(selectIsScan);
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <s.Background />
        <s.Container>
          <BrowserRouter>
            <Routes>
              <Route element={<PublicRoute />}>
                <Route path="/" element={<SplashPage />} />
                <Route path="/socialLogin*" element={<SocialLoginPage />} />
                <Route path="/api/oauth/*" element={<Navigate to="/api/oauth/kakao" replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup">
                  {isSign ? <Route index element={<PlusInfoPage />} /> : <Route index element={<SignUpPage />} />}
                </Route>
                <Route path="/find">
                  <Route path="email">
                    {isEmail ? (
                      <Route index element={<FindEmailResultPage />} />
                    ) : (
                      <Route index element={<FindEmailPage />} />
                    )}
                  </Route>
                  <Route path="password">
                    {isPw ? (
                      <Route index element={<ResetPasswordPage />} />
                    ) : (
                      <Route index element={<FindPasswordPage />} />
                    )}
                  </Route>
                </Route>
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="/main" element={<MainPage />} />
                {/* fitness */}
                <Route path="/fitness" element={<FitnessPage />}>
                  <Route index element={<Navigate to="list" replace />} />
                  <Route path="list">
                    <Route index element={<FitnessListPage />} />
                    <Route path="detail" element={<FitnessDetailPage />} />
                  </Route>
                  <Route path="plan" element={<TestPlanSetPage />} />
                  <Route path="history">
                    <Route index element={<FitnessRoutineListPage />} />
                    <Route path="detail" element={<FitnessRoutineDetatilPage />} />
                  </Route>
                </Route>
                {isPlay ? (
                  <Route path="/play">
                    {isFinish ? (
                      <Route index element={<FitnessFinishPage />} />
                    ) : (
                      <Route index element={<FitnessPlayPage />} />
                    )}
                  </Route>
                ) : (
                  ''
                )}
                {/* record */}
                <Route path="/record" element={<RecordPage />}>
                  <Route index element={<Navigate to={'main'} replace />} />
                  <Route path="main" element={<RecordMainPage />} />
                  <Route path="inbody">
                    <Route path="scan">
                      {isScan ? (
                        <Route index element={<RecordInBodyScanResultPage />} />
                      ) : (
                        <Route index element={<RecordInBodyScanPage />} />
                      )}
                    </Route>
                    <Route path="data" element={<RecordInBodyChartPage />} />
                  </Route>
                  <Route path="data" element={<RecordFitnessChartPage />} />
                </Route>
                {/* ai */}
                <Route path="/ai" element={<AIMainPage />} />
                {/* sns */}
                <Route path="/sns" element={<SocialPage />}>
                  <Route index element={<Navigate to={'feed'} replace />} />
                  <Route path="feed">
                    <Route index element={<FeedPage />} />
                    <Route path="write" element={<CreateFeedPage />} />
                    <Route path="update" element={<UpdateFeedPage />} />
                  </Route>
                  <Route path="profile">
                    <Route index element={<Navigate to={'id'} replace />} />
                    <Route path=":id" element={<UserPostPage />} />
                  </Route>
                  <Route path="market">
                    <Route index element={<MarketPage />} />
                    <Route path="write" element={<UploadItemPage />} />
                    <Route path="update/:id" element={<UpdateItemPage />} />
                  </Route>
                  <Route path="chat">
                    <Route index element={<ChatListPage />} />
                    <Route path=":userId" element={<ChatPage />} />
                  </Route>
                  <Route path="notification" element={<NotificationPage />} />
                </Route>
                {/* mypage */}
                <Route path="/mypage">
                  <Route index element={<ProfileMainPage />} />
                  <Route path="info" element={<UpdateMyInfoPage />} />
                  <Route path="profile" element={<UpdateProfilePage />} />
                  <Route path="password" element={<ChangePasswordPage />} />
                </Route>
              </Route>
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </BrowserRouter>
        </s.Container>
      </ThemeProvider>
    </>
  );
}

export default App;
