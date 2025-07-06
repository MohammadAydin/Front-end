import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";

// Passing props to close and adjusting the value of about
const PopupAbout = ({ onClose, setAbout }) => {
  // Define hook form to handle the field
  const { register, handleSubmit } = useForm();

  // Transmitter function
  const onSubmit = (data) => {
    // Shutting down the pop-up
    onClose(false),
      // Storing the field value
      setAbout(data.About);
  };
  return (
    // Pop-up to write about the nursing home in the profile
    // Container to darken the background
    <div className="fixed  inset-0 z-50 flex items-center justify-center bg-black/30">
      {/* Pop-Up Container */}
      <div className="Popup bg-white w-[90%] max-w-lg h-fit p-3.5 rounded-2xl">
        {/* Container with title and closure button */}
        <div className="flex justify-between mb-4 ">
          <p>Edit About</p>
          <IoClose className="click" onClick={() => onClose(false)} />
        </div>
        {/* The beginning of the form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Container containing the about text field */}
          <div className="relative input-group mb-1.5">
            <input
              {...register("About")}
              className="input-control"
              type="text"
              id="About"
              placeholder="About Elderly house"
            />
          </div>
          {/* Container with close and save button */}
          <div className="flex justify-end gap-0.5 mt-2.5">
            {/* Shutdown button */}
            <button
              onClick={() => onClose(false)}
              type="button"
              className="text-gray-900 bg-[#F1F1F5] border border-gray-300 font-medium rounded-lg text-sm px-5 py-1.5 me-2 mb-2"
            >
              Cancel
            </button>
            {/* Save button  */}
            <button
              type="submit"
              className="text-white bg-[#f47621] font-medium rounded-lg text-sm px-5 mb-2"
            >
              Save
            </button>
          </div>
        </form>
        {/* The end of the form */}
      </div>
    </div>
  );
};

export default PopupAbout;
