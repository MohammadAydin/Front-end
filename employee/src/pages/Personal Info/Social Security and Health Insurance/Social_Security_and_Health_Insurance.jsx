import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import schema_social_Insurance from "./schema_social_Insurance";
import InputField from "../../../components/FormElements/InputField";
import SelectField from "../../../components/FormElements/SelectField";
import SubmitButtons from "../../../components/FormElements/SubmitButtons";
import BirthCertificateInput from "./BirthCertificateInput";
import customFetch from "../../../utils/axios";
import { OpenSuccsessPopup } from "../../../store/OpenSuccsessPopup";
import { useTranslation } from "react-i18next";
import useData from "../../../../../employer/src/hooks/useData";
import { toast } from "react-toastify";
import "./Social_Security_and_Health_Insurance.css";

const Social_Security_and_Health_Insurance = () => {
  const { t } = useTranslation();
  const { OpenSuccsess } = OpenSuccsessPopup();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema_social_Insurance),
  });

  const social_Insurance_inputs = [
    {
      name: "tax_identification_number",
      label: t("socialSecurity.fields.taxIdentificationNumber"),
      type: "text",
    },
    {
      name: "social_insurance_number",
      label: t("socialSecurity.fields.socialSecurityNumber"),
      type: "text",
    },
    {
      name: "health_insurance_company_name",
      label: t("socialSecurity.fields.healthInsurance"),
      type: "text",
    },
    {
      name: "health_insurance_number",
      label: t("socialSecurity.fields.insuranceNumber"),
      type: "text",
    },
    // {
    //   name: "number_of_children",
    //   label: t("socialSecurity.fields.numberOfChildren"),
    //   type: "number",
    //   step: "any",
    // },
  ];

  const social_Insurance_select = [
    {
      name: "marital_status",
      label: t("socialSecurity.fields.maritalStatus"),
      optians: [
        {
          value: "single",
          label: t("socialSecurity.maritalStatusOptions.single"),
        },
        {
          value: "married",
          label: t("socialSecurity.maritalStatusOptions.married"),
        },
        {
          value: "divorced",
          label: t("socialSecurity.maritalStatusOptions.divorced"),
        },
        {
          value: "widowed",
          label: t("socialSecurity.maritalStatusOptions.widowed"),
        },
      ],
    },
    {
      name: "health_insurance_type",
      label: t("socialSecurity.fields.healthInsuranceType"),
      optians: [
        {
          value: "public",
          label: t("socialSecurity.insuranceTypeOptions.public"),
        },
        {
          value: "private",
          label: t("socialSecurity.insuranceTypeOptions.private"),
        },
      ],
    },
    {
      name: "tax_bracket",
      label: t("socialSecurity.fields.taxBracket"),
      optians: [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5" },
        { value: "6", label: "6" },
      ],
    },
  ];

  const add_Social_Insurance_Mutation = useMutation({
    mutationFn: (formData) =>
      customFetch.post("/profile/social-insurance-info", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    onSuccess: () => {
      OpenSuccsess();
      navigate("/Personal info");
    },
    onError: (error) => {
      console.log("error");
      console.log(error);
      toast.error(error?.response?.data?.message);
    },
  });

  const maritalStatus = watch("marital_status");
  const numberOfChildren = watch("number_of_children");

  const submit = (data) => {
    const formData = new FormData();

    formData.append("social_insurance_number", data.social_insurance_number);
    formData.append(
      "health_insurance_company",
      data.health_insurance_company_name
    );
    formData.append("health_insurance_number", data.health_insurance_number);
    formData.append("health_insurance_type", data.health_insurance_type);
    formData.append(
      "tax_identification_number",
      data.tax_identification_number
    );
    formData.append("tax_bracket", data.tax_bracket);
    formData.append("marital_status", data.marital_status);
    formData.append("number_of_children", data.number_of_children);

    Object.values(data.children_documents || {}).forEach((fileList) => {
      if (fileList && fileList[0])
        formData.append("children_documents[]", fileList[0]);
    });

    add_Social_Insurance_Mutation.mutate(formData);
  };

  return (
    <div className="Social_Insurance p-[28px] py-[58px]">
      <h2 className="text-2xl font-bold mb-2">{t("socialSecurity.title")}</h2>
      <p className="text-[#555770] mb-10 text-lg">
        {t("socialSecurity.description")}
      </p>

      <form onSubmit={handleSubmit(submit)}>
        <div className="Social_Insurance_grid w-full grid grid-cols-2 gap-5 mb-8">
          {social_Insurance_inputs.map((input) => (
            <InputField
              key={input.name}
              register={register}
              errors={errors}
              label={input.label}
              name={input.name}
              type={input.type}
              step={input.step || 1}
            />
          ))}

          <div>
            <div className="InputField relative input-group ">
              <input
                {...register("number_of_children")}
                className="input-control input_children"
                type="number"
                id={"number_of_children"}
                name={"number_of_children"}
                placeholder=""
                // defaultValue={defaultvalue && `${defaultvalue}`}
                step={0.5}
                onWheel={(e) => e.currentTarget.blur()}
              />
              <label
                className="label-email absolute z-1 left-3 top-[50%] translate-y-[-50%] px-2 bg-white copy"
                htmlFor={"number_of_children"}
              >
                {t("socialSecurity.fields.numberOfChildren")}
              </label>
            </div>
            {errors["number_of_children"] && (
              <p className="InputErrors text-red-500 mt-3.5 mb-1">
                {errors["number_of_children"].message}
              </p>
            )}
          </div>

          {social_Insurance_select.map((select) => (
            <SelectField
              key={select.name}
              name={select.name}
              label={select.label}
              register={register}
              errors={errors}
              setValue={setValue}
              value={watch(select.name)}
              Options={select.optians}
            />
          ))}
        </div>

        {watch("number_of_children") > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-2">
              Children's Birth Certificate
            </h2>
            <div>
              {Array.from(
                { length: watch("number_of_children") },
                (_, index) => (
                  <BirthCertificateInput
                    key={index}
                    index={index}
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    watch={watch}
                  />
                )
              )}
            </div>
          </>
        )}

        <SubmitButtons
          prevLabel={t("socialSecurity.back")}
          onCancel={() => navigate("/Personal info")}
        />
      </form>
    </div>
  );
};

export default Social_Security_and_Health_Insurance;
