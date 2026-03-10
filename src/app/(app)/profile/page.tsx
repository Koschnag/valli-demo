"use client";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function ProfilePage() {
  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold text-[var(--color-primary-900)] tracking-tight mb-8">
        Profil
      </h1>

      <Card padding="lg">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center">
            <span className="text-2xl font-bold text-[var(--color-primary-700)]">
              V
            </span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[var(--color-primary-900)]">
              Valli Reisender
            </h2>
            <p className="text-sm text-[var(--color-text-muted)]">
              reisender@valli.app
            </p>
          </div>
        </div>

        <form className="space-y-4">
          <Input
            id="display-name"
            label="Anzeigename"
            defaultValue="Valli Reisender"
          />
          <Input
            id="profile-email"
            label="E-Mail"
            type="email"
            defaultValue="reisender@valli.app"
            disabled
          />

          <div className="pt-4 flex gap-3">
            <Button className="flex-1">Speichern</Button>
            <Button variant="outline" className="flex-1">
              Abmelden
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
