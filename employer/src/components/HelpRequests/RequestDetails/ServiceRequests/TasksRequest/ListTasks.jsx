import { useEffect, useState } from "react";
import { IoEyeOutline, IoEyeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import getLocationName from "../../../../../utils/locationMap";
import useRequestsStore from "../../../../../store/HelpRequestsStore";
import { BiQrScan } from "react-icons/bi";
import AccessCode from "../../AccessCode";
import useData from "../../../../../hooks/useData";
import customFetch from "../../../../../utils/axios";
import { useMutation } from "@tanstack/react-query";
import visualphoto from "../../../../../assets/image/Img_Avatar.25.svg";

const ListTasks = ({
  id,
  status,
  start_at,
  end_at,
  rate,
  location,
  navigateTo,
  created_at,
  assigned_to,
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [lcoationfun, setLocationFun] = useState();
  const [photoEmployee, setPhotoEmployee] = useState(visualphoto);
  console.log(assigned_to);

  const { mutate: getPhotoEmployee } = useMutation({
    mutationFn: () =>
      customFetch.get(`/photo/${assigned_to}`).then((res) => res.data),

    onSuccess: (data) => {
      setPhotoEmployee(data?.data?.photo);
      console.log(data);
    },

    onError: (error) => {
      console.log(error?.response?.data?.errors);
    },
  });

  useEffect(() => {
    if (assigned_to) {
      getPhotoEmployee();
    }
  }, [assigned_to]);

  const { showCode, QrCodeOpen, PinCodeOpen } = useRequestsStore();

  if (showCode) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }

  useEffect(() => {
    getLocationName(location?.latitude, location?.longitude)
      .then((name) => setLocationFun(name))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="flex flex-col justify-between border-b border-[#919eab63] border-dashed box-shadow">
        <div className="HelpRequestDetailsActions flex items-center gap-2 justify-end">
          <button
            onClick={QrCodeOpen}
            className="flex gap-1 items-center font-[900]  bg-[#F47621] text-white px-4 py-2 rounded-xl cursor-pointer"
          >
            <span className="mr-2">
              <BiQrScan size={20} />
            </span>
            Show QR code to clock in
          </button>
          <span className="text-sm text-[#8E90A6]">or</span>
          <button onClick={PinCodeOpen} className="font-extrabold">
            Show pin code
          </button>
        </div>
        <div className="DetailsList w-[50vw] flex items-center  p-3 font-[500] gap-10 pb-5">
          {id && <div className="ListIndex Index">#60{id}</div>}
          <img className="w-22 rounded-[100%]" src={photoEmployee} alt="" />
          {/* navigate to userprofile */}
          <div
            className="ListInfo flex items-center gap-3 w-96"
            // onClick={() => navigate(navigateTo)}
          >
            <div className="flex flex-col gap-2.5">
              <p className="Name ml-1">
                {start_at ? (
                  <>Start at: {start_at}</>
                ) : (
                  <>Start at: It hasn't started yet.</>
                )}{" "}
              </p>
              <p className="Name ml-1">
                {end_at ? (
                  <>end_at : {end_at}</>
                ) : (
                  <>end_at: It hasn't end yet.</>
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
              <div className="">
                <p>Locatoion : {lcoationfun}</p>
              </div>
              <div className="">
                <p>
                  created at :{" "}
                  {new Date(created_at).toISOString().split("T")[0]}
                </p>
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
      {showCode && <AccessCode id={id} taskstatus={status} />}
    </>
  );
};

export default ListTasks;
