// src/sections/Mission.tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type MissionProps = {
  image?: string;
};

function ImagePlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#171310]">
      <svg className="absolute inset-0 h-full w-full text-[#E6A776]/[0.12]">
        <pattern id="missionGrid" width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M36 0H0V36" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#missionGrid)" />
      </svg>
      <span className="relative z-10 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-[#E6A776]/50">
        Image pending
      </span>
    </div>
  );
}

const Mission = ({ image }: MissionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to("[data-reveal]", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
      });

      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { scale: 1.12, filter: "grayscale(1) brightness(0.85)" },
          {
            scale: 1,
            filter: "grayscale(0) brightness(1)",
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-2">
      {/* IMAGE */}
      <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:min-h-[640px]">
        {image ? (
          <img
            ref={imageRef}
            src={image}
            alt="Land survey in progress"
            className="h-full w-full object-cover"
          />
        ) : (
          <ImagePlaceholder />
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-col justify-center bg-[#E6A776] px-6 py-16 sm:px-10 sm:py-20 lg:px-[4.5vw] lg:py-24">
        <p
          data-reveal
          className="mb-6 translate-y-8 opacity-0 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.3em] text-[#0d0d0c]/70"
        >
          Our Mission
        </p>

        <h2
          data-reveal
          className="max-w-[560px] translate-y-8 opacity-0 font-['Archivo_Black'] text-[9vw] leading-[0.95] tracking-[-0.02em] text-[#0d0d0c] sm:text-[5.5vw] lg:text-[2.9vw]"
        >
          Property ownership, made simple, secure and accessible.
        </h2>

        <p
          data-reveal
          className="mt-8 max-w-[440px] translate-y-8 opacity-0 font-['Manrope'] text-sm leading-7 text-[#0d0d0c]/75 sm:text-base sm:leading-8"
        >
          Delivering affordable, high value real estate opportunities with
          integrity and excellence so millions of Africans can build
          generational wealth through land.
        </p>

        <a
          href="#story"
          data-reveal
          className="group mt-10 inline-flex w-fit translate-y-8 items-center gap-3 border-2 border-[#0d0d0c] bg-[#0d0d0c] px-7 py-4 opacity-0 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.28em] text-[#E6A776] transition-all duration-300 hover:bg-[#E6A776] hover:text-[#0d0d0c]"
        >
          Our story
          <ArrowRight
            size={14}
            strokeWidth={1.5}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
      </div>
    </section>
  );
};

export default Mission;