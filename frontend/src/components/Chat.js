/* eslint-disable functional/no-conditional-statements */
/* eslint-disable functional/no-expression-statements */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row, Spinner } from 'react-bootstrap';
// import { fetchAuthData } from '../../redux/slices/loaderSlices';
import { useAuth } from '../hooks';
import { fetchData } from '../api/controllers';
import { addChannels, setCurrentChannel } from '../redux/slices/channelsSlice';
import { actions as messageActions } from '../redux/slices/messagesSlices';

import Channels from './chat/Channels';
import Messages from './chat/Messages';
import Modals from './Modals';

const Chat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData(user.token);
        dispatch(addChannels(data.channels));
        dispatch(setCurrentChannel(data.currentChannelId));
        dispatch(messageActions.addMessages(data.messages));
        // eslint-disable-next-line no-unused-expressions
        data ? setIsLoading(true) : setIsLoading(false);
      } catch (error) {
        console.error(error);
        signOut();
      }
    };
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? (
    <>
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Channels />
          <Messages />
        </Row>
      </Container>
      <Modals />
    </>
  ) : (
    <Container className="h-100 max-height-90 overflow-hidden rounded shadow d-flex justify-content-center align-items-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  );
};

export default Chat;
