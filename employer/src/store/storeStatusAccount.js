import { create } from "zustand";
import useData from "../hooks/useData";
// Store for storing form interface steps
const useStatusAccount = create((set) => ({
  status: null,
  setStatus: (statusPar) => set(() => ({ status: statusPar })),
}));

export default useStatusAccount;
