import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

interface PageState {
  snsType: string;
  isSign: boolean;
  isEmail: boolean;
  isPw: boolean;
  isPlay: boolean;
  isFinish: boolean;
  isScan: boolean;
  recordType1: string;
  recordType2: string;
  recordType3: string;
}

const initialState: PageState = {
  snsType: 'feed',
  isSign: false,
  isEmail: false,
  isPw: false,
  isPlay: false,
  isFinish: false,
  isScan: false,
  recordType1: 'bodyFat',
  recordType2: 'muscleMass',
  recordType3: 'muscleLeftArm',
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    changeSnsType: (state, action: PayloadAction<string>) => {
      state.snsType = action.payload;
    },
    OnPageChange: (state) => {
      state.isSign = true;
    },
    OffPageChange: (state) => {
      state.isSign = false;
    },
    toogleIsEmail: (state, action: PayloadAction<boolean>) => {
      state.isEmail = action.payload;
    },
    toogleIsPw: (state, action: PayloadAction<boolean>) => {
      state.isPw = action.payload;
    },
    toogleIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    toogleIsFinish: (state, action: PayloadAction<boolean>) => {
      state.isFinish = action.payload;
    },
    toogleIsScan: (state, action: PayloadAction<boolean>) => {
      state.isScan = action.payload;
    },
    changeChart1: (state, action: PayloadAction<string>) => {
      state.recordType1 = action.payload;
    },
    changeChart2: (state, action: PayloadAction<string>) => {
      state.recordType2 = action.payload;
    },
    changeChart3: (state, action: PayloadAction<string>) => {
      state.recordType3 = action.payload;
    },
  },
});

export const pageActions = pageSlice.actions;
export const selectSnsType = (state: RootState) => state.page.snsType;
export const selectIsSign = (state: RootState) => state.page.isSign;
export const selectIsEmail = (state: RootState) => state.page.isEmail;
export const selectIsPw = (state: RootState) => state.page.isPw;
export const selectIsPlay = (state: RootState) => state.page.isPlay;
export const selectIsFinish = (state: RootState) => state.page.isFinish;
export const selectIsScan = (state: RootState) => state.page.isScan;
export const selectType1 = (state: RootState) => state.page.recordType1;
export const selectType2 = (state: RootState) => state.page.recordType2;
export const selectType3 = (state: RootState) => state.page.recordType3;
export default pageSlice.reducer;
