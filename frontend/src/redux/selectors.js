import { selectors as channelsSelectors } from './slices/channelsSlice';
import { selectors as messagesSelectors } from './slices/messagesSlices';

const getChannels = (state) => channelsSelectors.selectAll(state);

const getCurrentChannelId = (state) => {
  const { currentChannelId } = state.channels;
  return currentChannelId;
};

const getDefaultChannelId = (state) => {
  const { defaultChannelId } = state.channels;
  return defaultChannelId;
};

const getCurrentChannel = (state) => {
  const { currentChannelId } = state.channels;
  return channelsSelectors.selectById(state, currentChannelId);
};

const getMessagesCurrentChannel = (state) => {
  const { currentChannelId } = state.channels;
  const messagesAll = messagesSelectors.selectAll(state);
  return messagesAll.filter(({ channelId }) => channelId === currentChannelId);
};

export {
  getChannels,
  getCurrentChannelId,
  getDefaultChannelId,
  getCurrentChannel,
  getMessagesCurrentChannel,
};
