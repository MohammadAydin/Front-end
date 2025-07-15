import { useState } from "react";
import { BsList } from "react-icons/bs";
import profileAvatar from "../../assets/images/Img_Avatar.25.svg";
import { PagesList, SettingList } from "./SideBarIndex";
import { Link } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import useData from "../../hooks/useData";

const SmallSideBar = ({ setNotificationIsOpen }) => {
  let [isOpen, setIsOpen] = useState(false);
  const { data } = useData("/notifications/unread");

  const { data: avatar } = useData("/photo");

  return (
    <div className="smallSideBar hidden">
      <div className="w-full mb-5 h-[60px] p-3  flex justify-between items-center">
        <button onClick={() => setIsOpen(!isOpen)}>
          <BsList size={40} />
        </button>

        <div className="flex items-center justify-center">
          <button
            onClick={() => setNotificationIsOpen(true)}
            className="nav-item flex items-center gap-2 mx-[8px] relative group "
          >
            {data && (
              <div className="w-2 h-2 bg-red-500 rounded-full absolute top-1 left-4.5"></div>
            )}
            <IoNotificationsOutline size={30} />
          </button>
          <Link to={"/profile"}>
            <img
              src={avatar?.length == 0 ? profileAvatar : avatar}
              alt=""
              className="rounded-full h-10"
            />
          </Link>
        </div>
      </div>
      {isOpen && (
        <div className="sideBarMenu w-[93%] left-[50%] top-[10%] p-5 py-8 translate-x-[-50%] bg-[#194894] absolute text-white rounded-lg z-[1000]">
          <div className="mb-15">
            <PagesList setIsOpen={setIsOpen} />
          </div>
          <div>
            <SettingList />
          </div>
        </div>
      )}
    </div>
  );
};

export default SmallSideBar;
