import Wrapper from "../../assets/wrapper/sidebar/Sidebar";
import profileAvatar from "../../assets/images/Img_Avatar.25.svg";
import { PagesList, SettingList } from "./SideBarIndex";
import { IoNotificationsOutline } from "react-icons/io5";
//import style
import "./SideBarResponsive.css";
import { Link } from "react-router-dom";
import useData from "../../hooks/useData";
import { useTranslation } from "react-i18next";

const SideBar = ({ setNotificationIsOpen }) => {
  const { data } = useData("/notifications/unread");
  const { data: avatar } = useData("/photo");
  const { data: ProfileData } = useData("/profile");

  const { t } = useTranslation();
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
                className="avatar w-[60px] h-[60px] object-cover rounded-full"
                src={avatar?.photo || profileAvatar}
                alt="Profile Avatar"
              />

              <div className="information text-center">
                <p className="mt-[8px] text-white">{ProfileData?.name}</p>

                <p className="admin text-white font-thin">
                  {t("navigation.employee")}
                </p>
              </div>
            </Link>
            <div className="group-item m-[25px]   flex flex-col items-start ">
              <PagesList setIsOpen={() => { }} />
              <button
                onClick={() => setNotificationIsOpen(true)}
                className="nav-item flex items-center gap-2 mx-[8px] relative group text-white mt-[25px]"
              >
                {data && (
                  <div className="w-2 h-2 bg-red-500 rounded-full absolute top-1 left-3.5"></div>
                )}
                <IoNotificationsOutline size={24} />
                <p className="pageName ">{t("navigation.notifications")}</p>
                <span className="SmallpageName hidden">
                  {t("navigation.notifications")}
                </span>
              </button>
            </div>
          </div>
          <div className="group-item p-[30px] mb-20 w-full flex flex-col items-start ">
            <SettingList />
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default SideBar;
