import React, { useRef } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ReportTask = () => {
  // Definition of routing from ReactRoute
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Get id from route
  const { id } = useParams();

  //   Define useref to store field values
  const ReportRef = useRef();

  //   handleSubmit function
  const handleSubmit = (data) => {
    // Remove the default form mode
    data.preventDefault();
    // Print the message
    console.log(ReportRef.current.value);

    // Go to the tasks page
    navigate("/tasksPage");
  };

  return (
    <div className="Report-divMain py-7 px-5 min-h-screen relative">
      <div className="head flex items-center gap-1.5">
        {/*Header and back button*/}
        <Link to={`/taskDetails/${id}`}>
          <IoIosArrowBack />
        </Link>
        <h2>{t("reportTask.officialComplaint")}</h2>
      </div>
      <div className="Report-Body mt-5 ">
        <form onSubmit={handleSubmit}>
          {/* Writing area[] */}
          <textarea
            required
            className="w-full h-96 p-3.5 border border-softwhite bg-softwhite rounded-[10px] focus:outline-none focus:border-secondaryColor"
            placeholder={t("reportTask.subjectPlaceholder")}
            ref={ReportRef}
          ></textarea>
          {/* send button */}
          <button
            type="submit"
            className="bg-secondaryColor text-white py-1.5 px-5 rounded-[10px] absolute bottom-8 right-4"
          >
            {t("reportTask.sendComplaint")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportTask;
