import React, { useState } from "react";
import useData from "../../hooks/useData";
import OfferCard from "./OfferCard";
import { useTranslation } from "react-i18next";
import { RiGiftLine } from "react-icons/ri";

const OffersMain = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("all");

  const { data: allOffers, isLoading: isLoadingAll } = useData("/offers");
  const { data: activeOffers, isLoading: isLoadingActive } = useData(
    "/offers/active"
  );
  const { data: availableOffers, isLoading: isLoadingAvailable } = useData(
    "/offers/available"
  );

  const isLoading =
    activeTab === "all"
      ? isLoadingAll
      : activeTab === "active"
      ? isLoadingActive
      : isLoadingAvailable;

  const getCurrentOffers = () => {
    if (activeTab === "all") return allOffers?.data || [];
    if (activeTab === "active") return activeOffers?.data || [];
    return availableOffers?.data || [];
  };

  const offers = getCurrentOffers();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F47621]"></div>
        <p className="mt-4 text-gray-600">{t("common.loading")}</p>
      </div>
    );
  }

  const tabs = [
    { id: "all", label: t("Offers.tabs.all"), count: allOffers?.data?.length || 0 },
    {
      id: "active",
      label: t("Offers.tabs.active"),
      count: activeOffers?.data?.length || 0,
    },
    {
      id: "available",
      label: t("Offers.tabs.available"),
      count: availableOffers?.data?.length || 0,
    },
  ];

  return (
    <div className="OffersMain">
      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-md p-2 mb-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-[#F47621] to-[#ff8c42] text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab.id
                  ? "bg-white/20 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Error State */}
      {!isLoading && offers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="relative max-w-md w-full">
            {/* Animated Background Circles */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-[#F47621]/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            </div>

            {/* Main Card */}
            <div className="relative bg-white rounded-2xl shadow-xl p-12 border border-gray-100">
              {/* Icon Container */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F47621]/20 to-blue-500/20 rounded-full blur-xl"></div>
                  <div className="relative bg-gradient-to-br from-[#F47621] to-[#ff8c42] rounded-full p-6">
                    <RiGiftLine size={64} className="text-white" />
                  </div>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-3">
                {t(`Offers.empty.${activeTab}`)}
              </h3>

              {/* Decorative Elements */}
              <div className="flex justify-center gap-2 mt-6">
                <div
                  className="w-2 h-2 bg-[#F47621] rounded-full animate-bounce"
                  style={{ animationDelay: "0s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-[#F47621] rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Offers Grid */}
      {offers.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <OfferCard key={offer?.id || index} offer={offer} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OffersMain;

