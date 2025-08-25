import SideBar from "../components/SideBar/SideBar";
import { Outlet } from "react-router-dom";
import SmallSideBar from "../components/SideBar/SmallSideBar";
import { useState } from "react";
import NotificationsContainer from "../components/Notifications/NotificationsContainer";
import ErrorBoundary from "../components/MoreElements/ErrorBoundary";
import { useTranslation } from 'react-i18next';

const Layout = () => {
  const [notificationIsOpen, setNotificationIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="app-layout">
      <div className="flex" role="application" aria-label={t('common.applicationLayout')}>
        <aside className="max-sm:hidden " role="navigation" aria-label={t('nav.mainNavigation')}>
          <SideBar setNotificationIsOpen={setNotificationIsOpen} />
        </aside>
        <div className="w-full">
          <header className="sm:hidden" role="banner">
            <SmallSideBar setNotificationIsOpen={setNotificationIsOpen} />
          </header>
          <main id="main-content" role="main" aria-label={t('common.mainContent')}>
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          </main>
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
