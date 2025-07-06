import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Definition of a schema from the Zod library for constraints
const schema = z.object({
  Address: z
    .string()
    .min(3, { message: "Address must be at least 3 characters long" }),
  Street: z
    .string()
    .min(3, { message: "Street must be at least 3 characters long" }),
  Code: z.number().min(100, { message: "Code must be at least 3 digits long" }),
  City: z
    .string()
    .min(3, { message: "City must be at least 3 characters long" }),
  Country: z
    .string()
    .min(3, { message: "Country must be at least 3 characters long" }),
});

// Popup to add other addresses
// Receive some props from the profile page
const Popup = ({ onClose, setAddress, address }) => {
  // Basic definition of the HookForm library and linking to the Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  // Transmitter function
  const onSubmit = (data) => {
    // Add the address to the array and later to the api
    setAddress([...address, { ...data, id: address.length + 1 }]);
    onClose(false);
  };
  return (
    // Container to make the background dark
    <div className="fixed  inset-0 z-50 flex items-center justify-center bg-black/30">
      {/* Pop-Up Container */}
      <div className="Popup bg-white w-[90%] max-w-lg h-fit p-3.5 rounded-2xl">
        {/* A container containing title and close button */}
        <div className="flex justify-between mb-4 ">
          <p>Add new address</p>
          {/* Button for shutdown */}
          <IoClose className="click" onClick={() => onClose(false)} />
        </div>
        {/* start form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Container for the Address name field */}
          <div className="relative input-group mb-1.5">
            <label
              className="label-email absolute z-1 left-3 top-[50%] translate-y-[-50%] px-2 bg-white"
              htmlFor="Address"
            >
              Address name
            </label>
            <input
              {...register("Address")}
              className="input-control"
              type="text"
              id="Address"
              // value={}
            />
          </div>
          {/* Address name error message */}
          {errors.Address && (
            <p className="text-[#f47621]">{errors.Address.message}</p>
          )}
          {/* A container containing the Street name, House number field */}
          <div className="relative input-group mb-1.5">
            <label
              className="label-email absolute z-1 left-3 top-[50%] translate-y-[-50%] px-2 bg-white"
              htmlFor="Street"
            >
              Street name, House number
            </label>
            <input
              {...register("Street")}
              className="input-control"
              type="text"
              id="Street"
              // value={}
            />
          </div>
          {/* Error message Street name, house number */}
          {errors.Street && (
            <p className="text-[#f47621]">{errors.Street.message}</p>
          )}
          {/* A container containing a Postal Code field */}
          <div className="relative input-group mb-1.5">
            <label
              className="label-email absolute z-1 left-3 top-[50%] translate-y-[-50%] px-2 bg-white"
              htmlFor="Code"
            >
              Postal Code
            </label>
            <input
              {...register("Code", { valueAsNumber: true })}
              className="input-control"
              type="text"
              id="Code"
              // value={}
            />
          </div>
          {/* Postal Code Error Message */}
          {errors.Code && (
            <p className="text-[#f47621]">{errors.Code.message}</p>
          )}
          {/* A container containing a City field   */}
          <div className="relative input-group mb-1.5">
            <label
              className="label-email absolute z-1 left-3 top-[50%] translate-y-[-50%] px-2 bg-white"
              htmlFor="City"
            >
              City
            </label>
            <input
              {...register("City")}
              className="input-control"
              type="text"
              id="City"
              // value={}
            />
          </div>
          {/* City field error message */}
          {errors.City && (
            <p className="text-[#f47621]">{errors.City.message}</p>
          )}
          {/* Country field container */}
          <div className="relative input-group mb-1.5">
            <label
              className="label-email absolute z-1 left-3 top-[50%] translate-y-[-50%] px-2 bg-white"
              htmlFor="Country"
            >
              Country
            </label>
            <input
              {...register("Country")}
              className="input-control"
              type="text"
              id="Country"
              // value={}
            />
          </div>
          {/* Country error message */}
          {errors.Country && (
            <p className="text-[#f47621]">{errors.Country.message}</p>
          )}
          {/* Container with Save and Cancel button */}
          <div className="flex justify-end gap-0.5 mt-2.5">
            <button
              onClick={() => onClose(false)}
              type="button"
              className="text-gray-900 bg-[#F1F1F5] border border-gray-300 font-medium rounded-lg text-sm px-5 py-1.5 me-2 mb-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-white bg-[#f47621] font-medium rounded-lg text-sm px-5 mb-2"
            >
              add
            </button>
          </div>
        </form>
        {/* The end of the form */}
      </div>
    </div>
  );
};

export default Popup;
