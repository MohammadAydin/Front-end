import React, { useState } from "react";
import DetailsList from "../DetailsList";
import useData from "../../hooks/useData";
import { useTranslation } from "react-i18next";
import Filter from "../MoreElements/Filter";

const HelpRequestsMain = () => {
  const { t } = useTranslation();
  const [selectedValue, setSelectedValue] = useState("all");
  const endpoint =
    selectedValue === "all"
      ? "/employerJobPosting"
      : `/employerJobPosting?status=${selectedValue}`;
  const { data: jopPosting } = useData(endpoint);
  if (jopPosting?.data.length == 0) {
    return (
      <>
        <div className="flex justify-end my-3 ">
          <Filter
            options={[
              "all",
              "taken",
              "pending",
              "cancel",
              "todo",
              "done",
              "progress",
              "review",
              "OntheWay",
              "Arrived",
              "Canceled",
            ]}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
          />
        </div>
        <div className="flex justify-center mt-20">
          {t("HelpRequests.noneJop")}
        </div>
      </>
    );
  }
  return (
    <div>
      <div className="flex justify-end my-3 ">
        <Filter
          options={[
            "all",
            "taken",
            "pending",
            "cancel",
            "todo",
            "done",
            "progress",
            "review",
            "OntheWay",
            "Arrived",
            "Canceled",
          ]}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
      </div>
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
