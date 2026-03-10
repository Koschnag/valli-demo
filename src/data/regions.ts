import { Region } from "@/types/region";

export const regions: Region[] = [
  {
    id: "scandinavia",
    name: "Skandinavien",
    nameEn: "Scandinavia",
    description:
      "Fjorde, Nordlichter und modernste Städte. Erlebe die raue Schönheit des Nordens.",
    countries: ["Norwegen", "Schweden", "Dänemark", "Finnland"],
    color: "#2D6B4F",
    image: "https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?w=800&q=80",
    coordinates: [63.0, 15.0],
    highlights: ["Fjorde", "Stockholm", "Kopenhagen", "Nordlichter"],
  },
  {
    id: "western-europe",
    name: "Westeuropa",
    nameEn: "Western Europe",
    description:
      "Paris, Amsterdam, Brüssel — Weltklasse-Kultur und kulinarische Vielfalt.",
    countries: ["Frankreich", "Belgien", "Niederlande", "Luxemburg"],
    color: "#1C2D66",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    coordinates: [48.5, 3.0],
    highlights: ["Paris", "Amsterdam", "Brügge", "Loiretal"],
  },
  {
    id: "central-europe",
    name: "Mitteleuropa",
    nameEn: "Central Europe",
    description:
      "Historische Städte, Bierkultur und beeindruckende Architektur.",
    countries: ["Deutschland", "Österreich", "Schweiz", "Tschechien"],
    color: "#23377A",
    image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800&q=80",
    coordinates: [49.0, 11.0],
    highlights: ["Wien", "Prag", "München", "Zürich"],
  },
  {
    id: "iberian",
    name: "Iberische Halbinsel",
    nameEn: "Iberian Peninsula",
    description:
      "Sonne, Tapas und Flamenco. Temperamentvolle Städte und endlose Küsten.",
    countries: ["Spanien", "Portugal"],
    color: "#E8A54B",
    image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&q=80",
    coordinates: [40.0, -4.0],
    highlights: ["Barcelona", "Lissabon", "Madrid", "Porto"],
  },
  {
    id: "italian",
    name: "Italienische Halbinsel",
    nameEn: "Italian Peninsula",
    description:
      "Dolce Vita — Kunst, Geschichte und die beste Küche der Welt.",
    countries: ["Italien"],
    color: "#4E936F",
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80",
    coordinates: [42.5, 12.5],
    highlights: ["Rom", "Florenz", "Venedig", "Amalfiküste"],
  },
  {
    id: "balkans",
    name: "Balkan",
    nameEn: "Balkans",
    description:
      "Unentdeckte Perlen, atemberaubende Küsten und lebendige Geschichte.",
    countries: [
      "Kroatien",
      "Serbien",
      "Bosnien",
      "Montenegro",
      "Griechenland",
      "Albanien",
    ],
    color: "#3A8464",
    image: "https://images.unsplash.com/photo-1555990538-1085d1e45b98?w=800&q=80",
    coordinates: [42.0, 20.0],
    highlights: ["Dubrovnik", "Athen", "Kotor", "Mostar"],
  },
  {
    id: "eastern-europe",
    name: "Osteuropa",
    nameEn: "Eastern Europe",
    description:
      "Prächtige Paläste, lebendige Märkte und herzliche Gastfreundschaft.",
    countries: ["Polen", "Ungarn", "Rumänien", "Bulgarien", "Slowakei"],
    color: "#162451",
    image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800&q=80",
    coordinates: [48.0, 22.0],
    highlights: ["Budapest", "Krakau", "Bukarest", "Bratislava"],
  },
  {
    id: "baltic",
    name: "Baltikum",
    nameEn: "Baltic States",
    description:
      "Mittelalterliche Altstädte, digitale Innovation und unberührte Natur.",
    countries: ["Estland", "Lettland", "Litauen"],
    color: "#0F1B3D",
    image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80",
    coordinates: [57.0, 24.0],
    highlights: ["Tallinn", "Riga", "Vilnius", "Kurische Nehrung"],
  },
  {
    id: "british-isles",
    name: "Britische Inseln",
    nameEn: "British Isles",
    description:
      "Von London über Edinburgh bis Dublin — Geschichte trifft Moderne.",
    countries: ["Großbritannien", "Irland"],
    color: "#5A73B5",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
    coordinates: [54.0, -3.0],
    highlights: ["London", "Edinburgh", "Dublin", "Cotswolds"],
  },
];
