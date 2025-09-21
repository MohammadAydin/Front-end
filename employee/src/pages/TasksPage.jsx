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
import { useTranslation } from "react-i18next";
import useData from "../hooks/useData";
import useStatusAccount from "../store/storeStatusAccount";
import statusAccount from "../utils/statusAccountReturn";

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
        <div className="flex flex-col justify-center items-center h-screen gap-4">
          <RiErrorWarningLine className="text-[#194894] text-9xl " />

          <p className="text-black">{t("tasks.noActiveLocations")}</p>
          <Link
            to="/locationInfo"
            className="bg-[#12151b] text-white py-1 px-2 rounded-[10px]"
          >
            {t("tasks.addLocation")}
          </Link>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col justify-center items-center h-screen gap-4">
          <RiErrorWarningLine className="text-[#194894] text-9xl " />

          <p className="text-black">{error?.response?.data?.message}</p>
        </div>
      );
    }
  }
  return (
    <div className="p-[28px] py-[58px]">
      <div className="JobRequestList mt-6">
        <div className="head-List flex justify-between">
          <h2 className="text-xl">{t("tasks.myTasks")}</h2>
          <Filter
            options={["all", "todo", "done", "progress", "review", "Canselled"]}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
          />
        </div>
        <div className="body-list mt-5 ">
          {/* Loop through tasks array */}
          {filterTasks.length == 0 && (
            <>
              <div className="flex flex-col items-center justify-center mt-30">
                <BsListTask className="text-6xl mb-3 text-secondaryColor " />

                <p className="text-center">
                  {t("tasks.noTasksMessage", {
                    status:
                      statusTask(selectedValue).statusText === "Unknown"
                        ? ""
                        : statusTask(selectedValue).statusText,
                  })}
                </p>
              </div>
            </>
          )}
          {filterTasks?.map((task) => (
            <div
              key={task.id}
              className="task-div flex justify-between items-center mb-7 p-4 max-[510px]:flex-col max-[510px]:items-start max-[510px]:gap-5"
            >
              <div className="imgAndinfo flex gap-5 items-center flex-wrap">
                {/* View a picture of the elderly house*/}
                <img className=" rounded-4xl" src={imgjob} alt="" />
                {/* Display price with tasks title */}
                <div className="info">
                  <p className="">{task?.job_posting.title}</p>
                </div>
                <div>
                  {" "}
                  <div className="flex flex-col">
                    <p className="flex text-softColor text-[0.8rem] justify-between">
                      <span> Start Task &nbsp; </span> : &nbsp;{task?.StartDate}
                    </p>
                    <p className="flex text-softColor text-[0.8rem] justify-between">
                      <span>End Task &nbsp;</span> : &nbsp;{task?.EndDate}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={`${
                  task.status == "done" && " flex-row-reverse"
                } min-w-[10vw] flex items-center gap-3 justify-start  max-[750px]:flex-col `}
              >
                {task.status !== "done" && (
                  <Link
                    to={`/taskDetails/${task.id}`}
                    className="border  py-1 px-3.5 rounded-[10px]"
                  >
                    {t("tasks.seeDetails")}
                  </Link>
                )}

                <div
                  className={`${
                    statusTask(task.status).statusColorClass
                  } text-white py-1 w-[100px] rounded-[10px] text-center`}
                >
                  {task.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
