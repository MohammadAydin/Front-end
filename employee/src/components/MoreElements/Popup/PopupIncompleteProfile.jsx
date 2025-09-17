import React from "react";
import "./Popup.css";
import { RiErrorWarningLine } from "react-icons/ri";
import Button from "../Button";
import { IoMdClose } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// Popup for incomplete profile warning
const PopupIncompleteProfile = ({ togglePopup }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleCompleteProfile = () => {
    togglePopup();
    navigate("/Personal info");
  };

  return (
    <div className="modal">
      <div onClick={togglePopup} className="overlay"></div>
      <div className="modal-content w-[30%] flex flex-col items-center rounded-[10px]">
        {/* Alert icon */}
        <RiErrorWarningLine className="text-secondaryColor text-9xl" />

        <p className="mt-8 text-center">
          {t("jopComponents.incompleteProfileWarning")}
        </p>
        
        {/* Close icon */}
        <button className="close-modal" onClick={togglePopup}>
          <IoMdClose />
        </button>
        
        <div className="flex w-full gap-3.5 mt-14 mb-6">
          {/* Cancel button */}
          <Button
            onClick={togglePopup}
            className="bg-softwhite border p-2 rounded-[10px] w-full"
            text={t("jopComponents.cancel")}
          />
          {/* Complete Profile button */}
          <Button
            onClick={handleCompleteProfile}
            type="button"
            className="bg-secondaryColor text-white p-2 rounded-[10px] w-full"
            text={t("jopComponents.completeProfileButton")}
          />
        </div>
      </div>
    </div>
  );
};

export default PopupIncompleteProfile;
