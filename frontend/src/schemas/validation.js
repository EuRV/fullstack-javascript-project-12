import * as yup from 'yup';

yup.setLocale({
  mixed: {
    notOneOf: 'errors.duplicationChannel',
    required: 'errors.requiredField',
  },
  string: {
    min: 'errors.lengthName',
    max: 'errors.lengthName',
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
  body: yup
    .string()
    .trim()
    .required(),
});

const signUpValidate = yup.object({
  username: yup
    .string()
    .required()
    .min(3)
    .max(20),
  password: yup
    .string()
    .required()
    .min(6, 'errors.lengthPassword'),
  confirmPassword: yup
    .string()
    .test('confirmPassword', 'errors.confirmed', (value, context) => value === context.parent.password),
});

export { channelValidate, messageValidate, signUpValidate };
