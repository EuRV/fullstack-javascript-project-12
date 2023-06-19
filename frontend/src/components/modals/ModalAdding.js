import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { useRollbar } from '@rollbar/react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

import { ModalHeader, ModalForm } from './modalComponents';
import { getChannels } from '../../redux/selectors';
import { useChatApi } from '../../hooks';
import { channelValidate } from '../../schemas/validation';

const ModalAdding = ({ closeModal }) => {
  const { t } = useTranslation();
  const { addChannel } = useChatApi();
  const inputRef = useRef(null);
  const channels = useSelector(getChannels);
  const channelNames = channels.map(({ name }) => name);
  const rollbar = useRollbar();

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
        rollbar.error(error);
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
      <ModalHeader title={t('modals.addChannel')} />
      <ModalForm formik={formik} t={t} closeModal={closeModal} inputRef={inputRef} />
    </>
  );
};

export default ModalAdding;
