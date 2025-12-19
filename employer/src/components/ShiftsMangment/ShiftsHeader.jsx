import { LuClock, LuPlus } from "react-icons/lu";
import { useTranslation } from "react-i18next";

const ShiftsHeader = ({ setIsFormOpen }) => {
  const { t } = useTranslation();
  return (
    <div className="ShiftsHeader w-full mb-8">
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
              <LuClock size={32} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {t("Shifts.title")}
              </h2>
              <p className="text-white/90 text-sm mt-1">
                {t("Shifts.subtitle")}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 bg-white hover:bg-gray-50 text-[#F47621] px-6 py-3 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <LuPlus size={24} />
            {t("Shifts.add")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShiftsHeader;
