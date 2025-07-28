import { useState } from "react";
import { IoEyeOutline, IoEyeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ListService = ({ id, date, status, navigateTo, employeeNum }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div className="flex justify-between border-b border-[#919eab63] border-dashed box-shadow">
        <div className="DetailsList w-[50vw] flex items-center  p-3 font-[500] gap-10 pb-5">
          {id && <div className="ListIndex Index">#60{id}</div>}

          {/* navigate to userprofile */}
          <div
            className="ListInfo flex items-center gap-8 cursor-pointer w-72"
            onClick={() => navigate(navigateTo)}
          >
            <div className="flex flex-col gap-1">
              <p className="Name ml-1">
                {new Date(date).toISOString().split("T")[0]}
              </p>
              <p
                className={`Email text-white p-1 rounded-[10px]  mt-1 text-sm font-[100] ${
                  status == "pending"
                    ? "bg-green-400"
                    : status == "cancel"
                    ? "bg-red-500"
                    : status == "cancel"
                    ? "bg-yellow-200 text-black"
                    : ""
                }`}
              >
                Status : <span className={``}>{status}</span>
              </p>
              <p className="">employeesa ssigned : {employeeNum}</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate(navigateTo)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? <IoEyeSharp size={20} /> : <IoEyeOutline size={20} />}
        </button>
      </div>
    </>
  );
};

export default ListService;
