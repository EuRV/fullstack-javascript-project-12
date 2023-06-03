import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './slices/channelsSlice';
import messagesReducer from './slices/messagesSlices';
import loaderReducer from './slices/loaderSlices';

export default configureStore({
  reducer: {
    loader: loaderReducer,
    channels: channelsReducer,
    messages: messagesReducer,
  },
});
