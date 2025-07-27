import { useState, useCallback, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { pusherService } from "../services/pusherService";
import { getCurrentPusherConfig } from "../config/pusher";
import customFetch from "../utils/axios";

export const useNotificationsPusher = (userId = null) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  const config = getCurrentPusherConfig();
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
          id: notification.id || `notification-${Date.now()}-${Math.random()}`,
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
        setUnreadCount(processedNotifications.filter((n) => !n.read_at).length);
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
    const notificationData = data.notification || data;

    const newNotification = {
      id: notificationData.id || `live-${Date.now()}-${Math.random()}`,
      title:
        notificationData.title ||
        notificationData.data?.title ||
        "New Notification",
      message:
        notificationData.message ||
        notificationData.data?.message ||
        "You have a new notification",
      type: notificationData.type || notificationData.data?.type || "info",
      type_details: notificationData.type_details ||
        notificationData.data?.type_details || {
          icon: "info-circle",
          color: "blue",
        },
      created_at: new Date().toISOString(),
      read_at: null,
    };

    setNotifications((prev) => [newNotification, ...prev]);
    setUnreadCount((prev) => prev + 1);

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(newNotification.title, {
        body: newNotification.message,
        icon: "/favicon.ico",
      });
    }
  }, []);

  // Initialize Pusher
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
    };
  }, [
    actualUserId,
    channelName,
    handleNewNotification,
    fetchInitialNotifications,
    config,
  ]);

  const markAsRead = useCallback(async (notificationId) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read_at: new Date().toISOString() }
          : notification
      )
    );

    setUnreadCount((prev) => Math.max(0, prev - 1));

    try {
      await customFetch.post(`/notifications/update/${notificationId}`);
    } catch (error) {
      // Silent fail for mark as read
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
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
    connectionState: pusherService.getConnectionState(),
    isConnected: pusherService.isConnected(),
  };
};

export default useNotificationsPusher;
