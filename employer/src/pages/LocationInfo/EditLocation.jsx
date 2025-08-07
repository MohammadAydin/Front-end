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
    // container wrapper
    <Wrapper className="w-full">
      <div className="w-full">
        <h1>{t("locationEdit.title")}</h1>
        <p className="text-softColor mt-4">{t("locationEdit.description")}</p>

        <div className="mt-3 w-full">
          <div className="form-Loacations mt-5 w-full">
            <form onSubmit={(e) => e.preventDefault()} className="w-full">
              {" "}
              {/* If Workabilities is false Displays field the location add */}
              <div className="grid grid-cols-2  gap-6 w-full max-[536px]:grid-cols-1 mt-5 mb-5">
                <InputField
                  register={register}
                  errors={errors}
                  label={t("editLocation.fields.street")}
                  name={"street1"}
                  type={"text"}
                  defaultvalue={formDefaults.street1}
                />
                <InputField
                  register={register}
                  errors={errors}
                  label={t("editLocation.fields.house")}
                  name={"street2"}
                  type={"text"}
                  defaultvalue={formDefaults.street2}
                />
                <InputField
                  register={register}
                  errors={errors}
                  label={t("editLocation.fields.postalCode")}
                  name={"postalcode"}
                  type={"text"}
                  defaultvalue={formDefaults.postalcode}
                />

                <InputField
                  register={register}
                  errors={errors}
                  label={t("editLocation.fields.city")}
                  name={"city"}
                  type={"text"}
                  defaultvalue={formDefaults.city}
                />
              </div>
              <InputField
                register={register}
                errors={errors}
                label={t("editLocation.fields.country")}
                name={"country"}
                type={"text"}
                defaultvalue={formDefaults.country}
              />
              <div className="w-full h-[300px] overflow-hidden rounded-md mt-6">
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
            </form>
            <div className="flex w-[25vw] gap-3.5 ml-auto mt-16">
              {/* If Workabilities is false Displays button back the location add */}

              <Link
                className="w-full"
                to={`${
                  uploaded === "true" ? "/Personal info" : "/locationInfo"
                }`}
              >
                <Button
                  className="bg-white border border-secondaryColor  text-secondaryColor  p-2 rounded-[10px] w-full"
                  text={t("editLocation.back")}
                />
              </Link>

              {/* Confirm button to open a popup confirming sending the location */}
              <Button
                onClick={togglePopup}
                type="button"
                className="bg-secondaryColor  text-white p-2  rounded-[10px] w-full "
                text={t("editLocation.edit")}
              />
            </div>
          </div>
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
