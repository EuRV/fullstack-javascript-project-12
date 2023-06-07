import axios from 'axios';
import routes from './requestRoutes';

const logIn = async ({ username, password }) => {
  const { data } = await axios.post(routes.loginPath(), { username, password });
  return data;
};

const fetchData = async (token) => {
  const { data } = await axios.get(routes.dataPath(), {
    headers:
    { Authorization: `Bearer ${token}` },
  });
  return data;
};

// eslint-disable-next-line import/prefer-default-export
export { logIn, fetchData };
