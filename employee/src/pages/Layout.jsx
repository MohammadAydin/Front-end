import SideBar from "../components/SideBar/SideBar";
import { Outlet } from "react-router-dom";
import SmallSideBar from "../components/SideBar/SmallSideBar";
import { useState } from "react";
import NotificationsContainer from "../components/Notifications/NotificationsContainer";

const Layout = () => {
  const [notificationIsOpen, setNotificationIsOpen] = useState(false);
  return (
    <div>
      <div className="flex">
        <div className="max-sm:hidden">
          <SideBar setNotificationIsOpen={setNotificationIsOpen} />
        </div>
        <div className="w-full">
          <SmallSideBar setNotificationIsOpen={setNotificationIsOpen} />
          <Outlet />
          <NotificationsContainer
            notificationIsOpen={notificationIsOpen}
            setNotificationIsOpen={setNotificationIsOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default Layout;
