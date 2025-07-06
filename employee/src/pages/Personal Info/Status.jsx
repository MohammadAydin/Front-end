import { IoTimeOutline } from "react-icons/io5";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { FaRegTimesCircle } from "react-icons/fa";

const Status = ({ status }) => {
  return (
    <>
      {status === "pending" ? (
        <div className="flex items-center pr-8 gap-3 text-lg font-bold text-yellow-500">
          <IoTimeOutline size={30} />
          <span>Pending</span>
        </div>
      ) : status === "approved" ? (
        <div className="flex items-center pr-4 gap-3 text-lg font-bold text-green-500">
          <HiOutlineCheckCircle size={30} />
          <span>Completed</span>
        </div>
      ) : status === "declined" ? (
        <div className="flex items-center pr-8 gap-3 text-lg font-bold text-red-500">
          <FaRegTimesCircle size={30} />
          <span>Rejected</span>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Status;
