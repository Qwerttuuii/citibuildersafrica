// src/pages/Properties.tsx
import { useId, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, SlidersHorizontal, X } from "lucide-react";
import PropertiesHero from "../sections/PropertiesHero";
import Footer from "../sections/Footer";
import { listings, type Listing } from "../sections/data/listings";

type LocationFilter = "All" | Listing["state"];
type TypeFilter = "All" | Listing["type"];
type PriceFilter = "any" | 1000000 | 2000000 | 4000000;

const locations: LocationFilter[] = ["All", "Imo", "Bayelsa", "Delta", "Akwa Ibom"];
const types: TypeFilter[] = ["All", "Residential", "Agro", "Commercial"];
const priceOptions: { label: string; value: PriceFilter }[] = [
  { label: "Any price", value: "any" },
  { label: "Under ₦1M", value: 1000000 },
  { label: "Under ₦2M", value: 2000000 },
  { label: "Under ₦4M", value: 4000000 },
];

// Standard documentation line shown on every listing. Swap this for a
// per-listing `documentation` field on the Listing type later if some
// developments ever need different wording.
const DEFAULT_DOCUMENTATION = "Surveyed & titled";

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`whitespace-nowrap rounded-md border px-4 py-2 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.15em] transition-colors duration-200 ${
        active
          ? "border-[#0d0d0c] bg-[#0d0d0c] text-[#F7F5F1]"
          : "border-[#0d0d0c]/20 text-[#0d0d0c]/60 hover:border-[#0d0d0c]/40"
      }`}
    >
      {children}
    </button>
  );
}

function ImagePlaceholder({ label }: { label: string }) {
  const patternId = useId();
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#171310]">
      <svg className="absolute inset-0 h-full w-full text-[#E6A776]/12">
        <pattern id={patternId} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
      <span className="relative z-10 max-w-[70%] px-2 text-center font-['JetBrains_Mono'] text-[9px] uppercase leading-relaxed tracking-[0.15em] text-[#E6A776]/50">
        Image pending
        <br />
        {label}
      </span>
    </div>
  );
}

function PropertyCard({ listing, highlight }: { listing: Listing; highlight: boolean }) {
  const shortLocation = listing.location.replace(/ State$/, "").toUpperCase();
  const typeLabel = `${listing.type.toUpperCase()} LAND`;

  return (
    <div className="flex flex-col">
      {/* IMAGE */}
      <div className="relative aspect-4/3 w-full overflow-hidden">
        {listing.image ? (
          <img
            src={listing.image}
            alt={listing.title}
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />
        ) : (
          <ImagePlaceholder label={listing.slug} />
        )}

        {/* legibility scrim for the bottom overlay text */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />

        <span className="absolute left-4 top-4 rounded-md bg-[#F7F5F1] px-3 py-1.5 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-[#0d0d0c]">
          {listing.status}
        </span>

        <span className="absolute bottom-4 left-4 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-white">
          {typeLabel}
        </span>

        <span className="absolute bottom-4 right-4 font-['Archivo_Black'] text-xl text-white">
          {listing.priceLabel}
        </span>
      </div>

      {/* META ROW */}
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.15em] text-[#E6A776]">
          {shortLocation}
        </span>
        <span className="whitespace-nowrap font-['Manrope'] text-xs text-[#0d0d0c]/45">
          {listing.priceLabel} / plot
        </span>
      </div>

      {/* TITLE */}
      <h3
        className={`mt-1 font-['Archivo_Black'] text-2xl uppercase leading-tight ${
          highlight ? "text-[#E6A776]" : "text-[#0d0d0c]"
        }`}
      >
        {listing.title}
      </h3>

      {/* DESCRIPTION */}
      <p className="mt-2 font-['Manrope'] text-sm leading-relaxed text-[#0d0d0c]/55">
        {listing.description}
      </p>

      <div className="mt-5 border-t border-[#0d0d0c]/10 pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.15em] text-[#0d0d0c]/40">
              Plot
            </p>
            <p className="mt-1 font-['Manrope'] text-sm font-semibold text-[#0d0d0c]">
              {listing.size}
            </p>
          </div>
          <div>
            <p className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.15em] text-[#0d0d0c]/40">
              Documentation
            </p>
            <p className="mt-1 font-['Manrope'] text-sm font-semibold text-[#0d0d0c]">
              {DEFAULT_DOCUMENTATION}
            </p>
          </div>
        </div>
      </div>

      <Link
        to={`/contact?development=${encodeURIComponent(listing.title)}`}
        className="group mt-5 flex items-center justify-between rounded-md border border-[#0d0d0c] bg-[#0d0d0c] px-5 py-3.5 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-[#F7F5F1] transition-all duration-300 hover:border-[#E6A776] hover:bg-[#E6A776] hover:text-[#0d0d0c]"
      >
        Book an inspection
        <ArrowUpRight
          size={14}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </Link>
    </div>
  );
}

function FilterGroup({
  label,
  options,
  active,
  onSelect,
}: {
  label: string;
  options: string[];
  active: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div>
      <span className="mb-2 block font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.15em] text-[#0d0d0c]/40">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <FilterPill key={opt} active={active === opt} onClick={() => onSelect(opt)}>
            {opt}
          </FilterPill>
        ))}
      </div>
    </div>
  );
}

const Properties = () => {
  const [location, setLocation] = useState<LocationFilter>("All");
  const [type, setType] = useState<TypeFilter>("All");
  const [priceCap, setPriceCap] = useState<PriceFilter>("any");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      if (location !== "All" && l.state !== location) return false;
      if (type !== "All" && l.type !== type) return false;
      if (priceCap !== "any" && l.priceValue > priceCap) return false;
      return true;
    });
  }, [location, type, priceCap]);

  const activeCount =
    (location !== "All" ? 1 : 0) + (type !== "All" ? 1 : 0) + (priceCap !== "any" ? 1 : 0);

  const resetFilters = () => {
    setLocation("All");
    setType("All");
    setPriceCap("any");
  };

  return (
    <main className="bg-[#F7F5F1]">
      <PropertiesHero />

      {/* FILTER BAR */}
      <div
        id="listings"
        className="sticky top-0 z-30 border-y border-[#0d0d0c]/10 bg-[#F7F5F1]/95 backdrop-blur"
      >
        {/* Mobile: compact trigger */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 sm:hidden">
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="flex items-center gap-2 rounded-md border border-[#0d0d0c] px-4 py-2.5 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.15em] text-[#0d0d0c]"
          >
            <SlidersHorizontal size={13} />
            Filters
            {activeCount > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#E6A776] font-['JetBrains_Mono'] text-[9px] text-[#0d0d0c]">
                {activeCount}
              </span>
            )}
          </button>
          <span className="whitespace-nowrap font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em] text-[#E6A776]">
            {String(filtered.length).padStart(2, "0")} plots
          </span>
        </div>

        {/* Desktop / tablet: full inline bar */}
        <div className="hidden flex-wrap items-center gap-x-10 gap-y-4 px-6 py-5 sm:flex sm:px-8 lg:px-[3.2vw]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.15em] text-[#0d0d0c]/40">
              Location
            </span>
            {locations.map((l) => (
              <FilterPill key={l} active={location === l} onClick={() => setLocation(l)}>
                {l}
              </FilterPill>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.15em] text-[#0d0d0c]/40">
              Type
            </span>
            {types.map((t) => (
              <FilterPill key={t} active={type === t} onClick={() => setType(t)}>
                {t}
              </FilterPill>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.15em] text-[#0d0d0c]/40">
              Price
            </span>
            {priceOptions.map((p) => (
              <FilterPill
                key={p.label}
                active={priceCap === p.value}
                onClick={() => setPriceCap(p.value)}
              >
                {p.label}
              </FilterPill>
            ))}
          </div>

          <span className="ml-auto whitespace-nowrap font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em] text-[#E6A776]">
            {String(filtered.length).padStart(2, "0")} plots
          </span>
        </div>
      </div>

      {/* MOBILE FILTER SHEET */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setFiltersOpen(false)}
            className="absolute inset-0 bg-black/50"
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-[#F7F5F1] px-6 pb-8 pt-4">
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#0d0d0c]/15" />

            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-['Archivo_Black'] text-lg uppercase text-[#0d0d0c]">
                Filters
              </h3>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                aria-label="Close"
                className="rounded-md p-1 text-[#0d0d0c]/60"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              <FilterGroup
                label="Location"
                options={locations}
                active={location}
                onSelect={(v) => setLocation(v as LocationFilter)}
              />
              <FilterGroup
                label="Type"
                options={types}
                active={type}
                onSelect={(v) => setType(v as TypeFilter)}
              />
              <div>
                <span className="mb-2 block font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.15em] text-[#0d0d0c]/40">
                  Price
                </span>
                <div className="flex flex-wrap gap-2">
                  {priceOptions.map((p) => (
                    <FilterPill
                      key={p.label}
                      active={priceCap === p.value}
                      onClick={() => setPriceCap(p.value)}
                    >
                      {p.label}
                    </FilterPill>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={resetFilters}
                className="flex-1 rounded-md border border-[#0d0d0c]/20 py-3.5 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em] text-[#0d0d0c]/60"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                className="flex-1 rounded-md bg-[#0d0d0c] py-3.5 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em] text-[#F7F5F1]"
              >
                Show {filtered.length} plots
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LISTINGS */}
      <div className="px-6 py-4 sm:px-8 lg:px-[3.2vw]">
        {filtered.length === 0 ? (
          <p className="py-24 text-center font-['Manrope'] text-sm text-[#0d0d0c]/50">
            No developments match these filters yet — try widening your
            search.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-x-10 gap-y-16 py-10 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((listing, i) => (
              <PropertyCard key={listing.slug} listing={listing} highlight={i % 3 === 2} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
};

export default Properties;