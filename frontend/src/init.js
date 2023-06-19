/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
// import Rollbar from 'rollbar';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import leoProfanity from 'leo-profanity';

import store from './redux/store';
import App from './components/App';
import { addMessage } from './redux/slices/messagesSlices';
import {
  addChannel, removeChannel, setCurrentChannel, renameChannel,
} from './redux/slices/channelsSlice';
import { ChatApiContext } from './context';
import resources from './locales/resources';
import badWords from './locales/badWords.js';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  payload: {
    environment: 'production',
  },
  captureUncaught: true,
  captureUnhandledRejections: true,
};

export default async (socket) => {
  const { dispatch } = store;

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

  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
      resources,
    });

  const vdom = (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <ChatApiContext.Provider value={api}>
              <App />
            </ChatApiContext.Provider>
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );

  return vdom;
};
