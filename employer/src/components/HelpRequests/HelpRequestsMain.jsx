import React, { useMemo, useState } from "react";
import ServiceRequestCard from "./ServiceRequestCard";
import useData from "../../hooks/useData";
import { useTranslation } from "react-i18next";
import { useQueries } from "@tanstack/react-query";
import customFetch from "../../utils/axios";

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
    { key: "all", label: "All", color: "bg-gray-100 text-gray-800" },
    { key: "taken", label: "Taken", color: "bg-blue-100 text-blue-800" },
    { key: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
    { key: "expired", label: "Expired", color: "bg-red-100 text-red-800" },
    { key: "cancel_with_repost", label: "Cancel with Repost", color: "bg-orange-100 text-orange-800" },
    { key: "cancel_without_repost", label: "Cancel without Repost", color: "bg-gray-100 text-gray-800" },
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
      srList.forEach((sr) => {
        all.push({
          ...sr,
          jobPosting: { 
            ...jp, 
            location: loc,
            employeePosition: employeePosition || jp?.employeePosition
          },
          location: loc,
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
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0F1A43]">Service Requests</h1>
          <p className="text-sm text-gray-600 mt-1">{t('common.loading') || 'Loading...'}</p>
        </div>
        <div className="border border-dashed border-gray-300 rounded-xl p-10 text-center bg-white text-gray-600">
          {t("HelpRequests.noneJop")}
        </div>
      </div>
    );
  }

  if (serviceRequests.length === 0) {
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0F1A43]">Service Requests</h1>
          <p className="text-sm text-gray-600 mt-1">No service requests yet</p>
        </div>
        <div className="border border-dashed border-gray-300 rounded-xl p-10 text-center bg-white text-gray-600">
          {t("HelpRequests.noneJop")}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F1A43]">{t('serviceRequest.title')}</h1>
        <p className="text-sm text-gray-600 mt-1">
          {serviceRequests.length} {t('serviceRequest.totalRequests')}
        </p>
      </div>

      {/* Status Tabs */}
      <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-2">
        <div className="flex flex-wrap gap-2">
          {statusTabs.map((tab) => {
            const count = getStatusCount(tab.key);
            const isActive = selectedStatus === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setSelectedStatus(tab.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#F47621] text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.label}
                <span
                  className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    isActive ? "bg-white text-[#F47621]" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search and Sort Controls */}
      <div className="mb-6 flex flex-col md:flex-row gap-3">
        <div className="flex-1">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('serviceRequest.searchPlaceholder')}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F47621] focus:border-transparent"
          />
        </div>
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F47621] focus:border-transparent"
        >
          <option value="newest">{t('serviceRequest.sortNewest')}</option>
          <option value="oldest">{t('serviceRequest.sortOldest')}</option>
          <option value="date">{t('serviceRequest.sortByDate')}</option>
        </select>
      </div>

      {/* Results Info */}
      {filtered.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            {t('serviceRequest.showing')} <span className="font-semibold text-gray-900">{filtered.length}</span>{" "}
            {selectedStatus !== "all" ? `${selectedStatus} ` : ""}
            {t('serviceRequest.serviceRequests', { count: filtered.length })}
          </p>
        </div>
      )}

      {/* Service Request Cards */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((sr) => (
            <ServiceRequestCard
              key={sr.id}
              serviceRequest={sr}
              jobPosting={sr.jobPosting}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-10 text-center">
          <p className="text-gray-600">
            {t('serviceRequest.noResults')}
          </p>
        </div>
      )}
    </div>
  );
};

export default HelpRequestsMain;
