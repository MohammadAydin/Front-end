import { useState } from "react";
import avatar from "../assets/image/Img_Avatar.25.svg";
import { IoEyeOutline, IoEyeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useData from "../hooks/useData";

const DetailsList = ({
  id,
  title,
  employees_required,
  created_at,
  country,
  city,
  index,
  avatarPhoto,
  name,
  email,
  date_from,
  date_to,
  orderDate,
  orderTime,
  specialist,
  address,
  PhoneNumber,
  price,
  total,
  status,
  navigateTo,
  previousPage,
  shiftid,
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const {
    data: shfit,
    error,
    isLoadnig,
  } = useData(`/employer/shifts/${shiftid}`);

  //   end_time
  // :
  // "22:00"
  // id
  // :
  // 2
  // name
  // :
  // "Tagschicht"
  // start_time
  // :
  // "14:00"
  return (
    <>
      <div className="flex justify-between border-b border-[#919eab63] border-dashed ">
        <div className="DetailsList w-[70vw] flex items-center justify-between p-3 font-[500] gap-10 pb-5">
          {index && <div className="ListIndex Index">#60{id}</div>}

          {/* navigate to userprofile */}
          {avatarPhoto && name && email && (
            <div
              className="ListInfo flex items-center gap-3 cursor-pointer w-72"
              onClick={() => navigate(navigateTo)}
            >
              <img className="rounded-full w-12" src={avatar} alt="" />
              <div>
                <p className="Name ">{title}</p>
                <p className="Email text-[#919EAB] text-sm font-[100]">
                  Workers needed : {employees_required}{" "}
                </p>
              </div>
            </div>
          )}
          {created_at && (
            <div>
              <p className="Name ">
                created_at : {new Date(created_at).toISOString().split("T")[0]}
              </p>
              <p className="Email text-[#919EAB] text-sm font-[100]">
               from  : {new Date(date_from).toISOString().split("T")[0]}&nbsp; to : 
                &nbsp;{new Date(date_to).toISOString().split("T")[0]}
              </p>
              {shfit && (
                <div>
                  <p className="Name text-[#919EAB] text-sm font-[100]">shift : {shfit?.data?.name}</p>
                  <p className="Email text-[#919EAB] text-sm font-[100]">
                    {shfit?.data?.start_time} to {shfit?.data?.end_time}
                  </p>
                </div>
              )}
            </div>
          )}

          {address && (
            <div className="address text-wrap w-32">
              {country}, {city}
            </div>
          )}
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

export default DetailsList;
