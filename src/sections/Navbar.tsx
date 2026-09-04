// src/sections/Navbar.tsx
import { useEffect, useRef, useState } from "react";
import { Home, Building2, Info, Phone } from "lucide-react";
import { Link } from "react-router-dom";

type NavbarProps = {
  activePage?: "home" | "properties" | "about" | "contact";
};

const navItems = [
  { label: "Home", href: "/", key: "home" as const, icon: Home },
  { label: "Properties", href: "#", key: "properties" as const, icon: Building2 },
  { label: "About", href: "#", key: "about" as const, icon: Info },
  { label: "Contact", href: "/contact", key: "contact" as const, icon: Phone },
];

const Navbar = ({ activePage }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <header className="relative z-20 flex items-center justify-between px-6 py-7 sm:px-8 lg:px-[3.2vw] lg:py-8">
      <Link to="/" className="relative z-20">
        <img
          src="/images/logo.png"
          alt="CitiBuilder Africa"
          className="h-auto w-[170px] object-contain sm:w-[190px]"
        />
      </Link>

      <nav className="hidden items-center gap-10 lg:flex">
        {navItems.map((item) => (
          <Link
            key={item.key}
            to={item.href}
            className={`font-['Manrope'] text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 hover:text-[#E6A776] ${
              activePage === item.key ? "text-[#E6A776]" : "text-white"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* MOBILE TRIGGER + DROPDOWN */}
      <div ref={panelRef} className="relative lg:hidden">
        <button
          onClick={() => setOpen((v) => !v)}
          className="relative z-20 flex h-11 w-11 items-center justify-center border border-white/30"
          aria-label="Open menu"
        >
          <span className="flex flex-col gap-1.5">
            <span
              className={`block h-px w-5 bg-white transition-transform duration-300 ${
                open ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-white transition-transform duration-300 ${
                open ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>

        <div
          className={`absolute right-0 top-[calc(100%+10px)] w-64 origin-top-right rounded-lg border border-white/10 bg-[#171310] shadow-2xl transition-all duration-200 ease-out ${
            open
              ? "scale-100 opacity-100"
              : "pointer-events-none scale-95 opacity-0"
          }`}
        >
          <nav className="flex flex-col p-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.key;
              return (
                <Link
                  key={item.key}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-md px-3 py-3 font-['Manrope'] text-sm transition-colors duration-200 ${
                    isActive
                      ? "bg-white/5 text-[#E6A776]"
                      : "text-white/85 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={17} strokeWidth={1.75} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-white/10 p-2">
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center rounded-md bg-[#E6A776] px-3 py-3 font-['Manrope'] text-[11px] uppercase tracking-[0.15em] text-black"
            >
              Book a site visit
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;