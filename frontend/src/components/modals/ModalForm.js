import React from 'react';
import { Button, Form } from 'react-bootstrap';

const ModalForm = ({
  formik,
  t,
  closeModal,
  inputRef,
}) => (
  <Form onSubmit={formik.handleSubmit}>
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
);

export default ModalForm;
