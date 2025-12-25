import React, { useEffect, useState } from "react";
import "./Popup.css";
import { IoLogOutOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useTranslation } from "react-i18next";

// Pass confirmation props and change the state of the popup
const PopupLogout = ({ togglePopup, onConfirm }) => {
  const { t } = useTranslation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && !isLoggingOut) {
        togglePopup();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [togglePopup, isLoggingOut]);

  const handleConfirm = async () => {
    setIsLoggingOut(true);
    try {
      await onConfirm();
      // Don't close popup here - let the logout function handle navigation
    } catch (error) {
      setIsLoggingOut(false);
      // Error is already handled in logout function
    }
  };

  const handleOverlayClick = () => {
    if (!isLoggingOut) {
      togglePopup();
    }
  };

  return (
    <div className="modal">
      <div 
        onClick={handleOverlayClick} 
        className={`overlay ${isLoggingOut ? "overlay-logging-out" : ""}`}
      ></div>
      <div className={`modal-content-logout ${isLoggingOut ? "logging-out-state" : ""}`}>
        {/* Close Button */}
        <button
          className="close-modal-logout"
          onClick={togglePopup}
          disabled={isLoggingOut}
          aria-label={t("common.close")}
        >
          <IoMdClose size={24} />
        </button>

        {/* Icon Container with Animation */}
        <div className="logout-icon-container">
          {isLoggingOut ? (
            <>
              <div className="logout-icon-ring-logging"></div>
              <div className="logout-icon-ring-logging-delayed"></div>
              <div className="logout-icon-bg-logging">
                <div className="logout-spinner-large"></div>
              </div>
            </>
          ) : (
            <>
              <div className="logout-icon-ring"></div>
              <div className="logout-icon-ring-delayed"></div>
              <div className="logout-icon-bg">
                <IoLogOutOutline size={64} className="logout-icon" />
              </div>
            </>
          )}
        </div>

        {/* Title */}
        <h2 className="logout-title">
          {isLoggingOut 
            ? t("SideBar.settings.logout.loggingOut.title")
            : t("SideBar.settings.logout.confirmation")
          }
        </h2>

        {/* Description */}
        <p className="logout-description">
          {isLoggingOut
            ? t("SideBar.settings.logout.loggingOut.description")
            : t("SideBar.settings.logout.description")
          }
        </p>

        {/* Buttons */}
        <div className="logout-buttons">
          {/* Cancel Button */}
          <button
            onClick={togglePopup}
            className="logout-button-cancel"
            disabled={isLoggingOut}
          >
            {t("SideBar.settings.logout.cancel")}
          </button>

          {/* Confirm Button */}
          <button
            onClick={handleConfirm}
            type="button"
            className={`logout-button-confirm ${isLoggingOut ? "logging-out-button" : ""}`}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <>
                <div className="logout-spinner-button"></div>
                <span>{t("SideBar.settings.logout.loggingOut.button")}</span>
              </>
            ) : (
              <>
                <IoLogOutOutline size={20} />
                {t("SideBar.settings.logout.confirm")}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupLogout;
