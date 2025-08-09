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
      return this.pusher;
    }

    try {
      Pusher.logToConsole = false;

      const defaultOptions = this.config.getPusherOptions();
      const options = { ...defaultOptions, ...customOptions };

      this.pusher = new Pusher(this.config.appKey, options);
      this.setupConnectionHandlers();
      this.setupErrorHandlers();

      return this.pusher;
    } catch (error) {
      throw error;
    }
  }

  setupConnectionHandlers() {
    if (!this.pusher) return;

    this.pusher.connection.bind("connected", () => {
      this.reconnectAttempts = 0;
    });

    this.pusher.connection.bind("failed", () => {
      this.handleReconnection();
    });
  }

  setupErrorHandlers() {
    if (!this.pusher) return;
  }

  handleReconnection() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay =
        this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

      setTimeout(() => {
        this.reconnect();
      }, delay);
    }
  }

  subscribe(channelName) {
    if (!this.pusher) {
      throw new Error("Pusher not initialized. Call initialize() first.");
    }

    if (this.channels.has(channelName)) {
      return this.channels.get(channelName);
    }

    try {
      const channel = this.pusher.subscribe(channelName);
      this.channels.set(channelName, channel);

      channel.bind("pusher:subscription_error", (error) => {
        this.channels.delete(channelName);
      });

      return channel;
    } catch (error) {
      throw error;
    }
  }

  unsubscribe(channelName) {
    if (this.channels.has(channelName)) {
      this.pusher.unsubscribe(channelName);
      this.channels.delete(channelName);
    }
  }

  bind(channelName, eventName, callback) {
    const channel = this.subscribe(channelName);
    channel.bind(eventName, callback);
  }

  unbind(channelName, eventName, callback) {
    if (this.channels.has(channelName)) {
      const channel = this.channels.get(channelName);
      channel.unbind(eventName, callback);
    }
  }

  subscribeToNotifications(userId = null) {
    const actualUserId = userId || this.config.utils.getUserIdFromToken();
    if (!actualUserId) {
      throw new Error("User ID is required for notifications subscription");
    }

    const channelName = this.config.utils.getChannelName(
      "notifications",
      actualUserId
    );
    return this.subscribe(channelName);
  }

  onNewNotification(callback, userId = null) {
    const actualUserId = userId || this.config.utils.getUserIdFromToken();
    if (!actualUserId) {
      throw new Error("User ID is required for notification listener");
    }

    const channelName = this.config.utils.getChannelName(
      "notifications",
      actualUserId
    );
    this.bind(channelName, this.config.events.newNotification, callback);
  }

  disconnect() {
    if (this.pusher) {
      this.channels.clear();
      this.pusher.disconnect();
      this.pusher = null;
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
