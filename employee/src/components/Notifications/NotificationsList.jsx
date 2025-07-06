import { useState } from "react";
import customFetch from "../../utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IoIosArrowDown } from "react-icons/io";

const NotificationsList = ({
  id,
  title,
  message,
  type,
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

  const handleAvatarClick = (e) => {
    if (!read_at) {
      setLocallyRead(true);
      markAsReadMutation.mutate();
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
          <div>
            <p className="NotificationTitle font-bold">{title}</p>
            <div className="NotificationInfo flex gap-5 text-sm text-[#919EAB]">
              <span>{created_at}</span>
              <span className="text-[#F47621]">{type}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5">
          {" "}
          {!locallyRead && (
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
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
