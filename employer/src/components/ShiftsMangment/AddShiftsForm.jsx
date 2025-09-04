import { zodResolver } from "@hookform/resolvers/zod";
import shiftTimeSchema from "./validationSchema";
import InputField from "../InputField";
import { useForm } from "react-hook-form";
import ShiftTime from "./ShiftTime";
import SubmitButtons from "../FormElements/SubmitButtons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils/axios";
const AddShiftsForm = ({ isFormOpen, setIsFormOpen }) => {
  const time = [
    { label: "From", timeField: "fromTime" },
    { label: "To", timeField: "toTime" },
  ];

  const queryClient = useQueryClient();
  const addShiftMutatuin = useMutation({
    mutationFn: (shift) =>
      customFetch
        .post("https://woundwann.de/v1/employer/shifts", shift)
        .then((res) => res.data),

    onSuccess: () => {
      // queryClient.setQueryData(["/employer/shifts"], (shifts) => {
      //   return [savedShifts, ...(shifts.data || [])];
      // });
      queryClient.invalidateQueries(["/employer/shifts"]);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(shiftTimeSchema),
  });

  const submit = (data) => {
    console.log(data);
    addShiftMutatuin.mutate({
      name: data.shiftName,
      start_time: data.fromTime,
      end_time: data.toTime,
    });

    reset();
    setIsFormOpen(false);
  };
  return (
    <>
      {isFormOpen && (
        <div className="w-full h-[100vh] absolute top-0 left-0 flex justify-center items-center bg-[#28293d94] text-black">
          <form
            onSubmit={handleSubmit(submit)}
            className="AddShiftsForm w-[600px] h-[400px] bg-white rounded-2xl p-7 flex flex-col justify-between"
          >
            <h2 className="text-xl font-bold mb-5">Add New Shift </h2>
            <InputField
              label={"Shift Name"}
              type={"text"}
              register={register}
              errors={errors}
              name={"shiftName"}
            />
            {errors.shift && (
              <span className="text-red-500 text-sm">
                {errors.shift.message}
              </span>
            )}
            <div className="my-5 ">
              <span className="font-bold">Add time</span>
              <div className="ShiftTime flex gap-10">
                {time.map((field) => (
                  <ShiftTime
                    key={field.label}
                    name={field.label}
                    register={register}
                    errors={errors}
                    timeField={field.timeField}
                  />
                ))}
              </div>
            </div>
            {addShiftMutatuin.error && (
              <p className="text-red-500 text-sm">
                {addShiftMutatuin.error.message}
              </p>
            )}
            <SubmitButtons
              onCancel={() => {
                setIsFormOpen(false), reset();
              }}
            />
          </form>
        </div>
      )}
    </>
  );
};

export default AddShiftsForm;
