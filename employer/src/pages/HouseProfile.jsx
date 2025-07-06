import { useState } from "react";
import Wrapper from "../assets/wrapper/OlderHouse/OlderProfile";
import previewImg from "../assets/image/preview.svg";
import { RiPencilLine } from "react-icons/ri";
import { FaPlus, FaRegTrashCan } from "react-icons/fa6";
import Popup from "../components/popup";
import PopupAbout from "../components/PopupAbout";

const HouseProfile = () => {
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
  return (
    // house profile wrapper
    <Wrapper className="mt-6 w-full pr-3.5 pl-2.5 ">
      {/* Full-page container */}
      <div className="relative">
        {/* Upper title */}
        <p className="">My Profile</p>
        {/* Container containing the data partition */}
        <div className="imgAndInput flex gap-5 mt-3.5 max-[730px]:flex-col">
          {/* Container containing the image section */}
          <div className="img-profile  flex justify-center items-center  p-3.5 ">
            {/* Inner container for the image partition */}
            <div className="text-center flex flex-col justify-center items-center w-[180px]">
              {/* label to click on the image and activate input */}
              <label className="click" htmlFor="file">
                {" "}
                <img className="rounded-[50%]" src={preview} alt="" />
              </label>
              {/* Image upload field */}
              <input
                onChange={handleImageChange}
                className="hidden"
                id="file"
                type="file"
                accept="image/*"
              />
              {/* Text below the image */}
              <p className="mt-2.5">Elderly house Name</p>
              {/* Description of the image type */}
              <span className="mt-2.5">
                Allowed *.jpeg, *.jpg, *.png, *.gif Max size of 3.1 MB
              </span>
            </div>
          </div>
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
                      Elderly house Name{" "}
                    </p>
                    Elderly house
                  </div>
                  <div className="relative info-square">
                    <p className=" p-[1px]  text-[12px] absolute top-[-10px] text-[#637381] bg-white">
                      Email{" "}
                    </p>
                    adelkharzoum@gmail.com
                  </div>
                  <div className="relative info-square">
                    <p className="p-[1px]  text-[12px] absolute top-[-10px] text-[#637381] bg-white">
                      Address{" "}
                    </p>
                    Berlin, Alexanderplatz
                  </div>
                </div>
                {/* A container containing the right and right sides */}
                <div className="right w-full justify-center  flex flex-col gap-3.5">
                  <div className="relative info-square">
                    <p className="p-[1px]  text-[12px] absolute top-[-10px] text-[#637381] bg-white">
                      Manger name{" "}
                    </p>
                    elderlyhouse
                  </div>
                  <div className="relative info-square">
                    <p className="p-[1px]  text-[12px] absolute top-[-10px] text-[#637381] bg-white">
                      Phone Number{" "}
                    </p>
                    +447441 433 516
                  </div>
                  <div className="relative info-square">
                    <p className="p-[1px] text-[12px] absolute top-[-10px] text-[#637381] bg-white">
                      City{" "}
                    </p>
                    Berlin
                  </div>
                </div>
              </div>
              {/* A customized box for Zip/Code*/}
              <div className="mt-4">
                <div className="relative info-square">
                  <p className="p-[1px]  text-[12px] absolute top-[-10px] text-[#637381] bg-white">
                    Zip/Code
                  </p>
                  506540
                </div>
              </div>
              {/* Customized box for about */}
              <div className="mt-4">
                <div className="relative info-square flex justify-between items-center">
                  <p className="p-[1px]  text-[12px] absolute top-[-10px] text-[#637381] bg-white">
                    About
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
        <div className="mt-8 address p-3.5 mb-5">
          {/* A container that contains the container title and the add button{" "} */}
          <div className="flex justify-between max-[600px]:flex-col max-[600px]:gap-2.5">
            <p>Addresses</p>
            {/* When the add button is pressed, a popup opens to add the address */}
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-1.5  text-white bg-amber-600 p-1.5 rounded-xl max-[600px]:w-fit  max-[600px]:text-[14px] "
            >
              <FaPlus />
              Add new Address
            </button>
          </div>
          {/* A container containing the added addresses  */}
          <div className="mt-3.5 ">
            {/* Displaying address array data */}
            {address.map((item) => (
              <div
                key={item.id}
                className="row-info flex max-[670px]:flex-col max-[670px]:items-start gap-20 max-[670px]:gap-3  p-2.5 items-center mb-1.5"
              >
                <h2 className=""> {item.Address} </h2>
                <div
                  className="flex justify-between flex-1 gap-3.5 max-[545px]:w-full
"
                >
                  <div className="address-info gap-10 flex items-center max-[545px]:flex-col max-[545px]:items-start max-[545px]:gap-2.5 ">
                    <p>
                      {item.City}, {item.Street}
                    </p>
                    <p>{item.City}</p>
                    <p>{item.Code}</p>
                  </div>
                  {/* Container with delete and edit buttons */}
                  <div className="chose flex items-center gap-2.5">
                    <RiPencilLine className="click text-[1.5rem] text-gray-400" />
                    <FaRegTrashCan
                      onClick={() =>
                        setAddress(address.filter((e) => e.id !== item.id))
                      }
                      className="click text-[1.2rem] text-red-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
