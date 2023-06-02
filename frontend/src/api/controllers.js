import axios from 'axios';
import routes from './requestRoutes';

const logIn = async ({ username, password }) => {
  const { data } = await axios.post(routes.loginPath(), { username, password });
  return data;
};

const getData = async (token) => {
  const { data } = await axios.get(routes.dataPath(), {
    headers:
      { Authorization: `Bearer ${token}` },
  });
  // eslint-disable-next-line functional/no-expression-statements
  console.log(data);
  const { channels, messages } = data;
  return { channels, messages };
};

export { logIn, getData };
