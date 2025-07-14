import React from 'react';
import { useTranslation } from 'react-i18next';

const SkipLink = ({ targetId = "main-content" }) => {
    const { t } = useTranslation();

    const handleSkip = (e) => {
        e.preventDefault();
        const target = document.getElementById(targetId);
        if (target) {
            target.focus();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <a
            href={`#${targetId}`}
            onClick={handleSkip}
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
            {t('accessibility.skipToContent')}
        </a>
    );
};

export default SkipLink;
