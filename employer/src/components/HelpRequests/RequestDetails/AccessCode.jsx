import React, { useEffect, useState } from "react";
import useRequestsStore from "../../../store/HelpRequestsStore";
import { BsQrCode } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import useData from "../../../hooks/useData";

const AccessCode = ({ id, taskstatus }) => {
  const { QrCode, PinCode: isPinMode, CodeClose } = useRequestsStore();
  const { data: code, error, isLoading } = useData(`/employer/task/${id}/pin`);
  const pincode = code?.data?.pin_code;
  const endPinCode = code?.data?.end_pin_code;
  const num = pincode ? pincode.split("") : [];
  const endNum = endPinCode ? endPinCode.split("") : [];
  const [showStartPin, setShowStartPin] = useState(true);

  useEffect(() => {
    // Reset to start PIN whenever modal opens in PIN mode
    if (isPinMode) {
      setShowStartPin(true);
    }
  }, [isPinMode, id]);
  const PointQr =
    taskstatus === "progress"
      ? `/employer/task/${id}/qr/end`
      : `/employer/task/${id}/qr`;

  const { data: QrCodePhoto, errorQr, isLoadingQr } = useData(PointQr);

  return (
    <div className="fixed inset-0 w-full h-full z-[9999] flex justify-center items-center bg-[#28293d94] text-black overflow-hidden">
      <div
        className={`AccessCode w-[90vw] max-w-[600px] bg-white rounded-2xl p-5 mx-4 ${
          isPinMode ? "h-[300px]" : "h-[600px]"
        } max-h-[90vh] overflow-y-auto`}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            {isPinMode && (
              <>
                <button
                  onClick={() => setShowStartPin(true)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    showStartPin
                      ? "bg-[#F47621] text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Start PIN
                </button>
                <button
                  onClick={() => setShowStartPin(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    !showStartPin
                      ? "bg-[#F47621] text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  disabled={!endPinCode}
                  title={
                    endPinCode ? "Show ending PIN" : "Ending PIN not available yet"
                  }
                >
                  End PIN
                </button>
              </>
            )}
          </div>
          <div
            className="cursor-pointer"
            onClick={CodeClose}
          >
            <IoClose
              size={30}
              className="hover:bg-gray-100 rounded-full p-1 transition-colors duration-200"
            />
          </div>
        </div>
        <div className="h-[90%] mt-5 flex flex-col items-center justify-center gap-8">
          {isPinMode && isLoading ? (
            <div className="flex flex-col items-center gap-4 text-gray-600">
              <svg className="animate-spin h-10 w-10 text-[#F47621]" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              <p className="text-lg sm:text-xl font-semibold">Loading PIN codes...</p>
            </div>
          ) : QrCode ? (
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
                {(showStartPin ? num : endNum).length > 0 ? (
                  (showStartPin ? num : endNum).map((digit, index) => (
                    <span
                      key={index}
                      className="CodeNumber text-lg sm:text-2xl border-2 border-[#e0e0e6] rounded-lg p-3 sm:p-5 w-12 sm:w-16 text-center flex-shrink-0"
                    >
                      {digit}
                    </span>
                  ))
                ) : (
                  <span
                    className="text-base sm:text-lg text-gray-500 bg-gray-100 border border-gray-200 rounded-lg px-4 py-3"
                  >
                    {showStartPin
                      ? "Start PIN not available yet"
                      : "End PIN not available yet"}
                  </span>
                )}
              </div>
              <span className="CodeInfo text-xl sm:text-2xl font-bold text-center px-4">
                {showStartPin || !isPinMode
                  ? "Please enter your starting PIN code"
                  : "Please enter your ending PIN code"}
              </span>
              {error && (
                <p className="text-sm text-red-500 mt-2">
                  Unable to load PIN codes. Please try again later.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccessCode;
