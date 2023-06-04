/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable functional/no-expression-statements */
import React, { useState, useMemo } from 'react';
import { AuthContext } from './index';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('userId'));
  const [loggedIn, setLoggedIn] = useState(Boolean(currentUser));
  const [user, setUser] = useState(currentUser || null);

  const signIn = (data) => {
    setUser(data);
    setLoggedIn(true);
  };
  const signOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const cachedValue = useMemo(() => (
    {
      loggedIn, user, signIn, signOut,
    }
  ), [loggedIn, user, signIn]);

  return (
    <AuthContext.Provider value={cachedValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
