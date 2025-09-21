import React, { useState } from "react";
import {
  MdExpandMore,
  MdExpandLess,
  MdWork,
  MdCalendarToday,
  MdFlag,
  MdInfo,
} from "react-icons/md";
import TasksRequest from "./TasksRequest/TasksRequest";
const ServicesDetailsTable = ({ data, title, idJopPosting }) => {
  console.log(data);
  const [isServiceDetailsCollapsed, setIsServiceDetailsCollapsed] =
    useState(true);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "done":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
      case "canceled":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
      case "todo":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "in_progress":
      case "progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "review":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Collapsible Service Details Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header with Toggle Button */}
        <div
          className="px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100"
          onClick={() =>
            setIsServiceDetailsCollapsed(!isServiceDetailsCollapsed)
          }
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MdInfo className="text-xl text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Service Details
                </h3>
                <p className="text-sm text-gray-500">
                  {isServiceDetailsCollapsed
                    ? "Click to view service information"
                    : "Click to hide service information"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 font-medium">
                {isServiceDetailsCollapsed ? "Show Details" : "Hide Details"}
              </span>
              <div className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200">
                {isServiceDetailsCollapsed ? (
                  <MdExpandMore className="w-5 h-5 text-gray-500" />
                ) : (
                  <MdExpandLess className="w-5 h-5 text-gray-500" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible Content */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isServiceDetailsCollapsed ? "max-h-0" : "max-h-[500px]"
          }`}
        >
          <div className="p-6 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Information */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <MdWork className="text-blue-500 text-xl" />
                  <h4 className="font-semibold text-gray-800">
                    Job Information
                  </h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600 font-medium">
                      Position:
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      {title || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Service Status */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <MdFlag className="text-green-500 text-xl" />
                  <h4 className="font-semibold text-gray-800">
                    Service Status
                  </h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600 font-medium">
                      Status:
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        data?.status
                      )}`}
                    >
                      {data?.status || "Unknown"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Service Date */}
              <div className="bg-white rounded-lg p-4 border border-gray-200 md:col-span-2">
                <div className="flex items-center gap-3 mb-3">
                  <MdCalendarToday className="text-purple-500 text-xl" />
                  <h4 className="font-semibold text-gray-800">
                    Service Schedule
                  </h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600 font-medium">
                      Start Date:
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      {data?.date
                        ? new Date(data.date).toLocaleDateString("en-GB", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "Not specified"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TasksRequest data={data?.tasks} idJopPosting={idJopPosting} />
    </div>
  );
};

export default ServicesDetailsTable;
