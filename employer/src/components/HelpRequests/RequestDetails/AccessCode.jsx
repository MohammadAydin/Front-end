import React from "react";
import useRequestsStore from "../../../store/HelpRequestsStore";
import { BsQrCode } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import useData from "../../../hooks/useData";

const AccessCode = ({ id, taskstatus }) => {
  console.log(id);
  console.log("id : " + id + "status : " + taskstatus);
  const { QrCode, PinCode, CodeClose } = useRequestsStore();
  const { data: code, error, isLoading } = useData(`/employer/task/${id}/pin`);
  const pincode = code?.data?.pin_code;
  const num = pincode ? pincode.split("").map(Number) : [];
  const PointQr =
    taskstatus === "progress"
      ? `/employer/task/${id}/qr/end`
      : `/employer/task/${id}/qr`;

  const { data: QrCodePhoto, errorQr, isLoadingQr } = useData(PointQr);

  return (
    <div className="fixed inset-0 w-full h-full z-[9999] flex justify-center items-center bg-[#28293d94] text-black overflow-hidden">
      <div
        className={`AccessCode w-[90vw] max-w-[600px] bg-white rounded-2xl p-5 mx-4 ${
          PinCode ? "h-[300px]" : "h-[600px]"
        } max-h-[90vh] overflow-y-auto`}
      >
        <div
          className="w-full flex justify-end cursor-pointer mb-2"
          onClick={CodeClose}
        >
          <IoClose
            size={30}
            className="hover:bg-gray-100 rounded-full p-1 transition-colors duration-200"
          />
        </div>
        <div className="h-[90%] mt-5 flex flex-col items-center justify-center gap-8">
          {QrCode ? (
            <>
              <div className="flex justify-center">
                <img
                  src={QrCodePhoto?.data?.qr_png}
                  alt="QR Code"
                  className="max-w-full h-auto max-h-[300px]"
                />
              </div>
              <span className="CodeInfo text-xl sm:text-2xl font-bold text-center px-4">
                Make the applier scan the Qr-code
              </span>
            </>
          ) : (
            <>
              <div className="flex justify-center gap-1 sm:gap-2 max-w-full overflow-hidden">
                {num.map((i, index) => (
                  <span
                    key={index}
                    className="CodeNumber text-lg sm:text-2xl border-2 border-[#e0e0e6] rounded-lg p-3 sm:p-5 w-12 sm:w-16 text-center flex-shrink-0"
                  >
                    {i}
                  </span>
                ))}
              </div>
              <span className="CodeInfo text-xl sm:text-2xl font-bold text-center px-4">
                Please enter your PIN code
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccessCode;
