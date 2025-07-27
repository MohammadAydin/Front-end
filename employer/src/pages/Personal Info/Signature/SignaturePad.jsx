import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { FaRegTrashAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

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
      <div className="flex justify-between items-center mb-2">
        <label className="font-bold">{t('signature.yourSignature')}</label>
        <button
          type="button"
          onClick={handleClear}
          className="text-red-500 flex items-center gap-1"
        >
          <FaRegTrashAlt size={16} /> {t('signature.deleteSignature')}
        </button>
      </div>

      <div className="relative">
        <SignatureCanvas
          ref={sigCanvas}
          penColor="black"
          canvasProps={{
            className: "w-full h-[350px] bg-gray-100 rounded-xl mb-10",
          }}
          onEnd={handleEnd}
        />

        <p className="absolute top-5 left-5 inset-0 text-gray-400 pointer-events-none z-1">
          {t('signature.signHere')}
        </p>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}
    </div>
  );
};

export default SignaturePad;
