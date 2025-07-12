import { create } from "zustand";

export const useIntroAnimationStore = create((set) => ({
  completed: false,
  setIntroAnimationAsCompleted: () => set((state) => ({ completed: true })),
}));
