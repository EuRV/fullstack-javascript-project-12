import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Button, Nav, ButtonGroup, Dropdown,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { setCurrentChannel } from '../../redux/slices/channelsSlice';
import { open } from '../../redux/slices/modalsSlice';

const Channel = ({ channel, currentChannelId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleChoose = (id) => {
    dispatch(setCurrentChannel(id));
  };

  const openModal = ({ type }) => {
    dispatch(open({ type, extra: { channelId: channel.id } }));
  };

  return channel.removable ? (
    <Nav.Item as="li" className="w-100">
      <Dropdown
        className="d-flex"
        as={ButtonGroup}
      >
        <Button
          className="w-100 rounded-0 text-start text-truncate"
          onClick={() => handleChoose(channel.id)}
          variant={channel.id === currentChannelId ? 'secondary' : null}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
        <Dropdown.Toggle
          className="flex-grow-0"
          variant={channel.id === currentChannelId ? 'secondary' : null}
          split
        >
          <span className="visually-hidden">{t('chat.control')}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => openModal({ type: 'removeChannel' })}>{t('chat.remove')}</Dropdown.Item>
          <Dropdown.Item onClick={() => openModal({ type: 'renameChannel' })}>{t('chat.rename')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
  ) : (
    <Nav.Item as="li" className="w-100">
      <Button
        className="w-100 rounded-0 text-start"
        variant={channel.id === currentChannelId ? 'secondary' : null}
        onClick={() => handleChoose(channel.id)}
      >
        <span className="me-1">#</span>
        {channel.name}
      </Button>
    </Nav.Item>
  );
};

export default Channel;
