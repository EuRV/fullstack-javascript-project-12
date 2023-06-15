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
import { actions as messageActions } from './redux/slices/messagesSlices';
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
    dispatch(messageActions.addMessage(payload));
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

  const promiseWrapper = (...args) => new Promise((resolve, reject) => {
    socket.emit(...args, (response) => {
      if (response.status === 'ok') {
        resolve(response.data);
      }
      reject(response.error);
    });
  });

  const api = {
    sendMessage: (message) => promiseWrapper('newMessage', message),
    addChannel: (channel) => promiseWrapper('newChannel', channel),
    removeChannel: (channel) => promiseWrapper('removeChannel', channel),
    renameChannel: (channel) => promiseWrapper('renameChannel', channel),
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
