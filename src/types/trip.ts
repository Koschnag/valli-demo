export interface Trip {
  id: string;
  userId: string;
  title: string;
  regionId: string;
  startDate: string;
  endDate: string;
  moodProfileId?: string;
  status: "draft" | "planned" | "active" | "completed";
  days: TripDay[];
  createdAt: string;
  updatedAt: string;
}

export interface TripDay {
  id: string;
  tripId: string;
  dayIndex: number;
  date: string;
  city: string;
  stops: Stop[];
  notes?: string;
}

export interface Stop {
  id: string;
  tripDayId: string;
  orderIndex: number;
  type: "attraction" | "restaurant" | "transit" | "accommodation";
  name: string;
  description?: string;
  imageUrl?: string;
  latitude?: number;
  longitude?: number;
  startTime?: string;
  endTime?: string;
  metadata?: Record<string, unknown>;
}
