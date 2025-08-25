import Wrapper from "../../assets/wrapper/SideBar";
import profileAvatar from "../../assets/image/Img_Avatar.25.svg";
import { PagesList, SettingList } from "./SideBarIndex";
import { IoNotificationsOutline } from "react-icons/io5";
//import style
import "./SideBarResponsive.css";
import useData from "../../hooks/useData";
import { getUserFromLocalStorage } from "../../utils/localStorage";

const SideBar = ({ setNotificationIsOpen }) => {
  const { data: photodata } = useData("/photo");

  const data = getUserFromLocalStorage("user");

  return (
    <>
      <Wrapper>
        <div className="SideBar w-[100%] rounded-2xl flex flex-col justify-between items-center">
          <div className="w-full">
            <div className="profile-user pt-[30px] flex flex-col items-center ">
              <img
                className="avatar w-[60px] rounded-full"
                src={
                  photodata?.data?.photo
                    ? photodata?.data?.photo
                    : profileAvatar
                }
                alt=""
              />

              <div className="information text-center">
                <p className="mt-[8px] text-white">{data?.name}</p>
                <p className="admin text-white font-thin">{data?.role}</p>
              </div>
            </div>
            <div className="group-item m-[25px]  mt-5 flex flex-col items-start ">
              <PagesList />
              <button
                onClick={() => setNotificationIsOpen(true)}
                className="nav-item flex items-center gap-2 mx-[5px] relative group text-white mt-[25px]"
              >
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
