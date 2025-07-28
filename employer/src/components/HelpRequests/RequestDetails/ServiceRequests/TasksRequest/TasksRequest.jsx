import { useEffect } from "react";
import ListTasks from "./ListTasks";
import { MdErrorOutline } from "react-icons/md";

const TasksRequest = ({ data }) => {
  console.log(data);
  return (
    <div className="mt-8">
      <h2 className="font-[900] text-xl mb-3">Task Request</h2>
      {data?.map((item) => (
        <ListTasks
          key={item?.id}
          id={item?.id}
          status={item?.status}
          start_at={item?.start_at}
          end_at={item?.end_at}
          rate={item?.job_posting?.rate}
          location={item?.job_posting?.location}
          created_at={item?.created_at}
          previousPage="serviceRequestsDetails"
          navigateTo={`/`}
          // navigateTo={`/serviceRequestsDetails/${idJop}/${item.id}/${item.tasks}`}
        />
      ))}

      {data?.length === 0 && (
        <p className="p-2.5 flex items-center gap-2 text-red-500">
          No Task yet <MdErrorOutline />
        </p>
      )}
    </div>
  );
};

export default TasksRequest;
