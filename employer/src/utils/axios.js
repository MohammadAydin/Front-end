import axios from "axios";
import { getUserFromLocalStorage } from "./localStorage";

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

export default customFetch;
