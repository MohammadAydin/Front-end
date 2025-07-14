import { IoClose } from "react-icons/io5";
import NotificationsList from "./NotificationsList";
import useData from "../../hooks/useData";
import "./ResponsiveNotifications.css";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";

const NotificationsContainer = ({
  notificationIsOpen,
  setNotificationIsOpen,
}) => {
  const { data } = useData("/notifications");
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Focus management for modal
  useEffect(() => {
    if (notificationIsOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [notificationIsOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && notificationIsOpen) {
        setNotificationIsOpen(false);
      }
    };

    if (notificationIsOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
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
            className="NotificationsContainer slide-in bg-white h-screen w-[500px] absolute top-0 left-0 p-10"
            role="document"
          >
            <div className="flex justify-between items-center mb-5">
              <h3 id="notifications-title" className="text-xl font-extrabold">{t("notifications.title")}</h3>
              <button
                ref={closeButtonRef}
                onClick={() => setNotificationIsOpen(false)}
                className="cursor-pointer"
                aria-label={t("common.close")}
              >
                <IoClose size={25} />
              </button>
            </div>
            <div
              style={{ maxHeight: "calc(100vh - 80px)" }}
              className="NotificationsList overflow-y-auto scrollbar-custom"
              role="list"
              aria-label={t("notifications.notificationsList")}
            >
              {data?.length > 0 ? (
                data.map((notification) => (
                  <NotificationsList
                    key={notification.id}
                    id={notification.id}
                    title={notification.title}
                    message={notification.message}
                    type={notification.type}
                    created_at={notification.created_at}
                    read_at={notification.read_at}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500 mt-10">
                  {t("notifications.noNotifications")}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationsContainer;
