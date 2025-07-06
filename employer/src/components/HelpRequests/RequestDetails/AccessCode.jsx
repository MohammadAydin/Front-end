import React from "react";
import useRequestsStore from "../../../store/HelpRequestsStore";
import { BsQrCode } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

const AccessCode = () => {
  const { QrCode, PinCode, CodeClose } = useRequestsStore();
  const num = [5, 2, 7, 1, 7, 5];

  return (
    <div className="w-full h-[100vh] absolute top-0 left-0 flex justify-center items-center bg-[#28293d94] text-black">
      <div
        className={`AccessCode w-[600px] bg-white rounded-2xl p-5 ${
          PinCode ? "h-[300px]" : "h-[600px]"
        } `}
      >
        <div
          className="w-full flex justify-end cursor-pointer"
          onClick={CodeClose}
        >
          <IoClose size={30} />
        </div>
        <div className="h-[90%] mt-5 flex flex-col items-center justify-center gap-8">
          {QrCode ? (
            <>
              <BsQrCode size={250} />
              <span className="CodeInfo text-2xl font-bold">
                Make the applier scan the Qr-code
              </span>
            </>
          ) : (
            <>
              <div>
                {num.map((i, index) => (
                  <span
                    key={index}
                    className="CodeNumber text-2xl border-2 border-[#e0e0e6] rounded-lg p-5 mx-2"
                  >
                    {i}
                  </span>
                ))}
              </div>
              <span className="CodeInfo text-2xl font-bold">
                lease enter your PIN code
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccessCode;
