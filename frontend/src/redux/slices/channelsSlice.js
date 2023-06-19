/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: null,
  defaultChannelId: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setInitialState: ((state, { payload }) => {
      const { channels, currentChannelId } = payload;
      channelsAdapter.addMany(state, channels);
      state.currentChannelId = currentChannelId;
      state.defaultChannelId = currentChannelId;
    }),
    addChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
    renameChannel: channelsAdapter.upsertOne,
    setCurrentChannel: ((state, { payload }) => {
      state.currentChannelId = payload;
    }),
  },
});

export const {
  setInitialState,
  addChannel,
  removeChannel,
  renameChannel,
  setCurrentChannel,
} = channelsSlice.actions;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
