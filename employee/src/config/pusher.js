export const pusherConfig = {
  appKey: import.meta.env.VITE_PUSHER_APP_KEY || "a055e471be24ad7dbe23",
  cluster: import.meta.env.VITE_PUSHER_CLUSTER || "eu",
  forceTLS: import.meta.env.VITE_PUSHER_FORCE_TLS !== "false",

  authEndpoint:
    import.meta.env.VITE_PUSHER_AUTH_ENDPOINT ||
    `${import.meta.env.VITE_API_BASE_URL}/broadcasting/auth`,

  connection: {
    enabledTransports: ["ws", "wss"],
    disabledTransports: [],
    activityTimeout: 120000,
    pongTimeout: 30000,
    unavailableTimeout: 10000,
    maxReconnectionAttempts: 6,
    maxReconnectGapInSeconds: 30,
  },

  auth: {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Requested-With": "XMLHttpRequest",
    },
    getAuthHeaders: () => {
      const userString = localStorage.getItem("user");
      let token = null;

      if (userString) {
        try {
          const user = JSON.parse(userString);
          token = user.token;
        } catch (parseError) {
          console.warn("Failed to parse user data from localStorage");
        }
      }

      return {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Requested-With": "XMLHttpRequest",
      };
    },
  },

  channels: {
    notifications: (userId) => `private-notifications.${userId}`,
    userActivity: (userId) => `private-user-activity.${userId}`,
    userMessages: (userId) => `private-messages.${userId}`,

    onlineUsers: () => `presence-online-users`,
    chatRoom: (roomId) => `presence-chat.${roomId}`,

    general: "general-notifications",
    announcements: "public-announcements",
    systemStatus: "system-status",
  },

  events: {
    newNotification: "new-notification",
    notificationRead: "notification-read",
    notificationDeleted: "notification-deleted",
    notificationUpdated: "notification-updated",

    userOnline: "user-online",
    userOffline: "user-offline",
    userTyping: "user-typing",
    userStoppedTyping: "user-stopped-typing",

    newMessage: "new-message",
    messageRead: "message-read",
    messageDeleted: "message-deleted",

    systemMaintenance: "system-maintenance",
    systemUpdate: "system-update",
    connectionStatus: "connection-status",

    dataUpdate: "data-update",
    refresh: "refresh",
  },

  logging: {
    enabled: false,
    level: "warn",
    logToConsole: false,
  },

  errorHandling: {
    retryOnError: true,
    maxRetries: 3,
    retryDelay: 1000,
    onError: (error) => {
      console.error("Pusher Error:", error);
    },
    onConnectionError: (error) => {
      console.error("Pusher Connection Error:", error);
    },
    onAuthError: (error) => {
      console.error("Pusher Auth Error:", error);
    },
  },

  features: {
    enablePresence: true,
    enablePrivateChannels: true,
    enableEncryption: false,
    enableCompression: false,
    enableHeartbeat: true,
  },

  utils: {
    getUserIdFromToken: () => {
      const userString = localStorage.getItem("user");
      if (!userString) return null;

      try {
        const user = JSON.parse(userString);
        const token = user.token;

        if (!token) return null;

        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.sub || payload.id || payload.user_id || null;
      } catch (error) {
        console.warn("Failed to extract user ID from token:", error);
        return null;
      }
    },

    isAuthenticated: () => {
      const userString = localStorage.getItem("user");
      if (!userString) return false;

      try {
        const user = JSON.parse(userString);
        return !!user.token;
      } catch (error) {
        return false;
      }
    },

    getChannelName: (channelType, ...params) => {
      const channelFunction = pusherConfig.channels[channelType];
      if (typeof channelFunction === "function") {
        return channelFunction(...params);
      } else if (typeof channelFunction === "string") {
        return channelFunction;
      }
      throw new Error(`Invalid channel type: ${channelType}`);
    },

    isValidEvent: (eventName) => {
      return Object.values(pusherConfig.events).includes(eventName);
    },

    getPusherOptions: () => {
      return {
        cluster: pusherConfig.cluster,
        forceTLS: pusherConfig.forceTLS,
        authEndpoint: pusherConfig.authEndpoint,
        auth: {
          headers: pusherConfig.auth.getAuthHeaders(),
        },
        enabledTransports: pusherConfig.connection.enabledTransports,
        disabledTransports: pusherConfig.connection.disabledTransports,
        activityTimeout: pusherConfig.connection.activityTimeout,
        pongTimeout: pusherConfig.connection.pongTimeout,
        unavailableTimeout: pusherConfig.connection.unavailableTimeout,
        maxReconnectionAttempts:
          pusherConfig.connection.maxReconnectionAttempts,
        maxReconnectGapInSeconds:
          pusherConfig.connection.maxReconnectGapInSeconds,
      };
    },
  },
};

export const pusherEnvironments = {
  development: {
    ...pusherConfig,
    authEndpoint: "http://127.0.0.1:8000/v1/broadcasting/auth",
  },

  production: {
    ...pusherConfig,
    authEndpoint: import.meta.env.VITE_API_BASE_URL + "/v1/broadcasting/auth",
  },
};

export const getCurrentPusherConfig = () => {
  const env = import.meta.env.MODE || "development";
  return pusherEnvironments[env] || pusherConfig;
};

export default pusherConfig;
