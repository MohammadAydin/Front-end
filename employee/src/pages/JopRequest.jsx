import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imgjob from "../assets/images/jobRequest/jobRequest.svg";
import useJobs from "../hooks/useJobs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customFetch from "../utils/axios";
import { toast } from "react-toastify";
import Spinner from "../components/MoreElements/Spinner";
import { RiErrorWarningLine } from "react-icons/ri";
import { HiOutlineBriefcase } from "react-icons/hi2";
import useData from "../hooks/useData";
import { useTranslation } from "react-i18next";
import useStatusAccount from "../store/storeStatusAccount";
import statusAccount from "../utils/statusAccountReturn";
import PopupJop from "../components/MoreElements/Popup/PopupJop";
import PopupIncompleteProfile from "../components/MoreElements/Popup/PopupIncompleteProfile";

const JopRequest = () => {
  const { data } = useData("/profile/status/progress");
  const {
    data: statusData,
    errorstatus,
    isLoadingstatus,
  } = useData("/status/profile");
  useEffect(() => {
    if (statusData?.status) {
      localStorage.setItem("statusAccount", statusData?.status);
    }
  }, [statusData?.status]);

  useEffect(() => {
    const hasReloaded = localStorage.getItem("hasReloaded");

    if (!hasReloaded) {
      localStorage.setItem("hasReloaded", "true");
      window.location.reload();
    }
  }, []);
  // Only redirect for certain statuses, allow "new" users and users without status to see fake jobs
  const currentStatus = localStorage.getItem("statusAccount");
  if (currentStatus && currentStatus !== "approved" && currentStatus !== "new" && currentStatus !== "")
    return statusAccount(currentStatus);

  const { t } = useTranslation();

  // To store the status of View All
  const [isExpanded, setIsExpanded] = useState(false);

  // Definition of routing from ReactRoute
  const navigate = useNavigate();

  // To store jobsRequst
  const { data: jobs, error, isLoading } = useJobs("/jobs");

  // Using React Query to fetch data
  const queryClient = useQueryClient();
  const [PopupWarning, setPopupWarning] = useState(false);
  const [PopupIncompleteProfileWarning, setPopupIncompleteProfileWarning] = useState(false);
  
  const togglePopup = () => {
    setPopupWarning(!PopupWarning);
  };

  const toggleIncompleteProfilePopup = () => {
    setPopupIncompleteProfileWarning(!PopupIncompleteProfileWarning);
  };

  // Fake job data for new users
  const generateFakeJobs = () => {
    const shifts = [
      { name: "Frühschicht", start_time: "06:00", end_time: "14:00" },
      { name: "Spätschicht", start_time: "14:00", end_time: "22:00" },
      { name: "Nachtschicht", start_time: "22:00", end_time: "06:00" },
    ];
    
    // Get user creation date from localStorage
    const userDataString = localStorage.getItem("user");
    let createdAt = new Date();
    
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        if (userData.created_at) {
          createdAt = new Date(userData.created_at);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
    
    // Generate dates after account creation (can be in future)
    const generateValidDates = () => {
      const dates = [];
      
      // Generate 5 dates starting from account creation date
      for (let i = 0; i < 5; i++) {
        const jobDate = new Date(createdAt);
        // Add random days between 1-30 days after account creation
        const randomDays = Math.floor(Math.random() * 30) + 1 + i; // +i to avoid duplicates
        jobDate.setDate(jobDate.getDate() + randomDays);
        
        dates.push(jobDate.toISOString().split('T')[0]);
      }
      
      return dates.sort(); // Sort dates chronologically
    };
    
    const dates = generateValidDates();
    
    return Array.from({ length: 5 }, (_, index) => {
      const jobKey = `job${index + 1}`;
      const shift = shifts[index % shifts.length];
      // Use modulo to handle case where we have fewer than 5 unique dates
      const date = dates[index % dates.length];
      
      return {
        service_request: {
          id: `fake_${index + 1}`
        },
        job_posting: {
          title: "Complete Profile", // This will be replaced by spoiler anyway
          total_cost: t(`jopComponents.fakeJobs.${jobKey}.price`),
          date_from: `${date} 00:00:00`,
          date_to: `${date} 23:59:59`,
          shift: shift
        }
      };
    });
  };

  // To reject a jobRequest
  const DeclineJob = useMutation({
    mutationFn: (jobId) =>
      customFetch
        .post(`/matching/declineRequest/${jobId}`)
        .then((res) => res.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["jobList", "/jobs"] });
      toast.success(data.message || t("jobRequest.jobDeclineSuccess"));
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || t("jobRequest.jobDeclineError")
      );
    },
  });

  // To approve the job jobRequest
  const AcceptJob = useMutation({
    mutationFn: (jobId) =>
      customFetch
        .post(`/matching/takeRequest/${jobId}`)
        .then((res) => res.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["jobList", "/jobs"] });
      toast.success(data.message || t("jobRequest.jobAcceptSuccess"));
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || t("jobRequest.jobAcceptError")
      );
    },
  });

  // Determine which jobs to show based on user status and progress
  const userStatus = localStorage.getItem("statusAccount");
  const hasIncompleteProfile = data?.show_progress_bar === true;
  const isNewUser = userStatus === "new" || userStatus === null || userStatus === "" || hasIncompleteProfile;
  
  let jobsToShow;
  if (isNewUser) {
    // Show fake jobs for new users, users without status, or users with incomplete profile
    jobsToShow = generateFakeJobs();
  } else {
    // Show real jobs for approved users with complete profile
    jobsToShow = jobs;
  }
  
  // Store 3 jobRequest orders by cropping status
  const visibleJobs = isExpanded ? jobsToShow : jobsToShow?.slice(0, 3);

  // Handle accept button click
  const handleAcceptClick = (jobId) => {
    if (isNewUser || userStatus !== "approved" || hasIncompleteProfile) {
      // Show incomplete profile warning for new users, non-approved users, or users with incomplete profile
      setPopupIncompleteProfileWarning(true);
    } else {
      // Show normal confirmation popup for approved users with complete profile
      setPopupWarning(true);
    }
  };

  // Only show loading and error for approved users, not new users
  if (!isNewUser) {
    if (isLoading) return <Spinner />;

    if (error) {
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
      {data?.show_progress_bar && (
        <div className="w-full  bg-[#194894] text-white rounded-2xl p-7 flex flex-col justify-between gap-5">
          {/* Click to continue. Complete personal info. */}

          <span className="text-2xl">{t("jobRequest.completeProfile")}</span>

          <div>
            <p className=" text-[#ffffff] text-sm mt-2">{data?.message}</p>
            <div className="flex items-center gap-3 text-sm">
              <div className="h-1 w-full bg-[#4687ee] rounded-2xl outline-[1px]">
                <div
                  style={{ width: data?.percentage }}
                  className={`h-1   bg-white rounded-2xl`}
                ></div>
              </div>
              {data?.percentage}
            </div>
          </div>
          <button
            onClick={() => navigate("/Personal info")}
            className="bg-[#99B2DB] py-3 text-xl rounded-2xl border border-white"
          >
            {t("jobRequest.completeButton")}
          </button>
        </div>
      )}

      <div className="JobRequestList mt-6">
        <div className="head-List flex justify-between">
          <h2 className="text-xl">{t("jobRequest.lastJobRequests")}</h2>
          {/* Button to view all jobRequest */}
          <div className="flex gap-2 items-center">
            <div className=" rounded-[50%] text-white py-2 px-4  bg-secondaryColor">
              {jobsToShow?.length || 0}
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-secondaryColor"
            >
              {!isExpanded ? t("jobRequest.seeAll") : t("jobRequest.showLess")}
            </button>
          </div>
        </div>
        <div className="body-list mt-3.5 ">
          {/* Loop through jobRequest array */}
          {visibleJobs?.length == 0 && !isNewUser && (
            <>
              <div className="flex flex-col items-center justify-center mt-30">
                <HiOutlineBriefcase className="text-6xl mb-3 text-secondaryColor " />

                <p className="text-center">{t("jobRequest.noJobRequests")}</p>
              </div>
            </>
          )}
          {visibleJobs?.map((job) => (
            <div
              key={job.service_request.id}
              className="flex justify-between items-start mb-7 gap-6"
            >
              {!String(job.service_request.id).startsWith('fake_') ? (
                <Link to={`/jobRequestDetails/${job.service_request.id}`}>
                  <div className="imgAndinfo flex gap-8 items-center flex-wrap max-[1044px]:flex-col max-[1044px]:items-start">
                    {/* View a picture of the elderly house */}
                    <div className="flex items-center gap-3 w-[250px]">
                      <img
                        className="rounded-4xl w-16 h-16 object-cover"
                        src={imgjob}
                        alt=""
                      />
                      {/* Display price with jobRequest title */}
                    <div className="info flex-grow min-w-[200px] max-w-[250px]">
                      <div className="relative group">
                        <p className={`truncate text-wrap transition-all duration-300 ${
                          isNewUser 
                            ? 'telegram-spoiler' 
                            : ''
                        }`}>
                          {isNewUser ? 'Complete Profile' : job.job_posting.title}
                        </p>
                        {isNewUser && (
                          <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-10 animate-fadeIn">
                            <div className="bg-black text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
                              {t("jopComponents.completeProfileToView")}
                              <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                            </div>
                          </div>
                        )}
                      </div>
                      <p className="text-softColor text-xs">
                        {job?.job_posting?.total_cost}&euro;
                      </p>
                    </div>
                    </div>
                    <div className="flex gap-7 flex-wrap">
                      <div className="flex flex-col mt-2 gap-2">
                        <p className="text-softColor text-xs flex justify-between">
                          <span>date from &nbsp;</span>:&nbsp;{" "}
                          {job?.job_posting?.date_from.split(" ")[0]}{" "}
                        </p>
                        <p className="text-softColor text-xs flex justify-between">
                          <span>date to &nbsp;</span>:&nbsp;{" "}
                          {job?.job_posting?.date_to.split(" ")[0]}{" "}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 max-[720px]:flex-col">
                        <p className="text-softColor text-xs">
                          shift ({job?.job_posting?.shift?.name}) &nbsp;:{" "}
                        </p>
                        <div className="flex flex-col mt-2 gap-2">
                          <p className="text-softColor text-xs flex justify-between">
                            <span>start time &nbsp;</span>:&nbsp;{" "}
                            {job?.job_posting?.shift?.start_time}
                          </p>
                          <p className="text-softColor text-xs flex justify-between">
                            <span>end time &nbsp;</span>:&nbsp;{" "}
                            {job?.job_posting?.shift?.end_time}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="imgAndinfo flex gap-8 items-center flex-wrap max-[1044px]:flex-col max-[1044px]:items-start">
                  {/* View a picture of the elderly house */}
                  <div className="flex items-center gap-3 w-[250px]">
                    <img
                      className="rounded-4xl w-16 h-16 object-cover"
                      src={imgjob}
                      alt=""
                    />
                    {/* Display price with jobRequest title */}
                    <div className="info flex-grow min-w-[200px] max-w-[250px]">
                      <div className="relative group">
                        <p className={`truncate text-wrap transition-all duration-300 ${
                          isNewUser 
                            ? 'telegram-spoiler' 
                            : ''
                        }`}>
                          {isNewUser ? 'Complete Profile' : job.job_posting.title}
                        </p>
                        {isNewUser && (
                          <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-10 animate-fadeIn">
                            <div className="bg-black text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
                              {t("jopComponents.completeProfileToView")}
                              <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                            </div>
                          </div>
                        )}
                      </div>
                      <p className="text-softColor text-xs">
                        {job?.job_posting?.total_cost}&euro;
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-7 flex-wrap">
                    <div className="flex flex-col mt-2 gap-2">
                      <p className="text-softColor text-xs flex justify-between">
                        <span>date from &nbsp;</span>:&nbsp;{" "}
                        {job?.job_posting?.date_from.split(" ")[0]}{" "}
                      </p>
                      <p className="text-softColor text-xs flex justify-between">
                        <span>date to &nbsp;</span>:&nbsp;{" "}
                        {job?.job_posting?.date_to.split(" ")[0]}{" "}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 max-[720px]:flex-col">
                      <p className="text-softColor text-xs">
                        shift ({job?.job_posting?.shift?.name}) &nbsp;:{" "}
                      </p>
                      <div className="flex flex-col mt-2 gap-2">
                        <p className="text-softColor text-xs flex justify-between">
                          <span>start time &nbsp;</span>:&nbsp;{" "}
                          {job?.job_posting?.shift?.start_time}
                        </p>
                        <p className="text-softColor text-xs flex justify-between">
                          <span>end time &nbsp;</span>:&nbsp;{" "}
                          {job?.job_posting?.shift?.end_time}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="buttons flex gap-3.5 max-[811px]:flex-col">
                {isNewUser ? (
                  /* For new users, show only Learn More button */
                  <button
                    onClick={() => handleAcceptClick(job.service_request.id)}
                    className="bg-secondaryColor text-white pt-2 pb-2 pr-8 pl-8 rounded-xl w-full"
                  >
                    {t("jopComponents.learnMore")}
                  </button>
                ) : (
                  /* For approved users, show both Decline and Accept buttons */
                  <>
                    <button
                      onClick={() => {
                        if (!String(job.service_request.id).startsWith('fake_')) {
                          DeclineJob.mutate(job.service_request.id);
                        }
                      }}
                      className="bg-softwhite pt-2 pb-2 pr-8 pl-8 rounded-xl Decline-Job"
                    >
                      {t("jobRequest.decline")}
                    </button>
                    <button
                      onClick={() => handleAcceptClick(job.service_request.id)}
                      className="bg-secondaryColor text-white pt-2 pb-2 pr-8 pl-8 rounded-xl"
                    >
                      {t("jobRequest.accept")}
                    </button>
                  </>
                )}
              </div>
              {PopupWarning && (
                <PopupJop
                  onConfirm={() => AcceptJob.mutate(job.service_request.id)}
                  togglePopup={togglePopup}
                />
              )}
              {PopupIncompleteProfileWarning && (
                <PopupIncompleteProfile
                  togglePopup={toggleIncompleteProfilePopup}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JopRequest;
