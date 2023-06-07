/* eslint-disable functional/no-expression-statements */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Modal, Form,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { closeModal } from '../redux/slices/modalsSlice';

const Modals = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isOpened } = useSelector((state) => state.modal);

  const handleColse = () => {
    dispatch(closeModal());
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
  });

  console.log(formik.values);
  return (
    <Modal show={isOpened} onHide={handleColse} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Control
              name="name"
              className="mb-2"
              required
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <Form.Label visuallyHidden>{t('modals.channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid" />
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={handleColse}>
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
