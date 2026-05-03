import type { Media } from "./media";

export interface Profile {
  name: string;
  email: string;
  bio: string | null;
  avatar: Media;
  banner: Media;
  venueManager: boolean;
  _count?: {
    venues: number;
    bookings: number;
  };
}
