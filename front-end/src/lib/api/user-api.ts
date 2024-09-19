import { AxiosError, AxiosResponse } from 'axios';
import { localAxios, publicAxios, socialAxios } from '../../util/axios-setting';
import { request } from './index';
import {
  AuthCheck,
  FindEmail,
  FindPwAuth,
  PlusInfoType,
  ResetPw,
  SignupType,
  Token,
  UserLogin,
} from '../../util/types/axios-user';

const local = publicAxios();
const social = socialAxios();
const jwt = localAxios();

interface UserInfo {
  id: number;
  name: string;
  email: string;
  nickname: string;
  phone: string;
  birth: Date;
  profileImageUrl: string;
  gender: number;
  height: number;
  weight: number;
  district: string;
  siGunGu: string;
}

export const login = async (param: UserLogin, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/auth/login/login`, param).then(success).catch(fail);
};

export const logout = async (success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await jwt.post(`/auth/login/logout`).then(success).catch(fail);
};

// AT 재발급 고려중(axios intercept에 적용)

// 소셜로그인 이동
export const MoveKaKao = async (path: string, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.get(`/oauth/${path}`).then(success).catch(fail);
};
// 카카오 소셜로그인
export const kakao = async (code: string, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await social.get(`/oauth/login/kakao?code=${code}`).then(success).catch(fail);
};
// 구글 소셜로그인
export const google = async (code: string, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await social.get(`/oauth/login/google?code=${code}`).then(success).catch(fail);
};
// 깃헙 소셜로그인
export const github = async (code: string, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await social.get(`/oauth/login/github?code=${code}`).then(success).catch(fail);
};
// 소셜로그인 토큰

export const findEmail = async (
  param: FindEmail,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await local.post(`/auth/modify/find-email`, param).then(success).catch(fail);
};

export const findPwAuth = async (
  param: FindPwAuth,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await local.post(`/auth/modify/find-password`, param).then(success).catch(fail);
};

export const findPwAuthCheck = async (
  param: AuthCheck,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await local.post(`/auth/modify/find-password/verify`, param).then(success).catch(fail);
};

export const resetPw = async (param: ResetPw, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.put(`/auth/modify/reset-password`, param).then(success).catch(fail);
};

export const emailAuth = async (email: string, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local
    .post(`/auth/register/check-email`, email, {
      headers: {
        'Content-Type': 'application/text',
      },
    })
    .then(success)
    .catch(fail);
};

export const emailAuthCheck = async (
  param: AuthCheck,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await local.post(`/auth/register/check-email/verify`, param).then(success).catch(fail);
};

export const nickCheck = async (
  nickname: string,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await local
    .post(`/auth/register/check-nickname`, nickname, {
      headers: {
        'Content-Type': 'application/text',
      },
    })
    .then(success)
    .catch(fail);
};

export const signup = async (
  param: SignupType,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  console.log('넘어온 값 : ' + param);
  await local.post(`/auth/register/signup`, param).then(success).catch(fail);
};

export const putPlusInfo = async (
  param: PlusInfoType,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await local.put(`/auth/register/user-info`, param).then(success).catch(fail);
};
// export const user = {
//   login: (param: UserLogin) => request.post<Token>('/auth/login/login', param).then().catch(),
//   info: () => request.get<UserInfo>('/main/user_info'),
// };
