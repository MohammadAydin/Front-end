import { useState } from "react";
import { IoEyeOutline, IoEyeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { 
  FaCalendarAlt, 
  FaUserCheck, 
  FaClock, 
  FaPlay, 
  FaCheck, 
  FaTimes, 
  FaArrowRight, 
  FaCircle, 
  FaQuestion, 
  FaPlus,
  FaSearch
} from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../../../utils/axios";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import PopupWarningTask from "../../../MoreElements/Popup/PopupWarningTask";

const ListService = ({
  id,
  date,
  status,
  navigateTo,
  employeeNum,
  employeesRequired,
  canCancel,
  idJopPosting,
  tasks = [], // إضافة المهام لمعرفة حالة كل موظف
}) => {
  // Debug: Log the data to see what we're getting
  console.log(`Service ${id}: employeesRequired=${employeesRequired}, employeeNum=${employeeNum}`);
  console.log('Full service data:', { id, date, status, employeeNum, employeesRequired, tasks });
  
  // دالة للحصول على حالة التاسك لكل slot
  const getSlotStatus = (slotIndex) => {
    console.log(`Checking slot ${slotIndex} for service ${id}`);
    console.log('Available tasks:', tasks);
    
    // محاولة العثور على المهمة بطريقتين
    const task = tasks.find(t => t.slot_index === slotIndex) || 
                 tasks.find(t => t.id && slotIndex < employeeNum) ||
                 tasks[slotIndex]; // استخدام الفهرس كبديل
    
    console.log(`Task found for slot ${slotIndex}:`, task);
    
    if (!task) return null;
    
    switch (task.status) {
      case 'todo':
        return { icon: FaClock, color: 'bg-yellow-100 border-yellow-300 text-yellow-700', text: 'Assigned' };
      case 'progress':
        return { icon: FaPlay, color: 'bg-blue-100 border-blue-300 text-blue-700', text: 'In Progress' };
      case 'done':
        return { icon: FaCheck, color: 'bg-green-100 border-green-300 text-green-700', text: 'Completed' };
      case 'review':
        return { icon: FaSearch, color: 'bg-indigo-100 border-indigo-300 text-indigo-700', text: 'Under Review' };
      case 'Canceled':
        return { icon: FaTimes, color: 'bg-red-100 border-red-300 text-red-700', text: 'Cancelled' };
      case 'OntheWay':
        return { icon: FaArrowRight, color: 'bg-orange-100 border-orange-300 text-orange-700', text: 'On The Way' };
      case 'Arrived':
        return { icon: FaCircle, color: 'bg-emerald-100 border-emerald-300 text-emerald-700', text: 'Arrived' };
      default:
        return { icon: FaQuestion, color: 'bg-purple-100 border-purple-300 text-purple-700', text: 'Pending' };
    }
  };
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [ShowPopup, setShowPopup] = useState(false);
  const togglePupup = () => {
    setShowPopup(!ShowPopup);
  };
  const queryClient = useQueryClient();

  const DeleteService = useMutation({
    mutationFn: () =>
      customFetch.delete(`/service-request/${id}`).then((res) => res.data),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries([`/employerJobPosting/${id}`]);
    },
    onError: (error) => {
      queryClient.invalidateQueries([`/employerJobPosting/${id}`]);

      toast.error(error?.response?.data?.message);
    },
  });
  const getStatusBadge = (status) => {
    const map = {
      pending: {
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        text: "Pending",
      },
      cancel: {
        color: "bg-red-100 text-red-800 border-red-200",
        text: "Cancelled",
      },
      taken: {
        color: "bg-blue-100 text-blue-800 border-blue-200",
        text: "Taken",
      },
      done: {
        color: "bg-green-100 text-green-800 border-green-200",
        text: "Completed",
      },
      progress: {
        color: "bg-purple-100 text-purple-800 border-purple-200",
        text: "In Progress",
      },
    };
    return (
      map[status] || {
        color: "bg-gray-100 text-gray-800 border-gray-200",
        text: status || "Unknown",
      }
    );
  };
  const badge = getStatusBadge(status);

  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 mb-3 cursor-pointer"
      // onClick={() => navigate(navigateTo)}
    >
      <div className="p-4">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            {id && (
              <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                #{id}
              </div>
            )}
            <div className="flex items-center text-sm text-gray-700">
              <FaCalendarAlt className="text-gray-500 mr-2" />
              <span className="font-medium">
                {new Date(date).toLocaleDateString("en-GB", {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium border ${badge.color}`}
          >
            {badge.text}
          </div>
        </div>

        {/* Employee Slots Preview */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-gray-700">Employee Slots</h4>
            <span className="text-xs text-gray-500">
              {employeeNum} assigned
            </span>
          </div>
          
          {/* Slot Indicators */}
          <div className="flex gap-2 flex-wrap">
            {Array.from({ length: employeesRequired || 1 }, (_, index) => {
              const slotStatus = getSlotStatus(index);
              const hasEmployee = index < employeeNum;
              
              return (
                <div key={index} className="flex flex-col items-center gap-1">
                  <div
                    className={`
                      w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-200
                      ${slotStatus 
                        ? slotStatus.color 
                        : hasEmployee
                          ? 'bg-green-100 border-green-300 text-green-700'
                          : 'bg-gray-50 border-dashed border-gray-300 text-gray-400'
                      }
                    `}
                    title={slotStatus ? slotStatus.text : hasEmployee ? 'Employee assigned' : 'Available slot'}
                  >
                    {slotStatus ? (
                      <slotStatus.icon className="w-3 h-3" />
                    ) : hasEmployee ? (
                      <FaCheck className="w-3 h-3" />
                    ) : (
                      <FaPlus className="w-3 h-3" />
                    )}
                  </div>
                  <span className={`text-xs font-medium ${
                    slotStatus 
                      ? slotStatus.color.replace('bg-', 'text-').replace('-100', '-700')
                      : hasEmployee
                        ? 'text-green-600'
                        : 'text-gray-400'
                  }`}>
                    {slotStatus ? slotStatus.text : hasEmployee ? 'Assigned' : 'Available'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions Row */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">
              {employeeNum === 0 ? `No employees assigned yet (${employeesRequired || 1} needed)` : 
               employeeNum === 1 ? `1 employee assigned (${employeesRequired || 1} needed)` : 
               `${employeeNum} employees assigned (${employeesRequired || 1} needed)`}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {/* delete button */}
            <MdDelete
              className={`${
                canCancel ? "text-red-400 hover:text-red-600" : "text-gray-300"
              } text-xl cursor-pointer transition-colors`}
              onClick={() => DeleteService.mutate()}
              title={canCancel ? "Delete service request" : "Cannot delete - has assigned employees"}
            />
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(navigateTo);
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="text-[#F47621] hover:text-[#E55A1A] transition-colors p-1"
              title="View details"
            >
              {isHovered ? <IoEyeSharp size={18} /> : <IoEyeOutline size={18} />}
            </button>
          </div>
        </div>
      </div>
      
      {ShowPopup && (
        <PopupWarningTask
          togglePopup={togglePupup}
          onConfirm={() => DeleteService.mutate()}
        />
      )}
    </div>
  );
};

export default ListService;
