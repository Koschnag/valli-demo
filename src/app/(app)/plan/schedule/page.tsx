"use client";

import { useTripPlanStore } from "@/stores/tripPlanStore";
import { regions } from "@/data/regions";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Link from "next/link";
import { addDays, format } from "date-fns";
import { de } from "date-fns/locale";

export default function SchedulePage() {
  const { selectedRegionId, startDate, duration, setStartDate, setDuration } =
    useTripPlanStore();

  const region = regions.find((r) => r.id === selectedRegionId);

  const today = format(new Date(), "yyyy-MM-dd");
  const endDate = startDate
    ? format(addDays(new Date(startDate), duration - 1), "dd. MMMM yyyy", {
        locale: de,
      })
    : null;

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-primary-900)] tracking-tight mb-2">
          Wann geht&apos;s los?
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          Wähle Startdatum und Reisedauer.
        </p>
      </div>

      {region && (
        <div className="mb-6 flex items-center gap-2">
          <Badge variant="accent">{region.name}</Badge>
          <span className="text-sm text-[var(--color-text-muted)]">
            ausgewählt
          </span>
        </div>
      )}

      <div className="space-y-6">
        {/* Start Date */}
        <Card padding="md">
          <label className="block text-sm font-semibold text-[var(--color-primary-900)] mb-3">
            Startdatum
          </label>
          <input
            type="date"
            min={today}
            value={startDate || ""}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-[var(--color-surface-300)] bg-white text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent transition-all"
          />
        </Card>

        {/* Duration */}
        <Card padding="md">
          <label className="block text-sm font-semibold text-[var(--color-primary-900)] mb-1">
            Reisedauer
          </label>
          <p className="text-sm text-[var(--color-text-muted)] mb-4">
            {duration} {duration === 1 ? "Tag" : "Tage"}
          </p>

          <input
            type="range"
            min={1}
            max={30}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full accent-[var(--color-accent-500)]"
          />

          <div className="flex justify-between text-xs text-[var(--color-text-muted)] mt-1">
            <span>1 Tag</span>
            <span>1 Woche</span>
            <span>2 Wochen</span>
            <span>30 Tage</span>
          </div>

          {/* Quick select */}
          <div className="flex flex-wrap gap-2 mt-4">
            {[3, 5, 7, 10, 14, 21].map((d) => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  duration === d
                    ? "bg-[var(--color-primary-900)] text-white"
                    : "bg-[var(--color-surface-100)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-200)]"
                }`}
              >
                {d} Tage
              </button>
            ))}
          </div>
        </Card>

        {/* Summary */}
        {startDate && (
          <Card
            padding="md"
            className="bg-[var(--color-accent-50)] border-[var(--color-accent-200)]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-accent-100)] flex items-center justify-center">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-accent-700)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--color-accent-900)]">
                  {format(new Date(startDate), "dd. MMMM yyyy", { locale: de })}{" "}
                  — {endDate}
                </p>
                <p className="text-xs text-[var(--color-accent-700)]">
                  {duration} {duration === 1 ? "Tag" : "Tage"} durch{" "}
                  {region?.name || "Europa"}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Link href="/plan/region" className="flex-1">
            <Button variant="outline" className="w-full">
              Zurück
            </Button>
          </Link>
          <Link href="/plan/review" className="flex-1">
            <Button
              className="w-full"
              disabled={!startDate}
            >
              Weiter
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
        </div>
      </div>
    </div>
  );
}
