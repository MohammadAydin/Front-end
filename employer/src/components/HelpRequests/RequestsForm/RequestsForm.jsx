import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CalendarRange from "./CalendarRange";
import SelectField from "../../SelectField";
import RequestsInput from "./RequestsInput";
import useRequestsStore from "../../../store/HelpRequestsStore";
import { HiOutlineCheckCircle } from "react-icons/hi";
import RequestSchema from "./Schema";
import SubmitButtons from "../../FormElements/SubmitButtons";
import useData from "../../../hooks/useData";
import customFetch from "../../../utils/axios";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const inputs = [
  { name: "Title", label: "Title", type: "text" },
  { name: "Description", label: "Description", type: "text" },
];

const dataPosation = [
  { name: "Pflegefachkraft", id: 1 },
  { name: "Pflegefachassistent", id: 2 },
  { name: "Pflegehelfer", id: 3 },
];

const EmployeeNumber = [
  { name: 1, id: 1 },
  { name: 2, id: 2 },
  { name: 3, id: 3 },
];

const RequestsForm = () => {
  const queryClient = useQueryClient();
  const { RequestIsOpen, RequestClose, RequestDone, Done, notDone } =
    useRequestsStore();
  const { data: dataShift, error, isLoading } = useData("/employer/shifts");
  const {
    data: dataLocationt,
    errorLocation,
    isLoadingLocation,
  } = useData("/locations");
  const resultLocation = dataLocationt?.data?.map((item) => ({
    name: item?.street1,
    id: item.id,
  }));
  const selectOptions = ["Position", "Shifts", "Address"];

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RequestSchema),
    defaultValues: {
      ["EmployeeCount"]: 1,
    },
  });

  const submit = async (data) => {
    console.log(data);
    try {
      const response = await customFetch.post("/employerJobPosting", {
        title: data.Title,
        description: data.Description,
        employees_required: data.EmployeeCount,
        date_from: new Date(data.date.from).toISOString().split("T")[0],
        date_to: new Date(data.date.to).toISOString().split("T")[0],
        location_id: data.Address,
        employee_positions_id: data.Position,
        shift_id: data.Shifts,
      });
      queryClient.invalidateQueries(["employerJobPosting"]);
      toast.success(response?.data?.message);

      RequestClose(), reset();
    } catch (error) {
      toast.error(error?.response?.data?.message);

      console.error("Error during submission:", error?.response?.data?.message);
    }
  };

  return (
    <>
      {RequestIsOpen && (
        <div className="w-full h-[100vh] absolute top-0 left-0 flex justify-center items-center bg-[#28293d94] text-white">
          {RequestDone ? (
            <div className="RequestsDone w-[600px] h-[500px] bg-white rounded-2xl text-[#4CE452] flex flex-col items-center justify-center gap-2">
              <HiOutlineCheckCircle size={200} />
              <p className="text-black font-extrabold text-xl my-3">
                Your Requests has been sent successfully
              </p>
              <button
                onClick={() => {
                  notDone(), RequestClose();
                }}
                className="flex gap-1 items-center font-[900] text-lg bg-[#F47621] text-white px-10 py-2 rounded-xl cursor-pointer"
              >
                Back to management
              </button>
            </div>
          ) : (
            <div className="RequestsForm w-[880px] min-h-[70%] bg-white rounded-2xl text-black p-6 py-8 ">
              <h3 className="text-2xl font-[900]">Create new help request</h3>
              <form action="" onSubmit={handleSubmit(submit)}>
                <div className="w-full flex items-center gap-3">
                  {inputs.map((input) => (
                    <RequestsInput
                      key={input.name}
                      register={register}
                      label={input.label}
                      type={input.type}
                      name={input.name}
                      errors={errors}
                    />
                  ))}
                </div>
                <div className=" grid grid-cols-2 gap-x-3">
                  {selectOptions.map((name) => (
                    <div
                      key={name}
                      className={`${name === "Address" ? "col-span-2" : ""}`}
                    >
                      <SelectField
                        data={
                          name === "Shifts"
                            ? [
                                ...(dataShift?.data || []),
                                { id: "custom", name: "Custom Shift" },
                              ]
                            : name === "Address"
                            ? resultLocation
                            : dataPosation
                        }
                        name={name}
                        errors={errors}
                        setValue={setValue}
                        register={register}
                        value={watch(name)}
                      />
                    </div>
                  ))}
                </div>
                <div className="w-full flex gap-3 items-center h-full">
                  <div className="w-[22%]">
                    <SelectField
                      data={EmployeeNumber}
                      name={"EmployeeCount"}
                      errors={errors}
                      setValue={setValue}
                      register={register}
                      value={watch("EmployeeCount")}
                      // { data, name, errors, setValue, register, value }
                    />
                    {/* <RequestsInput
                      register={register}
                      label={"Employee count"}
                      type={"number"}
                      name={"EmployeeCount"}
                      errors={errors}
                    /> */}
                  </div>
                  <CalendarRange
                    register={register}
                    name={"date"}
                    setValue={setValue}
                    errors={errors}
                  />
                </div>
                <SubmitButtons
                  onCancel={() => {
                    RequestClose(), reset();
                  }}
                  submitLabel="Send"
                />
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RequestsForm;
