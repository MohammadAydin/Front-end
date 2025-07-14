import { HiOutlineDownload } from "react-icons/hi";
import useData from "../hooks/useData";
import ProfilePhoto from "../components/UserProfile/ProfilePhoto/ProfilePhoto";
import "./Responsive css/UserProfile.css";
import { useTranslation } from "react-i18next";
import Spinner from "../components/MoreElements/Spinner";

const UserProfile = () => {
  const { data, isLoading } = useData("/profile");
  const { t } = useTranslation();

  if (isLoading) return <Spinner />;

  // Function to get localized field name
  const getFieldLabel = (key) => {
    const translationKey = `userProfile.fields.${key}`;
    const translated = t(translationKey);
    // If translation doesn't exist, fallback to capitalized key
    return translated === translationKey ? key.charAt(0).toUpperCase() + key.slice(1) : translated;
  };

  return (
    <div className="UserProfile p-[28px] py-[58px]">
      <div className="w-full p-10 shadow-xl rounded-2xl mb-10">
        <p className="text-xl font-bold mb-5">{t("userProfile.profilePhoto")}</p>
        <ProfilePhoto />
      </div>
      <div className="w-full p-10 shadow-xl rounded-2xl ">
        <div className="UserProfileInfo w-[730px] grid grid-cols-2 gap-2">
          {data &&
            Object.entries(data).map(([key, value]) => {
              if (key === "avatar") return null;
              return (
                <div
                  key={key}
                  className={`relative  h-[55px] border-2 border-[#919eab54] rounded-xl flex items-center px-3 mb-4  ${key === "bio" ? "col-span-2" : ""
                    }`}
                >
                  <p className="absolute top-[-10px] left-5 text-[#6373817c] bg-white px-2">
                    {getFieldLabel(key)}
                  </p>
                  <p>{value || t("userProfile.notProvided")}</p>
                </div>
              );
            })}
          <button className="contractDownloadBtn w-[360px] bg-[#F47621] text-white px-5 py-2 font-bold text-lg rounded-lg mt-4 hover:bg-[#EE6000] flex gap-2 items-center justify-center">
            {t("userProfile.downloadContract")}
            <span>
              <HiOutlineDownload size={24} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
