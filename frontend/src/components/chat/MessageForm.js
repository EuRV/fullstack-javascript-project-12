/* eslint-disable functional/no-expression-statements */
import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
// import { toast } from 'react-toastify';
import { useAuth, useChatApi } from '../../hooks';

const MessageForm = ({ channelId }) => {
  const { t } = useTranslation();
  const api = useChatApi();
  const { user } = useAuth();
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async ({ body }) => {
      const message = {
        body,
        channelId,
        username: user.username,
      };
      await api.sendMessage(message)
        .then(() => {
          formik.resetForm();
        })
        .catch((error) => console.error(error));
    },
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form noValidate className="py-1 border rounded-2">
        <InputGroup className="has-validation">
          <Form.Control
            name="body"
            aria-label={t('chat.newMessage')}
            placeholder={t('chat.enterMessage')}
            className="border-0 p-0 ps-2"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          <button
            type="submit"
            className="btn btn-group-vertical"
            onClick={formik.handleSubmit}
            disabled=""
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
            </svg>
            <span className="visually-hidden">{t('chat.send')}</span>
          </button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessageForm;
