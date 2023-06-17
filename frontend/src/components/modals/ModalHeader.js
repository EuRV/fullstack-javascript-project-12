import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalHeader = ({ title }) => (
  <Modal.Header closeButton>
    <Modal.Title>{title}</Modal.Title>
  </Modal.Header>
);

export default ModalHeader;
