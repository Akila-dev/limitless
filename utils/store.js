import { create } from "zustand";

export const useIntroStore = create((set) => ({
  introFinished: false,
  setIntroFinished: () => set({ introFinished: true }),
  setIntroStarted: () => set({ introFinished: false }),
}));
