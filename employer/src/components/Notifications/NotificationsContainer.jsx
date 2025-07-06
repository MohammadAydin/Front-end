import { IoClose } from "react-icons/io5";
import NotificationsList from "./NotificationsList";

const NotificationsContainer = ({
  notificationIsOpen,
  setNotificationIsOpen,
}) => {
  const num = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      {notificationIsOpen && (
        <div className="w-full h-[100vh] absolute top-0 left-0 flex justify-center items-center bg-[#28293d94] text-black">
          <div className="slide-in bg-white h-screen w-[500px] absolute top-0 left-0 p-10">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-extrabold">Notifications</h3>
              <button
                onClick={() => setNotificationIsOpen(false)}
                className="cursor-pointer"
              >
                <IoClose size={25} />
              </button>
            </div>
            <div>
              {num.map((i) => (
                <NotificationsList key={i} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationsContainer;
