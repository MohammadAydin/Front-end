import React, { useState } from "react";
import helpRequestDetails from "./helpIndex";
import useData from "../../../hooks/useData";
import ServiceRequests from "./ServiceRequests/ServiceRequests";
const RequestsDetailsTable = ({ id }) => {
  const [isJobDetailsCollapsed, setIsJobDetailsCollapsed] = useState(true);

  const {
    data: JopPostingDetails,
    error,
    isLoading,
  } = useData(`/employerJobPosting/${id}`);
  return (
    <div>
      {/* Collapsible Job Posting Details Section */}
      <div className="mb-6">
        {/* Header with Toggle Button */}
        <div
          className="bg-white border border-gray-200 rounded-t-md p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
          onClick={() => setIsJobDetailsCollapsed(!isJobDetailsCollapsed)}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-[#0F1A43]">
              Job Posting Details
            </h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                {isJobDetailsCollapsed ? 'Show Details' : 'Hide Details'}
              </span>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isJobDetailsCollapsed ? 'rotate-180' : ''
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
          className={`overflow-hidden transition-all duration-300 ease-in-out ${isJobDetailsCollapsed ? 'max-h-0' : 'max-h-[1000px]'
            }`}
        >
          <div className="rounded-b-md overflow-hidden text-[#0F1A43] border-l border-r border-b border-gray-200">
            {/* title*/}
            <div className="TableField bg-white p-2 flex">
              <span className="font-bold min-w-48"> Jop Posting title</span>
              <span>{JopPostingDetails?.data?.job_posting?.title},</span>
            </div>
            {/* Helpers Number */}
            <div className="TableField p-2 flex rounded-lg bg-[#EFEFF7]">
              <span className="font-bold w-48">Helpers Number</span>
              <span>
                {JopPostingDetails?.data?.job_posting?.employees_required} Helpers
              </span>
            </div>

            {/* Location Details */}
            <div className="TableField bg-white p-2 flex">
              <span className="font-bold min-w-48">Locatoion Details</span>
              <span>
                {JopPostingDetails?.data?.location?.country},
                {JopPostingDetails?.data?.location?.city},
                {JopPostingDetails?.data?.location?.title}
              </span>
            </div>

            {/* Dates */}
            <div className="TableField p-2 flex rounded-lg bg-[#EFEFF7]">
              <span className="font-bold w-48">Date From</span>
              <span>
                {new Date(
                  JopPostingDetails?.data?.job_posting?.date_from
                ).toLocaleDateString("en-GB")}
              </span>
            </div>
            <div className="TableField bg-white p-2 flex">
              <span className="font-bold w-48">Date To</span>
              <span>
                {new Date(
                  JopPostingDetails?.data?.job_posting?.date_to
                ).toLocaleDateString("en-GB")}
              </span>
            </div>

            {/* Days Schedule */}
            <div className="TableField p-2 flex rounded-lg bg-[#EFEFF7]">
              <span className="font-bold block mb-2 w-46">
                Jop Posting Description
              </span>
              <p>{JopPostingDetails?.data?.job_posting?.description}</p>
            </div>
          </div>
        </div>
      </div>

      <ServiceRequests data={JopPostingDetails?.data?.service_requests} title={JopPostingDetails?.data?.job_posting?.title} />
    </div>
  );
};

export default RequestsDetailsTable;
