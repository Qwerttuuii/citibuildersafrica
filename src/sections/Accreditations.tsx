// src/sections/Accreditations.tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Credential = {
  year: string;
  title: string;
  subtitle: string;
  ref: string;
  featured?: boolean;
};

// Names and reference numbers are placeholders — confirm actual
// certificates with management before this goes live.
const credentials: Credential[] = [
  {
    year: "2021",
    title: "Corporate Affairs Commission",
    subtitle: "Registered company — Uvanka Company Limited",
    ref: "RC 12345678",
  },
  {
    year: "2022",
    title: "Estate Surveyors & Valuers Registration",
    subtitle: "Survey plan verification & valuation standards",
    ref: "ESV/ABJ/22/XXXX",
  },
  {
    year: "2023",
    title: "Real Estate Developers Association",
    subtitle: "Ethical development & client-protection code",
    ref: "REDAN/S/S-XXXX",
    featured: true,
  },
  {
    year: "2024",
    title: "State Ministry of Lands",
    subtitle: "Title processing & land-use compliance",
    ref: "ML/IMO/2024/XXXX",
  },
];

const Accreditations = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to("[data-reveal]", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0d0d0c] px-6 py-20 sm:px-8 sm:py-24 lg:px-[3.2vw] lg:py-28"
    >
      {/* HEADER — single row, no dead column */}
      <div
        data-reveal
        className="mb-14 flex translate-y-6 flex-col gap-4 opacity-0 lg:mb-16 lg:flex-row lg:items-end lg:justify-between"
      >
        <h2 className="font-['Archivo_Black'] text-[9vw] leading-[0.95] tracking-[-0.02em] text-[#f5f3ef] sm:text-[6vw] lg:text-[3vw]">
          Licences &<br className="lg:hidden" /> accreditations.
        </h2>
        <p className="max-w-[360px] font-['Manrope'] text-sm leading-7 text-white/50">
          Verified standing with the bodies that regulate land, survey and
          corporate practice in Nigeria.
        </p>
      </div>

      {/* CREDENTIAL CARDS */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {credentials.map((c) => (
          <div
            key={c.title}
            data-reveal
            className={`relative flex translate-y-6 flex-col overflow-hidden p-7 opacity-0 transition-transform duration-300 hover:-translate-y-1 ${
              c.featured ? "bg-[#E6A776]" : "bg-white/[0.04] ring-1 ring-white/10"
            }`}
          >
            {/* Ghost year watermark */}
            <span
              className={`pointer-events-none absolute -bottom-6 -right-3 select-none font-['Archivo_Black'] text-[7rem] leading-none ${
                c.featured ? "text-[#0d0d0c]/10" : "text-white/[0.04]"
              }`}
            >
              {c.year}
            </span>

            {/* Seal badge — overlaps the top-right corner */}
            <span
              className={`absolute -right-3 -top-3 flex h-12 w-12 items-center justify-center rounded-full shadow-lg ${
                c.featured ? "bg-[#0d0d0c]" : "bg-[#E6A776]"
              }`}
            >
              <Check
                size={20}
                strokeWidth={3}
                className={c.featured ? "text-[#E6A776]" : "text-[#0d0d0c]"}
              />
            </span>

            <span
              className={`relative z-10 font-['JetBrains_Mono'] text-sm ${
                c.featured ? "text-[#0d0d0c]/60" : "text-[#E6A776]"
              }`}
            >
              {c.year}
            </span>

            <h3
              className={`relative z-10 mt-4 font-['Archivo_Black'] text-xl leading-tight ${
                c.featured ? "text-[#0d0d0c]" : "text-[#f5f3ef]"
              }`}
            >
              {c.title}
            </h3>

            <p
              className={`relative z-10 mt-3 font-['Manrope'] text-sm leading-6 ${
                c.featured ? "text-[#0d0d0c]/70" : "text-white/50"
              }`}
            >
              {c.subtitle}
            </p>

            <span
              className={`relative z-10 mt-6 inline-block w-fit px-3 py-1.5 font-['JetBrains_Mono'] text-[11px] ${
                c.featured
                  ? "bg-[#0d0d0c]/10 text-[#0d0d0c]/70"
                  : "bg-white/5 text-white/50"
              }`}
            >
              Ref: {c.ref}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-10 font-['Manrope'] text-xs italic text-white/30">
        * Accreditation names and reference numbers are placeholders — confirm
        actual certificates with management.
      </p>
    </section>
  );
};

export default Accreditations;