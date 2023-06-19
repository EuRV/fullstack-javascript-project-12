import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { animateScroll } from 'react-scroll';
import { Col, Nav } from 'react-bootstrap';

import { getChannels, getCurrentChannelId, getDefaultChannelId } from '../../redux/selectors';
import { open } from '../../redux/slices/modalsSlice';
import ChannelsHeader from './ChannelsHeader';
import Channel from './Channel';

const Channels = () => {
  const { t } = useTranslation();
  const channels = useSelector(getChannels);
  const currentChannelId = useSelector(getCurrentChannelId);
  const defaultChannelId = useSelector(getDefaultChannelId);
  const lastChannelsItemId = channels.at(-1)?.id;
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentChannelId === defaultChannelId) {
      animateScroll.scrollToTop({ containerId: 'channels-box', delay: 0, duration: 0 });
    }
    if (currentChannelId === lastChannelsItemId) {
      animateScroll.scrollToBottom({ containerId: 'channels-box', delay: 0, duration: 0 });
    }
  }, [currentChannelId, lastChannelsItemId, defaultChannelId]);

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
