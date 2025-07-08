import { useNavigate } from "react-router-dom";
import PersonalSections from "./Personal_info_index";
import "../Responsive css/Personal_info.css";
import useData from "../../hooks/useData";
import Status from "./Status";
import SuccsessPopup from "../../components/FormElements/SuccsessPopup";
const Personal_info = () => {
  const { data } = useData("/profile/status");

  const navigate = useNavigate();
  return (
    <div className="Personal_info_page p-[28px] py-[58px] text-lg ">
      {PersonalSections.map(
        ({ icon: Icon, label, path, status_name }, index) => (
          <div
            key={index}
            className="Personal_info_Item flex justify-between border-b border-[#919eab63] border-dashed py-5"
          >
            <div className="flex items-center gap-4">
              <Icon size={25} />
              <span>{label}</span>
            </div>

            {data?.[status_name]?.status === "missing" ? (
              <button
                onClick={() => navigate(`${path}`)}
                className="text-[#F47621] bg-[#FFDFC6] px-7 p-2 rounded-lg font-bold"
              >
                Complete &nbsp; →
              </button>
            ) : data?.[status_name]?.status === "declined" ? (
              <div className="declinedStatus flex flex-row-reverse items-center ">
                <button
                  onClick={() => navigate(`${path}`)}
                  className="text-[#F47621] bg-[#FFDFC6] px-7 p-2 rounded-lg font-bold"
                >
                  Complete &nbsp; →
                </button>
                <Status status={data?.[status_name]?.status} />
              </div>
            ) : (
              <Status status={data?.[status_name]?.status} />
            )}
          </div>
        )
      )}
      <SuccsessPopup />
    </div>
  );
};

export default Personal_info;
