import { useState } from "react";
import customFetch from "../../utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [locallyRead, setLocallyRead] = useState(!!read_at);
  const queryClient = useQueryClient();

  const markAsReadMutation = useMutation({
    mutationFn: () => customFetch.post(`/notifications/update/${id}`),

    onSuccess: () => {
      queryClient.invalidateQueries(["notifications", "unread"]);
    },
  });

  const handleAvatarClick = () => {
    if (!read_at) {
      setLocallyRead(true);
      markAsReadMutation.mutate();
    }
  };

  // Function to get the appropriate icon based on the icon name
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

  // Function to get color classes based on the color name
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

  // Function to get background color for the unread indicator
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

  return (
    <div
      className={`border-b border-[#919eab63] border-dashed py-1 overflow-hidden transition-[padding] duration-1000 ease-out w-[95%] ${
        isOpen ? "pb-5" : "pb-1"
      }`}
    >
      <div
        onClick={() => {
          setIsOpen(!isOpen), handleAvatarClick();
        }}
        className=" flex items-center justify-between my-4 cursor-pointer"
      >
        <div className="Notification flex items-center justify-between gap-4">
          {/* Add icon display */}
          {type_details?.icon && (
            <div className={`text-xl ${getColorClasses(type_details.color)}`}>
              {getIcon(type_details.icon)}
            </div>
          )}
          <div>
            <p className="NotificationTitle font-bold">{title}</p>
            <div className="NotificationInfo flex gap-5 text-sm text-[#919EAB]">
              <span>{created_at}</span>
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

        <div className="flex items-center gap-5">
          {" "}
          {!locallyRead && (
            <div
              className={`w-2 h-2 rounded-full ${
                type_details?.color
                  ? getBgColorClasses(type_details.color)
                  : "bg-blue-500"
              }`}
            ></div>
          )}
          <div>
            <IoIosArrowDown
              size={20}
              className={`${
                isOpen && "rotate-180"
              } transition-all duration-300 ease-out `}
            />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="NotificationMessage slide-down">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default NotificationsList;
