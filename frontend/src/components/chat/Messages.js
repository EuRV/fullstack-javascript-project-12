import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import { animateScroll } from 'react-scroll';

import { getCurrentChannel, getMessagesCurrentChannel } from '../../redux/selectors';
import Message from './Message';
import MessageHeader from './MessageHeader';
import MessageFoorm from './MessageForm';

const Messages = () => {
  const channel = useSelector(getCurrentChannel); // разобраться почему сначала приходит undefined
  const messages = useSelector(getMessagesCurrentChannel);
  const { length } = messages;

  useEffect(() => {
    animateScroll.scrollToBottom({ containerId: 'messages-box', delay: 0, duration: 0 });
  }, [length]);

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <MessageHeader name={channel?.name} length={length} />
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {length > 0 && messages
            .map((message) => <Message key={message.id} message={message} />)}
        </div>
        <MessageFoorm channelId={channel?.id} />
      </div>
    </Col>
  );
};

export default Messages;
