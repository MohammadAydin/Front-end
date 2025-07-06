import { create } from "zustand";
// Store for storing form interface steps
const useFormLevel = create((set) => ({
  Level: 1,
  setLevel: (num) => set(() => ({ Level: num })),
}));

export default useFormLevel;
