import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import signatureSchema from "./signatureSchema";
import SignaturePad from "./SignaturePad";
import SubmitButtons from "../../../components/FormElements/SubmitButtons";
import FileUploader from "../../../components/FormElements/FileUploader";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import "../../Responsive css/Personal_info.css";
import { OpenSuccsessPopup } from "../../../store/OpenSuccsessPopup";
import { useTranslation } from "react-i18next";
import useData from "../../../hooks/useData";

const Signature = () => {
  const { t } = useTranslation();
  const { OpenSuccsess } = OpenSuccsessPopup();
  const [serverError, setServerError] = useState("");
  const [searchParams] = useSearchParams();
  const isUploaded = searchParams.get("uploaded") === "true";
  const { data: UplodedSignature } = useData("/signature");
  const [showSignature, setShowSignature] = useState(false);
  const navigate = useNavigate();

  const addSignatureMutatuin = useMutation({
    mutationFn: (Signature) =>
      customFetch
        .post("https://woundwann.de/v1/upload-signature", Signature, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data),

    onSuccess: () => {
      OpenSuccsess();
      navigate("/Personal info?uploaded=true");
    },

    onError: (error) => {
      const errors = error?.response?.data?.errors;
      const fallbackMessage =
        error?.response?.data?.message || t("signature.error");

      if (errors && typeof errors === "object") {
        const firstField = Object.keys(errors)[0];
        const firstMessage = errors[firstField]?.[0];

        setServerError(firstMessage || fallbackMessage);
      } else {
        setServerError(fallbackMessage);
      }
    },
  });
  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signatureSchema()),
    defaultValues: {
      signature: null,
    },
  });

  useEffect(() => {
    register("signature");
  }, [register]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("signature", data.signature);

    addSignatureMutatuin.mutate(formData);
  };
  return (
    <div className="Signature p-[28px] py-[58px]">
      <h2 className="text-2xl font-bold mb-2">
        {isUploaded && UplodedSignature ? "Signature" : t("signature.title")}
      </h2>
      <p className="text-[#555770] mb-5 text-lg ">
        {isUploaded && UplodedSignature
          ? "You have already uploaded a signature"
          : t("signature.description")}
      </p>
      {isUploaded && UplodedSignature && (
        <>
          <button
            onClick={() => setShowSignature(true)}
            className="w-full mb-10 text-[#F47621] bg-[#FFDFC6] font-bold rounded-xl py-3"
          >
            showSignature
          </button>
          {showSignature && (
            <div className="w-full h-[100vh] fixed z-20 top-0 left-0 flex justify-center items-center bg-[#28293d94] text-black">
              <div className="showSignature w-[550px] h-[450px] bg-white rounded-2xl p-5 flex flex-col justify-between">
                <p className="text-xl font-bold">
                  {t("signature.yourSignature")}
                </p>
                <div className="h-[250px] border border-[#555770] rounded-2xl flex justify-center items-center">
                  <img
                    src={`${
                      UplodedSignature.data?.url
                    }?t=${new Date().getTime()}`}
                    alt="Uploaded Signature"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <button
                  className="w-full bg-[#F47621] text-white text-lg font-extrabold px-10 py-2 rounded-lg mt-4 hover:bg-[#EE6000]"
                  onClick={() => setShowSignature(false)}
                >
                  {t("signature.close")}
                </button>
              </div>
            </div>
          )}
        </>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <SignaturePad setValue={setValue} error={errors.signature} />

        <span className="font-bold">orUpload</span>
        <FileUploader
          register={register}
          setValue={setValue}
          error={errors}
          name={"signature"}
          label={t("signature.uploadSignature")}
        />
        {serverError && (
          <p className="text-red-600 font-medium text-start mb-4">
            {serverError}
          </p>
        )}
        <SubmitButtons
          submitLabel={isUploaded ? t("signature.Submit") : "Add"}
          prevLabel={t("signature.back")}
          onCancel={() => navigate("/Personal info")}
        />
      </form>
    </div>
  );
};

export default Signature;
