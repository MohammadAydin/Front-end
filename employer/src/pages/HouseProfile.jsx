import { useState } from "react";
import Wrapper from "../assets/wrapper/OlderHouse/OlderProfile";
import Popup from "../components/Popup";
import PopupAbout from "../components/PopupAbout";
import useData from "../hooks/useData";
import ProfilePhoto from "../components/UserProfile/ProfilePhoto/ProfilePhoto";
import LocationInfo from "./LocationInfo/LocationInfo";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import StatusAccount from "../utils/statusAccountReturn";
import { IoHomeOutline, IoMailOutline, IoLocationOutline, IoPersonOutline, IoCallOutline, IoBusinessOutline } from "react-icons/io5";

const HouseProfile = () => {
  const { t } = useTranslation();
  const {
    data: statusData,
    error,
    isLoadingstatus,
  } = useData("/status/profile");
  const {
    data: Location,
    erroLocationr,
    isLoadingLocation,
  } = useData("/locations");
  const { data: profile, isLoading: isLoadingProfile } = useData("/profile");
  const primaryAddress = Location?.data?.find((item) => item.is_primary === 1);

  // Check if any data is still loading
  const isLoading = isLoadingstatus || isLoadingLocation || isLoadingProfile;

  useEffect(() => {
    if (statusData?.data?.status) {
      localStorage.setItem("statusAccount", statusData?.data?.status);
    }
  }, [statusData?.data?.status]);

  useEffect(() => {
    const hasReloaded = localStorage.getItem("hasReloaded");

    if (!hasReloaded) {
      localStorage.setItem("hasReloaded", "true");
      window.location.reload();
    }
  }, []);

  // Open and closed state storage
  const [isOpen, setIsOpen] = useState(false);
  // Store the opening and closing status of the PopUp About
  const [isOpenAbout, setIsOpenAbout] = useState(false);
  // Storing the value of about
  const [about, setAbout] = useState("About Elderly house");
  // Define a fictitious data matrix
  const [address, setAddress] = useState([
    {
      id: 1,
      Address: "Address 1",
      Street: "Alexanderplatz",
      Code: 1223,
      City: "Berlin",
      Country: "Germany",
    },
  ]);
  if (localStorage.getItem("statusAccount") !== "approved") {
    return <StatusAccount status={localStorage.getItem("statusAccount")} />;
  }

  // Show loading spinner while data is being fetched
  if (isLoading) {
    return (
      <Wrapper className="w-full px-4 md:px-6 py-6">
        <div className="flex flex-col items-center justify-center min-h-[60vh] animate-slide-up">
          <div className="w-16 h-16 border-4 border-[#F47621] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">{t("common.loading") || "Loading..."}</p>
        </div>
      </Wrapper>
    );
  }

  // Profile information cards data
  const profileCards = [
    {
      icon: IoHomeOutline,
      label: t("HouseProfile.label.ElderlyhouseName"),
      value: "Elderly house",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: IoMailOutline,
      label: t("HouseProfile.label.Email"),
      value: profile?.data?.email || "N/A",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: IoLocationOutline,
      label: t("HouseProfile.label.Address"),
      value: primaryAddress?.street1 || "N/A",
      color: "from-green-500 to-green-600",
    },
    {
      icon: IoPersonOutline,
      label: t("HouseProfile.label.Mangername"),
      value: profile?.data?.name || "N/A",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: IoCallOutline,
      label: t("HouseProfile.label.PhoneNumber"),
      value: profile?.data?.phone || "N/A",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: IoBusinessOutline,
      label: t("HouseProfile.label.City"),
      value: primaryAddress?.city || "N/A",
      color: "from-indigo-500 to-indigo-600",
    },
  ];

  return (
    <Wrapper className="w-full px-4 md:px-6 py-6">
      {/* Gradient Header Section */}
      <div className="relative bg-gradient-to-r from-[#F47621] to-[#ff8c42] rounded-2xl p-6 md:p-8 mb-8 shadow-lg overflow-hidden animate-slide-up">
        {/* Decorative Background Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-lg">
              <IoHomeOutline size={32} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {t("HouseProfile.title")}
              </h2>
              <p className="text-white/90 text-sm md:text-base mt-1">
                {t("HouseProfile.subtitle") || "Manage your healthcare facility profile"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="space-y-8">
        {/* Profile Photo Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 animate-slide-up">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            {t("HouseProfile.profilePhoto") || "Profile Photo"}
          </h3>
          <div className="flex justify-center">
            <ProfilePhoto />
          </div>
        </div>

        {/* Profile Information Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profileCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-[#F47621]/30 group animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  {/* Icon Container */}
                  <div className={`bg-gradient-to-br ${card.color} rounded-xl p-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent size={24} className="text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      {card.label}
                    </p>
                    <p className="text-lg font-bold text-gray-800 truncate">
                      {card.value}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Location Information Section */}
        <div className="animate-slide-up">
          <LocationInfo />
        </div>
      </div>

      {/* Pop Up Add Address */}
      {isOpen && (
        <Popup
          setAddress={setAddress}
          address={address}
          onClose={() => setIsOpen(false)}
        />
      )}
      {/* Pop Up About */}
      {isOpenAbout && (
        <PopupAbout
          onClose={() => setIsOpenAbout(false)}
          setAbout={setAbout}
        />
      )}
    </Wrapper>
  );
};

export default HouseProfile;
