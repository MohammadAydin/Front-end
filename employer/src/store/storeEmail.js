import { create } from "zustand";
// A store to store Email
const useEmailStore = create((set) => ({
  email: "",
  setEmail: (emailParameter) => set(() => ({ email: emailParameter })),
}));

export default useEmailStore;
