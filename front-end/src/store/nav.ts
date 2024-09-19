import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

interface BottomNavState {
  nav: string;
}

const initialState: BottomNavState = {
  nav: 'main',
};

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    change: (state, action: PayloadAction<string>) => {
      state.nav = action.payload;
    },
  },
});

export const navActions = navSlice.actions;
export const selectNav = (state: RootState) => state.nav.nav;
export default navSlice.reducer;
