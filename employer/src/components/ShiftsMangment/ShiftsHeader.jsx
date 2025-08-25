import { LuClock } from "react-icons/lu";
import { BsPlus } from "react-icons/bs";
import CompletePersonalinfo from "../MoreElements/CompletePersonalinfo";
import { useTranslation } from "react-i18next";

const ShiftsHeader = ({ setIsFormOpen }) => {
  const { t } = useTranslation();
  return (
    <div className="ShiftsHeader w-full flex justify-between items-center">
      <div className="flex items-center gap-2">
        <LuClock size={30} />
        <h2 className="font-[900] text-xl">{t("Shifts.title")} </h2>
      </div>
      <div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="HeadersButton flex gap-1 items-center font-[900] text-lg bg-[#F47621] text-white px-4 py-2 rounded-xl cursor-pointer"
        >
          <span>
            <BsPlus size={30} />
          </span>
          {t("Shifts.add")}
        </button>
      </div>
    </div>
  );
};

export default ShiftsHeader;
