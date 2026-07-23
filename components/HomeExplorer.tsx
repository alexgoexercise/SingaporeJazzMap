"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { EmptyState } from "@/components/EmptyState";
import { VenueCard } from "@/components/VenueCard";
import { VenueSearch } from "@/components/VenueSearch";
import type { VenueFilters } from "@/lib/types";
import { filterVenues } from "@/lib/venues";

const JazzMap = dynamic(
  () => import("@/components/JazzMap").then((mod) => mod.JazzMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[280px] items-center justify-center rounded-sm border border-slate-blue/30 bg-navy/60">
        <p className="text-sm tracking-wide text-mist">Loading map…</p>
      </div>
    ),
  },
);

const EMPTY_FILTERS: VenueFilters = {
  q: "",
  genres: [],
  pricePerPax: "",
};

type MobileView = "map" | "list";

export function HomeExplorer() {
  const [filters, setFilters] = useState<VenueFilters>(EMPTY_FILTERS);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<MobileView>("map");

  const filteredVenues = useMemo(() => filterVenues(filters), [filters]);

  function handleVenueSelect(slug: string) {
    setSelectedSlug(slug);
    setMobileView("map");
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="border-b border-slate-blue/40 bg-navy/60 lg:hidden">
        <div
          className="mx-auto flex max-w-7xl gap-1 px-4 py-2 sm:px-6"
          role="tablist"
          aria-label="Map and venue list"
        >
          <MobileTab
            active={mobileView === "map"}
            onClick={() => setMobileView("map")}
            label="Map"
          />
          <MobileTab
            active={mobileView === "list"}
            onClick={() => setMobileView("list")}
            label="Venues"
            badge={filteredVenues.length}
          />
        </div>
      </div>

      <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col gap-4 px-4 py-4 sm:gap-6 sm:px-6 sm:py-6 lg:flex-row lg:gap-6 lg:py-8">
        <aside
          className={`min-h-0 w-full flex-col gap-5 sm:gap-6 lg:flex lg:w-[380px] lg:shrink-0 ${
            mobileView === "list" ? "flex flex-1" : "hidden"
          }`}
        >
          <div className="shrink-0">
            <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold tracking-tight text-cream sm:text-3xl lg:text-4xl">
              Find Jazz in Singapore
            </h1>
            <p className="mt-2 text-base leading-relaxed text-mist sm:text-lg">
              Explore live music venues across the island — search by name,
              genre, or price.
            </p>
          </div>

          <div className="shrink-0">
            <VenueSearch
              filters={filters}
              onChange={setFilters}
              resultCount={filteredVenues.length}
            />
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain pr-1 lg:max-h-none">
            {filteredVenues.length === 0 ? (
              <EmptyState
                title="No venues yet"
                description="Venue listings are coming soon. The map and search are ready — add entries to data/venues.json when you're set."
              />
            ) : (
              filteredVenues.map((venue) => (
                <VenueCard
                  key={venue.slug}
                  venue={venue}
                  isSelected={venue.slug === selectedSlug}
                  onSelect={() => handleVenueSelect(venue.slug)}
                />
              ))
            )}
          </div>
        </aside>

        <section
          className={`min-h-0 overflow-hidden rounded-sm border border-slate-blue/40 ${
            mobileView === "map"
              ? "flex h-[min(52dvh,440px)] shrink-0 sm:h-[min(56dvh,480px)]"
              : "hidden"
          } lg:flex lg:h-auto lg:min-h-[calc(100dvh-10rem)] lg:flex-1`}
        >
          <JazzMap
            venues={filteredVenues}
            selectedSlug={selectedSlug}
            onMarkerSelect={handleVenueSelect}
          />
        </section>
      </div>
    </div>
  );
}

function MobileTab({
  active,
  onClick,
  label,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  badge?: number;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`flex flex-1 items-center justify-center gap-2 rounded-sm px-4 py-3 text-sm tracking-wide transition-colors ${
        active
          ? "bg-slate-blue/40 text-cream"
          : "text-mist hover:bg-navy hover:text-cream"
      }`}
    >
      {label}
      {badge !== undefined && (
        <span
          className={`rounded-full px-2 py-0.5 text-xs ${
            active ? "bg-brass/30 text-brass-light" : "bg-navy-deep text-mist"
          }`}
        >
          {badge}
        </span>
      )}
    </button>
  );
}
