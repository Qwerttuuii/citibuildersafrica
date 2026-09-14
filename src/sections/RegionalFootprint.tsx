import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { offices } from "./data/offices";

gsap.registerPlugin(ScrollTrigger);

type RegionalFootprintProps = {
  image?: string;
};

function ImagePlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#171310]">
      <svg className="absolute inset-0 h-full w-full text-[#E6A776]/[0.1]">
        <pattern id="footprintGrid" width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M36 0H0V36" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#footprintGrid)" />
      </svg>
      <span className="relative z-10 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-[#E6A776]/50">
        Image pending
      </span>
    </div>
  );
}

const RegionalFootprint = ({ image }: RegionalFootprintProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to("[data-reveal]", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
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
    <section ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col justify-center bg-[#E6A776] px-6 py-16 sm:px-10 sm:py-20 lg:px-[4vw] lg:py-24">
        <p
          data-reveal
          className="mb-5 translate-y-6 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.3em] text-[#0d0d0c]/60 opacity-0"
        >
          Regional footprint
        </p>

        <h2
          data-reveal
          className="translate-y-6 font-['Archivo_Black'] text-[11vw] leading-[0.92] tracking-[-0.025em] text-[#0d0d0c] opacity-0 sm:text-[7vw] lg:text-[3.6vw]"
        >
          {offices.map((o) => (
            <span key={o.state} className="block">
              {o.state}.
            </span>
          ))}
        </h2>

        <div data-reveal className="mt-10 flex translate-y-6 flex-col opacity-0">
          {offices.map((office, i) => (
            <div
              key={office.state}
              className={`py-5 ${i < offices.length - 1 ? "border-b-2 border-[#0d0d0c]/10" : ""}`}
            >
              <p className="font-['Manrope'] text-base font-semibold text-[#0d0d0c]">
                {office.state} — <span className="text-[#0d0d0c]/60">{office.tag}</span>
              </p>
              <p className="mt-1 font-['Manrope'] text-sm text-[#0d0d0c]/60">{office.address}</p>
            </div>
          ))}
        </div>

        <a
          href="/contact"
          data-reveal
          className="mt-10 inline-flex h-[54px] w-fit translate-y-6 items-center justify-center border-2 border-[#0d0d0c] px-8 opacity-0 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.25em] text-[#0d0d0c] transition-all duration-300 hover:bg-[#0d0d0c] hover:text-[#E6A776]"
        >
          Visit an office
        </a>
      </div>

      <div className="relative min-h-[360px] w-full overflow-hidden lg:min-h-0">
        {image ? (
          <img src={image} alt="Office interior" className="h-full w-full object-cover" />
        ) : (
          <ImagePlaceholder />
        )}
      </div>
    </section>
  );
};

export default RegionalFootprint;