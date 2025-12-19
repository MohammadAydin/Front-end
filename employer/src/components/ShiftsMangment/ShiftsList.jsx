import { Mutation, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { LuPencil, LuTrash2, LuClock } from "react-icons/lu";
import customFetch from "../../utils/axios";
import { toast } from "react-toastify";
import EditShiftsForm from "./EditShiftsForm";
import { useTranslation } from "react-i18next";

const ShiftsList = ({ id, name, startTime, endTime }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const deleteShift = useMutation({
    mutationFn: (id) =>
      customFetch.delete(`/employer/shifts/${id}`).then((res) => res.data),

    onSuccess: (data) => {
      toast.success(data.message || t("Shifts.shiftDeletedSuccess"));
      queryClient.invalidateQueries(["/employer/shifts"]);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || t("Shifts.failedToDeleteShift")
      );
    },
  });

  const handleDelete = () => {
    if (window.confirm(t("Shifts.deleteConfirm"))) {
      deleteShift.mutate(id);
    }
  };

  const formatTime = (time) => {
    if (!time) return "N/A";
    // If time is already in HH:MM format, return as is
    if (time.match(/^\d{2}:\d{2}$/)) {
      return time;
    }
    // Otherwise, try to format it
    return time;
  };

  return (
    <>
      <div
        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-[#F47621] p-6 relative overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Gradient Background on Hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-[#F47621]/5 to-blue-500/5 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        ></div>

        <div className="relative z-10">
          {/* Shift Name */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
            <div className="h-1 w-12 bg-gradient-to-r from-[#F47621] to-[#ff8c42] rounded-full"></div>
          </div>

          {/* Time Information */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-gray-700">
              <div className="bg-blue-100 rounded-lg p-2">
                <LuClock size={20} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <span className="text-sm text-gray-500 font-medium">
                  {t("Shifts.from")}:
                </span>
                <span className="ml-2 font-semibold text-gray-800">
                  {formatTime(startTime)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <div className="bg-green-100 rounded-lg p-2">
                <LuClock size={20} className="text-green-600" />
              </div>
              <div className="flex-1">
                <span className="text-sm text-gray-500 font-medium">
                  {t("Shifts.to")}:
                </span>
                <span className="ml-2 font-semibold text-gray-800">
                  {formatTime(endTime)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
            >
              <LuPencil size={18} />
              <span>{t("Shifts.edit")}</span>
            </button>
            <button
              onClick={handleDelete}
              disabled={deleteShift.isLoading}
              className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LuTrash2 size={18} />
              <span>
                {deleteShift.isLoading
                  ? t("Shifts.deleting")
                  : t("Shifts.delete")}
              </span>
            </button>
          </div>
        </div>
      </div>

      {isFormOpen && (
        <EditShiftsForm
          id={id}
          isFormOpen={isFormOpen}
          setIsFormOpen={setIsFormOpen}
          name={name}
          startTime={startTime}
          endtime={endTime}
        />
      )}
    </>
  );
};

export default ShiftsList;
