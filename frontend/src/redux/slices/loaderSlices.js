/* eslint-disable functional/no-expression-statements */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import { createAsyncThunk, createSlice, miniSerializeError } from '@reduxjs/toolkit';
import requestRoutes from '../../api/requestRoutes';

export const fetchAuthData = createAsyncThunk(
  'fetchAuthData',
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(requestRoutes.dataPath(), {
        headers:
          { Authorization: `Bearer ${token}` },
      });
      const { channels, messages, currentChannelId } = data;
      return { channels, messages, currentChannelId };
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response);
      }
      if (error.isAxiosError) {
        return rejectWithValue('AxiosError');
      }
      return rejectWithValue(miniSerializeError(error));
    }
  },
);

const loaderSlices = createSlice({
  name: 'loader',
  initialState: { loadingStatus: 'idle', error: null },
  reducers: {
    setDefault(state) {
      state.loadingStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthData.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchAuthData.fulfilled, (state) => {
        state.loadingStatus = 'success';
        state.error = null;
      })
      .addCase(fetchAuthData.rejected, (state, { payload }) => {
        state.loadingStatus = 'failed';
        state.error = payload;
      });
  },
});

export const { setDefault } = loaderSlices.actions;
export default loaderSlices.reducer;
