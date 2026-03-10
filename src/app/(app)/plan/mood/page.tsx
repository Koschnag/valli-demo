"use client";

import MoodSwiper from "@/components/mood/MoodSwiper";

export default function MoodPage() {
  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-primary-900)] tracking-tight mb-2">
          Was ist dein Mood?
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          Swipe nach rechts für Ja, nach links für Nein.
        </p>
      </div>

      <MoodSwiper />
    </div>
  );
}
