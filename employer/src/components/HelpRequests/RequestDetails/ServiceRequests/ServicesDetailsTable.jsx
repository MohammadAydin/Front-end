import React from "react";

import TasksRequest from "./TasksRequest/TasksRequest";
const ServicesDetailsTable = ({ data, title }) => {
  return (
    <div>
      <div className=" rounded-md overflow-hidden text-[#0F1A43]">
        {/* title*/}
        <div className="TableField bg-white p-2 flex">
          <span className="font-bold min-w-48"> Jop :</span>
          <span>{title}</span>
        </div>
        {/* date services*/}
        <div className="TableField p-2 flex rounded-lg bg-[#EFEFF7]">
          <span className="font-bold w-48">start at : </span>
          <span>{new Date(data?.date).toLocaleDateString("en-GB")}</span>
        </div>

        {/* status Details */}
        <div className="TableField bg-white p-2 flex">
          <span className="font-bold min-w-48">status </span>
          <span>{data?.status}</span>
        </div>
      </div>
      <TasksRequest data={data?.tasks} />
    </div>
  );
};

export default ServicesDetailsTable;
