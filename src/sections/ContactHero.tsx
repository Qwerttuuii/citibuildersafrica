// src/sections/ContactHero.tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Navbar from "./Navbar";

type ContactHeroProps = {
  image?: string;
};

function ImagePlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#171310]">
      <svg className="absolute inset-0 h-full w-full text-[#E6A776]/[0.1]">
        <pattern id="contactHeroGrid" width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M36 0H0V36" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#contactHeroGrid)" />
      </svg>
      <span className="relative z-10 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-[#E6A776]/50">
        Image pending
      </span>
    </div>
  );
}

const ContactHero = ({ image }: ContactHeroProps) => {
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out" });
      gsap.to("[data-reveal]", {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.3,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-[70vh] flex-col overflow-hidden bg-[#0d0d0c]"
    >
      <div ref={imageRef} className="absolute inset-0 scale-[1.1] opacity-0">
        {image ? (
          <img src={image} alt="Citi Builders Africa office" className="h-full w-full object-cover" />
        ) : (
          <ImagePlaceholder />
        )}
        <div className="absolute inset-0 bg-[#0d0d0c]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0c] via-[#0d0d0c]/30 to-[#0d0d0c]/40" />
      </div>

      <Navbar activePage="contact" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-20 text-center sm:px-8 lg:py-28">
        <p
          data-reveal
          className="mb-6 translate-y-6 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.3em] text-[#E6A776] opacity-0"
        >
          Get in touch
        </p>

        <h1
          data-reveal
          className="max-w-[720px] translate-y-6 font-['Archivo_Black'] text-[13vw] leading-[0.95] tracking-[-0.03em] text-[#f5f3ef] opacity-0 sm:text-[8vw] lg:text-[4.5vw]"
        >
          Let's talk land.
        </h1>

        <p
          data-reveal
          className="mt-6 max-w-[480px] translate-y-6 font-['Manrope'] text-sm leading-7 text-white/70 opacity-0 sm:text-base sm:leading-8"
        >
          Inspections run Monday to Saturday. Tell us the state you're buying
          in and we'll put a plot map in your hands.
        </p>
      </div>
    </section>
  );
};

export default ContactHero;