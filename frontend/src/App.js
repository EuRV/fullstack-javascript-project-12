/* eslint-disable functional/no-conditional-statements */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable functional/no-expression-statements */
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-bootstrap';
import { io } from 'socket.io-client';
import router from './router';

import store from './redux/store';
import { actions as messageActions } from './redux/slices/messagesSlices';
import { actions as channelActions } from './redux/slices/channelsSlice';
import AuthProvider from './context/AuthProvider';
import { ChatApiContext } from './context';

const App = () => {
  const { dispatch } = store;
  const socket = io();

  socket.on('newMessage', (payload) => {
    dispatch(messageActions.addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    dispatch(channelActions.addChannel(payload));
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
          <div className="d-flex flex-column h-100">
            <RouterProvider router={router}>
              <ToastContainer />
            </RouterProvider>
          </div>
        </ChatApiContext.Provider>
      </AuthProvider>
    </Provider>
  );
};

export default App;
