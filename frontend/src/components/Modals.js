/* eslint-disable functional/no-expression-statements */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { close } from '../redux/slices/modalsSlice';
import { getChannels } from '../redux/selectors';
import { useChatApi } from '../hooks';
import { actions } from '../redux/slices/channelsSlice';
import { channelValidate } from '../schemas/validation';

const Modals = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isOpened } = useSelector((state) => state.modal);
  const { addChannel } = useChatApi();
  const channels = useSelector(getChannels);
  const channelNames = channels.map(({ name }) => name);
  const { setCurrentChannel } = actions;

  const handleClose = () => {
    dispatch(close());
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: channelValidate(channelNames),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      await addChannel(values)
        .then(({ id }) => dispatch(setCurrentChannel(id)))
        .then(() => handleClose());
    },
  });

  console.log(formik.errors);
  return (
    <Modal show={isOpened} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Form.Group controlId="name">
            <Form.Control
              name="name"
              className="mb-2"
              required
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.name}
            />
            <Form.Label visuallyHidden>{t('modals.channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">{t(formik.errors.name)}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={handleClose}>
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
