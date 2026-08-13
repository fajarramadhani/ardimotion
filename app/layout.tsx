import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Manrope } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ardi-motion.com"),
  title: {
    default: "ARDI MOTION | Cinematic Visual Studio",
    template: "%s | ARDI MOTION",
  },
  description:
    "Studio film cinematic untuk motor, mobil, produk, dan brand. Creative direction, production, editing, color, sound, dan final delivery.",
  keywords: [
    "cinematic video",
    "video motor",
    "video mobil",
    "product film",
    "video editing",
    "production house",
    "ARDI MOTION",
  ],
  authors: [{ name: "ARDI MOTION" }],
  creator: "ARDI MOTION",
  publisher: "ARDI MOTION",
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://ardi-motion.com",
    siteName: "ARDI MOTION",
    title: "ARDI MOTION | Cinematic Visual Studio",
    description:
      "Karakter, dihidupkan dalam gerak. Film cinematic untuk motor, mobil, produk, dan brand.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ARDI MOTION Cinematic Visual Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARDI MOTION | Cinematic Visual Studio",
    description: "Film cinematic untuk motor, mobil, produk, dan brand.",
    images: ["/opengraph-image"],
  },
  verification: {
    google: "PLACEHOLDER_GOOGLE_SITE_VERIFICATION",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1A1A1A",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "ARDI MOTION",
    "image": "https://ardi-motion.com/opengraph-image",
    "description": "Cinematic Visual Studio untuk motor, mobil, produk, dan brand.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Indonesia"
    },
    "url": "https://ardi-motion.com"
  };

  return (
    <html lang="id" className={`${archivo.variable} ${manrope.variable} ${plexMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
