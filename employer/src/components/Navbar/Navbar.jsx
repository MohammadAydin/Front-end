import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import useData from "../../hooks/useData";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import useNotificationsPusher from "../../hooks/useNotificationsPusher";
import { pusherConfig } from "../../config/pusher";
import useLogout from "../SideBar/logoutFun";
import PopupLogout from "../MoreElements/Popup/PopupLogout";
import profileAvatar from "../../assets/image/Img_Avatar.25.svg";
import "./Navbar.css";

const Navbar = ({ setNotificationIsOpen }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isPopupLogout, setPopupLogout] = useState(false);

    const { data: photodata } = useData("/photo");
    const data = getUserFromLocalStorage("user");
    const userId = pusherConfig?.utils?.getUserIdFromToken();
    const { unreadCount } = useNotificationsPusher(userId);
    const logout = useLogout();

    const profileRef = useRef(null);

    const togglePopupLogout = () => {
        setPopupLogout(!isPopupLogout);
    };

    const onConfirm = () => {
        logout();
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14 sm:h-16">
                    {/* Left side - Logo/Brand (can be empty or add logo) */}
                    <div className="flex-shrink-0"></div>

                    {/* Right side - Actions */}
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                        {/* Notifications Button */}
                        <button
                            onClick={() => setNotificationIsOpen(true)}
                            className="relative p-2 sm:p-2.5 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-all duration-300 group touch-manipulation"
                            title={t("SideBar.pages.Notifications")}
                        >
                            <IoNotificationsOutline
                                size={22}
                                className="sm:w-6 sm:h-6 text-gray-700 group-hover:text-[#F47621] transition-colors"
                            />
                            {unreadCount > 0 && (
                                <>
                                    <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-ping"></div>
                                    <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                                    <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] sm:text-xs font-bold rounded-full px-1 sm:px-1.5 py-0.5 min-w-[16px] sm:min-w-[20px] text-center shadow-lg">
                                        {unreadCount > 99 ? "99+" : unreadCount}
                                    </span>
                                </>
                            )}
                        </button>

                        {/* Profile Section */}
                        <div className="relative" ref={profileRef}>
                            <button
                                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                className="flex items-center gap-2 sm:gap-3 p-1 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-all duration-300 group touch-manipulation"
                            >
                                <div className="relative">
                                    <img
                                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-gray-200 group-hover:border-[#F47621] transition-all duration-300"
                                        src={
                                            photodata?.data?.photo ? photodata?.data?.photo : profileAvatar
                                        }
                                        alt="Profile"
                                    />
                                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                </div>
                                <span className="hidden sm:block text-sm font-semibold text-gray-700 group-hover:text-[#F47621] transition-colors max-w-[100px] md:max-w-none truncate">
                                    {data?.name || "User"}
                                </span>
                                <svg
                                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 transition-transform duration-300 flex-shrink-0 ${isProfileDropdownOpen ? "rotate-180" : ""
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {/* Profile Dropdown */}
                            {isProfileDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-[280px] sm:w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-slide-down max-h-[calc(100vh-100px)] overflow-y-auto">
                                    {/* Profile Header */}
                                    <div className="bg-gradient-to-r from-[#F47621] to-[#ff8c42] p-3 sm:p-4">
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <img
                                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white flex-shrink-0"
                                                src={
                                                    photodata?.data?.photo
                                                        ? photodata?.data?.photo
                                                        : profileAvatar
                                                }
                                                alt="Profile"
                                            />
                                            <div className="min-w-0 flex-1">
                                                <p className="text-white font-bold text-xs sm:text-sm truncate">
                                                    {data?.name || "User"}
                                                </p>
                                                <p className="text-white/80 text-[10px] sm:text-xs">
                                                    {t("SideBar.healthcareFacility")}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Menu Items */}
                                    <div className="py-2">
                                        {/* Settings Option - Navigate to Settings Page */}
                                        <Link
                                            to="/settings"
                                            onClick={() => setIsProfileDropdownOpen(false)}
                                            className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-all duration-300 group touch-manipulation"
                                        >
                                            <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white flex-shrink-0">
                                                <IoSettingsOutline size={16} className="sm:w-[18px] sm:h-[18px]" />
                                            </div>
                                            <span className="flex-1 text-left text-sm sm:text-base font-medium group-hover:text-[#F47621] transition-colors">
                                                {t("SideBar.settings.Settings")}
                                            </span>
                                            <svg
                                                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </Link>

                                        {/* Divider */}
                                        <div className="border-t border-gray-200 my-2"></div>

                                        {/* Logout */}
                                        <button
                                            onClick={() => {
                                                setIsProfileDropdownOpen(false);
                                                togglePopupLogout();
                                            }}
                                            className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 text-red-600 hover:bg-red-50 active:bg-red-100 transition-all duration-300 group touch-manipulation"
                                        >
                                            <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 text-white flex-shrink-0">
                                                <IoLogOutOutline size={16} className="sm:w-[18px] sm:h-[18px]" />
                                            </div>
                                            <span className="flex-1 text-left text-sm sm:text-base font-medium group-hover:text-red-700 transition-colors">
                                                {t("SideBar.settings.Logout")}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Logout Popup */}
            {isPopupLogout && (
                <PopupLogout togglePopup={togglePopupLogout} onConfirm={onConfirm} />
            )}
        </nav>
    );
};

export default Navbar;

