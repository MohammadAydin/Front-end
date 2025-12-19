import React, { useEffect } from "react";
import "./Popup.css";
import { IoLogOutOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useTranslation } from "react-i18next";

// Pass confirmation props and change the state of the popup
const PopupLogout = ({ togglePopup, onConfirm }) => {
  const { t } = useTranslation();

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        togglePopup();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [togglePopup]);

  return (
    <div className="modal">
      <div onClick={togglePopup} className="overlay"></div>
      <div className="modal-content-logout">
        {/* Close Button */}
        <button
          className="close-modal-logout"
          onClick={togglePopup}
          aria-label="Close"
        >
          <IoMdClose size={24} />
        </button>

        {/* Icon Container with Animation */}
        <div className="logout-icon-container">
          <div className="logout-icon-ring"></div>
          <div className="logout-icon-ring-delayed"></div>
          <div className="logout-icon-bg">
            <IoLogOutOutline size={64} className="logout-icon" />
          </div>
        </div>

        {/* Title */}
        <h2 className="logout-title">
          {t("SideBar.settings.logout.confirmation")}
        </h2>

        {/* Description */}
        <p className="logout-description">
          {t("SideBar.settings.logout.description")}
        </p>

        {/* Buttons */}
        <div className="logout-buttons">
          {/* Cancel Button */}
          <button
            onClick={togglePopup}
            className="logout-button-cancel"
          >
            {t("SideBar.settings.logout.cancel")}
          </button>

          {/* Confirm Button */}
          <button
            onClick={() => {
              onConfirm();
              togglePopup();
            }}
            type="button"
            className="logout-button-confirm"
          >
            <IoLogOutOutline size={20} />
            {t("SideBar.settings.logout.confirm")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupLogout;
