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
import { Link, useNavigate, useParams } from "react-router-dom";
import useData from "../../hooks/useData.js";
import { OpenSuccsessPopup } from "../../store/OpenSuccsessPopup.js";

const editLocation = () => {
  const { id, title, street1, street2, postal_code, city, country } =
    useParams();
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
  const baseSchema = z.object({
    street1: z.string().min(1, "Street1 name is required"),
    postalcode: z
      .string()
      .min(4, "Postal code must be at least 4 characters")
      .regex(/^\d+$/, "Postal code must be a number"),
    country: z.string().min(1, "Country is required"),
    city: z.string().min(1, "City is required"),
    street2: z.string().min(1, "Street2 is required"),
    title: z.string().min(1, "Title is required"),
  });

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
      const response = await customFetch.put(`/locations/${id}`, {
        street1: data.street1,
        street2: data.street2 || "",
        city: data.city,
        country: data.country,
        postal_code: data.postalcode || " ",
        title: data.title || "",
      });
      // if success

      OpenSuccsess();
      navigate("/locationInfo");

      // If it doesn't success
    } catch (error) {
      // Print error message in console
      console.log("send location error full:", error);
      // Show error message in toast
      toast.error(
        "send location error: " +
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
    // container wrapper
    <Wrapper className="w-full">
      <div className="w-full">
        {/* If Workabilities is false Displays text the location add */}

        <h1>edit location </h1>
        <p className=" text-softColor mt-4">
          Edit your site data and the new site will be saved.{" "}
        </p>

        <div className="mt-3 w-full">
          <div className="form-Loacations mt-5 w-full">
            <form onSubmit={(e) => e.preventDefault()} className="w-full">
              {" "}
              {/* If Workabilities is false Displays field the location add */}
              <InputField
                register={register}
                errors={errors}
                label={"title"}
                name={"title"}
                type={"text"}
                defaultvalue={title}
              />
              <div className="grid grid-cols-2  gap-6 w-full max-[536px]:grid-cols-1 mt-5 mb-5">
                <InputField
                  register={register}
                  errors={errors}
                  label={"Street"}
                  name={"street1"}
                  type={"text"}
                  defaultvalue={street1}
                />
                <InputField
                  register={register}
                  errors={errors}
                  label={"house"}
                  name={"street2"}
                  type={"text"}
                  defaultvalue={street2}
                />
                <InputField
                  register={register}
                  errors={errors}
                  label={"Postal code"}
                  name={"postalcode"}
                  type={"text"}
                  defaultvalue={postal_code}
                />

                <InputField
                  register={register}
                  errors={errors}
                  label={"City"}
                  name={"city"}
                  type={"text"}
                  defaultvalue={city}
                />
              </div>
              <InputField
                register={register}
                errors={errors}
                label={"Country"}
                name={"country"}
                type={"text"}
                defaultvalue={country}
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

              <Link className="w-full" to="/locationInfo">
                <Button
                  className="bg-white border border-secondaryColor  text-secondaryColor  p-2 rounded-[10px] w-full"
                  text="Back"
                />
              </Link>

              {/* Confirm button to open a popup confirming sending the location */}
              <Button
                onClick={togglePopup}
                type="button"
                className="bg-secondaryColor  text-white p-2  rounded-[10px] w-full "
                text="Edit"
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

export default editLocation;
