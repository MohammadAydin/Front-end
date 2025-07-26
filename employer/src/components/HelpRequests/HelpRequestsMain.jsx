import React from "react";
import DetailsList from "../DetailsList";
import useData from "../../hooks/useData";

const HelpRequestsMain = () => {
  const { data: jopPosting, error, isLoadnig } = useData("/employerJobPosting");

  return (
    <div>
      {jopPosting?.data?.map((item) => (
        <DetailsList
          key={item.id}
          id={item.id}
          title={item.title}
          employees_required={item.employees_required}
          created_at={item.created_at}
          country={item?.location?.country}
          city={item?.location?.city}
          previousPage="helpRequests"
          index="t"
          avatarPhoto="t"
          name="t"
          email="t"
          orderDate="t"
          orderTime="t"
          specialist="t"
          address="t"
          price="t"
          status="In Progress"
          navigateTo={`/helpRequests/${item.id}`}
        />
      ))}
    </div>
  );
};

export default HelpRequestsMain;
