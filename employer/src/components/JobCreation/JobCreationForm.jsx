import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils/axios";
import { useTranslation } from "react-i18next";
import SelectField from "../SelectField";
import useData from "../../hooks/useData";
import CalendarRange from "../HelpRequests/RequestsForm/CalendarRange";
import SubmitButtons from "../FormElements/SubmitButtons";
import AddShiftDialog from "./AddShiftDialog";
import { z } from "zod";
import { IoClose, IoCheckmarkCircleOutline, IoWarningOutline } from "react-icons/io5";
import { FaBriefcase, FaMapMarkerAlt, FaUsers, FaClock, FaCalendarAlt, FaFileAlt } from "react-icons/fa";

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
  const [feedback, setFeedback] = useState({
    visible: false,
    type: "success",
    message: "",
  });

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

  useEffect(() => {
    if (!feedback.visible) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setFeedback((prev) => ({
        ...prev,
        visible: false,
        message: "",
      }));
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [feedback.visible]);

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
      setFeedback({
        visible: true,
        type: "success",
        message: response?.data?.message || t("AddJob.successMessage"),
      });
      setLoadingPost(false);
      setIsFormOpen(false);
      setShowReview(false);
      setReviewData(null);
      reset();
    } catch (error) {
      setFeedback({
        visible: true,
        type: "error",
        message: error?.response?.data?.message || t("AddJob.errorMessage"),
      });
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-slide-up">
          <div className="w-full h-full overflow-y-auto flex justify-center items-center py-8 px-4 sm:px-6">
            <div className="JobCreationForm w-full max-w-2xl bg-white rounded-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto animate-slide-up">
              {/* Gradient Header */}
              <div className="bg-gradient-to-r from-[#F47621] to-[#ff8c42] rounded-t-2xl p-6 md:p-8 relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                        <FaBriefcase size={32} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white">
                          {t("AddJob.formTitle")}
                        </h3>
                        <p className="text-white/90 text-sm md:text-base mt-1">
                          {t("AddJob.formSubtitle")}
                        </p>
                      </div>
                    </div>
                    {/* Close Button */}
                    <button
                      onClick={handleClose}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-2 text-white transition-all duration-300 hover:scale-110"
                    >
                      <IoClose size={24} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6 md:p-8">

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Position Select */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                      <FaBriefcase className="text-[#F47621]" />
                      {t("RequestsForm.fields.position")}
                    </label>
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
                      label=""
                    />
                    {isLoadingPosition && (
                      <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                        <div className="w-3 h-3 border-2 border-[#F47621] border-t-transparent rounded-full animate-spin"></div>
                        Loading positions...
                      </p>
                    )}
                    {errors.Position && (
                      <p className="text-red-500 text-sm mt-2">{errors.Position.message}</p>
                    )}
                  </div>

                  {/* Address Select */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                      <FaMapMarkerAlt className="text-[#F47621]" />
                      {t("RequestsForm.fields.address")}
                    </label>
                    <SelectField
                      data={resultLocation}
                      name="Address"
                      errors={errors}
                      setValue={setValue}
                      register={register}
                      value={watch("Address")}
                      label=""
                    />
                    {isLoadingLocation && (
                      <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                        <div className="w-3 h-3 border-2 border-[#F47621] border-t-transparent rounded-full animate-spin"></div>
                        Loading locations...
                      </p>
                    )}
                    {errors.Address && (
                      <p className="text-red-500 text-sm mt-2">{errors.Address.message}</p>
                    )}
                  </div>

                  {/* Description Input */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                      <FaFileAlt className="text-[#F47621]" />
                      {t("RequestsForm.fields.description")}
                    </label>
                    <textarea
                      {...register("Description")}
                      rows={4}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#F47621] focus:border-[#F47621] resize-none transition-all duration-300"
                      placeholder={t("RequestsForm.fields.description")}
                    />
                    {errors.Description && (
                      <p className="text-red-500 text-sm mt-2">{errors.Description.message}</p>
                    )}
                  </div>

                  {/* Employee Count Select */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                      <FaUsers className="text-[#F47621]" />
                      {t("RequestsForm.fields.employeeCount")}
                    </label>
                    <SelectField
                      data={EmployeeNumber}
                      name="EmployeeCount"
                      errors={errors}
                      setValue={setValue}
                      register={register}
                      value={watch("EmployeeCount")}
                      label=""
                    />
                    {errors.EmployeeCount && (
                      <p className="text-red-500 text-sm mt-2">{errors.EmployeeCount.message}</p>
                    )}
                  </div>

                  {/* Shift Select with Add New Shift button */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                      <FaClock className="text-[#F47621]" />
                      {t("RequestsForm.fields.shifts")}
                    </label>
                    <div className="flex gap-3 items-start">
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
                        className="bg-gradient-to-r from-[#F47621] to-[#ff8c42] hover:from-[#E55A1A] hover:to-[#F47621] text-white font-bold py-3 px-5 rounded-xl hover:shadow-lg transition-all duration-300 whitespace-nowrap transform hover:scale-105"
                      >
                        {t("AddJob.addNewShiftButton")}
                      </button>
                    </div>
                    {isLoadingShift && (
                      <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                        <div className="w-3 h-3 border-2 border-[#F47621] border-t-transparent rounded-full animate-spin"></div>
                        Loading shifts...
                      </p>
                    )}
                    {errors.Shifts && (
                      <p className="text-red-500 text-sm mt-2">{errors.Shifts.message}</p>
                    )}
                  </div>

                  {/* Calendar Date Range */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                      <FaCalendarAlt className="text-[#F47621]" />
                      {t("RequestsForm.fields.dateRange")}
                    </label>
                    <CalendarRange
                      register={register}
                      name="date"
                      setValue={setValue}
                      errors={errors}
                    />
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                    >
                      {t("RequestsForm.buttons.cancel")}
                    </button>
                    <button
                      type="submit"
                      disabled={loadingPost}
                      className="px-8 py-3 bg-gradient-to-r from-[#F47621] to-[#ff8c42] hover:from-[#E55A1A] hover:to-[#F47621] text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {t("AddJob.reviewButton")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {showReview && reviewData && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-6 animate-slide-up">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto animate-slide-up">
            {/* Gradient Header */}
            <div className="bg-gradient-to-r from-[#F47621] to-[#ff8c42] p-6 md:p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                    <IoCheckmarkCircleOutline size={32} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl md:text-3xl font-bold text-white">
                      {t("AddJob.reviewTitle")}
                    </h4>
                    <p className="text-white/90 text-sm md:text-base mt-1">
                      {t("RequestsForm.summary.subtitle")}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCancelReview}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-2 text-white transition-all duration-300 hover:scale-110"
                  aria-label={t("RequestsForm.buttons.cancel")}
                >
                  <IoClose size={24} />
                </button>
              </div>
            </div>

            {/* Review Content */}
            <div className="p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-blue-200 rounded-lg p-2">
                      <FaBriefcase className="text-blue-600" size={20} />
                    </div>
                    <p className="text-xs text-blue-700 uppercase tracking-wide font-bold">
                      {t("RequestsForm.fields.position")}
                    </p>
                  </div>
                  <p className="text-base font-bold text-gray-900">
                    {
                      PosationList?.data?.find(
                        (pos) => String(pos.id) === String(reviewData.position)
                      )?.name
                    }
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-green-200 rounded-lg p-2">
                      <FaMapMarkerAlt className="text-green-600" size={20} />
                    </div>
                    <p className="text-xs text-green-700 uppercase tracking-wide font-bold">
                      {t("RequestsForm.fields.address")}
                    </p>
                  </div>
                  <p className="text-base font-bold text-gray-900">
                    {
                      resultLocation?.find(
                        (loc) => String(loc.id) === String(reviewData.address)
                      )?.name
                    }
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200 sm:col-span-2">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-purple-200 rounded-lg p-2">
                      <FaFileAlt className="text-purple-600" size={20} />
                    </div>
                    <p className="text-xs text-purple-700 uppercase tracking-wide font-bold">
                      {t("RequestsForm.fields.description")}
                    </p>
                  </div>
                  <p className="text-sm text-gray-900 whitespace-pre-line leading-relaxed">
                    {reviewData.description || "-"}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 border border-orange-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-orange-200 rounded-lg p-2">
                      <FaUsers className="text-orange-600" size={20} />
                    </div>
                    <p className="text-xs text-orange-700 uppercase tracking-wide font-bold">
                      {t("RequestsForm.fields.employeeCount")}
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{reviewData.employeesRequired}</p>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-5 border border-indigo-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-indigo-200 rounded-lg p-2">
                      <FaClock className="text-indigo-600" size={20} />
                    </div>
                    <p className="text-xs text-indigo-700 uppercase tracking-wide font-bold">
                      {t("RequestsForm.fields.shifts")}
                    </p>
                  </div>
                  <p className="text-base font-bold text-gray-900">
                    {
                      dataShift?.data?.find(
                        (shift) => String(shift.id) === String(reviewData.shift)
                      )?.name
                    }
                  </p>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-5 border border-pink-200 sm:col-span-2">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-pink-200 rounded-lg p-2">
                      <FaCalendarAlt className="text-pink-600" size={20} />
                    </div>
                    <p className="text-xs text-pink-700 uppercase tracking-wide font-bold">
                      {t("RequestsForm.fields.dateRange")}
                    </p>
                  </div>
                  <p className="text-base font-bold text-gray-900">
                    {reviewData.dateRange?.from?.toLocaleDateString?.() || "-"} -{" "}
                    {reviewData.dateRange?.to?.toLocaleDateString?.() || "-"}
                  </p>
                </div>
              </div>

              <div className="bg-red-50 border-2 border-red-200 text-red-800 px-5 py-4 rounded-xl">
                <p className="text-sm font-medium">
                  {t("RequestsForm.warning.policyText")}{" "}
                  <span className="font-bold text-red-900">&euro; 50</span>{" "}
                  {t("RequestsForm.warning.willbecharged")}
                </p>
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCancelReview}
                  className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                >
                  {t("RequestsForm.buttons.cancel")}
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={loadingPost}
                  className={`px-8 py-3 rounded-xl text-white font-bold shadow-lg transition-all duration-300 transform ${loadingPost
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#F47621] to-[#ff8c42] hover:from-[#E55A1A] hover:to-[#F47621] hover:shadow-xl hover:scale-105"
                    }`}
                >
                  {loadingPost ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {t("RequestsForm.buttons.submitting")}
                    </span>
                  ) : (
                    t("RequestsForm.buttons.submitRequest")
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {feedback.visible && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center px-4 sm:px-6 bg-black/40 backdrop-blur-sm pointer-events-none animate-slide-up">
          <div
            className={`pointer-events-auto w-full max-w-lg rounded-2xl shadow-2xl border-2 bg-white px-6 py-6 sm:px-8 sm:py-8 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5 animate-slide-up ${feedback.type === "success" ? "border-green-500" : "border-red-500"
              }`}
          >
            <div className="text-5xl sm:text-6xl flex-shrink-0 flex items-center justify-center">
              {feedback.type === "success" ? (
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl"></div>
                  <IoCheckmarkCircleOutline className="text-green-500 relative z-10" />
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl"></div>
                  <IoWarningOutline className="text-red-500 relative z-10" />
                </div>
              )}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p
                className={`text-xl sm:text-2xl font-bold ${feedback.type === "success" ? "text-gray-900" : "text-red-600"
                  }`}
              >
                {feedback.type === "success"
                  ? t("AddJob.successTitle")
                  : t("AddJob.errorTitle")}
              </p>
              <p className="text-base sm:text-lg text-gray-600 mt-2 leading-relaxed">
                {feedback.message}
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setFeedback((prev) => ({
                  ...prev,
                  visible: false,
                  message: "",
                }))
              }
              className="text-gray-400 hover:text-gray-600 transition-colors self-end sm:self-start"
              aria-label={t("RequestsForm.buttons.cancel")}
            >
              <IoClose size={24} />
            </button>
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

