import type { Venue } from "@/lib/types";
import { formatGenre, formatPricePerPax } from "@/lib/venues";
import Link from "next/link";

type VenueCardProps = {
  venue: Venue;
  isSelected?: boolean;
  onSelect?: () => void;
};

export function VenueCard({ venue, isSelected, onSelect }: VenueCardProps) {
  return (
    <article
      className={`rounded-sm border p-4 transition-all ${
        isSelected
          ? "border-brass bg-navy shadow-md"
          : "border-slate-blue/30 bg-navy/60 hover:border-brass/50 hover:bg-navy"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <button
          type="button"
          onClick={onSelect}
          className="min-h-[44px] min-w-0 flex-1 text-left"
        >
          <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-cream">
            {venue.name}
          </h3>
          <p className="mt-1 text-sm text-mist">{venue.neighborhood}</p>
        </button>
        <span className="shrink-0 text-right text-sm text-brass-light">
          {formatPricePerPax(venue.pricePerPax)}
          <span className="block text-xs text-mist">/ pax</span>
        </span>
      </div>

      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-parchment/90">
        {venue.description}
      </p>

      {venue.genres.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {venue.genres.map((genre) => (
            <span
              key={genre}
              className="rounded-sm border border-slate-blue/40 px-2 py-0.5 text-xs tracking-wide text-mist uppercase"
            >
              {formatGenre(genre)}
            </span>
          ))}
        </div>
      )}

      <Link
        href={`/venues/${venue.slug}`}
        className="mt-4 inline-flex min-h-[44px] items-center text-sm tracking-wide text-brass-light transition-colors hover:text-brass"
      >
        View details →
      </Link>
    </article>
  );
}
