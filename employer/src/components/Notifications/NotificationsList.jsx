import { useState, useCallback } from "react";
import {
  AiOutlineInfoCircle,
  AiOutlineCheckCircle,
  AiOutlineExclamationCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { RiErrorWarningLine } from "react-icons/ri";
import { TbRadioactive } from "react-icons/tb";
import {
  LuChevronDown,
  LuChevronUp,
  LuBell,
} from "react-icons/lu";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

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
        await onMarkAsRead(id);
      } catch (error) {
        console.error("Failed to mark notification as read:", error);
        setIsRemoving(false);
      }
    }
  }, [isOpen, read_at, onMarkAsRead, id]);

  const getIcon = (iconName) => {
    const iconMap = {
      "info-circle": AiOutlineInfoCircle,
      "check-circle": AiOutlineCheckCircle,
      "exclamation-triangle": RiErrorWarningLine,
      "times-circle": AiOutlineCloseCircle,
      "exclamation-circle": AiOutlineExclamationCircle,
      radiation: TbRadioactive,
    };
    const IconComponent = iconMap[iconName] || AiOutlineInfoCircle;
    return <IconComponent size={20} />;
  };

  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        text: "text-blue-600",
        bg: "bg-blue-50",
        iconBg: "bg-blue-100",
        badge: "bg-blue-100 text-blue-700",
      },
      red: {
        text: "text-red-600",
        bg: "bg-red-50",
        iconBg: "bg-red-100",
        badge: "bg-red-100 text-red-700",
      },
      green: {
        text: "text-green-600",
        bg: "bg-green-50",
        iconBg: "bg-green-100",
        badge: "bg-green-100 text-green-700",
      },
      yellow: {
        text: "text-yellow-600",
        bg: "bg-yellow-50",
        iconBg: "bg-yellow-100",
        badge: "bg-yellow-100 text-yellow-700",
      },
      orange: {
        text: "text-orange-600",
        bg: "bg-orange-50",
        iconBg: "bg-orange-100",
        badge: "bg-orange-100 text-orange-700",
      },
    };
    return (
      colorMap[color] || {
        text: "text-blue-600",
        bg: "bg-blue-50",
        iconBg: "bg-blue-100",
        badge: "bg-blue-100 text-blue-700",
      }
    );
  };

  const formatDate = (dateString) => {
    return dateString || "No date";
  };

  const isUnread = !read_at;
  const colors = getColorClasses(type_details?.color);

  // Hide notification if removing
  if (isRemoving) {
    return (
      <div
        className={`overflow-hidden transition-all duration-500 ease-out opacity-0 transform translate-x-full max-h-0 py-0 mb-0`}
        style={{
          transitionProperty: "opacity, transform, max-height, padding, margin",
        }}
      ></div>
    );
  }

  return (
    <div
      className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 ${
        colors.bg
      } ${isUnread ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-300"}`}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Icon */}
          {type_details?.icon && (
            <div
              className={`${colors.iconBg} ${colors.text} rounded-lg p-2 flex-shrink-0 shadow-md`}
            >
              {getIcon(type_details.icon)}
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4
                    className={`font-bold text-sm ${
                isUnread ? "text-gray-900" : "text-gray-700"
              }`}
            >
              {title}
                  </h4>
              {isUnread && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 animate-pulse"></span>
              )}
                </div>

                <div className="flex items-center gap-3 flex-wrap text-xs text-gray-500 mb-2">
                  <span className="flex items-center gap-1">
                    <LuBell size={12} />
                    {formatDate(created_at)}
                  </span>
              <span
                    className={`${colors.badge} px-2 py-0.5 rounded text-xs font-semibold`}
              >
                {type}
              </span>
          </div>
        </div>

              {/* Actions */}
              <div className="flex items-center gap-1 flex-shrink-0">
                {isUnread && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggle();
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white p-1.5 rounded-lg transition-all duration-300 hover:scale-110"
                    title="Mark as read"
                  >
                    <IoCheckmarkDoneCircle size={16} />
                  </button>
                )}
                <button
                  onClick={handleToggle}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-1.5 rounded-lg transition-all duration-300 hover:scale-110"
                  title={isOpen ? "Collapse" : "Expand"}
                >
                  {isOpen ? (
                    <LuChevronUp size={16} />
                  ) : (
                    <LuChevronDown size={16} />
                  )}
                </button>
        </div>
      </div>

            {/* Expanded Message */}
      {isOpen && (
              <div className="mt-3 pt-3 border-t border-gray-200 animate-slide-down">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {message}
                </p>
          {type_details?.description && (
            <div className="mt-2 pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-600">
                {type_details.description}
              </p>
            </div>
          )}
        </div>
      )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsList;
