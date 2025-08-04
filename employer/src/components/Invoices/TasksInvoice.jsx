import React, { useState } from "react";
import avatar from "../../assets/image/Img_Avatar.25.svg";
import { TfiArrowCircleDown } from "react-icons/tfi";
import { MdOutlineFileDownload } from "react-icons/md";
import useData from "../../hooks/useData";
import { BsEye } from "react-icons/bs";

const TasksInvoice = ({ task }) => {
  const [detailsTask, setDetailsTask] = useState(false);
  const {
    data: pdfDetails,
    errorpdf,
    isLoadnigpdf,
  } = useData(`/invoices/${task?.id}/download/details`);
  console.log(pdfDetails);
  console.log(task);
  return (
    <div className="mt-3.5 border-b border-dotted pb-3.5">
      <div className="w-full flex flex-wrap lg:flex-nowrap justify-between gap-4 items-center">
        {/* title */}
        <p className="text-[0.9rem] w-full lg:w-auto flex-1">{task?.title}</p>

        {/* employee */}
        <div className="text-[0.8rem] text-gray-600 flex items-center gap-4 w-full lg:w-auto flex-[1.5] max-[870px]:flex-col ">
          <img
            className="rounded-full w-10 h-10 "
            src={task?.employee?.photo || avatar}
            alt=""
          />
          <div>
            <p>name : {task?.employee?.name}</p>
            <p>occupation: {task?.employee?.occupation}</p>
          </div>
        </div>

        {/* hours */}
        <p className="flex-1 text-[0.8rem] text-gray-600 w-full lg:w-auto">
          work hours: {task?.work_hours} h
        </p>
        {/* download pdf */}
        <div className="invoicesDownload text-[25px] mb-[0.7px] text-3xl">
          <a href={pdfDetails?.data?.url} download>
            {" "}
            <BsEye  onClick="" className="click hover:text-secondaryColor" />
          </a>
        </div>

        {/* notes */}
        <div className="flex-1  text-[0.8rem] text-gray-600 w-full lg:w-auto">
          <TfiArrowCircleDown
            onClick={() => setDetailsTask(!detailsTask)}
            className="click text-2xl "
          />
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          detailsTask ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } mt-3 flex flex-col gap-4 justify-between text-[0.8rem]`}
      >
        <p>Notes: {task?.notes ? task?.notes : "not Any notes"}</p>
        <p className="flex">
          promotions : &nbsp;{" "}
          {task?.promotions?.map((item, index) => (
            <p key={index}>
              &nbsp;{item?.name}
              {index == task.promotions.length - 1 ? "" : ","}
            </p>
          ))}
        </p>
        {/* amount */}
        <div className="flex flex-col text-[0.8rem] text-gray-600 w-full lg:w-auto flex-1">
          <p>amount: {task?.amount}&euro;</p>
          <p>promoted amount: {task?.promoted_amount}&euro;</p>
          <p>total: {task?.total}&euro;</p>
        </div>
      </div>
    </div>
  );
};

export default TasksInvoice;
