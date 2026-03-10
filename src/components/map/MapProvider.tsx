"use client";

import dynamic from "next/dynamic";
import type { FeatureCollection } from "geojson";

const EuropeMap = dynamic(() => import("./EuropeMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-2xl bg-[var(--color-surface-100)] animate-pulse flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-text-muted)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        <span className="text-sm text-[var(--color-text-muted)]">
          Karte wird geladen...
        </span>
      </div>
    </div>
  ),
});

interface MapProviderProps {
  geoData: FeatureCollection;
  selectedRegionId: string | null;
  onRegionSelect: (regionId: string) => void;
}

export default function MapProvider(props: MapProviderProps) {
  return <EuropeMap {...props} />;
}
