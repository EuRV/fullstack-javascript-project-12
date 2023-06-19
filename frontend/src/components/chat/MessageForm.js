import React, { useEffect, useRef } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { useRollbar } from '@rollbar/react';
import { toast } from 'react-toastify';
import { useAuth, useChatApi } from '../../hooks';
import { messageValidate } from '../../schemas/validation';

const MessageForm = ({ channelId }) => {
  const { t } = useTranslation();
  const api = useChatApi();
  const { user } = useAuth();
  const inputRef = useRef(null);
  const rollbar = useRollbar();

  useEffect(() => {
    inputRef.current.focus();
  }, [channelId]);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: messageValidate,
    onSubmit: async (values, actions) => {
      const filtered = leoProfanity.clean(values.body);
      const message = {
        body: filtered,
        channelId,
        username: user.username,
      };

      try {
        await api.sendMessage(message);
        actions.resetForm();
      } catch (error) {
        rollbar.error(error);
        console.log(error);
        actions.setSubmitting(false);
        toast.error(t(error.message));
        throw error;
      }
      inputRef.current.focus();
    },
    validateOnBlur: false,
  });

  const isInvalid = !formik.dirty || !formik.isValid;

  return (
    <div className="mt-auto px-5 py-3">
      <Form noValidate className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
        <InputGroup hasValidation={isInvalid}>
          <Form.Control
            name="body"
            ref={inputRef}
            aria-label={t('chat.newMessage')}
            placeholder={t('chat.enterMessage')}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.body}
            disabled={formik.isSubmitting}
            className="border-0 p-0 ps-2"
          />
          <Button
            type="submit"
            variant="group-vertical"
            className="border-0"
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
