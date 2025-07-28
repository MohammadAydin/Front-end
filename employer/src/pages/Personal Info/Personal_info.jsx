import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import useData from "../../hooks/useData";
import customFetch from "../../utils/axios";
import PersonalSections from "./Personal_info_index";

import Status from "./Status";
import SuccsessPopup from "../../components/FormElements/SuccsessPopup";
import { AiOutlineExclamationCircle } from "react-icons/ai";

import "../Responsive css/Personal_info.css";

import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const Personal_info = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const personalSections = PersonalSections();

  const { data: statusData } = useData("/profile/status");
  console.log(statusData);
  console.log(statusData?.isUploadedAllProfile);

  const sendAllInfo = useMutation({
    
    mutationFn: () => customFetch.post("profile/submit/review"),
    
    onSuccess: () => {
      navigate("/")
      console.log("Successfully sent all personal info");
      toast.success("Successfully sent all personal info");
      // Show a success message or trigger refetch if needed
    },
    onError: (error) => {
      console.error("Failed to send info:", error);
      // Optional: show error to user
    },
    
  });

  const handleSendAll = () => {
    console.log("okk")
    sendAllInfo.mutate();
  };

  const renderActionButton = ({ status_name, path }) => {
    const status = statusData?.data?.[status_name];

    if (status_name === "isUploadedAllProfile") return null;

    if (status === "pending" || status === "declined") {
      return (
        <div className="declinedStatus flex flex-row-reverse items-center">
          <button
            onClick={() => navigate(`${path}`)}
            className="text-[#F47621] bg-[#FFDFC6] px-7 p-2 rounded-lg font-bold w-[165px]"
          >
            Complete &nbsp; →
          </button>
          <Status status={status} />
        </div>
      );
    }

    if (status === "uploaded") {
      return (
        <div className="declinedStatus flex flex-row-reverse items-center">
          <button
            onClick={() => {
              status_name == "location"
                ? navigate("/editLocation?uploaded=true")
                : navigate(`${path}?uploaded=true`);
            }}
            className="text-[#F47621] bg-[#FFDFC6] px-7 p-2 rounded-lg font-bold w-[165px]"
          >
            Edit &nbsp; →
          </button>
          <Status status={status} />
        </div>
      );
    }

    return <Status status={status} />;
  };

  return (
    <div className="Personal_info_page p-[28px] py-[58px] text-lg">
      {personalSections.map(
        ({ icon: Icon, label, path, status_name }, index) => (
          <div
            key={index}
            className="Personal_info_Item flex justify-between border-b border-[#919eab63] border-dashed py-5"
          >
            <div className="flex items-center gap-4">
              <Icon size={25} />
              <span>{label}</span>
            </div>
            {renderActionButton({ status_name, path })}
          </div>
        )
      )}
      {!statusData?.data?.isUploadedAllProfile && (
        <p className="w-full bg-[#f4752121] my-5 px-4 py-5 rounded-lg text-[#F47621] flex gap-2 items-center">
          <AiOutlineExclamationCircle size={25} />
          Please upload all personal info before pressing Send.
        </p>
      )}
      <button
        disabled={!statusData?.data?.isUploadedAllProfile || sendAllInfo.isPending}
        onClick={handleSendAll}
        className={`w-full text-lg font-extrabold px-10 py-2 rounded-lg mt-4 ${
          statusData?.data?.isUploadedAllProfile
            ? "bg-[#F47621] text-white hover:bg-[#EE6000]"
            : "bg-gray-300 text-gray-600"
        }`}
      >
        {sendAllInfo.isPending ? "Sending..." : "Send all"}
      </button>

      <SuccsessPopup />
    </div>
  );
};

export default Personal_info;
