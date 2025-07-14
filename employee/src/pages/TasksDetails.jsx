import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useJobs from "../hooks/useJobs";
import { IoIosArrowBack } from "react-icons/io";
import imgjob from "../assets/images/jobRequest/jobRequest.svg";
import { toast } from "react-toastify";
import Spinner from "../components/MoreElements/Spinner";
import { GoogleMap, Marker } from "@react-google-maps/api";
import {
  PiHourglassLowFill,
  PiShootingStarDuotone,
  PiUser,
} from "react-icons/pi";
import { LuBanknote } from "react-icons/lu";
import iconoclock from "../assets/icons/icoonoclock.svg";
import PopupCheck from "../components/TaskComponents/PopupCheck";
import { CiFileOn } from "react-icons/ci";
import PopupCheckEnd from "../components/TaskComponents/PopupCheckEnd";
import { useTranslation } from "react-i18next";

// Task details
const TasksDetails = () => {
  const { t } = useTranslation();
  // Get id from route
  const { id } = useParams();

  // Fetch task data
  const { data: task, error, isLoading } = useJobs(`/tasks/${id}`);

  // The default value is in seconds from the localStorage .
  const [duration, setDuration] = useState(() => {
    const savedDuration = localStorage.getItem(`task_${id}_duration`);
    return savedDuration ? parseInt(savedDuration, 10) : 0;
  });

  // The default value is the temporary state of LocalStorage.
  const [timerActive, setTimerActive] = useState(() => {
    return localStorage.getItem(`task_${id}_timerActive`) === "true";
  });

  // Define the user's status as being on the road
  const [isOnMyWay, setIsOnMyWay] = useState(false);
  const [isArrived, setisArrived] = useState(false);
  const [isCheckArrived, setisCheckArrived] = useState(false);
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [isShowPopupEnd, setIsShowPopupEnd] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [isCheckEnd, setisCheckEnd] = useState(false);

  // State where the default value is the timer start time.
  const [startTime, setStartTime] = useState(() => {
    const savedStartTime = localStorage.getItem(`task_${id}_startTime`);
    return savedStartTime ? parseInt(savedStartTime, 10) : null;
  });

  // Reverse pop-up status
  const togglePopup = () => {
    setIsShowPopup(!isShowPopup);
  };
  // Reverse pop-up status
  const togglePopupEnd = () => {
    setIsShowPopupEnd(!isShowPopupEnd);
  };
  // State to store the remaining time to start the task
  const [timeInfo, setTimeInfo] = useState(null);

  useEffect(() => {
    // If the data is not ready or loaded, nothing will be executed.
    if (!task || isLoading) return;

    // Function to calculate the time remaining for a task to start
    const updateTime = () => {
      const dateFrom = task?.job_posting?.date_from; // Task start date
      const startTime = task?.job_posting?.shift?.start_time; // Task start date by hour according to shift

      // If the timing or shift hours are not available, a warning will be printed.
      if (!dateFrom || !startTime) {
        console.warn("Task date or time is not available");
        return;
      }

      // Create an object for current timing
      const combinedDateTime = new Date(`${dateFrom}T${startTime}:00`);

      // Make sure the current time is valid
      if (isNaN(combinedDateTime.getTime())) {
        console.warn(
          "The current date is invalid :",
          `${dateFrom}T${startTime}:00`
        );
        return;
      }

      // Calculate the difference between the current date and the task start date.
      const now = new Date();
      const diffInMs = combinedDateTime - now;
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      const diffDays = Math.floor(diffInMinutes / (60 * 24));
      const diffHours = Math.floor((diffInMinutes % (60 * 24)) / 60);
      const diffMins = diffInMinutes % 60;

      // Update status and time information
      setTimeInfo({
        dateString: dateFrom,
        timeString: startTime,
        diffDays,
        diffHours,
        diffMinutes: diffMins,
      });
    };

    // Call function
    updateTime();

    // Call the function every minute to update the time.
    const intervalId = setInterval(updateTime, 60000);

    // Clean the timer
    return () => clearInterval(intervalId);

    // Update use effect based on tasks or load
  }, [task, isLoading]);

  // use effect to calculate start time
  useEffect(() => {
    // If the counter is not stored or the task start dates are not present
    if (
      !timerActive ||
      !task?.job_posting?.date_from ||
      !task?.job_posting?.shift?.end_time
    ) {
      // Don't implement anything
      return;
    }

    // Create a task end time
    const endTimeString = `${task.job_posting.date_from}T${task.job_posting.shift.end_time}:00`;
    // Convert task end time to a valid date
    const endTime = new Date(endTimeString).getTime();

    // Temporary action that occurs every second
    const interval = setInterval(() => {
      const now = new Date().getTime();

      // If the current time is greater than the task's end time
      if (now >= endTime) {
        // Cleans the interval
        clearInterval(interval);
        // Stop the timer
        setTimerActive(false);
        // Emptying Local Storage of Temporary Files
        localStorage.removeItem(`task_${id}_timerActive`);
        localStorage.removeItem(`task_${id}_duration`);
        localStorage.removeItem(`task_${id}_startTime`);
        toast.info(t("taskDetails.taskTimeout"));
        return;
      }

      // If the timer has started
      if (startTime) {
        const newDuration = Math.floor((now - startTime) / 1000);
        setDuration(newDuration);
        localStorage.setItem(`task_${id}_duration`, newDuration);
      } else {
        // If the starting time is not present, it increases gradually.
        setDuration((prev) => {
          const newDuration = prev + 1;
          localStorage.setItem(`task_${id}_duration`, newDuration);
          return newDuration;
        });
      }
    }, 1000);

    // Clean the timer when finished
    return () => clearInterval(interval);
  }, [timerActive, task, startTime, id]);

  // function on my way
  const handleOnMyWay = () => {
    setIsOnMyWay(true);
    setisArrived(true);
    toast.success(t("taskDetails.onYourWay"));
  };

  // The function has arrived
  const handleArrived = () => {
    setisArrived(false);
    setisCheckArrived(true);

    // He does the timer
    setTimerActive(true);
    // Brings the current time[]
    const now = new Date().getTime();
    // Saves the current time and start time.
    setStartTime(now);
    // Saves start time in local storage
    localStorage.setItem(`task_${id}_startTime`, now);
    // Save the temporary state in local storage
    localStorage.setItem(`task_${id}_timerActive`, "true");

    // Set the counter from zero
    localStorage.setItem(`task_${id}_duration`, "0");
    // Set the timer from zero
    setDuration(0);

    toast.success(t("taskDetails.workStarted"));
  };

  // Function to format duration to hours, minutes, and seconds
  const formatDuration = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Map coordinates setting
  const center = task?.coordinates
    ? {
        lat: task.coordinates.latitude,
        lng: task.coordinates.longitude,
      }
    : { lat: 0, lng: 0 };

  // Show download or error status
  if (isLoading) return <Spinner />;
  if (error)
    return (
      <p className="text-red-500">{t("taskDetails.error")}: {error?.response?.data?.message}</p>
    );

  // start return
  return (
    <div className="container-main p-7 pl-3">
      {/* Page header */}
      <div className="flex items-center gap-2.5">
        <Link to="/tasksPage">
          <IoIosArrowBack />
        </Link>
        <h2 className="text-xl">{t("tasks.myTasks")}</h2>
      </div>

      {/* Page layout using grid */}
      <div className="grid grid-cols-2 pl-3 max-[1109px]:grid-cols-1">
        {/* Left section: Mission details */}
        <div className="grid-cols-1">
          {/* Task image */}
          <img
            className="mt-8 w-[15vw] rounded-full"
            src={imgjob}
            alt="Task photo"
          />

          {/* Task title */}
          <div className="mt-6">
            <div className="flex items-center w-[70%] justify-between">
              <h2 className="text-xl">{task?.job_posting?.title}</h2>
              <div className="text-[#34C759] flex items-center gap-1">
                <PiShootingStarDuotone />
                <p className="text-[0.8rem]">{t("taskDetails.closeToYou")}</p>
              </div>
            </div>

            {/* Specialization, time to start, and cost             */}
            <div className="flex gap-3.5 flex-wrap">
              <div className="bg-[#E2EDFF] flex gap-1.5 items-center w-fit p-2 rounded-[6px] mt-2.5 text-[#194894]">
                <PiUser />
                <p className="text-[0.8rem]">{task?.job_posting?.position}</p>
              </div>
              <div className="bg-[#FFF0E5] flex gap-1.5 items-center w-fit p-1 rounded-[6px] mt-2.5 text-[#F47621]">
                <PiHourglassLowFill />
                <p className="text-[0.8rem]">
                  {timeInfo
                    ? t("taskDetails.daysHoursMinutes", {
                        days: timeInfo.diffDays,
                        hours: timeInfo.diffHours,
                        minutes: timeInfo.diffMinutes
                      })
                    : t("taskDetails.calculating")}
                </p>
              </div>
              <div className="bg-[#E0FFE8] flex gap-1.5 items-center w-fit p-2 rounded-[6px] mt-2.5 text-[#34C759]">
                <LuBanknote />
                <p className="text-[0.8rem]">
                  {/* Remove commas from the cost */}
                  {parseFloat(task?.total_cost).toFixed(2)}
                </p>
              </div>
              <Link
                to={`/reportTask/${id}`}
                className="flex items-center gap-1 text-secondaryColor bg-softwhite py-1 px-2.5 rounded-[10px] mt-1.5"
              >
                <CiFileOn className="text-xl" />
                <p className="text-xs mt-1">{t("taskDetails.reportTask")}</p>
              </Link>
            </div>
          </div>

          {/* Task description */}
          <div className="mt-8">
            <h2 className="mb-3 text-xl">{t("taskDetails.positionDetails")}</h2>
            <p className="text-softColor">{task?.job_posting?.description}</p>
          </div>

          {/* Work duration today*/}
          <div className="mt-8">
            <h2 className="mb-3 text-xl">{t("taskDetails.workDurationToday")}</h2>
            {timerActive && (
              <div className="bg-[#FFF0E5] flex gap-1.5 items-center w-fit p-1 rounded-[6px] text-[#F47621]">
                <img src={iconoclock} alt="iconoclock " />
                {/* Timer format */}
                <p className="text-[0.9rem]">{formatDuration(duration)}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Section Location and Map */}
        <div className="grid-cols-1 max-[1109px]:mt-3.5">
          {/* address */}
          <div>
            <h2 className="text-xl">{t("taskDetails.medConnectLocation")}</h2>
            <p className="mt-2 text-softColor">
              {task?.job_posting?.location.street1} -
              {task?.job_posting?.location.street2} -
              {task?.job_posting?.location.city} -
              {task?.job_posting?.location.country}
            </p>
          </div>

          {/*  Google map */}
          <div className="mt-8">
            <GoogleMap
              mapTypeControl={false}
              mapContainerStyle={{ width: "100%", height: "300px" }}
              center={center}
              zoom={15}
              options={{
                mapTypeControl: false,
                streetViewControl: false,
              }}
            >
              <Marker position={center} />
            </GoogleMap>
          </div>

          {/* buttons */}
          <div className="flex gap-5 mt-[30vh] justify-end max-[1109px]:mt-[6vh]">
            {!isOnMyWay && (
              <button
                onClick={handleOnMyWay}
                className="text-white bg-secondaryColor text-xl p-2 w-[8em] rounded-[10px]"
              >
                {t("taskDetails.onMyWay")}
              </button>
            )}
            {isArrived && (
              <button
                onClick={handleArrived}
                className="text-white bg-secondaryColor text-xl p-2 w-[8em] rounded-[10px]"
              >
                {t("taskDetails.arrived")}
              </button>
            )}
            {isCheckArrived && (
              <button
                onClick={() => setIsShowPopup(true)}
                className="text-white bg-secondaryColor text-xl p-2 w-[8em] rounded-[10px]"
              >
                {t("taskDetails.startWork")}
              </button>
            )}

            {isEnd && (
              <button
                onClick={() => setIsShowPopupEnd(true)}
                className="text-white bg-secondaryColor text-xl p-2 w-[8em] rounded-[10px]"
              >
                {t("taskDetails.endWork")}
              </button>
            )}
          </div>
          {isShowPopup && (
            <PopupCheck
              togglePopup={togglePopup}
              idTask={id}
              setisCheckArrived={setisCheckArrived}
              setIsEnd={setIsEnd}
            />
          )}
          {isShowPopupEnd && (
            <PopupCheckEnd
              togglePopup={togglePopupEnd}
              idTask={id}
              setisCheckEnd={setisCheckEnd}
              setIsEnd={isCheckEnd}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksDetails;
