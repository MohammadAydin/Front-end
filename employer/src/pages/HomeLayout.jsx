import React, { useState } from "react";
import SideBar from "../components/SideBar/SideBar";
import Wrapper from "../assets/wrapper/HomeLayout";
import { Outlet } from "react-router-dom";
import SmallSideBar from "../components/SideBar/SmallSideBar";
import NotificationsContainer from "../components/Notifications/NotificationsContainer";
import Navbar from "../components/Navbar/Navbar";

const HomeLayout = () => {
  const [notificationIsOpen, setNotificationIsOpen] = useState(false);
  return (
    <Wrapper>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar - Fixed on the left */}
        <div className="max-sm:hidden flex-shrink-0">
          <SideBar />
        </div>
        
        {/* Content Area - Contains Navbar and Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Top Navbar - Only in content area */}
          <Navbar setNotificationIsOpen={setNotificationIsOpen} />
          
          {/* Small Sidebar for mobile */}
          <SmallSideBar />
          
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <Outlet />
          </div>
          
          {/* Notifications Container */}
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
