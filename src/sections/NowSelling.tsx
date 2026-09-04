// src/sections/NowSelling.tsx
import { useEffect, useId, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Listing = {
  title: string;
  price: string;
  location: string;
  status: string;
  image?: string;
  offset?: string;
};

const listings: Listing[] = [
  {
    title: "Bliss Haven By Citi Builders",
    price: "N15M",
    location: "Obinze, Imo State",
    status: "Selling now",
    image: "/images/bliss.avif",
  },
  {
    title: "Rehoboth Gardens",
    price: "N2M",
    location: "Ejemekuru, Imo State",
    status: "Selling now",
    image: "/images/rehoboth.avif",
    offset: "lg:mt-36",
  },
  {
    title: "Dynamic View Estate",
    price: "N2M",
    location: "Agbura, Yenegoa",
    status: "Selling now",
    image: "/images/dynamicview.avif",
    offset: "lg:mt-14",
  },
];

function PlotPlaceholder({ label }: { label: string }) {
  const patternId = useId();
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#171310]">
      <svg className="absolute inset-0 h-full w-full text-[#E6A776]/[0.12]">
        <pattern id={patternId} width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M36 0H0V36" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
      <span className="relative z-10 max-w-[70%] text-center font-['JetBrains_Mono'] text-[10px] uppercase leading-relaxed tracking-[0.2em] text-[#E6A776]/50">
        Image pending
        <br />
        {label}
      </span>
    </div>
  );
}

function ListingCard({ item }: { item: Listing }) {
  const offsetClass = item.offset ? item.offset : "";

  return (
    <a href="/properties" data-reveal className={"group block " + offsetClass}>
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <PlotPlaceholder label={item.title} />
        )}

        <span className="absolute left-4 top-4 bg-[#0d0d0c]/70 px-3 py-1.5 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-[#f5f3ef] backdrop-blur-sm">
          {item.status}
        </span>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4 border-t border-[#f5f3ef]/10 pt-4">
        <div>
          <h3 className="font-['Manrope'] text-base font-semibold uppercase tracking-[0.02em] text-[#f5f3ef]">
            {item.title}
          </h3>
          <p className="mt-1 font-['Manrope'] text-sm text-[#f5f3ef]/50">
            {item.location}
          </p>
        </div>
        <span className="font-['JetBrains_Mono'] text-sm text-[#E6A776]">
          {item.price}
        </span>
      </div>
    </a>
  );
}

const NowSelling = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-reveal]", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 36,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0d0d0c] px-6 py-24 sm:px-8 sm:py-28 lg:px-[3.2vw] lg:py-32"
    >
      <div className="mb-16 flex flex-col justify-between gap-8 lg:mb-24 lg:flex-row lg:items-end">
        <div data-reveal>
          <p className="mb-5 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.3em] text-[#E6A776]">
            Our Properties
          </p>
          <h2 className="font-['Archivo_Black'] text-[14vw] leading-[0.9] tracking-[-0.03em] text-[#f5f3ef] sm:text-[10vw] lg:text-[6vw]">
            NOW
            <br />
            SELLING
          </h2>
        </div>

        <a
          href="/properties"
          data-reveal
          className="group inline-flex items-center gap-2 self-start font-['JetBrains_Mono'] text-[16px] uppercase tracking-[0.25em] text-[#E6A776] transition-colors duration-300 hover:text-[#f5f3ef] lg:self-auto"
        >
          All developments
          <ArrowUpRight
            size={15}
            strokeWidth={1.5}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </a>
      </div>

      <div className="grid grid-cols-1 gap-14 lg:grid-cols-3 lg:gap-8">
        {listings.map((item) => (
          <ListingCard key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
};

export default NowSelling;
