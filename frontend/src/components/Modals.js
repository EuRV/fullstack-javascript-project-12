import React from 'react';
import {
  Button, Modal, Form,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Modals = () => {
  const { t } = useTranslation();
  return (
    <Modal centered>
      <Modal.Header>
        <Modal.Title>{t('modals.addChannel')}</Modal.Title>
        <Button aria-label="Close" data-bs-dismiss="modal" variant="close" />
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Control
              name="name"
              className="mb-2"
              value=""
            />
            <Form.Label visuallyHidden>{t('modals.channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid" />
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2">
                {t('modals.cancel')}
              </Button>
              <Button type="submit" variant="primary">
                {t('modals.send')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Modals;
