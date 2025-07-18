import { RiHome6Line } from "react-icons/ri";
import { LuUserRound, LuClock } from "react-icons/lu";
import {
  IoLanguage,
  IoLogOutOutline,
  IoSettingsOutline,
  IoBagRemoveOutline,
  IoLocationOutline,
} from "react-icons/io5";

import { NavLink } from "react-router-dom";
import Germany from "../../assets/images/icon-sidebar/germany.svg";
import useLogout from "./logoutFun";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";

const pages = [
  {
    id: 1,
    name: "navigation.jobRequest",
    icon: <RiHome6Line size={24} />,
    path: "/",
  },
  {
    id: 2,
    name: "navigation.myTasks",
    icon: <IoBagRemoveOutline size={24} />,
    path: "/tasksPage",
  },
  {
    id: 3,
    name: "navigation.personalInfo",
    icon: <LuUserRound size={24} />,
    path: "/Personal info",
  },
  {
    id: 4,
    name: "navigation.locationInfo",
    icon: <IoLocationOutline size={24} />,
    path: "/locationInfo",
  },
  {
    id: 5,
    name: "navigation.workingHours",
    icon: <LuClock size={24} />,
    path: "/Working Hours",
  },
];

const Settings = [
  { id: 1, name: "navigation.language", icon: <IoLanguage size={24} />, type: "language" },
  { id: 2, name: "navigation.settings", icon: <IoSettingsOutline size={24} />, type: "normal" },
  { id: 3, name: "navigation.logout", icon: <IoLogOutOutline size={24} />, type: "logout" },
];

const PagesList = ({ setIsOpen }) => {
  const { t } = useTranslation();
  return (
    <ul className="sidebarList">
      {pages.map((page) => (
        <NavLink to={page.path} key={page.id}>
          <li
            onClick={() => setIsOpen(false)}
            className="nav-item flex items-center gap-2 mx-[5px] relative group"
          >
            {page.icon}
            <p className="pageName">{t(page.name)}</p>
            <span className="SmallpageName hidden">{t(page.name)}</span>
          </li>
        </NavLink>
      ))}
    </ul>
  );
};

// setting list

const SettingList = () => {
  const logout = useLogout();
  const { t, i18n } = useTranslation();
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: t('language.english'), flag: '🇺🇸' },
    { code: 'de', name: t('language.german'), flag: '🇩🇪' },
    { code: 'tr', name: t('language.turkish'), flag: '🇹🇷' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setIsLanguageDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleItemClick = (item) => {
    if (item.type === "logout") {
      logout();
    } else if (item.type === "language") {
      setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
    }
    // For normal settings, you can add navigation logic here later
  };

  return (
    <div className="relative">
      <ul className="sidebarList">
        {Settings.map((item) => (
          <li
            className={`flex items-center justify-between w-full cursor-pointer hover:font-bold mb-1`}
            key={item.id}
            onClick={() => handleItemClick(item)}
          >
            <div className="flex items-center gap-2 ">
              {item.icon}
              <span className="pageName">{t(item.name)}</span>
            </div>
            {item.type === "language" && (
              <span className="text-lg">{currentLanguage.flag}</span>
            )}
          </li>
        ))}
      </ul>

      {/* Language Dropdown */}
      {isLanguageDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute bottom-full left-0 mb-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
        >
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`${i18n.language === language.code
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
                } group flex items-center px-4 py-2 text-sm w-full text-left transition-colors duration-200`}
            >
              <span className="mr-4 text-lg">{language.flag}</span>
              <span className="flex-1">{language.name}</span>
              {i18n.language === language.code && (
                <span className="text-blue-500 ml-3">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
export { PagesList, SettingList };
