import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils/axios";
import { useTranslation } from "react-i18next";
import SelectField from "../SelectField";
import useData from "../../hooks/useData";
import CalendarRange from "../HelpRequests/RequestsForm/CalendarRange";
import SubmitButtons from "../FormElements/SubmitButtons";
import AddShiftDialog from "./AddShiftDialog";
import { z } from "zod";
import { IoClose } from "react-icons/io5";

const EmployeeNumber = [
  { name: 1, id: 1 },
  { name: 2, id: 2 },
  { name: 3, id: 3 },
  { name: 4, id: 4 },
  { name: 5, id: 5 },
  { name: 6, id: 6 },
  { name: 7, id: 7 },
];

const JobCreationForm = ({ isFormOpen, setIsFormOpen }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [loadingPost, setLoadingPost] = useState(false);
  const [isShiftDialogOpen, setIsShiftDialogOpen] = useState(false);

  // Fetch required data
  const { data: PosationList, isLoading: isLoadingPosition } = useData("/positions/list");
  const { data: dataShift, isLoading: isLoadingShift } = useData("/employer/shifts");
  const { data: dataLocation, isLoading: isLoadingLocation } = useData("/locations");

  const resultLocation = dataLocation?.data?.map((item) => ({
    name: item?.street1,
    id: item.id,
  }));

  // Define validation schema
  const JobSchema = z.object({
    Position: z.union([z.string(), z.number()]).refine((val) => val !== "" && val !== null && val !== undefined, {
      message: t("RequestsForm.validation.position"),
    }),
    Address: z.union([z.string(), z.number()]).refine((val) => val !== "" && val !== null && val !== undefined, {
      message: t("RequestsForm.validation.address"),
    }),
    Shifts: z.union([z.string(), z.number()]).refine((val) => val !== "" && val !== null && val !== undefined, {
      message: t("RequestsForm.validation.shift"),
    }),
    EmployeeCount: z.union([z.string(), z.number()]).refine((val) => val !== "" && val !== null && val !== undefined, {
      message: t("RequestsForm.validation.employeeCount"),
    }),
    date: z.object({
      from: z.date(),
      to: z.date(),
    }),
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      EmployeeCount: "1",
    },
  });

  const Position = watch("Position");

  // Handle Add New Shift button click
  const handleAddNewShift = () => {
    setIsShiftDialogOpen(true);
  };

  // Handle shift creation success
  const handleShiftCreated = (newShift) => {
    setValue("Shifts", newShift.id.toString());
    queryClient.invalidateQueries(["/employer/shifts"]);
  };

  const formatDateForAPI = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const onSubmit = async (data) => {
    const dateFrom = formatDateForAPI(data.date.from);
    const dateTo = formatDateForAPI(data.date.to);

    let description = "";
    if (data.Position == 1) {
      description = "Verantwortlich für die professionelle Pflege, Medikamentengabe und Dokumentation. Führt medizinische Aufgaben selbstständig durch und betreut Bewohner fachgerecht.";
    } else if (data.Position == 2) {
      description = "Unterstützt Pflegefachkräfte bei der Grundpflege und täglichen Betreuung. Führt einfache pflegerische Tätigkeiten unter Anleitung aus.";
    } else if (data.Position == 3) {
      description = "Hilft bei Körperpflege, Ernährung und Mobilität der Bewohner. Sorgt für Wohlbefinden und unterstützt das Pflegeteam im Alltag.";
    }

    setLoadingPost(true);
    try {
      const response = await customFetch.post("/employerJobPosting", {
        title: "Dringend",
        description: description,
        employees_required: data.EmployeeCount,
        date_from: dateFrom,
        date_to: dateTo,
        location_id: data.Address,
        employee_positions_id: data.Position,
        shift_id: data.Shifts,
      });
      queryClient.invalidateQueries(["employerJobPosting"]);
      toast.success(response?.data?.message || t("AddJob.successMessage"));
      setLoadingPost(false);
      setIsFormOpen(false);
      reset();
    } catch (error) {
      toast.error(error?.response?.data?.message || t("AddJob.errorMessage"));
      console.error("Error during submission:", error?.response?.data?.message);
      setLoadingPost(false);
    }
  };

  const handleClose = () => {
    setIsFormOpen(false);
    reset();
  };

  // No derived state needed here currently

  return (
    <>
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-[#28293d94] text-black overflow-y-auto">
          <div className="JobCreationForm w-[500px] min-h-fit bg-white rounded-2xl p-6 py-8 my-8 shadow-xl relative">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <IoClose size={28} />
            </button>

            <h3 className="text-2xl font-bold mb-2">
              {t("AddJob.formTitle")}
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              {t("AddJob.formSubtitle")}
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Position Select */}
              <SelectField
                data={(PosationList?.data || []).map((p) => ({
                  ...p,
                  name:
                    p?.name === "Pflegefachassistent"
                      ? "Pflegefachassistent – ein Jahr Ausbildung"
                      : p?.name,
                }))}
                name="Position"
                errors={errors}
                setValue={setValue}
                register={register}
                value={watch("Position")}
                label={t("RequestsForm.fields.position")}
              />
              {isLoadingPosition && (
                <p className="text-xs text-gray-500 mt-1">Loading positions...</p>
              )}

              {/* Address Select */}
              <SelectField
                data={resultLocation}
                name="Address"
                errors={errors}
                setValue={setValue}
                register={register}
                value={watch("Address")}
                label={t("RequestsForm.fields.address")}
              />
              {isLoadingLocation && (
                <p className="text-xs text-gray-500 mt-1">Loading locations...</p>
              )}

              {/* Employee Count Select */}
              <SelectField
                data={EmployeeNumber}
                name="EmployeeCount"
                errors={errors}
                setValue={setValue}
                register={register}
                value={watch("EmployeeCount")}
                label={t("RequestsForm.fields.employeeCount")}
              />

              {/* Shift Select with Add New Shift button */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t("RequestsForm.fields.shifts")}
                </label>
                <div className="flex gap-2 items-center">
                  <div className="flex-1">
                    <SelectField
                      data={dataShift?.data || []}
                      name="Shifts"
                      errors={errors}
                      setValue={setValue}
                      register={register}
                      value={watch("Shifts")}
                      label=""
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddNewShift}
                    className="bg-gradient-to-r from-[#F47621] to-[#EE6000] text-white font-bold py-3 px-4 rounded-lg hover:shadow-lg transition-all whitespace-nowrap"
                  >
                    {t("AddJob.addNewShiftButton")}
                  </button>
                </div>
                {isLoadingShift && (
                  <p className="text-xs text-gray-500 mt-1">Loading shifts...</p>
                )}
              </div>

              {/* Calendar Date Range */}
              <CalendarRange
                register={register}
                name="date"
                setValue={setValue}
                errors={errors}
              />

              {/* Submit Buttons */}
              <SubmitButtons
                onCancel={handleClose}
                submitLabel={t("AddJob.submitButton")}
                disabled={loadingPost}
              />
            </form>
          </div>
        </div>
      )}

      {/* Add Shift Dialog */}
      <AddShiftDialog
        isOpen={isShiftDialogOpen}
        setIsOpen={setIsShiftDialogOpen}
        onShiftCreated={handleShiftCreated}
      />
    </>
  );
};

export default JobCreationForm;

