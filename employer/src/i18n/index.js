import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslation from '../../public/locales/en/translation.json';
import deTranslation from '../../public/locales/de/translation.json';
import trTranslation from '../../public/locales/tr/translation.json';

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
            // React already does escaping
            escapeValue: false,
        },

        // Translation options
        load: 'languageOnly', // Load only language code (not region)

        // React options
        react: {
            // Use Suspense for async loading
            useSuspense: false,
        }
    });

export default i18n;
