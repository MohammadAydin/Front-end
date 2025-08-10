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

const UserProfile = () => {
  const { data, isLoading } = useData("/profile");

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
        console.log(error);
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

  if (localStorage.getItem("statusAccount") !== "approved")
    return statusAccount(localStorage.getItem("statusAccount"));

  return (
    <div className="UserProfile p-[28px] py-[58px]">
      <div className="w-full p-10 shadow-xl rounded-2xl mb-10">
        <p className="text-xl font-bold mb-5">
          {t("userProfile.profilePhoto")}
        </p>
        <ProfilePhoto />
      </div>
      <div className="w-full p-10 shadow-xl rounded-2xl ">
        <div className="UserProfileInfo w-[730px] grid grid-cols-2 gap-2">
          {data &&
            Object.entries(data).map(([key, value]) => {
              if (key === "avatar") return null;
              return (
                <div
                  key={key}
                  className={`relative  h-[55px] border-2 border-[#919eab54] rounded-xl flex items-center px-3 mb-4  ${
                    key === "bio" ? "col-span-2" : ""
                  }`}
                >
                  <p className="absolute top-[-10px] left-5 text-[#6373817c] bg-white px-2">
                    {getFieldLabel(key)}
                  </p>
                  <p>{value || t("userProfile.notProvided")}</p>
                </div>
              );
            })}
          <div className=" relative">
            <button
              onClick={downloadPdf}
              className="contractDownloadBtn w-[400px] bg-[#F47621] text-white px-5 py-2 font-bold text-lg rounded-lg mt-4 hover:bg-[#EE6000] flex gap-2 items-center justify-center"
            >
              {loadingPdf ? (
                <SpinnerLoading />
              ) : (
                <div className="flex items-center gap-2">
                  {t("userProfile.downloadContract")}
                  <span>
                    <HiOutlineDownload size={24} />
                  </span>
                </div>
              )}
            </button>

            <Link to="/contract">
              <PiEyeLight className="text-4xl mt-3.5 absolute top-[6px] left-1.5 text-white click hover:text-black" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
