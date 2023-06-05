import * as yup from 'yup';

const messageValidate = yup.object({
  body: yup.string().required().min(5).max(50),
});

export default messageValidate;
