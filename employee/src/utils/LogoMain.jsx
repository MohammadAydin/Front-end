import React from "react";
import Logo from "../assets/images/LogoMain.png";

const LogoMain = () => {
  return (
    <>
      <div className="flex flex-col w-[40%] mb-[24%]   items-center text-center text-[1.4vw]">
        <img className=" w-[18%] logo" src={Logo} alt="" />
        <h2 className="text-white  mt-2 font-bold">Wo & Wann</h2>
        <h2 className="text-white text-[1.2vw] font-bold">
          PERSONAL SERVICES GmbH
        </h2>
        <h2 className="text-white  font-bold">Service Tailored Just for Yoy</h2>
      </div>
    </>
  );
};

export default LogoMain;
