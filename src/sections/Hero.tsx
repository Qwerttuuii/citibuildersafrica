import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .from(imageRef.current, {
          scale: 1.12,
          opacity: 0,
          duration: 1.5,
        })
        .from(
          titleRef.current,
          {
            y: 70,
            opacity: 0,
            duration: 1,
          },
          "-=0.9"
        )
        .from(
          lineRef.current,
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.7,
          },
          "-=0.5"
        )
        .from(
          descriptionRef.current,
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.4"
        )
        .from(
          actionsRef.current,
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.4"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-[#0d0d0c]"
    >
      {/* HERO IMAGE */}
      <div
        ref={imageRef}
        className="absolute inset-y-0 right-0 w-full lg:w-[58%]"
      >
        <img
          src="/images/hero.avif"
          alt="CitiBuilder Africa property"
          className="h-full w-full object-cover"
        />

        {/* Image darkness */}
        <div className="absolute inset-0 bg-black/35" />

        {/* Gradient into black */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0c] via-[#0d0d0c]/85 to-transparent" />

        {/* Bottom darkness */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0c]/60 via-transparent to-[#0d0d0c]/20" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex min-h-screen flex-col px-6 sm:px-8 lg:px-[3.2vw]">
        <Navbar activePage="home" />

        {/* HERO CONTENT */}
        <div className="flex flex-1 items-center">
          <div className="w-full pb-20 pt-16 lg:w-[52%] lg:pb-28 lg:pt-24">
            {/* TITLE */}
            <h1
              ref={titleRef}
              className="max-w-[850px] font-['Archivo_Black'] text-[13vw] leading-[0.88] tracking-[-0.045em] text-[#f5f3ef] sm:text-[11vw] lg:text-[5.2vw]"
            >
              LAND IS THE
              <br />
              FIRST ACT OF
              <br />
              <span className="text-[#E6A776]">WEALTH.</span>
            </h1>

            {/* DIVIDER */}
            <div
              ref={lineRef}
              className="my-10 h-px w-full max-w-[620px] bg-[#E6A776]/50"
            />

            {/* DESCRIPTION */}
            <p
              ref={descriptionRef}
              className="max-w-[620px] text-sm leading-7 text-white/70 sm:text-base sm:leading-8"
            >
              We acquire, survey, title and release land across the South-East
              and South-South so ownership stops being a gamble and starts
              being an asset with paperwork behind it.
            </p>

            {/* ACTIONS */}
            <div
              ref={actionsRef}
              className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center"
            >
              <a
                href="#properties"
                className="inline-flex h-[54px] items-center justify-center rounded-md bg-[#E6A776] px-8 font-['Manrope'] text-[10px] uppercase tracking-[0.25em] text-black transition-all duration-300 hover:bg-[#E6A776]"
              >
                View Available Land
              </a>

              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 font-['Manrope'] text-[10px] uppercase tracking-[0.25em] text-white transition-colors duration-300 hover:text-[#E6A776]"
              >
                Book a Site Visit
                <ArrowRight
                  size={15}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;