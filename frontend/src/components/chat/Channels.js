/* eslint-disable functional/no-expression-statements */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col, Nav } from 'react-bootstrap';

import { getChannels, getCurrentChannelId } from '../../redux/selectors';
import { open } from '../../redux/slices/modalsSlice';
import ChannelsHeader from './ChannelsHeader';
import Channel from './Channel';

const Channels = () => {
  const { t } = useTranslation();
  const channels = useSelector(getChannels);
  const currentChannelId = useSelector(getCurrentChannelId);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(open({ type: 'addChannel' }));
  };

  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <ChannelsHeader title={t('chat.channels')} handleClick={handleClick} />
      <Nav id="channels-box" as="ul" variant="pills" className="flex-column px-2 mb-3 overflow-auto h-100 d-block" fill>
        {channels.map((channel) => (
          <Channel key={channel.id} channel={channel} currentChannelId={currentChannelId} />
        ))}
      </Nav>
    </Col>
  );
};

export default Channels;
