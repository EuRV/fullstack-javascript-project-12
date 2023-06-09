/* eslint-disable functional/no-expression-statements */
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Button, Nav, ButtonGroup, Dropdown,
} from 'react-bootstrap';
import { setCurrentChannel } from '../../redux/slices/channelsSlice';
import { open } from '../../redux/slices/modalsSlice';

const Channel = ({ channel, currentChannelId }) => {
  const dispatch = useDispatch();

  const handleChoose = (id) => {
    dispatch(setCurrentChannel(id));
  };

  const openModal = () => {
    dispatch(open({ type: 'removeChannel', extra: { channelId: channel.id } }));
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
        />
        <Dropdown.Menu>
          <Dropdown.Item onClick={openModal}>Удалить</Dropdown.Item>
          <Dropdown.Item>Переименовать</Dropdown.Item>
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
