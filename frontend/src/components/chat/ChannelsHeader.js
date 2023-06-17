import React from 'react';
import { Button } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';

const ChannelsHeader = ({ title, handleClick }) => (
  <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
    <b>{title}</b>
    <Button
      type="button"
      className="p-0 text-primary"
      variant="group-vertical"
      onClick={handleClick}
    >
      <PlusSquare size={20} />
      <span className="visually-hidden">+</span>
    </Button>
  </div>
);

export default ChannelsHeader;
