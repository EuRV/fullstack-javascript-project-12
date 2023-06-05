import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Col, Nav } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';

import { getChannels } from '../../redux/selectors';
import Channel from './Channel';

const ChatChannels = () => {
  const { t } = useTranslation();
  const channels = useSelector(getChannels);
  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chat.channels')}</b>
        <Button type="button" className="p-0 text-primary" variant="group-vertical">
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav id="channels-box" as="ul" variant="pills" className="flex-column px-2 mb-3 overflow-auto h-100 d-block" fill>
        {channels.map((channel) => (
          <Channel key={channel.id} channel={channel} />
        ))}
      </Nav>
    </Col>
  );
};

export default ChatChannels;
