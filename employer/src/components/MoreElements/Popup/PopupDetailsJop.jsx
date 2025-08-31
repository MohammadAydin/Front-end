import React from "react";
import "./Popup.css";
import { RiErrorWarningLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

const PopupDetailsJop = ({ togglePopup, onConfirm, formData }) => {
  return (
    <div className="modal">
      <div onClick={togglePopup} className="overlay"></div>
      <div className="modal-content flex flex-col items-center rounded-[10px]">
        <h3 className="text-xl font-bold mb-4">Preview Job Request</h3>
        <div className="text-left w-full max-w-md mb-6">
          <p>
            <b>Title:</b> {formData?.Title}
          </p>
          <p>
            <b>Description:</b> {formData?.Description}
          </p>
          <p>
            <b>Employees Required:</b> {formData?.EmployeeCount}
          </p>
          <p>
            <b>Position:</b> {formData?.Position}
          </p>
          <p>
            <b>Shift:</b> {formData?.Shifts}
          </p>
          <p>
            <b>Address:</b> {formData?.Address}
          </p>
          <p>
            <b>Date From:</b> {formData?.date?.from}
          </p>
          <p>
            <b>Date To:</b> {formData?.date?.to}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={togglePopup}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-orange-500 px-4 py-2 rounded text-white"
          >
            Confirm & Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupDetailsJop;
