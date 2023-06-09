/* eslint-disable no-param-reassign */
/* eslint-disable functional/no-expression-statements */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
  type: null,
  extra: null,
};

const modalsSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open(state, { payload }) {
      const { type, extra = null } = payload;
      state.isOpened = true;
      state.type = type;
      state.extra = extra;
    },
    close(state) {
      state.isOpened = false;
      state.type = null;
      state.extra = null;
    },
  },
});

export const { open, close } = modalsSlice.actions;
export default modalsSlice.reducer;
