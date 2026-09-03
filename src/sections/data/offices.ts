// src/data/offices.ts
export type Office = {
  state: string;
  tag: string;
  address: string;
  phone: string;
};

export const offices: Office[] = [
  {
    state: "Imo",
    tag: "Headquarters",
    address: "Plot CR9 Arugo Layout, Onitsha-Owerri Road, Owerri, Imo State",
    phone: "+234 903 993 5011",
  },
  {
    state: "Bayelsa",
    tag: "Branch Office",
    address: "Akum's Plaza, Kpansia, Yenagoa, Bayelsa State",
    phone: "+234 704 969 1449",
  },
  {
    state: "Delta",
    tag: "Branch Office",
    address: "Nnebisi Road, Asaba, Delta State",
    phone: "+234 708 123 0567",
  },
];