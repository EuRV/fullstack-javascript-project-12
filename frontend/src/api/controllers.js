import axios from 'axios';
import routes from './requestRoutes';

const logIn = async ({ username, password }) => {
  const { data } = await axios.post(routes.loginPath(), { username, password });
  return data;
};

const signUp = async (form) => {
  const { data } = await axios.post(routes.signupPath(), form);
  return data;
};

const fetchData = async (token) => {
  const { data } = await axios.get(routes.dataPath(), {
    headers:
    { Authorization: `Bearer ${token}` },
  });
  return data;
};

export { logIn, signUp, fetchData };
