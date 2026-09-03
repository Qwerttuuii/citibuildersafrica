// src/sections/Thesis.tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const footprint = [
  { state: "Imo",  },
  { state: "Bayelsa",  },
  { state: "Delta", },
  { state: "Akwa Ibom" },
];

const claims = [
  {
    ref: "§1",
    title: "Title first",
    copy: "Every layout we release is surveyed, charted and cleared before a single plot is offered.",
  },
  {
    ref: "§2",
    title: "Priced to enter",
    copy: "Entry plots from ₦750,000 with instalment structures that don't punish the buyer.",
  },
  {
    ref: "§3",
    title: "Built, not brokered",
    copy: "We develop roads, drainage and perimeter works ourselves we are not a listing board.",
  },
];

const Thesis = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-reveal]", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 32,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
      });

      gsap.to("[data-seal]", {
        rotate: "+=360",
        duration: 140,
        repeat: -1,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F7F5F1] py-24 sm:py-28 lg:py-32"
    >
      {/* SEAL WATERMARK — signature element */}
      <svg
        data-seal
        viewBox="0 0 400 400"
        className="pointer-events-none absolute -right-24 top-1/2 hidden h-[520px] w-[520px] -translate-y-1/2 text-[#E6A776]/[0.14] lg:block"
      >
        <defs>
          <path
            id="sealArc"
            d="M 200,200 m -160,0 a 160,160 0 1,1 320,0 a 160,160 0 1,1 -320,0"
          />
        </defs>
        <circle cx="200" cy="200" r="160" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="1" />
        <text fill="currentColor" fontSize="18" letterSpacing="4" fontFamily="'JetBrains Mono', monospace">
          <textPath href="#sealArc" startOffset="0%">
            TITLE VERIFIED · SURVEYED · REGISTERED · TITLE VERIFIED · SURVEYED · REGISTERED ·
          </textPath>
        </text>
        <path
          d="M160 210 L190 240 L245 175"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="relative z-10 px-6 sm:px-8 lg:px-[3.2vw]">
        {/* FOOTPRINT LEDGER */}
        <div
          data-reveal
          className="mb-16 flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-[#0d0d0c]/10 pb-6 font-['JetBrains_Mono'] text-[19px] uppercase tracking-[0.2em] text-[#0d0d0c]/60 lg:mb-20"
        >
          <span className="text-[#0d0d0c]">Our Branches</span>
          {footprint.map((f) => (
            <span key={f.state} className="flex items-center gap-3">
              <span className="text-[#0d0d0c]/20">/</span>
              <span>{f.state}</span>
              <span className="hidden text-[#E6A776] sm:inline"></span>
            </span>
          ))}
        </div>

        {/* HEADLINE */}
        <div className="mb-16 max-w-[980px] lg:mb-20">
          <p
            data-reveal
            className="mb-6 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.3em] text-[#E6A776]"
          >
            Our thesis
          </p>
          <h2
            data-reveal
            className="font-['Archivo_Black'] text-[9vw] leading-[0.98] tracking-[-0.03em] text-[#0d0d0c] sm:text-[6.5vw] lg:text-[4vw]"
          >
            Most people don't lose money on land.{" "}
            <span className="text-[#E6A776]">They lose it on documents.</span>
          </h2>
        </div>

        {/* CLAIMS LEDGER */}
        <div
          data-reveal
          className="grid grid-cols-1 gap-10 border-t border-[#0d0d0c]/10 pt-10 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-[#0d0d0c]/10"
        >
          {claims.map((c) => (
            <div key={c.ref} className="lg:pl-10 lg:first:pl-0">
              <span className="font-['JetBrains_Mono'] text-sm text-[#E6A776]">
                {c.ref}
              </span>
              <h3 className="mt-3 font-['Manrope'] text-xl font-semibold text-[#0d0d0c]">
                {c.title}
              </h3>
              <p className="mt-3 max-w-[320px] text-sm leading-6 text-[#0d0d0c]/65">
                {c.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Thesis;