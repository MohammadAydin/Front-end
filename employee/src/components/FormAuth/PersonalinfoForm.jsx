import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import customFetch from "../../utils/axios";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { useAuthStore } from "../../store/useAuthStore";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { createPersonalInfoSchema } from "../../utils/validationSchema";

const PersonalinfoForm = () => {
  // Definition of routing from ReactRoute
  const navigate = useNavigate();

  // Translation hook
  const { t } = useTranslation();

  // Storage services
  const [services, setServices] = useState([]);

  // Index Storage Services
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(null);

  // Index Storage for occupation
  const [occupationValue, setOccupationValue] = useState("");

  // Error storage
  const [error, setError] = useState();

  // Storing service values
  const [servicesValue, setServicesValue] = useState("");

  // Create validation schema with translations
  const schema = createPersonalInfoSchema(t);

  // Hook form definition
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  // submit function
  const submit = async (data) => {
    // Get user from local storage
    const user = getUserFromLocalStorage("user");
    // Get token from user
    const token = user?.token;
    // User storage in Zostand
    useAuthStore.getState().setUser(user);

    // Bring the Occupation
    const selectedOccupation = services[selectedServiceIndex]?.occupations.find(
      (occ) =>
        occ.name.toLowerCase().trim() === data.Occupation.toLowerCase().trim()
    );

    // Get the Occupation ID
    const occupationId = selectedOccupation ? selectedOccupation.id : null;
    // Send service ID and Occupation
    // Token Header Definition and Consent
    try {
      const respone = await customFetch.post(
        "/assign/position",
        {
          department: 1,
          occupation: occupationId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      // Show success message
      toast.success(respone?.data?.message || t("personalInfo.success"));

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      toast.error(error?.response?.data?.message || t("personalInfo.error"));
    }
  };

  // useeffect function to retrieve services
  useEffect(() => {
    // Get user from local storage
    const user = getUserFromLocalStorage("user");
    // Get token from user
    const token = user?.token;
    // Bring services
    customFetch
      .get("/positions", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((res) => setServices(res.data.data.departments))
      .catch((error) => setError(error.response?.data?.message));
  }, []);

  return (
    <>
      {/* Definition of form */}
      <form
        className="inputs flex flex-col login"
        onSubmit={handleSubmit(submit)}
      >
        {/* Main page text */}
        <h2 className="formTitle font-bold text-[2.4vw] mt-6 text-[#28293D] mb-4">
          Your Specialization
        </h2>

        <div className="flex flex-col">
          <div className="relative mb-2.5">
            {/* Select Services */}
            <select
              {...register("services")}
              className={`input-control appearance-none focus:outline-none ${
                servicesValue === "" ? "text-gray-500" : "text-black"
              }`}
              id="services"
              defaultValue=""
              onChange={(e) => {
                // Based on the selection, the values ​​and index are stored.
                const index = e.target.value;
                setSelectedServiceIndex(index);
                setServicesValue(index);
                setOccupationValue(""); // إعادة ضبط الاختيار الثاني
              }}
            >
              {/* valueDefault the services */}
              <option value="" disabled>
                {t("personalInfo.services.placeholder")}
              </option>
              {/* Work on services */}
              {services?.map((service, index) => (
                <option key={index} value={index}>
                  {service.name}
                </option>
              ))}
            </select>
            {/* Display error check */}
            {errors.services && (
              <p className="text-red-500 text-[0.7rem] mt-2">
                {errors.services.message}
              </p>
            )}
            {/* Dropdown icon */}
            <MdOutlineKeyboardArrowDown className="absolute top-3 right-2" />
          </div>

          <div className="relative mb-2.5">
            {/* Select to display Occupation */}
            <select
              {...register("Occupation")}
              className={`input-control appearance-none focus:outline-none ${
                occupationValue === "" ? "text-gray-500" : "text-black"
              }`}
              id="Occupation"
              defaultValue=""
              // Store the selected value
              onChange={(e) => setOccupationValue(e.target.value)}
            >
              {/* Default value */}
              <option value="" disabled>
                Select an occupation
              </option>
              {/* Display occupations based on service selection */}
              {selectedServiceIndex !== null &&
                services[selectedServiceIndex]?.occupations?.map((occ, i) => (
                  <option key={i} value={occ.name}>
                    {occ.name}
                  </option>
                ))}
            </select>
            {/* Error display occupations */}
            {errors.Occupation && (
              <p className="text-red-500 text-[0.7rem] mt-2">
                {errors.Occupation.message}
              </p>
            )}
            {/* Dropdown icon */}
            <MdOutlineKeyboardArrowDown className="absolute top-3 right-2" />
          </div>
        </div>
        <div className="flex w-full justify-center gap-5">
          {/* Skip button directs to the main page */}
          {/* <Link
            to="/"
            className="p-2 button-login mb-3 bg-white border border-gray-500 text-gray-500 text-center rounded-[10px] w-[15vw]"
          >
            Skip
          </Link> */}
          {/* Transmitter button */}
          <button
            className="p-2 button-login mb-3 bg-amber-600 text-white rounded-[10px] w-full"
            type="submit"
          >
            Submit{" "}
          </button>
        </div>
      </form>

      {/* Style settings to make the color select transparent */}
      <style>{`
        select option {
          color: black;
        }
        select option[disabled] {
          color: #6b7280 !important;
        }
      `}</style>
    </>
  );
};

export default PersonalinfoForm;
