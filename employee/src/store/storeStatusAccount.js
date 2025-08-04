import { create } from "zustand";
// Store for storing form interface steps
const useStatusAccount = create((set) => ({
  status: null,
  setStatus: (statusPar) => set(() => ({ status: statusPar })),
}));

export default useStatusAccount;
