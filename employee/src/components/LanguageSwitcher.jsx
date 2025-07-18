import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { IoLanguageOutline, IoChevronDown } from 'react-icons/io5';

const LanguageSwitcher = () => {
    const { i18n, t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const languages = [
        { code: 'en', name: t('language.english'), flag: '🇺🇸' },
        { code: 'de', name: t('language.german'), flag: '🇩🇪' },
        { code: 'tr', name: t('language.turkish'), flag: '🇹🇷' }
    ];

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    const handleLanguageChange = (languageCode) => {
        i18n.changeLanguage(languageCode);
        setIsOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            {/* Desktop Version */}
            <div className="hidden md:block">
                <button
                    type="button"
                    className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                >
                    <IoLanguageOutline className="w-4 h-4 mr-2" />
                    <span className="mr-1">{currentLanguage.flag}</span>
                    <span className="mr-2">{currentLanguage.name}</span>
                    <IoChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
            </div>

            {/* Mobile Version - Flag Avatar */}
            <div className="block md:hidden">
                <button
                    type="button"
                    className="flex items-center justify-center w-12 h-12 bg-white border-2 border-gray-300 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-md hover:shadow-lg"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    title={currentLanguage.name}
                >
                    <span className="text-2xl">{currentLanguage.flag}</span>
                </button>
            </div>

            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 md:w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                        {languages.map((language) => (
                            <button
                                key={language.code}
                                onClick={() => handleLanguageChange(language.code)}
                                className={`${i18n.language === language.code
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    } group flex items-center px-4 py-2 text-sm w-full text-left transition-colors duration-200`}
                                role="menuitem"
                            >
                                <span className="mr-3 text-lg">{language.flag}</span>
                                <span className="flex-1">{language.name}</span>
                                {i18n.language === language.code && (
                                    <span className="text-indigo-500 ml-2">✓</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;
