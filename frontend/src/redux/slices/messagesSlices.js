/* eslint-disable functional/no-expression-statements */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchAuthData } from './loaderSlices';

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
    builder.addCase(fetchAuthData.fulfilled, (state, { payload }) => {
      messagesAdapter.addMany(state, payload.messages);
    });
  },
});

export const { actions } = messagesSlice;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
