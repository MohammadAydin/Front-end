import { useState } from "react";
import Wrapper from "../assets/wrapper/OlderHouse/OlderProfile";
import previewImg from "../assets/image/Preview.svg";
import { RiPencilLine } from "react-icons/ri";
import { FaPlus, FaRegTrashCan } from "react-icons/fa6";
import Popup from "../components/Popup";
import PopupAbout from "../components/PopupAbout";
import useData from "../hooks/useData";
import ProfilePhoto from "../components/UserProfile/ProfilePhoto/ProfilePhoto";
import LocationInfo from "./LocationInfo/LocationInfo";
import useStatusAccount from "../store/storeStatusAccount";
import statusAccount from "../utils/statusAccountReturn";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const HouseProfile = () => {
  const { t } = useTranslation();
  const {
    data: statusData,
    error,
    isLoadingstatus,
  } = useData("/status/profile");

  useEffect(() => {
    if (statusData?.data?.status) {
      localStorage.setItem("statusAccount", statusData?.data?.status);
    }
  }, [statusData?.data?.status]);

  useEffect(() => {
    const hasReloaded = localStorage.getItem("hasReloaded");

    if (!hasReloaded) {
      localStorage.setItem("hasReloaded", "true");
      window.location.reload();
    }
  }, []);

  // Open and closed state storage
  const [isOpen, setIsOpen] = useState(false);
  // Store the opening and closing status of the PopUp About
  const [isOpenAbout, setIsOpenAbout] = useState(false);
  // Storing the value of about
  const [about, setAbout] = useState("About Elderly house");
  // Image storage
  const [preview, setPreview] = useState(previewImg);
  // Convert an uploaded image to a link
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };
  // Define a fictitious data matrix
  const [address, setAddress] = useState([
    {
      id: 1,
      Address: "Address 1",
      Street: "Alexanderplatz",
      Code: 1223,
      City: "Berlin",
      Country: "Germany",
    },
  ]);
  const { data: profile, isLoading } = useData("/profile");

  if (localStorage.getItem("statusAccount") !== "approved") {
    return statusAccount(localStorage.getItem("statusAccount"));
  }
  return (
    // house profile wrapper
    <Wrapper className="mt-6 w-full pr-3.5 pl-2.5 ">
      {/* Full-page container */}
      <div className="relative">
        {/* Upper title */}
        <p className="">{t("HouseProfile.title")}</p>
        {/* Container containing the data partition */}
        <div className="imgAndInput flex gap-5 mt-3.5 max-[730px]:flex-col">
          {/* Container containing the image section */}

          <ProfilePhoto />

          {/* Information Container */}
          <div className="info flex flex-grow items-center max-[730px]:justify-center  p-3.5">
            {/* A container to specify the width of the fields  */}
            <div className="w-[90%]">
              {/* A container containing the left and right sides */}
              <div className="flex w-full  gap-6 max-[535px]:flex-col max-[535px]:gap-2 ">
                {/* A container with the left side of the information */}
                <div className="left justify-center  w-full flex flex-col gap-3.5 ">
                  {/* A box containing a description with data */}
                  <div className="relative info-square">
                    <p className="p-[1px]  text-[12px] absolute top-[-10px] text-[#637381] bg-white">
                      {t("HouseProfile.label.ElderlyhouseName")}
                    </p>
                    Elderly house
                  </div>
                  <div className="relative info-square">
                    <p className=" p-[1px]  text-[12px] absolute top-[-10px] text-[#637381] bg-white">
                      {t("HouseProfile.label.Email")}
                    </p>
                    {profile?.data?.email}
                  </div>
                  <div className="relative info-square">
                    <p className="p-[1px]  text-[12px] absolute top-[-10px] text-[#637381] bg-white">
                      {t("HouseProfile.label.Address")}
                    </p>
                    {profile?.data?.address || "empty"}{" "}
                  </div>
                </div>
                {/* A container containing the right and right sides */}
                <div className="right w-full justify-center  flex flex-col gap-3.5">
                  <div className="relative info-square">
                    <p className="p-[1px]  text-[12px] absolute top-[-10px] text-[#637381] bg-white">
                      {t("HouseProfile.label.Mangername")}
                    </p>
                    {profile?.data?.name || "empty"}
                  </div>
                  <div className="relative info-square">
                    <p className="p-[1px]  text-[12px] absolute top-[-10px] text-[#637381] bg-white">
                      {t("HouseProfile.label.PhoneNumber")}
                    </p>
                    {profile?.data?.phone || "empty"}
                  </div>
                  <div className="relative info-square">
                    <p className="p-[1px] text-[12px] absolute top-[-10px] text-[#637381] bg-white">
                      {t("HouseProfile.label.City")}
                    </p>
                    Berlin
                  </div>
                </div>
              </div>
              {/* A customized box for Zip/Code*/}
              <div className="mt-4">
                <div className="relative info-square">
                  <p className="p-[1px]  text-[12px] absolute top-[-10px] text-[#637381] bg-white">
                    {t("HouseProfile.label.ZipCode")}
                  </p>
                  506540
                </div>
              </div>
              {/* Customized box for about */}
              <div className="mt-4">
                <div className="relative info-square flex justify-between items-center">
                  <p className="p-[1px]  text-[12px] absolute top-[-10px] text-[#637381] bg-white">
                    {t("HouseProfile.label.About")}
                  </p>
                  {/* If there is input information, display it or dummy text */}
                  {about ? about : "About Elderly House"}
                  {/* The edit icon, when clicked, opens the edit popup */}
                  <RiPencilLine
                    onClick={() => setIsOpenAbout(true)}
                    className="click text-[1.3rem] text-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Container with the bottom section for adding addresses */}
        <LocationInfo />
        {/* Pop Up Add Address */}
        {isOpen && (
          <Popup
            setAddress={setAddress}
            address={address}
            onClose={() => setIsOpen(false)}
          />
        )}
        {/* Pop Up About */}
        {isOpenAbout && (
          <PopupAbout
            onClose={() => setIsOpenAbout(false)}
            setAbout={setAbout}
          />
        )}{" "}
      </div>
    </Wrapper>
  );
};

export default HouseProfile;
