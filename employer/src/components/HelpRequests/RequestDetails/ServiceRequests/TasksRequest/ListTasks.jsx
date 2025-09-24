import { useEffect, useState } from "react";
import { IoEyeOutline, IoEyeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import getLocationName from "../../../../../utils/locationMap";
import useRequestsStore from "../../../../../store/HelpRequestsStore";
import { BiQrScan } from "react-icons/bi";
import AccessCode from "../../AccessCode";
import useData from "../../../../../hooks/useData";
import customFetch from "../../../../../utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import visualphoto from "../../../../../assets/image/Img_Avatar.25.svg";
import {
  MdLocationOn,
  MdAccessTime,
  MdPerson,
  MdCalendarToday,
  MdCheckCircle,
  MdPending,
  MdCancel,
  MdPlayArrow,
  MdFlag,
  MdDelete,
} from "react-icons/md";
import { toast } from "react-toastify";
import PopupReport from "./PopupReport";
import PopupConfirmCancel from "./PopupConfirmCancel";

const ListTasks = ({
  id,
  status,
  start_at,
  end_at,
  rate,
  location,
  navigateTo,
  created_at,
  assigned_to,
  idJopPosting,
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [lcoationfun, setLocationFun] = useState();
  const [photoEmployee, setPhotoEmployee] = useState(visualphoto);
  const [canDelete, setCanDelete] = useState(true);
  const [isPopupReport, setPopupReport] = useState(false);
  const [isConfirmCancel, setConfirmCancel] = useState(false);
  const ReportTask = () => {
    navigate(`/reportTask/${id}`);
  };
  const togglePopup = () => {
    setPopupReport(!isPopupReport);
  };
  const toggleConfirmCancel = () => {
    setConfirmCancel(!isConfirmCancel);
  };

  const handleTaskCancel = () => {
    if (status === "progress") {
      setConfirmCancel(true);
    } else if (status === "todo" || status === "OntheWay" || status === "Arrived") {
      setConfirmCancel(true);
    } else {
      setPopupReport(true);
    }
  };

  const handleConfirmedCancel = () => {
    if (status === "progress") {
      navigate(`/reportTask/${id}`);
    } else if (status === "todo" || status === "OntheWay" || status === "Arrived") {
      DeleteTask.mutate();
    }
  };
  useEffect(() => {
    if (status === "done" || status === "Canceled" || status === "review") {
      setCanDelete(false);
    } else {
      setCanDelete(true);
    }
  }, [status]);

  const { mutate: getPhotoEmployee } = useMutation({
    mutationFn: () =>
      customFetch.get(`/photo/${assigned_to}`).then((res) => res.data),

    onSuccess: (data) => {
      setPhotoEmployee(data?.data?.photo);
    },

    onError: (error) => {},
  });

  useEffect(() => {
    if (assigned_to) {
      getPhotoEmployee();
    }
  }, [assigned_to]);

  const { showCode, selectedTaskId, QrCodeOpen, PinCodeOpen } =
    useRequestsStore();

  useEffect(() => {
    if (showCode) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    // Cleanup function to ensure styles are reset
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [showCode]);

  useEffect(() => {
    getLocationName(location?.latitude, location?.longitude)
      .then((name) => setLocationFun(name))
      .catch((err) => console.error(err));
  }, []);
  const queryClient = useQueryClient();
  const DeleteTask = useMutation({
    mutationFn: () =>
      customFetch.delete(`/cancel/task/${id}`).then((res) => res.data),

    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries([`/employerJobPosting/${idJopPosting}`]);
      navigate(-1);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });
  const getStatusIcon = (status) => {
    switch (status) {
      case "done":
        return <MdCheckCircle className="text-green-500" />;
      case "Canceled":
        return <MdCancel className="text-red-500" />;
      case "todo":
        return <MdPending className="text-yellow-500" />;
      case "review":
        return <MdFlag className="text-blue-500" />;
      case "progress":
        return <MdPlayArrow className="text-blue-500" />;
      case "Arrived":
        return <MdLocationOn className="text-green-500" />;
      case "OntheWay":
        return <MdPlayArrow className="text-orange-500" />;
      default:
        return <MdPending className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "done":
        return "bg-green-100 text-green-800 border-green-200";
      case "Canceled":
        return "bg-red-100 text-red-800 border-red-200";
      case "todo":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "review":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Arrived":
        return "bg-green-100 text-green-800 border-green-200";
      case "OntheWay":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden">
        {/* Header with Task ID and Actions */}
        <div className="bg-gray-50 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <div className="bg-blue-600 text-white px-2 sm:px-3 py-1 rounded-lg font-semibold text-xs sm:text-sm">
                #{id}
              </div>
              <div
                className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 rounded-full border text-xs sm:text-sm font-medium ${getStatusColor(
                  status
                )}`}
              >
                {getStatusIcon(status)}
                <span className="capitalize">{status}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full lg:w-auto">
              {canDelete && (
                <MdDelete
                  onClick={handleTaskCancel}
                  className="text-2xl sm:text-3xl text-red-500 hover:text-red-600 cursor-pointer transition-colors duration-200 p-1 sm:p-0"
                  title="Delete Task"
                />
              )}

              <button
                onClick={() => QrCodeOpen(id)}
                className="flex items-center justify-center gap-1.5 sm:gap-2 bg-orange-500 hover:bg-orange-600 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-colors duration-200 text-xs sm:text-sm md:text-base flex-1 sm:flex-none min-h-[40px] sm:min-h-[44px]"
              >
                <BiQrScan size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="hidden xs:inline">QR Code</span>
                <span className="xs:hidden">Show QR Code</span>
              </button>
              <button
                onClick={() => PinCodeOpen(id)}
                className="flex items-center justify-center gap-1.5 sm:gap-2 text-gray-600 hover:text-gray-800 font-medium px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-xs sm:text-sm md:text-base border border-gray-300 hover:border-gray-400 flex-1 sm:flex-none min-h-[40px] sm:min-h-[44px]"
              >
                <span className="hidden xs:inline">Pin Code</span>
                <span className="xs:hidden">Show Pin Code</span>
              </button>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="p-3 sm:p-4 lg:p-6">
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 lg:gap-6">
            {/* Employee Photo */}
            <div className="flex-shrink-0 mx-auto sm:mx-0">
              <img
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-gray-200"
                src={photoEmployee}
                alt="Employee"
              />
            </div>

            {/* Task Details */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 w-full">
              {/* Time Information */}
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                  <MdAccessTime className="text-gray-500 text-lg sm:text-xl flex-shrink-0 mt-0.5 sm:mt-0" />
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm text-gray-600">Start Time</p>
                    <p className="font-medium text-gray-900 break-words text-sm sm:text-base">
                      {start_at
                        ? start_at.replace("T", " ").split(".")[0]
                        : "Not started yet"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                  <MdAccessTime className="text-gray-500 text-lg sm:text-xl flex-shrink-0 mt-0.5 sm:mt-0" />
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm text-gray-600">End Time</p>
                    <p className="font-medium text-gray-900 break-words text-sm sm:text-base">
                      {end_at
                        ? end_at.replace("T", " ").split(".")[0]
                        : "Not ended yet"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Location and Date Information */}
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                  <MdLocationOn className="text-gray-500 text-lg sm:text-xl flex-shrink-0 mt-0.5 sm:mt-0" />
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm text-gray-600">Location</p>
                    <p className="font-medium text-gray-900 break-words text-sm sm:text-base">
                      {lcoationfun || "Location not available"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                  <MdCalendarToday className="text-gray-500 text-lg sm:text-xl flex-shrink-0 mt-0.5 sm:mt-0" />
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm text-gray-600">Created</p>
                    <p className="font-medium text-gray-900 break-words text-sm sm:text-base">
                      {new Date(created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showCode && selectedTaskId === id && (
          <AccessCode id={id} taskstatus={status} />
        )}{" "}
        {isPopupReport && (
          <PopupReport
            title={"Please tell us the reason for canceling the tas"}
            togglePopup={togglePopup}
            onConfirm={ReportTask}
          />
        )}
        {isConfirmCancel && (
          <PopupConfirmCancel
            title={
              status === "progress" 
                ? "This task is in progress. To cancel it, you need to provide a reason by submitting a report. Do you want to proceed?"
                : "Are you sure you want to cancel this task? This action cannot be undone. If you cancel, a financial penalty of 50 euros will be imposed."
            }
            togglePopup={toggleConfirmCancel}
            onConfirm={handleConfirmedCancel}
            isProgress={status === "progress"}
          />
        )}
      </div>
    </>
  );
};

export default ListTasks;
