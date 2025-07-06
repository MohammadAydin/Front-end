import { useForm } from "react-hook-form";
import { useState } from "react";
import InputField from "../../../components/FormElements/InputField";
import SubmitButtons from "../../../components/FormElements/SubmitButtons";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  social_Insurance_inputs,
  social_Insurance_select,
} from "./social_Insurance_inputs";
import schema_social_Insurance from "./schema_social_Insurance";
import SelectField from "../../../components/FormElements/SelectField";
import "../../Responsive css/Personal_info.css";
import { OpenSuccsessPopup } from "../../../store/OpenSuccsessPopup";

const Social_Security_and_Health_Insurance = () => {
  const { OpenSuccsess } = OpenSuccsessPopup();
  const [serverError, setServerError] = useState("");

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
      const message = error?.response?.data?.message || "Something went wrong!";
      setServerError(message);
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
        Complete Social Security and Health Insurance
      </h2>
      <p className="text-[#555770] mb-10 text-lg ">
        Please , Complete yuor Social security and Health Insurance detIails
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
              register={register}
              errors={errors}
              setValue={setValue}
              value={watch(select.name)}
              Options={select.optians}
            />
          ))}
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

export default Social_Security_and_Health_Insurance;
