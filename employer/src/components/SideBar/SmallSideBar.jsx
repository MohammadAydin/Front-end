import { PagesList } from "./SideBarIndex";

const SmallSideBar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {isOpen && (
        <div className="sideBarMenu w-[93%] left-[50%] top-[10%] p-5 py-8 translate-x-[-50%] bg-[#194894] absolute text-white rounded-lg z-[1000] sm:hidden">
          <PagesList setIsOpen={setIsOpen} />
        </div>
      )}
    </>
  );
};

export default SmallSideBar;
