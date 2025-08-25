import { LuBanknote } from "react-icons/lu";
import { CgSortAz } from "react-icons/cg";
import SearchInput from "../SearchInput";
import { useTranslation } from "react-i18next";
const InvoicesHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="InvoicesHeader w-full flex justify-between items-center gap-10">
      <div className="InvoicesTitle flex items-center gap-2">
        <LuBanknote size={30} />
        <h2 className="font-[900] text-xl">{t("Invoices.title")} </h2>
      </div>

      <div className="InvoicesHeaderActions w-full flex justify-between">
        {/* <div className="InvoicesSearch">
          <SearchInput />
        </div> */}

        <div>
          {/* <button className="InvoicesSort flex items-center gap-1 border-2 border-[#ECECF2] rounded-lg p-2 pr-3">
            <CgSortAz size={27} />
            <span>Sort By</span>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default InvoicesHeader;
