import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Panel from './components/Panel';
import NotFound from './components/NotFound';
import PrivatePage from './components/PrivatePage';
import Chat from './components/Chat';
import Login from './components/Login';
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
        element: <Login />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
