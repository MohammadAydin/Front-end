import { useMemo, useState } from "react";
import ListService from "./ListService";

const ServiceRequests = ({ data, title, idJopPosting }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const counts = useMemo(() => {
    const base = { all: data?.length || 0, pending: 0, taken: 0 };
    (data || []).forEach((i) => {
      const key = String(i.status || "");
      if (base[key] !== undefined) base[key] += 1;
      else base[key] = 1;
    });
    return base;
  }, [data]);

  const filtered = useMemo(() => {
    if (!data) return [];
    if (activeFilter === "all") return data;
    return data.filter((i) => i.status === activeFilter);
  }, [data, activeFilter]);

  console.log(filtered);
  const filters = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "taken", label: "Taken" },
  ];

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-[900] text-xl">Service Requests</h2>
        <span className="text-sm text-gray-600">{counts.all} total</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`px-3 py-1 rounded-full text-sm border transition-colors ${
              activeFilter === f.key
                ? "bg-[#F47621] text-white border-[#F47621]"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            }`}
          >
            {f.label}
            <span
              className={`ml-2 inline-flex items-center justify-center rounded-full px-2 text-xs ${
                activeFilter === f.key
                  ? "bg-white/20 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {counts[f.key] ?? 0}
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-600 bg-white">
          No service requests found for this filter.
        </div>
      )}

      {filtered.map((item) => (
        <ListService
          key={item.id}
          id={item.id}
          idJopPosting={idJopPosting}
          date={item.date}
          status={item.status}
          employeeNum={item?.employees_assigned}
          previousPage="helpRequests"
          navigateTo={`/serviceRequestsDetails?data=${encodeURIComponent(
            JSON.stringify(item)
          )}&title=${encodeURIComponent(title)}&jobId=${encodeURIComponent(
            idJopPosting
          )}`}
          canCancel={item?.canCancel}
        />
      ))}
    </div>
  );
};

export default ServiceRequests;
