import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useData from "../../hooks/useData";
import customFetch from "../../utils/axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Spinner from "../../components/MoreElements/Spinner";
import {
  LuBell,
  LuBellOff,
  LuChevronDown,
  LuChevronUp,
} from "react-icons/lu";
import {
  AiOutlineInfoCircle,
  AiOutlineCheckCircle,
  AiOutlineExclamationCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { RiErrorWarningLine } from "react-icons/ri";
import { TbRadioactive } from "react-icons/tb";
import {
  IoNotificationsOutline,
  IoCheckmarkDone,
  IoCheckmarkDoneCircle,
} from "react-icons/io5";

const Notifications = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("all"); // all, unread, read
  const [expandedId, setExpandedId] = useState(null);

  const { data, error, isLoading } = useData("/notifications");

  // Filter notifications based on selected filter
  const filteredNotifications = data?.filter((notification) => {
    if (filter === "unread") {
      return !notification.read_at;
    }
    if (filter === "read") {
      return notification.read_at;
    }
    return true;
  });

  // Mark notification as read
  const markAsRead = useMutation({
    mutationFn: (id) =>
      customFetch.post(`/notifications/update/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/notifications"] });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || t("notifications.markAsReadError")
      );
    },
  });

  // Mark all notifications as read
  const markAllAsRead = useMutation({
    mutationFn: () =>
      customFetch
        .post("/notifications/mark-all-read")
        .then((res) => res.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/notifications"] });
      toast.success(
        data.message || t("notifications.allMarkedAsReadSuccess")
      );
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || t("notifications.markAllAsReadError")
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
        bg: "bg-blue-50",
        border: "border-blue-500",
        iconBg: "bg-blue-100",
        iconText: "text-blue-600",
        badge: "bg-blue-100 text-blue-700",
      },
      red: {
        bg: "bg-red-50",
        border: "border-red-500",
        iconBg: "bg-red-100",
        iconText: "text-red-600",
        badge: "bg-red-100 text-red-700",
      },
      green: {
        bg: "bg-green-50",
        border: "border-green-500",
        iconBg: "bg-green-100",
        iconText: "text-green-600",
        badge: "bg-green-100 text-green-700",
      },
      yellow: {
        bg: "bg-yellow-50",
        border: "border-yellow-500",
        iconBg: "bg-yellow-100",
        iconText: "text-yellow-600",
        badge: "bg-yellow-100 text-yellow-700",
      },
      orange: {
        bg: "bg-orange-50",
        border: "border-orange-500",
        iconBg: "bg-orange-100",
        iconText: "text-orange-600",
        badge: "bg-orange-100 text-orange-700",
      },
    };
    return (
      colorMap[color] || {
        bg: "bg-blue-50",
        border: "border-blue-500",
        iconBg: "bg-blue-100",
        iconText: "text-blue-600",
        badge: "bg-blue-100 text-blue-700",
      }
    );
  };

  const unreadCount = data?.filter((n) => !n.read_at).length || 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 rounded-full p-4">
              <RiErrorWarningLine size={48} className="text-red-600" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {t("notifications.errorTitle")}
          </h3>
          <p className="text-gray-600">
            {error?.response?.data?.message || t("notifications.errorLoading")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="relative bg-gradient-to-r from-[#F47621] to-[#ff8c42] rounded-2xl shadow-xl p-8 overflow-hidden">
          {/* Decorative Background Pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-2">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <IoNotificationsOutline size={32} className="text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                {t("notifications.title")}
              </h1>
            </div>
            <p className="text-white/90 text-lg mt-2">
              {t("notifications.subtitle", {
                total: data?.length || 0,
                unread: unreadCount,
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Filter Buttons */}
        <div className="flex items-center gap-2 bg-white rounded-xl shadow-md p-1">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
              filter === "all"
                ? "bg-gradient-to-r from-[#F47621] to-[#ff8c42] text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {t("notifications.all")} ({data?.length || 0})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 relative ${
              filter === "unread"
                ? "bg-gradient-to-r from-[#F47621] to-[#ff8c42] text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {t("notifications.unread")} ({unreadCount})
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            )}
          </button>
          <button
            onClick={() => setFilter("read")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
              filter === "read"
                ? "bg-gradient-to-r from-[#F47621] to-[#ff8c42] text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {t("notifications.read")} (
            {(data?.length || 0) - unreadCount})
          </button>
        </div>

        {/* Mark All as Read Button */}
        {unreadCount > 0 && (
          <button
            onClick={() => markAllAsRead.mutate()}
            disabled={markAllAsRead.isPending}
            className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl shadow-md font-semibold transition-all duration-300 hover:shadow-lg disabled:opacity-50"
          >
            {markAllAsRead.isPending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                {t("notifications.marking")}
              </>
            ) : (
              <>
                <IoCheckmarkDone size={20} />
                {t("notifications.markAllAsRead")}
              </>
            )}
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="max-w-4xl mx-auto">
        {!filteredNotifications || filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200/50 to-gray-300/50 rounded-full blur-2xl"></div>
                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-full p-8">
                  <LuBellOff size={64} className="text-gray-400" />
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {t("notifications.noNotificationsTitle")}
            </h3>
            <p className="text-gray-600">
              {filter === "unread"
                ? t("notifications.noUnreadNotifications")
                : filter === "read"
                ? t("notifications.noReadNotifications")
                : t("notifications.noNotificationsFound")}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => {
              const isExpanded = expandedId === notification.id;
              const isUnread = !notification.read_at;
              const colors = getColorClasses(notification.type_details?.color);

              return (
                <div
                  key={notification.id}
                  className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 ${colors.border} ${colors.bg}`}
                >
                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className={`${colors.iconBg} ${colors.iconText} rounded-xl p-3 flex-shrink-0`}
                      >
                        {getIcon(notification.type_details?.icon)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3
                                className={`font-bold text-lg ${
                                  isUnread
                                    ? "text-gray-900"
                                    : "text-gray-700"
                                }`}
                              >
                                {notification.title}
                              </h3>
                              {isUnread && (
                                <span className="w-2.5 h-2.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                              )}
                            </div>

                            <div className="flex items-center gap-3 mb-3 flex-wrap">
                              <span className="text-sm text-gray-500 flex items-center gap-1">
                                <LuBell size={14} />
                                {notification.created_at}
                              </span>
                              <span
                                className={`${colors.badge} px-3 py-1 rounded-lg text-xs font-semibold`}
                              >
                                {notification.type}
                              </span>
                            </div>

                            {/* Expanded Message */}
                            {isExpanded && (
                              <div className="mt-4 pt-4 border-t border-gray-200">
                                <p className="text-gray-700 leading-relaxed">
                                  {notification.message}
                                </p>
                                {notification.type_details?.description && (
                                  <div className="mt-3 pt-3 border-t border-gray-200">
                                    <p className="text-sm text-gray-600">
                                      {notification.type_details.description}
                                    </p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {isUnread && (
                              <button
                                onClick={() => markAsRead.mutate(notification.id)}
                                disabled={markAsRead.isPending}
                                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-all duration-300 hover:scale-110 disabled:opacity-50"
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
                              {isExpanded ? (
                                <LuChevronUp size={18} />
                              ) : (
                                <LuChevronDown size={18} />
                              )}
                            </button>
                          </div>
                        </div>
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
  );
};

export default Notifications;
