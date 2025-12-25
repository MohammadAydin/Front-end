import Wrapper from "../../assets/wrapper/SideBar";
import profileAvatar from "../../assets/image/Img_Avatar.25.svg";
import { PagesList } from "./SideBarIndex";
import "./SideBarResponsive.css";
import useData from "../../hooks/useData";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const SideBar = () => {
  const { data: photodata, isLoading: isLoadingPhoto } = useData("/photo");
  const { t } = useTranslation();
  const data = getUserFromLocalStorage("user");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Wrapper>
        <div className="SideBar w-[100%] flex flex-col justify-between items-center relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#F47621]/20 to-transparent rounded-full blur-2xl animate-float"></div>
            <div className="absolute bottom-40 right-10 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-2xl animate-float-delayed"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-[#F47621]/10 to-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
          </div>

          {/* Decorative Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
            }}
          ></div>

          <div className="w-full relative z-10">
            {/* Profile Section */}
            <div
              className="profile-user pt-[50px] pb-[20px] flex flex-col items-center group relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Glassmorphism Card Background */}
              <div className="absolute inset-x-0 top-4 bottom-0 bg-white/5 backdrop-blur-sm rounded-2xl mx-4 opacity-0 group-hover:opacity-100 transition-all duration-500 border border-white/10"></div>

              <div className="relative mb-4 z-10">
                {/* Multiple Glow Layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#F47621]/40 to-blue-500/40 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#F47621]/20 to-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                {/* Rotating Ring */}
                <div className={`absolute inset-0 border-4 border-transparent rounded-full transition-all duration-1000 ${isHovered ? "border-[#F47621]/30 rotate-180" : ""
                  }`} style={{
                    background: isHovered
                      ? "linear-gradient(135deg, rgba(244,118,33,0.3), rgba(59,130,246,0.3))"
                      : "transparent"
                  }}></div>

                {/* Pulse Rings */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#F47621] to-blue-500 rounded-full animate-ping opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#F47621] to-blue-500 rounded-full animate-pulse opacity-10"></div>

                {/* Avatar */}
                <div className="relative z-10">
                  {isLoadingPhoto ? (
                    <div className="avatar w-[80px] h-[80px] rounded-full border-4 border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-sm shadow-2xl">
                      <div className="w-8 h-8 border-2 border-[#F47621] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <>
                      <img
                        className="avatar w-[80px] h-[80px] rounded-full object-cover border-4 border-white/30 group-hover:border-[#F47621] transition-all duration-500 shadow-2xl group-hover:shadow-[#F47621]/50 group-hover:scale-110"
                        src={
                          photodata?.data?.photo
                            ? photodata?.data?.photo
                            : profileAvatar
                        }
                        alt="Profile"
                      />
                      {/* Status Indicator */}
                      <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-4 border-[#194894] shadow-lg animate-pulse"></div>
                    </>
                  )}
                </div>
              </div>

              <div className="information text-center z-10 relative">
                <p className="mt-[8px] text-white font-bold text-xl group-hover:text-[#F47621] transition-all duration-300 group-hover:scale-105">
                  {data?.name}
                </p>
                <div className="mt-1 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full inline-block border border-white/20">
                  <p className="admin text-white/90 font-medium text-xs">
                    {t("SideBar.healthcareFacility")}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Items */}
            <div className="group-item m-[25px] mt-8 flex flex-col items-start">
              <PagesList />
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default SideBar;
