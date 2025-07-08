import { create } from "zustand";

export const useWorkingHoursStore = create((set, get) => ({
  rowData: [],

  setRawData: (data) => set({ rowData: data }),

  getTotalHours: () => {
    const data = get().rowData;
    return data.reduce((sum, item) => {
      const hours = parseFloat(item.total_hours);
      return sum + (isNaN(hours) ? 0 : hours);
    }, 0);
  },

  getDateRange: () => {
    const data = get().rowData;
    if (!data || data.length === 0) return null;

    const first = data[0];
    const last = data[data.length - 1];

    return ` ${first.month} - ${first.year} to ${last.month} - ${last.year}`;
  },
}));
