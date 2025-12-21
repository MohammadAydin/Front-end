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
    <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-1 h-full flex flex-col">
      <div className="p-4 md:p-5 lg:p-6 flex flex-col flex-1">
        {/* Header Row */}
        <div className="flex flex-col mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="bg-gradient-to-br from-[#F47621] to-[#ff8c42] text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-md">
              SR #{serviceRequest?.id}
            </div>
            {/* Status Badge */}
            <span
              className={`px-2.5 py-1 rounded-lg text-xs font-bold border-2 shadow-sm ${statusBadge.color}`}
            >
              {statusBadge.text}
            </span>
          </div>
          <h3 className="text-base md:text-lg font-bold text-gray-900 group-hover:text-[#F47621] transition-colors line-clamp-2 min-h-[3rem]">
            {jobPosting?.title}
          </h3>
        </div>

        {/* Main Content Grid */}
        <div className="space-y-0 mb-4 flex-1 divide-y divide-gray-200">
          {/* Position */}
          <div className="flex items-start space-x-2.5 p-3 hover:bg-gray-50 transition-colors">
            <div className="bg-gray-100 rounded-lg p-1.5 flex-shrink-0 mt-0.5">
              <FaBriefcase className="text-gray-600 text-sm" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-gray-900 line-clamp-2 leading-tight">
                {(jobPosting?.employeePosition?.name || jobPosting?.position?.name || t('common.notAvailable')) === 'Pflegefachassistent'
                  ? 'Pflegefachassistent – ein Jahr Ausbildung'
                  : (jobPosting?.employeePosition?.name || jobPosting?.position?.name || t('common.notAvailable'))}
              </p>
              <p className="text-xs text-gray-600 font-medium mt-0.5">{t('serviceRequest.position')}</p>
            </div>
          </div>

          {/* Shift Information */}
          <div className="flex items-start space-x-2.5 p-3 hover:bg-gray-50 transition-colors">
            <div className="bg-gray-100 rounded-lg p-1.5 flex-shrink-0 mt-0.5">
              <FaClock className="text-gray-600 text-sm" />
            </div>
            <div className="min-w-0 flex-1">
              {shiftData ? (
                <>
                  <p className="text-xs font-bold text-gray-900 truncate">
                    {shiftData.name}
                  </p>
                  <p className="text-xs text-gray-600 font-medium mt-0.5">
                    {shiftData.start_time} - {shiftData.end_time}
                  </p>
                </>
              ) : (
                <p className="text-xs font-bold text-gray-900">
                  {isLoading ? t('common.loading') : t('common.notAvailable')}
                </p>
              )}
            </div>
          </div>

          {/* Workers Assigned */}
          <div className="flex items-start space-x-2.5 p-3 hover:bg-gray-50 transition-colors">
            <div className="bg-gray-100 rounded-lg p-1.5 flex-shrink-0 mt-0.5">
              <FaUsers className="text-gray-600 text-sm" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-gray-900">
                {serviceRequest?.employees_assigned} / {jobPosting?.employees_required}
              </p>
              <p className="text-xs text-gray-600 font-medium mt-0.5">{t('serviceRequest.workersAssigned')}</p>
            </div>
          </div>

          {/* Location (city + street) */}
          <div className="flex items-start space-x-2.5 p-3 hover:bg-gray-50 transition-colors">
            <div className="bg-gray-100 rounded-lg p-1.5 flex-shrink-0 mt-0.5">
              <FaMapMarkerAlt className="text-gray-600 text-sm" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-gray-900 line-clamp-2 leading-tight">
                {locationText}
              </p>
              <p className="text-xs text-gray-600 font-medium mt-0.5">{t('serviceRequest.location')}</p>
            </div>
          </div>

          {/* Service Date */}
          <div className="flex items-start space-x-2.5 p-3 hover:bg-gray-50 transition-colors">
            <div className="bg-gray-100 rounded-lg p-1.5 flex-shrink-0 mt-0.5">
              <FaCalendarAlt className="text-gray-600 text-sm" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-gray-900">
                {new Date(serviceRequest?.date).toLocaleDateString("en-GB")}
              </p>
              <p className="text-xs text-gray-600 font-medium mt-0.5">{t('serviceRequest.serviceDate')}</p>
            </div>
          </div>
        </div>

        {/* Footer with Action Button */}
        <div className="flex flex-col gap-2 pt-4 border-t-2 border-gray-100 mt-auto">
          {(serviceRequest?.status !== "expired" && serviceRequest?.status !== "cancel_without_repost") && (
            deleteMutation.isPending ? (
              <div className="flex items-center justify-center gap-2 text-gray-500 text-xs py-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                <span>{t('deleteService.deleting')}</span>
              </div>
            ) : (
              <button
                className={`${serviceRequest?.canCancel ? "text-red-600 hover:text-red-700 hover:bg-red-50" : "text-gray-400 cursor-not-allowed"} flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 w-full`}
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
          <button
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-[#F47621] to-[#ff8c42] hover:from-[#E55A1A] hover:to-[#F47621] text-white px-4 py-2.5 rounded-lg font-semibold text-xs md:text-sm shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 w-full"
            onClick={() => navigate(`/helpRequests/${jobPosting?.id}/service-request/${serviceRequest?.id}`)}
          >
            <span>{t('serviceRequest.viewDetails')}</span>
            <FaChevronRight className="text-xs" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequestCard;

