/* eslint-disable functional/no-expression-statements */
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';

import useAuth from '../hooks';
import routes from '../routes';

const Chat = () => {
  const { user: { token } } = useAuth();
  const [state, setState] = useState();

  useEffect(() => {
    axios.get(routes.dataPath(), {
      headers:
        { Authorization: `Bearer ${token}` },
    })
      .then(({ data }) => setState(data));
  }, [token]);

  // eslint-disable-next-line functional/no-expression-statements
  console.log(state);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow" />
  );
};

export default Chat;
