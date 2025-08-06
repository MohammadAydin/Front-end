import newStatusImg from "../assets/images/statusimage/newstatus.png";
import pendingStatusImg from "../assets/images/statusimage/pendingstatus.png";
import suspendedStatusImg from "../assets/images/statusimage/suspendedstatus.png";
import OnHoldstatusImg from "../assets/images/statusimage/OnHold.png";
import declinedstatusImg from "../assets/images/statusimage/declinedstatus.png";
import Errorr404 from "../assets/images/statusimage/Errorr404.png";
import { Link } from "react-router-dom";
import Spinner from "../components/MoreElements/Spinner";
const statusAccount = (status) => {
  if (status === "new") {
    return (
      <div className="flex items-center justify-center flex-col   min-h-screen">
        <div className="relative flex items-center justify-center text-xl font-bold flex-col text-center p-9">
          <img className="w-90" src={newStatusImg} alt="" />
          <p className="absolute bottom-5 max-[320px]:bottom-[-20px]">
            please complete your application to start earning money{" "}
          </p>
        </div>
        <div className="mt-2  max-[320px]:mt-10">
          <Link
            to="/Personal Info"
            className=" bg-blue-400 text-white p-2.5 rounded-[15px]"
          >
            Complete Profile
          </Link>
        </div>
      </div>
    );
  }
  if (status === "pending") {
    return (
      <div className="relative  h-full flex items-center justify-center text-xl font-bold flex-col text-center p-9">
        <img className="w-90" src={pendingStatusImg} alt="" />
        <p className="z-10 absolute mt-84">
          Your information has been received. We’ll get back to you shortly.
        </p>
      </div>
    );
  }

  if (status === "suspended") {
    return (
      <div className="relative  h-full flex items-center justify-center text-xl font-bold flex-col text-center p-9">
        <img className="w-90" src={suspendedStatusImg} alt="" />
        <p className="z-10 absolute mt-92">
          "Your account is currently suspended. Please check back later."
        </p>
      </div>
    );
  }
  if (status === "onHold") {
    return (
      <div className="relative  h-full flex items-center justify-center text-xl font-bold flex-col text-center p-9">
        <img className="w-90" src={OnHoldstatusImg} alt="" />
        <p className="z-10 absolute mt-70">
          Your account is currently on hold. Please check back later.
        </p>
      </div>
    );
  }
  if (status === "declined") {
    return (
      <div className="flex items-center justify-center flex-col   h-full">
        <div className="relative  flex items-center justify-center text-xl font-bold flex-col text-center p-5">
          <img className="w-90" src={declinedstatusImg} alt="" />
          <p className="z-10 absolute mt-70">
            The submitted documents were not accepted. Kindly re-upload valid
            files.
          </p>
        </div>
        <div className="max-[320px]:mt-10">
          <Link
            to="/Personal Info"
            className=" bg-blue-400 text-white p-2.5 rounded-[15px]"
          >
            Re-upload{" "}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full flex items-center justify-center text-xl font-bold flex-col text-center p-5">
    {/* <Spinner /> */}
    </div>
  );
};

export default statusAccount;
