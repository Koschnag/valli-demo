"use client";

import { AnimatePresence } from "motion/react";
import MoodCard from "./MoodCard";
import MoodResults from "./MoodResults";
import { moodCards } from "@/data/mood-cards";
import { useMoodStore } from "@/stores/moodStore";
import type { SwipeDirection } from "@/types/mood";

export default function MoodSwiper() {
  const { currentIndex, isComplete, swipe, reset } = useMoodStore();

  const handleSwipe = (direction: SwipeDirection) => {
    if (currentIndex < moodCards.length) {
      swipe(moodCards[currentIndex].category, direction);
    }
  };

  if (isComplete) {
    return <MoodResults onReset={reset} />;
  }

  const remainingCards = moodCards.slice(currentIndex, currentIndex + 2);

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Progress */}
      <div className="flex items-center gap-3 w-full max-w-sm">
        <div className="flex-1 h-1.5 bg-[var(--color-surface-200)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--color-accent-500)] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentIndex / moodCards.length) * 100}%` }}
          />
        </div>
        <span className="text-sm font-medium text-[var(--color-text-muted)]">
          {currentIndex}/{moodCards.length}
        </span>
      </div>

      {/* Card stack */}
      <div className="relative w-full max-w-sm aspect-[3/4]">
        <AnimatePresence mode="popLayout">
          {remainingCards
            .map((card, idx) => (
              <MoodCard
                key={card.id}
                card={card}
                isTop={idx === 0}
                onSwipe={handleSwipe}
              />
            ))
            .reverse()}
        </AnimatePresence>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => handleSwipe("left")}
          className="w-14 h-14 rounded-full border-2 border-[var(--color-surface-300)] flex items-center justify-center text-[var(--color-text-muted)] hover:border-[var(--color-error)] hover:text-[var(--color-error)] hover:bg-red-50 transition-all cursor-pointer"
          aria-label="Nope"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <button
          onClick={() => handleSwipe("right")}
          className="w-16 h-16 rounded-full bg-[var(--color-accent-500)] flex items-center justify-center text-white hover:bg-[var(--color-accent-700)] transition-all shadow-lg hover:shadow-xl cursor-pointer"
          aria-label="Ja!"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      <p className="text-sm text-[var(--color-text-muted)]">
        Swipe rechts = Ja! | Swipe links = Nein
      </p>
    </div>
  );
}
