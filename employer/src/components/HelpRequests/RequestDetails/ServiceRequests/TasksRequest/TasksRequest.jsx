import { useEffect } from "react";
import ListTasks from "./ListTasks";
import { MdErrorOutline, MdTaskAlt } from "react-icons/md";
import { useTranslation } from "react-i18next";

const TasksRequest = ({ data, idJopPosting }) => {
  const { t } = useTranslation();
  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <MdTaskAlt className="text-2xl text-blue-600" />
        </div>
        <h2 className="font-bold text-2xl text-gray-800">{t("taskRequests.title")}</h2>
        {data?.length > 0 && (
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            {data.length === 1 ? t("taskRequests.taskCount", { count: data.length }) : t("taskRequests.taskCountPlural", { count: data.length })}
          </span>
        )}
      </div>

      <div className="space-y-4">
        {data?.map((item) => (
          <div key={item?.id}>
            <ListTasks
              key={item?.id}
              id={item?.id}
              status={item?.status}
              start_at={item?.start_at}
              end_at={item?.end_at}
              rate={item?.job_posting?.rate}
              location={item?.job_posting?.location}
              created_at={item?.created_at}
              assigned_to={item?.assigned_to}
              idJopPosting={idJopPosting}
              previousPage="serviceRequestsDetails"
              navigateTo={`/`}
              // navigateTo={`/serviceRequestsDetails/${idJop}/${item.id}/${item.tasks}`}
            />
          </div>
        ))}
      </div>

      {data?.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <div className="flex flex-col items-center gap-3">
            <div className="p-4 bg-red-100 rounded-full">
              <MdErrorOutline className="text-3xl text-red-500" />
            </div>
            <p className="text-gray-600 text-lg font-medium">
              {t("taskRequests.noTasksAvailable")}
            </p>
            <p className="text-gray-500 text-sm">
              {t("taskRequests.tasksWillAppear")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksRequest;
