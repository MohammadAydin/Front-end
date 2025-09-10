import ListService from "./ListService";

const ServiceRequests = ({ data, title }) => {

  return (
    <div className="mt-8">
      <h2 className="font-[900] text-xl mb-3">Service Request</h2>

      {data?.map((item) => (
        <ListService
          key={item.id}
          id={item.id}
          date={item.date}
          status={item.status}
          employeeNum={item?.employees_assigned}
          previousPage="helpRequests"
          navigateTo={`/serviceRequestsDetails?data=${encodeURIComponent(
            JSON.stringify(item)
          )}&title=${encodeURIComponent(title)}`}
        // navigateTo={`/serviceRequestsDetails/${idJop}/${item.id}/${item.tasks}`}
        />
      ))}
    </div>
  );
};

export default ServiceRequests;
