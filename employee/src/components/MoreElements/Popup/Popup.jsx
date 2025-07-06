import React from "react";
import "./Popup.css";
import { RiErrorWarningLine } from "react-icons/ri";
import Button from "../Button";
import { IoMdClose } from "react-icons/io";

// Pass confirmation props and change the state of the popup
const Popup = ({ togglePopup, onConfirm }) => {
  return (
    <div className="modal  ">
      <div onClick={togglePopup} className="overlay "></div>
      <div className="modal-content flex flex-col items-center rounded-[10px]">
        {/* Alert icon */}
        <RiErrorWarningLine className="text-secondaryColor text-9xl " />

        <p className="mt-8">Is the entered information correct?</p>
        {/* Close icon */}
        <button className="close-modal" onClick={togglePopup}>
          <IoMdClose />
        </button>
        <div className="flex w-[25vw] gap-3.5 mt-14 mb-6 ">
          {/* Cancel modification button */}
          <Button
            onClick={togglePopup}
            className="bg-softwhite border   p-2 rounded-[10px] w-full"
            text="No, I want to edit"
          />
          {/* Submit confirmation button */}
          <Button
            onClick={() => {
              onConfirm();
              togglePopup();
            }}
            type="button"
            className="bg-secondaryColor  text-white p-2  rounded-[10px] w-full "
            text="Yes, proceed"
          />
        </div>
      </div>
    </div>
  );
};

export default Popup;
