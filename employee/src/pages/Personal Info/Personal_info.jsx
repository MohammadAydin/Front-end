import { useNavigate } from "react-router-dom";
import PersonalSections from "./Personal_info_index";
import "../Responsive css/Personal_info.css";
import useData from "../../hooks/useData";
import Status from "./Status";
import SuccsessPopup from "../../components/FormElements/SuccsessPopup";
import { AiOutlineExclamationCircle } from "react-icons/ai";

import { useTranslation } from "react-i18next";

const Personal_info = () => {
  const { t } = useTranslation();
  const { data } = useData("/profile/status");
  console.log(data);
  const navigate = useNavigate();
  const personalSections = PersonalSections();

  return (
    <div className="Personal_info_page p-[28px] py-[58px] text-lg ">
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

            {status_name !== "isUploadedAllProfile" &&
              data?.[status_name] === "missing" ? (
              <button
                onClick={() => navigate(`${path}`)}
                className="text-[#F47621] bg-[#FFDFC6] px-7 p-2 rounded-lg font-bold"
              >
                {t('personalInfoSections.complete')} &nbsp; →
              </button>
            ) : status_name !== "isUploadedAllProfile" &&
              data?.[status_name] === "declined" ? (
              <div className="declinedStatus flex flex-row-reverse items-center ">
                <button
                  onClick={() => navigate(`${path}`)}
                  className="text-[#F47621] bg-[#FFDFC6] px-7 p-2 rounded-lg font-bold  w-[165px]"
                >
                  {t('personalInfoSections.complete')} &nbsp; →
                </button>
                <Status status={data?.[status_name]} />
              </div>
            ) : status_name !== "isUploadedAllProfile" &&
              data?.[status_name] === "uploaded" ? (
              <div className="declinedStatus flex flex-row-reverse items-center ">
                <button
                  onClick={() => navigate(`${path}?uploaded=true`)}
                  className="text-[#F47621] bg-[#FFDFC6] px-7 p-2 rounded-lg font-bold w-[165px]"
                >
                  Edit &nbsp; →
                </button>
                <Status status={data?.[status_name]} />
              </div>
            ) : (
              <Status status={data?.[status_name]} />
            )}
          </div>
        )
      )}
      {!data?.isUploadedAllProfile && (
        <p className="w-full bg-[#f4752121] my-5 px-4 py-5  rounded-lg text-[#F47621] flex gap-2 items-center ">
          <AiOutlineExclamationCircle size={25} />
          Please upload all personal info before Press Send.
        </p>
      )}
      <button
        disabled={!data?.isUploadedAllProfile}
        className={`w-full  text-lg font-extrabold px-10 py-2 rounded-lg mt-4  ${data?.isUploadedAllProfile
            ? "bg-[#F47621] text-white hover:bg-[#EE6000]"
            : "bg-gray-300 text-gray-600 "
          }`}
      >
        Send all
      </button>

      <SuccsessPopup />
    </div>
  );
};

export default Personal_info;
