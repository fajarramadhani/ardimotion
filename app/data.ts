export const siteConfig = {
  // PLACEHOLDER: [NAMA_BRAND]
  brandName: "ARDI MOTION",
  brandPlaceholder: "[NAMA_BRAND]",
  descriptor: "Cinematic Visual Studio",
  // PLACEHOLDER: [NOMOR_WHATSAPP] - gunakan format internasional tanpa + atau spasi.
  whatsappNumber: "[NOMOR_WHATSAPP]",
  // PLACEHOLDER: [LINK_INSTAGRAM]
  instagramUrl: "[LINK_INSTAGRAM]",
  // PLACEHOLDER: [LINK_TIKTOK]
  tiktokUrl: "[LINK_TIKTOK]",
  // PLACEHOLDER: [LOGO] - ganti wordmark pada komponen BrandMark jika logo siap.
  logo: "[LOGO]",
  // PLACEHOLDER: [VIDEO_SHOWREEL] - null membuat tombol play tidak ditampilkan.
  showreelUrl: null as string | null,
};

export const portfolioCategories = [
  { id: "all", label: "Semua" },
  { id: "motorcycle", label: "Motor" },
  { id: "car", label: "Mobil" },
  { id: "product", label: "Produk" },
] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number]["id"];

export type PortfolioItem = {
  id: string;
  number: string;
  category: Exclude<PortfolioCategory, "all">;
  categoryLabel: string;
  title: string;
  description: string;
  scope: string;
  visualClass: string;
  mediaSrc?: string;
  mediaAlt?: string;
  projectUrl?: string;
};

// PLACEHOLDER: [DAFTAR_PORTOFOLIO]
// Ganti objek di bawah dengan karya asli. Isi mediaSrc dan projectUrl ketika aset tersedia.
export const portfolioItems: PortfolioItem[] = [
  {
    id: "built-beyond-standard",
    number: "01",
    category: "motorcycle",
    categoryLabel: "Motorcycle Film / Custom Build",
    title: "Built Beyond Standard",
    description:
      "Portrait film yang menangkap detail mesin, tekstur, dan karakter sebuah custom motorcycle.",
    scope: "Direction / Production / Edit / Color / Sound",
    visualClass: "visual-motorcycle",
    mediaAlt: "Cinematic frame dari custom motorcycle film menampilkan detail mesin dan tekstur",
  },
  {
    id: "motion-after-dark",
    number: "02",
    category: "car",
    categoryLabel: "Car Film / Automotive Portrait",
    title: "Motion After Dark",
    description:
      "Movement terkontrol, refleksi tajam, dan pace yang dibangun mengikuti presence kendaraan.",
    scope: "Production / Rolling Shots / Edit / Color / Sound",
    visualClass: "visual-car",
    mediaAlt: "Automotive portrait film dengan movement dinamis dan refleksi lighting",
  },
  {
    id: "form-meets-desire",
    number: "03",
    category: "product",
    categoryLabel: "Product & Brand Film",
    title: "Form Meets Desire",
    description:
      "Visual produk yang mengubah material, bentuk, dan fungsi menjadi sesuatu yang terasa bernilai.",
    scope: "Concept / Art Direction / Production / Post",
    visualClass: "visual-product",
    mediaAlt: "Product cinematography dengan fokus pada material, bentuk, dan detail produk",
  },
];

export const services = [
  {
    number: "01",
    title: "Motorcycle Film",
    lead: "Detail mesin. Energi jalan. Karakter pemilik.",
    description:
      "Film cinematic untuk motor custom, project build, workshop, komunitas, atau personal showcase.",
    scope: "Concept / Static detail / Riding sequence / Edit / Color / Sound",
    whatsappLabel: "Rencanakan Motorcycle Film",
    whatsappMessage:
      "Halo ARDI MOTION, saya ingin konsultasi mengenai Motorcycle Film. Boleh dibantu menentukan creative approach dan scope yang sesuai?",
  },
  {
    number: "02",
    title: "Car Film",
    lead: "Bukan sekadar rolling shot.",
    description:
      "Automotive film dengan kombinasi detail, presence, movement, dan atmosfer untuk personal car atau automotive brand.",
    scope: "Treatment / Location planning / Static sequence / Rolling shots / Post",
    whatsappLabel: "Rencanakan Car Film",
    whatsappMessage:
      "Halo ARDI MOTION, saya ingin konsultasi mengenai Car Film. Boleh dibantu menentukan creative approach dan scope yang sesuai?",
  },
  {
    number: "03",
    title: "Product & Brand Film",
    lead: "Membuat produk terasa layak diinginkan.",
    description:
      "Film komersial untuk memperkuat karakter produk dan brand melalui konsep yang konsisten dan produksi terkontrol.",
    scope: "Concept / Art direction / Product cinematography / Edit / Color / Sound",
    whatsappLabel: "Diskusikan Brand Film",
    whatsappMessage:
      "Halo ARDI MOTION, saya ingin konsultasi mengenai Product & Brand Film. Boleh dibantu menentukan scope yang sesuai?",
  },
  {
    number: "04",
    title: "Edit Only",
    lead: "Footage Anda. Treatment kami.",
    description:
      "Penyusunan cerita, pacing, color treatment, sound design, dan final output untuk footage yang sudah tersedia.",
    scope: "Main film / Social cutdown / Vertical version / Platform-ready export",
    whatsappLabel: "Konsultasikan Footage",
    whatsappMessage:
      "Halo ARDI MOTION, saya sudah memiliki footage dan ingin konsultasi layanan Edit Only. Boleh dibantu meninjau kebutuhan project saya?",
  },
];

export const processSteps = [
  {
    number: "01",
    label: "Discover",
    title: "Pahami Project",
    description:
      "Kami membahas tujuan, audiens, karakter, referensi, platform, timeline, dan kebutuhan output.",
    output: "Project brief dan kebutuhan scope.",
  },
  {
    number: "02",
    label: "Define",
    title: "Tentukan Arah",
    description:
      "Creative direction, mood, lokasi, kebutuhan produksi, dan deliverables disusun sebelum eksekusi.",
    output: "Treatment, production plan, dan estimasi.",
  },
  {
    number: "03",
    label: "Produce",
    title: "Bangun Footage",
    description:
      "Pengambilan gambar berfokus pada lighting, composition, movement, tekstur, dan detail karakter.",
    output: "Production footage sesuai treatment.",
  },
  {
    number: "04",
    label: "Refine",
    title: "Bentuk Cerita",
    description:
      "Footage dikembangkan melalui editing, pacing, sound design, color treatment, dan review terarah.",
    output: "Preview, feedback round, dan refinement.",
  },
  {
    number: "05",
    label: "Deliver",
    title: "Finalisasi Output",
    description:
      "Master film dan format turunannya disiapkan sesuai platform, rasio, resolusi, dan kebutuhan penggunaan.",
    output: "Final delivery yang siap dipublikasikan.",
  },
];

export function getWhatsAppUrl(message: string) {
  if (siteConfig.whatsappNumber.startsWith("[")) {
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  }

  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function getExternalUrl(url: string) {
  return url.startsWith("[") ? "#contact" : url;
}
