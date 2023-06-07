import React from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';

import { getCurrentChannel, getMessagesCurrentChannel } from '../../redux/selectors';
import Message from './Message';
import MessageHeader from './MessageHeader';
import MessageFoorm from './MessageForm';

const Messages = () => {
  const channel = useSelector(getCurrentChannel);
  const messages = useSelector(getMessagesCurrentChannel);
  const { length } = messages;

  // eslint-disable-next-line functional/no-expression-statements
  // console.log(channel);

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <MessageHeader name={channel.name} length={length} />
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {length > 0 && messages
            .map((message) => <Message key={message.id} message={message} />)}
        </div>
        <MessageFoorm channelId={channel.id} />
      </div>
    </Col>
  );
};

export default Messages;
