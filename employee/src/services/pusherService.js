import Pusher from "pusher-js";
import { pusherConfig } from "../config/pusher";

class PusherService {
  constructor() {
    this.pusher = null;
    this.channels = new Map();
    this.config = pusherConfig;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000;
  }

  initialize(customOptions = {}) {
    if (this.pusher) {
      this.config.logging.log("Pusher already initialized");
      return this.pusher;
    }

    try {
      Pusher.logToConsole = !import.meta.env.PROD;

      const defaultOptions = this.config.getPusherOptions();
      const options = { ...defaultOptions, ...customOptions };

      this.config.logging.log("Initializing Pusher with options:", options);

      this.pusher = new Pusher(this.config.appKey, options);
      this.setupConnectionHandlers();
      this.setupErrorHandlers();

      this.config.logging.log("Pusher initialized successfully");
      return this.pusher;
    } catch (error) {
      this.config.logging.error("Failed to initialize Pusher:", error);
      throw error;
    }
  }

  setupConnectionHandlers() {
    if (!this.pusher) return;

    this.pusher.connection.bind("connecting", () => {
      this.config.logging.log("Pusher connecting...");
    });

    this.pusher.connection.bind("connected", () => {
      this.config.logging.log("Pusher connected successfully!");
      this.reconnectAttempts = 0;
    });

    this.pusher.connection.bind("disconnected", () => {
      this.config.logging.log("Pusher disconnected");
    });

    this.pusher.connection.bind("failed", () => {
      this.config.logging.error("Pusher connection failed");
      this.handleReconnection();
    });

    this.pusher.connection.bind("state_change", (states) => {
      this.config.logging.log(
        `Connection state changed: ${states.previous} → ${states.current}`
      );
    });
  }

  setupErrorHandlers() {
    if (!this.pusher) return;

    this.pusher.connection.bind("error", (error) => {
      this.config.logging.error("Pusher connection error:", error);

      if (error.error && error.error.data) {
        const errorData = error.error.data;
        if (errorData.code === 4001) {
          this.config.logging.error("Application does not exist");
        } else if (errorData.code === 4004) {
          this.config.logging.error("Application over connection quota");
        } else if (errorData.code === 4100) {
          this.config.logging.error("Over capacity");
        }
      }
    });

    this.pusher.bind("pusher:error", (error) => {
      this.config.logging.error("Pusher error:", error);
    });
  }

  handleReconnection() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay =
        this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

      this.config.logging.log(
        `Attempting reconnection ${this.reconnectAttempts}/${this.maxReconnectAttempts} in ${delay}ms`
      );

      setTimeout(() => {
        this.reconnect();
      }, delay);
    } else {
      this.config.logging.error("Max reconnection attempts reached");
    }
  }

  subscribe(channelName) {
    if (!this.pusher) {
      this.config.logging.error(
        "Pusher not initialized. Call initialize() first."
      );
      throw new Error("Pusher not initialized. Call initialize() first.");
    }

    if (this.channels.has(channelName)) {
      this.config.logging.log(`Already subscribed to channel: ${channelName}`);
      return this.channels.get(channelName);
    }

    try {
      this.config.logging.log(`Subscribing to channel: ${channelName}`);
      const channel = this.pusher.subscribe(channelName);
      this.channels.set(channelName, channel);

      channel.bind("pusher:subscription_succeeded", () => {
        this.config.logging.log(`Successfully subscribed to: ${channelName}`);
      });

      channel.bind("pusher:subscription_error", (error) => {
        this.config.logging.error(
          `Subscription error for ${channelName}:`,
          error
        );
        this.channels.delete(channelName);
      });

      return channel;
    } catch (error) {
      this.config.logging.error(
        `Failed to subscribe to ${channelName}:`,
        error
      );
      throw error;
    }
  }

  unsubscribe(channelName) {
    if (this.channels.has(channelName)) {
      this.pusher.unsubscribe(channelName);
      this.channels.delete(channelName);
      this.config.logging.log(`Unsubscribed from channel: ${channelName}`);
    }
  }

  bind(channelName, eventName, callback) {
    const channel = this.subscribe(channelName);
    channel.bind(eventName, callback);
    this.config.logging.log(
      `Bound to event '${eventName}' on channel '${channelName}'`
    );
  }

  unbind(channelName, eventName, callback) {
    if (this.channels.has(channelName)) {
      const channel = this.channels.get(channelName);
      channel.unbind(eventName, callback);
      this.config.logging.log(
        `Unbound from event '${eventName}' on channel '${channelName}'`
      );
    }
  }

  subscribeToNotifications(userId = null) {
    const actualUserId = userId || this.config.utils.getUserIdFromToken();
    if (!actualUserId) {
      this.config.logging.error(
        "User ID is required for notifications subscription"
      );
      throw new Error("User ID is required for notifications subscription");
    }

    const channelName = this.config.utils.getChannelName(
      "notifications",
      actualUserId
    );
    this.config.logging.log(
      `Subscribing to notifications for user: ${actualUserId}, channel: ${channelName}`
    );
    return this.subscribe(channelName);
  }

  onNewNotification(callback, userId = null) {
    const actualUserId = userId || this.config.utils.getUserIdFromToken();
    if (!actualUserId) {
      this.config.logging.error(
        "User ID is required for notification listener"
      );
      throw new Error("User ID is required for notification listener");
    }

    const channelName = this.config.utils.getChannelName(
      "notifications",
      actualUserId
    );
    this.config.logging.log(
      `Setting up notification listener for channel: ${channelName}, event: ${this.config.events.newNotification}`
    );
    this.bind(channelName, this.config.events.newNotification, callback);
  }

  disconnect() {
    if (this.pusher) {
      this.channels.clear();
      this.pusher.disconnect();
      this.pusher = null;
      this.config.logging.log("Pusher disconnected");
    }
  }

  reconnect() {
    this.disconnect();
    this.initialize();
  }

  getConnectionState() {
    return this.pusher ? this.pusher.connection.state : "disconnected";
  }

  isConnected() {
    return this.getConnectionState() === "connected";
  }

  getDebugInfo() {
    const userId = this.config.utils.getUserIdFromToken();
    const isAuth = this.config.utils.isAuthenticated();
    const channelName = userId
      ? this.config.utils.getChannelName("notifications", userId)
      : null;

    return {
      connectionState: this.getConnectionState(),
      isConnected: this.isConnected(),
      userId: userId,
      isAuthenticated: isAuth,
      channelName: channelName,
      subscribedChannels: Array.from(this.channels.keys()),
      reconnectAttempts: this.reconnectAttempts,
      pusherConfig: {
        appKey: this.config.appKey,
        cluster: this.config.cluster,
        authEndpoint: this.config.authEndpoint,
      },
    };
  }
}

export const pusherService = new PusherService();
export default pusherService;
