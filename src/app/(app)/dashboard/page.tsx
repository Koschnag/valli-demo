"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { regions } from "@/data/regions";

// Demo trips for display
const demoTrips = [
  {
    id: "1",
    title: "Skandinavien Abenteuer",
    regionId: "scandinavia",
    startDate: "2026-06-15",
    endDate: "2026-06-24",
    status: "planned" as const,
    days: 10,
  },
  {
    id: "2",
    title: "Balkan Roadtrip",
    regionId: "balkans",
    startDate: "2026-08-01",
    endDate: "2026-08-08",
    status: "draft" as const,
    days: 7,
  },
];

const statusLabels = {
  draft: { label: "Entwurf", variant: "outline" as const },
  planned: { label: "Geplant", variant: "accent" as const },
  active: { label: "Aktiv", variant: "warm" as const },
  completed: { label: "Abgeschlossen", variant: "default" as const },
};

export default function DashboardPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-primary-900)] tracking-tight">
            Meine Reisen
          </h1>
          <p className="text-[var(--color-text-secondary)] mt-1">
            Verwalte deine geplanten Interrail-Trips.
          </p>
        </div>
        <Link href="/plan">
          <Button>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Neue Reise
          </Button>
        </Link>
      </div>

      {demoTrips.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-6">
          {demoTrips.map((trip) => {
            const region = regions.find((r) => r.id === trip.regionId);
            const status = statusLabels[trip.status];
            return (
              <Card key={trip.id} hover padding="none" className="group">
                <div className="relative h-40 overflow-hidden">
                  {region && (
                    <Image
                      src={region.image}
                      alt={trip.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-lg font-bold text-white">
                      {trip.title}
                    </h3>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-4 text-sm text-[var(--color-text-secondary)]">
                    <span className="flex items-center gap-1">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {trip.startDate}
                    </span>
                    <span>{trip.days} Tage</span>
                    <span>{region?.name}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card padding="lg" className="text-center">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-surface-300)"
            strokeWidth="1"
            className="mx-auto mb-4"
          >
            <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          <h3 className="text-xl font-bold text-[var(--color-primary-900)] mb-2">
            Noch keine Reisen
          </h3>
          <p className="text-[var(--color-text-secondary)] mb-6 max-w-sm mx-auto">
            Plane deine erste Interrail-Reise und entdecke Europa mit dem Zug.
          </p>
          <Link href="/plan">
            <Button size="lg">Erste Reise planen</Button>
          </Link>
        </Card>
      )}
    </div>
  );
}
