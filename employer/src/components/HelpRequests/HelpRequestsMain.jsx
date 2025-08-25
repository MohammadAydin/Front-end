import React from "react";
import DetailsList from "../DetailsList";
import useData from "../../hooks/useData";
import { useTranslation } from "react-i18next";

const HelpRequestsMain = () => {
  const { t } = useTranslation();

  const { data: jopPosting, error, isLoadnig } = useData("/employerJobPosting");
  if (jopPosting?.data.length == 0) {
    return (
      <div className="flex justify-center mt-20">
        {t("HelpRequests.noneJop")}
      </div>
    );
  }
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
          shiftid={item?.shift_id}
          date_from={item?.date_from}
          date_to={item?.date_to}
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
