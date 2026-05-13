import type { Venue } from "./venue";

export interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venue?: Venue;
  customer?: {
    name: string;
    email: string;
  };
}
