import { useForm } from "react-hook-form";
import InputField from "../../InputField";
import InputPasswordField from "../../InputPasswordField";
import ImageChange from "../../FormElements/ImageChange";
import { IoClose } from "react-icons/io5";
import SubmitButtons from "../../FormElements/SubmitButtons";
import { zodResolver } from "@hookform/resolvers/zod";
import AddLeaderSchema from "./LeaderFormSchema";
const AddLeaderForm = ({ isFormOpen, setIsFormOpen }) => {
  const inputs = [
    { label: "Full name", name: "name", type: "text" },
    { label: "Position", name: "position", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Phone Number", name: "PhoneNumber", type: "tel" },
  ];
  const Permissions = [
    "Permissions 1",
    "Permissions 2",
    "Permissions 3",
    "Permissions 4",
    "Permissions 5",
  ];

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AddLeaderSchema),
    defaultValues: {
      permissions: [],
    },
  });

  const submit = (data) => {
    reset();
    setIsFormOpen(false);
  };
  return (
    <>
      {isFormOpen && (
        <div className="w-full h-[100vh] absolute top-0 left-0 flex justify-center items-center bg-[#28293d94] text-black">
          <div className="AddLeaderForm w-[900px] bg-white rounded-2xl text-black p-6 py-8 ">
            <form
              action="post"
              onSubmit={handleSubmit(submit)}
              className="h-full flex flex-col justify-between"
            >
              <div className="text-xl font-bold mb-5 flex justify-between items-center">
                <h2>Add New leader</h2>
                <button
                  onClick={() => {
                    setIsFormOpen(false), reset();
                  }}
                >
                  <IoClose size={25} />
                </button>
              </div>
              <ImageChange
                register={register}
                setValue={setValue}
                errors={errors}
                name="avatar"
              />
              <div className="LeadersInputs grid grid-cols-2 gap-4 mb-4">
                {inputs.map((input) => (
                  <div key={input.name}>
                    <InputField
                      register={register}
                      errors={errors}
                      label={input.label}
                      name={input.name}
                      type={input.type}
                    />
                  </div>
                ))}
              </div>
              <InputPasswordField register={register} errors={errors} />
              <h4 className="text-lg font-bold  my-5">Permissions</h4>
              <div className="Permissions flex items-center">
                {Permissions.map((per) => (
                  <div className="text-[#919EAB] flex items-center " key={per}>
                    <input
                      {...register("permissions")}
                      type="checkbox"
                      id={per}
                      value={per}
                      className="Permission w-5 h-5"
                    />
                    <label htmlFor={per} className=" mx-4">
                      {per}
                    </label>
                  </div>
                ))}
              </div>
              {errors.permissions && (
                <p className="InputErrors text-red-500 mt-2">
                  {errors.permissions.message}
                </p>
              )}
              <div className="mt-5">
                <SubmitButtons
                  onCancel={() => {
                    setIsFormOpen(false);
                    reset();
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddLeaderForm;
