import { IoClose } from "react-icons/io5";
import NotificationsList from "./NotificationsList";
import useData from "../../hooks/useData";
import "./ResponsiveNotifications.css";
const NotificationsContainer = ({
  notificationIsOpen,
  setNotificationIsOpen,
}) => {
  const { data } = useData("/notifications");
  return (
    <>
      {notificationIsOpen && (
        <div className="w-full h-[100vh] fixed z-20 top-0 left-0 flex justify-center items-center bg-[#28293d94] text-black">
          <div className="NotificationsContainer slide-in bg-white h-screen w-[500px] absolute top-0 left-0 p-10">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-extrabold">Notifications</h3>
              <button
                onClick={() => setNotificationIsOpen(false)}
                className="cursor-pointer"
              >
                <IoClose size={25} />
              </button>
            </div>
            <div
              style={{ maxHeight: "calc(100vh - 80px)" }}
              className="NotificationsList overflow-y-auto scrollbar-custom"
            >
              {data?.map((notification) => (
                <NotificationsList
                  key={notification.id}
                  id={notification.id}
                  title={notification.title}
                  message={notification.message}
                  type={notification.type}
                  created_at={notification.created_at}
                  read_at={notification.read_at}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationsContainer;
