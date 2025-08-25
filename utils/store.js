import { create } from "zustand";

export const useIntroStore = create((set) => ({
  introFinished: false,
  setIntroFinished: () => set({ introFinished: true }),
  setIntroStarted: () => set({ introFinished: false }),
}));

export const useLoadingStore = create((set) => ({
  loadingInProgress: false,
  setLoadingFinished: () => set({ loadingInProgress: false }),
  setLoadingStarted: () => set({ loadingInProgress: true }),
}));
