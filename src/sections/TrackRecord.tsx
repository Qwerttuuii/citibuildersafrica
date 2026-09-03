// src/sections/TrackRecord.tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type LedgerRow = {
  label: string;
  value: number;
  suffix?: string;
};

const ledger: LedgerRow[] = [
  { label: "Years operating", value: 5 },
  { label: "States covered", value: 4 },
  { label: "Plots allocated", value: 1200, suffix: "+" },
];

const mainStat = {
  value: 8,
  label: "Estates released",
  sublabel: "Since 2019, across the South-East and South-South.",
};

function Counter({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const proxy = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(proxy, {
        val: value,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          el.textContent = Math.round(proxy.val).toLocaleString() + suffix;
        },
      });
    });

    return () => ctx.revert();
  }, [value, suffix]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}

const TrackRecord = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-reveal]", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 32,
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
      className="relative bg-[#F7F5F1] px-6 py-24 sm:px-8 sm:py-28 lg:px-[3.2vw] lg:py-32"
    >
      <p
        data-reveal
        className="mb-16 font-['JetBrains_Mono'] text-[15px] uppercase tracking-[0.3em] text-[#E6A776] lg:mb-20"
      >
        Our Track record
      </p>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        {/* LEAD STAT */}
        <div data-reveal>
          <Counter
            value={mainStat.value}
            className="block font-['Archivo_Black'] text-[22vw] leading-[0.85] tracking-[-0.03em] text-[#0d0d0c] sm:text-[14vw] lg:text-[9vw]"
          />
          <p className="mt-6 font-['Manrope'] text-lg font-semibold uppercase tracking-[0.02em] text-[#0d0d0c]">
            {mainStat.label}
          </p>
          <p className="mt-2 max-w-[380px] font-['Manrope'] text-sm leading-6 text-[#0d0d0c]/60">
            {mainStat.sublabel}
          </p>
        </div>

        {/* LEDGER */}
        <div data-reveal className="flex flex-col justify-center">
          <div className="border-t border-[#0d0d0c]/15">
            {ledger.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-6 border-b border-[#0d0d0c]/15 py-6"
              >
                <span className="font-['Manrope'] text-sm uppercase tracking-[0.05em] text-[#00000]/80">
                  {row.label}
                </span>
                <Counter
                  value={row.value}
                  suffix={row.suffix}
                  className="font-['JetBrains_Mono'] text-2xl text-[#0d0d0c] sm:text-3xl"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackRecord;