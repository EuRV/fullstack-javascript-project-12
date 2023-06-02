/* eslint-disable functional/no-expression-statements */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';

import useAuth from '../hooks';
import { actions as channelsActions } from '../redux/slices/channelsSlice';
import { actions as messagesActions } from '../redux/slices/messagesSlices';
import { getData } from '../api/controllers';
import ChatChannels from './chatComponents/ChatChannels';
import ChatMessages from './chatComponents/ChatMessages';

const Chat = () => {
  const dispatch = useDispatch();
  const { user: { token } } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const { channels, messages } = await getData(token);
      dispatch(channelsActions.addChannels(channels));
      dispatch(messagesActions.addMessages(messages));
    };
    fetchData();
  });

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <ChatChannels />
        <ChatMessages />
      </Row>
    </Container>
  );
};

export default Chat;
