import { useForm } from "react-hook-form";
import Wrapper from "../../assets/wrapper/LocationInfo/LocationInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "../../components/FormElements/InputField";
import Button from "../../components/MoreElements/Button";
import { useEffect, useState } from "react";
import Popup from "../../components/MoreElements/Popup/Popup.jsx";
import customFetch from "../../utils/axios.js";
import { toast } from "react-toastify";
import MapComponent from "../../components/MapComponent.jsx";
// To test before passing the map use axios
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
import { t } from "i18next";
import { IoLocationSharp } from "react-icons/io5";

const EditLocation = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const uploaded = searchParams.get("uploaded");

  const [searchParamstow] = useSearchParams();
  const id = searchParamstow.get("id");
  const street1 = searchParamstow.get("street1");
  const street2 = searchParamstow.get("street2");
  const postalcode = searchParamstow.get("postal_code");
  const city = searchParamstow.get("city");
  const country = searchParamstow.get("country");
  const { lengthLocations } = useParams();

  const {
    data: locations,
    error: errorlocations,
    isLoading: isLoadinglocations,
  } = useData("/locations", "locationsList");

  const [formDefaults, setFormDefaults] = useState({
    id: id || "",
    street1: street1 || "",
    street2: street2 || "",
    postalcode: postalcode || "",
    city: city || "",
    country: country || "",
  });

  const { OpenSuccsess } = OpenSuccsessPopup();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (uploaded === "true" && locations) {
      const location = locations.data.find(
        (location) => location.is_primary == 1
      );

      setFormDefaults({
        id: location.id || "",
        street1: location.street1 || "",
        street2: location.street2 || "",
        postalcode: location.postal_code || "",
        city: location.city || "",
        country: location.country || "",
      });

      // Set default values in form
      reset({
        street1: location.street1 || "",
        street2: location.street2 || "",
        postalcode: location.postal_code || "",
        city: location.city || "",
        country: location.country || "",
      });
    }
  }, [uploaded, locations, reset]);

  //Send data
  const submit = async (data) => {
    // Send to api
    try {
      const response = await customFetch.put(`/locations/${formDefaults.id}`, {
        street1: data.street1,
        street2: data.street2 || "",
        city: data.city,
        country: data.country,
        postal_code: data.postalcode || "",
        title: "nullTest",
      });
      // if success

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

  const [showPopup, setshowPopup] = useState(false);
  const togglePopup = () => setshowPopup(!showPopup);

  useEffect(() => {
    if (showPopup) {
      document.body.classList.add("active-modal");
    } else {
      document.body.classList.remove("active-modal");
    }
  }, [showPopup]);

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
                defaultvalue={formDefaults.street1}
              />
              <InputField
                register={register}
                errors={errors}
                label={t("addLocation.fields.house")}
                name={"street2"}
                type={"text"}
                defaultvalue={formDefaults.street2}
              />
              <InputField
                register={register}
                errors={errors}
                label={t("addLocation.fields.postalCode")}
                name={"postalcode"}
                type={"text"}
                defaultvalue={formDefaults.postalcode}
              />
              <InputField
                register={register}
                errors={errors}
                label={t("addLocation.fields.city")}
                name={"city"}
                type={"text"}
                defaultvalue={formDefaults.city}
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
                defaultvalue={formDefaults.country}
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
              <Link
                className="w-full sm:w-auto"
                to={`${uploaded === "true" ? "/Personal info" : "/"}`}
              >
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
                {t("addLocation.edit")}
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

export default EditLocation;
