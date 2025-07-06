import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import signatureSchema from "./signatureSchema";
import SignaturePad from "./SignaturePad";
import SubmitButtons from "../../../components/FormElements/SubmitButtons";
import FileUploader from "../../../components/FormElements/FileUploader";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import "../../Responsive css/Personal_info.css";
import { OpenSuccsessPopup } from "../../../store/OpenSuccsessPopup";

const Signature = () => {
  const { OpenSuccsess } = OpenSuccsessPopup();
  const [serverError, setServerError] = useState("");

  const addSignatureMutatuin = useMutation({
    mutationFn: (Signature) =>
      customFetch
        .post("https://woundwann.de/v1/upload-signature", Signature, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data),

    onSuccess: () => {
      OpenSuccsess();
      navigate("/Personal info");
    },

    onError: (error) => {
      const message = error?.response?.data?.message || "Something went wrong!";
      setServerError(message);
    },
  });
  const navigate = useNavigate();
  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signatureSchema),
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("signature", data.signature);

    addSignatureMutatuin.mutate(formData);
  };
  return (
    <div className="Signature p-[28px] py-[58px]">
      <h2 className="text-2xl font-bold mb-2">Complete Signature</h2>
      <p className="text-[#555770] mb-10 text-lg ">
        Please , Complete yuor Signature
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <SignaturePad setValue={setValue} error={errors.signature} />

        <span className="font-bold">or Upload Your Signature</span>
        <FileUploader
          register={register}
          setValue={setValue}
          error={errors}
          name={"signature"}
          label={"Upload Signature"}
        />
        {serverError && (
          <p className="text-red-600 font-medium text-start mb-4">
            {serverError}
          </p>
        )}
        <SubmitButtons
          prevLabel="Back"
          onCancel={() => navigate("/Personal info")}
        />
      </form>
    </div>
  );
};

export default Signature;
