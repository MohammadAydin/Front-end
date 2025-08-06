export const pusherConfig = {
  appKey: import.meta.env.VITE_PUSHER_APP_KEY || "95d433c70538220738bd",
  cluster: import.meta.env.VITE_PUSHER_CLUSTER || "eu",
  forceTLS: import.meta.env.VITE_PUSHER_FORCE_TLS !== "false",
  authEndpoint:
    import.meta.env.VITE_PUSHER_AUTH_ENDPOINT ||
    "https://woundwann.de/broadcasting/auth",

  auth: {
    getAuthHeaders: () => {
      const userString = localStorage.getItem("user");
      let token = null;

      if (userString) {
        try {
          const user = JSON.parse(userString);
          token = user?.data?.token || user?.token;
        } catch (parseError) {}
      }

      return {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Requested-With": "XMLHttpRequest",
        Origin: import.meta.env.VITE_APP_ORIGIN || "https://woundwann.de",
        Referer: import.meta.env.VITE_APP_ORIGIN || "https://woundwann.de",
      };
    },
  },

  getPusherOptions: () => ({
    cluster: pusherConfig.cluster,
    forceTLS: pusherConfig.forceTLS,
    authEndpoint: pusherConfig.authEndpoint,
    auth: {
      headers: pusherConfig.auth.getAuthHeaders(),
    },
    enabledTransports: ["ws", "wss"],
    activityTimeout: 120000,
    pongTimeout: 30000,
    unavailableTimeout: 10000,
    maxReconnectionAttempts: 6,
    maxReconnectGapInSeconds: 30,
  }),
};

export default pusherConfig;
