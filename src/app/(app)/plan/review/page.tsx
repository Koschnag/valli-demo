"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTripPlanStore } from "@/stores/tripPlanStore";
import { regions } from "@/data/regions";
import { cities } from "@/data/cities";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { addDays, format } from "date-fns";
import { de } from "date-fns/locale";
import type { MoodCategory } from "@/types/mood";

const moodLabels: Record<MoodCategory, string> = {
  adventure: "Abenteuer",
  relaxation: "Entspannung",
  culture: "Kultur",
  nightlife: "Nachtleben",
  gastronomy: "Kulinarik",
  nature: "Natur",
  history: "Geschichte",
  romance: "Romantik",
};

export default function ReviewPage() {
  const { selectedRegionId, startDate, duration, moodProfile, reset } =
    useTripPlanStore();

  const region = regions.find((r) => r.id === selectedRegionId);
  const regionCities = cities.filter((c) => c.regionId === selectedRegionId);

  // Generate a simple itinerary
  const itinerary = useMemo(() => {
    if (!startDate || !region || regionCities.length === 0) return [];

    const days = [];
    for (let i = 0; i < duration; i++) {
      const date = addDays(new Date(startDate), i);
      const city = regionCities[i % regionCities.length];

      days.push({
        dayIndex: i,
        date: format(date, "EEEE, dd. MMMM", { locale: de }),
        city: city.name,
        cityImage: city.image,
        country: city.country,
        stops: [
          {
            time: "08:00",
            name: `Frühstück in ${city.name}`,
            type: "restaurant" as const,
            description: "Lokales Café entdecken",
          },
          {
            time: "09:30",
            name: `${city.name} erkunden`,
            type: "attraction" as const,
            description: city.description,
          },
          {
            time: "12:30",
            name: `Mittagessen`,
            type: "restaurant" as const,
            description: "Regionale Spezialitäten probieren",
          },
          {
            time: "14:00",
            name: `Sehenswürdigkeiten`,
            type: "attraction" as const,
            description: `Die besten Spots in ${city.name}`,
          },
          {
            time: "19:00",
            name: `Abendessen`,
            type: "restaurant" as const,
            description: "Gemütliches Restaurant",
          },
          ...(i < duration - 1
            ? [
                {
                  time: "21:00",
                  name: `Weiterreise nach ${regionCities[(i + 1) % regionCities.length].name}`,
                  type: "transit" as const,
                  description: "Mit dem Interrail-Zug",
                },
              ]
            : []),
        ],
      });
    }
    return days;
  }, [startDate, duration, region, regionCities]);

  const topMoods = moodProfile
    ? (Object.entries(moodProfile) as [MoodCategory, number][])
        .filter(([key, val]) => key in moodLabels && val > 0)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
    : [];

  if (!region || !startDate) {
    return (
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-8 text-center">
        <Card padding="lg">
          <h2 className="text-xl font-bold text-[var(--color-primary-900)] mb-2">
            Noch nicht fertig geplant
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-6">
            Bitte wähle zuerst eine Region und ein Datum.
          </p>
          <Link href="/plan">
            <Button>Zurück zur Planung</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-primary-900)] tracking-tight mb-2">
          Deine Reise
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          {duration} Tage durch {region.name}
        </p>
      </div>

      {/* Summary Card */}
      <Card padding="none" className="mb-8 overflow-hidden">
        <div className="relative h-56">
          <Image
            src={region.image}
            alt={region.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-900)] to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="text-3xl font-bold text-white mb-2">
              {region.name}
            </h2>
            <div className="flex flex-wrap gap-2">
              <Badge variant="warm">
                {format(new Date(startDate), "dd.MM.", { locale: de })} —{" "}
                {format(addDays(new Date(startDate), duration - 1), "dd.MM.yyyy", {
                  locale: de,
                })}
              </Badge>
              <Badge variant="warm">{duration} Tage</Badge>
              <Badge variant="warm">
                {regionCities.length} Städte
              </Badge>
            </div>
          </div>
        </div>

        {topMoods.length > 0 && (
          <div className="px-6 py-4 border-b border-[var(--color-surface-200)]">
            <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
              Dein Mood
            </p>
            <div className="flex gap-2">
              {topMoods.map(([category]) => (
                <Badge key={category} variant="accent">
                  {moodLabels[category]}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Day by day itinerary */}
      <div className="space-y-6">
        {itinerary.map((day) => (
          <Card key={day.dayIndex} padding="none">
            {/* Day header */}
            <div className="flex items-center gap-4 p-5 border-b border-[var(--color-surface-200)]">
              <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 relative">
                <Image
                  src={day.cityImage}
                  alt={day.city}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-[var(--color-accent-600)] uppercase tracking-wider">
                  Tag {day.dayIndex + 1}
                </p>
                <h3 className="font-bold text-[var(--color-primary-900)]">
                  {day.city}, {day.country}
                </h3>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {day.date}
                </p>
              </div>
            </div>

            {/* Stops timeline */}
            <div className="p-5">
              <div className="space-y-4">
                {day.stops.map((stop, idx) => (
                  <div key={idx} className="flex gap-4">
                    {/* Time & line */}
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-mono font-semibold text-[var(--color-text-muted)] w-12 text-right">
                        {stop.time}
                      </span>
                      {idx < day.stops.length - 1 && (
                        <div className="w-px flex-1 bg-[var(--color-surface-200)] mt-2" />
                      )}
                    </div>

                    {/* Stop info */}
                    <div className="flex items-start gap-3 pb-3 flex-1">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          stop.type === "restaurant"
                            ? "bg-orange-50"
                            : stop.type === "transit"
                            ? "bg-blue-50"
                            : "bg-[var(--color-accent-50)]"
                        }`}
                      >
                        {stop.type === "restaurant" ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E8A54B" strokeWidth="2" strokeLinecap="round">
                            <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
                          </svg>
                        ) : stop.type === "transit" ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#23377A" strokeWidth="2" strokeLinecap="round">
                            <rect x="4" y="3" width="16" height="14" rx="2" />
                            <path d="M9 21l3-6 3 6M12 3v14" />
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-700)" strokeWidth="2" strokeLinecap="round">
                            <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                            <circle cx="12" cy="13" r="4" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-[var(--color-primary-900)]">
                          {stop.name}
                        </p>
                        <p className="text-xs text-[var(--color-text-muted)]">
                          {stop.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Button variant="primary" size="lg" className="flex-1">
          Reise speichern
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={reset}
          className="flex-1"
        >
          Neu planen
        </Button>
      </div>
    </div>
  );
}
