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
  category: "motorcycle" | "car" | "product";
  categoryLabel: string;
  title: string;
  description: string;
  scope: string;
  visualClass: string;
  mediaSrc?: string;
  mediaAlt: string;
  driveFileId?: string;
  orientation: "portrait" | "landscape";
};

// TODO: Konfirmasi deskripsi dan scope final karya 02-06 dengan Ardi.
export const portfolioItems: PortfolioItem[] = [
  {
    id: "speedramp-krakenn",
    number: "01",
    category: "motorcycle",
    categoryLabel: "Motorcycle / Speedramp",
    title: "Speedramp Krakenn",
    description:
      "Automotive edit dengan ritme agresif, compositing, dan visual treatment yang memberi impact sejak frame pertama.",
    scope: "Edit / Compositing / Speedramp / Color / Sound",
    visualClass: "visual-motorcycle",
    mediaAlt: "Preview karya motorcycle Speedramp Krakenn",
    driveFileId: "188Xcz-fn426xS4ZUv6LYnEi9QizfEWw2",
    orientation: "portrait",
  },
  {
    id: "jj-vaby-vs-varky",
    number: "02",
    category: "motorcycle",
    categoryLabel: "Motorcycle / Creative Edit",
    title: "JJ Vaby vs Varky",
    description: "Detail karya dan creative treatment sedang menunggu konfirmasi.",
    scope: "Scope perlu dikonfirmasi",
    visualClass: "visual-motorcycle",
    mediaAlt: "Preview karya JJ Vaby vs Varky",
    driveFileId: "1S08Nvg1L3IfWkdE-qpznoAIeZzFtWylz",
    orientation: "portrait",
  },
  {
    id: "speedramp-amarti",
    number: "03",
    category: "car",
    categoryLabel: "Automotive / Speedramp",
    title: "Speedramp Amarti",
    description: "Detail karya dan creative treatment sedang menunggu konfirmasi.",
    scope: "Scope perlu dikonfirmasi",
    visualClass: "visual-car",
    mediaAlt: "Preview karya Speedramp Amarti",
    driveFileId: "184Atv9yvnffdgYcUwh9JmvTPvRPygV_U",
    orientation: "portrait",
  },
  {
    id: "el-neraka",
    number: "04",
    category: "motorcycle",
    categoryLabel: "Motorcycle / Visual Effects",
    title: "El Neraka",
    description: "Detail karya dan creative treatment sedang menunggu konfirmasi.",
    scope: "Scope perlu dikonfirmasi",
    visualClass: "visual-motorcycle",
    mediaAlt: "Preview karya motorcycle El Neraka",
    driveFileId: "16r7uxRiYBAiqsP6XVQMAYyqygakKTUeC",
    orientation: "portrait",
  },
  {
    id: "speedramp-v4",
    number: "05",
    category: "motorcycle",
    categoryLabel: "Motorcycle / Speedramp",
    title: "Speedramp V4",
    description: "Detail karya dan creative treatment sedang menunggu konfirmasi.",
    scope: "Scope perlu dikonfirmasi",
    visualClass: "visual-motorcycle",
    mediaAlt: "Preview karya motorcycle Speedramp V4",
    driveFileId: "10DAiQUGIt-fKMqsqF1ViWrYsRqlWjSjl",
    orientation: "portrait",
  },
  {
    id: "speedramp-casper",
    number: "06",
    category: "car",
    categoryLabel: "Automotive / Speedramp",
    title: "Speedramp Casper",
    description: "Detail karya dan creative treatment sedang menunggu konfirmasi.",
    scope: "Scope perlu dikonfirmasi",
    visualClass: "visual-car",
    mediaAlt: "Preview karya Speedramp Casper",
    driveFileId: "1fSVlg1IMl_ekWhNsdpwuIIQKfXovzZCZ",
    orientation: "portrait",
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

export function getDrivePreviewUrl(fileId: string) {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

export function getDriveViewUrl(fileId: string) {
  return `https://drive.google.com/file/d/${fileId}/view`;
}
