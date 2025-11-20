import { RiHome6Line } from "react-icons/ri";
import { LuUserRound, LuClock } from "react-icons/lu";
import {
  IoLanguage,
  IoLogOutOutline,
  IoSettingsOutline,
  IoBagRemoveOutline,
  IoLocationOutline,
} from "react-icons/io5";

import { Link, NavLink } from "react-router-dom";
import Germany from "../../assets/images/icon-sidebar/germany.svg";
import useLogout from "./logoutFun";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import customFetch from "../../utils/axios";
import { toast } from "react-toastify";
import Popup from "../MoreElements/Popup/Popup";
import PopupLogout from "../MoreElements/Popup/PopupLogout";
import { RiDeleteBin6Line, RiLockPasswordLine } from "react-icons/ri";
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
    name: "navigation.workedHoursStatistics",
    icon: <LuClock size={24} />,
    path: "/worked-hours-statistics",
  },
];

const Settings = [
  {
    id: 1,
    name: "navigation.language",
    icon: <IoLanguage size={24} />,
    type: "language",
  },
  {
    id: 2,
    name: "navigation.settings",
    icon: <IoSettingsOutline size={24} />,
    type: "settings",
  },
  {
    id: 3,
    name: "navigation.logout",
    icon: <IoLogOutOutline size={24} />,
    type: "logout",
  },
];

const PagesList = ({ setIsOpen }) => {
  const { t } = useTranslation();
  return (
    <ul className="sidebarList">
      {pages.map((page) => (
        <NavLink to={page.path} key={page.id}>
          {({ isActive }) => (
            <li
              onClick={() => setIsOpen(false)}
              className={`nav-item flex items-center gap-3 mx-[5px] relative group px-3 py-2.5 rounded-lg transition-all duration-300 ${
                isActive
                  ? "bg-white text-[#194894] shadow-lg shadow-white/20"
                  : "text-white hover:bg-white/10 hover:text-[#F47621]"
              }`}
            >
              <span
                className={`transition-transform duration-300 ${
                  isActive ? "scale-110" : "group-hover:scale-110"
                }`}
              >
                {page.icon}
              </span>
              <p
                className={`pageName transition-all duration-300 ${
                  isActive ? "font-semibold" : "font-light"
                }`}
              >
                {t(page.name)}
              </p>
              <span className="SmallpageName hidden">{t(page.name)}</span>
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-[#F47621] to-blue-400 rounded-r-full"></div>
              )}
            </li>
          )}
        </NavLink>
      ))}
    </ul>
  );
};

// setting list

const SettingList = ({ setIsOpen }) => {
  const [isPopupLogout, setPopupLogout] = useState(false);
  const togglePopupLogout = () => {
    setPopupLogout(!isPopupLogout);
  };
  const onConfirm = () => {
    logout();
  };

  const logout = useLogout();
  const { t, i18n } = useTranslation();
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [issettingsDropdownOpen, setIssettingsropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: "en", name: t("language.english"), flag: "🇺🇸" },
    { code: "de", name: t("language.german"), flag: "🇩🇪" },
    { code: "tr", name: t("language.turkish"), flag: "🇹🇷" },
  ];
  const SettingsPage = [
    {
      id: 1,
      name: t("navigation.Settings.account"),
      icon: <LuUserRound size={18} />,
      toPage: "profile",
    },
    {
      id: 2,
      name: t("navigation.Settings.deleteAccount"),
      icon: <RiDeleteBin6Line size={18} />,
      toPage: "/",
    },
    {
      id: 3,
      name: t("navigation.Settings.changePassword"),
      icon: <RiLockPasswordLine size={18} />,
      toPage: "/",
    },
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
      setIsLanguageDropdownOpen(false);

      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });

  // Close dropdown when clicking outside
  const langRef = useRef(null);
  const settingsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLanguageDropdownOpen(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIssettingsropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = (item) => {
    if (item.type === "logout") {
      togglePopupLogout();
    } else if (item.type === "language") {
      setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
    } else if (item.type === "settings") {
      setIssettingsropdownOpen(!issettingsDropdownOpen);
    }
    // For normal settings, you can add navigation logic here later
  };

  return (
    <div className="relative w-full">
      <ul className="sidebarList">
        {Settings.map((item) => (
          <li
            className={`flex items-center justify-between w-full cursor-pointer mb-2 px-3 py-2.5 rounded-lg transition-all duration-300 ${
              item.type === "logout"
                ? "hover:bg-red-500/20 hover:text-red-200"
                : "hover:bg-white/10 hover:text-[#F47621]"
            }`}
            key={item.id}
            onClick={() => handleItemClick(item)}
          >
            <div className="flex items-center gap-3">
              <span className="transition-transform duration-300 hover:scale-110">
                {item.icon}
              </span>
              <span className="pageName font-light">{t(item.name)}</span>
            </div>
            {item.type === "language" && (
              <span className="text-lg transition-transform duration-300 hover:scale-125">
                {currentLanguage.flag}
              </span>
            )}
          </li>
        ))}
      </ul>

      {/* Language Dropdown */}
      {isLanguageDropdownOpen && (
        <div
          ref={langRef}
          className="language-dropdown absolute bottom-full left-0 mb-2 w-full bg-white rounded-xl shadow-2xl border border-gray-200/50 py-2 z-50 overflow-hidden backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50/50"></div>
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => changeLanguage.mutate(language.code)}
              className={`${
                i18n.language === language.code
                  ? "bg-gradient-to-r from-[#F47621]/10 to-blue-500/10 text-[#194894] font-semibold"
                  : "text-gray-700 hover:bg-gray-100/80"
              } group relative flex items-center px-4 py-3 text-sm w-full text-left transition-all duration-300 hover:pl-5`}
            >
              <span className="mr-4 text-xl transition-transform duration-300 group-hover:scale-125">
                {language.flag}
              </span>
              <span className="flex-1">{language.name}</span>
              {i18n.language === language.code && (
                <span className="text-[#F47621] ml-3 text-lg font-bold">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
      {issettingsDropdownOpen && (
        <div
          ref={settingsRef}
          className="settings-dropdown absolute left-0 flex flex-col gap-2 top-[-100px] p-2 mb-2 w-[200px] bg-white rounded-xl shadow-2xl border border-gray-200/50 py-3 z-50 overflow-hidden backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50/50"></div>
          {SettingsPage.map((Page) => (
            <Link key={Page.id} to={Page.toPage} className="relative">
              <button
                onClick={() => {
                  setIssettingsropdownOpen(false);
                  setIsOpen(false);
                }}
                className="text-gray-700 hover:bg-gradient-to-r hover:from-[#F47621]/10 hover:to-blue-500/10 hover:text-[#194894] group w-full flex items-center gap-3 text-sm text-left transition-all duration-300 px-3 py-2.5 rounded-lg hover:pl-4"
              >
                <span className="text-lg transition-transform duration-300 group-hover:scale-110 group-hover:text-[#F47621]">
                  {Page.icon}
                </span>
                <span className="flex-1 font-medium">{Page.name}</span>
              </button>
            </Link>
          ))}
        </div>
      )}
      {isPopupLogout && (
        <PopupLogout togglePopup={togglePopupLogout} onConfirm={onConfirm} />
      )}
    </div>
  );
};
export { PagesList, SettingList };
