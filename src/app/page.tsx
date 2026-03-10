import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Header from "@/components/layout/Header";
import { regions } from "@/data/regions";

export default function Home() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[var(--color-primary-900)]">
          <Image
            src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&q=80"
            alt="Europa Landschaft"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary-900)]/60 via-transparent to-[var(--color-primary-900)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-2xl">
            <Badge variant="warm" className="mb-6">
              Interrail Reiseplaner
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6">
              Deine Reise
              <br />
              <span className="text-[var(--color-warm-400)]">beginnt hier.</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 mb-10 max-w-lg leading-relaxed">
              Entdecke Europa mit dem Zug. Wähle deine Region, finde
              Sehenswürdigkeiten und plane Tagesausflüge — alles an einem Ort.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/plan">
                <Button variant="warm" size="lg">
                  Reise planen
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Button>
              </Link>
              <Link href="/plan/mood">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white hover:bg-white/10"
                >
                  Mood entdecken
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary-900)] tracking-tight mb-4">
              So einfach geht&apos;s
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-md mx-auto">
              In drei Schritten zu deiner perfekten Interrail-Reise.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: "01",
                title: "Mood wählen",
                desc: "Swipe durch Kategorien und finde heraus, worauf du Lust hast.",
                icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
              },
              {
                step: "02",
                title: "Region entdecken",
                desc: "Klicke auf die Karte und wähle dein Wunschziel in Europa.",
                icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
              },
              {
                step: "03",
                title: "Tour planen",
                desc: "Lege Start, Dauer und Zwischenstopps fest — fertig!",
                icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
              },
            ].map((item) => (
              <div key={item.step} className="text-center group">
                <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary-50)] flex items-center justify-center mx-auto mb-6 group-hover:bg-[var(--color-primary-100)] transition-colors">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--color-primary-700)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={item.icon} />
                  </svg>
                </div>
                <div className="text-xs font-semibold tracking-widest text-[var(--color-accent-500)] uppercase mb-2">
                  Schritt {item.step}
                </div>
                <h3 className="text-xl font-bold text-[var(--color-primary-900)] mb-2">
                  {item.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regions Preview */}
      <section className="py-20 lg:py-28 bg-[var(--color-surface-50)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary-900)] tracking-tight mb-2">
                Regionen entdecken
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)]">
                Wähle deinen Teil Europas.
              </p>
            </div>
            <Link href="/plan/region">
              <Button variant="outline" size="sm">
                Alle anzeigen
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.slice(0, 6).map((region) => (
              <Link key={region.id} href={`/plan/region?select=${region.id}`}>
                <Card hover padding="none" className="group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={region.image}
                      alt={region.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {region.name}
                      </h3>
                      <p className="text-sm text-white/80">
                        {region.countries.join(" · ")}
                      </p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-3">
                      {region.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {region.highlights.map((h) => (
                        <Badge key={h} variant="outline">
                          {h}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-[var(--color-primary-900)] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Bereit für dein Abenteuer?
          </h2>
          <p className="text-lg text-white/60 mb-10 max-w-md mx-auto">
            Starte jetzt und plane deine unvergessliche Interrail-Reise durch
            Europa.
          </p>
          <Link href="/plan">
            <Button variant="warm" size="lg">
              Jetzt loslegen
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[var(--color-primary-900)] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center">
                <svg
                  width="14"
                  height="14"
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
              <span className="text-sm font-semibold text-white/60">
                Valli
              </span>
            </div>
            <p className="text-xs text-white/40">
              &copy; {new Date().getFullYear()} Valli. Dein Interrail-Planer.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
