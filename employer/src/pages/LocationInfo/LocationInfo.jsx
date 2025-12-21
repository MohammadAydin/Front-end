import React, { useEffect, useState } from "react";
import useData from "../../hooks/useData";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { RiPencilLine } from "react-icons/ri";
import { FaRegTrashCan } from "react-icons/fa6";
import customFetch from "../../utils/axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { RiErrorWarningLine } from "react-icons/ri";
import SuccsessPopup from "../../components/FormElements/SuccsessPopup";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Spinner from "../../components/MoreElements/Spinner";
import { IoLocationOutline, IoLocationSharp, IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";

const LocationInfo = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [primarystatus, setPrimaryStatus] = useState();

  const getStatus = useMutation({
    mutationFn: (location) =>
      customFetch
        .post(`profile/status/type`, { status: location })
        .then((res) => res.data),
    onSuccess: (data) => {
      setPrimaryStatus(data.data.status);
      queryClient.invalidateQueries({
        queryKey: ["/locations", "locationsList"],
      });
    },
    onError: (error) => {},
  });

  useEffect(() => {
    getStatus.mutate("location");
  }, []);

  const {
    data: locations,
    errorlocations,
    isLoadinglocations,
  } = useData("/locations", "locationsList");

  // const {
  //   data: workable,
  //   error,
  //   isLoading,
  // } = useData("/profile/workable-distance");

  // To delete a locatiomn
  const deleteLocation = useMutation({
    mutationFn: (id) =>
      customFetch.delete(`/locations/${id}`).then((res) => res.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["/locations", "locationsList"],
      });
      toast.success(data.message || t("locationInfo.locationDeleteSuccess"));
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || t("locationInfo.locationDeleteError")
      );
    },
  });
  // To reject a jobRequest
  const Activate = useMutation({
    mutationFn: (id) =>
      customFetch.put(`/locations/${id}/activate`).then((res) => res.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["/locations", "locationsList"],
      });
      toast.success(data.message || t("locationInfo.locationActivateSuccess"));
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          t("locationInfo.locationActivateError")
      );
    },
  });

  return (
    <>
      <div className="w-full">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6 animate-slide-up">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-[#F47621] to-[#ff8c42] rounded-xl p-3 shadow-lg">
                <IoLocationSharp size={28} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {t("LocationInfo.title")}
                </h3>
                <p className="text-gray-600 text-sm md:text-base mt-1">
                  {t("LocationInfo.description")}
                </p>
              </div>
            </div>
            {/* Add New Address Button */}
            {primarystatus === "approved" && (
              <Link
                to={`/addLoaction/${locations?.data?.length || 0}`}
                className="flex items-center gap-2 bg-gradient-to-r from-[#F47621] to-[#ff8c42] hover:from-[#EE6000] hover:to-[#F47621] text-white px-6 py-3 rounded-xl font-bold text-base shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <FaPlus size={20} />
                {t("LocationInfo.add")}
              </Link>
            )}
          </div>

          {/* Empty State */}
          {(!locations?.data || locations?.data?.length === 0) && (
            <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-full p-4 mb-4">
                <RiErrorWarningLine className="text-4xl text-[#F47621]" />
              </div>
              <p className="text-gray-600 text-lg font-semibold text-center">
                {t("LocationInfo.noAddressMessage") || "No addresses found"}
              </p>
              {primarystatus === "approved" && (
                <p className="text-gray-500 text-sm mt-2 text-center">
                  {t("LocationInfo.emptyStateHint") || 'Click "Add new address" to get started'}
                </p>
              )}
            </div>
          )}

          {/* Location Cards */}
          {locations?.data && locations.data.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {locations.data.map((location, index) => (
                <div
                  key={location.id}
                  className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-2 ${
                    location.is_primary === 1
                      ? "border-[#F47621] bg-gradient-to-br from-orange-50/50 to-white"
                      : "border-gray-100 hover:border-[#F47621]/30"
                  } animate-slide-up`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`rounded-xl p-3 ${
                          location.is_primary === 1
                            ? "bg-gradient-to-br from-[#F47621] to-[#ff8c42]"
                            : "bg-gradient-to-br from-gray-400 to-gray-500"
                        } shadow-lg`}
                      >
                        <IoLocationOutline size={24} className="text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-800">
                          {location.is_primary === 1
                            ? t("LocationInfo.primary")
                            : `${t("LocationInfo.address")} ${index + 1}`}
                        </h4>
                        {location.is_primary === 1 && (
                          <span className="inline-flex items-center gap-1 mt-1 px-2 py-1 bg-[#F47621]/10 text-[#F47621] text-xs font-semibold rounded-full">
                            <IoCheckmarkCircle size={14} />
                            {t("LocationInfo.status.primary")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Address Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-2">
                      <span className="text-gray-500 text-sm font-medium min-w-[80px]">
                        Street:
                      </span>
                      <span className="text-gray-800 font-semibold flex-1">
                        {location.street1}
                        {location.street2 && `, ${location.street2}`}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-gray-500 text-sm font-medium min-w-[80px]">
                        City:
                      </span>
                      <span className="text-gray-800 font-semibold flex-1">
                        {location.city}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-gray-500 text-sm font-medium min-w-[80px]">
                        Postal Code:
                      </span>
                      <span className="text-gray-800 font-semibold flex-1">
                        {location.postal_code}
                      </span>
                    </div>
                    {location.country && (
                      <div className="flex items-start gap-2">
                        <span className="text-gray-500 text-sm font-medium min-w-[80px]">
                          Country:
                        </span>
                        <span className="text-gray-800 font-semibold flex-1">
                          {location.country}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Status and Actions */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-gray-200">
                    {/* Status Badge */}
                    {primarystatus !== "approved" ? (
                      <div className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg font-semibold text-sm">
                        <span>{primarystatus}</span>
                      </div>
                    ) : (
                      <>
                        {/* Active Status */}
                        <button
                          onClick={() => Activate.mutate(location.id)}
                          disabled={location.is_active === 1}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                            location.is_active === 1
                              ? "bg-green-100 text-green-700 cursor-not-allowed"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          {location.is_active === 1 ? (
                            <>
                              <IoCheckmarkCircle size={18} />
                              {t("LocationInfo.status.active")}
                            </>
                          ) : (
                            <>
                              <IoCloseCircle size={18} />
                              {t("LocationInfo.status.activate")}
                            </>
                          )}
                        </button>

                        {/* Action Buttons */}
                        {location.is_primary !== 1 && (
                          <div className="flex items-center gap-2">
                            <Link
                              to={`/editLocation?id=${location.id}&title=${location.title}&street1=${location.street1}&street2=${location.street2}&postal_code=${location.postal_code}&city=${location.city}&country=${location.country}`}
                              className="flex items-center justify-center w-10 h-10 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-all duration-300 hover:scale-110"
                              title="Edit"
                            >
                              <RiPencilLine size={20} />
                            </Link>
                            <button
                              onClick={() => deleteLocation.mutate(location.id)}
                              className="flex items-center justify-center w-10 h-10 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-all duration-300 hover:scale-110"
                              title="Delete"
                            >
                              <FaRegTrashCan size={18} />
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <SuccsessPopup />
    </>
  );
};

export default LocationInfo;
