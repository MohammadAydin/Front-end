import { LuPencil, LuTrash2 } from "react-icons/lu";
const ShiftsList = ({ name, startTime, endTime }) => {
  return (
    <div className="ShiftsList flex justify-between items-center text-[#212B36] p-5 font-extrabold">
      <div className="shiftname mr-4">{name}</div>
      <div className="shifttime flex gap-10">
        <div>
          <span>From:</span>
          <span className="font-thin ml-2">{startTime}</span>
        </div>
        <div>
          <span>To:</span>
          <span className="font-thin ml-2">{endTime}</span>
        </div>
      </div>
      <div className="ShiftBtn flex items-center gap-5">
        <button className=" cursor-pointer">
          <LuPencil size={23} />
        </button>
        <button className=" cursor-pointer">
          <LuTrash2 size={25} color="#F54336" />
        </button>
      </div>
    </div>
  );
};

export default ShiftsList;
