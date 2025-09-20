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
import { Link, useNavigate } from "react-router-dom";

// Pass confirmation props and change the state of the popup

const PopupReport = ({
  status,
  dayDifferencTask,
  togglePopup,
  onConfirm,
  idTask,
}) => {
  console.log(dayDifferencTask, typeof dayDifferencTask);
  const { t } = useTranslation();
  const navigate = useNavigate();

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
      navigate("/tasksPage");
    },
    onError: (error) => {
      togglePopup();
      toast.error(error?.response?.data?.message);
      navigate("/tasksPage");
    },
  });
  const SendReport = useMutation({
    mutationFn: () =>
      customFetch
        .post(`/reports/${id}`, {
          message: ReportRef.current.value,
          isSetIssue: true,
        })
        .then((res) => res.data),
    onSuccess: (data) => {
      navigate("/tasksPage");

      toast.success(data.message);
    },
    onError: (error) => {
      navigate("/tasksPage");

      toast.error(error?.response?.data?.message);
    },
  });

  return (
    <div className="modal  ">
      <div onClick={togglePopup} className="overlay "></div>
      <div className="modal-content flex flex-col items-center rounded-[10px]">
        {/* Alert icon */}
        <RiErrorWarningLine className="text-secondaryColor text-9xl " />
        {dayDifferencTask ? (
          <>
            <p className="mt-8">Are you sure you want to cancel the task?</p>
            {/* Close icon */}
            <button className="close-modal" onClick={togglePopup}>
              <IoMdClose />
            </button>
            <div className="flex w-[25vw] gap-3.5 mt-14 mb-6 ">
              {/* Cancel modification button */}
              <Button
                onClick={() => togglePopup()}
                className="bg-softwhite border p-2 rounded-[10px] w-full"
                text={"Cancel"}
              />
              {/* Submit confirmation button */}
              <button
                onClick={() => NoReason.mutate()}
                className="bg-secondaryColor text-white p-2 rounded-[10px] w-full text-center"
              >
                Confirm
              </button>
            </div>
          </>
        ) : status === "Arrived" ? (
          <>
            <p className="mt-8">
              Please tell us the reason why you want to cancel the task.
            </p>
            {/* Close icon */}
            <button className="close-modal" onClick={togglePopup}>
              <IoMdClose />
            </button>
            <div className="flex w-[25vw] gap-3.5 mt-14 mb-6 ">
              {/* Cancel modification button */}
              {/* <Button
                onClick={() => NoReason.mutate()}
                className="bg-softwhite border p-2 rounded-[10px] w-full"
                text={"No Issue"}
              /> */}
              {/* Submit confirmation button */}
              <Link
                to={`/reportTask/${idTask}`}
                className="bg-secondaryColor text-white p-2 rounded-[10px] w-full text-center"
              >
                Please provide a reason for task cancellation{" "}
              </Link>
            </div>
          </>
        ) : (
          <>
            <p className="mt-8 text-center">
              You cannot cancel the task because less than one day remains
              before it starts.
            </p>
            <div className="flex w-[25vw] gap-3.5 mt-14 mb-6 ">
              {/* Cancel modification button */}
              <Button
                onClick={() => togglePopup()}
                className="bg-softwhite border p-2 rounded-[10px] w-full"
                text={"Cancel"}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PopupReport;
