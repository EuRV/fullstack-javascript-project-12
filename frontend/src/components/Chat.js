/* eslint-disable functional/no-conditional-statements */
/* eslint-disable functional/no-expression-statements */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Spinner } from 'react-bootstrap';
import { fetchAuthData } from '../redux/slices/loaderSlices';
import useAuth from '../hooks';

import ChatChannels from './chatComponents/ChatChannels';
import ChatMessages from './chatComponents/ChatMessages';

const Chat = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { user: { token } } = useAuth();
  const { loadingStatus, error } = useSelector((state) => state.loader);

  useEffect(() => {
    dispatch(fetchAuthData(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (loadingStatus === 'success') {
      setLoading(true);
    }
    if (loadingStatus === 'failed') {
      if (error.status === 401) {
        return;
      }
      if (error === 'AxiosError') {
        toast.error('error.network');
        return;
      }
      toast.error('error.unknow');
    }
  }, [loadingStatus, error]);

  return loading ? (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <ChatChannels />
        <ChatMessages />
      </Row>
    </Container>
  ) : (
    <Container>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  );
};

export default Chat;
