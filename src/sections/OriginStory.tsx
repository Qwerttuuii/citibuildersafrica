import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type OriginStoryProps = {
  image?: string;
};

function ImagePlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#171310]">
      <svg className="absolute inset-0 h-full w-full text-[#E6A776]/[0.1]">
        <pattern id="originGrid" width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M36 0H0V36" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#originGrid)" />
      </svg>
      <span className="relative z-10 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-[#E6A776]/50">
        Image pending
      </span>
    </div>
  );
}

const OriginStory = ({ image }: OriginStoryProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to("[data-reveal]", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-2">
      <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:min-h-[640px]">
        {image ? (
          <img src={image} alt="Surveyed land plots" className="h-full w-full object-cover" />
        ) : (
          <ImagePlaceholder />
        )}
      </div>

      <div className="flex flex-col justify-center bg-[#0d0d0c] px-6 py-16 sm:px-10 sm:py-20 lg:px-[4vw] lg:py-24">
        <p
          data-reveal
          className="mb-5 translate-y-6 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.3em] text-[#E6A776] opacity-0"
        >
          Our beginning
        </p>

        <h2
          data-reveal
          className="max-w-[560px] translate-y-6 font-['Archivo_Black'] text-[9vw] leading-[0.95] tracking-[-0.02em] text-[#f5f3ef] opacity-0 sm:text-[5.5vw] lg:text-[2.9vw]"
        >
          From one office to a regional footprint.
        </h2>

        <p
          data-reveal
          className="mt-8 max-w-[520px] translate-y-6 font-['Manrope'] text-sm leading-7 text-white/70 opacity-0 sm:text-base sm:leading-8"
        >
          Citi Builders Africa is the real estate arm of{" "}
          <span className="text-[#E6A776]">Uvanka Company Limited</span>. The
          company began on 25 April 2021 at Plot CR9, Arugo Layout,
          Onitsha–Owerri Road, with a clear goal: to provide innovative real
          estate solutions in a property market where trust had become the
          scarcest commodity.
        </p>

        <p
          data-reveal
          className="mt-6 max-w-[520px] translate-y-6 font-['Manrope'] text-sm leading-7 text-white/70 opacity-0 sm:text-base sm:leading-8"
        >
          Five years on, that goal has hardened into a method acquire land
          in growth corridors, survey and title it before release, build the
          roads and drainage ourselves, then price it so an ordinary earner
          can enter.
        </p>
      </div>
    </section>
  );
};

export default OriginStory;