import { useEffect } from "react";
import { OpenSuccsessPopup } from "../../store/OpenSuccsessPopup";
import { IoClose, IoCheckmarkCircle } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import "./SuccessPopup.css";

const SuccsessPopup = () => {
  const { t } = useTranslation();
  const { isOpen, CloseSuccsess } = OpenSuccsessPopup();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        CloseSuccsess();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, CloseSuccsess]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      CloseSuccsess();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="success-popup-overlay" onClick={handleOverlayClick}>
      <div className="success-popup-container animate-success-popup">
        {/* Close button */}
        <button 
          className="success-popup-close" 
          onClick={CloseSuccsess}
          aria-label={t("common.close")}
        >
          <IoClose size={24} />
        </button>

        {/* Icon Container with Animation */}
        <div className="success-popup-icon-container">
          <div className="success-popup-ring"></div>
          <div className="success-popup-ring-delayed"></div>
          <div className="success-popup-icon-bg">
            <IoCheckmarkCircle className="success-popup-icon" size={80} />
          </div>
        </div>

        {/* Title */}
        <h3 className="success-popup-title">
          {t('formElements.successPopup.title')}
        </h3>

        {/* Description */}
        <p className="success-popup-description">
          {t('formElements.successPopup.description')}
        </p>

        {/* Decorative Line */}
        <div className="success-popup-line"></div>
      </div>
    </div>
  );
};

export default SuccsessPopup;
