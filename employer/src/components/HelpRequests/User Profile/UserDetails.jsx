import React from "react";
import avr from "../../../assets/image/Img_Avatar.25.svg";
import { LuMapPin, LuPhone, LuMail, LuCarTaxiFront } from "react-icons/lu";
import { IoMdMale } from "react-icons/io";

const userInfo = [
  { icon: <LuMail size={20} />, text: "mayaramy@gmail.com" },
  { icon: <LuPhone size={20} />, text: "+999 999 999 999" },
  { icon: <LuMapPin size={20} />, text: "Berlin, Alexanderplatz" },
  { icon: <LuCarTaxiFront size={20} />, text: "Car Owner" },
  { icon: <IoMdMale size={20} />, text: "22 years old, Male" },
];
const UserDetails = () => {
  return (
    <div className="UserDetails flex flex-col items-start p-10 shadow-[0_-5px_35px_rgba(0,0,0,0.15)] fix  rounded-4xl my-5">
      <div className="w-full text-end">
        <button className="p-1 px-5 rounded-lg text-[#FF3B30] border-2 font-bold">
          Report
        </button>
      </div>
      <div className="UserDetailsImg flex items-center gap-5 mb-5">
        <img src={avr} alt="" width={100} className="rounded-full" />
        <div className="flex flex-col gap-2 font-bold">
          <span className="UserDetailsName text-2xl flex gap-7 items-center">
            Abdalrhman Alhowri
            <span className="text-[14px] text-[#8F90A6] font-medium">
              @UserName
            </span>
          </span>
          <span className="text-[#F47621] text-lg">5,0 Ratings</span>
        </div>
      </div>
      <div>
        <ul>
          {userInfo.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-4 text-[#555770c9] text-sm my-3"
            >
              {item.icon}
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDetails;
