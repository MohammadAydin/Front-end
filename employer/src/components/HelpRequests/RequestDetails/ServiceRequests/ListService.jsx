import { useState } from "react";
import { IoEyeOutline, IoEyeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaUserCheck } from "react-icons/fa";

const ListService = ({ id, date, status, navigateTo, employeeNum }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const getStatusBadge = (status) => {
    const map = {
      pending: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", text: "Pending" },
      cancel: { color: "bg-red-100 text-red-800 border-red-200", text: "Cancelled" },
      taken: { color: "bg-blue-100 text-blue-800 border-blue-200", text: "Taken" },
      done: { color: "bg-green-100 text-green-800 border-green-200", text: "Completed" },
      progress: { color: "bg-purple-100 text-purple-800 border-purple-200", text: "In Progress" },
    };
    return map[status] || { color: "bg-gray-100 text-gray-800 border-gray-200", text: status || "Unknown" };
  };
  const badge = getStatusBadge(status);

  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 mb-3 cursor-pointer"
      onClick={() => navigate(navigateTo)}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {id && (
            <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">#{id}</div>
          )}
          <div className="flex items-center text-sm text-gray-700">
            <FaCalendarAlt className="text-gray-500 mr-2" />
            {new Date(date).toLocaleDateString("en-GB")}
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <FaUserCheck className="text-gray-500 mr-2" />
            {employeeNum} assigned
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${badge.color}`}>
          {badge.text}
        </div>
      </div>
      <div className="px-4 pb-4 pt-0 flex items-center justify-end">
        <button
          onClick={(e) => { e.stopPropagation(); navigate(navigateTo); }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="text-[#F47621] hover:text-[#E55A1A] transition-colors"
        >
          {isHovered ? <IoEyeSharp size={18} /> : <IoEyeOutline size={18} />}
        </button>
      </div>
    </div>
  );
};

export default ListService;
