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
import { MdDelete } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

const ServiceRequestCard = ({
  serviceRequest,
  jobPosting,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Prefer shift from the details response if present; otherwise fetch by id
  const shiftFromDetails = serviceRequest?.shift;
  const shiftId = jobPosting?.shift_id;
  const { data: shiftFetched, isLoading } = useData(
    !shiftFromDetails && shiftId ? `/employer/shifts/${shiftId}` : '/employer/shifts/skip',
    undefined,
    { enabled: !shiftFromDetails && Boolean(shiftId) }
  );
  const shiftData = shiftFromDetails || shiftFetched?.data;

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await (await import("../../utils/axios")).default.delete(`/service-request/${serviceRequest?.id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["/employerJobPosting"]);
      if (jobPosting?.id) queryClient.invalidateQueries([["/employerJobPosting", jobPosting.id]]);
    },
  });

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {/* Position */}
          <div className="flex items-center space-x-2 p-3 bg-indigo-50 rounded-lg">
            <FaBriefcase className="text-indigo-600 text-lg" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {(jobPosting?.employeePosition?.name || jobPosting?.position?.name || t('common.notAvailable')) === 'Pflegefachassistent'
                  ? 'Pflegefachassistent – ein Jahr Ausbildung'
                  : (jobPosting?.employeePosition?.name || jobPosting?.position?.name || t('common.notAvailable'))}
              </p>
              <p className="text-xs text-gray-600">{t('serviceRequest.position')}</p>
            </div>
          </div>

          {/* Shift Information */}
          <div className="flex items-center space-x-2 p-3 bg-orange-50 rounded-lg">
            <FaClock className="text-orange-600 text-lg" />
            <div>
              {shiftData ? (
                <>
                  <p className="text-sm font-medium text-gray-900">
                    {shiftData.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    {shiftData.start_time} - {shiftData.end_time}
                  </p>
                </>
              ) : (
                <p className="text-sm font-medium text-gray-900">
                  {isLoading ? t('common.loading') : t('common.notAvailable')}
                </p>
              )}
            </div>
          </div>

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
          <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg col-span-1 md:col-span-2 lg:col-span-1">
            <FaMapMarkerAlt className="text-green-600 text-lg" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {locationText}
              </p>
              <p className="text-xs text-gray-600">{t('serviceRequest.location')}</p>
            </div>
          </div>

          {/* Service Date */}
          <div className="flex items-center space-x-2 p-3 bg-purple-50 rounded-lg col-span-1 md:col-span-2 lg:col-span-2">
            <FaCalendarAlt className="text-purple-600 text-lg" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {new Date(serviceRequest?.date).toLocaleDateString("en-GB")}
              </p>
              <p className="text-xs text-gray-600">{t('serviceRequest.serviceDate')}</p>
            </div>
          </div>
        </div>

        {/* Footer with Action Button */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            {(serviceRequest?.status !== "expired" && serviceRequest?.status !== "cancel_without_repost") && (
              deleteMutation.isPending ? (
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  <span>{t('deleteService.deleting')}</span>
                </div>
              ) : (
                <button
                  className={`${serviceRequest?.canCancel ? "text-red-500 hover:text-red-700" : "text-gray-400 cursor-not-allowed"} flex items-center gap-1 text-sm`}
                  disabled={!serviceRequest?.canCancel}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (serviceRequest?.canCancel) deleteMutation.mutate();
                  }}
                  title={serviceRequest?.canCancel ? t('serviceRequest.deleteTooltip') : t('serviceRequest.cannotDeleteTooltip')}
                >
                  <MdDelete size={16} />
                  <span>{t('deleteService.delete')}</span>
                </button>
              )
            )}
          </div>
          <button
            className="flex items-center space-x-2 text-[#F47621] hover:text-[#E55A1A] transition-colors"
            onClick={() => navigate(`/helpRequests/${jobPosting?.id}/service-request/${serviceRequest?.id}`)}
          >
            <span className="text-sm font-medium">{t('serviceRequest.viewDetails')}</span>
            <FaChevronRight className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequestCard;

