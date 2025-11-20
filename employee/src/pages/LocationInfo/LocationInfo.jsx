import React, { useEffect, useState } from "react";
import useData from "../../hooks/useData";
import { Link } from "react-router-dom";

import { GiPathDistance } from "react-icons/gi";
import { FaPlus } from "react-icons/fa";
import { RiPencilLine } from "react-icons/ri";
import { FaRegTrashCan } from "react-icons/fa6";
import {
  LuMapPin,
  LuMapPinCheck,
  LuBuilding2,
  LuNavigation,
} from "react-icons/lu";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import customFetch from "../../utils/axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { RiErrorWarningLine } from "react-icons/ri";
import SuccsessPopup from "../../components/FormElements/SuccsessPopup";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Spinner from "../../components/MoreElements/Spinner";
import useStatusAccount from "../../store/storeStatusAccount";
import statusAccount from "../../utils/statusAccountReturn";

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

  const {
    data: workable,
    error,
    isLoading,
  } = useData("/profile/workable-distance");

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

  if (localStorage.getItem("statusAccount") !== "approved")
    return statusAccount(localStorage.getItem("statusAccount"));

  if (isLoadinglocations || isLoading) return <Spinner />;
  const primaryLocation = locations?.find(
    (location) => location.is_primary == 1
  );
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="relative bg-gradient-to-r from-[#F47621] to-[#ff8c42] rounded-2xl shadow-xl p-8 overflow-hidden">
            {/* Decorative Background Pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-2">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                  <LuMapPin size={32} className="text-white" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">
                  {t("locationInfo.title")}
                </h1>
              </div>
              <p className="text-white/90 text-lg mt-2">
                {t("locationInfo.subtitle")}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto space-y-6">
          {/* Addresses Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-[#F47621] to-[#ff8c42] rounded-xl p-2.5">
                  <LuBuilding2 size={24} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {t("locationInfo.addresses")}
                </h2>
                {locations?.length > 0 && (
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {locations.length}
                  </span>
                )}
              </div>
              {/* Add New Address Button */}
              {primarystatus == "approved" && (
                <Link
                  to={`/addLoaction/${locations?.length}`}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F47621] to-[#ff8c42] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <FaPlus size={18} />
                  {t("locationInfo.addNewAddress")}
                </Link>
              )}
            </div>

            {/* Empty State */}
            {locations?.length == 0 && (
              <div className="flex flex-col justify-center items-center py-16 px-4">
                <div className="relative max-w-md w-full">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 bg-gradient-to-br from-[#F47621]/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                  </div>
                  <div className="relative bg-white rounded-2xl shadow-xl p-12 border border-gray-100 text-center">
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#F47621]/20 to-blue-500/20 rounded-full blur-xl"></div>
                        <div className="relative bg-gradient-to-br from-[#F47621] to-[#ff8c42] rounded-full p-6">
                          <LuMapPin size={64} className="text-white" />
                        </div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                      {t("locationInfo.noAddressTitle")}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {t("locationInfo.noAddressMessage")}
                    </p>
                    {primarystatus == "approved" && (
                      <Link
                        to={`/addLoaction/${locations?.length}`}
                        className="inline-block bg-gradient-to-r from-[#F47621] to-[#ff8c42] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                      >
                        <FaPlus className="inline mr-2" />
                        {t("locationInfo.addNewAddress")}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Address Cards */}
            {locations?.length > 0 && (
              <div className="space-y-4">
                {locations?.map((location, index) => (
                  <div
                    key={location.id}
                    className={`group relative bg-gradient-to-br ${
                      location.is_primary == 1
                        ? "from-[#F47621]/10 to-[#ff8c42]/10 border-2 border-[#F47621]/30"
                        : "from-white to-gray-50 border border-gray-200"
                    } rounded-xl p-6 hover:shadow-lg transition-all duration-300`}
                  >
                    {/* Primary Badge */}
                    {location.is_primary == 1 && (
                      <div className="absolute top-4 right-4">
                        <div className="bg-gradient-to-r from-[#F47621] to-[#ff8c42] text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <LuMapPinCheck size={14} />
                          {t("locationInfo.primary")}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      {/* Address Info */}
                      <div className="flex-1">
                        <div className="flex items-start gap-4 mb-4">
                          <div
                            className={`rounded-xl p-3 ${
                              location.is_primary == 1
                                ? "bg-gradient-to-br from-[#F47621] to-[#ff8c42]"
                                : "bg-gray-200"
                            }`}
                          >
                            <LuMapPin
                              size={24}
                              className={
                                location.is_primary == 1
                                  ? "text-white"
                                  : "text-gray-600"
                              }
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">
                              {location.is_primary == 1
                                ? t("locationInfo.primaryLocation")
                                : `${t("locationInfo.addressNumber", {
                                    number: index + 2,
                                  })}`}
                            </h3>
                            <div className="space-y-1 text-gray-600">
                              <p className="font-medium">{location.street1}</p>
                              <div className="flex flex-wrap gap-4 text-sm">
                                <span className="flex items-center gap-1">
                                  <LuBuilding2 size={16} />
                                  {location.city}
                                </span>
                                <span>{location.postal_code}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      {primarystatus == "approved" && (
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                          {/* Activate/Active Button */}
                          <button
                            onClick={() => Activate.mutate(location.id)}
                            disabled={location.is_active}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                              location.is_active == 1
                                ? "bg-green-500 text-white cursor-not-allowed"
                                : "bg-gray-500 hover:bg-gray-600 text-white"
                            }`}
                          >
                            {location.is_active == 1 ? (
                              <>
                                <IoCheckmarkDoneCircle size={18} />
                                {t("locationInfo.active")}
                              </>
                            ) : (
                              t("locationInfo.activate")
                            )}
                          </button>

                          {/* Edit/Delete Buttons */}
                          {location.is_primary != 1 && (
                            <div className="flex items-center gap-2">
                              <Link
                                to={`/editLocation?id=${location.id}&title=${location.title}&street1=${location.street1}&street2=${location.street2}&postal_code=${location.postal_code}&city=${location.city}&country=${location.country}`}
                                className="bg-blue-500 hover:bg-blue-600 text-white p-2.5 rounded-xl transition-all duration-300 hover:scale-110"
                                title={t("locationInfo.edit")}
                              >
                                <RiPencilLine size={20} />
                              </Link>
                              <button
                                onClick={() => deleteLocation.mutate(location.id)}
                                className="bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-xl transition-all duration-300 hover:scale-110"
                                title={t("locationInfo.delete")}
                              >
                                <FaRegTrashCan size={18} />
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Pending Status */}
                      {primarystatus != "approved" && (
                        <div className="bg-yellow-500 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-2">
                          <RiErrorWarningLine size={18} />
                          {primarystatus}...
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Commuting Range Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 sm:p-8 border border-blue-100">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="flex items-center gap-4 flex-1">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-4">
                  <GiPathDistance size={32} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-600 text-sm font-medium">
                      {t("locationInfo.commutingRange")}
                    </p>
                    <Link
                      to={`/EditWorkaBilities/${workable?.workable_distance}`}
                      className="bg-white hover:bg-gray-100 text-gray-700 p-2 rounded-lg transition-all duration-300 hover:scale-110"
                      title={t("locationInfo.edit")}
                    >
                      <RiPencilLine size={20} />
                    </Link>
                  </div>
                  <div className="flex items-center gap-2">
                    <LuNavigation size={20} className="text-blue-600" />
                    <p className="text-2xl font-bold text-gray-800">
                      {workable?.workable_distance} km
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SuccsessPopup />
    </>
  );
};

export default LocationInfo;
