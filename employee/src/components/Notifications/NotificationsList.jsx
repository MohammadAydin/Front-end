import { useState, useEffect } from "react";
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
  const [locallyRead, setLocallyRead] = useState(!!read_at);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleToggle = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);

    if (newIsOpen) {
      setHasBeenOpened(true);
    } else if (hasBeenOpened && !read_at && !locallyRead) {
      setIsRemoving(true);
      setLocallyRead(true);
      onMarkAsRead(id);
      setTimeout(() => {}, 1800);
    }
  };

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

  const getBgColorClasses = (color) => {
    switch (color) {
      case "blue":
        return "bg-blue-500";
      case "red":
        return "bg-red-500";
      case "green":
        return "bg-green-500";
      case "yellow":
        return "bg-yellow-500";
      case "orange":
        return "bg-orange-500";
      default:
        return "bg-blue-500";
    }
  };

  const formatDate = (dateString) => {
    return dateString || "No date";
  };

  const isUnread = !read_at && !locallyRead;

  if (read_at || locallyRead) {
    return null;
  }

  return (
    <div
      className={`border-b border-[#919eab63] border-dashed py-1 overflow-hidden w-[95%] ${
        isOpen ? "pb-5" : "pb-1"
      } ${
        isRemoving
          ? "transition-all duration-1500 ease-out opacity-0 transform scale-75 -translate-y-8 max-h-0 py-0 border-0"
          : "transition-all duration-300 ease-out opacity-100 transform scale-100 translate-y-0"
      }`}
      style={{
        transformOrigin: "center top",
      }}
    >
      <div
        onClick={handleToggle}
        className="flex items-center justify-between my-4 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
      >
        <div className="Notification flex items-center justify-between gap-4">
          {/* Add icon display */}
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
            </p>
            <div className="NotificationInfo flex gap-5 text-sm text-[#919EAB]">
              <span>{formatDate(created_at)}</span>{" "}
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
          <div className="flex items-center gap-3">
            <div>
              <IoIosArrowDown
                size={20}
                className={`${
                  isOpen && "rotate-180"
                } transition-all duration-300 ease-out text-gray-400`}
              />
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="NotificationMessage slide-down bg-gray-50 p-3 rounded-lg mx-2 mb-2">
          <p className="text-gray-700 leading-relaxed">{message}</p>

          {/* Additional information from type_details */}
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
