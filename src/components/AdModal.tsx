import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { gsap } from "gsap";

interface AdModalProps {
  images: string[];
  slideInterval?: number; // ms between slides when multiple images
  autoCloseDelay?: number; // seconds before the ad closes itself
}

const SESSION_KEY = "adModalShown";

const AdModal = ({ images, slideInterval = 4000, autoCloseDelay = 4 }: AdModalProps) => {
  const [visible, setVisible] = useState(() => {
    // Skip entirely if already shown this session
    return sessionStorage.getItem(SESSION_KEY) !== "true";
  });
  const [activeIndex, setActiveIndex] = useState(0);

  const backdropRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const isFirstRender = useRef(true);

  // Mark as shown the moment it mounts visibly
  useEffect(() => {
    if (visible) {
      sessionStorage.setItem(SESSION_KEY, "true");
    }
  }, [visible]);

  // Lock page scroll while the ad is up
  useEffect(() => {
    if (!visible) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [visible]);

  // Entrance animation
  useEffect(() => {
    if (!visible) return;
    const ctx = gsap.context(() => {
      gsap.set(backdropRef.current, { opacity: 0 });
      gsap.set(cardRef.current, { opacity: 0, scale: 0.9, y: 20 });
      gsap.to(backdropRef.current, { opacity: 1, duration: 0.5, ease: "power2.out" });
      gsap.to(cardRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.1,
      });
    });
    return () => ctx.revert();
  }, [visible]);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: () => setVisible(false) });
    tl.to(cardRef.current, { opacity: 0, scale: 0.95, y: 10, duration: 0.3, ease: "power2.in" });
    tl.to(backdropRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" }, "-=0.2");
  };

  // Auto-close after the delay, unless the user already closed it manually
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      handleClose();
    }, autoCloseDelay * 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, autoCloseDelay]);

  // Auto-advance slideshow (only if more than one image)
  useEffect(() => {
    if (!visible || images.length <= 1) return;
    const t = setInterval(() => {
      setActiveIndex((i) => (i + 1) % images.length);
    }, slideInterval);
    return () => clearInterval(t);
  }, [visible, images.length, slideInterval]);

  // Crossfade between slides (skips the very first render to avoid a flash)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const img = imageRefs.current[activeIndex];
    if (img) {
      gsap.fromTo(img, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" });
    }
  }, [activeIndex]);

  if (!visible) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-md"
    >
      <div
        ref={cardRef}
        className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl shadow-2xl sm:max-w-lg"
      >
        {/* AD tag */}
        <span className="absolute left-3 top-3 z-10 rounded-md bg-black/60 px-2 py-1 text-[10px] font-bold tracking-wider text-white backdrop-blur-sm">
          AD
        </span>

        {/* Close button — always active */}
        <button
          onClick={handleClose}
          aria-label="Close advertisement"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
        >
          <X size={18} />
        </button>

        <div className="relative flex max-h-[90vh] items-center justify-center bg-black/10">
          {images.map((src, i) => (
            <img
              key={src}
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
              src={src}
              alt={`Advertisement ${i + 1}`}
              className={`max-h-[90vh] w-auto max-w-full object-contain ${
                i === activeIndex ? "relative" : "absolute inset-0 m-auto"
              }`}
              style={{ opacity: i === activeIndex ? 1 : 0 }}
            />
          ))}
        </div>

        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === activeIndex ? "w-6 bg-white" : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdModal;