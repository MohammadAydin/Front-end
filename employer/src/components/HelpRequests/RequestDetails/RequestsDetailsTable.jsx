import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaAlignLeft,
} from "react-icons/fa";
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

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded-md mb-2"></div>
          <div className="h-36 bg-gray-100 rounded-md"></div>
        </div>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded-md w-40 mb-2"></div>
          <div className="h-24 bg-gray-100 rounded-md"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-md border border-red-200 bg-red-50 text-red-700">
        Failed to load job posting details.
      </div>
    );
  }

  if (!JopPostingDetails?.data) {
    return (
      <div className="p-4 rounded-md border border-gray-200 bg-white text-gray-700">
        No details found for this job posting.
      </div>
    );
  }
  const job = JopPostingDetails?.data?.job_posting;
  const loc = JopPostingDetails?.data?.location;

  return (
    <div>
      {/* Hero Summary Header */}
      <div className="mb-6 rounded-xl bg-gradient-to-r from-[#0F1A43] to-[#2A3B8F] p-6 text-white shadow">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">{job?.title}</h2>
            <p className="mt-1 text-white/80">Job Posting • #{job?.id || id}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm">
              <FaMapMarkerAlt />
              <span>
                {loc?.city}, {loc?.country}
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm">
              <FaCalendarAlt />
              <span>
                {job?.date_from
                  ? new Date(job?.date_from).toLocaleDateString("en-GB")
                  : "-"}{" "}
                →{" "}
                {job?.date_to
                  ? new Date(job?.date_to).toLocaleDateString("en-GB")
                  : "-"}
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm">
              <FaUsers />
              <span>{job?.employees_required} helpers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Collapsible Job Posting Details Section */}
      <div className="mb-6">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <FaUsers />
            </div>
            <div>
              <p className="text-sm text-gray-500">Helpers Needed</p>
              <p className="text-base font-semibold text-gray-900">
                {job?.employees_required}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
              <FaCalendarAlt />
            </div>
            <div>
              <p className="text-sm text-gray-500">From</p>
              <p className="text-base font-semibold text-gray-900">
                {job?.date_from
                  ? new Date(job?.date_from).toLocaleDateString("en-GB")
                  : "-"}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FaCalendarAlt />
            </div>
            <div>
              <p className="text-sm text-gray-500">To</p>
              <p className="text-base font-semibold text-gray-900">
                {job?.date_to
                  ? new Date(job?.date_to).toLocaleDateString("en-GB")
                  : "-"}
              </p>
            </div>
          </div>
        </div>
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
                {isJobDetailsCollapsed ? "Show Details" : "Hide Details"}
              </span>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  isJobDetailsCollapsed ? "rotate-180" : ""
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
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isJobDetailsCollapsed ? "max-h-0" : "max-h-[1000px]"
          }`}
        >
          <div className="rounded-b-md overflow-hidden border-l border-r border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white">
              {/* Title */}
              <div className="flex items-start gap-3 p-4 rounded-lg border border-gray-200">
                <div className="h-10 w-10 shrink-0 rounded-full bg-gray-50 text-gray-700 flex items-center justify-center font-bold">
                  T
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Job Posting Title
                  </p>
                  <p className="mt-1 text-base font-semibold text-gray-900">
                    {job?.title}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3 p-4 rounded-lg border border-gray-200">
                <div className="h-10 w-10 shrink-0 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Location
                  </p>
                  <p className="mt-1 text-base font-semibold text-gray-900">
                    {loc?.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    {loc?.city}, {loc?.country}
                  </p>
                </div>
              </div>

              {/* Dates */}
              <div className="flex items-start gap-3 p-4 rounded-lg border border-gray-200">
                <div className="h-10 w-10 shrink-0 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                  <FaCalendarAlt />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Dates
                  </p>
                  <p className="mt-1 text-base font-semibold text-gray-900">
                    {job?.date_from
                      ? new Date(job?.date_from).toLocaleDateString("en-GB")
                      : "-"}{" "}
                    →{" "}
                    {job?.date_to
                      ? new Date(job?.date_to).toLocaleDateString("en-GB")
                      : "-"}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="p-4 bg-[#F9FAFB] border-t border-gray-200">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 shrink-0 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center">
                  <FaAlignLeft />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                    Job Posting Description
                  </p>
                  <p className="text-gray-800 leading-relaxed">
                    {job?.description || "No description provided."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ServiceRequests
        data={JopPostingDetails?.data?.service_requests}
        title={JopPostingDetails?.data?.job_posting?.title}
        idJopPosting={id}
      />
    </div>
  );
};

export default RequestsDetailsTable;
