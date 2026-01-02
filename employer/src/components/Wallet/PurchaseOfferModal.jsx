import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils/axios";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import useData from "../../hooks/useData";
import { RiGiftLine } from "react-icons/ri";

const PurchaseOfferModal = ({ isOpen, setIsOpen, currentBalance }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [selectedOfferId, setSelectedOfferId] = useState(null);

  const { data: availableOffers } = useData("/offers/available");
  const offers = availableOffers?.data || [];

  const purchaseMutation = useMutation({
    mutationFn: (offerId) =>
      customFetch
        .post("/employer/wallet/purchase", { offer_id: offerId })
        .then((res) => res.data),

    onSuccess: (data) => {
      toast.success(data.message || t("Wallet.purchaseSuccess"));
      queryClient.invalidateQueries({ queryKey: ["/employer/wallet"] });
      queryClient.invalidateQueries({ queryKey: ["/employer/wallet/transactions"] });
      queryClient.invalidateQueries({ queryKey: ["/offers"] });
      queryClient.invalidateQueries({ queryKey: ["/offers/active"] });
      setIsOpen(false);
      setSelectedOfferId(null);
    },

    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.errors?.offer_id?.[0] ||
        t("Wallet.purchaseError");
      toast.error(errorMessage);
    },
  });

  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return "0.00";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const handlePurchase = () => {
    if (!selectedOfferId) {
      toast.error(t("Wallet.selectOfferFirst"));
      return;
    }

    const selectedOffer = offers.find((o) => o.id === selectedOfferId);
    if (selectedOffer && selectedOffer.discount_value > currentBalance) {
      toast.error(t("Wallet.insufficientBalance"));
      return;
    }

    purchaseMutation.mutate(selectedOfferId);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#F47621] to-[#ff8c42] p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <RiGiftLine size={24} className="text-white" />
            <h2 className="text-2xl font-bold text-white">
              {t("Wallet.purchaseOffer")}
            </h2>
          </div>
          <button
            onClick={() => {
              setIsOpen(false);
              setSelectedOfferId(null);
            }}
            className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Current Balance */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">{t("Wallet.currentBalance")}</p>
            <p className="text-2xl font-bold text-[#F47621]">
              {formatCurrency(currentBalance)}
            </p>
          </div>

          {/* Available Offers */}
          {offers.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">{t("Wallet.noAvailableOffers")}</p>
            </div>
          ) : (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {t("Wallet.selectOffer")}
              </h3>
              {offers.map((offer) => {
                const canAfford = offer.discount_value <= currentBalance;
                return (
                  <div
                    key={offer.id}
                    onClick={() => canAfford && setSelectedOfferId(offer.id)}
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                      selectedOfferId === offer.id
                        ? "border-[#F47621] bg-[#F47621]/5"
                        : canAfford
                        ? "border-gray-200 hover:border-[#F47621]/50 hover:bg-gray-50"
                        : "border-gray-200 opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{offer.title}</h4>
                        {offer.description && (
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {offer.description}
                          </p>
                        )}
                        {offer.occupation && (
                          <p className="text-xs text-gray-500 mt-1">
                            {offer.occupation.name}
                          </p>
                        )}
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-lg font-bold text-[#F47621]">
                          {formatCurrency(offer.discount_value)}
                        </p>
                        {!canAfford && (
                          <p className="text-xs text-red-600 mt-1">
                            {t("Wallet.insufficientBalance")}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 flex items-center justify-end gap-3">
          <button
            onClick={() => {
              setIsOpen(false);
              setSelectedOfferId(null);
            }}
            className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            {t("common.cancel")}
          </button>
          <button
            onClick={handlePurchase}
            disabled={!selectedOfferId || purchaseMutation.isPending}
            className="px-6 py-2 bg-gradient-to-r from-[#F47621] to-[#ff8c42] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {purchaseMutation.isPending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>{t("common.saving")}</span>
              </>
            ) : (
              t("Wallet.purchase")
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOfferModal;
