import { HiOutlineDownload } from "react-icons/hi";
import useData from "../hooks/useData";
import ProfilePhoto from "../components/UserProfile/ProfilePhoto/ProfilePhoto";
import "./Responsive css/UserProfile.css";
import { useTranslation } from "react-i18next";
import Spinner from "../components/MoreElements/Spinner";
import { PiEyeLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import customFetch from "../utils/axios";
import useStatusAccount from "../store/storeStatusAccount";
import { createElement, use, useEffect, useState } from "react";
import statusAccount from "../utils/statusAccountReturn";
import { toast } from "react-toastify";
import axios from "axios";
import SpinnerLoading from "../components/MoreElements/SpinnerLoading";
import { FaRegEdit } from "react-icons/fa";
import InputEditBio from "../components/MoreElements/bioElement/InputEditBio";
import {
  LuUser,
  LuMail,
  LuPhone,
  LuMapPin,
  LuCalendar,
  LuBriefcase,
  LuFileText,
  LuAward,
  LuGraduationCap,
} from "react-icons/lu";

const UserProfile = () => {
  const { data, isLoading, refetch } = useData("/profile");
  const { data: photoData } = useData("/photo");
  const [editBio, setEditBio] = useState(false);
  const toggleInput = () => {
    setEditBio(!editBio);
  };
  console.log(data);

  const { t } = useTranslation();

  const [loadingPdf, setLoadingPdf] = useState(false);
  const downloadPdf = async () => {
    setLoadingPdf(true);
    await customFetch
      .get("/employee/contract/pdf", {
        responseType: "blob",
        onDownloadProgress: function (progressEvent) {
          if (progressEvent.lengthComputable) {
            console.log(
              ((progressEvent.loaded / progressEvent.total) * 100).toFixed() +
                "%"
            );
          }
        },
      })
      .then((obj) => {
        setLoadingPdf(false);
        const url = URL.createObjectURL(obj.data);
        const a = document.createElement("a");
        a.href = url;
        a.download = "contract.pdf";
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        setLoadingPdf(false);
      });
  };

  if (isLoading) return <Spinner />;

  // Function to get localized field name
  const getFieldLabel = (key) => {
    const translationKey = `userProfile.fields.${key}`;
    const translated = t(translationKey);
    // If translation doesn't exist, fallback to capitalized key
    return translated === translationKey
      ? key.charAt(0).toUpperCase() + key.slice(1)
      : translated;
  };

  // Icon mapping for different fields
  const getFieldIcon = (key) => {
    const iconMap = {
      name: LuUser,
      email: LuMail,
      phone: LuPhone,
      address: LuMapPin,
      date_of_birth: LuCalendar,
      occupation: LuBriefcase,
      bio: LuFileText,
      education: LuGraduationCap,
      experience: LuAward,
    };
    return iconMap[key] || LuUser;
  };

  if (localStorage.getItem("statusAccount") !== "approved")
    return statusAccount(localStorage.getItem("statusAccount"));

  return (
    <div className="UserProfile p-[28px] py-[58px] max-w-7xl mx-auto">
      {/* Profile Header Card */}
      <div className="relative mb-8 overflow-hidden rounded-3xl shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#194894] via-[#1a4fa0] to-[#194894]"></div>
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        <div className="relative p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[#F47621] to-blue-400 rounded-full blur-2xl opacity-50 animate-pulse"></div>
              <div className="relative bg-white rounded-full p-1 shadow-xl">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  {photoData?.photo ? (
                    <img
                      src={photoData.photo}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <LuUser className="text-gray-400" size={48} />
                  )}
                </div>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {data?.name || t("userProfile.profileName")}
              </h1>
              <p className="text-white/80 text-lg mb-4">
                {data?.occupation || t("userProfile.profileOccupation")}
              </p>
              {data?.email && (
                <div className="flex items-center justify-center md:justify-start gap-2 text-white/90 mb-6">
                  <LuMail size={18} />
                  <span className="text-sm">{data.email}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Photo Section */}
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 mb-6">
        <h2 className="text-xl font-bold mb-5 text-gray-800">
          {t("userProfile.profilePhoto")}
        </h2>
        <ProfilePhoto />
      </div>

      {/* Profile Information Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Main Info Card */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <LuUser className="text-[#F47621]" size={24} />
              {t("userProfile.personalInformation")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data &&
                Object.entries(data).map(([key, value]) => {
                  if (
                    key === "avatar" ||
                    key === "is_viewable_contract" ||
                    key === "bio" ||
                    key === "name" ||
                    key === "occupation" ||
                    key === "email"
                  )
                    return null;

                  const Icon = getFieldIcon(key);
                  return (
                    <div
                      key={key}
                      className="group relative bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-200 hover:border-[#F47621]/50 transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="flex items-start gap-3">
                        <div className="bg-gradient-to-br from-[#F47621]/10 to-blue-500/10 rounded-lg p-2 group-hover:from-[#F47621]/20 group-hover:to-blue-500/20 transition-all duration-300">
                          <Icon className="text-[#F47621] group-hover:scale-110 transition-transform duration-300" size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                            {getFieldLabel(key)}
                          </p>
                          <p className="text-gray-800 font-medium break-words">
                            {value || (
                              <span className="text-gray-400 italic">
                                {t("userProfile.notProvided")}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Bio & Contract Card */}
        <div className="space-y-6">
          {/* Bio Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <LuFileText className="text-[#F47621]" size={20} />
                {getFieldLabel("bio")}
              </h2>
              <button
                onClick={() => setEditBio(true)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300 group"
                title={t("userProfile.editBio")}
              >
                <FaRegEdit className="text-[#F47621] group-hover:scale-110 transition-transform duration-300" size={18} />
              </button>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-200 min-h-[120px]">
              <p className="text-gray-700 leading-relaxed">
                {data?.bio || (
                  <span className="text-gray-400 italic">
                    {t("userProfile.noBio")}
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Contract Card */}
          {data?.is_viewable_contract && (
            <div className="bg-gradient-to-br from-[#F47621] to-[#ff8c42] rounded-2xl shadow-xl p-6 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
              <div className="relative">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <LuFileText size={24} />
                  {t("userProfile.contract")}
                </h3>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={downloadPdf}
                    disabled={loadingPdf}
                    className="w-full bg-white text-[#F47621] px-5 py-3 font-bold text-lg rounded-xl hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingPdf ? (
                      <>
                        <SpinnerLoading />
                        <span>{t("userProfile.downloading")}</span>
                      </>
                    ) : (
                      <>
                        {t("userProfile.downloadContract")}
                        <HiOutlineDownload size={24} />
                      </>
                    )}
                  </button>
                  <Link
                    to="/contract"
                    className="w-full bg-white/20 backdrop-blur-sm text-white px-5 py-3 font-semibold rounded-xl hover:bg-white/30 transition-all duration-300 flex items-center justify-center gap-2 border border-white/30"
                  >
                    <PiEyeLight size={20} />
                    {t("userProfile.viewContract")}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* A component for editing the bio display */}
      {editBio && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <InputEditBio
            toggleInput={toggleInput}
            defaultValue={data?.bio}
            refetch={refetch}
          />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
