/* eslint-disable functional/no-expression-statements */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';

import useAuth from '../hooks';
import { actions as channelsActions } from '../redux/slices/channelsSlice';
import { actions as messagesActions } from '../redux/slices/messagesSlices';
import { getData } from '../api/controllers';

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
    <Container className="h-100 my-4 overflow-hidden rounded shadow" />
  );
};

export default Chat;
