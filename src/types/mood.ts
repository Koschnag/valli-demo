export type MoodCategory =
  | "adventure"
  | "relaxation"
  | "culture"
  | "nightlife"
  | "gastronomy"
  | "nature"
  | "history"
  | "romance";

export interface MoodCard {
  id: string;
  category: MoodCategory;
  title: string;
  description: string;
  image: string;
  emoji: string;
}

export interface MoodProfile {
  id?: string;
  userId?: string;
  adventure: number;
  relaxation: number;
  culture: number;
  nightlife: number;
  gastronomy: number;
  nature: number;
  history: number;
  romance: number;
}

export type SwipeDirection = "left" | "right" | "up";
