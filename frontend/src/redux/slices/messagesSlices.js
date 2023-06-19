import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { setInitialState, removeChannel } from './channelsSlice';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(setInitialState, (state, { payload }) => {
        const { messages } = payload;
        messagesAdapter.addMany(state, messages);
      })
      .addCase(removeChannel, (state, { payload: id }) => {
        const messagesByChannelId = Object.values(state.entities)
          .filter(({ channelId }) => channelId === id)
          .map((message) => message.id);
        messagesAdapter.removeMany(state, messagesByChannelId);
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
