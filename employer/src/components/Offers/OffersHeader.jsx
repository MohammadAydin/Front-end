import { RiGiftLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import useData from "../../hooks/useData";

const OffersHeader = () => {
  const { t } = useTranslation();
  const { data: offers } = useData("/offers");
  const offerCount = offers?.data?.length || 0;

  return (
    <div className="OffersHeader w-full mb-8">
      {/* Gradient Header Section */}
      <div className="relative bg-gradient-to-r from-[#F47621] to-[#ff8c42] rounded-2xl p-6 shadow-lg overflow-hidden">
        {/* Decorative Background Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
              <RiGiftLine size={32} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {t("Offers.title")}
              </h2>
              <p className="text-white/90 text-sm mt-1">
                {offerCount > 0
                  ? `${offerCount} ${offerCount === 1 ? t("Offers.offer") : t("Offers.offers")} ${t("Offers.available")}`
                  : t("Offers.noOffersAvailable")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersHeader;

