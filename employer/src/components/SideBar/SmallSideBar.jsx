import { useState } from "react";
import { BsList } from "react-icons/bs";
import { PagesList } from "./SideBarIndex";

const SmallSideBar = () => {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <div className="smallSideBar hidden">
      {/* Hamburger Menu Button - Only show on mobile, positioned below navbar */}
      <div className="w-full px-3 py-2 flex justify-start items-center sm:hidden">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-all duration-300 touch-manipulation"
          aria-label="Toggle menu"
        >
          <BsList size={32} className="text-gray-700" />
        </button>
      </div>
      {isOpen && (
        <div className="sideBarMenu w-[93%] left-[50%] top-[10%] p-5 py-8 translate-x-[-50%] bg-[#194894] absolute text-white rounded-lg z-[1000]">
          <PagesList setIsOpen={setIsOpen} />
        </div>
      )}
    </div>
  );
};

export default SmallSideBar;
