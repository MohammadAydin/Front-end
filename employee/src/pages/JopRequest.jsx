import React, { useState } from "react";
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

const JopRequest = () => {
  const { data } = useData("/profile/status/progress");
  const { t } = useTranslation();

  // To store the status of View All
  const [isExpanded, setIsExpanded] = useState(false);

  // Definition of routing from ReactRoute
  const navigate = useNavigate();

  // To store jobsRequst
  const { data: jobs, error, isLoading } = useJobs("/jobs");

  console.log(error?.response?.data?.message);
  // Using React Query to fetch data
  const queryClient = useQueryClient();

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
      toast.error(error?.response?.data?.message || t("jobRequest.jobDeclineError"));
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
      toast.error(error?.response?.data?.message || t("jobRequest.jobAcceptError"));
    },
  });

  // Store 3 jobRequest orders by cropping status
  const visibleJobs = isExpanded ? jobs : jobs?.slice(0, 3);


  if (isLoading) return <Spinner />;
  if (error) {
    if (
      error?.response?.data?.message ==
      "No valid active locations found for employee."
    ) {
      return (
        <div className="flex flex-col justify-center items-center h-screen gap-4">
          <RiErrorWarningLine className="text-[#194894] text-9xl " />

          <p className="text-black">{t("jobRequest.noActiveLocations")}</p>
          <Link
            to="/locationInfo"
            className="bg-[#12151b] text-white py-1 px-2 rounded-[10px]"
          >
            {t("jobRequest.addLocation")}
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
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-secondaryColor"
          >
            {!isExpanded ? t("jobRequest.seeAll") : t("jobRequest.showLess")}
          </button>
        </div>
        <div className="body-list mt-3.5 ">
          {/* Loop through jobRequest array */}
          {visibleJobs?.length == 0 && (
            <>
              <div className="flex flex-col items-center justify-center mt-30">
                <HiOutlineBriefcase className="text-6xl mb-3 text-secondaryColor " />

                <p className="text-center">
                  {t("jobRequest.noJobRequests")}
                </p>
              </div>
            </>
          )}
          {visibleJobs?.map((job) => (
            <div
              key={job.service_request.id}
              className=" flex justify-between items-center mb-7   "
            >
              <Link to={`/jobRequestDetails/${job.service_request.id}`}>
                <div className="imgAndinfo flex gap-3 items-center">
                  {/* View a picture of the elderly house*/}
                  <img className=" rounded-4xl" src={imgjob} alt="" />
                  {/* Display price with jobRequest title */}
                  <div className="info">
                    <p>{job.job_posting.title}</p>
                    <p className="text-softColor text-xs">
                      {parseFloat(job.job_posting.total_cost).toFixed(2)} €
                    </p>
                  </div>
                </div>
              </Link>
              <div className="buttons flex gap-3.5 max-[811px]:flex-col ">
                {/* Decline button */}
                <button
                  onClick={() => DeclineJob.mutate(job.service_request.id)}
                  className="bg-softwhite  pt-2 pb-2 pr-8 pl-8 rounded-xl Decline-Job"
                >
                  {t("jobRequest.decline")}
                </button>
                {/* Accept button */}
                <button
                  onClick={() => AcceptJob.mutate(job.service_request.id)}
                  className="bg-secondaryColor text-white pt-2 pb-2 pr-8 pl-8 rounded-xl"
                >
                  {t("jobRequest.accept")}
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div >
  );
};

export default JopRequest;
