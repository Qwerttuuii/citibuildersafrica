import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const markers = [
  { value: 2021, suffix: "", label: "Incorporated in Owerri" },
  { value: 8, suffix: "", label: "Estates surveyed & released" },
  { value: 3, suffix: "", label: "State offices" },
  { value: 100, suffix: "%", label: "Titled before sale" },
];

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const proxy = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(proxy, {
        val: value,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = Math.round(proxy.val).toLocaleString() + suffix;
        },
      });
    });
    return () => ctx.revert();
  }, [value, suffix]);

  return (
    <span ref={ref} className="block font-['Archivo_Black'] text-5xl text-[#f5f3ef] sm:text-6xl">
      0{suffix}
    </span>
  );
}

const MissionVision = () => {
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
    <section ref={sectionRef}>
      {/* MISSION / VISION */}
      <div className="grid grid-cols-1 gap-16 bg-[#F7F5F1] px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-[#0d0d0c]/10 lg:px-[3.2vw] lg:py-24">
        <div data-reveal className="translate-y-6 opacity-0 lg:pr-16">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-1 w-8 bg-[#E6A776]" />
            <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.3em] text-[#0d0d0c]/50">
              Mission
            </span>
          </div>
          <h2 className="font-['Archivo_Black'] text-[8vw] leading-[0.95] tracking-[-0.02em] text-[#0d0d0c] sm:text-[5vw] lg:text-[2.6vw]">
            Make property ownership simple, secure and accessible.
          </h2>
          <p className="mt-6 max-w-[420px] font-['Manrope'] text-sm leading-7 text-[#0d0d0c]/60">
            By delivering affordable, high-value real estate opportunities
            with integrity and excellence.
          </p>
        </div>

        <div data-reveal className="translate-y-6 opacity-0 lg:pl-16">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-1 w-8 bg-[#E6A776]" />
            <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.3em] text-[#0d0d0c]/50">
              Vision
            </span>
          </div>
          <h2 className="font-['Archivo_Black'] text-[8vw] leading-[0.95] tracking-[-0.02em] text-[#E6A776] sm:text-[5vw] lg:text-[2.6vw]">
            Empower millions of Africans toward generational wealth.
          </h2>
          <p className="mt-6 max-w-[420px] font-['Manrope'] text-sm leading-7 text-[#0d0d0c]/60">
           To empower millions of Africans to achieve financial freedom and generational wealth through real estate ownership and investment
          </p>
        </div>
      </div>

      {/* CREDIBILITY MARKERS */}
      <div className="bg-[#0d0d0c] px-6 py-16 sm:px-8 sm:py-20 lg:px-[3.2vw] lg:py-24">
        <p
          data-reveal
          className="mb-14 translate-y-6 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.3em] text-[#E6A776] opacity-0"
        >
          Credibility markers
        </p>

        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4 lg:gap-8">
          {markers.map((m) => (
            <div key={m.label} data-reveal className="translate-y-6 opacity-0">
              <Counter value={m.value} suffix={m.suffix} />
              <div className="mt-4 h-1 w-12 bg-[#E6A776]" />
              <p className="mt-3 font-['Manrope'] text-sm text-white/50">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionVision;