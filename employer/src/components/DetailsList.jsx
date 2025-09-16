import { useState } from "react";
import avatar from "../assets/image/Img_Avatar.25.svg";
import { IoEyeOutline, IoEyeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useData from "../hooks/useData";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaBuilding,
  FaChevronRight,
} from "react-icons/fa";

const DetailsList = ({
  id,
  title,
  employees_required,
  created_at,
  country,
  city,
  index,
  avatarPhoto,
  name,
  email,
  date_from,
  date_to,
  orderDate,
  orderTime,
  specialist,
  address,
  PhoneNumber,
  price,
  total,
  // status,
  navigateTo,
  previousPage,
  shiftid,
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const {
    data: shfit,
    error,
    isLoadnig,
  } = useData(`/employer/shifts/${shiftid}`);

  // // Function to get status badge styling
  // const getStatusBadge = (status) => {
  //   const statusConfig = {
  //     taken: {
  //       color: "bg-blue-100 text-blue-800 border-blue-200",
  //       text: "Taken",
  //     },
  //     pending: {
  //       color: "bg-yellow-100 text-yellow-800 border-yellow-200",
  //       text: "Pending",
  //     },
  //     cancel: {
  //       color: "bg-red-100 text-red-800 border-red-200",
  //       text: "Cancelled",
  //     },
  //     todo: {
  //       color: "bg-gray-100 text-gray-800 border-gray-200",
  //       text: "To Do",
  //     },
  //     done: {
  //       color: "bg-green-100 text-green-800 border-green-200",
  //       text: "Completed",
  //     },
  //     progress: {
  //       color: "bg-purple-100 text-purple-800 border-purple-200",
  //       text: "In Progress",
  //     },
  //     review: {
  //       color: "bg-orange-100 text-orange-800 border-orange-200",
  //       text: "Under Review",
  //     },
  //     OntheWay: {
  //       color: "bg-indigo-100 text-indigo-800 border-indigo-200",
  //       text: "On The Way",
  //     },
  //     Arrived: {
  //       color: "bg-emerald-100 text-emerald-800 border-emerald-200",
  //       text: "Arrived",
  //     },
  //     Canceled: {
  //       color: "bg-red-100 text-red-800 border-red-200",
  //       text: "Canceled",
  //     },
  //   };

  //   return (
  //     statusConfig[status] || {
  //       color: "bg-gray-100 text-gray-800 border-gray-200",
  //       text: status || "Unknown",
  //     }
  //   );
  // };

  // const statusBadge = getStatusBadge(status);

  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 mb-4 overflow-hidden group cursor-pointer"
      onClick={() => navigate(navigateTo)}
    >
      <div className="p-6">
        {/* Header Row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            {index && (
              <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                #{id}
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-[#F47621] transition-colors">
                {title}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <FaBuilding className="mr-1" />
                  Job Posting
                </span>
                <span className="flex items-center">
                  <FaCalendarAlt className="mr-1" />
                  Created {new Date(created_at).toLocaleDateString("en-GB")}
                </span>
              </div>
            </div>
          </div>

          {/* Status Badge
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium border ${statusBadge.color}`}
          >
            {statusBadge.text}
          </div> */}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Workers Required */}
          <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
            <FaUsers className="text-blue-600 text-lg" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {employees_required}
              </p>
              <p className="text-xs text-gray-600">Workers Needed</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
            <FaMapMarkerAlt className="text-green-600 text-lg" />
            <div>
              <p className="text-sm font-medium text-gray-900">{city}</p>
              <p className="text-xs text-gray-600">{country}</p>
            </div>
          </div>

          {/* Date Range */}
          <div className="flex items-center space-x-2 p-3 bg-purple-50 rounded-lg">
            <FaCalendarAlt className="text-purple-600 text-lg" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {new Date(date_from).toLocaleDateString("en-GB")}
              </p>
              <p className="text-xs text-gray-600">
                to {new Date(date_to).toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>

          {/* Shift Information */}
          {shfit && (
            <div className="flex items-center space-x-2 p-3 bg-orange-50 rounded-lg">
              <FaClock className="text-orange-600 text-lg" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {shfit?.data?.name}
                </p>
                <p className="text-xs text-gray-600">
                  {shfit?.data?.start_time} - {shfit?.data?.end_time}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Action Button */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-500">Click to view details</div>
          <div className="flex items-center space-x-2 text-[#F47621] group-hover:text-[#E55A1A] transition-colors">
            <span className="text-sm font-medium">View Details</span>
            <FaChevronRight className="text-sm group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsList;
