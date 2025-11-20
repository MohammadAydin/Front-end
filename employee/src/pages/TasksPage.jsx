import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import imgjob from "../assets/images/jobRequest/jobRequest.svg";
import useJobs from "../hooks/useJobs";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Spinner from "../components/MoreElements/Spinner";
import Filter from "../components/MoreElements/Filter";
import statusTask from "../hooks/statusTask";
import { BsListTask } from "react-icons/bs";
import { RiErrorWarningLine } from "react-icons/ri";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { useTranslation } from "react-i18next";
import useData from "../hooks/useData";
import useStatusAccount from "../store/storeStatusAccount";
import statusAccount from "../utils/statusAccountReturn";
import {
  LuCalendar,
  LuCalendarCheck,
  LuArrowRight,
  LuClock,
  LuFileCheck,
} from "react-icons/lu";

const TasksPage = () => {
  const [selectedValue, setSelectedValue] = useState();
  const { t } = useTranslation();
  // To store tasks
  const { data: tasks, error, isLoading } = useJobs("/tasks");
  const filterTasks =
    selectedValue === "all" || !selectedValue
      ? tasks
      : tasks.filter((task) => task.status === selectedValue);

  if (localStorage.getItem("statusAccount") !== "approved")
    return statusAccount(localStorage.getItem("statusAccount"));

  if (isLoading) return <Spinner />;
  if (error) {
    if (
      error?.response?.data?.message ==
      "No valid active locations found for employee."
    ) {
      return (
        <div className="flex flex-col justify-center items-center h-screen gap-6 px-4">
          <div className="relative max-w-md w-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
            </div>
            <div className="relative bg-white rounded-2xl shadow-xl p-12 border border-gray-100 text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full blur-xl"></div>
                  <div className="relative bg-gradient-to-br from-red-500 to-orange-500 rounded-full p-6">
                    <RiErrorWarningLine size={64} className="text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {t("tasks.noActiveLocations")}
              </h3>
              <p className="text-gray-600 mb-6">
                {t("tasks.addLocationDescription")}
              </p>
              <Link
                to="/locationInfo"
                className="inline-block bg-gradient-to-r from-[#F47621] to-[#ff8c42] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                {t("tasks.addLocation")}
              </Link>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col justify-center items-center h-screen gap-6 px-4">
          <div className="relative max-w-md w-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
            </div>
            <div className="relative bg-white rounded-2xl shadow-xl p-12 border border-gray-100 text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full blur-xl"></div>
                  <div className="relative bg-gradient-to-br from-red-500 to-orange-500 rounded-full p-6">
                    <RiErrorWarningLine size={64} className="text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {t("tasks.errorTitle")}
              </h3>
              <p className="text-gray-600">
                {error?.response?.data?.message || t("tasks.errorMessage")}
              </p>
            </div>
          </div>
        </div>
      );
    }
  }
  // Get status icon
  const getStatusIcon = (status) => {
    const iconMap = {
      todo: LuClock,
      done: IoCheckmarkDoneCircle,
      progress: LuClock,
      review: LuFileCheck,
      Canceled: MdCancel,
      Canselled: MdCancel,
    };
    return iconMap[status] || LuClock;
  };

  // Count tasks by status
  const taskCounts = {
    all: tasks?.length || 0,
    todo: tasks?.filter((t) => t.status === "todo").length || 0,
    done: tasks?.filter((t) => t.status === "done").length || 0,
    progress: tasks?.filter((t) => t.status === "progress").length || 0,
    review: tasks?.filter((t) => t.status === "review").length || 0,
    Canselled: tasks?.filter((t) => t.status === "Canselled" || t.status === "Canceled").length || 0,
  };

  return (
    <div className="p-[28px] py-[58px] max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              {t("tasks.myTasks")}
            </h1>
            <p className="text-gray-600">
              {filterTasks?.length || 0} {filterTasks?.length === 1 ? t("tasks.task") : t("tasks.tasks")}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-xl shadow-md px-4 py-2 border border-gray-200">
              <Filter
                options={["all", "todo", "done", "progress", "review", "Canselled"]}
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
              />
            </div>
          </div>
        </div>

        {/* Status Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
          {["all", "todo", "done", "progress", "review", "Canselled"].map((status) => {
            const isActive = selectedValue === status || (!selectedValue && status === "all");
            const StatusIcon = getStatusIcon(status);
            return (
              <button
                key={status}
                onClick={() => setSelectedValue(status === "all" ? undefined : status)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-br from-[#F47621] to-[#ff8c42] border-[#F47621] text-white shadow-lg"
                    : "bg-white border-gray-200 hover:border-[#F47621]/50 hover:shadow-md"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <StatusIcon size={24} />
                  <span className="text-xs font-semibold">
                    {status === "all" ? t("tasks.filter.all") : statusTask(status).statusText}
                  </span>
                  <span className={`text-lg font-bold ${isActive ? "text-white" : "text-gray-800"}`}>
                    {taskCounts[status] || 0}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filterTasks?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="relative max-w-md w-full">
              {/* Animated Background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-gradient-to-br from-[#F47621]/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
              </div>
              
              {/* Empty State Card */}
              <div className="relative bg-white rounded-2xl shadow-xl p-12 border border-gray-100">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#F47621]/20 to-blue-500/20 rounded-full blur-xl"></div>
                    <div className="relative bg-gradient-to-br from-[#F47621] to-[#ff8c42] rounded-full p-6">
                      <BsListTask size={64} className="text-white" />
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center text-gray-800 mb-3">
                  {t("tasks.noTasksTitle")}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {t("tasks.noTasksMessage", {
                    status:
                      statusTask(selectedValue).statusText === "Unknown"
                        ? ""
                        : statusTask(selectedValue).statusText,
                  })}
                </p>
              </div>
            </div>
          </div>
        ) : (
          filterTasks?.map((task) => {
            const StatusIcon = getStatusIcon(task.status);
            const statusInfo = statusTask(task.status);
            return (
              <div
                key={task.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 hover:border-[#F47621]/30 transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                    {/* Task Image */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#F47621]/20 to-blue-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                        <img
                          className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover shadow-md group-hover:scale-105 transition-transform duration-300"
                          src={imgjob}
                          alt="Task"
                        />
                      </div>
                    </div>

                    {/* Task Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#F47621] transition-colors duration-300">
                        {task?.job_posting?.title || t("tasks.untitledTask")}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Start Date */}
                        <div className="flex items-center gap-3 bg-gradient-to-br from-gray-50 to-white rounded-lg p-3 border border-gray-200">
                          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg p-2">
                            <LuCalendar className="text-blue-600" size={20} />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                              {t("tasks.startDate")}
                            </p>
                            <p className="text-sm font-medium text-gray-800">
                              {task?.StartDate || t("tasks.notSet")}
                            </p>
                          </div>
                        </div>

                        {/* End Date */}
                        <div className="flex items-center gap-3 bg-gradient-to-br from-gray-50 to-white rounded-lg p-3 border border-gray-200">
                          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-lg p-2">
                            <LuCalendarCheck className="text-green-600" size={20} />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                              {t("tasks.endDate")}
                            </p>
                            <p className="text-sm font-medium text-gray-800">
                              {task?.EndDate || t("tasks.notSet")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Status & Actions */}
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 w-full lg:w-auto">
                      {/* Status Badge */}
                      <div className="flex items-center gap-2">
                        <div
                          className={`${statusInfo.statusColorClass} text-white px-4 py-2 rounded-xl font-semibold shadow-lg flex items-center gap-2 min-w-[120px] justify-center`}
                        >
                          <StatusIcon size={18} />
                          <span className="capitalize">{statusInfo.statusText || task.status}</span>
                        </div>
                      </div>

                      {/* Action Button */}
                      {task.status !== "done" && (
                        <Link
                          to={`/taskDetails/${task.id}`}
                          className="w-full lg:w-auto bg-gradient-to-r from-[#F47621] to-[#ff8c42] text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                        >
                          <span>{t("tasks.seeDetails")}</span>
                          <LuArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-300" size={18} />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TasksPage;
