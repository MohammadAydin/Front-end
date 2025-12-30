import React from "react";
import { useTranslation } from "react-i18next";
import { RiGiftLine } from "react-icons/ri";
import { MdAccessTime, MdCheckCircle, MdCancel } from "react-icons/md";
import { FaTag } from "react-icons/fa";

const OfferCard = ({ offer }) => {
  const { t } = useTranslation();

  const formatDate = (dateString) => {
    if (!dateString) return t("common.notAvailable");
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (value) => {
    if (!value) return t("common.notAvailable");
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  const getStatusBadge = () => {
    if (offer.is_expired) {
      return {
        label: t("Offers.status.expired"),
        icon: <MdCancel className="text-red-500" />,
        bgColor: "bg-red-100 text-red-700",
      };
    }
    if (offer.status === "active") {
      return {
        label: t("Offers.status.active"),
        icon: <MdCheckCircle className="text-green-500" />,
        bgColor: "bg-green-100 text-green-700",
      };
    }
    return null;
  };

  const statusBadge = getStatusBadge();

  const getTypeLabel = (type) => {
    const typeMap = {
      fixed_price: t("Offers.types.fixedPrice"),
      package: t("Offers.types.package"),
      custom_rule: t("Offers.types.customRule"),
    };
    return typeMap[type] || type;
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
      {/* Card Header with Gradient */}
      <div className="bg-gradient-to-r from-[#F47621] to-[#ff8c42] p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-white"></div>
        </div>
        <div className="relative z-10 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
              <RiGiftLine size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white line-clamp-2">
                {offer.title}
              </h3>
              {offer.occupation && (
                <p className="text-white/90 text-sm mt-1">
                  {offer.occupation.name}
                </p>
              )}
            </div>
          </div>
          {statusBadge && (
            <div
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${statusBadge.bgColor} backdrop-blur-sm`}
            >
              {statusBadge.icon}
              <span>{statusBadge.label}</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        {/* Description */}
        {offer.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {offer.description}
          </p>
        )}

        {/* Offer Details */}
        <div className="space-y-3">
          {/* Type */}
          <div className="flex items-center gap-2 text-sm">
            <FaTag className="text-[#F47621]" />
            <span className="text-gray-500">{t("Offers.type")}:</span>
            <span className="font-semibold text-gray-800">
              {getTypeLabel(offer.type)}
            </span>
          </div>

          {/* Discount Value */}
          {offer.discount_value && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">{t("Offers.discountValue")}:</span>
              <span className="font-bold text-[#F47621] text-lg">
                {formatCurrency(offer.discount_value)}
              </span>
            </div>
          )}

          {/* Package Hours Info */}
          {offer.total_hours && (
            <div className="flex items-center gap-2 text-sm">
              <MdAccessTime className="text-blue-500" />
              <span className="text-gray-500">{t("Offers.totalHours")}:</span>
              <span className="font-semibold text-gray-800">
                {offer.total_hours} {t("Offers.hours")}
              </span>
            </div>
          )}

          {/* Consumed Hours */}
          {offer.consumed_hours !== undefined && offer.consumed_hours !== null && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">{t("Offers.consumedHours")}:</span>
              <span className="font-semibold text-gray-800">
                {offer.consumed_hours} {t("Offers.hours")}
              </span>
            </div>
          )}

          {/* Remaining Hours */}
          {offer.remaining_hours !== undefined &&
            offer.remaining_hours !== null && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">
                  {t("Offers.remainingHours")}:
                </span>
                <span className="font-semibold text-green-600">
                  {offer.remaining_hours} {t("Offers.hours")}
                </span>
              </div>
            )}

          {/* Usage Count */}
          {offer.usage_count !== undefined && offer.usage_count !== null && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">{t("Offers.usageCount")}:</span>
              <span className="font-semibold text-gray-800">
                {offer.usage_count}
              </span>
            </div>
          )}

          {/* Date Range */}
          {(offer.starts_at || offer.ends_at) && (
            <div className="pt-3 border-t border-gray-200">
              <div className="flex flex-col gap-2 text-xs text-gray-500">
                {offer.starts_at && (
                  <div>
                    <span className="font-semibold">{t("Offers.startsAt")}:</span>{" "}
                    {formatDate(offer.starts_at)}
                  </div>
                )}
                {offer.ends_at && (
                  <div>
                    <span className="font-semibold">{t("Offers.endsAt")}:</span>{" "}
                    {formatDate(offer.ends_at)}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Last Used */}
          {offer.last_used_at && (
            <div className="pt-2 text-xs text-gray-500">
              <span className="font-semibold">{t("Offers.lastUsed")}:</span>{" "}
              {formatDate(offer.last_used_at)}
            </div>
          )}
        </div>
      </div>

      {/* Gradient Accent Bar */}
      <div className="h-1 bg-gradient-to-r from-[#F47621] via-[#ff8c42] to-[#F47621]"></div>
    </div>
  );
};

export default OfferCard;

