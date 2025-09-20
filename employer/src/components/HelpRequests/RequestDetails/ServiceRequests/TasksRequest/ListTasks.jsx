import { useEffect, useState } from "react";
import { IoEyeOutline, IoEyeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import getLocationName from "../../../../../utils/locationMap";
import useRequestsStore from "../../../../../store/HelpRequestsStore";
import { BiQrScan } from "react-icons/bi";
import AccessCode from "../../AccessCode";
import useData from "../../../../../hooks/useData";
import customFetch from "../../../../../utils/axios";
import { useMutation } from "@tanstack/react-query";
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
} from "react-icons/md";

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
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [lcoationfun, setLocationFun] = useState();
  const [photoEmployee, setPhotoEmployee] = useState(visualphoto);

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

  const { showCode, QrCodeOpen, PinCodeOpen } = useRequestsStore();

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
        <div className="bg-gray-50 px-4 sm:px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white px-3 py-1 rounded-lg font-semibold text-sm">
                #{id}
              </div>
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(
                  status
                )}`}
              >
                {getStatusIcon(status)}
                <span className="capitalize">{status}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full lg:w-auto">
              <button
                onClick={QrCodeOpen}
                className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base flex-1 sm:flex-none min-h-[44px]"
              >
                <BiQrScan size={18} />
                <span className="hidden xs:inline">QR Code</span>
                <span className="xs:hidden">QR</span>
              </button>
              <button
                onClick={PinCodeOpen}
                className="flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 font-medium px-4 py-2.5 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-sm sm:text-base border border-gray-300 hover:border-gray-400 flex-1 sm:flex-none min-h-[44px]"
              >
                <span className="hidden xs:inline">Pin Code</span>
                <span className="xs:hidden">Pin</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
            {/* Employee Photo */}
            <div className="flex-shrink-0 mx-auto sm:mx-0">
              <img
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                src={photoEmployee}
                alt="Employee"
              />
            </div>

            {/* Task Details */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
              {/* Time Information */}
              <div className="space-y-3">
                <div className="flex items-start sm:items-center gap-3">
                  <MdAccessTime className="text-gray-500 text-xl flex-shrink-0 mt-0.5 sm:mt-0" />
                  <div className="min-w-0">
                    <p className="text-sm text-gray-600">Start Time</p>
                    <p className="font-medium text-gray-900 break-words">
                      {start_at
                        ? start_at.replace("T", " ").split(".")[0]
                        : "Not started yet"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start sm:items-center gap-3">
                  <MdAccessTime className="text-gray-500 text-xl flex-shrink-0 mt-0.5 sm:mt-0" />
                  <div className="min-w-0">
                    <p className="text-sm text-gray-600">End Time</p>
                    <p className="font-medium text-gray-900 break-words">
                      {end_at
                        ? end_at.replace("T", " ").split(".")[0]
                        : "Not ended yet"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Location and Date Information */}
              <div className="space-y-3">
                <div className="flex items-start sm:items-center gap-3">
                  <MdLocationOn className="text-gray-500 text-xl flex-shrink-0 mt-0.5 sm:mt-0" />
                  <div className="min-w-0">
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-medium text-gray-900 break-words">
                      {lcoationfun || "Location not available"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start sm:items-center gap-3">
                  <MdCalendarToday className="text-gray-500 text-xl flex-shrink-0 mt-0.5 sm:mt-0" />
                  <div className="min-w-0">
                    <p className="text-sm text-gray-600">Created</p>
                    <p className="font-medium text-gray-900 break-words">
                      {new Date(created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showCode && <AccessCode id={id} taskstatus={status} />}
    </>
  );
};

export default ListTasks;
