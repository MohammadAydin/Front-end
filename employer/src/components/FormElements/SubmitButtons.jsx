import { useTranslation } from "react-i18next";

const SubmitButtons = ({ onCancel, submitLabel = "Add", isLoading = false }) => {
  const { t } = useTranslation();
  return (
    <div className="SubmitButtons flex gap-3 items-center justify-end">
      <button
        onClick={onCancel}
        type="button"
        disabled={isLoading}
        className="bg-[#F1F1F5] text-[#28293D] text-lg font-extrabold px-4 py-2 rounded-lg mt-4 hover:bg-[#cfcfd3] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        {t("personaldetails.button.Cancel")}
      </button>
      <button
        type="submit"
        disabled={isLoading}
        className="bg-[#F47621] text-white text-lg font-extrabold px-10 py-2 rounded-lg mt-4 hover:bg-[#EE6000] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
      >
        {isLoading && (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
        )}
        {isLoading ? "Saving..." : submitLabel || t("personaldetails.button.Add")}
      </button>
    </div>
  );
};

export default SubmitButtons;
