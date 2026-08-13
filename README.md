# ARDI MOTION Landing Page

Landing page satu halaman berbasis Next.js App Router, React, TypeScript, dan CSS native untuk ARDI MOTION Cinematic Visual Studio.

## Menjalankan Project

```bash
npm install
npm run dev
```

Buka `http://192.168.1.32:4000` dari komputer atau perangkat lain yang terhubung ke jaringan Wi-Fi yang sama.

Alamat IP lokal dapat berubah setelah komputer atau router dinyalakan ulang. Jika alamat tersebut tidak dapat diakses, periksa IPv4 aktif pada adapter Wi-Fi dan gunakan format `http://[IP_KOMPUTER]:4000`.

Pemeriksaan produksi:

```bash
npm run typecheck
npm run lint
npm run build
```

## Struktur File

- `app/page.tsx`: markup utama dan urutan section landing page.
- `app/components.tsx`: navigation, filter portfolio, accordion layanan, showreel, reveal animation, dan link WhatsApp.
- `app/data.ts`: seluruh konfigurasi brand, link, layanan, proses, dan daftar portfolio.
- `app/globals.css`: design system, layout responsif, placeholder visual, hover, dan motion.
- `app/layout.tsx`: font, SEO metadata, Open Graph, Twitter Card, dan viewport.
- `app/opengraph-image.tsx`: social share image yang dibuat otomatis.
- `ARDI-MOTION-BRAND-WEBSITE-BLUEPRINT.md`: strategi brand dan arahan desain lengkap.

## Placeholder yang Harus Diganti

Semua konfigurasi utama berada di `app/data.ts` dan mudah ditemukan melalui pencarian global.

### `[NAMA_BRAND]`

Ubah `siteConfig.brandName`. Setelah nama final ditentukan, perbarui metadata di `app/layout.tsx` dan social image di `app/opengraph-image.tsx` jika namanya bukan ARDI MOTION.

### `[NOMOR_WHATSAPP]`

Ubah `siteConfig.whatsappNumber` menggunakan format internasional tanpa tanda plus, spasi, atau tanda hubung.

Contoh:

```ts
whatsappNumber: "6281234567890"
```

Seluruh CTA WhatsApp akan otomatis menggunakan nomor ini. Selama placeholder belum diganti, CTA tetap membuka WhatsApp share dengan pesan yang sudah disiapkan tanpa nomor tujuan.

### `[LINK_INSTAGRAM]` dan `[LINK_TIKTOK]`

Ubah `siteConfig.instagramUrl` dan `siteConfig.tiktokUrl` menjadi URL lengkap. Selama masih placeholder, link mengarah ke section kontak dan tidak membuka halaman palsu.

### `[LOGO]`

Saat ini logo menggunakan wordmark berbasis teks melalui `BrandMark` di `app/components.tsx`. Setelah file logo tersedia:

1. Letakkan aset di `public/images/logo.svg`.
2. Ganti isi `BrandMark` dengan `next/image` atau inline SVG.
3. Pertahankan `aria-label` pada link logo.

### `[VIDEO_SHOWREEL]`

Ubah `siteConfig.showreelUrl` di `app/data.ts`. Nilai `null` sengaja menampilkan label `Showreel coming soon` tanpa tombol play palsu.

Untuk video lokal, letakkan file terkompresi di `public/video/`. Jika ingin player di dalam halaman, ganti poster pada komponen `Showreel` dengan elemen `<video controls preload="none">` dan tetap sediakan poster serta subtitle bila ada dialog.

### `[DAFTAR_PORTOFOLIO]`

Ubah array `portfolioItems` di `app/data.ts`:

```ts
{
  id: "project-slug",
  number: "01",
  category: "motorcycle",
  categoryLabel: "Motorcycle Film / Custom Build",
  title: "Judul Project",
  description: "Deskripsi singkat project.",
  scope: "Direction / Production / Edit / Color / Sound",
  visualClass: "visual-motorcycle",
  mediaSrc: "/images/portfolio/project-cover.webp",
  mediaAlt: "Deskripsi visual yang spesifik",
  projectUrl: "https://..."
}
```

Jika `mediaSrc` belum ada, kartu menampilkan placeholder visual. Jika `projectUrl` belum ada, kartu menampilkan `Case study coming soon` dan tidak membuat tombol palsu.

## Aset yang Disarankan

- Hero desktop: WebP/AVIF 16:9, minimal 2560 x 1440.
- Hero mobile: WebP/AVIF 4:5 atau 9:16 dengan crop khusus.
- Poster showreel: WebP/AVIF 16:9 atau 2.35:1.
- Thumbnail portfolio: WebP/AVIF 16:10 desktop dan crop 4:5 mobile.
- Video: WebM/MP4 terkompresi, versi bitrate desktop dan mobile.

Placeholder CSS berada di `app/globals.css`. Setelah aset asli tersedia, hero dapat memakai `<picture>` atau `next/image` dan portfolio sudah mendukung `mediaSrc` langsung dari data.

## SEO Sebelum Launch

1. Ganti `metadataBase` di `app/layout.tsx` dari `https://example.com` ke domain produksi.
2. Perbarui lokasi `[NAMA_KOTA]` pada footer di `app/page.tsx`.
3. Verifikasi title, description, dan keywords berdasarkan lokasi serta market final.
4. Tambahkan favicon di `app/icon.png` atau `app/icon.svg`.
5. Tambahkan JSON-LD LocalBusiness atau ProfessionalService setelah alamat, nomor, dan URL final tersedia.

## Catatan Aksesibilitas dan Performa

- Semantic section, heading hierarchy, skip link, focus state, dan keyboard controls sudah tersedia.
- Animasi menghormati `prefers-reduced-motion`.
- Tidak ada video autoplay atau aset stock berat dalam initial load.
- Portfolio image memakai lazy loading ketika `mediaSrc` diisi.
- Tidak ada informasi penting yang hanya tersedia melalui hover.
- Layout menggunakan `overflow-x: clip` dan breakpoint khusus mobile untuk mencegah horizontal overflow.
