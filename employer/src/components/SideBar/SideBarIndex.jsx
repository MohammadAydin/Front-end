import { CiGrid41 } from "react-icons/ci";
import { RiHome6Line, RiUserSettingsLine } from "react-icons/ri";
import { PiBellSimpleRingingBold } from "react-icons/pi";
import { LuBanknote, LuClock } from "react-icons/lu";
import {
  IoLanguage,
  IoLogOutOutline,
  IoSettingsOutline,
  IoDocumentTextOutline,
} from "react-icons/io5";

import { NavLink } from "react-router-dom";
import Germany from "../../assets/image/icon-sidebar/germany.svg";
import useLogout from "./logoutFun";

const pages = [
  {
    id: 1,
    name: "Dashboard",
    icon: <CiGrid41 size={24} />,
    path: "/",
  },
  {
    id: 2,
    name: "House Profile",
    icon: <RiHome6Line size={24} />,
    path: "houseProfile",
  },
  {
    id: 3,
    name: "Help Requests",
    icon: <PiBellSimpleRingingBold size={24} />,
    path: "/helpRequests",
  },
  {
    id: 4,
    name: "Invoices",
    icon: <LuBanknote size={24} />,
    path: "/invoices",
  },
  {
    id: 5,
    name: "Leaders",
    icon: <RiUserSettingsLine size={24} />,
    path: "/Leaders",
  },
  {
    id: 6,
    name: "Documents",
    icon: <IoDocumentTextOutline size={24} />,
    path: "/Documents",
  },
  {
    id: 7,
    name: "Shifts Mangment",
    icon: <LuClock size={24} />,
    path: "/Shifts",
  },
];

const Settings = [
  { id: 1, name: "Language", icon: <IoLanguage size={24} /> },
  { id: 2, name: "Settings", icon: <IoSettingsOutline size={24} /> },
  { id: 3, name: "Logout", icon: <IoLogOutOutline size={24} /> },
];

const PagesList = () => {
  return (
    <ul className="sidebarList">
      {pages.map((page) => (
        <NavLink to={page.path} key={page.id}>
          <li className="nav-item flex items-center gap-2 mx-[5px] relative group">
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
