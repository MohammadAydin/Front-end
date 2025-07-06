import React, { useState } from "react";
import PopupLicense from "./PopupLicense";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useFormLevel from "../store/Formlevel";

const FormLicense = () => {
  const setLevel = useFormLevel((s) => s.setLevel);

  // Storing the state of the popup's open state
  const [popupLicense, setPopupLicense] = useState(false);
  // Definition of navigate for routing
  const navigate = useNavigate();

  const submit = () => {
    // here we will send data to backend when they finish !

    navigate("/homeLayout");
    setLevel(1);
  };
  return (
    <>
      <div className="inputs flex flex-col mt-[30px] login">
        {/* Form title */}
        <h2 className="formTitle font-bold text-[2.4vw] mt-6 text-[#28293D] mb-3">
          About your Elderly house{" "}
        </h2>
        {/* Form description */}
        <p className="text-[0.6rem] mb-7 text-[#555770]">
          Give us your information to keep going to your account.{" "}
        </p>
        {/* Container containing the pop-up box */}
        <div
          onClick={() => setPopupLicense(true)}
          className="click Upload-License bg-[#919EAB33] p-5 rounded-2xl mb-11"
        >
          <p>Upload License</p>
          <span className="text-[0.6rem] text-[#555770]">
            Drop files here or click{" "}
            <span className="text-[#F47621]">browse</span> thorough your machine
          </span>
        </div>

        <div className="flex gap-3.5 justify-center">
          <Link onClick={() => setLevel(1)} to="/">
            {" "}
            {/* Skip this stage */}
            <button className="p-2   button-login w-[150px] mb-3 bg-amber-600 text-white rounded-[10px]">
              Skip{" "}
            </button>
          </Link>
          {/* Continue to Dashboard */}
          <Link
            onClick={submit}
            className="p-2 w-[40%] text-center  button-login mb-3 bg-amber-600 text-white rounded-[10px]"
          >
            Continue{" "}
          </Link>
        </div>
      </div>
      {/* Opening the pop-up */}
      {popupLicense && <PopupLicense setPopupLicense={setPopupLicense} />}
    </>
  );
};

export default FormLicense;
