import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoLanguageOutline } from "react-icons/io5";
import customFetch from "../utils/axios";
import { toast } from "react-toastify";

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "en", name: t("language.english"), flag: "🇺🇸" },
    { code: "de", name: t("language.german"), flag: "🇩🇪" },
    { code: "tr", name: t("language.turkish"), flag: "tr" },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const changeLanguage = useMutation({
    mutationFn: (key) =>
      customFetch
        .post(
          `/language/set
`,
          {
            language: key,
          }
        )
        .then((res) => res.data),

    onSuccess: (data, key) => {
      i18n.changeLanguage(key);
      toast.success(data.message);
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <IoLanguageOutline className="w-5 h-5 mr-2" />
          <span className="mr-2">{currentLanguage.flag}</span>
          {currentLanguage.name}
          <svg
            className={`-mr-1 ml-2 h-5 w-5 transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 w-48 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => changeLanguage.mutate(language.code)}
                className={`flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 ${
                  i18n.language === language.code
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-700"
                }`}
                role="menuitem"
              >
                <span className="mr-3">{language.flag}</span>
                {language.name}
                {i18n.language === language.code && (
                  <svg
                    className="w-4 h-4 ml-auto"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
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
