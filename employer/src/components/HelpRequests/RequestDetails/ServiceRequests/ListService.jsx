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
import { RiErrorWarningLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { FaMoneyBillWave, FaCheckCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
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
  tasks = [], 
}) => {
  const { t } = useTranslation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const getSlotStatus = (slotIndex) => {
    const task = tasks.find(t => t.slot_index === slotIndex) || 
                 tasks.find(t => t.id && slotIndex < employeeNum) ||
                 tasks[slotIndex]; 
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
      setShowDeleteModal(false);
      queryClient.invalidateQueries([`/employerJobPosting/${id}`]);
    },
    onError: (error) => {
      queryClient.invalidateQueries([`/employerJobPosting/${id}`]);
      toast.error(error?.response?.data?.message);
    },
  });

  const handleDeleteClick = () => {
    if (canCancel) {
      setShowDeleteModal(true);
    } else {
      toast.warning(t('deleteService.cannotDelete') || "Cannot delete this service request");
    }
  };

  const handleConfirmDelete = () => {
    DeleteService.mutate();
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };
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
              const isAvailable = !slotStatus && !hasEmployee;
              const isClickable = !isAvailable;
              
              return (
                <div
                  key={index}
                  className={`
                    px-3 py-2 rounded-lg border-2 flex items-center gap-2 text-xs font-medium min-w-[100px] justify-center
                    ${slotStatus 
                      ? `${slotStatus.color} ${isClickable ? 'cursor-pointer' : ''}`
                      : hasEmployee
                        ? `bg-green-100 border-green-300 text-green-700 ${isClickable ? 'cursor-pointer' : ''}`
                        : 'bg-gray-50 border-dashed border-gray-300 text-gray-400 cursor-default'
                    }
                  `}
                  title={slotStatus ? slotStatus.text : hasEmployee ? 'Employee assigned' : 'Available slot'}
                  onClick={isClickable ? () => {
                    navigate(navigateTo);
                  } : undefined}
                >
                  {slotStatus ? (
                    <>
                      <slotStatus.icon className="w-3 h-3" />
                      <span>{slotStatus.text}</span>
                    </>
                  ) : hasEmployee ? (
                    <>
                      <FaCheck className="w-3 h-3" />
                      <span>Assigned</span>
                    </>
                  ) : (
                    <>
                      <FaPlus className="w-3 h-3" />
                      <span>Available</span>
                    </>
                  )}
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
            {/* delete button - hide for expired or cancel_without_repost status */}
            {status !== "expired" && status !== "cancel_without_repost" && (
              <MdDelete
                className={`${
                  canCancel 
                    ? "text-red-400 hover:text-red-600 hover:scale-110" 
                    : "text-gray-400 hover:text-gray-600 hover:scale-110 cursor-not-allowed"
                } text-xl cursor-pointer transition-all duration-200`}
                onClick={handleDeleteClick}
                title={canCancel ? "Delete service request" : "Cannot delete - has assigned employees"}
              />
            )}
            
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && canCancel && (
        <div className="modal">
          <div onClick={handleCancelDelete} className="overlay"></div>
          <div 
            className="modal-content flex flex-col items-center justify-center rounded-[10px] max-w-[90vw] sm:max-w-[500px]"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: '#ffffff',
              padding: '20px 24px',
              borderRadius: '10px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
            }}
          >
            {/* Warning icon - responsive sizing */}
            <RiErrorWarningLine className="text-[#F47621] text-6xl sm:text-8xl lg:text-9xl" />

            {/* Text content - responsive padding and font sizes */}
            <p className="mt-6 sm:mt-8 text-center px-2 sm:px-4 text-sm sm:text-base lg:text-lg leading-relaxed max-w-[90%] mx-auto">
              {t('deleteService.message')}
            </p>
            
            {/* Additional info about no charges with icon */}
            <div className="mt-6 flex items-center justify-center space-x-3">
              <div className="flex items-center space-x-2">
                <FaCheckCircle className="text-green-500 text-xl" />
                <FaMoneyBillWave className="text-gray-400 text-lg" />
              </div>
              <div className="text-center">
                <p className="text-gray-700 text-sm font-medium">
                  {t('deleteService.noCharge')}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  {t('deleteService.reason')}
                </p>
              </div>
            </div>
            
            {/* Close icon */}
            <button className="close-modal" onClick={handleCancelDelete}>
              <IoMdClose />
            </button>
            
            {/* Buttons container - responsive width and spacing */}
            <div className="flex flex-col sm:flex-row w-full max-w-[280px] sm:max-w-[400px] lg:max-w-[450px] gap-3 sm:gap-3.5 mt-8 sm:mt-12 lg:mt-14 mb-2 sm:mb-4">
              <button
                onClick={handleCancelDelete}
                className="bg-softwhite border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 p-3 sm:p-2 rounded-[10px] w-full text-sm sm:text-base font-medium transition-colors duration-200"
              >
                {t('deleteService.cancel')}
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={DeleteService.isPending}
                type="button"
                className="bg-[#F47621] hover:bg-[#E55A1A] text-white p-3 sm:p-2 rounded-[10px] w-full text-sm sm:text-base font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {DeleteService.isPending ? t('deleteService.deleting') : t('deleteService.delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListService;
