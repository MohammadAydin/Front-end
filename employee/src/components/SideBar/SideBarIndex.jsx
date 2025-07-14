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
  { id: 1, name: "navigation.language", icon: <IoLanguage size={24} /> },
  { id: 2, name: "navigation.settings", icon: <IoSettingsOutline size={24} /> },
  { id: 3, name: "navigation.logout", icon: <IoLogOutOutline size={24} /> },
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
  const { t } = useTranslation();
  return (
    <ul className="sidebarList">
      {Settings.map((item) => (
        <li
          className={`flex items-center justify-between w-full cursor-pointer hover:font-bold`}
          key={item.id}
          onClick={item.name == "navigation.logout" ? logout : null}
        >
          <div className="flex items-center gap-2 ">
            {item.icon}
            <span className="pageName">{t(item.name)}</span>
          </div>
          {item.name === "navigation.language" && (
            <img className="mt-1 flag" src={Germany} alt="Language" />
          )}
        </li>
      ))}
    </ul>
  );
};
export { PagesList, SettingList };
