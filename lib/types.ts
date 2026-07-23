export type PricePerPax = "under-40" | "40-80" | "80-120" | "120-plus";

export type Venue = {
  slug: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  neighborhood: string;
  description: string;
  website?: string;
  genres: string[];
  pricePerPax: PricePerPax;
  imageUrl?: string;
};

export type VenueFilters = {
  q: string;
  genres: string[];
  pricePerPax: string;
};
