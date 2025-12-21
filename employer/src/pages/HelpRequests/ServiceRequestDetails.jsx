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
import { LuChevronLeft, LuFilter } from "react-icons/lu";
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
      <div className="px-4 md:px-6 py-6">
        <CompletePersonalinfo />
        <div className="bg-white rounded-2xl shadow-lg p-12 md:p-16 flex flex-col items-center justify-center min-h-[400px]">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-[#F47621]/20 border-t-[#F47621] rounded-full animate-spin"></div>
          </div>
          <p className="mt-6 text-gray-600 text-center">{t('common.loading') || 'Loading...'}</p>
        </div>
      </div>
    );
  }

  if (!serviceRequest) {
    return (
      <div className="px-4 md:px-6 py-6">
        <CompletePersonalinfo />
        <div className="bg-white rounded-2xl shadow-lg border-2 border-dashed border-gray-300 p-12 text-center animate-slide-up">
          <div className="bg-red-100 rounded-full p-4 inline-block mb-4">
            <FaTasks size={48} className="text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Service Request Not Found</h3>
          <p className="text-gray-600 mb-6">The service request you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate("/helpRequests")}
            className="px-6 py-3 bg-gradient-to-r from-[#F47621] to-[#ff8c42] hover:from-[#E55A1A] hover:to-[#F47621] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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
    <div className="px-4 md:px-6 py-6">
      <CompletePersonalinfo />

      {/* Back Button */}
      <button
        onClick={() => navigate("/helpRequests")}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors duration-300 group"
      >
        <LuChevronLeft
          size={24}
          className="group-hover:-translate-x-1 transition-transform duration-300"
        />
        <span className="font-medium">{t('serviceRequest.backToList')}</span>
      </button>

      {/* Modern Gradient Header */}
      <div className="bg-gradient-to-r from-[#F47621] to-[#ff8c42] rounded-2xl p-6 md:p-8 mb-8 shadow-lg overflow-hidden animate-slide-up">
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                <FaTasks size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {t('serviceRequest.detailsTitle')}
                </h1>
                <p className="text-white/90 text-sm md:text-base mt-1">SR #{serviceRequest.id}</p>
              </div>
            </div>
            <span
              className={`px-4 py-2 rounded-lg text-sm font-bold border-2 shadow-md ${statusBadge.color} bg-white/10 backdrop-blur-sm`}
            >
              {statusBadge.text}
            </span>
          </div>
        </div>
      </div>

      {/* Job Posting Info Card */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 md:p-8 mb-6 animate-slide-up">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-[#F47621] to-[#ff8c42] rounded-xl p-3">
            <FaBriefcase className="text-white text-xl" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            {t('serviceRequest.jobPostingInfo')}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 divide-y md:divide-y-0 divide-gray-200">
          <div className="pb-4 md:pb-0">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{t('serviceRequest.jobTitle')}</p>
            <p className="text-base font-bold text-gray-900">{jobPosting?.title}</p>
          </div>
          <div className="pt-4 md:pt-0 pb-4 md:pb-0">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{t('serviceRequest.description')}</p>
            <p className="text-base font-semibold text-gray-900">
              {jobPosting?.description || t('common.notAvailable')}
            </p>
          </div>
          <div className="pt-4 md:pt-0 pb-4 md:pb-0">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{t('serviceRequest.workersRequired')}</p>
            <p className="text-base font-bold text-gray-900">
              {jobPosting?.employees_required}
            </p>
          </div>
          <div className="pt-4 md:pt-0 pb-4 md:pb-0">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{t('serviceRequest.location')}</p>
            <p className="text-base font-semibold text-gray-900">
              {location?.city}, {location?.country}
            </p>
          </div>
          <div className="pt-4 md:pt-0 md:col-span-2">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{t('serviceRequest.jobPeriod')}</p>
            <p className="text-base font-semibold text-gray-900">
              {new Date(jobPosting?.date_from).toLocaleDateString("en-GB")} -{" "}
              {new Date(jobPosting?.date_to).toLocaleDateString("en-GB")}
            </p>
          </div>
        </div>
      </div>

      {/* Service Request Info Card */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 md:p-8 mb-6 animate-slide-up">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-[#F47621] to-[#ff8c42] rounded-xl p-3">
            <FaCalendarAlt className="text-white text-xl" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            {t('serviceRequest.serviceRequestInfo')}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
            <div className="bg-purple-100 rounded-lg p-3">
              <FaCalendarAlt className="text-purple-600 text-xl" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{t('serviceRequest.serviceDate')}</p>
              <p className="font-bold text-gray-900">
                {new Date(serviceRequest.date).toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
            <div className="bg-blue-100 rounded-lg p-3">
              <FaUsers className="text-blue-600 text-xl" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{t('serviceRequest.workersAssigned')}</p>
              <p className="font-bold text-gray-900">
                {serviceRequest.employees_assigned} / {jobPosting?.employees_required}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
            <div className="bg-green-100 rounded-lg p-3">
              <FaMapMarkerAlt className="text-green-600 text-xl" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{t('serviceRequest.location')}</p>
              <p className="font-bold text-gray-900">
                {location?.city}, {location?.country}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 md:p-8 animate-slide-up">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-[#F47621] to-[#ff8c42] rounded-xl p-3">
            <FaTasks className="text-white text-xl" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            {t('serviceRequest.tasks')} ({serviceRequest.tasks?.length || 0})
          </h2>
        </div>

        {/* Task Status Filter Tabs */}
        {serviceRequest.tasks && serviceRequest.tasks.length > 0 && (
          <div className="mb-6 bg-gradient-to-r from-[#F47621] to-[#ff8c42] rounded-xl p-4 shadow-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex items-center gap-2">
                <LuFilter size={18} className="md:w-5 md:h-5 text-white/80" />
                <span className="text-white/80 text-sm hidden sm:inline">Filter:</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 bg-white/20 backdrop-blur-sm rounded-lg p-1 w-full sm:w-auto overflow-x-auto">
                {taskStatusTabs.map((tab) => {
                  const count = getTaskStatusCount(tab.key);
                  const isActive = selectedTaskStatus === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setSelectedTaskStatus(tab.key)}
                      className={`px-3 py-1.5 md:px-4 md:py-2 rounded-md font-semibold text-xs md:text-sm transition-all duration-300 whitespace-nowrap ${
                        isActive
                          ? "bg-white text-[#F47621] shadow-md"
                          : "text-white/80 hover:text-white"
                      }`}
                    >
                      {tab.label} ({count})
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {filteredTasks.length > 0 ? (
          <div className="space-y-4">
            {filteredTasks.map((task, index) => {
              const taskStatusBadge = getStatusBadge(task.status);
              return (
                <div
                  key={task.id}
                  className="border-2 border-gray-200 rounded-xl p-5 md:p-6 hover:border-[#F47621] hover:shadow-lg transition-all duration-300 bg-white animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Task Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-br from-[#F47621] to-[#ff8c42] text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-md">
                        Task #{task.id}
                      </div>
                      <span
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 shadow-sm ${taskStatusBadge.color}`}
                      >
                        {taskStatusBadge.text}
                      </span>
                    </div>
                    
                    {/* QR Code and PIN Code Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => QrCodeOpen(task.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 hover:shadow-md transition-all duration-300 text-sm font-semibold"
                      >
                        <BsQrCode size={18} />
                        <span className="hidden sm:inline">{t('serviceRequest.qrCode')}</span>
                      </button>
                      <button
                        onClick={() => PinCodeOpen(task.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 hover:shadow-md transition-all duration-300 text-sm font-semibold"
                      >
                        <MdPin size={18} />
                        <span className="hidden sm:inline">{t('serviceRequest.pin')}</span>
                      </button>
                    </div>
                  </div>

                  {/* Task Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Employee Info */}
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-3 flex items-center">
                        <FaUser className="mr-2 text-gray-400" />
                        {t('serviceRequest.assignedEmployee')}
                      </p>
                      {task.employee?.user ? (
                        <div>
                          <p className="font-bold text-gray-900 text-base">
                            {task.employee.user.first_name &&
                            task.employee.user.last_name
                              ? `${task.employee.user.first_name} ${task.employee.user.last_name}`
                              : task.employee.user.first_name ||
                                task.employee.user.last_name ||
                                t('serviceRequest.employee')}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center mt-2">
                            <FaEnvelope className="mr-2 text-xs" />
                            {task.employee.user.email}
                          </p>
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">{t('serviceRequest.noEmployeeAssigned')}</p>
                      )}
                    </div>

                    {/* Time Info */}
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-3 flex items-center">
                        <FaClock className="mr-2 text-gray-400" />
                        {t('serviceRequest.timeSchedule')}
                      </p>
                      {task.StartDate && task.EndDate ? (
                        <div className="space-y-2">
                          <p className="text-sm text-gray-700">
                            <span className="font-semibold">{t('serviceRequest.start')}:</span>{" "}
                            {new Date(task.StartDate).toLocaleString("en-GB")}
                          </p>
                          <p className="text-sm text-gray-700">
                            <span className="font-semibold">{t('serviceRequest.end')}:</span>{" "}
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
                    <div className="mt-4 pt-4 border-t-2 border-gray-200">
                      <p className="text-xs text-gray-600">
                        <span className="font-semibold">Actual Start:</span>{" "}
                        {new Date(task.start_at).toLocaleString("en-GB")} |{" "}
                        <span className="font-semibold">Actual End:</span>{" "}
                        {new Date(task.end_at).toLocaleString("en-GB")}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : serviceRequest.tasks && serviceRequest.tasks.length > 0 ? (
          <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12 text-center animate-slide-up">
            <div className="bg-gray-100 rounded-full p-4 inline-block mb-4">
              <FaTasks size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              No tasks found with status: <span className="text-[#F47621]">{getStatusBadge(selectedTaskStatus).text}</span>
            </h3>
            <button
              onClick={() => setSelectedTaskStatus("all")}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-[#F47621] to-[#ff8c42] hover:from-[#E55A1A] hover:to-[#F47621] text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Show All Tasks
            </button>
          </div>
        ) : (
          <div className="bg-yellow-50 rounded-xl border-2 border-yellow-200 p-12 text-center animate-slide-up">
            <div className="bg-yellow-100 rounded-full p-4 inline-block mb-4">
              <FaTasks size={32} className="text-yellow-600" />
            </div>
            <p className="text-yellow-800 font-semibold text-lg">No tasks assigned yet</p>
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

