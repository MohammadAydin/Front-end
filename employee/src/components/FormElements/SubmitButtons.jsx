const SubmitButtons = ({
  onCancel,
  submitLabel = "Add",
  prevLabel = "Cancel",
}) => {
  return (
    <div className="SubmitButtons flex gap-3 items-center justify-end">
      <button
        onClick={onCancel}
        type="button"
        className="bg-[#F1F1F5] text-[#28293D] text-lg font-extrabold px-4 py-2 rounded-lg mt-4 hover:bg-[#cfcfd3]"
      >
        {prevLabel}
      </button>
      <button
        type="submit"
        className="bg-[#F47621] text-white text-lg font-extrabold px-10 py-2 rounded-lg mt-4 hover:bg-[#EE6000]"
      >
        {submitLabel}
      </button>
    </div>
  );
};

export default SubmitButtons;
