import { IoClose } from "react-icons/io5";
import NotificationsList from "./NotificationsList";

const NotificationsContainer = ({
  notificationIsOpen,
  setNotificationIsOpen,
}) => {
  const num = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  if (!notificationIsOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-[#28293d94] z-40"
        onClick={() => setNotificationIsOpen(false)}
      ></div>

      <div className="fixed top-0 left-0 h-screen w-[500px] bg-white z-50 flex flex-col p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-extrabold">Notifications</h3>
          <button
            onClick={() => setNotificationIsOpen(false)}
            className="cursor-pointer"
          >
            <IoClose size={25} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          {num.map((i) => (
            <NotificationsList key={i} />
          ))}
        </div>
      </div>
    </>
  );
};

export default NotificationsContainer;
