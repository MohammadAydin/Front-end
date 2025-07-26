import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import InputField from "../../../components/FormElements/InputField";
import SubmitButtons from "../../../components/FormElements/SubmitButtons";
import FileUploader from "../../../components/FormElements/FileUploader";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import bankingInfoSchema from "./BankingInfoSchema";
import "../../Responsive css/Personal_info.css";
import { OpenSuccsessPopup } from "../../../store/OpenSuccsessPopup";
import { useTranslation } from "react-i18next";
import useData from "../../../hooks/useData";

const Banking_info = () => {
  const { t } = useTranslation();
  const { OpenSuccsess } = OpenSuccsessPopup();
  const [serverError, setServerError] = useState("");
  const [searchParams] = useSearchParams();
  const isUploaded = searchParams.get("uploaded") === "true";
  const { data: BankingInfo } = useData("/profile/banking-info");

  const inputs = [
    {
      name: "AcountHolder",
      label: t("bankingInfo.fields.accountHolder"),
      type: "text",
    },
    { name: "BankName", label: t("bankingInfo.fields.bankName"), type: "text" },
    { name: "BIC", label: t("bankingInfo.fields.bic"), type: "text" },
    { name: "IBAN", label: t("bankingInfo.fields.iban"), type: "text" },
  ];

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
        error?.response?.data?.message || t("bankingInfo.error");

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
    resolver: zodResolver(bankingInfoSchema(isUploaded)),
    defaultValues: {
      ["bankCard"]: null,
    },
  });

  useEffect(() => {
    if (isUploaded && BankingInfo) {
      setValue("BankName", BankingInfo.bank_name || "");
      setValue("IBAN", BankingInfo.iban || "");
      setValue("BIC", BankingInfo.bic || "");
      setValue("AcountHolder", BankingInfo.account_holder || "");
    }
  }, [BankingInfo, setValue]);

  const submit = (data) => {
    const formData = new FormData();
    formData.append("bank_name", data.BankName);
    formData.append("iban", data.IBAN);
    formData.append("bic", data.BIC);
    formData.append("account_holder", data.AcountHolder);
    if (data.bankCard instanceof File) {
      formData.append("bank_card_document", data.bankCard);
    }
    addBankingMutatuin.mutate(formData);
  };

  return (
    <div className="Banking_info p-[28px] py-[58px]">
      <h2 className="text-2xl font-bold mb-2">
        {isUploaded && BankingInfo ? "Banking Info " : "Complete Banking Info "}
      </h2>
      <p className="text-[#555770] mb-10 text-lg ">
        {isUploaded && BankingInfo
          ? "You have already uploaded your banking info"
          : "Please , Complete your banking info"}
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
          <h3 className="text-lg font-bold">{t("bankingInfo.bankCard")}</h3>
          <FileUploader
            name={"bankCard"}
            label={t("bankingInfo.uploadBankCard")}
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
          submitLabel={isUploaded ? "Submit" : "Add"}
          prevLabel={t("bankingInfo.back")}
          onCancel={() => navigate("/Personal info")}
        />
      </form>
    </div>
  );
};

export default Banking_info;
