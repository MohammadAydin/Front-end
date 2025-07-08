import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";
import { addUserToLocalStorage, getUserFromLocalStorage } from "./localStorage";

const customFetch = axios.create({
  baseURL: "https://woundwann.de/v1",
  withCredentials: true,
});

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
      try {
        // Attempt to refresh token
        const { data } = await axios.post(
          "https://woundwann.de/v1/refresh",
          {},
          {
            withCredentials: true,
          }
        );

        addUserToLocalStorage("user", data.data);
        setUser(getUserFromLocalStorage("user"));

        // Update the Authorization header in the original request with the new token
        originalRequest.headers["Authorization"] = `Bearer ${data.data.token}`;

        // Retry the original request with the new token
        return customFetch(originalRequest);
      } catch (refreshError) {
        logout();
        window.location.href = "/AuthContainer/login";
        // Optional: Redirect to login or logout user
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
export default customFetch;
