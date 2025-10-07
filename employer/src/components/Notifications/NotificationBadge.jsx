import { FaBell } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import useNotificationsPusher from "../../hooks/useNotificationsPusher";
import { getCurrentPusherConfig } from "../../config/pusher";

const NotificationBadge = ({ onClick, className = "" }) => {
  const { t } = useTranslation();
  const config = getCurrentPusherConfig();
  const userId = config.utils.getUserIdFromToken();
  const { unreadCount } = useNotificationsPusher(userId);

  return (
    <button
      onClick={onClick}
      className={`relative p-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg transition-colors ${className}`}
      aria-label={`${t("notifications.title")} ${
        unreadCount > 0 ? `- ${unreadCount} unread` : ""
      }`}
    >
      <FaBell size={20} />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </button>
  );
};

export default NotificationBadge;
