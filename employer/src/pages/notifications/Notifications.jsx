import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useData from "../../hooks/useData";
import { Link, useNavigate } from "react-router-dom";
import {
  LuBell,
  LuBellOff,
  LuChevronLeft,
  LuFilter,
} from "react-icons/lu";
import {
  IoNotificationsOutline,
  IoCheckmarkDone,
  IoCheckmarkDoneCircle,
} from "react-icons/io5";
import {
  AiOutlineInfoCircle,
  AiOutlineCheckCircle,
  AiOutlineExclamationCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { RiErrorWarningLine } from "react-icons/ri";
import { TbRadioactive } from "react-icons/tb";
import customFetch from "../../utils/axios";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Notifications = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useData("/notifications");
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter] = useState("all"); // all, unread, read

  const markAsReadMutation = useMutation({
    mutationFn: (id) =>
      customFetch
        .post(`/notifications/update/${id}`, { read: true })
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries(["/notifications"]);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          t("notifications.markAsReadError")
      );
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: () =>
      customFetch.post("/notifications/mark-all-read").then((res) => res.data),
    onSuccess: (data) => {
      toast.success(data.message || t("notifications.allMarkedAsReadSuccess"));
      queryClient.invalidateQueries(["/notifications"]);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          t("notifications.markAllAsReadError")
      );
    },
  });

  const getIcon = (iconName) => {
    const iconMap = {
      "info-circle": AiOutlineInfoCircle,
      "check-circle": AiOutlineCheckCircle,
      "exclamation-triangle": RiErrorWarningLine,
      "times-circle": AiOutlineCloseCircle,
      "exclamation-circle": AiOutlineExclamationCircle,
      radiation: TbRadioactive,
    };
    const IconComponent = iconMap[iconName] || AiOutlineInfoCircle;
    return <IconComponent size={24} />;
  };

  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        border: "border-blue-500",
        bg: "bg-blue-50",
        iconBg: "bg-blue-100",
        text: "text-blue-700",
        badge: "bg-blue-100 text-blue-700",
      },
      red: {
        border: "border-red-500",
        bg: "bg-red-50",
        iconBg: "bg-red-100",
        text: "text-red-700",
        badge: "bg-red-100 text-red-700",
      },
      green: {
        border: "border-green-500",
        bg: "bg-green-50",
        iconBg: "bg-green-100",
        text: "text-green-700",
        badge: "bg-green-100 text-green-700",
      },
      yellow: {
        border: "border-yellow-500",
        bg: "bg-yellow-50",
        iconBg: "bg-yellow-100",
        text: "text-yellow-700",
        badge: "bg-yellow-100 text-yellow-700",
      },
      orange: {
        border: "border-orange-500",
        bg: "bg-orange-50",
        iconBg: "bg-orange-100",
        text: "text-orange-700",
        badge: "bg-orange-100 text-orange-700",
      },
    };
    return (
      colorMap[color] || {
        border: "border-blue-500",
        bg: "bg-blue-50",
        iconBg: "bg-blue-100",
        text: "text-blue-700",
        badge: "bg-blue-100 text-blue-700",
      }
    );
  };

  const handleMarkAsRead = (id, e) => {
    e.stopPropagation();
    markAsReadMutation.mutate(id);
  };

  const filteredNotifications =
    data?.data?.filter((notification) => {
      if (filter === "unread") return !notification.read_at;
      if (filter === "read") return notification.read_at;
      return true;
    }) || [];

  const unreadCount = data?.data?.filter((n) => !n.read_at).length || 0;
  const readCount = data?.data?.filter((n) => n.read_at).length || 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F47621] mx-auto"></div>
          <p className="mt-4 text-gray-600">{t("notifications.loading")}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-100 rounded-full p-6 mb-4 inline-block">
            <RiErrorWarningLine size={48} className="text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {t("notifications.errorTitle")}
          </h3>
          <p className="text-gray-600">{t("notifications.errorLoading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section - Matching Shifts Management Style */}
        <div className="mb-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors duration-300 group"
          >
            <LuChevronLeft
              size={24}
              className="group-hover:-translate-x-1 transition-transform duration-300"
            />
            <span className="font-medium">{t("notifications.back")}</span>
          </button>

          {/* Gradient Header Section */}
          <div className="relative bg-gradient-to-r from-[#F47621] to-[#ff8c42] rounded-2xl p-4 md:p-6 shadow-lg overflow-hidden">
            {/* Decorative Background Pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2 md:p-3">
                  <IoNotificationsOutline size={24} className="md:w-8 md:h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-white">
                    {t("notifications.title")}
                  </h1>
                  <p className="text-white/90 text-xs md:text-sm mt-1">
                    {data?.data
                      ? t("notifications.notificationsCount", {
                          count: data?.data.length,
                        })
                      : t("notifications.noNotifications")}
                  </p>
                </div>
              </div>

              {/* Mark All as Read Button */}
              {unreadCount > 0 && (
                <button
                  onClick={() => markAllAsReadMutation.mutate()}
                  disabled={markAllAsReadMutation.isLoading}
                  className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#F47621] px-4 py-2.5 md:px-6 md:py-3 rounded-xl font-bold text-sm md:text-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 w-full md:w-auto"
                >
                  <IoCheckmarkDone size={18} className="md:w-5 md:h-5" />
                  <span className="whitespace-nowrap">
                    {markAllAsReadMutation.isLoading
                      ? t("notifications.marking")
                      : t("notifications.markAllAsRead")}
                  </span>
                </button>
              )}
            </div>

            {/* Filter Buttons */}
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex items-center gap-2">
                <LuFilter size={18} className="md:w-5 md:h-5 text-white/80" />
                <span className="text-white/80 text-sm hidden sm:inline">Filter:</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 bg-white/20 backdrop-blur-sm rounded-lg p-1 w-full sm:w-auto overflow-x-auto">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-3 py-1.5 md:px-4 md:py-2 rounded-md font-semibold text-xs md:text-sm transition-all duration-300 whitespace-nowrap ${
                    filter === "all"
                      ? "bg-white text-[#F47621] shadow-md"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {t("notifications.all")} ({data?.data?.length || 0})
                </button>
                <button
                  onClick={() => setFilter("unread")}
                  className={`px-3 py-1.5 md:px-4 md:py-2 rounded-md font-semibold text-xs md:text-sm transition-all duration-300 relative whitespace-nowrap ${
                    filter === "unread"
                      ? "bg-white text-[#F47621] shadow-md"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {t("notifications.unread")} ({unreadCount})
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  )}
                </button>
                <button
                  onClick={() => setFilter("read")}
                  className={`px-3 py-1.5 md:px-4 md:py-2 rounded-md font-semibold text-xs md:text-sm transition-all duration-300 whitespace-nowrap ${
                    filter === "read"
                      ? "bg-white text-[#F47621] shadow-md"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {t("notifications.read")} ({readCount})
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div>
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative max-w-md w-full">
              {/* Animated Background Circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-gradient-to-br from-[#F47621]/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
              </div>

              {/* Main Card */}
              <div className="relative bg-white rounded-2xl shadow-xl p-12 border border-gray-100">
                {/* Icon Container */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#F47621]/20 to-blue-500/20 rounded-full blur-xl"></div>
                    <div className="relative bg-gradient-to-br from-[#F47621] to-[#ff8c42] rounded-full p-6">
                      {filter === "unread" ? (
                        <LuBellOff size={64} className="text-white" />
                      ) : (
                        <LuBell size={64} className="text-white" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-center text-gray-800 mb-3">
                  {filter === "unread"
                    ? t("notifications.noUnreadNotifications")
                    : filter === "read"
                    ? t("notifications.noReadNotifications")
                    : t("notifications.noNotificationsTitle")}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                  {filter === "unread"
                    ? t("notifications.noUnreadNotifications")
                    : filter === "read"
                    ? t("notifications.noReadNotifications")
                    : t("notifications.noNotificationsFound")}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => {
              const isExpanded = expandedId === notification.id;
              const isUnread = !notification.read_at;
              const colors = getColorClasses(
                notification.type_details?.color || "blue"
              );
              const IconComponent = notification.type_details?.icon
                ? getIcon(notification.type_details.icon)
                : null;

              return (
                <div
                  key={notification.id}
                  className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 ${colors.border} ${
                    isUnread ? "ring-2 ring-blue-200" : ""
                  } overflow-hidden group`}
                >
                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      {IconComponent && (
                        <div
                          className={`${colors.iconBg} ${colors.text} rounded-xl p-3 flex-shrink-0 shadow-md`}
                        >
                          {IconComponent}
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3
                                className={`font-bold text-lg ${
                                  isUnread ? "text-gray-900" : "text-gray-700"
                                }`}
                              >
                                {notification.title}
                              </h3>
                              {isUnread && (
                                <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse shadow-lg"></span>
                              )}
                            </div>

                            <div className="flex items-center gap-3 flex-wrap text-sm text-gray-500 mb-3">
                              <span className="flex items-center gap-1">
                                <LuBell size={14} />
                                {notification.created_at}
                              </span>
                              <span
                                className={`${colors.badge} px-2.5 py-1 rounded-lg text-xs font-semibold`}
                              >
                                {notification.type}
                              </span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {isUnread && (
                              <button
                                onClick={(e) =>
                                  handleMarkAsRead(notification.id, e)
                                }
                                disabled={markAsReadMutation.isLoading}
                                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-all duration-300 hover:scale-110 shadow-md disabled:opacity-50"
                                title={t("notifications.markAsRead")}
                              >
                                <IoCheckmarkDoneCircle size={18} />
                              </button>
                            )}
                            <button
                              onClick={() =>
                                setExpandedId(
                                  isExpanded ? null : notification.id
                                )
                              }
                              className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-all duration-300 hover:scale-110"
                              title={
                                isExpanded
                                  ? t("notifications.collapse")
                                  : t("notifications.expand")
                              }
                            >
                              <LuChevronLeft
                                size={18}
                                className={`transition-transform duration-300 ${
                                  isExpanded ? "rotate-90" : "-rotate-90"
                                }`}
                              />
                            </button>
                          </div>
                        </div>

                        {/* Expanded Message */}
                        {isExpanded && (
                          <div className="mt-4 pt-4 border-t border-gray-200 animate-slide-down">
                            <p className="text-gray-700 leading-relaxed mb-3">
                              {notification.message}
                            </p>
                            {notification.type_details?.description && (
                              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                <p className="text-sm text-gray-600">
                                  {notification.type_details.description}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
