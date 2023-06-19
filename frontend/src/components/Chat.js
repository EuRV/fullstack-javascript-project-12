import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row, Spinner } from 'react-bootstrap';
import { useRollbar } from '@rollbar/react';
import { useAuth } from '../hooks';
import { authFetch } from '../api/controllers';
import { setInitialState } from '../redux/slices/channelsSlice';

import Channels from './chat/Channels';
import Messages from './chat/Messages';
import Modals from './Modals';

const Chat = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { user, signOut } = useAuth();
  const rollbar = useRollbar();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await authFetch(user.token);
        dispatch(setInitialState(data));
        setIsLoading(false);
      } catch (error) {
        rollbar.error(error);
        console.error(error);
        signOut();
      }
    };
    fetchData();
  }, [dispatch, signOut, user.token, rollbar]);

  return isLoading ? (
    <Container className="h-100 max-height-90 overflow-hidden rounded shadow d-flex justify-content-center align-items-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  ) : (
    <>
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Channels />
          <Messages />
        </Row>
      </Container>
      <Modals />
    </>
  );
};

export default Chat;
