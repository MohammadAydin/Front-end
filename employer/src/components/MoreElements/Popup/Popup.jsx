import React from "react";
import "./Popup.css";
import { RiErrorWarningLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";

// Pass confirmation props and change the state of the popup
const Popup = ({ togglePopup, onConfirm }) => {
  const { t } = useTranslation();
  return (
    <div className="modal">
      <div onClick={togglePopup} className="overlay"></div>
      <div className="modal-content-location animate-slide-up">
        {/* Close button */}
        <button className="close-modal-location" onClick={togglePopup}>
          <IoMdClose size={24} />
        </button>

        {/* Icon Container */}
        <div className="location-icon-container">
          <div className="location-icon-ring"></div>
          <div className="location-icon-ring-delayed"></div>
          <div className="location-icon-bg">
            <IoLocationSharp className="location-icon" size={48} />
          </div>
        </div>

        {/* Title */}
        <h3 className="location-title">{t("addLocation.popup.title")}</h3>

        {/* Description */}
        <p className="location-description">
          {t("addLocation.popup.description") || "Are you sure you want to proceed with this action?"}
        </p>

        {/* Buttons */}
        <div className="location-buttons">
          <button
            onClick={togglePopup}
            className="location-button-cancel"
          >
            {t("addLocation.popup.noEdit")}
          </button>
          <button
            onClick={() => {
              onConfirm();
              togglePopup();
            }}
            type="button"
            className="location-button-confirm"
          >
            {t("addLocation.popup.yesConfirm")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
