import type { Media } from "./media";
import type { Booking } from "./booking";

export interface VenueMeta {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
}

export interface VenueLocation {
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
  lat: number;
  lng: number;
}

export interface VenueOwner {
  name: string;
  email: string;
  avatar: Media;
  banner: Media;
}

export interface Venue {
  id: string;
  name: string;
  description: string;
  media: Media[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: VenueMeta;
  location: VenueLocation;
  owner?: VenueOwner;
  bookings?: Booking[];
}
