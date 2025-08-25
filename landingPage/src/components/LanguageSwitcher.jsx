import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  ];

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const changeLanguage = (language) => {
    if (i18n.language === language || isAnimating) return;

    setIsAnimating(true);
    i18n.changeLanguage(language);
    setIsDropdownOpen(false);

    // Reset animation state after transition
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Mobile dropdown version
  if (isMobile) {
    return (
      <div className="language-switcher mobile-dropdown" ref={dropdownRef}>
        <button
          className={`lang-dropdown-trigger ${isDropdownOpen ? "open" : ""}`}
          onClick={toggleDropdown}
          aria-label="Select language"
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
        >
          <span className="current-lang">
            <span className="lang-flag">{currentLanguage.flag}</span>
            <span className="lang-code">
              {currentLanguage.code.toUpperCase()}
            </span>
          </span>
          <svg
            className={`dropdown-arrow ${isDropdownOpen ? "open" : ""}`}
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
          >
            <path
              d="M1 1L6 6L11 1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {isDropdownOpen && (
          <div className="lang-dropdown-menu">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`lang-dropdown-item ${
                  i18n.language === lang.code ? "active" : ""
                }`}
                disabled={isAnimating}
              >
                <span className="lang-flag">{lang.flag}</span>
                <span className="lang-info">
                  <span className="lang-code">{lang.code.toUpperCase()}</span>
                  <span className="lang-name">{lang.name}</span>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Desktop horizontal version
  return (
    <div
      className="language-switcher desktop-horizontal"
      role="group"
      aria-label="Language selection"
    >
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`lang-btn ${i18n.language === lang.code ? "active" : ""} ${
            isAnimating ? "animating" : ""
          }`}
          aria-label={`Switch to ${lang.name}`}
          title={lang.name}
          disabled={isAnimating}
        >
          <span className="lang-flag" aria-hidden="true">
            {lang.flag}
          </span>
          <span className="lang-code">{lang.code.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
