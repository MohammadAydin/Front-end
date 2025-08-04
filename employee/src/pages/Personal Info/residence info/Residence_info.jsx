import { useEffect, useState } from "react";
import { ID_card } from "./Residence_inputs";
import { useForm } from "react-hook-form";
import InputField from "../../../components/FormElements/InputField";
import SelectField from "../../../components/FormElements/SelectField";
import FileUploader from "../../../components/FormElements/FileUploader";
import SubmitButtons from "../../../components/FormElements/SubmitButtons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import residenceSchema from "./schema_Residence";
import "../../Responsive css/Personal_info.css";
import { OpenSuccsessPopup } from "../../../store/OpenSuccsessPopup";
import NationalitySelect from "./NationalitySelect";
import handleNationality from "../../../store/HandleNationality";
import { useTranslation } from "react-i18next";
import useData from "../../../hooks/useData";

const Residence_info = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { selectedNationality, setSelectedNationality } = handleNationality();

  const { OpenSuccsess } = OpenSuccsessPopup();
  const [serverError, setServerError] = useState("");
  const [searchParams] = useSearchParams();
  const isUploaded = searchParams.get("uploaded") === "true";
  const { data: ResidenceInfo } = useData("/profile/residence-work-permits");

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
      const errors = error?.response?.data?.errors;
      const fallbackMessage =
        error?.response?.data?.message || t("residenceInfo.error");

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
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(residenceSchema(isUploaded, t)) });

  useEffect(() => {
    if (isUploaded && ResidenceInfo) {
      setValue("nationality", ResidenceInfo.nationality);
      setValue("place_of_birth", ResidenceInfo.place_of_birth);
      setSelectedNationality({
        label: ResidenceInfo.nationality,
        value: ResidenceInfo.nationality,
      });

      if (ResidenceInfo.nationality !== "Germany") {
        setValue(
          "has_work_permit",
          ResidenceInfo.has_work_permit ? "Yes" : "No"
        );

        if (ResidenceInfo.permit_valid_until) {
          const [year, month, day] =
            ResidenceInfo.permit_valid_until.split("-");
          const formattedDate = `${day}.${month}.${year}`;
          setValue("permit_valid_until", formattedDate);
        }
      }
    }
  }, [ResidenceInfo, setValue]);

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
      formData.append("permit_valid_until", formattedDate);
      formData.append(
        "has_work_permit",
        data.has_work_permit === "Yes" ? 1 : 0
      );
      if (data.permit_document instanceof File) {
        formData.append("work_permit_document", data.permit_document);
      }
    }

    add_Residence_info_Mutatuin.mutate(formData);
  };

  return (
    <div className="Residence_info p-[28px] py-[58px]">
      <h2 className="text-2xl font-bold mb-2">
        {isUploaded && ResidenceInfo
          ? t("residenceInfo.titleUploaded")
          : t("residenceInfo.title")}
      </h2>
      <p className="text-[#555770] mb-10 text-lg ">
        {isUploaded && ResidenceInfo
          ? t("residenceInfo.descriptionUploaded")
          : t("residenceInfo.description")}
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
              label={t("residenceInfo.fields.workPermit")}
              errors={errors}
              Options={[
                { value: "Yes", label: t("residenceInfo.workPermitOptions.yes") },
                { value: "No", label: t("residenceInfo.workPermitOptions.no") }
              ]}
            />
          )}
          <InputField
            register={register}
            errors={errors}
            label={t("residenceInfo.fields.placeOfBirth")}
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
                label={t("residenceInfo.fields.permitValidUntil")}
                name={"permit_valid_until"}
                type={"text"}
              />
            </div>
            <p className="text-lg font-bold">
              {t("residenceInfo.fields.workPermitDocument")}
            </p>
            <div>
              <FileUploader
                name={"permit_document"}
                label={t("residenceInfo.fields.front")}
                register={register}
                setValue={setValue}
                error={errors}
              />
            </div>
          </>
        )}
        <p className="text-lg font-bold">
          {t("residenceInfo.fields.idCopyTitle")}
        </p>
        <div className="ID_Upload flex gap-5">
          {ID_card.map((input) => (
            <FileUploader
              key={input.name}
              name={input.name}
              label={t(`residenceInfo.fields.${input.name === 'id_front' ? 'front' : 'back'}`)}
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
          prevLabel={t("residenceInfo.back")}
          onCancel={() => navigate("/Personal info")}
        />
      </form>
    </div>
  );
};

export default Residence_info;
