import React, { useMemo, useState } from "react";
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
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("newest");

  const items = jopPosting?.data || [];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = items;
    if (q) {
      list = items.filter((i) => {
        const title = String(i.title || "").toLowerCase();
        const city = String(i?.location?.city || "").toLowerCase();
        const country = String(i?.location?.country || "").toLowerCase();
        return title.includes(q) || city.includes(q) || country.includes(q);
      });
    }
    switch (sortKey) {
      case "oldest":
        return [...list].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      case "date_from":
        return [...list].sort((a, b) => new Date(a.date_from) - new Date(b.date_from));
      case "newest":
      default:
        return [...list].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
  }, [items, search, sortKey]);

  if (items.length == 0) {
    return (
      <>
        <div className="flex justify-between items-center my-4 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#0F1A43]">Job Postings</h1>
            <p className="text-sm text-gray-600">No job postings yet</p>
          </div>
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
        <div className="border border-dashed border-gray-300 rounded-xl p-10 text-center bg-white text-gray-600">
          {t("HelpRequests.noneJop")}
        </div>
      </>
    );
  }
  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between my-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F1A43]">Job Postings</h1>
          <p className="text-sm text-gray-600">{items.length} total</p>
        </div>
        <div className="flex flex-col md:flex-row gap-3 md:items-center">
          <div className="relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or location..."
              className="w-64 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F47621] focus:border-transparent"
            />
          </div>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F47621] focus:border-transparent"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="date_from">Start date</option>
          </select>
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
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
            status={item?.status || "pending"}
            navigateTo={`/helpRequests/${item.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HelpRequestsMain;
