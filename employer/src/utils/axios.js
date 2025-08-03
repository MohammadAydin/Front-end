import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";
import { addUserToLocalStorage, getUserFromLocalStorage } from "./localStorage";

// Primary api address
const customFetch = axios.create({
  baseURL: "https://woundwann.de/v1",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Token Logout Features
customFetch.interceptors.request.use((config) => {
  // Fetch the user from localstorage
  const user = getUserFromLocalStorage();
  if (user) {
    config.headers["Authorization"] = `Bearer ${user?.data.token}`;
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

      const existingUser = getUserFromLocalStorage();

      if (!existingUser?.data?.token) {
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
