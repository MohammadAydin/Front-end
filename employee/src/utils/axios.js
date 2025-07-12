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
<<<<<<< HEAD

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

        addUserToLocalStorage("user", data.data);
        setUser(data.data);

        originalRequest.headers["Authorization"] = `Bearer ${data.data.token}`;
=======
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
>>>>>>> b43800ef61dad9baf709bac8c88b739b34139cd3
        return customFetch(originalRequest);
      } catch (refreshError) {
        logout();
        window.location.href = "/login";
<<<<<<< HEAD
        return Promise.reject(refreshError);
      }
    }

=======
        // Optional: Redirect to login or logout user
        return Promise.reject(refreshError);
      }
    }
>>>>>>> b43800ef61dad9baf709bac8c88b739b34139cd3
    return Promise.reject(error);
  }
);
export default customFetch;
