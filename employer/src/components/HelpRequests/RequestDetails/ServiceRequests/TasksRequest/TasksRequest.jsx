import { useEffect } from "react";
import ListTasks from "./ListTasks";

const TasksRequest = ({ data }) => {
  data = data[0];

  return (
    <div className="mt-8">
      <h2 className="font-[900] text-xl mb-3">Task Request</h2>
      {data ? (
        <ListTasks
          id={data?.id}
          status={data?.status}
          start_at={data?.start_at}
          rate={data?.job_posting?.rate}
          location={data?.job_posting?.location}
          previousPage="serviceRequestsDetails"
          navigateTo={`/`}
          // navigateTo={`/serviceRequestsDetails/${idJop}/${item.id}/${item.tasks}`}
        />
      ) : (
        <p className="p-2.5">No Task yet</p>
      )}
    </div>
  );
};

export default TasksRequest;
