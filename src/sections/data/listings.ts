// src/data/listings.ts
export type PropertyType = "Residential" | "Agro" | "Commercial";
export type ListingStatus = "Now selling" | "Selling fast";
export type StateName = "Imo" | "Bayelsa" | "Delta" | "Akwa Ibom";

export type Listing = {
  slug: string;
  title: string;
  location: string;
  state: StateName;
  type: PropertyType;
  size: string;
  priceLabel: string;
  priceValue: number; // raw naira value, used by the price filter
  status: ListingStatus;
  description: string;
  image?: string; // add real photo path later — placeholder shows until then
};

export const listings: Listing[] = [
  {
    slug: "agro-city-phase-2",
    title: "Agro City Phase 2",
    location: "Owerri, Imo State",
    state: "Imo",
    type: "Agro",
    size: "500 sqm plots",
    priceLabel: "₦750K",
    priceValue: 750000,
    status: "Selling fast",
    description:
      "Farmland-backed plots with cleared access roads and drainage in place.",
  },
  {
    slug: "agro-city-phase-3",
    title: "Agro City Phase 3",
    location: "Owerri, Imo State",
    state: "Imo",
    type: "Agro",
    size: "500 sqm plots",
    priceLabel: "₦1M",
    priceValue: 1000000,
    status: "Now selling",
    description:
      "Newly surveyed extension bordering the Owerri–Onitsha corridor.",
  },
  {
    slug: "rehoboth-gardens-phase-3",
    title: "Rehoboth Gardens Phase 3",
    location: "Owerri, Imo State",
    state: "Imo",
    type: "Residential",
    size: "450 sqm plots",
    priceLabel: "₦1.5M",
    priceValue: 1500000,
    status: "Now selling",
    description:
      "Gated residential layout with perimeter fencing and estate lighting.",
  },
  {
    slug: "palm-grove-estate",
    title: "Palm Grove Estate",
    location: "Nkwesi, Oguta LGA, Imo State",
    state: "Imo",
    type: "Agro",
    size: "Inclusive of seedlings & planting",
    priceLabel: "₦1M",
    priceValue: 1000000,
    status: "Selling fast",
    description:
      "Palm seedlings, planting, fertiliser and bush clearing bundled per plot.",
  },
  {
    slug: "glory-drive-estate",
    title: "Glory Drive Estate",
    location: "Yenagoa, Bayelsa State",
    state: "Bayelsa",
    type: "Residential",
    size: "460 sqm plots",
    priceLabel: "₦2M",
    priceValue: 2000000,
    status: "Now selling",
    description:
      "City-edge residential plots minutes from the Yenagoa ring road.",
  },

  // --- Placeholder listings below ---
  // Added so Delta, Akwa Ibom, and Commercial have something real to
  // filter on. Replace with real developments whenever you have them.
  {
    slug: "dynamic-view-estate",
    title: "Dynamic View Estate",
    location: "Agbura, Yenagoa, Bayelsa State",
    state: "Bayelsa",
    type: "Residential",
    size: "600 sqm plots",
    priceLabel: "₦2M",
    priceValue: 2000000,
    status: "Now selling",
    description: "Waterside residential plots on reclaimed, sand-filled ground.",
  },
  {
    slug: "nnebisi-business-park",
    title: "Nnebisi Business Park",
    location: "Asaba, Delta State",
    state: "Delta",
    type: "Commercial",
    size: "Commercial plots from 300 sqm",
    priceLabel: "₦3.5M",
    priceValue: 3500000,
    status: "Now selling",
    description:
      "Fronting the Asaba–Onitsha expressway, zoned for retail and office use.",
  },
  {
    slug: "uyo-heritage-court",
    title: "Uyo Heritage Court",
    location: "Uyo, Akwa Ibom State",
    state: "Akwa Ibom",
    type: "Residential",
    size: "500 sqm plots",
    priceLabel: "₦1.8M",
    priceValue: 1800000,
    status: "Selling fast",
    description: "Residential layout inside a fenced and gated estate.",
  },
];