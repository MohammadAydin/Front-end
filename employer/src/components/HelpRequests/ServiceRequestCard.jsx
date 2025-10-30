import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useData from "../../hooks/useData";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaBriefcase,
  FaChevronRight,
  FaTasks,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

const ServiceRequestCard = ({
  serviceRequest,
  jobPosting,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const shiftId = jobPosting?.shift_id;
  const {
    data: shift,
    error,
    isLoading,
  } = useData(shiftId ? `/employer/shifts/${shiftId}` : '/employer/shifts/skip', undefined, { enabled: Boolean(shiftId) });

  // Function to get status badge styling
  const getStatusBadge = (status) => {
    const statusConfig = {
      taken: {
        color: "bg-blue-100 text-blue-800 border-blue-200",
        text: t('serviceRequest.filters.taken'),
      },
      pending: {
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        text: t('serviceRequest.filters.pending'),
      },
      expired: {
        color: "bg-red-100 text-red-800 border-red-200",
        text: t('serviceRequest.status.expired'),
      },
      cancel_with_repost: {
        color: "bg-orange-100 text-orange-800 border-orange-200",
        text: t('serviceRequest.status.cancelWithRepost'),
      },
      cancel_without_repost: {
        color: "bg-gray-100 text-gray-800 border-gray-200",
        text: t('serviceRequest.status.cancelWithoutRepost'),
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
  const city = jobPosting?.location?.city;
  const street = jobPosting?.location?.street || jobPosting?.location?.street1 || jobPosting?.location?.street2;
  const locationText =
    [city, street].filter(Boolean).join(" - ") ||
    jobPosting?.location?.title ||
    (typeof jobPosting?.location === 'string' ? jobPosting.location : '') ||
    t('common.notAvailable');

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 mb-4 overflow-hidden group">
      <div className="p-6">
        {/* Header Row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
              SR #{serviceRequest?.id}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-[#F47621] transition-colors">
                {jobPosting?.title}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <FaBriefcase className="mr-1" />
                  {jobPosting?.employeePosition?.name || t('serviceRequest.jobPosting')}
                </span>
                <span className="flex items-center">
                  <FaCalendarAlt className="mr-1" />
                  {new Date(serviceRequest?.date).toLocaleDateString("en-GB")}
                </span>
              </div>
            </div>
          </div>
          {/* Status Badge */}
          <div className="">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusBadge.color}`}
            >
              {statusBadge.text}
            </span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Workers Assigned */}
          <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
            <FaUsers className="text-blue-600 text-lg" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {serviceRequest?.employees_assigned} / {jobPosting?.employees_required}
              </p>
              <p className="text-xs text-gray-600">{t('serviceRequest.workersAssigned')}</p>
            </div>
          </div>

          {/* Location (city + street) */}
          <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
            <FaMapMarkerAlt className="text-green-600 text-lg" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {locationText}
              </p>
            </div>
          </div>

          {/* Service Date */}
          <div className="flex items-center space-x-2 p-3 bg-purple-50 rounded-lg">
            <FaCalendarAlt className="text-purple-600 text-lg" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {new Date(serviceRequest?.date).toLocaleDateString("en-GB")}
              </p>
              <p className="text-xs text-gray-600">{t('serviceRequest.serviceDate')}</p>
            </div>
          </div>

          {/* Shift Information */}
          {shift && (
            <div className="flex items-center space-x-2 p-3 bg-orange-50 rounded-lg">
              <FaClock className="text-orange-600 text-lg" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {shift?.data?.name}
                </p>
                <p className="text-xs text-gray-600">
                  {shift?.data?.start_time} - {shift?.data?.end_time}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Action Button */}
        <div
          className="flex items-center justify-between pt-4 border-t border-gray-100 cursor-pointer"
          onClick={() => navigate(`/helpRequests/${jobPosting?.id}/service-request/${serviceRequest?.id}`)}
        >
          <div className="text-sm text-gray-500">{t('serviceRequest.clickToView')}</div>
          <div className="flex items-center space-x-2 text-[#F47621] group-hover:text-[#E55A1A] transition-colors">
            <span className="text-sm font-medium">{t('serviceRequest.viewDetails')}</span>
            <FaChevronRight className="text-sm group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequestCard;

