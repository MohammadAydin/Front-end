import { CiGrid41 } from "react-icons/ci";
import { RiHome6Line, RiUserSettingsLine } from "react-icons/ri";
import { PiBellSimpleRingingBold } from "react-icons/pi";
import { LuBanknote, LuClock, LuUserRound } from "react-icons/lu";
import {
  IoLanguage,
  IoLogOutOutline,
  IoSettingsOutline,
  IoDocumentTextOutline,
} from "react-icons/io5";

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
    // {
    //   id: 1,
    //   name: t("SideBar.pages.Dashboard"),
    //   icon: <CiGrid41 size={24} />,
    //   path: "/",
    // },
    {
      id: 2,
      name: t("SideBar.pages.HouseProfile"),
      icon: <RiHome6Line size={24} />,
      path: "/",
    },
    {
      id: 3,
      name: t("SideBar.pages.PersonalInfo"),
      icon: <LuUserRound size={24} />,
      path: "/Personal info",
    },
    {
      id: 4,
      name: t("SideBar.pages.HelpRequests"),
      icon: <PiBellSimpleRingingBold size={24} />,
      path: "/helpRequests",
    },
    {
      id: 5,
      name: t("SideBar.pages.Invoices"),
      icon: <LuBanknote size={24} />,
      path: "/invoices",
    },
    {
      id: 6,
      name: t("SideBar.pages.ShiftsManagement"),
      icon: <LuClock size={24} />,
      path: "/shifts",
    },
  ];
  return (
    <ul className="sidebarList">
      {pages.map((page) => (
        <NavLink to={page.path} key={page.id}>
          <li
            onClick={() => setIsOpen(false)}
            className="nav-item flex items-center gap-2 mx-[5px] relative group"
          >
            {page.icon}
            <p className="pageName">{page.name}</p>
            <span className="SmallpageName hidden">{page.name}</span>
          </li>
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
    },
    {
      id: 2,
      key: "settings",
      name: t("SideBar.settings.Settings"),
      icon: <IoSettingsOutline size={24} />,
    },
    {
      id: 3,
      key: "logout",
      name: t("SideBar.settings.Logout"),
      icon: <IoLogOutOutline size={24} />,
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
    },
    {
      id: 2,
      name: t("SideBar.Settings.deleteAccount"),
      icon: <RiDeleteBin6Line size={18} />,
      toPage: "/",
    },
    {
      id: 3,
      name: t("SideBar.Settings.changePassword"),
      icon: <RiLockPasswordLine size={18} />,
      toPage: "/",
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
      setIsOpen(false);
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
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
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
      {Settings.map((item) => (
        <li
          className="flex items-center justify-between w-full cursor-pointer hover:font-bold relative"
          key={item.id}
          onClick={() => handleClick(item.key)}
        >
          <div className="flex items-center gap-2 ">
            {item.icon}
            <span className="pageName">{item.name}</span>
          </div>

          {item.key === "language" && Language && (
            <div
              ref={langRef}
              className="absolute top-[-160px] left-0 mt-2 bg-white text-black rounded-lg text-xs flex flex-col p-2 z-50 shadow-lg"
            >
              {languageList.map((lang) => (
                <div
                  key={lang.id}
                  className="flex gap-4 hover:bg-gray-200 p-2 items-center cursor-pointer"
                  onClick={() => changeLanguage.mutate(lang.key)}
                >
                  <div className="flex gap-2">
                    <p>{lang.code}</p>
                    <p>{lang.name}</p>
                  </div>
                  <img className="flag w-6" src={lang.img} alt="Language" />
                </div>
              ))}
            </div>
          )}

          {item.key === "settings" && issettingsDropdownOpen && (
            <div
              ref={settingsRef}
              className="absolute top-[-240px] left-0 mt-2 w-[180px] bg-white rounded-lg shadow-lg border border-gray-200 z-50"
            >
              {SettingsPage.map((Page) => (
                <Link key={Page.id} to={Page.toPage}>
                  <button
                    onClick={() => {
                      setIssettingsropdownOpen(false), setIsOpen(false);
                    }}
                    className="w-full text-gray-700 hover:bg-gray-100 flex items-center gap-2 px-3 py-2 text-sm"
                  >
                    {Page.icon}
                    <span>{Page.name}</span>
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
