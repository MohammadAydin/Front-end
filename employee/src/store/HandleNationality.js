import { create } from "zustand";

const handleNationality = create((set) => ({
  selectedNationality: null,

  setSelectedNationality: (Nationality) =>
    set(() => ({
      selectedNationality: Nationality,
    })),
}));

export default handleNationality;
