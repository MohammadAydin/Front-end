import { useEffect, useState } from "react";
import { IoEyeOutline, IoEyeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import getLocationName from "../../../../../utils/locationMap";

const ListTasks = ({ id, status, start_at, rate, location, navigateTo }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [lcoationfun, setLocationFun] = useState();

  useEffect(() => {
    getLocationName(location?.latitude, location?.longitude)
      .then((name) => setLocationFun(name))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="flex justify-between border-b border-[#919eab63] border-dashed box-shadow">
        <div className="DetailsList w-[50vw] flex items-center  p-3 font-[500] gap-10 pb-5">
          {id && <div className="ListIndex Index">#60{id}</div>}

          {/* navigate to userprofile */}
          <div
            className="ListInfo flex items-center gap-3 w-96"
            // onClick={() => navigate(navigateTo)}
          >
            <div className="flex flex-col gap-2.5">
              <p className="Name ml-1">
                {start_at ? (
                  <>
                    Start at: {new Date(start_at).toISOString().split("T")[0]}
                  </>
                ) : (
                  <>Start at: N/A</>
                )}{" "}
              </p>
              <p
                // ['todo', 'done', 'progress', 'review', 'OntheWay', 'Arrived', 'Canceled']
                className={`Email text-white p-1 rounded-[10px] w-fit  mt-1 text-sm font-[100] ${
                  status == "done"
                    ? "bg-orange-400"
                    : status == "Canceled"
                    ? "bg-red-500"
                    : status == "todo"
                    ? "bg-green-400 text-black"
                    : status == "review"
                    ? "bg-blue-500"
                    : status == "progress"
                    ? "bg-blue-400"
                    : status == "Arrived"
                    ? "border-x-green-300 text-black"
                    : status == "OntheWay"
                    ? "border-x-green-300 text-black"
                    : ""
                }`}
              >
                Status : <span className={``}>{status} </span>
              </p>
              <p>Rate : {rate}</p>
              <div className="">
                <p>Locatoion : {lcoationfun}</p>
              </div>
            </div>
          </div>
        </div>
        {/* <button
          onClick={() => navigate(navigateTo)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? <IoEyeSharp size={20} /> : <IoEyeOutline size={20} />}
        </button> */}
      </div>
    </>
  );
};

export default ListTasks;
