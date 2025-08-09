import { useState, useCallback } from "react";
import { IoIosArrowDown } from "react-icons/io";
import {
  AiOutlineInfoCircle,
  AiOutlineCheckCircle,
  AiOutlineExclamationCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { RiErrorWarningLine } from "react-icons/ri";
import { TbRadioactive } from "react-icons/tb";

const NotificationsList = ({
  id,
  title,
  message,
  type,
  type_details,
  read_at,
  created_at,
  onMarkAsRead,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleToggle = useCallback(async () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);

    if (!newIsOpen && !read_at) {
      setTimeout(() => {
        setIsRemoving(true);
      }, 100);

      try {
        // استدعاء API لوضع علامة مقروء - هذا سيحدث الـ unreadCount تلقائياً
        await onMarkAsRead(id);
      } catch (error) {
        console.error("Failed to mark notification as read:", error);
        // في حالة الفشل، إرجاع الحالة
        setIsRemoving(false);
      }
    }
  }, [isOpen, read_at, onMarkAsRead, id]);

  const getIcon = (iconName) => {
    switch (iconName) {
      case "info-circle":
        return <AiOutlineInfoCircle />;
      case "check-circle":
        return <AiOutlineCheckCircle />;
      case "exclamation-triangle":
        return <RiErrorWarningLine />;
      case "times-circle":
        return <AiOutlineCloseCircle />;
      case "exclamation-circle":
        return <AiOutlineExclamationCircle />;
      case "radiation":
        return <TbRadioactive />;
      default:
        return <AiOutlineInfoCircle />;
    }
  };

  const getColorClasses = (color) => {
    switch (color) {
      case "blue":
        return "text-blue-500";
      case "red":
        return "text-red-500";
      case "green":
        return "text-green-500";
      case "yellow":
        return "text-yellow-500";
      case "orange":
        return "text-orange-500";
      default:
        return "text-blue-500";
    }
  };

  const formatDate = (dateString) => {
    return dateString || "No date";
  };

  const isUnread = !read_at;

  // إخفاء الإشعار إذا كان في حالة الإزالة
  if (isRemoving) {
    return (
      <div
        className={`border-b border-[#919eab63] border-dashed py-1 overflow-hidden w-[95%] transition-all duration-500 ease-out opacity-0 transform translate-x-full max-h-0 py-0 mb-0`}
        style={{
          transitionProperty: "opacity, transform, max-height, padding, margin",
        }}
      >
        {/* المحتوى يختفي تدريجياً */}
      </div>
    );
  }

  return (
    <div
      className={`border-b border-[#919eab63] border-dashed py-1 overflow-hidden w-[95%] ${
        isOpen ? "pb-5" : "pb-1"
      } transition-all duration-300 ease-out`}
    >
      <div
        onClick={handleToggle}
        className="flex items-center justify-between my-4 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
      >
        <div className="Notification flex items-center justify-between gap-4">
          {type_details?.icon && (
            <div
              className={`text-xl ${getColorClasses(
                type_details.color
              )} flex-shrink-0`}
            >
              {getIcon(type_details.icon)}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p
              className={`NotificationTitle font-bold truncate ${
                isUnread ? "text-gray-900" : "text-gray-700"
              }`}
            >
              {title}
              {isUnread && (
                <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
              )}
            </p>
            <div className="NotificationInfo flex gap-5 text-sm text-[#919EAB]">
              <span>{formatDate(created_at)}</span>
              <span
                className={
                  type_details?.color
                    ? getColorClasses(type_details.color)
                    : "text-[#F47621]"
                }
              >
                {type}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <IoIosArrowDown
            size={20}
            className={`${
              isOpen && "rotate-180"
            } transition-all duration-300 ease-out text-gray-400`}
          />
        </div>
      </div>

      {isOpen && (
        <div className="NotificationMessage slide-down bg-gray-50 p-3 rounded-lg mx-2 mb-2">
          <p className="text-gray-700 leading-relaxed">{message}</p>

          {type_details?.description && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                {type_details.description}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationsList;
