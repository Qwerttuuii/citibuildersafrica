import { offices } from "./data/offices";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const cities = ["Owerri", "Yenagoa", "Asaba"];

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to("[data-reveal]", {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          once: true,
        },
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#0d0d0c] px-6 pb-10 pt-20 sm:px-8 sm:pt-24 lg:px-[3.2vw] lg:pt-28">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-8">
        {/* BRAND */}
        <div data-reveal className="translate-y-8 opacity-0">
          <h2 className="font-['Archivo_Black'] text-[15vw] leading-[0.85] tracking-[-0.03em] text-[#f5f3ef] sm:text-[9vw] lg:text-[4.5vw]">
            OWN A
            <br />
            <span className="text-[#E6A776]">LAND.</span>
          </h2>
          <p className="mt-8 max-w-[380px] font-['Manrope'] text-sm leading-6 text-[#f5f3ef]/50">
            Citi Builders Africa is the real estate arm of Uvanka Company
            Limited. Established 25 April 2021, Owerri.
          </p>
        </div>

        {/* NAVIGATE */}
        <div data-reveal className="translate-y-8 opacity-0">
          <p className="mb-6 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.3em] text-[#E6A776]">
            Navigate
          </p>
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="group inline-flex flex-col font-['Manrope'] text-base text-[#f5f3ef]/80 transition-colors duration-300 hover:text-[#f5f3ef]"
                >
                  {link.label}
                  <span className="mt-0.5 h-px w-0 bg-[#E6A776] transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* OFFICES */}
        <div data-reveal className="translate-y-8 opacity-0">
          <p className="mb-6 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.3em] text-[#E6A776]">
            Offices
          </p>
          <ul className="flex flex-col gap-6">
            {offices.map((office) => (
              <li key={office.state}>
                <p className="font-['Manrope'] text-base text-[#f5f3ef]">
                  {office.state}{" "}
                  <span className="text-[#f5f3ef]/40">— {office.tag}</span>
                </p>
                <a
                  href={`tel:${office.phone.replace(/\s/g, "")}`}
                  className="mt-1 inline-block font-['JetBrains_Mono'] text-sm text-[#f5f3ef]/60 transition-colors duration-300 hover:text-[#E6A776]"
                >
                  {office.phone}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div
        data-reveal
        className="mt-16 flex translate-y-8 flex-col gap-4 border-t border-[#f5f3ef]/10 pt-8 opacity-0 sm:flex-row sm:items-center sm:justify-between lg:mt-20"
      >
        <p className="font-['Manrope'] text-xs text-[#f5f3ef]/40">
          © 2026 Citi Builders Africa · Uvanka Company Limited
        </p>

        <div className="flex items-center gap-3 font-['JetBrains_Mono'] text-xs uppercase tracking-[0.15em] text-[#f5f3ef]/40">
          {cities.map((city, i) => (
            <span key={city} className="flex items-center gap-3">
              {i > 0 && <span className="text-[#f5f3ef]/15">·</span>}
              {city}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;