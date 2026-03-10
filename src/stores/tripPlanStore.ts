import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MoodProfile } from "@/types/mood";

interface TripPlanState {
  // Wizard step
  currentStep: number;

  // Mood
  moodProfile: MoodProfile | null;

  // Region
  selectedRegionId: string | null;

  // Schedule
  startDate: string | null;
  duration: number; // days

  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setMoodProfile: (mood: MoodProfile) => void;
  setRegion: (regionId: string) => void;
  setStartDate: (date: string) => void;
  setDuration: (days: number) => void;
  reset: () => void;
}

const initialState = {
  currentStep: 0,
  moodProfile: null,
  selectedRegionId: null,
  startDate: null,
  duration: 7,
};

export const useTripPlanStore = create<TripPlanState>()(
  persist(
    (set) => ({
      ...initialState,
      setStep: (step) => set({ currentStep: step }),
      nextStep: () => set((s) => ({ currentStep: s.currentStep + 1 })),
      prevStep: () =>
        set((s) => ({ currentStep: Math.max(0, s.currentStep - 1) })),
      setMoodProfile: (mood) => set({ moodProfile: mood }),
      setRegion: (regionId) => set({ selectedRegionId: regionId }),
      setStartDate: (date) => set({ startDate: date }),
      setDuration: (days) => set({ duration: days }),
      reset: () => set(initialState),
    }),
    { name: "valli-trip-plan" }
  )
);
