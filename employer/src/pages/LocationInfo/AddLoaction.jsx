import { useForm } from "react-hook-form";
import Wrapper from "../../assets/wrapper/LocationInfo/LocationInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "../../components/FormElements/InputField";
import Button from "../../components/MoreElements/Button";
// To test before passing the map use useeffect
import { useEffect, useState } from "react";
import Popup from "../../components/MoreElements/Popup/Popup.jsx";
import customFetch from "../../utils/axios.js";
import { toast } from "react-toastify";
import MapComponent from "../../components/MapComponent.jsx";
// To test before passing the map use axios
import axios from "axios";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import useData from "../../hooks/useData.js";
import { OpenSuccsessPopup } from "../../store/OpenSuccsessPopup.js";
import { useTranslation } from "react-i18next";
import { createLocationSchema } from "../../utils/validationSchema.js";
import { IoLocationSharp } from "react-icons/io5";

const AddLoaction = () => {
  const [searchParams] = useSearchParams();
  const uploaded = searchParams.get("uploaded");

  const { t } = useTranslation();

  const { lengthLocations } = useParams();
  const { OpenSuccsess } = OpenSuccsessPopup();
  // Navigate definition for routing
  const navigate = useNavigate();

  // storage case lat
  // const [lat, setLat] = useState(0);
  // storage case lng
  // const [lng, setLng] = useState(0);

  // Store pop-up status
  const [showPopup, setshowPopup] = useState(false);

  // Reverse pop-up status
  const togglePopup = () => {
    setshowPopup(!showPopup);
  };

  // If it appears, add the active-modal class.
  if (showPopup) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  // Constraints chart from the Zod Library
  const baseSchema = createLocationSchema(t);

  // Connecting the Zod Library to the Hookform
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(baseSchema),
  });

  //Send data
  const submit = async (data) => {
    // Send to api
    try {
      const response = await customFetch.post("/locations", {
        street1: data.street1,
        street2: data.street2 || "",
        city: data.city,
        country: data.country,
        postal_code: data.postalcode || " ",
        title: "nullTest",
      });
      // if success

      // Response printing
      OpenSuccsess();
      navigate(-1);

      // If it doesn't success
    } catch (error) {
      // Print error message in console
      // Show error message in toast
      toast.error(
        t("addLocation.sendLocationError") +
          ": " +
          (error?.response?.data?.message || error.message || "Unknown error")
      );
    }
  };

  // To test before passing the map

  // useEffect(() => {
  //   const fetchLocation = async () => {
  //     const address = `${watch("address") || "Königsallee, Düsseldorf, Germany"}
  //     }`.trim();
  //     if (!address || address === ", ,") return; // تجنب الطلب إذا كان العنوان فارغًا
  //     try {
  //       const response = await axios.get(
  //         `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
  //           address
  //         )}&key=AIzaSyDH-rfDKqld3jf64z84P9e34iNBkdSwZlw`
  //       );
  //       if (response.data.status === "OK") {
  //         console.log(
  //           "data location",
  //           response.data
  //         );
  //         console.log(
  //           "lng : ",
  //           response.data.results[0].geometry.location.lng
  //         );
  //         console.log(
  //           "lat : ",
  //           response.data.results[0].geometry.location.lat
  //         );
  //         setLat(response.data.results[0].geometry.location.lat)
  //         setLng(response.data.results[0].geometry.location.lng)
  //         console.log(lng)
  //         console.log(lat)
  //         setaddress(address)
  //       } else {
  //         console.error(
  //           "error in the respon",
  //           response.data.status,
  //           response.data.error_message
  //         );
  //       }
  //     } catch (error) {
  //       console.error(
  //         "error : ",
  //         error.response?.data?.error_message || error.message
  //       );
  //     }
  //   };
  //   fetchLocation();
  // }, [watch("address")]);

  return (
    <Wrapper className="w-full px-4 md:px-6 py-6">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#F47621] to-[#ff8c42] rounded-2xl p-6 md:p-8 mb-8 shadow-lg overflow-hidden animate-slide-up">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-2">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                <IoLocationSharp size={32} className="text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                {t("addLocation.Pleaseenteryourlocation")}
              </h1>
            </div>
            <p className="text-white/90 text-sm md:text-base mt-2 ml-[68px]">
              {lengthLocations == 0
                ? t("addLocation.primaryLocation")
                : t("addLocation.alternateLocation")}
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 animate-slide-up">
          <form onSubmit={(e) => e.preventDefault()} className="w-full">
            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <InputField
                register={register}
                errors={errors}
                label={t("addLocation.fields.street")}
                name={"street1"}
                type={"text"}
              />
              <InputField
                register={register}
                errors={errors}
                label={t("addLocation.fields.house")}
                name={"street2"}
                type={"text"}
              />
              <InputField
                register={register}
                errors={errors}
                label={t("addLocation.fields.postalCode")}
                name={"postalcode"}
                type={"text"}
              />
              <InputField
                register={register}
                errors={errors}
                label={t("addLocation.fields.city")}
                name={"city"}
                type={"text"}
              />
            </div>
            
            {/* Country Field */}
            <div className="mb-6">
              <InputField
                register={register}
                errors={errors}
                label={t("addLocation.fields.country")}
                name={"country"}
                type={"text"}
              />
            </div>

            {/* Map Component */}
            <div className="w-full h-[350px] md:h-[400px] overflow-hidden rounded-xl mt-6 border-2 border-gray-200 shadow-md">
              <MapComponent
                address={
                  watch([
                    "postalcode",
                    "street1",
                    "street2",
                    "city",
                    "country",
                  ]) || "Königsallee, Düsseldorf, Germany"
                }
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-end">
              <Link className="w-full sm:w-auto" to={-1}>
                <button
                  type="button"
                  className="w-full sm:w-auto px-8 py-3 bg-white border-2 border-[#F47621] text-[#F47621] rounded-xl font-bold text-base hover:bg-[#F47621]/5 transition-all duration-300 hover:scale-105 shadow-md"
                >
                  {t("addLocation.back")}
                </button>
              </Link>
              <button
                onClick={togglePopup}
                type="button"
                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#F47621] to-[#ff8c42] hover:from-[#EE6000] hover:to-[#F47621] text-white rounded-xl font-bold text-base shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                {t("addLocation.next")}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Displays the popup according to its status. */}
      {showPopup && (
        <Popup
          togglePopup={togglePopup}
          onConfirm={() => handleSubmit(submit)()}
        />
      )}
    </Wrapper>
  );
};

export default AddLoaction;
