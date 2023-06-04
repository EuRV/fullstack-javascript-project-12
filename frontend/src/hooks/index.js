// @ts-check

import { useContext } from 'react';

import { AuthContext, ChatApiContext } from '../context/index';

const useAuth = () => useContext(AuthContext);
const useChatApi = () => useContext(ChatApiContext);

export { useAuth, useChatApi };
