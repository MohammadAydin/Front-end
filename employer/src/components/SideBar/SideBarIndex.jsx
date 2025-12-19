import { CiGrid41 } from "react-icons/ci";
import { RiHome6Line, RiUserSettingsLine } from "react-icons/ri";
import { PiBellSimpleRingingBold } from "react-icons/pi";
import { LuBanknote, LuClock, LuUserRound } from "react-icons/lu";
import {
  IoLanguage,
  IoLogOutOutline,
  IoSettingsOutline,
  IoDocumentTextOutline,
  IoAddCircleOutline,
} from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";

import { Link, NavLink } from "react-router-dom";
import Germany from "../../assets/image/icon-sidebar/germany.svg";
import turkey from "../../assets/image/icon-sidebar/turkey.png";
import unitedstates from "../../assets/image/icon-sidebar/united-states.png";
import useLogout from "./logoutFun";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import customFetch from "../../utils/axios";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import PopupLogout from "../MoreElements/Popup/PopupLogout";
import { RiDeleteBin6Line, RiLockPasswordLine } from "react-icons/ri";
import { useRef } from "react";
import { useEffect } from "react";

const PagesList = ({ setIsOpen }) => {
  const { t } = useTranslation();

  const pages = [
    {
      id: 2,
      name: t("SideBar.pages.HouseProfile"),
      icon: <RiHome6Line size={24} />,
      path: "/",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 3,
      name: t("SideBar.pages.PersonalInfo"),
      icon: <LuUserRound size={24} />,
      path: "/Personal info",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 4,
      name: t("SideBar.pages.AddJob"),
      icon: <IoAddCircleOutline size={24} />,
      path: "/add-job",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 5,
      name: t("SideBar.pages.ViewJobs"),
      icon: <IoEyeOutline size={24} />,
      path: "/view-jobs",
      color: "from-indigo-500 to-blue-500",
    },
    {
      id: 6,
      name: t("SideBar.pages.Invoices"),
      icon: <LuBanknote size={24} />,
      path: "/invoices",
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: 7,
      name: t("SideBar.pages.ShiftsManagement"),
      icon: <LuClock size={24} />,
      path: "/shifts",
      color: "from-[#F47621] to-[#ff8c42]",
    },
  ];
  return (
    <ul className="sidebarList">
      {pages.map((page, index) => (
        <NavLink to={page.path} key={page.id}>
          {({ isActive }) => (
            <li
              onClick={() => setIsOpen && setIsOpen(false)}
              className={`nav-item flex items-center gap-3 mx-[8px] relative group px-3 py-2.5 rounded-lg transition-all duration-300 ${
                isActive
                  ? "bg-white/95 text-[#194894] shadow-md"
                  : "text-white hover:bg-white/10"
              }`}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              {/* Active State - Subtle Left Border */}
              {isActive && (
                <div className="absolute left-0 top-1 bottom-1 w-1 bg-gradient-to-b from-[#F47621] to-[#ff8c42] rounded-r-full"></div>
              )}

              {/* Hover Gradient Effect */}
              {!isActive && (
                <div className={`absolute inset-0 bg-gradient-to-r ${page.color} opacity-0 group-hover:opacity-15 rounded-lg transition-opacity duration-300`}></div>
              )}

              {/* Icon Container - More Subtle */}
              <div
                className={`relative z-10 transition-all duration-300 ${
                  isActive
                    ? `text-[#194894]`
                    : "text-white group-hover:text-[#F47621]"
                }`}
              >
                <div
                  className={`transition-transform duration-300 ${
                    isActive
                      ? "scale-105"
                      : "group-hover:scale-110 group-hover:rotate-12"
                  }`}
                >
                  {page.icon}
                </div>
              </div>

              {/* Text */}
              <p
                className={`pageName relative z-10 transition-all duration-300 flex-1 ${
                  isActive
                    ? "font-semibold text-[#194894]"
                    : "group-hover:text-[#F47621] font-medium"
                }`}
              >
                {page.name}
              </p>

              {/* Active Indicator - Subtle Dot */}
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 bg-gradient-to-br from-[#F47621] to-[#ff8c42] rounded-full"></div>
              )}

              {/* Hover Arrow */}
              {!isActive && (
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                  <div className="w-1.5 h-1.5 bg-[#F47621] rounded-full"></div>
                </div>
              )}

              <span className="SmallpageName hidden">{page.name}</span>
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
  const [Language, setLanguage] = useState(false);
  const [issettingsDropdownOpen, setIssettingsropdownOpen] = useState(false);

  const { t, i18n } = useTranslation();

  const Settings = [
    {
      id: 1,
      key: "language",
      name: t("SideBar.settings.Language"),
      icon: <IoLanguage size={24} />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      key: "settings",
      name: t("SideBar.settings.Settings"),
      icon: <IoSettingsOutline size={24} />,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      key: "logout",
      name: t("SideBar.settings.Logout"),
      icon: <IoLogOutOutline size={24} />,
      color: "from-red-500 to-orange-500",
    },
  ];
  const languageList = [
    { id: 1, key: "en", name: "English", code: "US", img: unitedstates },
    { id: 2, key: "de", name: "Germany", code: "DE", img: Germany },
    { id: 3, key: "tr", name: "Turkish", code: "TR", img: turkey },
  ];
  const SettingsPage = [
    {
      id: 1,
      name: t("SideBar.Settings.account"),
      icon: <LuUserRound size={18} />,
      toPage: "/",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      name: t("SideBar.Settings.deleteAccount"),
      icon: <RiDeleteBin6Line size={18} />,
      toPage: "/",
      color: "from-red-500 to-pink-500",
    },
    {
      id: 3,
      name: t("SideBar.Settings.changePassword"),
      icon: <RiLockPasswordLine size={18} />,
      toPage: "/change-password",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const logout = useLogout();
  const handleClick = (itemKey) => {
    if (itemKey === "logout") {
      togglePopupLogout();
    }
    if (itemKey === "language") setLanguage(!Language);
    if (itemKey === "settings")
      setIssettingsropdownOpen(!issettingsDropdownOpen);
  };

  const changeLanguage = useMutation({
    mutationFn: (key) =>
      customFetch
        .post(`/language/set`, {
          language: key,
        })
        .then((res) => res.data),

    onSuccess: (data, key) => {
      i18n.changeLanguage(key);
      toast.success(data.message);
      setIsOpen && setIsOpen(false);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
      setIsOpen && setIsOpen(false);
    },
  });
  // Close dropdown when clicking outside
  const langRef = useRef(null);
  const settingsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLanguage(false);
      }
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target)
      ) {
        setIssettingsropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <ul className="sidebarList">
      {Settings.map((item, index) => (
        <li
          className="flex items-center justify-between w-full cursor-pointer hover:bg-white/15 rounded-xl px-4 py-3 transition-all duration-500 relative group backdrop-blur-sm border border-transparent hover:border-white/20 hover:scale-[1.02] hover:shadow-xl"
          key={item.id}
          onClick={() => handleClick(item.key)}
          style={{
            animationDelay: `${index * 50}ms`,
          }}
        >
          {/* Hover Gradient Background */}
          <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-500`}></div>

          <div className="flex items-center gap-3 relative z-10">
            {/* Icon Container */}
            <div className={`p-2 rounded-lg bg-white/10 group-hover:bg-gradient-to-br ${item.color} transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg`}>
              <div className="text-white group-hover:text-white transition-colors duration-300">
                {item.icon}
              </div>
            </div>
            <span className="pageName text-white group-hover:text-[#F47621] transition-all duration-300 font-medium group-hover:font-semibold">
              {item.name}
            </span>
          </div>

          {/* Dropdown Arrow */}
          {(item.key === "language" || item.key === "settings") && (
            <div className="relative z-10 text-white/60 group-hover:text-[#F47621] transition-all duration-300 transform group-hover:rotate-90">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 12L2 6h12L8 12z" />
              </svg>
            </div>
          )}

          {/* Language Dropdown */}
          {item.key === "language" && Language && (
            <div
              ref={langRef}
              className="absolute bottom-full left-0 mb-3 bg-white/95 backdrop-blur-xl text-black rounded-2xl shadow-2xl flex flex-col p-2 z-50 min-w-[200px] border border-gray-200/50 animate-slide-up"
            >
              <div className="px-3 py-2 border-b border-gray-200">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {t("SideBar.settings.Language")}
                </p>
              </div>
              {languageList.map((lang) => (
                <div
                  key={lang.id}
                  className={`flex gap-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 p-3 items-center cursor-pointer rounded-xl transition-all duration-300 group ${
                    i18n.language === lang.key
                      ? "bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200"
                      : ""
                  }`}
                  onClick={() => changeLanguage.mutate(lang.key)}
                >
                  <div className="relative">
                    <img
                      className="flag w-8 h-8 object-cover rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300"
                      src={lang.img}
                      alt={lang.name}
                    />
                    {i18n.language === lang.key && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                    )}
                  </div>
                  <div className="flex flex-col flex-1">
                    <p className="font-semibold text-sm">{lang.name}</p>
                    <p className="text-xs text-gray-500">{lang.code}</p>
                  </div>
                  {i18n.language === lang.key && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-lg"></div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Settings Dropdown */}
          {item.key === "settings" && issettingsDropdownOpen && (
            <div
              ref={settingsRef}
              className="absolute bottom-full left-0 mb-3 w-[220px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 z-50 overflow-hidden animate-slide-up"
            >
              <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {t("SideBar.settings.Settings")}
                </p>
              </div>
              {SettingsPage.map((Page) => (
                <Link key={Page.id} to={Page.toPage}>
                  <button
                    onClick={() => {
                      setIssettingsropdownOpen(false);
                      setIsOpen && setIsOpen(false);
                    }}
                    className="w-full text-gray-700 hover:bg-gradient-to-r hover:from-[#F47621]/10 hover:to-blue-500/10 flex items-center gap-3 px-4 py-3.5 text-sm transition-all duration-300 hover:text-[#F47621] group relative overflow-hidden"
                  >
                    {/* Hover Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${Page.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${Page.color} text-white shadow-md group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 relative z-10`}>
                      {Page.icon}
                    </div>
                    <span className="font-medium relative z-10 group-hover:font-semibold">
                      {Page.name}
                    </span>
                    
                    {/* Arrow Indicator */}
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0 relative z-10">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-[#F47621]">
                        <path d="M6 4l4 4-4 4V4z" />
                      </svg>
                    </div>
                  </button>
                </Link>
              ))}
            </div>
          )}
        </li>
      ))}

      {isPopupLogout && (
        <PopupLogout togglePopup={togglePopupLogout} onConfirm={onConfirm} />
      )}
    </ul>
  );
};
export { PagesList, SettingList };
