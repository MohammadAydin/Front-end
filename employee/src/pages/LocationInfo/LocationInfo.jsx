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
import { useNavigate } from "react-router-dom";

const LocationInfo = () => {
  // Navigate definition for routing
  const navigate = useNavigate();

  // storage case lat
  // const [lat, setLat] = useState(0);
  // storage case lng
  // const [lng, setLng] = useState(0);

  // Store workabilisate state for mobility
  const [Workabilities, setWorkabilities] = useState(false);
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

  const distanceSchema = z.object({
    distance: z
      .string()
      .min(1, "Distance is required")
      .regex(/^\d+$/, "Distance must be a number"),
  });
  // Connecting the Zod Library to the Hookform
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Workabilities ? distanceSchema : baseSchema),
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
        title: data.title || "",
      });
      // if success
      // Print the data sent to the console
      console.log(data);
      // Response printing
      console.log(response.data);

      reset({
        distance: "",
      });
      // Set workabilisaty to true
      setWorkabilities(true);
      // Show success message
      toast.success(response.data.message);

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

  // function distance
  const handleDistanceSubmit = async (data) => {
    // Send to api
    try {
      const response = await customFetch.put("/profile/workable-distance", {
        workable_distance: data.distance,
      });
      // Print response
      console.log(response);
      // Toast presentation for success message
      toast.success(response?.data?.message);
      // Head to the main path
      navigate("/");
      // Make distance false
      setWorkabilities(false);
    } catch (error) {
      // Print the error message
      console.log("erorr send distance" + error?.response?.data?.message);
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
        {!Workabilities ? (
          <>
            <h1> Complete Location Info</h1>
            <p className=" text-softColor mt-4">
              Please , Complete your locationdetails
            </p>
            <h2 className="mt-6">Primary location</h2>
          </>
        ) : (
          //else, it displays text Workabilities
          <>
            <h1>Work abilities</h1>
            <p className=" text-softColor mt-4">
              Please , Complete your locationdetails
            </p>
            <p className=" text-softColor mt-4 ">
              Work Abilities: Please specify the maximum distance (in
              kilometers) you're willing to travel to reach your work location.
            </p>
            <h2 className="mt-6">Determine the distance</h2>
          </>
        )}

        <div className="mt-3 w-full">
          <div className="form-Loacations mt-5 w-full">
            <form onSubmit={(e) => e.preventDefault()} className="w-full">
              {" "}
              {/* If Workabilities is false Displays field the location add */}
              {!Workabilities ? (
                <>
                  <InputField
                    register={register}
                    errors={errors}
                    label={"title"}
                    name={"title"}
                    type={"text"}
                  />
                  <div className="grid grid-cols-2  gap-6 w-full max-[536px]:grid-cols-1 mt-5 mb-5">
                    <InputField
                      register={register}
                      errors={errors}
                      label={"Street 1"}
                      name={"street1"}
                      type={"text"}
                    />
                    <InputField
                      register={register}
                      errors={errors}
                      label={"Street 2"}
                      name={"street2"}
                      type={"text"}
                    />
                    <InputField
                      register={register}
                      errors={errors}
                      label={"Postal code"}
                      name={"postalcode"}
                      type={"text"}
                    />

                    <InputField
                      register={register}
                      errors={errors}
                      label={"City"}
                      name={"city"}
                      type={"text"}
                    />
                  </div>
                  <InputField
                    register={register}
                    errors={errors}
                    label={"Country"}
                    name={"country"}
                    type={"text"}
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
                </>
              ) : (
                <InputField
                  register={register}
                  errors={errors}
                  label={"km"}
                  name={"distance"}
                  type={"text"}
                />
              )}
            </form>
            <div className="flex w-[25vw] gap-3.5 ml-auto mt-16">
              {/* If Workabilities is false Displays button back the location add */}
              {!Workabilities ? (
                <Button
                  className="bg-white border border-secondaryColor  text-secondaryColor  p-2 rounded-[10px] w-full"
                  text="Back"
                />
              ) : (
                //else, it displays button back Workabilities

                <Button
                  className="bg-white border border-secondaryColor  text-secondaryColor  p-2 rounded-[10px] w-full"
                  text="Back"
                  onClick={() => setWorkabilities(false)}
                />
              )}
              {/* Confirm button to open a popup confirming sending the location */}
              <Button
                onClick={togglePopup}
                type="button"
                className="bg-secondaryColor  text-white p-2  rounded-[10px] w-full "
                text="Next"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Displays the popup according to its status. */}
      {showPopup && (
        <Popup
          togglePopup={togglePopup}
          onConfirm={() =>
            handleSubmit(Workabilities ? handleDistanceSubmit : submit)()
          }
        />
      )}
    </Wrapper>
  );
};

export default LocationInfo;
