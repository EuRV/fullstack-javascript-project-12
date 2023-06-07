/* eslint-disable functional/no-expression-statements */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { closeModal } from '../redux/slices/modalsSlice';
import { getChannels } from '../redux/selectors';

yup.setLocale({
  mixed: {
    notOneOf: 'errors.duplicationChannel',
  },
});

const Modals = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isOpened } = useSelector((state) => state.modal);
  const channelNames = useSelector(getChannels).map(({ name }) => name);

  const handleColse = () => {
    dispatch(closeModal());
  };

  const validationSchema = yup.object({
    name: yup.string().notOneOf(channelNames),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      console.log(!formik.errors.name, values.name);
    },
  });

  // console.log(formik.errors.name);
  return (
    <Modal show={isOpened} onHide={handleColse} centered>
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
