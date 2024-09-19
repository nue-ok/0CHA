import { AxiosError } from 'axios';
import { localAxios, publicAxios } from '../../util/axios-setting';
import { axiosCreateRoutine, newRoutine, Routine } from '../../util/types/axios-fitness';

const local = publicAxios();
const jwt = localAxios();

// 운동 리스트
export const getFitnessList = async (success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await jwt.get(`/workout/exercises`).then(success).catch(fail);
};

// 운동 찜리스트
export const getFitnessJjimList = async (success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await jwt.get(`/workout/exercises/favorites`).then(success).catch(fail);
};

// 운동상세조회
export const getFitnessListCategory = async (
  exerciseId: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/workout/exercises/${exerciseId}`).then(success).catch(fail);
};

// 운동별 운동량조회
export const getFitnessMomentum = async (
  exerciseId: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/workout/exercises/${exerciseId}/records`).then(success).catch(fail);
};

// 운동찜
export const postFitnessJjim = async (
  exerciseId: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.post(`/workout/exercises/${exerciseId}/favorite`).then(success).catch(fail);
};

// 운동찜 취소
export const deleteFitnessJjimCancel = async (
  exerciseId: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.delete(`/workout/exercises/${exerciseId}/favorite`).then(success).catch(fail);
};

// 운동찜 여부
export const getFitnessJjimCheck = async (
  exerciseId: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  // await jwt.get(`/workout/exercises/${exerciseId}/is-favorite`).then(success).catch(fail);
  await jwt.get(`/workout/exercises/${exerciseId}/is-favorite`).then(success).catch(fail);
};

// 본인루틴조회
export const getRoutineList = async (success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await jwt.get(`/workout/routines`).then(success).catch(fail);
};

// 루틴 상세조회
export const getRoutineDetail = async (
  routineId: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/workout/routines/${routineId}`).then(success).catch(fail);
};

// 루틴생성
export const putNewRoutine = async (
  param: axiosCreateRoutine,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.put(`/workout/routines`, param).then(success).catch(fail);
};

// 루틴업데이트
export const putUpdateRoutine = async (
  routineId: number,
  param: axiosCreateRoutine,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.put(`/workout/routines/${routineId}`, param).then(success).catch(fail);
};

// 루틴삭제
export const delRoutine = async (
  routineId: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.delete(`/workout/routines/${routineId}`).then(success).catch(fail);
};

// 루틴 찜하기/해제
export const putRoutineJjim = async (
  routineId: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.put(`/workout/routines/${routineId}/like`).then(success).catch(fail);
};

// 운동완료
export const putFinishRoutine = async (
  routineId: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.put(`/workout/routines/${routineId}/complete`).then(success).catch(fail);
};
