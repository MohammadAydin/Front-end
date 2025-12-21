import React, { useMemo, useState } from "react";
import ServiceRequestCard from "./ServiceRequestCard";
import useData from "../../hooks/useData";
import { useTranslation } from "react-i18next";
import { useQueries } from "@tanstack/react-query";
import customFetch from "../../utils/axios";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import { LuFilter } from "react-icons/lu";

const HelpRequestsMain = () => {
  const { t } = useTranslation();
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("newest");

  // Fetch all job postings
  const { data: jopPosting, isLoading: isJobListLoading } = useData("/employerJobPosting");
  console.log(jopPosting);

  // Status tabs configuration
  const statusTabs = [
    { key: "all", label: t("serviceRequest.filters.all"), color: "bg-gray-100 text-gray-800" },
    { key: "taken", label: t("serviceRequest.filters.taken"), color: "bg-blue-100 text-blue-800" },
    { key: "pending", label: t("serviceRequest.filters.pending"), color: "bg-yellow-100 text-yellow-800" },
    { key: "expired", label: t("serviceRequest.status.expired"), color: "bg-red-100 text-red-800" },
    { key: "cancel_with_repost", label: t("serviceRequest.status.cancelWithRepost"), color: "bg-orange-100 text-orange-800" },
    { key: "cancel_without_repost", label: t("serviceRequest.status.cancelWithoutRepost"), color: "bg-gray-100 text-gray-800" },
  ];

  const jobPostings = jopPosting?.data || [];

  // Fetch details for each job posting to get service_requests
  const jobIds = useMemo(() => jobPostings.map((jp) => jp.id), [jobPostings]);

  const detailsQueries = useQueries({
    queries: jobIds.map((id) => ({
      queryKey: ["/employerJobPosting", id],
      queryFn: async () => {
        const res = await customFetch.get(`/employerJobPosting/${id}`);
        return res.data; // keep same shape used elsewhere: { success, data: { job_posting, service_requests, ... } }
      },
      enabled: jobIds.length > 0,
      staleTime: 60 * 1000,
    })),
  });

  const isDetailsLoading = detailsQueries.some((q) => q.isLoading);

  // Flatten service requests from all job posting details
  const serviceRequests = useMemo(() => {
    const all = [];
    detailsQueries.forEach((q, index) => {
      const srList = q.data?.data?.service_requests || [];
      const jp = q.data?.data?.job_posting;
      const loc = q.data?.data?.location;
      const employeePosition = q.data?.data?.employeePosition || jobPostings[index]?.employeePosition;
      const shift = q.data?.data?.shift;
      srList.forEach((sr) => {
        all.push({
          ...sr,
          jobPosting: {
            ...jp,
            location: loc,
            employeePosition: employeePosition || jp?.employeePosition
          },
          location: loc,
          shift,
        });
      });
    });
    return all;
  }, [detailsQueries, jobPostings]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = serviceRequests;

    // Filter by status
    if (selectedStatus !== "all") {
      list = list.filter((sr) => sr.status === selectedStatus);
    }

    // Filter by search query
    if (q) {
      list = list.filter((sr) => {
        const title = String(sr.jobPosting?.title || "").toLowerCase();
        const city = String(sr.jobPosting?.location?.city || "").toLowerCase();
        const country = String(sr.jobPosting?.location?.country || "").toLowerCase();
        const date = String(sr.date || "").toLowerCase();
        return title.includes(q) || city.includes(q) || country.includes(q) || date.includes(q);
      });
    }

    // Sort
    switch (sortKey) {
      case "oldest":
        return [...list].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
      case "date":
        return [...list].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
      case "newest":
      default:
        return [...list].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
    }
  }, [serviceRequests, search, sortKey, selectedStatus]);

  // Get counts for each status
  const getStatusCount = (status) => {
    if (status === "all") return serviceRequests.length;
    return serviceRequests.filter((sr) => sr.status === status).length;
  };

  if (isJobListLoading || isDetailsLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 animate-slide-up">
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-[#F47621]/20 border-t-[#F47621] rounded-full animate-spin"></div>
          </div>
          <p className="mt-6 text-gray-600 text-center">{t('common.loading') || 'Loading...'}</p>
        </div>
      </div>
    );
  }

  if (serviceRequests.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 animate-slide-up">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full p-6 mb-4">
            <FaBriefcase size={48} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Service Requests</h3>
          <p className="text-gray-600">{t("HelpRequests.noneJop")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-slide-up">
      {/* Filter Buttons - Matching Notifications Style */}
      <div className="mb-6 bg-gradient-to-r from-[#F47621] to-[#ff8c42] rounded-xl p-4 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <LuFilter size={18} className="md:w-5 md:h-5 text-white/80" />
            <span className="text-white/80 text-sm hidden sm:inline">Filter:</span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2 bg-white/20 backdrop-blur-sm rounded-lg p-1 w-full sm:w-auto overflow-x-auto">
            {statusTabs.map((tab) => {
              const count = getStatusCount(tab.key);
              const isActive = selectedStatus === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setSelectedStatus(tab.key)}
                  className={`px-3 py-1.5 md:px-4 md:py-2 rounded-md font-semibold text-xs md:text-sm transition-all duration-300 whitespace-nowrap ${isActive
                      ? "bg-white text-[#F47621] shadow-md"
                      : "text-white/80 hover:text-white"
                    }`}
                >
                  {tab.label} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Search and Sort Controls */}
      <div className="mb-6 bg-white rounded-xl shadow-md border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('serviceRequest.searchPlaceholder') || "Search by title, city, country, or date..."}
              className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 pl-12 pr-4 py-3.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F47621] focus:border-[#F47621] focus:bg-white shadow-sm transition-all duration-300 hover:border-gray-300"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative md:w-64">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10 pointer-events-none">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
              </svg>
            </div>
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 pl-12 pr-10 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F47621] focus:border-[#F47621] focus:bg-white shadow-sm transition-all duration-300 hover:border-gray-300 appearance-none cursor-pointer"
            >
              <option value="newest">{t('serviceRequest.sortNewest') || "Newest First"}</option>
              <option value="oldest">{t('serviceRequest.sortOldest') || "Oldest First"}</option>
              <option value="date">{t('serviceRequest.sortByDate') || "Sort by Date"}</option>
            </select>
            <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
          </div>
        </div>
      </div>

      {/* Service Request Cards */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
          {filtered.map((sr, index) => (
            <div key={sr.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
              <ServiceRequestCard
                serviceRequest={sr}
                jobPosting={sr.jobPosting}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg border-2 border-dashed border-gray-300 p-12 text-center animate-slide-up">
          <div className="bg-gray-100 rounded-full p-4 inline-block mb-4">
            <FaSearch size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Results Found</h3>
          <p className="text-gray-600">{t('serviceRequest.noResults')}</p>
        </div>
      )}
    </div>
  );
};

export default HelpRequestsMain;
