import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Container } from 'react-bootstrap';

import { getCurrentChannel, getMessagesCurrentChannel } from '../../redux/selectors';
import Message from './Message';
import MessageHeader from './MessageHeader';
import MessageFoorm from './MessageForm';

const ChatMessages = () => {
  const { id, name } = useSelector(getCurrentChannel);
  const messages = useSelector(getMessagesCurrentChannel);
  const { length } = messages;

  return (
    <Col className="p-0 h-100">
      <Container className="d-flex flex-column h-100">
        <MessageHeader name={name} length={length} />
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {length > 0 && messages
            .map((message) => <Message key={message.id} message={message} />)}
        </div>
        <MessageFoorm channelId={id} />
      </Container>
    </Col>
  );
};

export default ChatMessages;
