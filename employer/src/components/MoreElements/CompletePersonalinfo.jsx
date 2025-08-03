import React from "react";
import { useNavigate } from "react-router-dom";
import useData from "../../hooks/useData";
const CompletePersonalinfo = () => {
  const navigate = useNavigate();
  const { data } = useData("/profile/status/progress");

  return (
    <>
      {data?.data?.show_progress_bar && (
        <div className={`w-full ${data?.data?.percentage && "hidden"}  bg-[#194894] text-white rounded-2xl p-7 flex flex-col justify-between gap-5 mb-7`}>
          {/* Click to continue. Complete personal info. */}

          <span className="text-2xl">completeProfile</span>

          <div>
            <p className=" text-[#ffffff] text-sm mt-2">
              {data?.data?.message}
            </p>
            <div className="flex items-center gap-3 text-sm">
              <div className="h-1 w-full bg-[#4687ee] rounded-2xl outline-[1px]">
                <div
                  style={{ width: data?.data?.percentage }}
                  className={`h-1   bg-white rounded-2xl`}
                ></div>
              </div>
              {data?.data?.percentage}
            </div>
          </div>
          <button
            onClick={() => navigate("/Personal info")}
            className="bg-[#99B2DB] py-3 text-xl rounded-2xl border border-white"
          >
            {data?.data?.percentage == "100%" ? "completed" : "complete"}
          </button>
        </div>
      )}
    </>
  );
};

export default CompletePersonalinfo;
