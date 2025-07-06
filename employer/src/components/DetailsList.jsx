import { useState } from "react";
import avatar from "../assets/image/Img_Avatar.25.svg";
import { IoEyeOutline, IoEyeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const DetailsList = ({
  index,
  avatarPhoto,
  name,
  email,
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
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div className="DetailsList flex items-center justify-between p-3 font-[500] gap-4 border-b border-[#919eab63] border-dashed pb-5">
        {index && <div className="ListIndex Index">#6019</div>}

        {/* navigate to userprofile */}
        {avatarPhoto && name && email && (
          <div
            className="ListInfo flex items-center gap-3 cursor-pointer"
            onClick={() =>
              navigate("/UserProfile/2", {
                state: { from: `/${previousPage}` },
              })
            }
          >
            <img className="rounded-full w-12" src={avatar} alt="" />
            <div>
              <p className="Name ">Adel kharzoum</p>
              <p className="Email text-[#919EAB] text-sm font-[100]">
                adelkharzoum@gmail.com
              </p>
            </div>
          </div>
        )}
        {orderDate && orderTime && (
          <div>
            <p className="orderDate">12 Jan 2022</p>
            <p className="orderTime text-[#919EAB] text-sm font-[100]">
              4:00 PM
            </p>
          </div>
        )}
        {specialist && <div className="specialist">Nursing Specialist</div>}
        {address && <div className="address">Berlin, Alexanderplatz</div>}
        {PhoneNumber && <div className="PhoneNumber">+44 7737149686</div>}
        {price && <div className="price">10$ P/H</div>}
        {status && (
          <div
            className={`ListStatus p-2 rounded-lg ${
              status === "In Progress"
                ? "text-[#4EAF51] bg-[#E9FFE9]"
                : status === "Pending"
                ? "text-[#FF6400] bg-[#FFE8DA]"
                : "text-red-500 bg-red-100"
            }`}
          >
            In Progress
          </div>
        )}
        {total && <div className="total">220$</div>}

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
