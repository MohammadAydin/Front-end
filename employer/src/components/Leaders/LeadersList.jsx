import avatar from "../../assets/image/Img_Avatar.25.svg";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { LuPencil, LuTrash2 } from "react-icons/lu";

const LeadersList = () => {
  return (
    <div className="LeadersList flex items-center justify-between gap-4 border-b border-[#919eab63] border-dashed  text-[#555770] p-3 py-4">
      <div className="LeaderInfo flex items-center gap-3 cursor-pointer">
        <img className="rounded-full w-12" src={avatar} alt="" />
        <div>
          <p className="Name font-bold">Abdalrhman Alhowri</p>
          <p className="Email text-[#919EAB] text-sm font-[100]">
            abdalrhmanalhowri@gmail.com
          </p>
        </div>
      </div>
      <div className="LeaderPostion">Skilled Nursing Assistant</div>
      <div className="LeaderNumber">+999 999 999 999</div>
      <div className="LeaderPassword flex items-center gap-2">
        *********** <IoMdEyeOff />
      </div>
      <div className="LeadersAdd">
        <p className="text-[#919EAB]">Added By</p> Abdalrhman Alhowri
      </div>
      <div className="LeaderAction flex items-center gap-5">
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

export default LeadersList;
