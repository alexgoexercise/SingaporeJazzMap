import Link from "next/link";

export default function VenueNotFound() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-cream">
        Venue not found
      </h1>
      <p className="mt-3 text-mist">
        This venue may not exist yet, or the listing hasn&apos;t been added.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-sm border border-brass/50 px-5 py-2.5 text-sm tracking-wide text-brass-light transition-colors hover:border-brass hover:text-brass"
      >
        Return to map
      </Link>
    </div>
  );
}
