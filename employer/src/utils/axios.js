import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";
import { addUserToLocalStorage, getUserFromLocalStorage } from "./localStorage";

// Use different base URLs for development and production
const getBaseURL = () => {
  // Check if we should use proxy (development mode)
  const useProxy = import.meta.env.VITE_USE_PROXY === "true";

  if (useProxy && import.meta.env.DEV) {
    // Development: use proxy
    return "/api";
  } else {
    // Production or direct API: use environment variable or fallback
    return import.meta.env.VITE_API_BASE_URL || "https://woundwann.de/v1";
  }
};

const customFetch = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

// Log the base URL for debugging
console.log("API Base URL:", getBaseURL());
console.log("Environment:", import.meta.env.DEV ? "development" : "production");

customFetch.interceptors.request.use((config) => {
  const user = useAuthStore.getState().user;

  config.headers["Accept"] = "application/json";
  if (!config.headers["Content-Type"]) {
    config.headers["Content-Type"] = "application/json";
  }
  if (user) {
    config.headers["Authorization"] = `Bearer ${user?.token}`;
  }
  return config;
});

const { setUser, logout } = useAuthStore.getState();

customFetch.interceptors.response.use(
  (response) => response, // If the response is fine, return it
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 and not already retried

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const existingUser = getUserFromLocalStorage("user");

      if (!existingUser?.token) {
        // ⛔ No token means login attempt or expired session – do NOT retry refresh
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(
          "https://woundwann.de/v1/refresh",
          {},
          { withCredentials: true }
        );

        addUserToLocalStorage(data.data);
        setUser(data.data);

        originalRequest.headers["Authorization"] = `Bearer ${data.data.token}`;
        return customFetch(originalRequest);
      } catch (refreshError) {
        logout();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
export default customFetch;
