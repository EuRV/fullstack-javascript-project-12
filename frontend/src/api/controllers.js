import axios from 'axios';
import routes from './requestRoutes';
import { getToken } from './token';

const logIn = async ({ username, password }) => (
  axios.post(routes.loginPath(), { username, password })
);

const signUp = async (form) => (
  axios.post(routes.signupPath(), form)
);

const authFetch = async (token) => {
  const accessToken = token ?? getToken()?.token;
  const options = {
    headers:
      { Authorization: `Bearer ${accessToken}` },
  };

  return axios.get(routes.dataPath(), options);
};

export { logIn, signUp, authFetch };
