import Link from "next/link";
import { notFound } from "next/navigation";
import { formatGenre, formatPricePerPax, getVenueBySlug } from "@/lib/venues";

type VenuePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: VenuePageProps) {
  const { slug } = await params;
  const venue = getVenueBySlug(slug);

  if (!venue) {
    return { title: "Venue not found — SG Jazz Map" };
  }

  return {
    title: `${venue.name} — SG Jazz Map`,
    description: venue.description,
  };
}

export default async function VenuePage({ params }: VenuePageProps) {
  const { slug } = await params;
  const venue = getVenueBySlug(slug);

  if (!venue) {
    notFound();
  }

  return (
    <article className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:px-6 sm:py-12">
      <Link
        href="/"
        className="inline-flex min-h-[44px] items-center gap-1 text-sm tracking-wide text-brass-light transition-colors hover:text-brass"
      >
        ← Back to map
      </Link>

      <header className="mt-6 border-b border-slate-blue/40 pb-8">
        <p className="text-sm tracking-[0.2em] text-mist uppercase">
          {venue.neighborhood}
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-playfair)] text-3xl font-semibold text-cream sm:text-4xl lg:text-5xl">
          {venue.name}
        </h1>
        <div className="mt-4 flex flex-col gap-2 text-sm text-mist sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <span>{formatPricePerPax(venue.pricePerPax)} / pax</span>
          <span className="hidden sm:inline" aria-hidden>
            ·
          </span>
          <address className="not-italic">{venue.address}</address>
        </div>
      </header>

      <div className="mt-8 space-y-8">
        <section>
          <h2 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-cream">
            About
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-parchment">
            {venue.description}
          </p>
        </section>

        {venue.genres.length > 0 && (
          <section>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-cream">
              Genre
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {venue.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-sm border border-slate-blue/40 px-3 py-1 text-sm tracking-wide text-mist uppercase"
                >
                  {formatGenre(genre)}
                </span>
              ))}
            </div>
          </section>
        )}

        {venue.website && (
          <section>
            <a
              href={venue.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm border border-brass/50 bg-navy px-5 py-2.5 text-sm tracking-wide text-brass-light transition-colors hover:border-brass hover:bg-slate-blue/30"
            >
              Visit website
              <span aria-hidden>↗</span>
            </a>
          </section>
        )}
      </div>
    </article>
  );
}
