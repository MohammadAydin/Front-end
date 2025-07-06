import { useState } from "react";
import { BsList } from "react-icons/bs";
import profileAvatar from "../../assets/image/Img_Avatar.25.svg";
import { PagesList, SettingList } from "./SideBarIndex";

const SmallSideBar = () => {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <div className="smallSideBar hidden">
      <div className="w-full mb-5 h-[60px] p-3  flex justify-between items-center">
        <button onClick={() => setIsOpen(!isOpen)}>
          <BsList size={40} />
        </button>
        <div>
          <img src={profileAvatar} alt="" className="rounded-full h-10" />
        </div>
      </div>
      {isOpen && (
        <div className="sideBarMenu w-[93%] left-[50%] top-[10%] p-5 py-8 translate-x-[-50%] bg-[#194894] absolute text-white rounded-lg z-[1000]">
          <div className="mb-15">
            <PagesList />
          </div>
          <div>
            <SettingList />
          </div>
        </div>
      )}
    </div>
  );
};

export default SmallSideBar;
