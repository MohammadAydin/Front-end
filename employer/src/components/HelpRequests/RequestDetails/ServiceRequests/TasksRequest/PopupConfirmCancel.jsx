import React from "react";
import "../../../../MoreElements/Popup/Popup.css";
import { RiErrorWarningLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { useTranslation } from "react-i18next";

// Confirmation popup for task cancellation
const PopupConfirmCancel = ({ 
  title, 
  togglePopup, 
  onConfirm, 
  isProgress = false 
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="modal">
      <div onClick={togglePopup} className="overlay"></div>
      <div 
        className="modal-content flex flex-col items-center justify-center rounded-[10px] max-w-[90vw] sm:max-w-[500px]"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#ffffff',
          padding: '20px 24px',
          borderRadius: '10px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
        }}
      >
        {/* Alert icon - responsive sizing */}
        <RiErrorWarningLine className="text-secondaryColor text-6xl sm:text-8xl lg:text-9xl" />

        {/* Text content - responsive padding and font sizes */}
        <p className="mt-6 sm:mt-8 text-center px-2 sm:px-4 text-sm sm:text-base lg:text-lg leading-relaxed max-w-[90%] mx-auto">
          {title || (isProgress 
            ? "This task is in progress. To cancel it, you need to provide a reason by submitting a report. Do you want to proceed?"
            : "Are you sure you want to cancel this task? This action cannot be undone."
          )}
        </p>
        
        {/* Close icon */}
        <button className="close-modal" onClick={togglePopup}>
          <IoMdClose />
        </button>
        
        {/* Buttons container - responsive width and spacing */}
        <div className="flex flex-col sm:flex-row w-full max-w-[280px] sm:max-w-[400px] lg:max-w-[450px] gap-3 sm:gap-3.5 mt-8 sm:mt-12 lg:mt-14 mb-2 sm:mb-4">
          <button
            onClick={togglePopup}
            className="bg-softwhite border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 p-3 sm:p-2 rounded-[10px] w-full text-sm sm:text-base font-medium transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              togglePopup();
            }}
            type="button"
            className="bg-secondaryColor hover:bg-orange-600 text-white p-3 sm:p-2 rounded-[10px] w-full text-sm sm:text-base font-medium transition-colors duration-200"
          >
            {isProgress ? "Submit Report" : "Confirm Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupConfirmCancel;
