import { useParams, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import useData from "../../hooks/useData";
import { useTranslation } from "react-i18next";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaBriefcase,
  FaArrowLeft,
  FaTasks,
  FaUser,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { BsQrCode } from "react-icons/bs";
import { MdPin } from "react-icons/md";
import CompletePersonalinfo from "../../components/MoreElements/CompletePersonalinfo";
import Spinner from "../../components/MoreElements/Spinner";
import AccessCode from "../../components/HelpRequests/RequestDetails/AccessCode";
import useRequestsStore from "../../store/HelpRequestsStore";

const ServiceRequestDetails = () => {
  const { jobId, serviceRequestId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedTaskStatus, setSelectedTaskStatus] = useState("all");
  
  // QR Code and PIN Code store
  const { showCode, QrCodeOpen, PinCodeOpen, selectedTaskId } = useRequestsStore();

  // Task status tabs configuration
  const taskStatusTabs = [
    { key: "all", label: "All", color: "bg-gray-100 text-gray-800" },
    { key: "todo", label: "To Do", color: "bg-gray-100 text-gray-800" },
    { key: "done", label: "Done", color: "bg-green-100 text-green-800" },
    { key: "progress", label: "Progress", color: "bg-purple-100 text-purple-800" },
    { key: "review", label: "Review", color: "bg-orange-100 text-orange-800" },
    { key: "OntheWay", label: "On the Way", color: "bg-indigo-100 text-indigo-800" },
    { key: "Arrived", label: "Arrived", color: "bg-emerald-100 text-emerald-800" },
    { key: "Canceled", label: "Canceled", color: "bg-red-100 text-red-800" },
  ];

  // Fetch job posting details
  const { data: jobPostingData, isLoading } = useData(`/employerJobPosting/${jobId}`);

  // Extract data
  const jobPosting = jobPostingData?.data?.job_posting;
  const location = jobPostingData?.data?.location;
  const serviceRequests = jobPostingData?.data?.service_requests || [];
  
  // Find the specific service request
  const serviceRequest = serviceRequests.find(
    (sr) => sr.id === parseInt(serviceRequestId)
  );

  // Filter tasks by selected status - MUST be before any early returns
  const filteredTasks = useMemo(() => {
    if (!serviceRequest?.tasks) return [];
    if (selectedTaskStatus === "all") return serviceRequest.tasks;
    return serviceRequest.tasks.filter(task => task.status === selectedTaskStatus);
  }, [serviceRequest, selectedTaskStatus]);

  // Get count for each task status
  const getTaskStatusCount = (status) => {
    if (!serviceRequest?.tasks) return 0;
    if (status === "all") return serviceRequest.tasks.length;
    return serviceRequest.tasks.filter(task => task.status === status).length;
  };

  // Early returns AFTER all hooks
  if (isLoading) {
    return (
      <div className="p-[28px] py-[58px]">
        <Spinner />
      </div>
    );
  }

  if (!serviceRequest) {
    return (
      <div className="p-[28px] py-[58px]">
        <CompletePersonalinfo />
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <p className="text-gray-600">Service request not found</p>
          <button
            onClick={() => navigate("/helpRequests")}
            className="mt-4 px-4 py-2 bg-[#F47621] text-white rounded-lg hover:bg-[#E55A1A]"
          >
            Back to Service Requests
          </button>
        </div>
      </div>
    );
  }

  // Function to get status badge styling
  const getStatusBadge = (status) => {
    const statusConfig = {
      taken: {
        color: "bg-blue-100 text-blue-800 border-blue-200",
        text: "Taken",
      },
      pending: {
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        text: "Pending",
      },
      expired: {
        color: "bg-red-100 text-red-800 border-red-200",
        text: "Expired",
      },
      cancel_with_repost: {
        color: "bg-orange-100 text-orange-800 border-orange-200",
        text: "Cancel with Repost",
      },
      cancel_without_repost: {
        color: "bg-gray-100 text-gray-800 border-gray-200",
        text: "Cancel without Repost",
      },
      // Task statuses
      todo: {
        color: "bg-gray-100 text-gray-800 border-gray-200",
        text: "To Do",
      },
      done: {
        color: "bg-green-100 text-green-800 border-green-200",
        text: "Done",
      },
      progress: {
        color: "bg-purple-100 text-purple-800 border-purple-200",
        text: "Progress",
      },
      review: {
        color: "bg-orange-100 text-orange-800 border-orange-200",
        text: "Review",
      },
      OntheWay: {
        color: "bg-indigo-100 text-indigo-800 border-indigo-200",
        text: "On the Way",
      },
      Arrived: {
        color: "bg-emerald-100 text-emerald-800 border-emerald-200",
        text: "Arrived",
      },
      Canceled: {
        color: "bg-red-100 text-red-800 border-red-200",
        text: "Canceled",
      },
    };

    return (
      statusConfig[status] || {
        color: "bg-gray-100 text-gray-800 border-gray-200",
        text: status || "Unknown",
      }
    );
  };

  const statusBadge = getStatusBadge(serviceRequest?.status);

  return (
    <div className="p-[28px] py-[58px]">
      <CompletePersonalinfo />

      {/* Header with Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/helpRequests")}
          className="flex items-center space-x-2 text-gray-600 hover:text-[#F47621] transition-colors mb-4"
        >
          <FaArrowLeft />
          <span>{t('serviceRequest.backToList')}</span>
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#0F1A43]">
              {t('serviceRequest.detailsTitle')}
            </h1>
            <p className="text-gray-600 mt-1">SR #{serviceRequest.id}</p>
          </div>
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold border ${statusBadge.color}`}
          >
            {statusBadge.text}
          </span>
        </div>
      </div>

      {/* Job Posting Info Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <FaBriefcase className="mr-2 text-[#F47621]" />
          {t('serviceRequest.jobPostingInfo')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">{t('serviceRequest.jobTitle')}</p>
            <p className="font-semibold text-gray-900">{jobPosting?.title}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">{t('serviceRequest.description')}</p>
            <p className="font-semibold text-gray-900">
              {jobPosting?.description || t('common.notAvailable')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">{t('serviceRequest.workersRequired')}</p>
            <p className="font-semibold text-gray-900">
              {jobPosting?.employees_required}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">{t('serviceRequest.location')}</p>
            <p className="font-semibold text-gray-900">
              {location?.city}, {location?.country}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">{t('serviceRequest.jobPeriod')}</p>
            <p className="font-semibold text-gray-900">
              {new Date(jobPosting?.date_from).toLocaleDateString("en-GB")} -{" "}
              {new Date(jobPosting?.date_to).toLocaleDateString("en-GB")}
            </p>
          </div>
        </div>
      </div>

      {/* Service Request Info Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <FaCalendarAlt className="mr-2 text-[#F47621]" />
          {t('serviceRequest.serviceRequestInfo')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
            <FaCalendarAlt className="text-purple-600 text-2xl" />
            <div>
              <p className="text-sm text-gray-600">{t('serviceRequest.serviceDate')}</p>
              <p className="font-semibold text-gray-900">
                {new Date(serviceRequest.date).toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
            <FaUsers className="text-blue-600 text-2xl" />
            <div>
              <p className="text-sm text-gray-600">{t('serviceRequest.workersAssigned')}</p>
              <p className="font-semibold text-gray-900">
                {serviceRequest.employees_assigned} / {jobPosting?.employees_required}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
            <FaMapMarkerAlt className="text-green-600 text-2xl" />
            <div>
              <p className="text-sm text-gray-600">{t('serviceRequest.location')}</p>
              <p className="font-semibold text-gray-900">
                {location?.city}, {location?.country}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <FaTasks className="mr-2 text-[#F47621]" />
          {t('serviceRequest.tasks')} ({serviceRequest.tasks?.length || 0})
        </h2>

        {/* Task Status Filter Tabs */}
        {serviceRequest.tasks && serviceRequest.tasks.length > 0 && (
          <div className="mb-6 bg-gray-50 rounded-lg p-3">
            <div className="flex flex-wrap gap-2">
              {taskStatusTabs.map((tab) => {
                const count = getTaskStatusCount(tab.key);
                const isActive = selectedTaskStatus === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setSelectedTaskStatus(tab.key)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-[#F47621] text-white shadow-md"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {tab.label}
                    <span
                      className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${
                        isActive ? "bg-white text-[#F47621]" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Filtered Results Info */}
        {filteredTasks.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              {t('serviceRequest.showing')} <span className="font-semibold text-gray-900">{filteredTasks.length}</span>{" "}
              {selectedTaskStatus !== "all" ? `${getStatusBadge(selectedTaskStatus).text.toLowerCase()} ` : ""}
              {t('serviceRequest.taskCount', { count: filteredTasks.length })}
            </p>
          </div>
        )}

        {filteredTasks.length > 0 ? (
          <div className="space-y-4">
            {filteredTasks.map((task) => {
              const taskStatusBadge = getStatusBadge(task.status);
              return (
                <div
                  key={task.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-[#F47621] transition-colors"
                >
                  {/* Task Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-semibold text-gray-900">
                        Task #{task.id}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${taskStatusBadge.color}`}
                      >
                        {taskStatusBadge.text}
                      </span>
                    </div>
                    
                    {/* QR Code and PIN Code Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => QrCodeOpen(task.id)}
                        className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                      >
                        <BsQrCode size={18} />
                        <span className="hidden sm:inline">{t('serviceRequest.qrCode')}</span>
                      </button>
                      <button
                        onClick={() => PinCodeOpen(task.id)}
                        className="flex items-center gap-2 px-3 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium"
                      >
                        <MdPin size={18} />
                        <span className="hidden sm:inline">{t('serviceRequest.pin')}</span>
                      </button>
                    </div>
                  </div>

                  {/* Task Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Employee Info */}
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2 flex items-center">
                        <FaUser className="mr-2" />
                        {t('serviceRequest.assignedEmployee')}
                      </p>
                      {task.employee?.user ? (
                        <div>
                          <p className="font-semibold text-gray-900">
                            {task.employee.user.first_name &&
                            task.employee.user.last_name
                              ? `${task.employee.user.first_name} ${task.employee.user.last_name}`
                              : task.employee.user.first_name ||
                                task.employee.user.last_name ||
                                t('serviceRequest.employee')}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center mt-1">
                            <FaEnvelope className="mr-2 text-xs" />
                            {task.employee.user.email}
                          </p>
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">{t('serviceRequest.noEmployeeAssigned')}</p>
                      )}
                    </div>

                    {/* Time Info */}
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2 flex items-center">
                        <FaClock className="mr-2" />
                        {t('serviceRequest.timeSchedule')}
                      </p>
                      {task.StartDate && task.EndDate ? (
                        <div>
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">{t('serviceRequest.start')}:</span>{" "}
                            {new Date(task.StartDate).toLocaleString("en-GB")}
                          </p>
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">{t('serviceRequest.end')}:</span>{" "}
                            {new Date(task.EndDate).toLocaleString("en-GB")}
                          </p>
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">{t('serviceRequest.noSchedule')}</p>
                      )}
                    </div>
                  </div>

                  {/* Task Timestamps */}
                  {task.start_at && task.end_at && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-600">
                        <span className="font-medium">Actual Start:</span>{" "}
                        {new Date(task.start_at).toLocaleString("en-GB")} |{" "}
                        <span className="font-medium">Actual End:</span>{" "}
                        {new Date(task.end_at).toLocaleString("en-GB")}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : serviceRequest.tasks && serviceRequest.tasks.length > 0 ? (
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
            <p className="text-gray-600">
              No tasks found with status: <span className="font-semibold">{getStatusBadge(selectedTaskStatus).text}</span>
            </p>
            <button
              onClick={() => setSelectedTaskStatus("all")}
              className="mt-3 px-4 py-2 bg-[#F47621] text-white rounded-lg hover:bg-[#E55A1A] text-sm"
            >
              Show All Tasks
            </button>
          </div>
        ) : (
          <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200 text-center">
            <p className="text-yellow-800">No tasks assigned yet</p>
          </div>
        )}
      </div>

      {/* QR Code / PIN Code Modal */}
      {showCode && selectedTaskId && (
        <AccessCode 
          id={selectedTaskId} 
          taskstatus={
            serviceRequest.tasks?.find(t => t.id === selectedTaskId)?.status || "todo"
          } 
        />
      )}
    </div>
  );
};

export default ServiceRequestDetails;

