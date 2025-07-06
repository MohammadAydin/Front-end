import { useEffect } from "react";
import { OpenSuccsessPopup } from "../../store/OpenSuccsessPopup";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

const SuccsessPopup = () => {
  const { isOpen, CloseSuccsess } = OpenSuccsessPopup();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        CloseSuccsess();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, CloseSuccsess]);

  return (
    <>
      {isOpen && (
        <div className="SuccsessPopup p-10 fixed top-[50%] left-[50%] translate-[-50%] z-50 shadow-2xl w-[580px] h-[500px] bg-white rounded-2xl text-[#4CE452] flex flex-col items-center justify-center gap-2">
          <div className="w-full text-black flex justify-end">
            <span onClick={CloseSuccsess} className="cursor-pointer">
              <IoClose size={30} />
            </span>
          </div>
          <HiOutlineCheckCircle size={200} />
          <p className="text-black font-extrabold text-xl my-3">
            Your Requests has been sent successfully
          </p>
          <p className="text-lg text-gray-500 text-center">
            Your data will be reviewed by the administrator and a response will
            be sent to you
          </p>
          <div className="DownloadLine"></div>
        </div>
      )}
    </>
  );
};

export default SuccsessPopup;
