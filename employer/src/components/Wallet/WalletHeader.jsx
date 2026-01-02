import { FaWallet } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import useData from "../../hooks/useData";
import { useState } from "react";
import PurchaseOfferModal from "./PurchaseOfferModal";
import DepositFundsModal from "./DepositFundsModal";

const WalletHeader = () => {
  const { t } = useTranslation();
  const { data: wallet, isLoading } = useData("/employer/wallet");
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);

  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return "0.00";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: wallet?.data?.currency || "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const balance = wallet?.data?.balance || 0;

  return (
    <>
      <div className="WalletHeader w-full mb-8">
        {/* Gradient Header Section */}
        <div className="relative bg-gradient-to-r from-[#F47621] to-[#ff8c42] rounded-2xl p-6 shadow-lg overflow-hidden">
          {/* Decorative Background Pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                  <FaWallet size={32} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {t("Wallet.title")}
                  </h2>
                  {isLoading ? (
                    <p className="text-white/90 text-sm mt-1">
                      {t("common.loading")}
                    </p>
                  ) : (
                    <p className="text-white/90 text-sm mt-1">
                      {t("Wallet.currentBalance")}
                    </p>
                  )}
                </div>
              </div>

              {/* Balance Display */}
              {!isLoading && (
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/30">
                  <p className="text-white/90 text-sm mb-1">
                    {t("Wallet.balance")}
                  </p>
                  <p className="text-3xl font-bold text-white">
                    {formatCurrency(balance)}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {!isLoading && (
              <div className="flex items-center gap-3 mt-6 flex-wrap">
                <button
                  onClick={() => setIsPurchaseModalOpen(true)}
                  className="px-6 py-3 bg-white text-[#F47621] rounded-lg font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  {t("Wallet.purchaseOffer")}
                </button>
                <button
                  onClick={() => setIsDepositModalOpen(true)}
                  className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-lg font-semibold hover:bg-white/30 transition-all duration-300 hover:scale-105"
                >
                  {t("Wallet.depositFunds")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <PurchaseOfferModal
        isOpen={isPurchaseModalOpen}
        setIsOpen={setIsPurchaseModalOpen}
        currentBalance={balance}
      />
      <DepositFundsModal
        isOpen={isDepositModalOpen}
        setIsOpen={setIsDepositModalOpen}
      />
    </>
  );
};

export default WalletHeader;
