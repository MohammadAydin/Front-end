import { useState, useCallback, useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { pusherService } from "../services/pusherService";
import { pusherConfig } from "../config/pusher";
import customFetch from "../utils/axios";

export const useNotificationsPusher = (userId = null) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  const pendingMarkAsRead = useRef(new Set());
  const markAsReadTimeout = useRef(null);

  const config = pusherConfig;
  const actualUserId = userId || config.utils.getUserIdFromToken();
  const channelName = actualUserId
    ? config.utils.getChannelName("notifications", actualUserId)
    : null;

  const fetchInitialNotifications = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await customFetch.get("notifications/unread");
      let data = [];

      if (response.data) {
        if (Array.isArray(response.data)) {
          data = response.data;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          data = response.data.data;
        } else if (
          response.data.notifications &&
          Array.isArray(response.data.notifications)
        ) {
          data = response.data.notifications;
        }
      }

      if (data.length > 0) {
        const processedNotifications = data.map((notification) => ({
          id: notification.id,
          title:
            notification.title || notification.data?.title || "Notification",
          message:
            notification.message ||
            notification.data?.message ||
            "Notification message",
          type: notification.type || notification.data?.type || "info",
          type_details: notification.type_details ||
            notification.data?.type_details || {
              icon: "info-circle",
              color: "blue",
            },
          created_at:
            notification.created_at ||
            notification.data?.created_at ||
            new Date().toISOString(),
          read_at: notification.read_at || notification.data?.read_at || null,
        }));

        setNotifications(processedNotifications);
        const unreadNotifications = processedNotifications.filter(
          (n) => !n.read_at
        );
        setUnreadCount(unreadNotifications.length);
      } else {
        setNotifications([]);
        setUnreadCount(0);
      }
    } catch (error) {
      setError(`Connection error: ${error.message}`);
      setNotifications([]);
      setUnreadCount(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleNewNotification = useCallback((data) => {
    const notificationData = data;

    if (!notificationData.id) {
      return;
    }

    const newNotification = {
      id: notificationData.id,
      title: notificationData.title || "New Notification",
      message: notificationData.message || "You have a new notification",
      type: notificationData.type || "info",
      type_details: notificationData.type_details || {
        icon: "info-circle",
        color: "blue",
      },
      created_at: notificationData.created_at || new Date().toISOString(),
      read_at: null,
    };

    setNotifications((prev) => {
      const exists = prev.some((n) => n.id === newNotification.id);
      if (exists) {
        return prev;
      }
      return [newNotification, ...prev];
    });

    // تحديث فوري للـ unreadCount
    setUnreadCount((prev) => prev + 1);

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(newNotification.title, {
        body: newNotification.message,
        icon: "/favicon.ico",
      });
    }
  }, []);

  useEffect(() => {
    if (!actualUserId || !channelName) {
      return;
    }

    fetchInitialNotifications();

    try {
      if (!config.utils.isAuthenticated()) {
        setError("No authentication token found. Please login again.");
        return;
      }

      pusherService.initialize();
      pusherService.onNewNotification(handleNewNotification, actualUserId);

      if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission();
      }
    } catch (error) {
      setError(`Setup error: ${error.message}`);
    }

    return () => {
      if (channelName) {
        pusherService.unbind(
          channelName,
          config.events.newNotification,
          handleNewNotification
        );
      }
      // تنظيف الـ timeouts
      if (markAsReadTimeout.current) {
        clearTimeout(markAsReadTimeout.current);
      }
    };
  }, [
    actualUserId,
    channelName,
    handleNewNotification,
    fetchInitialNotifications,
    config,
  ]);

  // تحسين markAsRead مع تحديث فوري للـ unreadCount
  const markAsRead = useCallback(
    async (notificationId) => {
      // تجنب الطلبات المتكررة
      if (pendingMarkAsRead.current.has(notificationId)) {
        return;
      }

      const originalNotification = notifications.find(
        (n) => n.id === notificationId
      );

      // تحديث فوري للـ UI والـ unreadCount
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId
            ? { ...notification, read_at: new Date().toISOString() }
            : notification
        )
      );

      // تحديث فوري للـ unreadCount
      setUnreadCount((prev) => Math.max(0, prev - 1));

      // إضافة للـ pending set
      pendingMarkAsRead.current.add(notificationId);

      // تأخير الـ API call قليلاً لتجميع الطلبات
      if (markAsReadTimeout.current) {
        clearTimeout(markAsReadTimeout.current);
      }

      markAsReadTimeout.current = setTimeout(async () => {
        try {
          // استخدام Promise.allSettled لمعالجة عدة طلبات
          const pendingIds = Array.from(pendingMarkAsRead.current);

          if (pendingIds.length === 1) {
            // طلب واحد
            await customFetch.post(`/notifications/update/${notificationId}`);
          } else {
            // طلبات متعددة - يمكن إرسالها كـ batch
            await Promise.allSettled(
              pendingIds.map((id) =>
                customFetch.post(`/notifications/update/${id}`)
              )
            );
          }

          // تنظيف الـ pending set
          pendingMarkAsRead.current.clear();
        } catch (error) {
          // إرجاع الحالة في حالة الفشل
          setNotifications((prev) =>
            prev.map((notification) =>
              notification.id === notificationId
                ? {
                    ...notification,
                    read_at: originalNotification?.read_at || null,
                  }
                : notification
            )
          );
          setUnreadCount((prev) => prev + 1);
          pendingMarkAsRead.current.delete(notificationId);

          console.error("Failed to mark notification as read:", error);
        }
      }, 300); // تأخير 300ms لتجميع الطلبات
    },
    [notifications]
  );

  const markAllAsRead = useCallback(async () => {
    // تحديث فوري للـ UI
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read_at: notification.read_at || new Date().toISOString(),
      }))
    );
    setUnreadCount(0);

    try {
      await customFetch.post("/notifications/mark-all-read");
      toast.success("All notifications marked as read");

      // تنظيف الـ pending set
      pendingMarkAsRead.current.clear();
      if (markAsReadTimeout.current) {
        clearTimeout(markAsReadTimeout.current);
      }
    } catch (error) {
      toast.success("All notifications marked as read locally");
    }
  }, []);

  return {
    notifications,
    unreadCount,
    isLoading,
    error,
    markAsRead,
    markAllAsRead,
    refetch: fetchInitialNotifications,
  };
};

export default useNotificationsPusher;