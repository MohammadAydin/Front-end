import { RiUserSettingsLine } from "react-icons/ri";
import { BsPlus } from "react-icons/bs";
import SearchInput from "../SearchInput";

const LeadersHeader = ({ setIsFormOpen }) => {
  return (
    <div className="LeadersHeader w-full flex justify-between items-center gap-10 ">
      <div className="flex items-center gap-2 ">
        <RiUserSettingsLine size={30} />
        <h2 className="font-[900] text-xl">Leaders</h2>
      </div>

      <div className="LeadersHeaderAction w-full flex justify-between">
        <div>
          <SearchInput />
        </div>
        <div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="AddNewLeaderBtn flex gap-1 items-center font-[900] text-lg bg-[#F47621] text-white px-4 py-2 rounded-xl cursor-pointer"
          >
            <span>
              <BsPlus size={30} />
            </span>
            Add new Leader
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadersHeader;
