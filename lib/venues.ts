import Fuse from "fuse.js";
import venuesData from "@/data/venues.json";
import type { Venue, VenueFilters } from "@/lib/types";

export const SINGAPORE_CENTER = { lat: 1.3521, lng: 103.8198 } as const;

export const GENRE_OPTIONS = [
  "bebop",
  "swing",
  "fusion",
  "blues",
  "vocal-jazz",
  "latin-jazz",
  "smooth-jazz",
  "free-jazz",
  "big-band",
] as const;

export const PRICE_PER_PAX_OPTIONS = [
  { value: "under-40", label: "Under $40" },
  { value: "40-80", label: "$40 – $80" },
  { value: "80-120", label: "$80 – $120" },
  { value: "120-plus", label: "$120+" },
] as const;

const fuse = new Fuse([] as Venue[], {
  keys: ["name", "neighborhood", "genres", "description"],
  threshold: 0.35,
});

export function getAllVenues(): Venue[] {
  return venuesData as Venue[];
}

export function getVenueBySlug(slug: string): Venue | undefined {
  return getAllVenues().find((venue) => venue.slug === slug);
}

export function filterVenues(filters: VenueFilters): Venue[] {
  const venues = getAllVenues();

  let results = venues;

  if (filters.q.trim()) {
    fuse.setCollection(venues);
    results = fuse.search(filters.q.trim()).map((result) => result.item);
  }

  if (filters.genres.length > 0) {
    results = results.filter((venue) =>
      filters.genres.some((genre) => venue.genres.includes(genre)),
    );
  }

  if (filters.pricePerPax) {
    results = results.filter(
      (venue) => venue.pricePerPax === filters.pricePerPax,
    );
  }

  return results;
}

export function formatGenre(genre: string): string {
  return genre
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatPricePerPax(value: string): string {
  const option = PRICE_PER_PAX_OPTIONS.find((item) => item.value === value);
  return option?.label ?? value;
}
