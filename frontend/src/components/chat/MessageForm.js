/* eslint-disable functional/no-expression-statements */
import React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useAuth, useChatApi } from '../../hooks';
import { messageValidate } from '../../schemas/validation';

const MessageForm = ({ channelId }) => {
  const { t } = useTranslation();
  const api = useChatApi();
  const { user } = useAuth();

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: messageValidate,
    onSubmit: async (values, actions) => {
      const message = {
        body: values.body,
        channelId,
        username: user.username,
      };

      try {
        await api.sendMessage(message);
        actions.resetForm();
      } catch (error) {
        console.log(error);
        actions.setSubmitting(false);
        toast.error(t('errors.network'));
        throw error;
      }
    },
  });

  const isInvalid = !formik.dirty || !formik.isValid;

  return (
    <div className="mt-auto px-5 py-3">
      <Form noValidate className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
        <InputGroup hasValidation={isInvalid}>
          <Form.Control
            name="body"
            aria-label={t('chat.newMessage')}
            placeholder={t('chat.enterMessage')}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.body}
            className="border-0 p-0 ps-2"
          />
          <Button
            type="submit"
            variant="group-vertical"
            className="border-0"
            disabled={formik.isSubmitting}
          >
            <ArrowRightSquare size={20} />
            <span className="visually-hidden">{t('chat.send')}</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessageForm;
