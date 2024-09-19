import { AxiosError } from 'axios';
import { inbodyAxios, localAxios, publicAxios } from '../../util/axios-setting';
import { Inbody } from '../../util/types/axios-record';

const local = publicAxios();
const jwt = localAxios();
const inbody = inbodyAxios();

// 1rm
export const getRm = async (
  exerciseId: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/record/rm/${exerciseId}`).then(success).catch(fail);
};

// 최근 5개 운동량과 운동시간 가져오기
export const getFitnessData = async (success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await jwt.get(`/record/exercise-records`).then(success).catch(fail);
};

// 운동이력조회
export const getFitnessCalendar = async (success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await jwt.get(`/record/routines`).then(success).catch(fail);
};

// 인바디 결과 관리
export const getInbody = async (success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await jwt.get(`/record/inbody`).then(success).catch(fail);
};

// 인바디 결과 등록
export const postInbody = async (
  param: Inbody,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.post(`/record/inbody`, param).then(success).catch(fail);
};

export const sendInbodyRequest = async (image: string) => {
  try {
    const axiosInstance = inbodyAxios();

    const body = {
      version: 'V1',
      requestId: 'unique_request_id', // 고유한 요청 ID 설정
      timestamp: Date.now(),
      images: [
        {
          format: 'png',
          data: image,
          name: 'inbody_image',
        },
      ],
    };

    const response = await axiosInstance.post('/', body);
    console.log(response.data);
  } catch (error) {
    console.error('Error sending request:', error);
  }
};

export const inbodyTest = async (
  image: string,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  const body = {
    version: 'V2',
    requestId: 'unique_request_id', // 고유한 요청 ID 설정
    timestamp: Date.now(),
    images: [
      {
        format: 'png',
        data: `${image}`,
        name: 'inbody_image',
      },
    ],
  };
  await inbody.post(``, body).then(success).catch(fail);
};
