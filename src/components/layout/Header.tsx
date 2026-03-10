"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "@/components/ui/Button";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-[var(--color-surface-200)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-primary-900)] flex items-center justify-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-[var(--color-primary-900)]">
              Valli
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/plan"
              className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary-900)] transition-colors"
            >
              Reise planen
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary-900)] transition-colors"
            >
              Meine Reisen
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" size="sm">
                Anmelden
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm">Registrieren</Button>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[var(--color-surface-100)] transition-colors"
            aria-label="Menü"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="8" x2="20" y2="8" />
                  <line x1="4" y1="16" x2="20" y2="16" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-[var(--color-surface-200)] mt-2 pt-4">
            <nav className="flex flex-col gap-3">
              <Link
                href="/plan"
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-100)]"
              >
                Reise planen
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-100)]"
              >
                Meine Reisen
              </Link>
              <div className="flex gap-2 mt-2">
                <Link href="/auth/login" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    Anmelden
                  </Button>
                </Link>
                <Link href="/auth/signup" className="flex-1">
                  <Button size="sm" className="w-full">
                    Registrieren
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
