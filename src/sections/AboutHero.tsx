import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import Navbar from "./Navbar";

type AboutHeroProps = {
  image?: string;
};

function ImagePlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#171310]">
      <svg className="absolute inset-0 h-full w-full text-[#E6A776]/[0.1]">
        <pattern id="aboutHeroGrid" width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M36 0H0V36" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#aboutHeroGrid)" />
      </svg>
      <span className="relative z-10 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-[#E6A776]/50">
        Image pending
      </span>
    </div>
  );
}

const AboutHero = ({ image }: AboutHeroProps) => {
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
    <section ref={heroRef} className="relative overflow-hidden bg-[#0d0d0c]">
      <div ref={imageRef} className="absolute inset-0 scale-[1.1] opacity-0">
        {image ? (
          <img src={image} alt="CitiBuilder Africa land team" className="h-full w-full object-cover" />
        ) : (
          <ImagePlaceholder />
        )}
        <div className="absolute inset-0 bg-[#0d0d0c]/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0c] via-[#0d0d0c]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0c] via-transparent to-[#0d0d0c]/20" />
      </div>

      <Navbar activePage="about" />

      <div className="relative z-10 flex min-h-[80vh] flex-col justify-center px-6 pb-20 pt-10 sm:px-8 lg:px-[3.2vw]">
        <p
          data-reveal
          className="mb-6 translate-y-6 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.3em] text-[#E6A776] opacity-0"
        >
          
        </p>

        <h1
          data-reveal
          className="max-w-[880px] translate-y-6 font-['Archivo_Black'] text-[12vw] leading-[0.9] tracking-[-0.035em] text-[#f5f3ef] opacity-0 sm:text-[8vw] lg:text-[5vw]"
        >
          We prepare
          <br />
          the ground for
          <br />
          <span className="text-[#E6A776]">what comes next.</span>
        </h1>

        <div
          data-reveal
          className="my-8 h-px w-full max-w-[600px] translate-y-6 bg-[#E6A776]/50 opacity-0"
        />

        <p
          data-reveal
          className="max-w-[560px] translate-y-6 font-['Manrope'] text-sm leading-7 text-white/70 opacity-0 sm:text-base sm:leading-8"
        >
          We acquire, survey, title and develop land before it reaches our
          buyers replacing uncertainty with a clear path to ownership.
        </p>

       
      </div>
    </section>
  );
};

export default AboutHero;