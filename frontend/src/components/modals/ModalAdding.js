/* eslint-disable functional/no-expression-statements */
import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { getChannels } from '../../redux/selectors';
import { useChatApi } from '../../hooks';
import { channelValidate } from '../../schemas/validation';

const ModalAdding = ({ closeModal }) => {
  const { t } = useTranslation();
  const { addChannel } = useChatApi();
  const inputRef = useRef(null);
  const channels = useSelector(getChannels);
  const channelNames = channels.map(({ name }) => name);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: channelValidate(channelNames),
    onSubmit: async ({ name }, actions) => {
      const filteredName = leoProfanity.clean(name);
      const channelName = { name: filteredName };
      try {
        channelValidate(channelNames).validateSync({ name: filteredName });
        await addChannel(channelName);
        toast.success(t('modals.channelCreated'));
        closeModal();
      } catch (error) {
        actions.setSubmitting(false);
        inputRef.current.select();
        if (error.name === 'ValidationError') {
          formik.values.name = filteredName;
          actions.setErrors({ name: error.message });
          return;
        }
        toast.error(t(error.message));
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Form.Group controlId="name">
            <Form.Control
              name="name"
              className="mb-2"
              disabled={formik.isSubmitting}
              ref={inputRef}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              isInvalid={formik.errors.name && formik.touched.name}
            />
            <Form.Label visuallyHidden>{t('modals.channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">{t(formik.errors.name)}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={closeModal}>
                {t('modals.cancel')}
              </Button>
              <Button type="submit" variant="primary" disabled={formik.isSubmitting}>
                {t('modals.send')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

export default ModalAdding;
