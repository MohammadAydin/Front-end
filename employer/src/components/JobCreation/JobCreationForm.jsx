import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
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
  const [showReview, setShowReview] = useState(false);
  const [reviewData, setReviewData] = useState(null);
  const [autoDescription, setAutoDescription] = useState("");

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
    Description: z.string().optional(),
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

  // Auto-fill description based on position
  useEffect(() => {
    const descriptionMap = {
      "1": "Verantwortlich für die professionelle Pflege, Medikamentengabe und Dokumentation. Führt medizinische Aufgaben selbstständig durch und betreut Bewohner fachgerecht.",
      "2": "Unterstützt Pflegefachkräfte bei der Grundpflege und täglichen Betreuung. Führt einfache pflegerische Tätigkeiten unter Anleitung aus.",
      "3": "Hilft bei Körperpflege, Ernährung und Mobilität der Bewohner. Sorgt für Wohlbefinden und unterstützt das Pflegeteam im Alltag.",
    };

    const newDescription = Position ? descriptionMap[String(Position)] || "" : "";
    setAutoDescription(newDescription);

    if (newDescription) {
      setValue("Description", newDescription, { shouldDirty: false });
    }
  }, [Position, setValue]);

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
    const composedDescription =
      data.Description && data.Description.trim().length > 0
        ? data.Description
        : autoDescription;

    setReviewData({
      position: data.Position,
      address: data.Address,
      description: composedDescription,
      employeesRequired: data.EmployeeCount,
      shift: data.Shifts,
      dateRange: data.date,
    });
    setShowReview(true);
  };

  const handleConfirm = async () => {
    if (!reviewData) return;

    const dateFrom = formatDateForAPI(reviewData.dateRange?.from);
    const dateTo = formatDateForAPI(reviewData.dateRange?.to);

    const descriptionToSend = reviewData.description || "";

    setLoadingPost(true);
    try {
      const response = await customFetch.post("/employerJobPosting", {
        title: "Dringend",
        description: descriptionToSend,
        employees_required: reviewData.employeesRequired,
        date_from: dateFrom,
        date_to: dateTo,
        location_id: reviewData.address,
        employee_positions_id: reviewData.position,
        shift_id: reviewData.shift,
      });
      queryClient.invalidateQueries(["employerJobPosting"]);
      toast.success(response?.data?.message || t("AddJob.successMessage"));
      setLoadingPost(false);
      setIsFormOpen(false);
      setShowReview(false);
      setReviewData(null);
      reset();
    } catch (error) {
      toast.error(error?.response?.data?.message || t("AddJob.errorMessage"));
      console.error("Error during submission:", error?.response?.data?.message);
      setLoadingPost(false);
    }
  };

  const handleCancelReview = () => {
    setShowReview(false);
    setReviewData(null);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setShowReview(false);
    setReviewData(null);
    reset();
  };

  // No derived state needed here currently

  return (
    <>
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-[#28293d94] text-black">
          <div className="w-full h-full overflow-y-auto flex justify-center items-center py-8 px-4 sm:px-6">
            <div className="JobCreationForm w-full max-w-[520px] bg-white rounded-2xl p-6 sm:p-8 shadow-xl relative max-h-[90vh] overflow-y-auto">
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

              {/* Description Input */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t("RequestsForm.fields.description")}
                </label>
                <textarea
                  {...register("Description")}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F47621] resize-none"
                  placeholder={t("RequestsForm.fields.description")}
                />
                {errors.Description && (
                  <p className="text-red-500 text-sm mt-1">{errors.Description.message}</p>
                )}
              </div>

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
                submitLabel={t("AddJob.reviewButton")}
                disabled={loadingPost}
              />
            </form>
            </div>
          </div>
        </div>
      )}

      {showReview && reviewData && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-[#28293d94] px-4 py-6">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[90vh]">
            <button
              type="button"
              onClick={handleCancelReview}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label={t("RequestsForm.buttons.cancel")}
            >
              <IoClose size={28} />
            </button>

            <div>
              <h4 className="text-2xl font-semibold text-gray-900">
                {t("AddJob.reviewTitle")}
              </h4>
              <p className="text-sm text-gray-600 mt-2">
                {t("RequestsForm.summary.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="font-medium text-gray-900">
                  {t("RequestsForm.fields.position")}
                </p>
                <p className="mt-1">
                  {
                    PosationList?.data?.find(
                      (pos) => String(pos.id) === String(reviewData.position)
                    )?.name
                  }
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <p className="font-medium text-gray-900">
                  {t("RequestsForm.fields.address")}
                </p>
                <p className="mt-1">
                  {
                    resultLocation?.find(
                      (loc) => String(loc.id) === String(reviewData.address)
                    )?.name
                  }
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 sm:col-span-2">
                <p className="font-medium text-gray-900">
                  {t("RequestsForm.fields.description")}
                </p>
                <p className="mt-1 whitespace-pre-line">
                  {reviewData.description || "-"}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <p className="font-medium text-gray-900">
                  {t("RequestsForm.fields.employeeCount")}
                </p>
                <p className="mt-1">{reviewData.employeesRequired}</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <p className="font-medium text-gray-900">
                  {t("RequestsForm.fields.shifts")}
                </p>
                <p className="mt-1">
                  {
                    dataShift?.data?.find(
                      (shift) => String(shift.id) === String(reviewData.shift)
                    )?.name
                  }
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 sm:col-span-2">
                <p className="font-medium text-gray-900">
                  {t("RequestsForm.fields.dateRange")}
                </p>
                <p className="mt-1">
                  {reviewData.dateRange?.from?.toLocaleDateString?.() || "-"} -{" "}
                  {reviewData.dateRange?.to?.toLocaleDateString?.() || "-"}
                </p>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {t("RequestsForm.warning.policyText")}{" "}
              <span className="font-semibold">&euro; 50</span>{" "}
              {t("RequestsForm.warning.willbecharged")}
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
              <button
                type="button"
                onClick={handleCancelReview}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                {t("RequestsForm.buttons.cancel")}
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={loadingPost}
                className={`px-6 py-2 rounded-lg text-white font-semibold transition-colors ${
                  loadingPost ? "bg-gray-400" : "bg-[#F47621] hover:bg-[#EE6000]"
                }`}
              >
                {loadingPost
                  ? t("RequestsForm.buttons.submitting")
                  : t("RequestsForm.buttons.submitRequest")}
              </button>
            </div>
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

