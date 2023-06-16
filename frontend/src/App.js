/* eslint-disable functional/no-conditional-statements */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable functional/no-expression-statements */
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { io } from 'socket.io-client';
import leoProfanity from 'leo-profanity';

import router from './router';
import store from './redux/store';
import { addMessage } from './redux/slices/messagesSlices';
import {
  addChannel, removeChannel, setCurrentChannel, renameChannel,
} from './redux/slices/channelsSlice';
import AuthProvider from './context/AuthProvider';
import { ChatApiContext } from './context';
import badWords from './locales/badWords.js';

const App = () => {
  const { dispatch } = store;
  const socket = io();

  const ruDict = leoProfanity.getDictionary('ru');
  leoProfanity.add(ruDict);
  leoProfanity.add(badWords);

  socket.on('newMessage', (payload) => {
    dispatch(addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    dispatch(addChannel(payload));
    dispatch(setCurrentChannel(payload.id));
  });
  socket.on('removeChannel', ({ id }) => {
    dispatch(removeChannel(id));
    dispatch(setCurrentChannel(1));
  });
  socket.on('renameChannel', (payload) => {
    dispatch(renameChannel(payload));
  });

  const promiseWrapper = (socketFn) => (...args) => new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('errors.network')), 5000);
    socketFn(...args, (response) => {
      if (response.status === 'ok') {
        clearTimeout(timer);
        resolve();
      }
      reject();
    });
  });

  const api = {
    sendMessage: promiseWrapper((...args) => socket.volatile.emit('newMessage', ...args)),
    addChannel: promiseWrapper((...args) => socket.volatile.emit('newChannel', ...args)),
    removeChannel: promiseWrapper((...args) => socket.volatile.emit('removeChannel', ...args)),
    renameChannel: promiseWrapper((...args) => socket.volatile.emit('renameChannel', ...args)),
  };

  return (
    <Provider store={store}>
      <AuthProvider>
        <ChatApiContext.Provider value={api}>
          <RouterProvider router={router} />
          <ToastContainer />
        </ChatApiContext.Provider>
      </AuthProvider>
    </Provider>
  );
};

export default App;
