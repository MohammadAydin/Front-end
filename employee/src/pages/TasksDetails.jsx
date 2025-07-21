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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PopupReview from "../components/TaskComponents/PopupReview";

// Task details
const TasksDetails = () => {
  const { t } = useTranslation();
  // Get id from route
  const { id } = useParams();

  // Fetch task data
  const { data: task, error, isLoading } = useJobs(`/tasks/${id}`);
  const center = task?.coordinates
    ? { lat: task.coordinates.latitude, lng: task.coordinates.longitude }
    : { lat: 0, lng: 0 };

  const queryClient = useQueryClient();

  const [level, setLevel] = useState(() => {
    const savedLevel = localStorage.getItem("level");
    return savedLevel ? JSON.parse(savedLevel) : 1;
  });

  const [Popuparrived, setPopuparrived] = useState(false);
  const [Popupend, setPopupend] = useState(false);
  const [popupReview, setPopupReview] = useState(false);

  const togglePopup = () => {
    setPopuparrived(false);
  };
  const togglePopupend = () => {
    setPopupend(false);
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
  const OnMyWay = useMutation({
    mutationFn: () =>
      // customFetch
      //   .post(`/matching/declineRequest/${jobId}`)
      //   .then((res) => res.data),
      handleSetLevel(2),
    onSuccess: () => {
      toast.success("ok your in way");
    },
    onError: (error) => {
      toast.error("no your in way");
    },
  });

  const arrived = useMutation({
    mutationFn: () =>
      // customFetch
      //   .post(`/matching/declineRequest/${jobId}`)
      //   .then((res) => res.data),

      handleSetLevel(3),
    onSuccess: () => {
      toast.success("ok your arrived");
    },
    onError: (error) => {
      toast.error("no your arrived");
    },
  });
  const startWork = useMutation({
    mutationFn: () =>
      // customFetch
      //   .post(`/matching/declineRequest/${jobId}`)
      //   .then((res) => res.data),

      setPopuparrived(true),
    onSuccess: () => {},
    onError: (error) => {
      toast.error("no your arrived");
    },
  });
  const endWork = useMutation({
    mutationFn: () =>
      // customFetch
      //   .post(`/matching/declineRequest/${jobId}`)
      //   .then((res) => res.data),

      handleSetLevel(5),
    onSuccess: () => {
      toast.success("ok your end work");
    },
    onError: (error) => {
      toast.error("no your arrived");
    },
  });

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
                <p className="text-[0.8rem]"></p>
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
            <h2 className="mb-3 text-xl">
              {t("taskDetails.workDurationToday")}
            </h2>
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
            {level == 1 && (
              <button
                onClick={() => OnMyWay.mutate()}
                className="text-white bg-secondaryColor text-xl p-2 w-[8em] rounded-[10px]"
              >
                {t("taskDetails.onMyWay")}
              </button>
            )}
            {localStorage.getItem("level") == 2 && (
              <button
                onClick={() => arrived.mutate()}
                className="text-white bg-secondaryColor text-xl p-2 w-[8em] rounded-[10px]"
              >
                {t("taskDetails.arrived")}
              </button>
            )}
            {localStorage.getItem("level") == 3 && (
              <button
                onClick={() => startWork.mutate()}
                className="text-white bg-secondaryColor text-xl p-2 w-[8em] rounded-[10px]"
              >
                {t("taskDetails.startWork")}
              </button>
            )}
            {localStorage.getItem("level") == 4 && (
              <button
                onClick={() => endWork.mutate()}
                className="text-white bg-secondaryColor text-xl p-2 w-[8em] rounded-[10px]"
              >
                I am end work
              </button>
            )}
            {localStorage.getItem("level") == 5 && (
              <button
                onClick={() => setPopupend(true)}
                className="text-white bg-secondaryColor text-xl p-2 w-[10em] rounded-[10px]"
              >
                Show code end
              </button>
            )}
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
    </div>
  );
};

export default TasksDetails;
