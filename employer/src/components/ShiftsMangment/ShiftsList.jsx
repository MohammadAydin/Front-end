import { Mutation, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import customFetch from "../../utils/axios";
import { toast } from "react-toastify";
import EditShiftsForm from "./EditShiftsForm";
import CompletePersonalinfo from "../MoreElements/CompletePersonalinfo";

const ShiftsList = ({ id, name, startTime, endTime }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const containerRef = useRef(null);
  const [maxWidth, setMaxWidth] = useState(0);

  const queryClient = useQueryClient();
  const deleteShift = useMutation({
    mutationFn: (id) =>
      customFetch.delete(`/employer/shifts/${id}`).then((res) => res.data),

    onSuccess: (data) => {
      toast.success(data.message);

      queryClient.invalidateQueries(["/employer/shifts"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });

  useEffect(() => {
    const widths = Array.from(containerRef.current.children).map(
      (el) => el.offsetWidth
    );
    setMaxWidth(Math.max(...widths));
  }, [name]);

  return (
    <div className="ShiftsList flex justify-between items-center text-[#212B36] p-5 font-extrabold">
      <div
        ref={containerRef}
        style={{ width: maxWidth }}
        className="shiftname mr-4 "
      >
        {name}
      </div>
      <div className="shifttime flex gap-10">
        <div>
          <span>From:</span>
          <span className="font-thin ml-2">{startTime}</span>
        </div>
        <div>
          <span>To:</span>
          <span className="font-thin ml-2">{endTime}</span>
        </div>
      </div>
      <div className="ShiftBtn flex items-center gap-5">
        <button onClick={() => setIsFormOpen(true)} className=" cursor-pointer">
          <LuPencil size={23} />
        </button>
        <button
          onClick={() => deleteShift.mutate(id)}
          className=" cursor-pointer"
        >
          <LuTrash2 size={25} color="#F54336" />
        </button>
      </div>
      {isFormOpen && (
        <EditShiftsForm
          id={id}
          isFormOpen={isFormOpen}
          setIsFormOpen={setIsFormOpen}
          name={name}
          startTime={startTime}
          endtime={endTime}
        />
      )}
    </div>
  );
};

export default ShiftsList;
