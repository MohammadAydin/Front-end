import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Employment_schema from "./schema_Employment_data";
import RadioGroupField from "./RadioGroupField";
import SubmitButtons from "../../../components/FormElements/SubmitButtons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import "../../Responsive css/Personal_info.css";
import { OpenSuccsessPopup } from "../../../store/OpenSuccsessPopup";
import customFetch from "../../../utils/axios";
import { getApiUrl } from "../../../config/api";
import { useTranslation } from "react-i18next";

const Employment_data = () => {
  const { t } = useTranslation();
  const { OpenSuccsess } = OpenSuccsessPopup();
  const [serverError, setServerError] = useState("");

  const employmentQuestions = [
    {
      type: "radio",
      name: "school_qualification",
      label: t('employmentData.fields.highestDegree'),
      options: [
        { value: "Technical/Abitur", label: t('employmentData.qualificationOptions.technical') },
        {
          value: "Intermediate school leaving certificate",
          label: t('employmentData.qualificationOptions.intermediate'),
        },
        {
          value: "Secondary/elementary school leaving certificate",
          label: t('employmentData.qualificationOptions.secondary'),
        },
        {
          value: "without school leaving certificate",
          label: t('employmentData.qualificationOptions.none'),
        },
      ],
    },
    {
      type: "radio",
      name: "vocational_training",
      label: t('employmentData.fields.vocationalTraining'),
      options: [
        { value: "true", label: t('employmentData.yesNoOptions.yes') },
        { value: "false", label: t('employmentData.yesNoOptions.no') },
      ],
    },
    {
      type: "radio",
      name: "pregnant",
      label: t('employmentData.fields.pregnancy'),
      options: [
        { value: "true", label: t('employmentData.yesNoOptions.yes') },
        { value: "false", label: t('employmentData.yesNoOptions.no') },
      ],
    },
    {
      type: "radio",
      name: "corona",
      label: t('employmentData.fields.coronaVaccine'),
      options: [
        { value: "true", label: t('employmentData.yesNoOptions.yes') },
        { value: "false", label: t('employmentData.yesNoOptions.no') },
      ],
    },
    {
      type: "radio",
      name: "hepatitis",
      label: t('employmentData.fields.hepatitisVaccine'),
      options: [
        { value: "true", label: t('employmentData.yesNoOptions.yes') },
        { value: "false", label: t('employmentData.yesNoOptions.no') },
      ],
    },
    {
      type: "radio",
      name: "over18",
      label: t('employmentData.fields.ageConfirmation'),
      options: [
        { value: "true", label: t('employmentData.yesNoOptions.yes') },
        { value: "false", label: t('employmentData.yesNoOptions.no') },
      ],
    },
  ];

  const addEmploymentDataMutatuin = useMutation({
    mutationFn: (EmploymentData) =>
      customFetch
        .post(getApiUrl("/employee/info"), EmploymentData)
        .then((res) => res.data),

    onSuccess: () => {
      OpenSuccsess();
      navigate("/Personal info");
    },

    onError: (error) => {
      const errors = error?.response?.data?.errors;
      const fallbackMessage =
        error?.response?.data?.message || t('employmentData.error');

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
    formState: { errors },
  } = useForm({ resolver: zodResolver(Employment_schema) });

  const Submit = (data) => {
    // fun to make true and false  boolean not string
    const clean = (value) => value === "true";
    addEmploymentDataMutatuin.mutate({
      highest_degree: data.school_qualification,
      has_vocational_training: clean(data.vocational_training),
      pregnancy: clean(data.pregnant),
      corona_vaccinated: clean(data.corona),
      hepatitis_vaccinated: clean(data.hepatitis),
      confirmed_age: clean(data.over18),
      accepted_terms_conditions: data.terms,
    });
  };

  return (
    <div className="Employment_data p-[28px] py-[58px]">
      <h2 className="text-2xl font-bold mb-2">{t('employmentData.title')}</h2>
      <p className="text-[#555770] mb-10 text-lg ">
        {t('employmentData.description')}
      </p>

      <form onSubmit={handleSubmit(Submit)} className="Questions space-y-6 p-6">
        {employmentQuestions.map((q) => (
          <RadioGroupField
            key={q.name}
            {...q}
            register={register}
            error={errors[q.name]}
          />
        ))}

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="terms"
            {...register("terms")}
            className="mt-1"
          />
          <label htmlFor="terms">
            {t('employmentData.termsAcceptance')}{" "}
            <a href="#" className="text-[#F47621] underline">
              {t('employmentData.termsAndConditions')}
            </a>
          </label>
        </div>
        {errors.terms && (
          <p className="text-red-600 text-sm">{errors.terms.message}</p>
        )}
        {serverError && (
          <p className="text-red-600 font-medium text-start mb-4">
            {serverError}
          </p>
        )}
        <SubmitButtons
          prevLabel={t('employmentData.back')}
          onCancel={() => navigate("/Personal info")}
        />
      </form>
    </div>
  );
};

export default Employment_data;
