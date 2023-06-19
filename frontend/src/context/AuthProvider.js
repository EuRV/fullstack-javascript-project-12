import React, { useState, useMemo } from 'react';
import { AuthContext } from './index';
import { getToken, setToken, removeToken } from '../api/token';

const AuthProvider = ({ children }) => {
  const currentUser = getToken();
  const [loggedIn, setLoggedIn] = useState(Boolean(currentUser));
  const [user, setUser] = useState(currentUser || null);

  const signIn = (data) => {
    setToken(data);
    setUser(data);
    setLoggedIn(true);
  };

  const signOut = () => {
    removeToken();
    setLoggedIn(false);
  };

  const cachedValue = useMemo(() => (
    {
      loggedIn, user, signIn, signOut,
    }
  ), [loggedIn, user]);

  return (
    <AuthContext.Provider value={cachedValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
