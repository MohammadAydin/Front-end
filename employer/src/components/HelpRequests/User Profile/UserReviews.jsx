import React from "react";
import avr from "../../../assets/image/Img_Avatar.25.svg";
import { IoEyeOutline } from "react-icons/io5";

const UserReviews = () => {
  const num = [1, 2, 3, 4];
  return (
    <div className="UserReviews px-7 p-2 shadow-[0_15px_50px_rgba(0,0,0,0.15)] rounded-4xl text-[#212B36]">
      <div className="flex items-center justify-between w-full mt-5">
        <h3 className="text-lg font-bold">Reviews</h3>
        <button className="p-1 px-5 rounded-lg text-[#F47621] border-2 font-bold ">
          Add Review
        </button>
      </div>
      {num.map((i) => (
        <div className="my-5" key={i}>
          <div className="Reviews flex items-center gap-5">
            <div className="flex items-center gap-5 w-70">
              <img src={avr} alt="" width={40} className="rounded-full" />
              <div className="flex flex-col ">
                <span className="text-sma flex gap-7 items-center ">
                  Elderly house
                </span>
                <span className="text-[#919EAB] text-sm ">
                  mayaramy@gmail.com
                </span>
              </div>
            </div>
            <p className="ReviewText w-[50%] text-sm">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab,
              beatae aut voluptatum assumenda voluptas autem. Debitis
              dignissimos doloribus velit vel ipsa
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserReviews;
