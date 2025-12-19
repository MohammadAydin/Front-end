import { zodResolver } from "@hookform/resolvers/zod";
import shiftTimeSchema from "./validationSchema";
import InputField from "../InputField";
import { useForm } from "react-hook-form";
import ShiftTime from "./ShiftTime";
import SubmitButtons from "../FormElements/SubmitButtons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils/axios";
import { IoClose } from "react-icons/io5";
import { LuClock, LuPencil } from "react-icons/lu";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const EditShiftsForm = ({
  id,
  isFormOpen,
  setIsFormOpen,
  name,
  startTime,
  endtime,
}) => {
  const { t } = useTranslation();
  const time = [
    {
      label: t("Shifts.from"),
      timeField: "fromTime",
      PeriodField: "fromPeriod",
    },
    { label: t("Shifts.to"), timeField: "toTime", PeriodField: "toPeriod" },
  ];

  const queryClient = useQueryClient();
  const editShiftMutation = useMutation({
    mutationFn: (shift) =>
      customFetch.put(`/employer/shifts/${id}`, shift).then((res) => res.data),

    onSuccess: (data) => {
      toast.success(data.message || t("Shifts.shiftUpdatedSuccess"));
      queryClient.invalidateQueries(["/employer/shifts"]);
      reset();
      setIsFormOpen(false);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || t("Shifts.failedToUpdateShift")
      );
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(shiftTimeSchema),
    defaultValues: {
      shiftName: name,
      fromTime: startTime,
      toTime: endtime,
    },
  });

  const submit = (data) => {
    editShiftMutation.mutate({
      name: data.shiftName,
      start_time: data.fromTime,
      end_time: data.toTime,
    });
  };

  const handleClose = () => {
    reset();
    setIsFormOpen(false);
  };

  return (
    <>
      {isFormOpen && (
        <div
          className="w-full h-[100vh] fixed z-50 top-0 left-0 flex justify-center items-center bg-black/60 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleClose();
            }
          }}
        >
          <form
            onSubmit={handleSubmit(submit)}
            className="AddShiftsForm w-[600px] max-w-[90vw] bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-up"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#F47621] to-[#ff8c42] p-6 text-white relative">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              ></div>
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2">
                    <LuPencil size={24} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">
                    {t("Shifts.editShift")}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="cursor-pointer hover:bg-white/20 p-2 rounded-lg transition-all duration-300 hover:scale-110"
                  aria-label={t("common.close")}
                >
                  <IoClose size={24} className="text-white" />
                </button>
              </div>
            </div>

            {/* Form Body */}
            <div className="p-6 space-y-6">
              <InputField
                label={t("Shifts.shiftName")}
                type={"text"}
                register={register}
                errors={errors}
                name={"shiftName"}
                defaultvalue={name}
              />
              {errors.shiftName && (
                <span className="text-red-500 text-sm">
                  {errors.shiftName.message}
                </span>
              )}

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <LuClock size={20} className="text-[#F47621]" />
                  <span className="font-bold text-gray-700">
                    {t("Shifts.timeSchedule")}
                  </span>
                </div>
                <div className="ShiftTime flex gap-6">
                  {time.map((field, index) => (
                    <ShiftTime
                      key={field.label}
                      name={field.label}
                      register={register}
                      errors={errors}
                      timeField={field.timeField}
                      PeriodField={field.PeriodField}
                      defaultvalue={index === 0 ? startTime : endtime}
                    />
                  ))}
                </div>
              </div>

              {editShiftMutation.error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm">
                    {editShiftMutation.error?.response?.data?.message ||
                      t("Shifts.errorOccurredUpdating")}
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <SubmitButtons
                onCancel={handleClose}
                isLoading={editShiftMutation.isLoading}
                submitLabel={t("Shifts.update")}
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditShiftsForm;
