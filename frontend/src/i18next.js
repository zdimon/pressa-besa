import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';


i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    initImmediate : false,
    debug: true,
    backend: {
        loadPath: 'http://localhost:8000/ru/translate'
      }
  });


export default i18n;