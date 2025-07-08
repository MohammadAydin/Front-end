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

const EditWorkaBilities = () => {
  // Navigate definition for routing
  const navigate = useNavigate();

  const { workable_distance } = useParams();

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
    resolver: zodResolver(distanceSchema),
  });

  // function distance
  const submit = async (data) => {
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
      navigate("/LocationInfo");
    } catch (error) {
      // Print the error message
      console.log("erorr send distance" + error?.response?.data?.message);
    }
  };

  return (
    // container wrapper
    <Wrapper className="w-full">
      <div className="w-full">
        <h1>Work abilities</h1>
        <p className=" text-softColor mt-4">
          Complete your edit Work abilities
        </p>
        <p className=" text-softColor mt-4 ">
          Work Abilities: Please specify the maximum distance (in kilometers)
          you're willing to travel to reach your work location.
        </p>
        <h2 className="mt-6">Determine the distance</h2>

        <div className="mt-3 w-full">
          <div className="form-Loacations mt-5 w-full">
            <form onSubmit={handleSubmit(submit)} className="w-full">
              {" "}
              <InputField
                register={register}
                errors={errors}
                label={"km"}
                name={"distance"}
                type={"text"}
                defaultvalue={workable_distance}
              />
              <div className="flex w-[25vw] gap-3.5 ml-auto mt-16">
                <Link to="/LocationInfo" className="w-full">
                  <Button
                    className="bg-white border border-secondaryColor  text-secondaryColor  p-2 rounded-[10px] w-full"
                    text="Back"
                  />
                </Link>
                <button
                  type={"submit"}
                  className="bg-secondaryColor  text-white p-2  rounded-[10px] w-full"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default EditWorkaBilities;
