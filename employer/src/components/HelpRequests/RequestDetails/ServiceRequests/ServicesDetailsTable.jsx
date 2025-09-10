import React, { useState } from "react";

import TasksRequest from "./TasksRequest/TasksRequest";
const ServicesDetailsTable = ({ data, title }) => {
  const [isServiceDetailsCollapsed, setIsServiceDetailsCollapsed] = useState(true);

  return (
    <div>
      {/* Collapsible Service Details Section */}
      <div className="mb-6">
        {/* Header with Toggle Button */}
        <div
          className="bg-white border border-gray-200 rounded-t-md p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
          onClick={() => setIsServiceDetailsCollapsed(!isServiceDetailsCollapsed)}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-[#0F1A43]">
              Service Details
            </h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                {isServiceDetailsCollapsed ? 'Show Details' : 'Hide Details'}
              </span>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isServiceDetailsCollapsed ? 'rotate-180' : ''
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Collapsible Content */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${isServiceDetailsCollapsed ? 'max-h-0' : 'max-h-[1000px]'
            }`}
        >
          <div className="rounded-b-md overflow-hidden text-[#0F1A43] border-l border-r border-b border-gray-200">
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
        </div>
      </div>

      <TasksRequest data={data?.tasks} />
    </div>
  );
};

export default ServicesDetailsTable;
