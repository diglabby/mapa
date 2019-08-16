//rtyff

import i18n from 'i18next';
import by   from './locales/translation-by.json';
import en   from './locales/translation-en.json';

import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .init({
    lng: 'by',
    resources: {
      by: { translation: by },
      en: { translation: en }

    },
    fallbackLng: 'en'
  });

export default i18n;