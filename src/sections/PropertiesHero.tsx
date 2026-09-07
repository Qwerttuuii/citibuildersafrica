// src/sections/PropertiesHero.tsx
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { listings } from "./data/listings";

const PropertiesHero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const statRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  const plotCount = listings.length;
  const startingPrice = useMemo(() => {
    const lowest = Math.min(...listings.map((l) => l.priceValue));
    return lowest.toLocaleString("en-NG");
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      const counter = { value: 0 };

      timeline
        .from(imageRef.current, {
          scale: 1.15,
          opacity: 0,
          duration: 1.6,
        })
        .from(
          eyebrowRef.current,
          { y: 20, opacity: 0, duration: 0.6 },
          "-=1.0"
        )
        .from(
          titleLine1Ref.current,
          { y: 60, opacity: 0, duration: 0.9 },
          "-=0.3"
        )
        .from(
          titleLine2Ref.current,
          { y: 60, opacity: 0, duration: 0.9 },
          "-=0.65"
        )
        .from(
          statRef.current,
          { y: 30, opacity: 0, duration: 0.8 },
          "-=0.5"
        )
        .to(
          counter,
          {
            value: plotCount,
            duration: 1.1,
            ease: "power2.out",
            onUpdate: () => {
              if (numberRef.current) {
                numberRef.current.textContent = String(
                  Math.round(counter.value)
                ).padStart(2, "0");
              }
            },
          },
          "-=0.6"
        );
    }, heroRef);

    return () => ctx.revert();
  }, [plotCount]);

  return (
    <section
      ref={heroRef}
      className="relative flex h-auto min-h-[560px] flex-col overflow-hidden bg-[#0d0d0c] sm:min-h-[480px] lg:h-[50vh] lg:min-h-[440px]"
    >
      {/* FULL-BLEED BACKGROUND IMAGE */}
      <div ref={imageRef} className="absolute inset-0">
        <img
          src="/images/probanner.avif"
          alt="Surveyed land ready for allocation"
          className="h-full w-full object-cover"
        />

        {/* Bottom scrim so text stays legible over any photo */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0c] via-[#0d0d0c]/45 to-[#0d0d0c]/10" />
        {/* Slight overall darkening */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* NAV */}
      <div className="relative z-30 px-6 sm:px-8 lg:px-[3.2vw]">
        <Navbar activePage="properties" />
      </div>

      {/* CONTENT — pinned toward the bottom of the viewport */}
      <div className="relative z-10 mt-auto flex flex-col gap-8 px-6 pb-10 pt-8 sm:px-8 sm:pb-12 lg:flex-row lg:items-end lg:justify-between lg:px-[3.2vw] lg:pb-14">
        <div className="max-w-4xl">
          <p
            ref={eyebrowRef}
            className="mb-4 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.3em] text-[#E6A776] sm:text-[11px]"
          >
            Available Now · South-East &amp; South-South
          </p>

          <h1 className="font-['Archivo_Black'] text-[11vw] leading-[0.9] tracking-[-0.04em] sm:text-[7vw] lg:text-[4vw]">
            <span ref={titleLine1Ref} className="block text-[#f5f3ef]">
              OWN THE GROUND.
            </span>
            <span ref={titleLine2Ref} className="block text-[#E6A776]">
              BUILD THE FUTURE.
            </span>
          </h1>
        </div>

        <div
          ref={statRef}
          className="flex max-w-full gap-6 border-t border-[#E6A776]/40 pt-5 sm:max-w-96 lg:max-w-80 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0"
        >
          <div>
           

            <p className="mt-2 font-['Manrope'] text-xs leading-5 text-white/70 sm:text-sm sm:leading-6">
              Surveyed, titled developments open for allocation, with plots
              starting from ₦{startingPrice}.
            </p>

            <Link
              to="/contact"
              className="group mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#E6A776] px-5 font-['Manrope'] text-[10px] uppercase tracking-[0.25em] text-black transition-all duration-300 hover:bg-[#ddb454]"
            >
              Book an Inspection
              <ArrowUpRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertiesHero;