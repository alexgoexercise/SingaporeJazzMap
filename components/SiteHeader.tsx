import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-blue/40 bg-navy/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link href="/" className="group flex min-w-0 flex-col gap-0.5">
          <span className="truncate font-[family-name:var(--font-playfair)] text-lg font-semibold tracking-wide text-cream sm:text-2xl">
            SG Jazz Map
          </span>
          <span className="text-xs tracking-[0.2em] text-mist uppercase sm:text-sm">
            Singapore
          </span>
        </Link>
        <nav className="text-sm tracking-wide text-mist">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center transition-colors hover:text-brass-light"
          >
            Map
          </Link>
        </nav>
      </div>
    </header>
  );
}
