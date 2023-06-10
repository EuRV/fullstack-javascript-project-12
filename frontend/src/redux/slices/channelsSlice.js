/* eslint-disable no-param-reassign */
/* eslint-disable functional/no-expression-statements */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

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
    removeChannel: channelsAdapter.removeOne,
    renameChannel: channelsAdapter.upsertOne,
    setCurrentChannel: ((state, { payload }) => {
      state.currentChannelId = payload;
    }),
  },
});

export const {
  addChannels,
  addChannel,
  removeChannel,
  renameChannel,
  setCurrentChannel,
} = channelsSlice.actions;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
