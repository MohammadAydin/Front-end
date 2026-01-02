import React from "react";
import WalletHeader from "../components/Wallet/WalletHeader";
import WalletMain from "../components/Wallet/WalletMain";
import CompletePersonalinfo from "../components/MoreElements/CompletePersonalinfo";
import statusAccount from "../utils/statusAccountReturn";
import StatusAccount from "../utils/statusAccountReturn";

const Wallet = () => {
  if (localStorage.getItem("statusAccount") !== "approved") {
    return <StatusAccount status={localStorage.getItem("statusAccount")} />;
  }

  return (
    <div className="Wallet p-4 md:p-6 lg:p-8 py-8 md:py-12 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <CompletePersonalinfo />

      <div className="max-w-7xl mx-auto">
        <WalletHeader />
        <div className="mt-6">
          <WalletMain />
        </div>
      </div>
    </div>
  );
};

export default Wallet;
