/* eslint-disable functional/no-expression-statements */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { setCurrentChannel } from '../../redux/slices/channelsSlice';
import { useChatApi } from '../../hooks';
import { getCurrentChannelId } from '../../redux/selectors';

const ModalRemove = ({ closeModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [sending, setSending] = useState(false);
  // const { setCurrentChannel } = channelActions;
  const { removeChannel } = useChatApi();

  const channelId = useSelector(getCurrentChannelId);

  const handleRemove = async () => {
    setSending(true);
    try {
      await removeChannel({ id: channelId });
      dispatch(setCurrentChannel(1));
      closeModal();
    } catch (error) {
      setSending(false);
      console.error(error);
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.removeLable')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={closeModal} disabled={sending}>
            {t('modals.cancel')}
          </Button>
          <Button variant="danger" onClick={handleRemove} disabled={sending}>
            {t('modals.remove')}
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};

export default ModalRemove;
