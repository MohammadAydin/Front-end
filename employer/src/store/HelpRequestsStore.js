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
  selectedTaskId: null,

  CodeClose: () =>
    set({
      showCode: false,
      QrCode: false,
      PinCode: false,
      selectedTaskId: null,
    }),
  QrCodeOpen: (taskId) =>
    set({ QrCode: true, showCode: true, selectedTaskId: taskId }),
  PinCodeOpen: (taskId) =>
    set({ PinCode: true, showCode: true, selectedTaskId: taskId }),
}));

export default useRequestsStore;
