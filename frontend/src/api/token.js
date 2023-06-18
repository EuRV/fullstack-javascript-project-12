const TOKEN_KEY = 'userId';

const getToken = () => {
  const storedToken = localStorage.getItem(TOKEN_KEY);
  return !storedToken ? null : JSON.parse(storedToken);
};

const setToken = (token) => localStorage.setItem(TOKEN_KEY, JSON.stringify(token));

const removeToken = () => localStorage.removeItem(TOKEN_KEY);

export { getToken, setToken, removeToken };
