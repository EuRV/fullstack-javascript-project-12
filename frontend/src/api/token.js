const TOKEN_KEY = 'userId';

const getToken = () => {
  const storedToken = localStorage.getItem(TOKEN_KEY);
  return !storedToken ? JSON.parse(storedToken) : null;
};

const setToken = (token) => localStorage.setItem(TOKEN_KEY, JSON.stringify(token));

const removeToken = () => localStorage.removeItem(TOKEN_KEY);

export { getToken, setToken, removeToken };
