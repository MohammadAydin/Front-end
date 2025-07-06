import { create } from "zustand";
// A store to store user data
const useRemember = create((set) => ({
  password: "",
  setPassword: (userPassword) => set(() => ({ password: userPassword })),
}));

export default useRemember;
