export const pusherConfig = {
  appKey: import.meta.env.VITE_PUSHER_APP_KEY || "95d433c70538220738bd",
  cluster: import.meta.env.VITE_PUSHER_CLUSTER || "eu",
  forceTLS: import.meta.env.VITE_PUSHER_FORCE_TLS === "true",
  authEndpoint:
    import.meta.env.VITE_PUSHER_AUTH_ENDPOINT ||
    "https://woundwann.de/v1/broadcasting/auth",

  auth: {
    getAuthHeaders: () => {
      const userString = localStorage.getItem("user");
      let token = null;

      if (userString) {
        try {
          const user = JSON.parse(userString);
          token = user?.data?.token || user?.token;
        } catch (parseError) {
          // Error parsing user data
        }
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Requested-With": "XMLHttpRequest",
      };

      // في التطوير، لا نحتاج Origin و Referer
      if (import.meta.env.PROD) {
        headers.Origin =
          import.meta.env.VITE_APP_ORIGIN || "https://woundwann.de";
        headers.Referer =
          import.meta.env.VITE_APP_ORIGIN || "https://woundwann.de";
      }

      return headers;
    },
  },

  utils: {
    getChannelName: (type, userId) => `private-${type}.${userId}`,
    getUserIdFromToken: () => {
      const userString = localStorage.getItem("user");
      if (userString) {
        try {
          const user = JSON.parse(userString);

          if (user.token) {
            try {
              const tokenPayload = JSON.parse(atob(user.token.split(".")[1]));
              const userId =
                tokenPayload.sub || tokenPayload.id || tokenPayload.user_id;
              return userId;
            } catch (tokenError) {
              // Error parsing token
            }
          }

          const userId = user.id || user.user_id || user.userId;
          return userId;
        } catch (parseError) {
          return null;
        }
      }
      return null;
    },
    isAuthenticated: () => {
      const userString = localStorage.getItem("user");
      if (userString) {
        try {
          const user = JSON.parse(userString);
          const hasToken = !!(user?.data?.token || user?.token);
          return hasToken;
        } catch (parseError) {
          return false;
        }
      }
      return false;
    },
  },

  events: {
    newNotification: "new-notification",
  },

  logging: {
    enabled: !import.meta.env.PROD,
    log: (message, data = null) => {
      // Logging disabled
    },
    error: (message, error = null) => {
      // Error logging disabled
    },
  },

  getPusherOptions: () => {
    const options = {
      cluster: pusherConfig.cluster,
      forceTLS: pusherConfig.forceTLS,
      authEndpoint: pusherConfig.authEndpoint,
      auth: {
        headers: pusherConfig.auth.getAuthHeaders(),
        params: {},
        transport: "ajax",
      },
      authorizer: (channel, options) => {
        return {
          authorize: (socketId, callback) => {
            if (!socketId || socketId === "test_socket_id") {
              callback(new Error("Invalid socket ID"), null);
              return;
            }

            const xhr = new XMLHttpRequest();
            xhr.open("POST", pusherConfig.authEndpoint, true);

            const headers = pusherConfig.auth.getAuthHeaders();
            Object.keys(headers).forEach((key) => {
              xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onreadystatechange = function () {
              if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                  try {
                    const data = JSON.parse(xhr.responseText);
                    callback(null, data);
                  } catch (e) {
                    callback(new Error("Invalid JSON response"), null);
                  }
                } else {
                  callback(
                    new Error(
                      `Authentication failed: ${xhr.status} ${xhr.statusText}`
                    ),
                    null
                  );
                }
              }
            };

            const params = new URLSearchParams();
            params.append("socket_id", socketId);
            params.append("channel_name", channel.name);

            xhr.send(params);
          },
        };
      },
      enabledTransports: ["ws", "wss"],
      activityTimeout: 120000,
      pongTimeout: 30000,
      unavailableTimeout: 10000,
      maxReconnectionAttempts: 6,
      maxReconnectGapInSeconds: 30,
    };

    if (!import.meta.env.PROD) {
      options.enabledTransports = ["ws", "wss", "xhr_polling", "xhr_streaming"];
      options.disableStats = true;
    }

    return options;
  },
};

export const getCurrentPusherConfig = () => {
  return {
    ...pusherConfig,
    currentUserId: pusherConfig.utils.getUserIdFromToken(),
    isAuthenticated: pusherConfig.utils.isAuthenticated(),
    channelName: pusherConfig.utils.getUserIdFromToken()
      ? pusherConfig.utils.getChannelName(
          "notifications",
          pusherConfig.utils.getUserIdFromToken()
        )
      : null,
  };
};

export default pusherConfig;
