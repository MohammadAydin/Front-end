import React from "react";
import helpRequestDetails from "./helpIndex";
import useData from "../../../hooks/useData";
import ServiceRequests from "./ServiceRequests/ServiceRequests";
const RequestsDetailsTable = ({ id }) => {
  const {
    data: JopPostingDetails,
    error,
    isLoading,
  } = useData(`/employerJobPosting/${id}`);
  return (
    <div>
      <div className=" rounded-md overflow-hidden text-[#0F1A43]">
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
      <ServiceRequests data={JopPostingDetails?.data?.service_requests} title={JopPostingDetails?.data?.job_posting?.title} />
    </div>
  );
};

export default RequestsDetailsTable;
