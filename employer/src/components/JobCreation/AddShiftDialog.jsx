import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import customFetch from "../../utils/axios";
import InputField from "../InputField";
import { IoClose } from "react-icons/io5";
import shiftTimeSchema from "../ShiftsMangment/validationSchema";
import ShiftTime from "../ShiftsMangment/ShiftTime";
import { useQueryClient } from "@tanstack/react-query";

const AddShiftDialog = ({ isOpen, setIsOpen, onShiftCreated }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  // Reuse the same validation and inputs used in /shifts

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(shiftTimeSchema),
    defaultValues: {
      fromTime: "08:00",
      toTime: "16:00",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await customFetch.post("/employer/shifts", {
        name: data.shiftName,
        start_time: data.fromTime,
        end_time: data.toTime,
      });
      
      toast.success(response?.data?.message || t("AddJob.shiftCreatedSuccess"));
      
      // Call the callback with the new shift data
      const newShift = response.data?.data;
      if (newShift) {
        // Optimistically update cached list so dropdown updates instantly
        queryClient.setQueryData(["/employer/shifts"], (prev) => {
          if (!prev) return prev;
          const prevData = Array.isArray(prev?.data) ? prev.data : [];
          return { ...(prev || {}), data: [...prevData, newShift] };
        });
        if (onShiftCreated) onShiftCreated(newShift);
      }
      // Ensure server sync as well
      queryClient.invalidateQueries(["/employer/shifts"]);
      
      setLoading(false);
      setIsOpen(false);
      reset();
    } catch (error) {
      toast.error(error?.response?.data?.message || t("AddJob.shiftCreatedError"));
      console.error("Error creating shift:", error);
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    reset();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-center items-center bg-[#28293d94]">
      <div className="AddShiftDialog w-[440px] bg-white rounded-2xl p-6 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <IoClose size={24} />
        </button>

        <h3 className="text-xl font-bold mb-6 text-gray-800">
          {t("AddJob.addNewShiftTitle")}
        </h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Shift Name */}
          <InputField
            label={t("AddJob.shiftNameLabel")}
            type="text"
            register={register}
            errors={errors}
            name="shiftName"
            placeholder={t("AddJob.shiftNamePlaceholder")}
          />

          {/* Add Time Section */}
          <div className="mt-6 mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              {t("AddJob.addTimeLabel")}
            </label>
            
            <div className="flex items-center gap-10">
              <ShiftTime
                name={t("AddJob.fromLabel")}
                register={register}
                errors={errors}
                timeField="fromTime"
                defaultvalue="08:00"
              />
              <ShiftTime
                name={t("AddJob.toLabel")}
                register={register}
                errors={errors}
                timeField="toTime"
                defaultvalue="16:00"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="bg-[#F1F1F5] text-[#28293D] font-bold px-6 py-2 rounded-lg hover:bg-[#cfcfd3] transition-colors"
            >
              {t("AddJob.cancelButton")}
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "bg-gray-400" : "bg-[#F47621]"
              } text-white font-bold px-8 py-2 rounded-lg hover:bg-[#EE6000] transition-colors`}
            >
              {loading ? t("AddJob.adding") : t("AddJob.addButton")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddShiftDialog;

