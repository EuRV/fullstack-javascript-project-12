/* eslint-disable no-param-reassign */
/* eslint-disable functional/no-expression-statements */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchAuthData } from './loaderSlices';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    setCurrentChannel: ((state, { payload }) => {
      state.currentChannelId = payload;
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuthData.fulfilled, (state, { payload }) => {
      channelsAdapter.addMany(state, payload.channels);
      state.currentChannelId = payload.currentChannelId;
    });
  },
});

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
