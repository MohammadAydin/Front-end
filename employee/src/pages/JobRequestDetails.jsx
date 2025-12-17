import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useJobs from "../hooks/useJobs";
import { IoIosArrowBack } from "react-icons/io";
import imgjob from "../assets/images/jobRequest/jobRequest.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customFetch from "../utils/axios";
import { toast } from "react-toastify";
import Spinner from "../components/MoreElements/Spinner";
import { GoogleMap, Marker } from "@react-google-maps/api";
import {
  PiHourglassLowFill,
  PiShootingStarDuotone,
  PiUser,
} from "react-icons/pi";
import { LuBanknote } from "react-icons/lu";
import { useTranslation } from "react-i18next";
import { timeDifference } from "../utils/timeDifference";

const JobRequestDetails = () => {
  // Navigate definition for routing
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Get id from useParams
  const { id } = useParams();

  // Fetching data from API using React Query
  const { data: jobs, error, isLoading } = useJobs(`/requestView/${id}`);

  const startTime =
    jobs?.service_request?.job_posting?.date_from +
    " " +
    jobs?.service_request?.job_posting?.shift?.start_time +
    ":00";

    
  const [hoursdiff, setHoursdiff] = useState(0);
  const [minutesDiff, setMinutesDiff] = useState(0);
  const [daysDiff, setDaysDiff] = useState(0);

  useEffect(() => {
    if (new Date(startTime) > new Date()) {
      const { days, hours, minutes } = timeDifference(new Date(), startTime);
      setDaysDiff(days);
      setHoursdiff(hours);
      setMinutesDiff(minutes);
    }
  }, [
    startTime,
    jobs?.service_request?.job_posting?.date_from,
    jobs?.service_request?.job_posting?.shift?.start_time,
  ]);

  // -----------------------
  // Date and difference calculation process

  // -------------------------

  // Fetch map data
  const center = jobs?.coordinates
    ? {
        lat: jobs.coordinates.latitude,
        lng: jobs.coordinates.longitude,
      }
    : { lat: 0, lng: 0 };

  // Definition of React Query
  const queryClient = useQueryClient();

  // AcceptJob function
  const AcceptJob = useMutation({
    mutationFn: (jobId) =>
      customFetch
        .post(`/matching/takeRequest/${jobId}`)
        .then((res) => res.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["jobList", "/jobs"] }),
        toast.success(data.message || t("jobRequestDetails.jobAcceptSuccess"));
      navigate("/");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || t("jobRequestDetails.jobAcceptError")
      );
    },
  });

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <p className="text-red-500">
        {t("jobRequestDetails.error")}: {error.response?.data?.message}
      </p>
    );
  return (
    <div className="container-main p-7 pl-3">
      <div className="flex items-center gap-2.5">
        {/* Back button icon */}
        <Link to="/">
          <IoIosArrowBack />
        </Link>

        <h2 className="text-xl">{t("jobRequestDetails.myRequests")}</h2>
      </div>
      <div className="grid grid-cols-2  pl-3 max-[1109px]:grid-cols-1">
        <div className="grid-cols-1">
          {/* Image of the elderly house (temporary) */}
          <img
            className="mt-8 w-48 h-48 object-cover rounded-full"
            src={jobs.employerImageUrl}
            alt="photo"
          />
          <div className="mt-6">
            <div className="flex items-center w-[70%] justify-between">
              <h2 className="text-xl">
                {/* jobRequest title */}
                {jobs?.service_request.job_posting?.title}
              </h2>
              <div className="text-[#34C759] flex items-center gap-1">
                <PiShootingStarDuotone />
                <p className="text-[0.8rem]">
                  {t("jobRequestDetails.closeToYou")}
                </p>
              </div>
            </div>
            <div className="flex gap-3.5">
              {/* Type of specialization */}
              <div className="bg-[#E2EDFF] flex gap-1.5 items-center w-fit p-2 rounded-[6px] mt-2.5 text-[#194894]">
                <PiUser />
                <p className="text-[0.8rem]">
                  {jobs?.service_request.job_posting?.position}
                </p>
              </div>
              {/* Start time */}
              <div className="bg-[#FFF0E5] flex gap-1.5 items-center w-fit p-1 rounded-[6px] mt-2.5 text-[#F47621]">
                <PiHourglassLowFill />
                <p className="text-[0.8rem]">
                  {new Date(startTime) > new Date()
                    ? `d: ${daysDiff}, h: ${hoursdiff}, m: ${minutesDiff}`
                    : "Job ended"}
                </p>
              </div>
              {/* Amount */}
              <div className="bg-[#E0FFE8] flex gap-1.5 items-center w-fit p-2 rounded-[6px] mt-2.5 text-[#34C759]">
                <LuBanknote />

                <p className="text-[0.8rem]">
                  {" "}
                  {parseFloat(jobs?.total_cost).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="mb-3 text-xl">
              {t("jobRequestDetails.positionDetails")}
            </h2>
            <p className="text-softColor">
              {jobs?.service_request.job_posting?.description}
            </p>
          </div>
        </div>
        <div className="grid-cols-1 max-[1109px]:mt-3.5">
          {/* Address details */}
          <div>
            <h2 className="text-xl">
              {t("jobRequestDetails.medConnectLocation")}
            </h2>
            <p className="mt-2 text-softColor">
              {jobs?.service_request.job_posting?.location.street1} -
              {jobs?.service_request.job_posting?.location.street2} -
              {jobs?.service_request.job_posting?.location.city} -
              {jobs?.service_request.job_posting?.location.country}
            </p>
          </div>
          <div className="mt-8">
            {/* // Ready-made components from the Google Maps library */}
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
          <div className="flex gap-5 mt-[30vh] justify-end  max-[1109px]:mt-[6vh]">
            {/* Back button */}
            <Link
              to="/"
              className="text-secondaryColor border border-secondaryColor text-xl p-2 w-[8em] rounded-[10px] text-center"
            >
              {t("jobRequestDetails.back")}
            </Link>
            {/* Accept button */}
            <button
              onClick={() => AcceptJob.mutate(id)}
              className="text-white bg-secondaryColor text-xl p-2 w-[8em] rounded-[10px]"
            >
              {t("jobRequestDetails.accept")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobRequestDetails;
