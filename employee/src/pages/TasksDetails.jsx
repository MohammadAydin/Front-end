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
import { MdCancel, MdReportProblem } from "react-icons/md";
import PopupCheckEnd from "../components/TaskComponents/PopupCheckEnd";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PopupReport from "../components/MoreElements/Popup/PopupReport";
import PopupReview from "../components/TaskComponents/PopupReview";
import { timeDifference } from "../utils/timeDifference";
import customFetch from "../utils/axios";

// Task details
const TasksDetails = () => {
  const queryClient = useQueryClient();

  const [ReportPopup, setReportPopup] = useState(false);

  const { t } = useTranslation();
  // Get id from route
  const { id } = useParams();

  // Fetch task data
  const { data: task, error, isLoading } = useJobs(`/tasks/${id}`);

  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude, error: null });
        },
        (error) => {
          setLocation({
            latitude: null,
            longitude: null,
            error: error.message,
          });
        }
      );
    } else {
      setLocation({
        latitude: null,
        longitude: null,
        error: "Geolocation is not supported by this browser.",
      });
    }
  }, []);

  const OnMyWay = useMutation({
    mutationFn: () =>
      customFetch
        .put(`/matching/tasks/${id}/on-the-way`)
        .then((res) => res.data),

    onSuccess: (data) => {
      console.log(data);
      handleSetLevel(2), toast.success(data?.message);
      queryClient.invalidateQueries([`/tasks/${id}`]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });
  const arrived = useMutation({
    mutationFn: () =>
      customFetch
        .put(`/matching/tasks/${id}/arrived`, {
          latitude: location.latitude,
          longitude: location.longitude,
        })
        .then((res) => res.data),

    // handleSetLevel(3),
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries([`/tasks/${id}`]);
    },
    onError: (error) => {
      console.log("sss");
      console.log(error);
      toast.error(error?.response?.data?.message);
    },
  });
  const statusButton = () => {
    if (task?.task?.status === "todo") {
      return { ButtonName: "Started Route", func: OnMyWay };
    }
    if (task?.task?.status === "OntheWay") {
      return { ButtonName: "Arrived", func: arrived };
    }
    if (task?.task?.status === "Arrived") {
      return { ButtonName: "Start Work", func: startWork };
    }
    if (task?.task?.status === "Arrived") {
      return { ButtonName: "Start Work", func: startWork };
    }
    if (task?.task?.status === "progress") {
      return { ButtonName: "Finish Task", func: endWork };
    }
  };

  // console.log(task?.task?.start_at);

  // console.log(task);
  // console.log(hoursdiff);
  // console.log(minutesDiff);
  // console.log(daysDiff);
  const [hoursdiff, setHoursdiff] = useState(0);
  const [minutesDiff, setMinutesDiff] = useState(0);
  const [daysDiff, setDaysDiff] = useState(0);

  useEffect(() => {
    if (new Date(task?.task?.StartDate) > new Date()) {
      const { days, hours, minutes } = timeDifference(
        new Date(),
        task?.task?.StartDate
      );
      setDaysDiff(days);
      setHoursdiff(hours);
      setMinutesDiff(minutes);
    }
  }, [task?.task?.StartDate]);

  const center = task?.coordinates
    ? { lat: task.coordinates.latitude, lng: task.coordinates.longitude }
    : { lat: 0, lng: 0 };

  const [level, setLevel] = useState(() => {
    const savedLevel = localStorage.getItem("level");
    return savedLevel ? JSON.parse(savedLevel) : 1;
  });

  const [Popuparrived, setPopuparrived] = useState(false);
  const [Popupend, setPopupend] = useState(false);
  const [popupReview, setPopupReview] = useState(false);
  const [startTime, setStartTime] = useState(false);
  const [endTime, setEndTime] = useState(false);

  const togglePopupReport = () => {
    setReportPopup(false);
  };
  const togglePopupend = () => {
    setPopupend(false);
  };
  const togglePopup = () => {
    setPopuparrived(false);
  };

  const handleSetLevel = (newLevel) => {
    setLevel(newLevel);
    if (newLevel === null) {
      localStorage.removeItem("level");
    } else {
      localStorage.setItem("level", JSON.stringify(newLevel));
    }
  };

  useEffect(() => {
    if (task?.task?.status === "done") {
      handleSetLevel(null);
    }
  }, [task?.task?.status]);

  const startWork = useMutation({
    mutationFn: () =>
      // customFetch
      //   .post(`/matching/declineRequest/${jobId}`)
      //   .then((res) => res.data),

      setPopuparrived(true),
    onSuccess: () => {
      toast.success("Enter pin code start work");
    },
    onError: (error) => {
      console.log(error);
      toast.error("The work start process did not succeed");
    },
  });
  const endWork = useMutation({
    mutationFn: () =>
      // customFetch
      //   .post(`/matching/declineRequest/${jobId}`)
      //   .then((res) => res.data),
      setPopupend(true),
    // handleSetLevel(5),
    onSuccess: () => {
      toast.success("Enter Pin Code end work");
    },
    onError: (error) => {
      toast.error("The work end process did not succeed");
    },
  });
  const [dayDifferencTask, setDayDifferencTask] = useState(false);
  useEffect(() => {
    const { days } = timeDifference(new Date(), task?.task?.StartDate);
    console.log(days);
    if (days >= 1) {
      setDayDifferencTask(true);
    }
  }, [task?.task?.StartDate]);

  // Show download or error status
  if (isLoading) return <Spinner />;
  if (error)
    return (
      <p className="text-red-500">
        {t("taskDetails.error")}: {error?.response?.data?.message}
      </p>
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
                  {daysDiff} d,{hoursdiff} h,{minutesDiff} m
                </p>
              </div>
              <div className="bg-[#E0FFE8] flex gap-1.5 items-center w-fit p-2 rounded-[6px] mt-2.5 text-[#34C759]">
                <LuBanknote />
                <p className="text-[0.8rem]">
                  {/* Remove commas from the cost */}
                  {parseFloat(task?.total_cost).toFixed(2)}
                </p>
              </div>
              {task?.task?.status !== "review" ||
              task?.task?.status !== "cancel" ? (
                <div className="flex gap-3.5 flex-wrap">
                  {/* Cancel Task Button with Enhanced Tooltip */}
                  <div className="relative group">
                    <button
                      onClick={() => setReportPopup(true)}
                      disabled={dayDifferencTask === false}
                      className={`flex items-center gap-1.5 w-fit p-2 rounded-[6px] mt-2.5 font-medium transition-all duration-300 shadow-sm text-[0.8rem] ${
                        dayDifferencTask === false
                          ? "text-gray-400 bg-gray-200 cursor-not-allowed"
                          : "text-white bg-red-500 hover:bg-red-600 hover:shadow-lg"
                      }`}
                    >
                      <MdCancel />
                      <p>{t("taskDetails.cancelTask")}</p>
                    </button>
                    
                    {/* Enhanced Tooltip */}
                    {dayDifferencTask === false && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 sm:px-4 py-2 sm:py-3 bg-gray-900 text-white text-xs sm:text-sm rounded-md sm:rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 w-64 sm:w-80 text-center">
                        <div className="relative">
                          <p className="font-medium mb-1">{t("taskDetails.cannotCancelTitle")}</p>
                          <p className="text-gray-300 text-xs sm:text-xs leading-relaxed">
                            {t("taskDetails.cannotCancelMessage")}
                          </p>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Have Issue Button */}
                  <button
                    onClick={() => window.location.href = `http://localhost:3001/reportTask/${id}`}
                    className="flex items-center gap-1.5 w-fit p-2 rounded-[6px] mt-2.5 text-white bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 hover:from-orange-500 hover:via-orange-600 hover:to-red-600 font-medium transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden text-[0.8rem]"
                    style={{
                      background: 'linear-gradient(135deg, #fb923c 0%, #f97316 50%, #ef4444 100%)',
                      boxShadow: '0 4px 15px rgba(249, 115, 22, 0.4)'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-20 transition-opacity duration-300 transform -skew-x-12"></div>
                    <MdReportProblem className="relative z-10" />
                    <p className="relative z-10">{t("taskDetails.haveIssue")}</p>
                  </button>
                </div>
              ) : null}
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-4 p-4 bg-white rounded-2xl shadow-md border border-gray-100 w-fit">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 font-medium">Start Date : </span>
              <span className="text-gray-800 font-semibold">
                {task?.task?.StartDate}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500 font-medium">End Date : </span>
              <span className="text-gray-800 font-semibold">
                {task?.task?.EndDate}
              </span>
            </div>
          </div>

          {/* Task description */}
          <div className="mt-8">
            <h2 className="mb-3 text-xl">{t("taskDetails.positionDetails")}</h2>
            <p className="text-softColor">{task?.job_posting?.description}</p>
          </div>

          {/* Work duration today */}
          <div className="mt-8">
            {/* <h2 className="mb-3 text-xl">
              {t("taskDetails.workDurationToday")}
            </h2> */}
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

          {/* buttons
          {task?.task?.status !== "review" ||
          task?.task?.status !== "cancel" ? (
            <div className="flex gap-5 mt-[30vh] justify-end max-[1109px]:mt-[6vh]">
              {level == 1 && (
                <button
                  onClick={() => OnMyWay.mutate()}
                  className="text-white bg-secondaryColor text-xl p-2 w-[8em] rounded-[10px]"
                >
                  On the Way
                </button>
              )}
              {localStorage.getItem("level") == 2 && (
                <button
                  onClick={() => arrived.mutate()}
                  className="text-white bg-secondaryColor text-xl p-2 w-[8em] rounded-[10px]"
                >
                  Arrived
                </button>
              )}
              {localStorage.getItem("level") == 3 && (
                <button
                  onClick={() => startWork.mutate()}
                  className="text-white bg-secondaryColor text-xl p-2 w-[8em] rounded-[10px]"
                >
                  Start Work
                </button>
              )}
              {localStorage.getItem("level") == 4 && (
                <button
                  onClick={() => endWork.mutate()}
                  className="text-white bg-secondaryColor text-xl p-2 w-[8em] rounded-[10px]"
                >
                  Complete Task
                </button>
              )}
              {localStorage.getItem("level") == 5 && (
                <button
                  onClick={() => setPopupend(true)}
                  className="text-white bg-secondaryColor text-xl p-2 w-[10em] rounded-[10px]"
                >
                  Finish Task{" "}
                </button>
              )}
            </div>
          ) : null} */}
          <div className="flex gap-5 mt-[30vh] justify-end max-[1109px]:mt-[6vh]">
            <button
              onClick={() => statusButton()?.func.mutate()}
              className="text-white bg-secondaryColor text-xl p-2 w-[10em] rounded-[10px]"
            >
              {statusButton()?.ButtonName}
            </button>
          </div>
        </div>
      </div>
      {Popuparrived && (
        <PopupCheck
          togglePopup={togglePopup}
          idTask={id}
          handleSetLevel={handleSetLevel}
        />
      )}
      {Popupend && (
        <PopupCheckEnd
          togglePopup={togglePopupend}
          idTask={id}
          handleSetLevel={handleSetLevel}
          setPopupReview={setPopupReview}
        />
      )}
      {popupReview && (
        <PopupReview
          togglePopup={togglePopupend}
          idTask={id}
          handleSetLevel={handleSetLevel}
          setPopupReview={setPopupReview}
        />
      )}
      {ReportPopup && (
        <PopupReport
          status={task?.task?.status}
          dayDifferencTask={dayDifferencTask}
          togglePopup={togglePopupReport}
          idTask={id}
        />
      )}
    </div>
  );
};

export default TasksDetails;
