/* eslint-disable functional/no-expression-statements */
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useChatApi } from '../../hooks';

import ModalHeader from './ModalHeader';

const ModalRemove = ({ closeModal, modalInfo }) => {
  const { t } = useTranslation();
  const [sending, setSending] = useState(false);
  const { removeChannel } = useChatApi();

  const handleRemove = async () => {
    setSending(true);
    try {
      await removeChannel({ id: modalInfo.extra.channelId });
      toast.success(t('modals.channelRemoved'));
      closeModal();
    } catch (error) {
      setSending(false);
      toast.error(t(error.message));
    }
  };

  return (
    <>
      <ModalHeader title={t('modals.removeChannel')} />
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
