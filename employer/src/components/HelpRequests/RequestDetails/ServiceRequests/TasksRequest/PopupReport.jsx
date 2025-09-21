import React from "react";
import "../../../../MoreElements/Popup/Popup.css";
import { RiErrorWarningLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { useTranslation } from "react-i18next";

// Pass confirmation props and change the state of the popup
const PopupReport = ({ title, togglePopup, onConfirm }) => {
  const { t } = useTranslation();
  return (
    <div className="modal  ">
      <div onClick={togglePopup} className="overlay "></div>
      <div className="modal-content flex flex-col items-center rounded-[10px]">
        {/* Alert icon */}
        <RiErrorWarningLine className="text-secondaryColor text-9xl " />

        <p className="mt-8">{title}</p>
        {/* Close icon */}
        <button className="close-modal" onClick={togglePopup}>
          <IoMdClose />
        </button>
        <div className="flex w-[25vw] gap-3.5 mt-14 mb-6 ">
          <button
            onClick={togglePopup}
            className="bg-softwhite border   p-2 rounded-[10px] w-full"
          >
            {" "}
            Cancel{" "}
          </button>
          <button
            onClick={() => {
              onConfirm();
              togglePopup();
            }}
            type="button"
            className="bg-secondaryColor  text-white p-2  rounded-[10px] w-full "
          >
            {" "}
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupReport;
