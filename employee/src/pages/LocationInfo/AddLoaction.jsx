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

import ReactFlagsSelect from "react-flags-select";

import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import SelectField from "../../components/FormElements/SelectField.jsx";
import Spinner from "../../components/MoreElements/Spinner.jsx";
import SpinnerLoading from "../../components/MoreElements/SpinnerLoading.jsx";
import SelectFieldCity from "../../components/FormElements/SelectFieldCity.jsx";
const AddLoaction = () => {
  const { data: statusLocation, error, isLoading } = useData("/profile/status");

  const endPointLocation =
    statusLocation?.location !== "approved"
      ? "/locations/primary"
      : "/locations";
  const [selected, setSelected] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [cites, setCites] = useState([]);
  useEffect(() => {}, [selected]);
  const [searchParams] = useSearchParams();
  const uploaded = searchParams.get("uploaded");

  const { t } = useTranslation();
  const { lengthLocations } = useParams();
  const { OpenSuccsess } = OpenSuccsessPopup();
  // Navigate definition for routing
  const navigate = useNavigate();
  const [isLoadingCity, setLoadingCity] = useState(false);
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
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(baseSchema),
  });

  //Send data
  const submit = async (data) => {
    // Send to api
    try {
      const response = await customFetch.post(endPointLocation, {
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
  countries.registerLocale(enLocale);
  const handleCountrySelect = (countryCode) => {
    const countryName = countries.getName(countryCode, "en");
    setSelected(countryCode);
    setSelectedName(countryName);
    setValue("country", countryName);
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
  useEffect(() => {
    setLoadingCity(true);
    const fetchCities = async () => {
      if (!selectedName) {
        setLoadingCity(false);
        return;
      }

      try {
        const res = await axios.post(
          "https://countriesnow.space/api/v0.1/countries/cities",
          { country: selectedName },
          { timeout: 20000 }
        );
        setLoadingCity(false);
        setCites(res.data.data);
        if (res.data.error === false) {
          setCites(res.data.data);
        } else {
          console.error(res.data.msg);
          setLoadingCity(false);
        }
      } catch (error) {
        setLoadingCity(false);
        console.error(error.message);
      }
    };

    fetchCities();
  }, [selectedName]);
  return (
    // container wrapper
    <Wrapper className="w-full">
      <div className="w-full">
        {/* If Workabilities is false Displays text the location add */}

        <h1>{t("addLocation.title")}</h1>
        <p className=" text-softColor mt-4">
          {lengthLocations == 0
            ? t("addLocation.primaryLocation")
            : t("addLocation.alternateLocation")}
        </p>

        <div className="mt-3 w-full">
          <div className="form-Loacations mt-5 w-full">
            <form onSubmit={(e) => e.preventDefault()} className="w-full">
              {" "}
              {/* If Workabilities is false Displays field the location add */}
              <div className="grid grid-cols-2  gap-6 w-full max-[536px]:grid-cols-1 mt-5 mb-5">
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

                <ReactFlagsSelect
                  selected={selected}
                  onSelect={handleCountrySelect}
                  searchable
                />
              </div>
              <SelectFieldCity
                key="city"
                name="city"
                label="city"
                register={register}
                errors={errors}
                setValue={setValue}
                value={watch("city")}
                Options={cites}
                disabled={isLoadingCity}
                loading={isLoadingCity}
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

              <Link className="w-full" to={-1}>
                <Button
                  className="bg-white border border-secondaryColor  text-secondaryColor  p-2 rounded-[10px] w-full"
                  text={t("addLocation.back")}
                />
              </Link>

              {/* Confirm button to open a popup confirming sending the location */}
              <Button
                onClick={togglePopup}
                type="button"
                className="bg-secondaryColor  text-white p-2  rounded-[10px] w-full "
                text={t("addLocation.next")}
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

export default AddLoaction;
