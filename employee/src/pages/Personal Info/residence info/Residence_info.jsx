import { useState } from "react";
import { ID_card } from "./Residence_inputs";
import { useForm } from "react-hook-form";
import InputField from "../../../components/FormElements/InputField";
import SelectField from "../../../components/FormElements/SelectField";
import FileUploader from "../../../components/FormElements/FileUploader";
import SubmitButtons from "../../../components/FormElements/SubmitButtons";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import residenceSchema from "./schema_Residence";
import "../../Responsive css/Personal_info.css";
import { OpenSuccsessPopup } from "../../../store/OpenSuccsessPopup";
import NationalitySelect from "./NationalitySelect";
import handleNationality from "../../../store/HandleNationality";

const Residence_info = () => {
  const navigate = useNavigate();
  const { selectedNationality } = handleNationality();

  const { OpenSuccsess } = OpenSuccsessPopup();
  const [serverError, setServerError] = useState("");

  const add_Residence_info_Mutatuin = useMutation({
    mutationFn: (info) =>
      customFetch
        .post("https://woundwann.de/v1/profile/residence-work-permits", info, {
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

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(residenceSchema) });

  const work_permit = watch("has_work_permit");

  // change the date from DD.MM.YYYY to YYYY-MM-DD
  const formatDateToISO = (dateString) => {
    const [day, month, year] = dateString.split(".");
    return `${year}-${month}-${day}`;
  };

  const submit = (data) => {
    const formData = new FormData();
    formData.append("nationality", data.nationality);
    formData.append("id_front", data.id_front);
    formData.append("id_back", data.id_back);
    formData.append("place_of_birth", data.place_of_birth);

    // if not Germany we ask for work permit
    if (selectedNationality?.label !== "Germany") {
      const formattedDate = formatDateToISO(data.permit_valid_until);
      console.log(formattedDate);
      formData.append("permit_valid_until", formattedDate);
      formData.append(
        "has_work_permit",
        data.has_work_permit === "Yes" ? 1 : 0
      );
      formData.append("work_permit_document", data.permit_document);
    }
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    add_Residence_info_Mutatuin.mutate(formData);
  };
  return (
    <div className="Residence_info p-[28px] py-[58px]">
      <h2 className="text-2xl font-bold mb-2">Complete residence info</h2>
      <p className="text-[#555770] mb-10 text-lg ">
        Please , Complete your info contiue the process
      </p>
      <form onSubmit={handleSubmit(submit)}>
        <NationalitySelect
          register={register}
          setValue={setValue}
          errors={errors}
          name={"nationality"}
        />
        <div className="Residence_info_grid grid grid-cols-2 gap-5 mb-8">
          {selectedNationality?.label !== "Germany" && (
            <SelectField
              register={register}
              setValue={setValue}
              name={"has_work_permit"}
              errors={errors}
              Options={["Yes", "No"]}
            />
          )}
          <InputField
            register={register}
            errors={errors}
            label={"Place of birth"}
            name={"place_of_birth"}
            type={"text"}
          />
        </div>
        {work_permit == "Yes" && selectedNationality?.label !== "Germany" && (
          <>
            <div className="mb-8">
              <InputField
                register={register}
                errors={errors}
                label={"permit valid until DD.MM.YYYY"}
                name={"permit_valid_until"}
                type={"text"}
              />
            </div>
            <p className="text-lg font-bold">Work permit document</p>
            <div>
              <FileUploader
                name={"permit_document"}
                label={"front"}
                register={register}
                setValue={setValue}
                error={errors}
              />
            </div>
          </>
        )}
        <p className="text-lg font-bold">Copy of ID card / passport</p>
        <div className="ID_Upload flex gap-5">
          {ID_card.map((input) => (
            <FileUploader
              key={input.name}
              name={input.name}
              label={input.label}
              register={register}
              setValue={setValue}
              error={errors}
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

export default Residence_info;
