import Wrapper from "../../assets/wrapper/sidebar/Sidebar";
import profileAvatar from "../../assets/images/Img_Avatar.25.svg";
import { PagesList, SettingList } from "./SideBarIndex";
import { IoNotificationsOutline } from "react-icons/io5";
//import style
import "./SideBarResponsive.css";
import { Link } from "react-router-dom";
import useData from "../../hooks/useData";
import { useState } from "react";

const SideBar = ({ setNotificationIsOpen }) => {
  let [isOpen, setIsOpen] = useState(false);

  const { data } = useData("/notifications/unread");
  return (
    <>
      <Wrapper>
        <div className="SideBar w-[320px] rounded-2xl flex flex-col justify-between items-center fixed z-10">
          <div className="w-full">
            <Link
              to={"/profile"}
              className="profile-user mt-[30px] flex flex-col items-center"
            >
              <img
                className="avatar w-[60px] rounded-full"
                src={profileAvatar}
                alt=""
              />

              <div className="information text-center">
                <p className="mt-[8px] text-white">Abdalrhman Alhowri</p>
                <p className="admin text-white font-thin">Admin</p>
              </div>
            </Link>
            <div className="group-item m-[25px]  mt-15 flex flex-col items-start ">
              <PagesList setIsOpen={setIsOpen} />
              <button
                onClick={() => setNotificationIsOpen(true)}
                className="nav-item flex items-center gap-2 mx-[8px] relative group text-white mt-[25px]"
              >
                {data && (
                  <div className="w-2 h-2 bg-red-500 rounded-full absolute top-1 left-3.5"></div>
                )}
                <IoNotificationsOutline size={24} />
                <p className="pageName ">Notifications</p>
                <span className="SmallpageName hidden">Notifications</span>
              </button>
            </div>
          </div>
          <div className="group-item p-[30px] w-full flex flex-col items-start ">
            <SettingList />
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default SideBar;
