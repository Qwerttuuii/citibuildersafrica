// src/sections/ConsultationCTA.tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ConsultationCTA = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to("[data-reveal]", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
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
      className="flex flex-col gap-8 bg-[#E6A776] px-6 py-16 sm:px-8 sm:py-20 lg:flex-row lg:items-center lg:justify-between lg:px-[3.2vw] lg:py-24"
    >
      <div>
        <p
          data-reveal
          className="mb-5 translate-y-6 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.3em] text-[#0d0d0c]/60 opacity-0"
        >
          §8 — Site visits
        </p>
        <h2
          data-reveal
          className="max-w-[720px] translate-y-6 font-['Archivo_Black'] text-[9vw] leading-[0.95] tracking-[-0.025em] text-[#0d0d0c] opacity-0 sm:text-[6vw] lg:text-[3.2vw]"
        >
          Book a free consultation or a weekend site inspection.
        </h2>
      </div>

      <a
        href="tel:+2349039935011"
        data-reveal
        className="group inline-flex w-fit translate-y-6 items-center gap-3 border border-[#0d0d0c] px-8 py-5 opacity-0 transition-all duration-300 hover:bg-[#0d0d0c]"
      >
        <Phone
          size={15}
          strokeWidth={1.5}
          className="text-[#0d0d0c] transition-colors duration-300 group-hover:text-[#E6A776]"
        />
        <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.25em] text-[#0d0d0c] transition-colors duration-300 group-hover:text-[#E6A776]">
          Call +234 903 993 5011
        </span>
      </a>
    </section>
  );
};

export default ConsultationCTA;