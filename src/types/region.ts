export interface Region {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  countries: string[];
  color: string;
  image: string;
  coordinates: [number, number]; // center [lat, lng]
  highlights: string[];
}

export interface City {
  id: string;
  name: string;
  country: string;
  regionId: string;
  coordinates: [number, number];
  description: string;
  image: string;
  attractions: Attraction[];
  avgDailyBudget: number;
}

export interface Attraction {
  id: string;
  name: string;
  cityId: string;
  type: "sight" | "museum" | "park" | "landmark" | "experience";
  description: string;
  image: string;
  duration: number; // in minutes
  price: number;
  coordinates: [number, number];
  tags: string[];
}
