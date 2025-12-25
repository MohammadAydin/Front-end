import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import Popup from "../../components/MoreElements/Popup/Popup.jsx";
import customFetch from "../../utils/axios.js";
import { toast } from "react-toastify";
import MapComponent from "../../components/MapComponent.jsx";
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
import { IoLocationSharp, IoHomeOutline, IoMapOutline, IoMailOutline, IoArrowBack } from "react-icons/io5";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import InputField from "../../components/FormElements/InputField";

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
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(baseSchema),
  });

  // Handle location selection from map
  const handleLocationSelect = (locationData) => {
    if (locationData) {
      setValue("street1", locationData.street1 || "", { shouldValidate: true });
      setValue("city", locationData.city || "", { shouldValidate: true });
      setValue("country", locationData.country || "", { shouldValidate: true });
      setValue("postalcode", locationData.postalCode || "", { shouldValidate: true });
      
      // Show success message
      toast.success(t("locationInfo.locationSelected") || "Location selected successfully");
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Gradient Header */}
      <div className="bg-gradient-to-r from-[#F47621] to-[#ff8c42] rounded-b-3xl p-6 md:p-8 relative overflow-hidden shadow-lg animate-slide-down">
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
              <IoLocationSharp className="text-white" size={32} />
            </div>
            <h2 className="font-bold text-3xl md:text-4xl text-white drop-shadow-lg">
              {t("addLocation.Pleaseenteryourlocation")}
            </h2>
          </div>
          <p className="text-white/90 text-sm md:text-base mt-2 ml-16">
            {lengthLocations == 0
              ? t("addLocation.primaryLocation")
              : t("addLocation.alternateLocation")}
          </p>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6 animate-slide-up">
          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Street Field */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-md border border-gray-100 hover:border-[#F47621]/30 transition-all duration-300 animate-slide-up" style={{ animationDelay: "50ms" }}>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                <div className="bg-gradient-to-br from-[#F47621]/10 to-[#ff8c42]/10 rounded-lg p-1.5">
                  <IoMapOutline className="text-[#F47621]" size={18} />
                </div>
                {t("addLocation.fields.street")}
              </label>
              <InputField
                register={register}
                errors={errors}
                label=""
                name={"street1"}
                type={"text"}
                defaultvalue={formDefaults.street1}
              />
            </div>

            {/* House Number Field */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-md border border-gray-100 hover:border-[#F47621]/30 transition-all duration-300 animate-slide-up" style={{ animationDelay: "100ms" }}>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                <div className="bg-gradient-to-br from-[#F47621]/10 to-[#ff8c42]/10 rounded-lg p-1.5">
                  <IoHomeOutline className="text-[#F47621]" size={18} />
                </div>
                {t("addLocation.fields.house")}
              </label>
              <InputField
                register={register}
                errors={errors}
                label=""
                name={"street2"}
                type={"text"}
                defaultvalue={formDefaults.street2}
              />
            </div>

            {/* Postal Code Field */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-md border border-gray-100 hover:border-[#F47621]/30 transition-all duration-300 animate-slide-up" style={{ animationDelay: "150ms" }}>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                <div className="bg-gradient-to-br from-[#F47621]/10 to-[#ff8c42]/10 rounded-lg p-1.5">
                  <IoMailOutline className="text-[#F47621]" size={18} />
                </div>
                {t("addLocation.fields.postalCode")}
              </label>
              <InputField
                register={register}
                errors={errors}
                label=""
                name={"postalcode"}
                type={"text"}
                defaultvalue={formDefaults.postalcode}
              />
            </div>

            {/* City Field */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-md border border-gray-100 hover:border-[#F47621]/30 transition-all duration-300 animate-slide-up" style={{ animationDelay: "200ms" }}>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                <div className="bg-gradient-to-br from-[#F47621]/10 to-[#ff8c42]/10 rounded-lg p-1.5">
                  <IoLocationSharp className="text-[#F47621]" size={18} />
                </div>
                {t("addLocation.fields.city")}
              </label>
              <InputField
                register={register}
                errors={errors}
                label=""
                name={"city"}
                type={"text"}
                defaultvalue={formDefaults.city}
              />
            </div>
          </div>

          {/* Country Field */}
          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-md border border-gray-100 hover:border-[#F47621]/30 transition-all duration-300 animate-slide-up" style={{ animationDelay: "250ms" }}>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
              <div className="bg-gradient-to-br from-[#F47621]/10 to-[#ff8c42]/10 rounded-lg p-1.5">
                <IoLocationSharp className="text-[#F47621]" size={18} />
              </div>
              {t("addLocation.fields.country")}
            </label>
            <InputField
              register={register}
              errors={errors}
              label=""
              name={"country"}
              type={"text"}
              defaultvalue={formDefaults.country}
            />
          </div>

          {/* Map Component */}
          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-md border border-gray-100 hover:border-[#F47621]/30 transition-all duration-300 animate-slide-up" style={{ animationDelay: "300ms" }}>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-4">
              <div className="bg-gradient-to-br from-[#F47621]/10 to-[#ff8c42]/10 rounded-lg p-1.5">
                <IoMapOutline className="text-[#F47621]" size={18} />
              </div>
              {t("locationInfo.mapView") || "Map"}
            </label>
            <div className="w-full h-[350px] md:h-[400px] overflow-hidden rounded-xl border-2 border-gray-200 shadow-md relative">
              <MapComponent
                address={
                  (() => {
                    const street1 = watch("street1");
                    const city = watch("city");
                    const country = watch("country");
                    const postalcode = watch("postalcode");
                    
                    if (street1 && city && country) {
                      return `${street1}, ${city}, ${country}`;
                    } else if (postalcode && city && country) {
                      return `${postalcode}, ${city}, ${country}`;
                    }
                    return "Königsallee, Düsseldorf, Germany";
                  })()
                }
                onLocationSelect={handleLocationSelect}
                isSelectable={true}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-slide-up" style={{ animationDelay: "350ms" }}>
            <button
              type="button"
              onClick={() => navigate(uploaded === "true" ? "/Personal info" : "/")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-lg font-bold px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95"
            >
              <IoArrowBack size={20} />
              {t("addLocation.back")}
            </button>
            <button
              onClick={togglePopup}
              type="button"
              className="bg-gradient-to-r from-[#F47621] to-[#ff8c42] hover:from-[#E55A1A] hover:to-[#F47621] text-white text-lg font-bold px-12 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95"
            >
              {t("addLocation.edit")}
            </button>
          </div>
        </form>
      </div>

      {/* Displays the popup according to its status. */}
      {showPopup && (
        <Popup
          togglePopup={togglePopup}
          onConfirm={() => handleSubmit(submit)()}
        />
      )}
    </div>
  );
};

export default EditLocation;
