import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { close } from '../redux/slices/modalsSlice';
import getModal from './modals';

const Modals = () => {
  const dispatch = useDispatch();
  const modalInfo = useSelector((state) => state.modal);

  const handleClose = () => {
    dispatch(close());
  };

  const ActiveModal = getModal(modalInfo.type);

  return (
    <Modal show={modalInfo.isOpened} onHide={handleClose} centered>
      {ActiveModal && <ActiveModal closeModal={handleClose} modalInfo={modalInfo} />}
    </Modal>
  );
};

export default Modals;
