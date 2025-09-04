import { IoClose } from "react-icons/io5";
import NotificationsList from "./NotificationsList";
import useNotificationsPusher from "../../hooks/useNotificationsPusher";
import "./ResponsiveNotifications.css";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

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

  return (
    <>
      {notificationIsOpen && (
        <div
          className="w-full h-[100vh] fixed z-20 top-0 left-0 flex justify-center items-center bg-[#28293d94] text-black"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="notifications-title"
        >
          <div
            ref={containerRef}
            className="NotificationsContainer slide-in bg-white h-screen w-[500px] absolute top-0 left-0 p-6 flex flex-col"
            role="document"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <h3 id="notifications-title" className="text-xl font-extrabold">
                  {t("notifications.title")}
                </h3>
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-600 hover:text-blue-800 px-2 py-1 rounded transition-colors"
                  >
                    Mark All Read
                  </button>
                )}
                <button
                  ref={closeButtonRef}
                  onClick={() => setNotificationIsOpen(false)}
                  className="cursor-pointer hover:bg-gray-100 p-1 rounded transition-colors"
                  aria-label={t("common.close")}
                >
                  <IoClose size={25} />
                </button>
              </div>
            </div>

            <div
              className="NotificationsList overflow-y-auto scrollbar-custom flex-1"
              role="list"
            >
              {isLoading ? (
                <div className="flex justify-center items-center py-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <span className="ml-2 text-gray-500">Loading...</span>
                </div>
              ) : error ? (
                <div className="text-center text-gray-500 mt-10">
                  <div className="flex justify-center items-center mb-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
                  </div>
                  <p>Reconnecting...</p>
                </div>
              ) : notifications.length > 0 ? (
                notifications.map((notification) => (
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
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center mb-4">
                    <div className="text-2xl text-gray-400">✓</div>
                  </div>
                  <p className="text-lg font-medium text-gray-500">
                    {t("notifications.noneNotifications")}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-3 flex-shrink-0">
              <Link to="/notifications">
                <button
                  onClick={() => setNotificationIsOpen(!setNotificationIsOpen)}
                  className="w-full py-2.5 text-center text-[#F47621] hover:text-[#EE6000] hover:bg-[#FFDFC6] rounded-lg transition-colors text-sm font-medium"
                >
                  {t("notifications.seeAll")}
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
