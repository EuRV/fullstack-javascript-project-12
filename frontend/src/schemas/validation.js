/* eslint-disable functional/no-expression-statements */
import * as yup from 'yup';

yup.setLocale({
  mixed: {
    notOneOf: 'errors.duplicationChannel',
    required: 'errors.requiredField',
  },
  string: {
    min: 'errors.lengthChannelName',
    max: 'errors.lengthChannelName',
  },
});

const channelValidate = (channels) => yup.object({
  name: yup
    .string()
    .trim()
    .required()
    .min(3)
    .max(20)
    .notOneOf(channels),
});

const messageValidate = yup.object({
  body: yup.string().required().min(1).max(50),
});

export { channelValidate, messageValidate };
