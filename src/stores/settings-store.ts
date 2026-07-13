import { create } from "zustand";

type SavedLocation = {
  address: string;
  latitude: number;
  longitude: number;
};

type SettingsState = {
  budget: number;
  location: SavedLocation | null;
  setBudget: (budget: number) => void;
  setLocation: (location: SavedLocation) => void;
};

export const useSettingsStore = create<SettingsState>((set) => ({
  budget: 10000,
  location: null,
  setBudget: (budget) => set({ budget }),
  setLocation: (location) => set({ location }),
}));
