import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import deTranslation from '../locales/de/translation.json';
import enTranslation from '../locales/en/translation.json';
import trTranslation from '../locales/tr/translation.json';

const resources = {
    de: {
        translation: deTranslation,
    },
    en: {
        translation: enTranslation,
    },
    tr: {
        translation: trTranslation,
    },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: undefined, // let the detector determine the language
        fallbackLng: 'de',
        detection: {
            order: ['localStorage', 'navigator', 'htmlTag'],
            lookupLocalStorage: 'i18nextLng',
            caches: ['localStorage'],
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
