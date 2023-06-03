import React from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';

import { getMessagesCurrentChannel } from '../../redux/selectors';
import Message from './Message';
import MessageHeader from './MessageHeader';

const ChatMessages = () => {
  const messages = useSelector(getMessagesCurrentChannel);
  const { length } = messages;

  return (
    <Col className="p-0 h-100">
      <MessageHeader />
      <div id="messages-box" className="chat-messages overflow-auto px-5 ">
        {length > 0 && messages
          .map((message) => <Message key={message.id} message={message} />)}
      </div>
    </Col>
  );
};

export default ChatMessages;
