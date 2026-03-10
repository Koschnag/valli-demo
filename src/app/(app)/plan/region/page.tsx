"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import MapProvider from "@/components/map/MapProvider";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { regions } from "@/data/regions";
import { cities } from "@/data/cities";
import { useTripPlanStore } from "@/stores/tripPlanStore";
import type { FeatureCollection } from "geojson";

export default function RegionPage() {
  const { selectedRegionId, setRegion } = useTripPlanStore();
  const [geoData, setGeoData] = useState<FeatureCollection | null>(null);

  useEffect(() => {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
    fetch(`${basePath}/geo/europe-regions.geojson`)
      .then((r) => r.json())
      .then(setGeoData);
  }, []);

  const selectedRegion = regions.find((r) => r.id === selectedRegionId);
  const regionCities = cities.filter((c) => c.regionId === selectedRegionId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-primary-900)] tracking-tight mb-2">
          Region wählen
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          Klicke auf eine Region auf der Karte.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-6">
        {/* Map */}
        <div className="h-[400px] lg:h-[600px]">
          {geoData ? (
            <MapProvider
              geoData={geoData}
              selectedRegionId={selectedRegionId}
              onRegionSelect={setRegion}
            />
          ) : (
            <div className="w-full h-full rounded-2xl bg-[var(--color-surface-100)] animate-pulse" />
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {selectedRegion ? (
            <>
              <Card padding="none" className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={selectedRegion.image}
                    alt={selectedRegion.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h2 className="text-2xl font-bold text-white">
                      {selectedRegion.name}
                    </h2>
                    <p className="text-sm text-white/80">
                      {selectedRegion.countries.join(" · ")}
                    </p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed">
                    {selectedRegion.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {selectedRegion.highlights.map((h) => (
                      <Badge key={h} variant="accent">
                        {h}
                      </Badge>
                    ))}
                  </div>
                  <Link href="/plan/schedule">
                    <Button className="w-full">
                      Weiter zum Zeitraum
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
              </Card>

              {/* Cities in region */}
              {regionCities.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
                    Städte in dieser Region
                  </h3>
                  <div className="space-y-2">
                    {regionCities.map((city) => (
                      <Card
                        key={city.id}
                        padding="sm"
                        hover
                        className="flex items-center gap-3"
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 relative">
                          <Image
                            src={city.image}
                            alt={city.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-[var(--color-primary-900)]">
                            {city.name}
                          </p>
                          <p className="text-xs text-[var(--color-text-muted)]">
                            {city.country} · ~{city.avgDailyBudget}€/Tag
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <Card padding="lg" className="text-center">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-text-muted)"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="mx-auto mb-4"
              >
                <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <h3 className="font-semibold text-[var(--color-primary-900)] mb-1">
                Wähle eine Region
              </h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                Klicke auf einen markierten Bereich auf der Karte, um Details zu
                sehen.
              </p>

              {/* Quick select */}
              <div className="mt-6 space-y-2">
                {regions.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => setRegion(region.id)}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium hover:bg-[var(--color-surface-100)] transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: region.color }}
                    />
                    {region.name}
                  </button>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
