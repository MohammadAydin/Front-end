import Pusher from "pusher-js";
import { getCurrentPusherConfig } from "../config/pusher";

class PusherService {
  constructor() {
    this.pusher = null;
    this.channels = new Map();
    this.config = getCurrentPusherConfig();
  }

  initialize(customOptions = {}) {
    if (this.pusher) {
      return this.pusher;
    }

    Pusher.logToConsole = this.config.logging.logToConsole;
    const defaultOptions = this.config.utils.getPusherOptions();
    const options = { ...defaultOptions, ...customOptions };
    this.pusher = new Pusher(this.config.appKey, options);
    this.setupErrorHandlers();

    return this.pusher;
  }

  setupErrorHandlers() {
    if (!this.pusher) return;

    this.pusher.connection.bind("error", (error) => {
      this.config.errorHandling.onConnectionError(error);
    });

    this.pusher.bind("pusher:error", (error) => {
      this.config.errorHandling.onError(error);
    });

    this.pusher.bind("pusher:signin_success", (data) => {
      if (this.config.logging.enabled) {
        console.log("Pusher authentication successful:", data);
      }
    });
  }

  subscribe(channelName) {
    if (!this.pusher) {
      throw new Error("Pusher not initialized. Call initialize() first.");
    }

    if (this.channels.has(channelName)) {
      return this.channels.get(channelName);
    }

    const channel = this.pusher.subscribe(channelName);
    this.channels.set(channelName, channel);

    channel.bind("pusher:subscription_error", (error) => {
      this.config.errorHandling.onAuthError(error);
    });

    if (this.config.logging.enabled) {
      console.log(`Subscribed to channel: ${channelName}`);
    }

    return channel;
  }

  unsubscribe(channelName) {
    if (this.channels.has(channelName)) {
      this.pusher.unsubscribe(channelName);
      this.channels.delete(channelName);

      if (this.config.logging.enabled) {
        console.log(`Unsubscribed from channel: ${channelName}`);
      }
    }
  }

  bind(channelName, eventName, callback) {
    if (!this.config.utils.isValidEvent(eventName)) {
      console.warn(
        `Warning: Event '${eventName}' is not defined in pusher config`
      );
    }

    const channel = this.subscribe(channelName);
    channel.bind(eventName, callback);

    if (this.config.logging.enabled) {
      console.log(`Bound to event '${eventName}' on channel '${channelName}'`);
    }
  }

  unbind(channelName, eventName, callback) {
    if (this.channels.has(channelName)) {
      const channel = this.channels.get(channelName);
      channel.unbind(eventName, callback);

      if (this.config.logging.enabled) {
        console.log(
          `Unbound from event '${eventName}' on channel '${channelName}'`
        );
      }
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

  subscribeToUserActivity(userId = null) {
    const actualUserId = userId || this.config.utils.getUserIdFromToken();
    if (!actualUserId) {
      throw new Error("User ID is required for user activity subscription");
    }

    const channelName = this.config.utils.getChannelName(
      "userActivity",
      actualUserId
    );
    return this.subscribe(channelName);
  }

  subscribeToPresenceChannel(channelType, ...params) {
    if (!this.config.features.enablePresence) {
      throw new Error("Presence channels are disabled in configuration");
    }

    const channelName = this.config.utils.getChannelName(
      channelType,
      ...params
    );
    return this.subscribe(channelName);
  }

  onNewNotification(callback, userId = null) {
    const actualUserId = userId || this.config.utils.getUserIdFromToken();
    const channelName = this.config.utils.getChannelName(
      "notifications",
      actualUserId
    );
    this.bind(channelName, this.config.events.newNotification, callback);
  }

  onUserOnline(callback) {
    const channelName = this.config.utils.getChannelName("onlineUsers");
    this.bind(channelName, this.config.events.userOnline, callback);
  }

  onUserOffline(callback) {
    const channelName = this.config.utils.getChannelName("onlineUsers");
    this.bind(channelName, this.config.events.userOffline, callback);
  }

  disconnect() {
    if (this.pusher) {
      this.channels.clear();
      this.pusher.disconnect();
      this.pusher = null;

      if (this.config.logging.enabled) {
        console.log("Pusher disconnected");
      }
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

  getConfig() {
    return this.config;
  }

  updateAuthHeaders() {
    if (this.pusher && this.pusher.config) {
      this.pusher.config.auth.headers = this.config.auth.getAuthHeaders();
    }
  }
}

export const pusherService = new PusherService();
export default pusherService;
