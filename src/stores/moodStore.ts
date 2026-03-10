import { create } from "zustand";
import { MoodCategory, MoodProfile, SwipeDirection } from "@/types/mood";

interface MoodState {
  currentIndex: number;
  results: MoodProfile;
  isComplete: boolean;
  swipe: (category: MoodCategory, direction: SwipeDirection) => void;
  reset: () => void;
}

const emptyProfile: MoodProfile = {
  adventure: 0,
  relaxation: 0,
  culture: 0,
  nightlife: 0,
  gastronomy: 0,
  nature: 0,
  history: 0,
  romance: 0,
};

export const useMoodStore = create<MoodState>((set) => ({
  currentIndex: 0,
  results: { ...emptyProfile },
  isComplete: false,

  swipe: (category, direction) =>
    set((state) => {
      const value = direction === "right" ? 2 : direction === "left" ? -2 : 0;
      const newResults = {
        ...state.results,
        [category]: value,
      };
      const newIndex = state.currentIndex + 1;
      return {
        currentIndex: newIndex,
        results: newResults,
        isComplete: newIndex >= 8,
      };
    }),

  reset: () =>
    set({
      currentIndex: 0,
      results: { ...emptyProfile },
      isComplete: false,
    }),
}));
