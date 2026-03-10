"use client";

import { useMoodStore } from "@/stores/moodStore";
import { useTripPlanStore } from "@/stores/tripPlanStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Link from "next/link";
import type { MoodCategory } from "@/types/mood";

const categoryLabels: Record<MoodCategory, { name: string; emoji: string }> = {
  adventure: { name: "Abenteuer", emoji: "🏔️" },
  relaxation: { name: "Entspannung", emoji: "🌊" },
  culture: { name: "Kultur", emoji: "🎨" },
  nightlife: { name: "Nachtleben", emoji: "🌃" },
  gastronomy: { name: "Kulinarik", emoji: "🍽️" },
  nature: { name: "Natur", emoji: "🌿" },
  history: { name: "Geschichte", emoji: "🏰" },
  romance: { name: "Romantik", emoji: "💕" },
};

interface MoodResultsProps {
  onReset: () => void;
}

export default function MoodResults({ onReset }: MoodResultsProps) {
  const { results } = useMoodStore();
  const { setMoodProfile } = useTripPlanStore();

  const sortedMoods = (Object.entries(results) as [MoodCategory, number][])
    .filter(([key]) => key in categoryLabels)
    .sort(([, a], [, b]) => b - a);

  const topMoods = sortedMoods.filter(([, v]) => v > 0);

  const handleContinue = () => {
    setMoodProfile(results);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card padding="lg">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-[var(--color-primary-900)] mb-2">
            Dein Reise-Mood
          </h3>
          <p className="text-[var(--color-text-secondary)]">
            Das sagt dein Herz:
          </p>
        </div>

        <div className="space-y-3 mb-8">
          {sortedMoods.map(([category, value]) => {
            const info = categoryLabels[category];
            const percent = ((value + 2) / 4) * 100;
            return (
              <div key={category} className="flex items-center gap-3">
                <span className="text-xl w-8">{info.emoji}</span>
                <span className="text-sm font-medium text-[var(--color-text-primary)] w-24">
                  {info.name}
                </span>
                <div className="flex-1 h-2 bg-[var(--color-surface-200)] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${percent}%`,
                      backgroundColor:
                        value > 0
                          ? "var(--color-accent-500)"
                          : value < 0
                          ? "var(--color-surface-300)"
                          : "var(--color-text-muted)",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {topMoods.length > 0 && (
          <p className="text-center text-sm text-[var(--color-text-secondary)] mb-6">
            Du stehst auf{" "}
            <strong>
              {topMoods
                .slice(0, 3)
                .map(([c]) => categoryLabels[c].name)
                .join(", ")}
            </strong>
            !
          </p>
        )}

        <div className="flex flex-col gap-3">
          <Link href="/plan/region" onClick={handleContinue}>
            <Button className="w-full" size="lg">
              Region wählen
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Button>
          </Link>
          <Button variant="ghost" onClick={onReset} className="w-full">
            Nochmal swiper
          </Button>
        </div>
      </Card>
    </div>
  );
}
