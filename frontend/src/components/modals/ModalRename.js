import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { useRollbar } from '@rollbar/react';
import { useFormik } from 'formik';

import { ModalHeader, ModalForm } from './modalComponents';
import { getChannels } from '../../redux/selectors';
import { useChatApi } from '../../hooks';
import { channelValidate } from '../../schemas/validation';

const ModalRename = ({ closeModal, modalInfo }) => {
  const { t } = useTranslation();
  const { renameChannel } = useChatApi();
  const inputRef = useRef(null);
  const channels = useSelector(getChannels);
  const channel = channels.find(({ id }) => modalInfo.extra.channelId === id);
  const channelNames = channels.map(({ name }) => name);
  const rollbar = useRollbar();

  useEffect(() => {
    setTimeout(() => inputRef.current.select());
  }, []);

  const formik = useFormik({
    initialValues: {
      name: `${channel.name}`,
    },
    validationSchema: channelValidate(channelNames),
    onSubmit: async ({ name }, actions) => {
      const filteredName = leoProfanity.clean(name);
      const renamedChannel = { id: channel.id, name: filteredName };
      try {
        channelValidate(channelNames).validateSync({ name: filteredName });
        await renameChannel(renamedChannel);
        toast.success(t('modals.channelRenamed'));
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
      <ModalHeader title={t('modals.renameChannel')} />
      <ModalForm formik={formik} t={t} closeModal={closeModal} inputRef={inputRef} />
    </>
  );
};

export default ModalRename;
