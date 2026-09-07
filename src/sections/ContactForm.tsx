// src/sections/ContactForm.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, Loader2 } from "lucide-react";
import { offices } from "./data/offices";
import { listings } from "./data/listings";

gsap.registerPlugin(ScrollTrigger);

// Replace with your real Formspree endpoint (formspree.io/f/xxxxxxxx)
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

const developments = [
  "Not sure yet — advise me",
  ...listings.map((l) => l.title),
];

type SubmitStatus = "idle" | "submitting" | "success" | "error";

function FieldLabel({ children }: { children: string }) {
  return (
    <label className="mb-3 block font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em] text-white/40">
      {children}
    </label>
  );
}

const inputClasses =
  "w-full border-b border-white/20 bg-transparent pb-3 font-['Manrope'] text-base text-white outline-none transition-colors duration-300 placeholder:text-white/25 focus:border-[#E6A776]";

const ContactForm = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [activeOffice, setActiveOffice] = useState(0);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [mapLoading, setMapLoading] = useState(true);

  const preselectedDevelopment = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const value = params.get("development");
    return value && developments.includes(value) ? value : developments[0];
  }, []);

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

  // Reset the spinner every time a different office is selected,
  // since the iframe remounts (key={selected.state}) and blanks out.
  useEffect(() => {
    setMapLoading(true);
  }, [activeOffice]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("submitting");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(formRef.current),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        formRef.current.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const selected = offices[activeOffice];
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    selected.address
  )}&output=embed`;

  return (
    <section ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-2">
      {/* FORM */}
      <div className="bg-[#0d0d0c] px-6 py-16 sm:px-10 sm:py-20 lg:px-[4vw] lg:py-24">
        <p
          data-reveal
          className="mb-10 translate-y-6 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.3em] text-[#E6A776] opacity-0"
        >
          Send An Enquiry
        </p>

        {status === "success" ? (
          <div
            data-reveal
            className="max-w-130 translate-y-6 border border-[#E6A776]/40 bg-[#E6A776]/10 px-6 py-8 opacity-0"
          >
            <p className="font-['Archivo_Black'] text-xl text-[#E6A776]">
              Enquiry sent.
            </p>
            <p className="mt-2 font-['Manrope'] text-sm text-white/70">
              We respond within one business day. Talk soon.
            </p>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            data-reveal
            className="max-w-130 translate-y-6 opacity-0"
          >
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <FieldLabel>Full name</FieldLabel>
                <input type="text" name="fullName" required className={inputClasses} />
              </div>
              <div>
                <FieldLabel>Phone</FieldLabel>
                <input type="tel" name="phone" required className={inputClasses} />
              </div>
            </div>

            <div className="mt-8">
              <FieldLabel>Email</FieldLabel>
              <input type="email" name="email" required className={inputClasses} />
            </div>

            <div className="relative mt-8">
              <FieldLabel>Development of interest</FieldLabel>
              <select
                name="development"
                defaultValue={preselectedDevelopment}
                className="w-full appearance-none border-b border-white/20 bg-transparent pb-3 pr-8 font-['Manrope'] text-base text-white outline-none transition-colors duration-300 focus:border-[#E6A776]"
              >
                {developments.map((d) => (
                  <option key={d} value={d} className="bg-[#0d0d0c]">
                    {d}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute bottom-3 right-0 text-white/40"
              />
            </div>

            <div className="mt-8">
              <FieldLabel>Message</FieldLabel>
              <textarea
                name="message"
                rows={3}
                placeholder="Number of plots, budget, preferred inspection date..."
                className={`${inputClasses} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-10 inline-flex h-13.5 items-center justify-center bg-[#E6A776] px-8 font-['Manrope'] text-[10px] uppercase tracking-[0.25em] text-black transition-all duration-300 hover:bg-[#ddb454] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? "Sending..." : "Send enquiry"}
            </button>

            {status === "error" && (
              <p className="mt-4 font-['Manrope'] text-sm text-red-400">
                Something went wrong try again, or call us directly below.
              </p>
            )}
          </form>
        )}
      </div>

      {/* OFFICES + MAP */}
      <div className="flex flex-col bg-[#F7F5F1]">
        <div className="px-6 py-16 sm:px-10 sm:py-20 lg:px-[4vw] lg:py-24">
          <p
            data-reveal
            className="mb-10 translate-y-6 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.3em] text-[#E6A776] opacity-0"
          >
            Our Offices
          </p>

          <div data-reveal className="translate-y-6 border-t border-[#0d0d0c]/15 opacity-0">
            {offices.map((office, i) => {
              const isActive = i === activeOffice;
              return (
                <button
                  key={office.state}
                  type="button"
                  onClick={() => setActiveOffice(i)}
                  className="flex w-full flex-col border-b border-[#0d0d0c]/15 py-6 text-left transition-colors duration-300"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span
                      className={`font-['Archivo_Black'] text-2xl transition-colors duration-300 sm:text-3xl ${
                        isActive ? "text-[#0d0d0c]" : "text-[#0d0d0c]/35"
                      }`}
                    >
                      {office.state.toUpperCase()}
                    </span>
                    <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.15em] text-[#0d0d0c]/40">
                      {office.tag}
                    </span>
                  </div>

                  <p
                    className={`mt-2 font-['Manrope'] text-sm transition-colors duration-300 ${
                      isActive ? "text-[#0d0d0c]/70" : "text-[#0d0d0c]/35"
                    }`}
                  >
                    {office.address}
                  </p>

                  <span
                    className={`mt-1 font-['JetBrains_Mono'] text-sm transition-colors duration-300 ${
                      isActive ? "text-[#E6A776]" : "text-[#0d0d0c]/35"
                    }`}
                  >
                    {office.phone}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* MAP */}
        <div className="relative min-h-90 w-full flex-1 bg-[#ECE8DF]">
          {mapLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3">
              <Loader2 size={22} className="animate-spin text-[#E6A776]" strokeWidth={2} />
              <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-[#0d0d0c]/40">
                Loading Map
              </span>
            </div>
          )}
          <iframe
            key={selected.state}
            title={`Map to ${selected.state} office`}
            src={mapSrc}
            onLoad={() => setMapLoading(false)}
            className={`absolute inset-0 h-full w-full grayscale-[0.3] transition-opacity duration-500 ${
              mapLoading ? "opacity-0" : "opacity-100"
            }`}
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactForm;