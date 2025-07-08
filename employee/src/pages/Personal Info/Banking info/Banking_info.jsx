import { useForm } from "react-hook-form";
import { useState } from "react";
import InputField from "../../../components/FormElements/InputField";
import SubmitButtons from "../../../components/FormElements/SubmitButtons";
import FileUploader from "../../../components/FormElements/FileUploader";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import bankingInfoSchema from "./BankingInfoSchema";
import "../../Responsive css/Personal_info.css";
import { OpenSuccsessPopup } from "../../../store/OpenSuccsessPopup";

const inputs = [
  { name: "AcountHolder", label: "Acount holder", type: "text" },
  { name: "BankName", label: "Bank Name", type: "text" },
  { name: "BIC", label: "BIC", type: "text" },
  { name: "IBAN", label: "IBAN", type: "text" },
];

const Banking_info = () => {
  const { OpenSuccsess } = OpenSuccsessPopup();
  const [serverError, setServerError] = useState("");

  const addBankingMutatuin = useMutation({
    mutationFn: (formData) =>
      customFetch
        .post("https://woundwann.de/v1/profile/banking-info", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data),

    onSuccess: () => {
      OpenSuccsess();
      navigate("/Personal info");
    },
    onError: (error) => {
      console.log(error);

      const errors = error?.response?.data?.errors;
      const fallbackMessage =
        error?.response?.data?.message || "Something went wrong!";

      if (errors && typeof errors === "object") {
        const firstField = Object.keys(errors)[0];
        const firstMessage = errors[firstField]?.[0];

        setServerError(firstMessage || fallbackMessage);
      } else {
        setServerError(fallbackMessage);
      }
    },
  });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bankingInfoSchema),
    defaultValues: {
      ["bankCard"]: null,
    },
  });

  const submit = (data) => {
    const formData = new FormData();
    formData.append("bank_name", data.BankName);
    formData.append("iban", data.IBAN);
    formData.append("bic", data.BIC);
    formData.append("account_holder", data.AcountHolder);
    formData.append("bank_card_document", data.bankCard);

    addBankingMutatuin.mutate(formData);
  };
  return (
    <div className="Banking_info p-[28px] py-[58px]">
      <h2 className="text-2xl font-bold mb-2">Complete Banking Info</h2>
      <p className="text-[#555770] mb-10 text-lg ">
        Please , Complete your banking info
      </p>
      <form encType="multipart/form-data" onSubmit={handleSubmit(submit)}>
        <div className="Banking_info_grid w-full grid grid-cols-2 gap-5 mb-8">
          {inputs.map((input) => (
            <InputField
              key={input.name}
              register={register}
              errors={errors}
              label={input.label}
              name={input.name}
              type={input.type}
            />
          ))}
        </div>
        <div>
          <h3 className="text-lg font-bold">Bank card</h3>
          <FileUploader
            name={"bankCard"}
            label={"Upload front card"}
            register={register}
            error={errors}
            setValue={setValue}
          />
        </div>
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

export default Banking_info;
