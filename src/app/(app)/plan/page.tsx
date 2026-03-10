"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useTripPlanStore } from "@/stores/tripPlanStore";

const steps = [
  {
    title: "Mood entdecken",
    description: "Finde heraus, wonach dir der Sinn steht.",
    href: "/plan/mood",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    color: "var(--color-warm-500)",
  },
  {
    title: "Region wählen",
    description: "Wähle dein Ziel auf der interaktiven Karte.",
    href: "/plan/region",
    icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
    color: "var(--color-accent-500)",
  },
  {
    title: "Zeitraum festlegen",
    description: "Startdatum und Reisedauer wählen.",
    href: "/plan/schedule",
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    color: "var(--color-primary-500)",
  },
  {
    title: "Reise ansehen",
    description: "Deine personalisierte Route mit Stops.",
    href: "/plan/review",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
    color: "var(--color-accent-700)",
  },
];

export default function PlanPage() {
  const { moodProfile, selectedRegionId, startDate } = useTripPlanStore();

  const getStepStatus = (index: number) => {
    if (index === 0 && moodProfile) return "done";
    if (index === 1 && selectedRegionId) return "done";
    if (index === 2 && startDate) return "done";
    if (index === 3 && moodProfile && selectedRegionId && startDate)
      return "ready";
    return "pending";
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary-900)] tracking-tight mb-3">
          Reise planen
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)]">
          Schritt für Schritt zu deinem perfekten Interrail-Trip.
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          return (
            <Link key={step.href} href={step.href}>
              <Card
                hover
                padding="none"
                className="flex items-center gap-5 p-5 group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
                  style={{
                    backgroundColor:
                      status === "done"
                        ? "var(--color-accent-100)"
                        : "var(--color-surface-100)",
                  }}
                >
                  {status === "done" ? (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--color-accent-700)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={step.color}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={step.icon} />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[var(--color-primary-900)] group-hover:text-[var(--color-accent-700)] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {step.description}
                  </p>
                </div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-text-muted)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="flex-shrink-0 group-hover:translate-x-1 transition-transform"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
