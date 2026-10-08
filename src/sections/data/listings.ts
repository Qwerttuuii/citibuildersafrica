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
  image?: string;
};

export const listings: Listing[] = [
  {
    slug: "agro-city-phase-2",
    title: "Agro City Phase 2",
    location: "Owerri, Imo State",
    state: "Imo",
    type: "Agro",
    size: "500 sqm plots",
    priceLabel: "₦1M",
    priceValue: 1000000,
    status: "Selling fast",
    description:
      "Farmland-backed plots with cleared access roads and drainage in place.",
    image: "/images/Agro%20city%20phase%202.avif",
  },
  {
    slug: "agro-city-phase-3",
    title: "Agro City Phase 3",
    location: "Owerri, Imo State",
    state: "Imo",
    type: "Agro",
    size: "500 sqm plots",
    priceLabel: "₦1.5M",
    priceValue: 1500000,
    status: "Now selling",
    description:
      "Newly surveyed extension bordering the Owerri–Onitsha corridor.",
    image: "/images/Agro%20city%20phase%203.avif",
  },
  {
    slug: "rehoboth-gardens-phase-3",
    title: "Rehoboth Gardens Phase 3",
    location: "Uyo, Akwa Ibom State",
    state: "Akwa Ibom",
    type: "Residential",
    size: "300 sqm plots",
    priceLabel: "₦2M",
    priceValue: 2000000,
    status: "Now selling",
    description:
      "Gated residential layout with perimeter fencing and estate lighting.",
    image: "/images/rehoboth.avif",
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
        image: "/images/palmgrove2.avif",
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
    image: "/images/GLORY%20DRIVE.avif",
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
    image: "/images/dynamicview.avif",
  },
  

];