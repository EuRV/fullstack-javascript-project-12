import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Panel from './components/Panel';
import NotFoundPage from './components/NotFoundPage';
import PrivatePage from './components/PrivatePage';
import Chat from './components/Chat';
import LoginPage from './components/LoginPage';
import SignUp from './components/SignUp';

export default createBrowserRouter([
  {
    path: '',
    element: <Panel />,
    children: [
      {
        path: '/',
        element: (
          <PrivatePage>
            <Chat />
          </PrivatePage>
        ),
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
