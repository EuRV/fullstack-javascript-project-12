/* eslint-disable functional/no-expression-statements */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, { payload: { id } }) => {
      const messagesByChannelId = Object.values(state.entities)
        .filter(({ channelId }) => channelId === id)
        .map((message) => message.id);
      messagesAdapter.removeMany(state, messagesByChannelId);
    });
  },
});

export const { actions } = messagesSlice;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
