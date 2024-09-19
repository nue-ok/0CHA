import { AxiosError } from 'axios';
import { localAxios, publicAxios } from '../../util/axios-setting';
import { changePw, fcmToken, MyInfo, Profile } from '../../util/types/axios-main';

const local = publicAxios();
const jwt = localAxios();

// 메인페이지 루틴조회
export const getMainRoutineAll = async (success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await jwt.get(`/main/all`).then(success).catch(fail);
};
// 내 루틴가져오기
export const getMyRoutine = async (success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await jwt.get(`/main/routines`).then(success).catch(fail);
};

// 알림
export const postFcmToken = async (
  param: fcmToken,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.post(`/main/notifications`, param).then(success).catch(fail);
};

// 내 정보
export const getMyInfo = async (success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await jwt.get(`/main/profile/info`).then(success).catch(fail);
};

// 내 프로필 정보 수정
export const putProfileModify = async (
  param: FormData,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt
    .put(`/main/profile`, param, {
      headers: {
        'Content-Type': 'multipart/form-data', // FormData에 맞는 Content-Type 설정
      },
    })
    .then(success)
    .catch(fail);
};

// 닉네임 중복검사
export const postCheckNickname = async (
  nickname: string,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt
    .post(`/main/profile/check-nickname`, nickname, {
      headers: {
        'Content-Type': 'application/text',
      },
    })
    .then(success)
    .catch(fail);
};

// 내 정보수정
export const putMyInfoModify = async (
  param: MyInfo,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.put(`/main/profile/info`, param).then(success).catch(fail);
};

// 비밀번호 수정
export const putChangePw = async (
  param: changePw,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.put(`/main/profile/password`, param).then(success).catch(fail);
};

// 회원탈퇴
export const delMyDel = async (success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await jwt.delete(`/main/profile`).then(success).catch(fail);
};
