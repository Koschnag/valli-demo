"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Supabase auth
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-surface-50)] px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-900)] flex items-center justify-center">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-[var(--color-primary-900)]">
              Valli
            </span>
          </Link>
        </div>

        <Card padding="lg">
          <h1 className="text-2xl font-bold text-[var(--color-primary-900)] mb-1">
            Konto erstellen
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)] mb-6">
            Plane und speichere deine Interrail-Reisen.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="name"
              label="Name"
              type="text"
              placeholder="Dein Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              id="email"
              label="E-Mail"
              type="email"
              placeholder="deine@email.de"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              id="password"
              label="Passwort"
              type="password"
              placeholder="Mind. 8 Zeichen"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={loading}
            >
              {loading ? "Wird erstellt..." : "Registrieren"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[var(--color-text-secondary)]">
              Bereits registriert?{" "}
              <Link
                href="/auth/login"
                className="font-semibold text-[var(--color-accent-600)] hover:text-[var(--color-accent-800)]"
              >
                Anmelden
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
