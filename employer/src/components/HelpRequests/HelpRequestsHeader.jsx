import { PiBellSimpleRingingBold } from "react-icons/pi";
import { BsPlus } from "react-icons/bs";
import useRequestsStore from "../../store/HelpRequestsStore";
import SearchInput from "../SearchInput";
import { useTranslation } from "react-i18next";

const HelpRequestsHeader = () => {
  const { RequestOpen } = useRequestsStore();
  const { t } = useTranslation();
  return (
    <div className="HelpRequestsHeader w-full flex justify-between items-center gap-10">
      <div className="flex items-center gap-2 min-w-fit">
        <PiBellSimpleRingingBold size={30} />
        <h2 className="font-[900] text-xl">{t("HelpRequests.title")} </h2>
      </div>
      <div className="HelpRequestsHeaderActions flex items-center justify-between w-full ">
        <div className="w-full">{/* <SearchInput /> */}</div>
        <button
          className="HelpRequestsHeaderBtn flex gap-1 items-center font-[900] text-lg bg-[#F47621] text-white px-4 py-2 rounded-xl cursor-pointer min-w-fit"
          onClick={RequestOpen}
        >
          <span>
            <BsPlus size={30} />
          </span>
          {t("HelpRequests.add")}
        </button>
      </div>
    </div>
  );
};

export default HelpRequestsHeader;
