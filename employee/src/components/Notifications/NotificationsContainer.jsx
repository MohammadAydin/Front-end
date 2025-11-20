import { IoClose } from "react-icons/io5";
import NotificationsList from "./NotificationsList";
import useNotificationsPusher from "../../hooks/useNotificationsPusher";
import "./ResponsiveNotifications.css";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  LuBell,
  LuBellOff,
  LuChevronDown,
} from "react-icons/lu";
import {
  IoNotificationsOutline,
  IoCheckmarkDone,
} from "react-icons/io5";
import { RiErrorWarningLine } from "react-icons/ri";
import Spinner from "../MoreElements/Spinner";

const NotificationsContainer = ({
  notificationIsOpen,
  setNotificationIsOpen,
}) => {
  const getUserId = () => {
    try {
      const userString = localStorage.getItem("user");
      if (userString) {
        const user = JSON.parse(userString);
        if (user.token) {
          const tokenPayload = JSON.parse(atob(user.token.split(".")[1]));
          return tokenPayload.sub || tokenPayload.id || tokenPayload.user_id;
        }
        return user.id || user.user_id || user.userId;
      }
    } catch (error) {
      return null;
    }
    return null;
  };

  const userId = getUserId();
  const {
    notifications,
    unreadCount,
    isLoading,
    error,
    markAsRead,
    markAllAsRead,
    refetch,
  } = useNotificationsPusher(userId);

  const { t } = useTranslation();
  const containerRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (error && !isLoading) {
      const retryTimer = setTimeout(() => {
        refetch();
      }, 3000);

      return () => clearTimeout(retryTimer);
    }
  }, [error, isLoading, refetch]);

  useEffect(() => {
    if (notificationIsOpen && error && !isLoading) {
      const initialRetryTimer = setTimeout(() => {
        refetch();
      }, 1000);

      return () => clearTimeout(initialRetryTimer);
    }
  }, [notificationIsOpen, error, isLoading, refetch]);

  useEffect(() => {
    if (notificationIsOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [notificationIsOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && notificationIsOpen) {
        setNotificationIsOpen(false);
      }
    };

    if (notificationIsOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [notificationIsOpen, setNotificationIsOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setNotificationIsOpen(false);
    }
  };

  const unreadNotifications = notifications.filter(
    (notification) => !notification.read_at
  );

  return (
    <>
      {notificationIsOpen && (
        <div
          className="w-full h-[100vh] fixed z-20 top-0 left-0 flex justify-center items-center bg-black/60 backdrop-blur-sm"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="notifications-title"
        >
          <div
            ref={containerRef}
            className="NotificationsContainer slide-in bg-gradient-to-br from-gray-50 to-white h-screen w-[500px] absolute top-0 left-0 flex flex-col shadow-2xl"
            role="document"
          >
            {/* Header Section */}
            <div className="relative bg-gradient-to-r from-[#F47621] to-[#ff8c42] p-6 text-white">
              {/* Decorative Background Pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              ></div>
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2">
                    <IoNotificationsOutline size={24} className="text-white" />
                  </div>
                  <div>
                    <h3
                      id="notifications-title"
                      className="text-xl font-bold text-white"
                    >
                      {t("notifications.title")}
                    </h3>
                    <p className="text-white/90 text-sm">
                      {unreadCount > 0
                        ? t("notifications.subtitle", {
                            total: notifications.length,
                            unread: unreadCount,
                          })
                        : t("notifications.allRead")}
                    </p>
                  </div>
                </div>
                <button
                  ref={closeButtonRef}
                  onClick={() => setNotificationIsOpen(false)}
                  className="cursor-pointer hover:bg-white/20 p-2 rounded-lg transition-all duration-300 hover:scale-110"
                  aria-label={t("common.close")}
                >
                  <IoClose size={24} className="text-white" />
                </button>
              </div>

              {/* Mark All as Read Button */}
              {unreadCount > 0 && (
                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={markAllAsRead}
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105"
                  >
                    <IoCheckmarkDone size={18} />
                    {t("notifications.markAllAsRead")}
                  </button>
                  {unreadCount > 0 && (
                    <div className="bg-red-500 text-white text-sm font-bold rounded-full px-3 py-1 min-w-[28px] text-center shadow-lg">
                      {unreadCount}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Notifications List */}
            <div
              className="NotificationsList overflow-y-auto scrollbar-custom flex-1 p-4 bg-white"
              role="list"
            >
              {isLoading ? (
                <div className="flex flex-col justify-center items-center py-20">
                  <Spinner />
                  <span className="mt-4 text-gray-500">
                    {t("notifications.loading")}
                  </span>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="bg-red-100 rounded-full p-6 mb-4">
                    <RiErrorWarningLine size={48} className="text-red-600" />
                  </div>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400 mb-3"></div>
                  <p className="text-gray-600">{t("notifications.reconnecting")}</p>
                </div>
              ) : unreadNotifications.length > 0 ? (
                <div className="space-y-3">
                  {unreadNotifications.map((notification) => (
                    <NotificationsList
                      key={notification.id}
                      id={notification.id}
                      title={notification.title}
                      message={notification.message}
                      type={notification.type}
                      type_details={notification.type_details}
                      created_at={notification.created_at}
                      read_at={notification.read_at}
                      onMarkAsRead={markAsRead}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-20">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-200/50 to-blue-200/50 rounded-full blur-2xl"></div>
                    <div className="relative bg-gradient-to-br from-green-100 to-blue-100 rounded-full p-8">
                      <LuBellOff size={64} className="text-gray-400" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {t("notifications.allCaughtUp")}
                  </h3>
                  <p className="text-gray-600">
                    {t("notifications.noUnreadNotifications")}
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex-shrink-0">
              <Link to="/notifications">
                <button
                  onClick={() => setNotificationIsOpen(false)}
                  className="w-full py-3 text-center bg-gradient-to-r from-[#F47621] to-[#ff8c42] hover:from-[#EE6000] hover:to-[#F47621] text-white rounded-xl transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg hover:scale-[1.02]"
                >
                  {t("notifications.seeAllNotifications")}
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationsContainer;
