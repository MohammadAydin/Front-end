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

const pages = [
  {
    id: 1,
    name: "Job Request",
    icon: <RiHome6Line size={24} />,
    path: "/",
  },
  {
    id: 2,
    name: "My Tasks",
    icon: <IoBagRemoveOutline size={24} />,
    path: "/tasksPage",
  },
  {
    id: 3,
    name: "Personal Info",
    icon: <LuUserRound size={24} />,
    path: "/Personal info",
  },
  {
    id: 4,
    name: "Location Info",
    icon: <IoLocationOutline size={24} />,
    path: "/locationInfo",
  },
  {
    id: 5,
    name: "Working Hours",
    icon: <LuClock size={24} />,
    path: "/Working Hours",
  },
];

const Settings = [
  { id: 1, name: "Language", icon: <IoLanguage size={24} /> },
  { id: 2, name: "Settings", icon: <IoSettingsOutline size={24} /> },
  { id: 3, name: "Logout", icon: <IoLogOutOutline size={24} /> },
];

const PagesList = ({ setIsOpen }) => {
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

const SettingList = () => {
  const logout = useLogout();
  return (
    <ul className="sidebarList">
      {Settings.map((item) => (
        <li
          className={`flex items-center justify-between w-full cursor-pointer hover:font-bold`}
          key={item.id}
          onClick={item.name == "Logout" ? logout : null}
        >
          <div className="flex items-center gap-2 ">
            {item.icon}
            <span className="pageName">{item.name}</span>
          </div>
          {item.name === "Language" && (
            <img className="mt-1 flag" src={Germany} alt="Language" />
          )}
        </li>
      ))}
    </ul>
  );
};
export { PagesList, SettingList };
