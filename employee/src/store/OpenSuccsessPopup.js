import { create } from "zustand";

export const OpenSuccsessPopup = create((set) => ({
  isOpen: false,

  OpenSuccsess: () =>
    set(() => ({
      isOpen: true,
    })),

  CloseSuccsess: () =>
    set(() => ({
      isOpen: false,
    })),
}));
