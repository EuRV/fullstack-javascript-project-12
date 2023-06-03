/* eslint-disable functional/no-expression-statements */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Nav } from 'react-bootstrap';
import { actions } from '../../redux/slices/channelsSlice';
import { getCurrentChannelId } from '../../redux/selectors';

const Channel = ({ channel }) => {
  const currentChannelId = useSelector(getCurrentChannelId);
  const dispatch = useDispatch();

  const handleChoose = (id) => {
    dispatch(actions.setCurrentChannel(id));
  };

  return (
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
