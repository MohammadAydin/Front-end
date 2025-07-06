import { create } from "zustand";

const useRequestsStore = create((set) => ({
  RequestIsOpen: false,
  RequestClose: () => set({ RequestIsOpen: false }),
  RequestOpen: () => set({ RequestIsOpen: true }),

  RequestDone: false,
  notDone: () => set({ RequestDone: false }),
  Done: () => set({ RequestDone: true }),

  // Help Request Details
  showCode: false,
  QrCode: false,
  PinCode: false,

  CodeClose: () => set({ showCode: false, QrCode: false, PinCode: false }),
  QrCodeOpen: () => set({ QrCode: true, showCode: true }),
  PinCodeOpen: () => set({ PinCode: true, showCode: true }),
}));

export default useRequestsStore;
