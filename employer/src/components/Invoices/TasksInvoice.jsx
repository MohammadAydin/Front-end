import React from "react";
import avatar from "../../assets/image/Img_Avatar.25.svg";
const TasksInvoice = ({ task }) => {
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

        {/* amount */}
        <div className="flex flex-col text-[0.8rem] text-gray-600 w-full lg:w-auto flex-1">
          <p>amount: {task?.amount}&euro;</p>
          <p>promoted amount: {task?.promoted_amount}&euro;</p>
          <p>total: {task?.total}&euro;</p>
        </div>

        {/* hours */}
        <p className="flex-1 text-[0.8rem] text-gray-600 w-full lg:w-auto">
          work hours: {task?.work_hours} h
        </p>

        {/* notes */}
        <p className="flex-1 text-[0.8rem] text-gray-600 w-full lg:w-auto">
          Notes: {task?.notes ? task?.notes : "not notes"}
        </p>
      </div>
    </div>
  );
};

export default TasksInvoice;
