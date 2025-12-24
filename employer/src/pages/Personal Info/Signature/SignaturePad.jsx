import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { FaRegTrashAlt, FaSignature } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

const SignaturePad = ({ setValue, error }) => {
  const { t } = useTranslation();
  const sigCanvas = useRef();

  const handleClear = () => {
    sigCanvas.current.clear();
    setValue("signature", null, { shouldValidate: true });
  };

  const handleEnd = async () => {
    const isEmpty = sigCanvas.current.isEmpty();
    if (!isEmpty) {
      const dataUrl = sigCanvas.current.toDataURL("image/png");
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], "signature.png", { type: "image/png" });
      setValue("signature", file, { shouldValidate: true });
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
          <div className="bg-gradient-to-br from-[#F47621]/10 to-[#ff8c42]/10 rounded-lg p-1.5">
            <FaSignature className="text-[#F47621]" size={18} />
          </div>
          {t("signature.yourSignature") || "Your Signature"}
        </label>
        <button
          type="button"
          onClick={handleClear}
          className="text-red-500 hover:text-red-700 flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all duration-300 font-semibold text-sm"
        >
          <FaRegTrashAlt size={16} />
          {t("signature.deleteSignature") || "Clear"}
        </button>
      </div>

      <div className="relative border-2 border-gray-200 rounded-xl overflow-hidden bg-white shadow-inner">
        <SignatureCanvas
          ref={sigCanvas}
          penColor="#1f2937"
          backgroundColor="#ffffff"
          canvasProps={{
            className: "w-full h-[300px] md:h-[350px]",
          }}
          onEnd={handleEnd}
        />

        <p className="absolute top-6 left-6 text-gray-400 pointer-events-none text-sm font-medium">
          {t('signature.signHere') || "Sign here..."}
        </p>
      </div>

      {error && (
        <div className="mt-3 bg-red-50 border-2 border-red-200 rounded-lg p-3 flex items-start gap-2">
          <HiOutlineExclamationCircle className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
          <p className="text-red-700 text-sm">{error.message}</p>
        </div>
      )}
    </div>
  );
};

export default SignaturePad;
