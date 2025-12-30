import React from "react";
import OffersHeader from "../components/Offers/OffersHeader";
import OffersMain from "../components/Offers/OffersMain";
import CompletePersonalinfo from "../components/MoreElements/CompletePersonalinfo";
import statusAccount from "../utils/statusAccountReturn";
import StatusAccount from "../utils/statusAccountReturn";

const Offers = () => {
  if (localStorage.getItem("statusAccount") !== "approved") {
    return <StatusAccount status={localStorage.getItem("statusAccount")} />;
  }

  return (
    <div className="Offers p-4 md:p-6 lg:p-8 py-8 md:py-12 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <CompletePersonalinfo />

      <div className="max-w-7xl mx-auto">
        <OffersHeader />
        <div className="mt-6">
          <OffersMain />
        </div>
      </div>
    </div>
  );
};

export default Offers;


