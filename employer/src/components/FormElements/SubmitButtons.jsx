import { useTranslation } from "react-i18next";

const SubmitButtons = ({ onCancel, submitLabel = "Add" }) => {
  const { t } = useTranslation();
  return (
    <div className="SubmitButtons flex gap-3 items-center justify-end">
      <button
        onClick={onCancel}
        type="button"
        className="bg-[#F1F1F5] text-[#28293D] text-lg font-extrabold px-4 py-2 rounded-lg mt-4 hover:bg-[#cfcfd3]"
      >
        {t("personaldetails.button.Cancel")}
      </button>
      <button
        type="submit"
        className="bg-[#F47621] text-white text-lg font-extrabold px-10 py-2 rounded-lg mt-4 hover:bg-[#EE6000]"
      >
        {t("personaldetails.button.Add")}
      </button>
    </div>
  );
};

export default SubmitButtons;
