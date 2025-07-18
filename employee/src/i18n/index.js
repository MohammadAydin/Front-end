import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslation from '../locales/en/translation.json';
import deTranslation from '../locales/de/translation.json';
import trTranslation from '../locales/tr/translation.json';

// Translation resources
const resources = {
    en: {
        translation: enTranslation
    },
    de: {
        translation: deTranslation
    },
    tr: {
        translation: trTranslation
    }
};

i18n
    // Detect user language
    .use(LanguageDetector)
    // Pass the i18n instance to react-i18next
    .use(initReactI18next)
    // Initialize i18next
    .init({
        resources,

        // Default language
        fallbackLng: 'en',

        // Debug mode (set to false in production)
        debug: process.env.NODE_ENV === 'development',

        // Language detection options
        detection: {
            // Order of language detection methods
            order: ['localStorage', 'navigator', 'htmlTag'],

            // Cache user language in localStorage
            caches: ['localStorage'],

            // Storage key for localStorage
            lookupLocalStorage: 'i18nextLng',

            // Check for language in these HTML attributes
            htmlTag: document.documentElement,

            // Don't convert language codes to lowercase
            convertDetectedLanguage: (lng) => lng
        },

        // Interpolation options
        interpolation: {
            escapeValue: false // React already escapes values
        },

        // React options
        react: {
            useSuspense: false // Disable suspense for better error handling
        }
    });

export default i18n;
