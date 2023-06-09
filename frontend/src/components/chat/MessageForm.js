/* eslint-disable functional/no-expression-statements */
import React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
// import { toast } from 'react-toastify';
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
    onSubmit: async ({ body }, action) => {
      const message = {
        body,
        channelId,
        username: user.username,
      };
      await api.sendMessage(message)
        .then(() => {
          action.resetForm();
        })
        .catch((error) => console.error(error));
    },
  });

  const isInvalid = !formik.dirty || !formik.isValid;

  return (
    <div className="mt-auto px-5 py-3">
      <Form noValidate className="py-1 border rounded-2">
        <InputGroup hasValidation={isInvalid}>
          <Form.Control
            name="body"
            aria-label={t('chat.newMessage')}
            placeholder={t('chat.enterMessage')}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.username}
            className="border-0 p-0 ps-2"
          />
          <Button
            type="submit"
            variant="group-vertical"
            className="border-0"
            onClick={formik.handleSubmit}
            disabled={isInvalid}
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
