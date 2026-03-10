"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useTripPlanStore } from "@/stores/tripPlanStore";
import { regions } from "@/data/regions";
import { cities } from "@/data/cities";
import { attractions, restaurants } from "@/data/attractions";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { addDays, format } from "date-fns";
import { de } from "date-fns/locale";
import type { MoodCategory } from "@/types/mood";
import type { AttractionData, RestaurantData } from "@/data/attractions";

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

interface ItineraryStop {
  time: string;
  name: string;
  type: "attraction" | "restaurant" | "transit";
  description: string;
  image?: string;
  detail?: AttractionData | RestaurantData;
  cuisine?: string;
  priceRange?: string;
  duration?: number;
}

export default function ReviewPage() {
  const { selectedRegionId, startDate, duration, moodProfile, reset } =
    useTripPlanStore();
  const [selectedStop, setSelectedStop] = useState<ItineraryStop | null>(null);

  const region = regions.find((r) => r.id === selectedRegionId);
  const regionCities = cities.filter((c) => c.regionId === selectedRegionId);

  const itinerary = useMemo(() => {
    if (!startDate || !region || regionCities.length === 0) return [];

    const days = [];
    for (let i = 0; i < duration; i++) {
      const date = addDays(new Date(startDate), i);
      const city = regionCities[i % regionCities.length];
      const cityAttractions = attractions[city.id] || [];
      const cityRestaurants = restaurants[city.id] || [];

      // Pick attractions for this day visit (rotate through available ones)
      const visitIndex = Math.floor(i / regionCities.length);
      const morningAttraction = cityAttractions[
        (visitIndex * 2) % Math.max(cityAttractions.length, 1)
      ];
      const afternoonAttraction = cityAttractions[
        (visitIndex * 2 + 1) % Math.max(cityAttractions.length, 1)
      ];

      const breakfast = cityRestaurants.find((r) => r.meal === "breakfast");
      const lunch = cityRestaurants.find((r) => r.meal === "lunch");
      const dinner = cityRestaurants.find((r) => r.meal === "dinner");

      const stops: ItineraryStop[] = [
        {
          time: "08:00",
          name: breakfast?.name || `Frühstück in ${city.name}`,
          type: "restaurant",
          description: breakfast?.description || "Lokales Café entdecken",
          image: breakfast?.image,
          detail: breakfast,
          cuisine: breakfast?.cuisine,
          priceRange: breakfast?.priceRange,
        },
        {
          time: "09:30",
          name: morningAttraction?.name || `${city.name} erkunden`,
          type: "attraction",
          description: morningAttraction?.description || city.description,
          image: morningAttraction?.image || city.image,
          detail: morningAttraction,
          duration: morningAttraction?.duration,
        },
        {
          time: "12:30",
          name: lunch?.name || `Mittagessen in ${city.name}`,
          type: "restaurant",
          description: lunch?.description || "Regionale Spezialitäten probieren",
          image: lunch?.image,
          detail: lunch,
          cuisine: lunch?.cuisine,
          priceRange: lunch?.priceRange,
        },
        {
          time: "14:30",
          name: afternoonAttraction?.name || `Sehenswürdigkeiten in ${city.name}`,
          type: "attraction",
          description: afternoonAttraction?.description || `Die besten Spots in ${city.name}`,
          image: afternoonAttraction?.image || city.image,
          detail: afternoonAttraction,
          duration: afternoonAttraction?.duration,
        },
        {
          time: "19:00",
          name: dinner?.name || `Abendessen in ${city.name}`,
          type: "restaurant",
          description: dinner?.description || "Gemütliches Restaurant",
          image: dinner?.image,
          detail: dinner,
          cuisine: dinner?.cuisine,
          priceRange: dinner?.priceRange,
        },
      ];

      if (i < duration - 1) {
        stops.push({
          time: "21:00",
          name: `Weiterreise nach ${regionCities[(i + 1) % regionCities.length].name}`,
          type: "transit",
          description: "Mit dem Interrail-Zug",
        });
      }

      days.push({
        dayIndex: i,
        date: format(date, "EEEE, dd. MMMM", { locale: de }),
        city: city.name,
        cityImage: city.image,
        country: city.country,
        stops,
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
              <Badge variant="warm">{regionCities.length} Städte</Badge>
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
            {/* Day header with city image */}
            <div className="relative h-40 overflow-hidden">
              <Image
                src={day.cityImage}
                alt={day.city}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5">
                <p className="text-xs font-semibold text-[var(--color-warm-400)] uppercase tracking-wider mb-0.5">
                  Tag {day.dayIndex + 1}
                </p>
                <h3 className="text-xl font-bold text-white">
                  {day.city}, {day.country}
                </h3>
                <p className="text-sm text-white/70">{day.date}</p>
              </div>
            </div>

            {/* Stops timeline */}
            <div className="p-5">
              <div className="space-y-2">
                {day.stops.map((stop, idx) => (
                  <button
                    key={idx}
                    onClick={() =>
                      stop.type !== "transit" ? setSelectedStop(stop) : undefined
                    }
                    className={`w-full text-left flex gap-3 p-3 rounded-xl transition-all ${
                      stop.type !== "transit"
                        ? "hover:bg-[var(--color-surface-100)] cursor-pointer group"
                        : "cursor-default opacity-70"
                    }`}
                  >
                    {/* Time */}
                    <span className="text-xs font-mono font-semibold text-[var(--color-text-muted)] w-11 pt-1 flex-shrink-0">
                      {stop.time}
                    </span>

                    {/* Image thumbnail */}
                    {stop.image ? (
                      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 relative">
                        <Image
                          src={stop.image}
                          alt={stop.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          stop.type === "restaurant"
                            ? "bg-orange-50"
                            : stop.type === "transit"
                            ? "bg-blue-50"
                            : "bg-[var(--color-accent-50)]"
                        }`}
                      >
                        {stop.type === "transit" ? (
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#23377A" strokeWidth="1.5" strokeLinecap="round">
                            <rect x="4" y="3" width="16" height="14" rx="2" />
                            <path d="M9 21l3-6 3 6M12 3v14" />
                          </svg>
                        ) : stop.type === "restaurant" ? (
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E8A54B" strokeWidth="1.5" strokeLinecap="round">
                            <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
                          </svg>
                        ) : (
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-700)" strokeWidth="1.5" strokeLinecap="round">
                            <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                            <circle cx="12" cy="13" r="4" />
                          </svg>
                        )}
                      </div>
                    )}

                    {/* Stop info */}
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm text-[var(--color-primary-900)] truncate">
                          {stop.name}
                        </p>
                        {stop.type !== "transit" && (
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="var(--color-text-muted)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        )}
                      </div>
                      <p className="text-xs text-[var(--color-text-muted)] line-clamp-1">
                        {stop.description}
                      </p>
                      {/* Meta badges */}
                      <div className="flex gap-1.5 mt-1">
                        {stop.cuisine && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-50 text-orange-700 font-medium">
                            {stop.cuisine}
                          </span>
                        )}
                        {stop.priceRange && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-surface-100)] text-[var(--color-text-muted)] font-medium">
                            {stop.priceRange}
                          </span>
                        )}
                        {stop.duration && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-accent-50)] text-[var(--color-accent-800)] font-medium">
                            ~{stop.duration} Min
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
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
        <Link href="/plan" className="flex-1">
          <Button
            variant="outline"
            size="lg"
            onClick={reset}
            className="w-full"
          >
            Neu planen
          </Button>
        </Link>
      </div>

      {/* Stop Detail Modal */}
      <AnimatePresence>
        {selectedStop && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedStop(null)}
            />

            {/* Modal */}
            <motion.div
              className="relative w-full sm:max-w-lg bg-white sm:rounded-2xl rounded-t-2xl overflow-hidden max-h-[85vh] overflow-y-auto"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Image */}
              {selectedStop.image && (
                <div className="relative h-56 w-full">
                  <Image
                    src={selectedStop.image}
                    alt={selectedStop.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <button
                    onClick={() => setSelectedStop(null)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors cursor-pointer"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                  <div className="absolute bottom-4 left-5 right-5">
                    <div className="flex items-center gap-2 mb-1">
                      {selectedStop.type === "restaurant" ? (
                        <Badge variant="warm">Restaurant</Badge>
                      ) : (
                        <Badge variant="accent">Sehenswürdigkeit</Badge>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {selectedStop.name}
                    </h3>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {!selectedStop.image && (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-[var(--color-primary-900)]">
                        {selectedStop.name}
                      </h3>
                      <button
                        onClick={() => setSelectedStop(null)}
                        className="w-8 h-8 rounded-full bg-[var(--color-surface-100)] flex items-center justify-center hover:bg-[var(--color-surface-200)] transition-colors cursor-pointer"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  </>
                )}

                <p className="text-[var(--color-text-secondary)] leading-relaxed mb-5">
                  {selectedStop.description}
                </p>

                {/* Meta info */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {selectedStop.cuisine && (
                    <div className="flex items-center gap-2 text-sm">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-warm-500)" strokeWidth="2" strokeLinecap="round">
                        <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
                      </svg>
                      <span className="text-[var(--color-text-secondary)]">
                        {selectedStop.cuisine}
                      </span>
                    </div>
                  )}
                  {selectedStop.priceRange && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold text-[var(--color-accent-600)]">
                        {selectedStop.priceRange}
                      </span>
                      <span className="text-[var(--color-text-muted)]">
                        Preisklasse
                      </span>
                    </div>
                  )}
                  {selectedStop.duration && (
                    <div className="flex items-center gap-2 text-sm">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-400)" strokeWidth="2" strokeLinecap="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span className="text-[var(--color-text-secondary)]">
                        Ca. {selectedStop.duration} Minuten
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-400)" strokeWidth="2" strokeLinecap="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span className="text-[var(--color-text-secondary)]">
                      {selectedStop.time} Uhr
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={() => setSelectedStop(null)}
                >
                  Zurück zur Übersicht
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
