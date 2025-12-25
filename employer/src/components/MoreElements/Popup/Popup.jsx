import React from "react";
import "./Popup.css";
import { RiErrorWarningLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";

// Pass confirmation props and change the state of the popup
const Popup = ({ togglePopup, onConfirm, isSaving = false }) => {
  const { t } = useTranslation();
  
  const handleConfirm = async () => {
    await onConfirm();
    // Don't close popup immediately - let the parent component handle it after success
  };

  const handleOverlayClick = () => {
    if (!isSaving) {
      togglePopup();
    }
  };

  return (
    <div className="modal">
      <div onClick={handleOverlayClick} className={`overlay ${isSaving ? "overlay-saving" : ""}`}></div>
      <div className={`modal-content-location animate-slide-up ${isSaving ? "saving-state" : ""}`}>
        {/* Close button */}
        <button 
          className="close-modal-location" 
          onClick={togglePopup}
          disabled={isSaving}
          aria-label={t("common.close")}
        >
          <IoMdClose size={24} />
        </button>

        {/* Icon Container */}
        <div className="location-icon-container">
          {isSaving ? (
            <>
              <div className="location-icon-ring-saving"></div>
              <div className="location-icon-ring-saving-delayed"></div>
              <div className="location-icon-bg-saving">
                <div className="saving-spinner-large"></div>
              </div>
            </>
          ) : (
            <>
              <div className="location-icon-ring"></div>
              <div className="location-icon-ring-delayed"></div>
              <div className="location-icon-bg">
                <IoLocationSharp className="location-icon" size={48} />
              </div>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="location-title">
          {isSaving 
            ? t("addLocation.popup.saving.title") 
            : t("addLocation.popup.title")
          }
        </h3>

        {/* Description */}
        <p className="location-description">
          {isSaving 
            ? t("addLocation.popup.saving.description")
            : t("addLocation.popup.description")
          }
        </p>

        {/* Buttons */}
        <div className="location-buttons">
          <button
            onClick={togglePopup}
            className="location-button-cancel"
            disabled={isSaving}
          >
            {t("addLocation.popup.noEdit")}
          </button>
          <button
            onClick={handleConfirm}
            type="button"
            className={`location-button-confirm ${isSaving ? "saving-button" : ""}`}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <div className="saving-spinner-button"></div>
                <span>{t("addLocation.popup.saving.button")}</span>
              </>
            ) : (
              t("addLocation.popup.yesConfirm")
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
