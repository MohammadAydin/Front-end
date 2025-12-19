import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import customFetch from "../utils/axios";
import { IoLanguage, IoSettingsOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import ChangePassword from "../components/ChangePassword";
import Germany from "../assets/image/icon-sidebar/germany.svg";
import turkey from "../assets/image/icon-sidebar/turkey.png";
import unitedstates from "../assets/image/icon-sidebar/united-states.png";

const Settings = () => {
    const { t, i18n } = useTranslation();
    const [activeTab, setActiveTab] = useState("language");
    const languageRef = useRef(null);

    const languageList = [
        { id: 1, key: "en", name: "English", code: "US", img: unitedstates },
        { id: 2, key: "de", name: "Germany", code: "DE", img: Germany },
        { id: 3, key: "tr", name: "Turkish", code: "TR", img: turkey },
    ];

    const changeLanguage = useMutation({
        mutationFn: (key) =>
            customFetch
                .post(`/language/set`, {
                    language: key,
                })
                .then((res) => res.data),

        onSuccess: (data, key) => {
            i18n.changeLanguage(key);
            toast.success(data.message || t("settings.languageChanged"));
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || t("settings.languageChangeError"));
        },
    });

    const tabs = [
        {
            id: "language",
            name: t("SideBar.settings.Language"),
            icon: <IoLanguage size={24} />,
            color: "from-blue-500 to-cyan-500",
        },
        {
            id: "password",
            name: t("SideBar.Settings.changePassword"),
            icon: <RiLockPasswordLine size={24} />,
            color: "from-green-500 to-emerald-500",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-4 md:p-6 lg:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-[#F47621] to-[#ff8c42] rounded-2xl p-6 shadow-lg overflow-hidden mb-8">
                    {/* Decorative Background Pattern */}
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                    ></div>

                    <div className="relative z-10 flex items-center gap-4">
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                            <IoSettingsOutline size={32} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">
                                {t("SideBar.settings.Settings")}
                            </h2>
                            <p className="text-white/90 text-sm mt-1">
                                {t("settings.subtitle")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-xl shadow-md border border-gray-200 mb-6">
                    <div className="flex border-b border-gray-200">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 font-semibold transition-all duration-300 relative ${activeTab === tab.id
                                    ? "text-[#F47621] border-b-2 border-[#F47621]"
                                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                                    }`}
                            >
                                <div
                                    className={`p-2 rounded-lg ${activeTab === tab.id
                                        ? `bg-gradient-to-br ${tab.color} text-white`
                                        : "bg-gray-100 text-gray-600"
                                        } transition-all duration-300`}
                                >
                                    {tab.icon}
                                </div>
                                <span className="hidden sm:inline">{tab.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {activeTab === "language" && (
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                                        {t("settings.selectLanguage")}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-6">
                                        {t("settings.languageDescription")}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4" ref={languageRef}>
                                    {languageList.map((lang) => (
                                        <button
                                            key={lang.id}
                                            onClick={() => changeLanguage.mutate(lang.key)}
                                            disabled={changeLanguage.isPending}
                                            className={`p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:scale-105 ${i18n.language === lang.key
                                                ? "border-[#F47621] bg-gradient-to-br from-[#F47621]/10 to-[#ff8c42]/10 shadow-md"
                                                : "border-gray-200 hover:border-gray-300 bg-white"
                                                } ${changeLanguage.isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                                        >
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="relative">
                                                    <img
                                                        className="w-16 h-16 object-cover rounded-lg shadow-md"
                                                        src={lang.img}
                                                        alt={lang.name}
                                                    />
                                                    {i18n.language === lang.key && (
                                                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                                                            <svg
                                                                className="w-3 h-3 text-white"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={3}
                                                                    d="M5 13l4 4L19 7"
                                                                />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="text-center">
                                                    <p className="font-bold text-gray-800">{lang.name}</p>
                                                    <p className="text-sm text-gray-500">{lang.code}</p>
                                                </div>
                                                {changeLanguage.isPending && i18n.language === lang.key && (
                                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#F47621]"></div>
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "password" && (
                            <div>
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                                        {t("settings.changePassword")}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        {t("settings.passwordDescription")}
                                    </p>
                                </div>
                                <ChangePassword />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;

