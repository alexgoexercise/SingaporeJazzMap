import type { VenueFilters } from "@/lib/types";
import {
  GENRE_OPTIONS,
  PRICE_PER_PAX_OPTIONS,
  formatGenre,
} from "@/lib/venues";

type VenueSearchProps = {
  filters: VenueFilters;
  onChange: (filters: VenueFilters) => void;
  resultCount: number;
};

export function VenueSearch({
  filters,
  onChange,
  resultCount,
}: VenueSearchProps) {
  function update(partial: Partial<VenueFilters>) {
    onChange({ ...filters, ...partial });
  }

  function toggleGenre(genre: string) {
    const genres = filters.genres.includes(genre)
      ? filters.genres.filter((g) => g !== genre)
      : [...filters.genres, genre];
    update({ genres });
  }

  function clearFilters() {
    onChange({ q: "", genres: [], pricePerPax: "" });
  }

  const hasActiveFilters =
    filters.q || filters.genres.length > 0 || filters.pricePerPax;

  return (
    <div className="space-y-5">
      <div>
        <label
          htmlFor="venue-search"
          className="mb-2 block text-xs tracking-[0.15em] text-mist uppercase"
        >
          Search
        </label>
        <input
          id="venue-search"
          type="search"
          placeholder="Search by name or description…"
          value={filters.q}
          onChange={(e) => update({ q: e.target.value })}
          className="w-full rounded-sm border border-slate-blue/50 bg-navy-deep px-3 py-3 text-base text-cream placeholder:text-mist/60 focus:border-brass focus:outline-none sm:py-2.5 sm:text-sm"
        />
      </div>

      <div>
        <p className="mb-2 text-xs tracking-[0.15em] text-mist uppercase">
          Genre
        </p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Genre filters">
          {GENRE_OPTIONS.map((genre) => {
            const selected = filters.genres.includes(genre);
            return (
              <button
                key={genre}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleGenre(genre)}
                className={`min-h-[40px] rounded-sm border px-3 py-2 text-sm tracking-wide transition-colors ${
                  selected
                    ? "border-brass bg-brass/20 text-brass-light"
                    : "border-slate-blue/50 bg-navy-deep text-mist hover:border-brass/50 hover:text-cream"
                }`}
              >
                {formatGenre(genre)}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label
          htmlFor="filter-price-per-pax"
          className="mb-2 block text-xs tracking-[0.15em] text-mist uppercase"
        >
          Price range / pax
        </label>
        <select
          id="filter-price-per-pax"
          value={filters.pricePerPax}
          onChange={(e) => update({ pricePerPax: e.target.value })}
          className="w-full rounded-sm border border-slate-blue/50 bg-navy-deep px-3 py-3 text-base text-cream focus:border-brass focus:outline-none sm:py-2.5 sm:text-sm"
        >
          <option value="">Any price</option>
          {PRICE_PER_PAX_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-3 min-[480px]:flex-row min-[480px]:items-center min-[480px]:justify-between">
        <span className="text-sm text-mist">
          {resultCount} venue{resultCount === 1 ? "" : "s"} found
        </span>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="min-h-[44px] shrink-0 tracking-wide text-brass-light transition-colors hover:text-brass"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
