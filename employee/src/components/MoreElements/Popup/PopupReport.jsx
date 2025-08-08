import React, { use } from "react";
import "./Popup.css";
import { RiErrorWarningLine } from "react-icons/ri";
import Button from "../Button";
import { IoMdClose } from "react-icons/io";
import { useTranslation } from "react-i18next";
import customFetch from "../../../utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { id } from "zod/v4/locales";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

// Pass confirmation props and change the state of the popup

const PopupReport = ({ togglePopup, onConfirm, idTask }) => {
  const { t } = useTranslation();

  const NoReason = useMutation({
    mutationFn: () =>
      customFetch
        .post(`/reports/${idTask}`, {
          message: "no issue",
          isSetIssue: false,
        })
        .then((res) => res.data),
    onSuccess: (data) => {
      togglePopup();
      toast.success(data.message);
    },
    onError: (error) => {
      togglePopup();
      toast.error(error?.response?.data?.message);
    },
  });
  return (
    <div className="modal  ">
      <div onClick={togglePopup} className="overlay "></div>
      <div className="modal-content flex flex-col items-center rounded-[10px]">
        {/* Alert icon */}
        <RiErrorWarningLine className="text-secondaryColor text-9xl " />

        <p className="mt-8">Do you have a reason or without reason?</p>
        {/* Close icon */}
        <button className="close-modal" onClick={togglePopup}>
          <IoMdClose />
        </button>
        <div className="flex w-[25vw] gap-3.5 mt-14 mb-6 ">
          {/* Cancel modification button */}
          <Button
            onClick={() => NoReason.mutate()}
            className="bg-softwhite border   p-2 rounded-[10px] w-full"
            text={"No Issue"}
          />
          {/* Submit confirmation button */}

          <Link
            to={`/reportTask/${idTask}`}
            className="bg-secondaryColor  text-white p-2  rounded-[10px] w-full text-center "
          >
            Issue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PopupReport;
