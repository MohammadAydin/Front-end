import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import InputField from "../../../components/FormElements/InputField";
import SubmitButtons from "../../../components/FormElements/SubmitButtons";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import schema_social_Insurance from "./schema_social_Insurance";
import SelectField from "../../../components/FormElements/SelectField";
import UploadChildrenDocuments from "./UploadChildrenDocuments";
import "../../Responsive css/Personal_info.css";
import { OpenSuccsessPopup } from "../../../store/OpenSuccsessPopup";
import { useTranslation } from "react-i18next";
import useData from "../../../hooks/useData";

const Social_Security_and_Health_Insurance = () => {
  const { t } = useTranslation();
  const { OpenSuccsess } = OpenSuccsessPopup();
  const [serverError, setServerError] = useState("");
  const [childrenFiles, setChildrenFiles] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [previousNumberOfChildren, setPreviousNumberOfChildren] =
    useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

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
    {
      name: "number_of_children",
      label: t("socialSecurity.fields.numberOfChildren"),
      type: "number",
      step: "any",
    },
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

  const add_Social_Insurance_Mutatuin = useMutation({
    mutationFn: (insurance) =>
      customFetch
        .post(
          "https://woundwann.de/v1/profile/social-insurance-info",
          insurance,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
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
        error?.response?.data?.message || t("socialSecurity.error");

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

  const { data: statusData } = useData("/profile/status");

  const {
    data: existingData,
    isLoading: isLoadingData,
    error: fetchError,
  } = useQuery({
    queryKey: ["social-insurance-info"],
    queryFn: () =>
      customFetch.get("/profile/social-insurance-info").then((res) => res.data),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: statusData?.social_security === "uploaded",
  });

  useEffect(() => {
    if (existingData?.data) {
      const data = existingData.data;
      setIsEditMode(true);

      setValue("social_insurance_number", data.social_insurance_number || "");
      setValue(
        "health_insurance_company_name",
        data.health_insurance_company || ""
      );
      setValue("health_insurance_number", data.health_insurance_number || "");
      setValue("health_insurance_type", data.health_insurance_type || "");
      setValue(
        "tax_identification_number",
        data.tax_identification_number || ""
      );
      setValue("tax_bracket", data.tax_bracket || "");
      setValue("marital_status", data.marital_status || "");
      setValue("number_of_children", data.number_of_children || 0);

      setPreviousNumberOfChildren(data.number_of_children || 0);
    }
  }, [existingData, setValue]);

  const numberOfChildren = watch("number_of_children") || 0;

  const [childrenCountChanged, setChildrenCountChanged] = useState(false);

  useEffect(() => {
    if (isInitialLoad) {
      return;
    }

    if (
      previousNumberOfChildren !== null &&
      numberOfChildren !== previousNumberOfChildren
    ) {
      setChildrenFiles(new Array(numberOfChildren).fill(null));
      setPreviousNumberOfChildren(numberOfChildren);
      setChildrenCountChanged(true);
    }
  }, [numberOfChildren, previousNumberOfChildren, isInitialLoad]);

  useEffect(() => {
    if (
      !isInitialLoad &&
      !isEditMode &&
      numberOfChildren > 0 &&
      childrenFiles.length === 0
    ) {
      setChildrenFiles(new Array(numberOfChildren).fill(null));
      setPreviousNumberOfChildren(numberOfChildren);
    }
  }, [isInitialLoad, isEditMode, numberOfChildren, childrenFiles.length]);

  const areAllFilesUploaded = (numChildren) => {
    if (numChildren === 0) return true;

    if (isEditMode && numberOfChildren === previousNumberOfChildren) {
      return true;
    }

    const validFiles = childrenFiles.slice(0, numChildren).filter((file) => {
      return (
        file &&
        (file instanceof File || file.isExisting) &&
        (file.size > 0 || file.isExisting)
      );
    });

    return validFiles.length === numChildren;
  };

  const submit = async (data) => {
    const numChildren = parseInt(numberOfChildren) || 0;

    if (numChildren > 0 && !areAllFilesUploaded(numChildren)) {
      if (isEditMode && numberOfChildren !== previousNumberOfChildren) {
        setServerError(
          t("childrenDocuments.errors.allFilesRequiredAfterChange")
        );
      } else {
        setServerError(t("childrenDocuments.errors.allFilesRequired"));
      }
      return;
    }

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

    for (let i = 0; i < numChildren; i++) {
      const file = childrenFiles[i];
      if (file && file instanceof File && !file.isExisting) {
        formData.append(`children_documents[]`, file);
      }
    }

    add_Social_Insurance_Mutatuin.mutate(formData);
  };

  return (
    <div className="Social_Insurance p-[28px] py-[58px]">
      <h2 className="text-2xl font-bold mb-2">{t("socialSecurity.title")}</h2>
      <p className="text-[#555770] mb-10 text-lg ">
        {t("socialSecurity.description")}
      </p>

      {isLoadingData && (
        <div className="text-center py-4">
          <p>{t("common.loading")}</p>
        </div>
      )}

      {fetchError && (
        <div className="text-red-600 mb-4">
          <p>{t("socialSecurity.fetchError")}</p>
        </div>
      )}

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
              step={input.step ? input.step : 1}
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
              Options={select.optians}
            />
          ))}
        </div>

        {numberOfChildren > 0 && (
          <UploadChildrenDocuments
            numberOfChildren={numberOfChildren}
            onFilesChange={setChildrenFiles}
            files={childrenFiles}
            existingFiles={existingData?.data?.children_documents || []}
            childrenCountChanged={childrenCountChanged}
            onChildrenCountChangeHandled={() => setChildrenCountChanged(false)}
          />
        )}

        {serverError && (
          <p className="text-red-600 font-medium text-start mb-4">
            {serverError}
          </p>
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
