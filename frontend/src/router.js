import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Panel from './components/Panel';
import NotFoundPage from './components/NotFoundPage';
import PrivateRoute from './components/PrivatePage';
import Chat from './components/chat/Chat';
import LoginPage from './components/LoginPage';

export default createBrowserRouter([
  {
    path: '/',
    element: <Panel />,
    children: [
      {
        path: '/',
        element: (
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
        ),
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
