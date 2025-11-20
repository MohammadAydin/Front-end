import Wrapper from "../../assets/wrapper/sidebar/Sidebar";
import profileAvatar from "../../assets/images/Img_Avatar.25.svg";
import { PagesList, SettingList } from "./SideBarIndex";
import { IoNotificationsOutline } from "react-icons/io5";
//import style
import "./SideBarResponsive.css";
import { Link } from "react-router-dom";
import useData from "../../hooks/useData";
import { useTranslation } from "react-i18next";
import { getUserFromLocalStorage } from "../../utils/localStorage";

const SideBar = ({ setNotificationIsOpen }) => {
  const { data } = useData("/notifications/unread");
  const { data: avatar } = useData("/photo");
  const { data: ProfileData } = useData("/profile");

  const { t } = useTranslation();
  return (
    <>
      <Wrapper>
        <div className="SideBar w-[320px] rounded-2xl flex flex-col justify-between items-center fixed z-10 shadow-2xl">
          <div className="w-full">
            {/* Profile Section */}
            <Link
              to={"/profile"}
              className="profile-user mt-[30px] flex flex-col items-center group/profile relative"
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-xl group-hover/profile:blur-2xl transition-all duration-300"></div>
                {/* Avatar border gradient */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#F47621] via-blue-400 to-[#F47621] opacity-0 group-hover/profile:opacity-100 transition-opacity duration-300 p-0.5">
                  <div className="w-full h-full rounded-full bg-[#194894]"></div>
                </div>
                <img
                  className="avatar w-[70px] h-[70px] object-cover rounded-full relative z-10 border-2 border-white/20 group-hover/profile:border-white/40 transition-all duration-300"
                  src={avatar?.photo || profileAvatar}
                  alt="Profile Avatar"
                />
              </div>

              <div className="information text-center mt-4">
                <p className="mt-[8px] text-white font-semibold text-lg group-hover/profile:text-[#F47621] transition-colors duration-300">
                  {ProfileData?.name}
                </p>
                <p className="admin text-white/80 font-thin text-sm mt-1">
                  {ProfileData?.occupation}
                </p>
              </div>
            </Link>

            {/* Navigation Items */}
            <div className="group-item m-[25px] flex flex-col items-start">
              <PagesList setIsOpen={() => {}} />
              <button
                onClick={() => setNotificationIsOpen(true)}
                className="nav-item flex items-center gap-3 mx-[8px] relative group text-white mt-[25px] px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 w-full"
              >
                {data && (
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full absolute top-2 left-4 animate-pulse shadow-lg shadow-red-500/50"></div>
                )}
                <IoNotificationsOutline size={24} className="group-hover:scale-110 transition-transform duration-300" />
                <p className="pageName group-hover:text-[#F47621] transition-colors duration-300">
                  {t("navigation.notifications")}
                </p>
                <span className="SmallpageName hidden">
                  {t("navigation.notifications")}
                </span>
              </button>
            </div>
          </div>

          {/* Settings Section */}
          <div className="group-item p-[30px] mb-20 w-full flex flex-col items-start border-t border-white/10">
            <SettingList />
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default SideBar;
