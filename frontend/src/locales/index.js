/* eslint-disable functional/no-expression-statements */
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './resources';

i18next
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
    resources,
  });

export default i18next;
