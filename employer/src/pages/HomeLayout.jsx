import React, { useState } from "react";
import SideBar from "../components/SideBar/SideBar";
import Wrapper from "../assets/wrapper/HomeLayout";
import { Outlet } from "react-router-dom";
import SmallSideBar from "../components/SideBar/SmallSideBar";
import NotificationsContainer from "../components/Notifications/NotificationsContainer";

const HomeLayout = () => {
  const [notificationIsOpen, setNotificationIsOpen] = useState(false);
  return (
    <Wrapper>
      <div className="flex">
        <div className="max-sm:hidden">
          <SideBar setNotificationIsOpen={setNotificationIsOpen} />
        </div>
        <div className="w-full">
          <SmallSideBar />
          <Outlet />
          <NotificationsContainer
            notificationIsOpen={notificationIsOpen}
            setNotificationIsOpen={setNotificationIsOpen}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default HomeLayout;
