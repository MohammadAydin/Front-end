import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CalendarRange from "./CalendarRange";
import SelectField from "../../SelectField";
import RequestsInput from "./RequestsInput";
import useRequestsStore from "../../../store/HelpRequestsStore";
import { HiOutlineCheckCircle } from "react-icons/hi";
import RequestSchema from "./Schema";
import SubmitButtons from "../../FormElements/SubmitButtons";
import useData from "../../../hooks/useData";
import customFetch from "../../../utils/axios";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState } from "react";
import { TiWarning } from "react-icons/ti";
import RequestSummary from "./RequestSummary";
import "./RequestSummary.css";
import { useTranslation } from "react-i18next";

const inputs = [
  { name: "Title", label: "RequestsForm.fields.title", type: "text" },
  {
    name: "Description",
    label: "RequestsForm.fields.description",
    type: "text",
  },
];

const EmployeeNumber = [
  { name: 1, id: 1 },
  { name: 2, id: 2 },
  { name: 3, id: 3 },
  { name: 4, id: 4 },
  { name: 5, id: 5 },
  { name: 6, id: 6 },
  { name: 7, id: 7 },
];

const RequestsForm = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { RequestIsOpen, RequestClose, RequestDone, Done, notDone } =
    useRequestsStore();
  const { data: dataShift, error, isLoading } = useData("/employer/shifts");
  const {
    data: dataLocationt,
    errorLocation,
    isLoadingLocation,
  } = useData("/locations");
  const [loadingPost, setLoadingPost] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(null);

  const dataPosation = [
    { name: t("positions.Pflegefachkraft"), id: 1 },
    { name: t("positions.Pflegefachassistent"), id: 2 },
    { name: t("positions.Pflegehelfer"), id: 3 },
  ];

  const resultLocation = dataLocationt?.data?.map((item) => ({
    name: item?.street1,
    id: item.id,
  }));
  const selectOptions = [
    { name: "Position", label: t("RequestsForm.fields.position"), id: 1 },
    { name: "Shifts", label: t("RequestsForm.fields.shifts"), id: 2 },
    { name: "Address", label: t("RequestsForm.fields.address"), id: 3 },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RequestSchema(t)),
    defaultValues: {
      ["EmployeeCount"]: 1,
    },
  });

  const handleNextStep = (data) => {
    setFormData(data);
    setCurrentStep(2);
  };

  const handleConfirmData = () => {
    setCurrentStep(3);
  };

  const formatDateForAPI = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleFinalSubmit = async () => {
    const dateFrom = formatDateForAPI(formData.date.from);
    const dateTo = formatDateForAPI(formData.date.to);

    console.log(
      "title",
      formData.Title,
      "description:",
      formData.Description,
      "employees_required:",
      formData.EmployeeCount,
      "date_from:",
      dateFrom,
      "date_to:",
      dateTo,
      "location_id:",
      formData.Address,
      "employee_positions_id:",
      formData.Position,
      "shift_id:",
      formData.Shifts
    );
    setLoadingPost(true);
    try {
      const response = await customFetch.post("/employerJobPosting", {
        title: formData.Title,
        description: formData.Description,
        employees_required: formData.EmployeeCount,
        date_from: dateFrom,
        date_to: dateTo,
        location_id: formData.Address,
        employee_positions_id: formData.Position,
        shift_id: formData.Shifts,
      });
      queryClient.invalidateQueries(["employerJobPosting"]);
      toast.success(response?.data?.message);
      setLoadingPost(false);
      setCurrentStep(1);
      setFormData(null);
      RequestClose();
      reset();
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error("Error during submission:", error?.response?.data?.message);
      setLoadingPost(false);
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setFormData(null);
    RequestClose();
    reset();
  };

  return (
    <>
      {RequestIsOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-start pt-8 pb-8 bg-[#28293d94] text-white overflow-y-auto modal-container">
          {RequestDone ? (
            <div className="RequestsDone w-[600px] h-[500px] bg-white rounded-2xl text-[#4CE452] flex flex-col items-center justify-center gap-2 my-8">
              <HiOutlineCheckCircle size={200} />
              <p className="text-black font-extrabold text-xl my-3">
                {t("RequestsForm.successTitle")}
              </p>
              <button
                onClick={() => {
                  notDone(), RequestClose();
                }}
                className="flex gap-1 items-center font-[900] text-lg bg-[#F47621] text-white px-10 py-2 rounded-xl cursor-pointer"
              >
                {t("RequestsForm.backToManagement")}
              </button>
            </div>
          ) : (
            <div className="RequestsForm w-[880px] min-h-fit bg-white rounded-2xl text-black p-6 py-8 my-8 shadow-xl">
              {/* Progress Stepper */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  {[1, 2, 3].map((step, idx) => (
                    <div key={step} className="flex-1 flex items-center">
                      <div className={`flex items-center justify-center h-8 w-8 rounded-full text-sm font-semibold border transition-colors ${currentStep >= step ? 'bg-[#F47621] text-white border-[#F47621]' : 'bg-white text-gray-500 border-gray-300'
                        }`}>
                        {step}
                      </div>
                      {idx < 2 && (
                        <div className={`h-0.5 flex-1 mx-2 ${currentStep > step ? 'bg-[#F47621]' : 'bg-gray-200'}`}></div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex justify-between text-xs text-gray-500">
                  <span>Details</span>
                  <span>Review</span>
                  <span>Confirm</span>
                </div>
              </div>
              {currentStep === 1 && (
                <>
                  <h3 className="text-2xl font-[900]">
                    {t("RequestsForm.title")}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{t("RequestsForm.basicInfo")}</p>
                  <form action="" onSubmit={handleSubmit(handleNextStep)}>
                    <div className="w-full flex items-center gap-3">
                      {inputs.map((input) => (
                        <RequestsInput
                          key={input.name}
                          register={register}
                          label={t(input.label)}
                          type={input.type}
                          name={input.name}
                          errors={errors}
                        />
                      ))}
                    </div>
                    <div className=" grid grid-cols-2 gap-x-3">
                      {selectOptions.map((selectOption) => (
                        <div
                          key={selectOption.name}
                          className={`${selectOption.name === "Address" ? "col-span-2" : ""
                            }`}
                        >
                          <SelectField
                            data={
                              selectOption.name === "Shifts"
                                ? [
                                  ...(dataShift?.data || []),
                                  {
                                    id: "custom",
                                    name: t(
                                      "RequestsForm.fields.custom_shift"
                                    ),
                                  },
                                ]
                                : selectOption.name === "Address"
                                  ? resultLocation
                                  : dataPosation
                            }
                            name={selectOption.name}
                            errors={errors}
                            setValue={setValue}
                            register={register}
                            value={watch(selectOption.name)}
                            label={selectOption.label}
                          />
                          {(selectOption.name === 'Shifts' && isLoading) && (
                            <p className="text-xs text-gray-500 mt-1">Loading shifts...</p>
                          )}
                          {(selectOption.name === 'Address' && isLoadingLocation) && (
                            <p className="text-xs text-gray-500 mt-1">Loading locations...</p>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="w-full flex gap-3 items-center h-full max-[841px]:flex-col max-[841px]:gap-0">
                      <div className="w-full">
                        <SelectField
                          data={EmployeeNumber}
                          name={"EmployeeCount"}
                          errors={errors}
                          setValue={setValue}
                          register={register}
                          value={watch("EmployeeCount")}
                          label={t("RequestsForm.fields.employeeCount")}
                        />
                        <p className="text-xs text-gray-500 mt-1">Number of helpers you need for this job.</p>
                      </div>
                      <CalendarRange
                        register={register}
                        name={"date"}
                        setValue={setValue}
                        errors={errors}
                      />
                    </div>
                    <SubmitButtons
                      onCancel={handleClose}
                      submitLabel={t("RequestsForm.buttons.next")}
                    />
                  </form>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <h3 className="text-xl md:text-2xl font-[900] mb-4 md:mb-6">
                    {t("RequestsForm.confirmTitle")}
                  </h3>
                  <div className="max-h-[60vh] overflow-y-auto">
                    <RequestSummary
                      formData={formData}
                      dataPosation={dataPosation}
                      dataShift={dataShift?.data}
                      resultLocation={resultLocation}
                    />
                  </div>
                  <div className="flex gap-3 justify-end mt-4 md:mt-6">
                    <button
                      onClick={handleClose}
                      className="bg-[#F1F1F5] text-[#28293D] text-base md:text-lg font-extrabold px-3 md:px-4 py-2 rounded-lg hover:bg-[#cfcfd3]"
                    >
                      {t("RequestsForm.buttons.cancel")}
                    </button>
                    <button
                      onClick={handleConfirmData}
                      className="bg-[#F47621] text-white text-base md:text-lg font-extrabold px-6 md:px-10 py-2 rounded-lg hover:bg-[#EE6000]"
                    >
                      {t("RequestsForm.buttons.confirm")}
                    </button>
                  </div>
                </>
              )}

              {currentStep === 3 && (
                <>
                  <h3 className=" flex justify-center gap-2 text-2xl font-[900] mb-6 text-center items-center text-red-800">
                    <TiWarning />
                    {t("RequestsForm.warningTitle")}
                  </h3>
                  <div className="text-center space-y-6">
                    <div className="bg-red-50 border-2 border-red-200 p-6 rounded-lg">
                      <p className="text-red-800 text-lg font-semibold mb-3">
                        {t("RequestsForm.warning.cancellationPolicy")}
                      </p>
                      <p className="text-red-700">
                        {t("RequestsForm.warning.policyText")}
                        <span className="font-bold text-xl">
                          {" "}
                          &euro; 50
                        </span>{" "}
                        {t("RequestsForm.warning.willbecharged")}
                      </p>
                    </div>
                    <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-lg">
                      <p className="text-blue-800">
                        {t("RequestsForm.warning.acknowledgeText")}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-center mt-8">
                    <button
                      onClick={handleClose}
                      className="bg-[#F1F1F5] text-[#28293D] text-lg font-extrabold px-6 py-3 rounded-lg hover:bg-[#cfcfd3]"
                    >
                      {t("RequestsForm.buttons.cancel")}
                    </button>
                    <button
                      disabled={loadingPost}
                      onClick={handleFinalSubmit}
                      className={`${loadingPost ? "bg-gray-400" : "bg-[#F47621]"
                        }  text-white text-lg font-extrabold px-8 py-3 rounded-lg hover:bg-[#EE6000]`}
                    >
                      {t("RequestsForm.buttons.submitRequest")}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RequestsForm;
