// src/sections/WalkTheLand.tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type WalkTheLandProps = {
  image?: string; // add real photo path later — placeholder shows until then
};

function ImagePlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#171310]">
      <svg className="absolute inset-0 h-full w-full text-[#E6A776]/[0.1]">
        <pattern id="walkGrid" width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M36 0H0V36" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#walkGrid)" />
      </svg>
      <span className="relative z-10 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-[#E6A776]/50">
        Image pending
      </span>
    </div>
  );
}

const WalkTheLand = ({ image }: WalkTheLandProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        scale: 1.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.from("[data-reveal]", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
        y: 40,
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
      className="relative overflow-hidden bg-[#0d0d0c] py-24 sm:py-28 lg:py-32"
    >
      {/* BACKGROUND IMAGE */}
      <div ref={imageRef} className="absolute inset-0">
        {image ? (
          <img src={image} alt="Interior finish" className="h-full w-full object-cover" />
        ) : (
          <ImagePlaceholder />
        )}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0c] via-[#0d0d0c]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0c]/70 via-transparent to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 px-6 sm:px-8 lg:px-[3.2vw]">
        <p
          data-reveal
          className="mb-8 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.3em] text-[#E6A776]"
        >
          Book a site visit
        </p>

        <h2
          data-reveal
          className="max-w-[900px] font-['Archivo_Black'] text-[11vw] leading-[0.92] tracking-[-0.035em] text-[#f5f3ef] sm:text-[8vw] lg:text-[4.6vw]"
        >
          Walk the land{" "}
          <span className="text-[#E6A776]">before</span> you buy it.
        </h2>

        <div
          data-reveal
          className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <a
            href="/contact"
            className="inline-flex h-[54px] items-center justify-center bg-[#E6A776] px-8 font-['Manrope'] text-[10px] uppercase tracking-[0.25em] text-black transition-all duration-300 hover:bg-[#ddb454]"
          >
            Schedule a site visit
          </a>

          <a
            href="#properties"
            className="inline-flex h-[54px] items-center justify-center border border-[#f5f3ef]/40 px-8 font-['Manrope'] text-[10px] uppercase tracking-[0.25em] text-[#f5f3ef] transition-all duration-300 hover:border-[#E6A776] hover:text-[#E6A776]"
          >
            Browse plots
          </a>
        </div>
      </div>
    </section>
  );
};

export default WalkTheLand;