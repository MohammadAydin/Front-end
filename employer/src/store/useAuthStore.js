import { create } from "zustand";
import { getUserFromLocalStorage } from "../utils/localStorage";

export const useAuthStore = create((set) => ({
  // Fetch user from local storage
  user: getUserFromLocalStorage() || null,

  // A function that allows user modification
  setUser: (user) => set(() => ({ user })),

  // refresh the token
  setUserToken: (token) =>
    set((state) => ({
      user: { ...state.user, token },
    })),

  // Remove user from local storage when logging out
  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));
