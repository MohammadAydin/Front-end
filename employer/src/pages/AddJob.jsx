import { useState } from "react";
import { useTranslation } from "react-i18next";
import JobCreationForm from "../components/JobCreation/JobCreationForm";
import { IoAddCircleOutline } from "react-icons/io5";

const AddJob = () => {
  const { t } = useTranslation();
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="AddJob p-[28px] py-[58px] min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full">
        {/* Blue Card Container */}
        <div className="bg-gradient-to-br from-[#2B5FA6] to-[#1E4A8A] rounded-3xl shadow-2xl p-16 flex flex-col items-center justify-center min-h-[400px] text-white">
          {/* Plus Icon */}
          <div className="mb-6">
            <div className="w-32 h-32 rounded-full border-4 border-white flex items-center justify-center">
              <IoAddCircleOutline size={80} className="text-white" />
            </div>
          </div>
          
          {/* Title */}
          <h1 className="text-4xl font-bold mb-8">
            {t("AddJob.title")}
          </h1>
          
          {/* Create Button */}
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-gradient-to-r from-[#F47621] to-[#EE6000] text-white font-bold text-lg px-12 py-4 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3"
          >
            <IoAddCircleOutline size={24} />
            {t("AddJob.createButton")}
          </button>
        </div>
      </div>

      {/* Job Creation Form Dialog */}
      <JobCreationForm isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
    </div>
  );
};

export default AddJob;

