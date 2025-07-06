import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Employment_schema from "./schema_Employment_data";
import { employmentQuestions } from "./Employment_data_inputs";
import RadioGroupField from "./RadioGroupField";
import SubmitButtons from "../../../components/FormElements/SubmitButtons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import "../../Responsive css/Personal_info.css";
import { OpenSuccsessPopup } from "../../../store/OpenSuccsessPopup";
import customFetch from "../../../utils/axios";

const Employment_data = () => {
  const { OpenSuccsess } = OpenSuccsessPopup();
  const [serverError, setServerError] = useState("");

  const addEmploymentDataMutatuin = useMutation({
    mutationFn: (EmploymentData) =>
      customFetch
        .post("https://woundwann.de/v1/employee/info", EmploymentData)
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
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(Employment_schema) });

  const Submit = (data) => {
    console.log(data);

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
      <h2 className="text-2xl font-bold mb-2">Complete Employment data</h2>
      <p className="text-[#555770] mb-10 text-lg ">
        Please, complete your Employment data
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
            I accept the{" "}
            <a href="#" className="text-[#F47621] underline">
              Terms and Conditions
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
          prevLabel="Back"
          onCancel={() => navigate("/Personal info")}
        />
      </form>
    </div>
  );
};

export default Employment_data;
