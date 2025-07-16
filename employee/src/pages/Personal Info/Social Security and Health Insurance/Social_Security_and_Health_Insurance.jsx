import { useForm } from "react-hook-form";
import { useState } from "react";
import InputField from "../../../components/FormElements/InputField";
import SubmitButtons from "../../../components/FormElements/SubmitButtons";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import schema_social_Insurance from "./schema_social_Insurance";
import SelectField from "../../../components/FormElements/SelectField";
import "../../Responsive css/Personal_info.css";
import { OpenSuccsessPopup } from "../../../store/OpenSuccsessPopup";
import { useTranslation } from "react-i18next";

const Social_Security_and_Health_Insurance = () => {
  const { t } = useTranslation();
  const { OpenSuccsess } = OpenSuccsessPopup();
  const [serverError, setServerError] = useState("");

  const social_Insurance_inputs = [
    {
      name: "tax_identification_number",
      label: t('socialSecurity.fields.taxIdentificationNumber'),
      type: "text",
    },
    {
      name: "social_insurance_number",
      label: t('socialSecurity.fields.socialSecurityNumber'),
      type: "text",
    },
    {
      name: "health_insurance_company_name",
      label: t('socialSecurity.fields.healthInsurance'),
      type: "text",
    },
    {
      name: "health_insurance_number",
      label: t('socialSecurity.fields.insuranceNumber'),
      type: "text",
    },
    {
      name: "number_of_children",
      label: t('socialSecurity.fields.numberOfChildren'),
      type: "number",
    },
  ];

  const social_Insurance_select = [
    {
      name: "marital_status",
      label: t('socialSecurity.fields.maritalStatus'),
      options: [
        { value: "single", label: t('socialSecurity.maritalStatusOptions.single') },
        { value: "married", label: t('socialSecurity.maritalStatusOptions.married') },
        { value: "divorced", label: t('socialSecurity.maritalStatusOptions.divorced') },
        { value: "widowed", label: t('socialSecurity.maritalStatusOptions.widowed') }
      ],
    },
    {
      name: "health_insurance_type",
      label: t('socialSecurity.fields.healthInsuranceType'),
      options: [
        { value: "public", label: t('socialSecurity.insuranceTypeOptions.public') },
        { value: "private", label: t('socialSecurity.insuranceTypeOptions.private') }
      ],
    },
    {
      name: "tax_bracket",
      label: t('socialSecurity.fields.taxBracket'),
      options: [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5" },
        { value: "6", label: "6" }
      ],
    },
  ];

  const add_Social_Insurance_Mutatuin = useMutation({
    mutationFn: (insurance) =>
      customFetch
        .post(
          "https://woundwann.de/v1/profile/social-insurance-info",
          insurance
        )
        .then((res) => {
          res.data;
        }),

    onSuccess: () => {
      OpenSuccsess();
      navigate("/Personal info");
    },

    onError: (error) => {
      const errors = error?.response?.data?.errors;
      const fallbackMessage =
        error?.response?.data?.message || t('socialSecurity.error');

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
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema_social_Insurance),
    defaultValues: {
      ["number_of_children"]: 0,
    },
  });

  // send data to backend
  const submit = (data) => {
    add_Social_Insurance_Mutatuin.mutate({
      social_insurance_number: data.social_insurance_number,
      health_insurance_company: data.health_insurance_company_name,
      health_insurance_number: data.health_insurance_number,
      health_insurance_type: data.health_insurance_type,
      tax_identification_number: data.tax_identification_number,
      tax_bracket: data.tax_bracket,
      marital_status: data.marital_status,
      number_of_children: data.number_of_children,
    });
  };

  return (
    <div className="Social_Insurance p-[28px] py-[58px]">
      <h2 className="text-2xl font-bold mb-2">
        {t('socialSecurity.title')}
      </h2>
      <p className="text-[#555770] mb-10 text-lg ">
        {t('socialSecurity.description')}
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
            />
          ))}

          {social_Insurance_select.map((select) => (
            <SelectField
              key={select.name}
              name={select.name}
              label={select.label}
              register={register}
              errors={errors}
              setValue={setValue}
              value={watch(select.name)}
              Options={select.options}
            />
          ))}
        </div>
        {serverError && (
          <p className="text-red-600 font-medium text-start mb-4">
            {serverError}
          </p>
        )}
        <SubmitButtons
          prevLabel={t('socialSecurity.back')}
          onCancel={() => navigate("/Personal info")}
        />
      </form>
    </div>
  );
};

export default Social_Security_and_Health_Insurance;
