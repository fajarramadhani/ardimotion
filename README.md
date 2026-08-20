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
- `app/components.tsx`: navigation, filter portfolio, lazy Google Drive player, accordion layanan, showreel, reveal animation, dan link WhatsApp.
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

### Video portfolio Google Drive

Setiap video wajib dibagikan dengan pengaturan berikut agar player bekerja bagi pengunjung:

```text
General access: Anyone with the link
Role: Viewer
```

Jangan gunakan akses `Restricted`, `Editor`, atau `Commenter`. Uji link melalui jendela Incognito tanpa login untuk memastikan video tidak hanya dapat dibuka oleh pemilik akun.

> **Peringatan keamanan:** folder `PROJECT ARDI` saat ini terdeteksi menggunakan `Anyone with the link -> Writer`. Pemilik Drive wajib mengubah izin publik folder tersebut menjadi `Anyone with the link -> Viewer`. Website tidak dan tidak boleh mengubah permission Google Drive melalui kode.

Ambil File ID dari bagian di antara `/d/` dan `/view` pada link file. Jangan gunakan link folder.

```text
Link:        https://drive.google.com/file/d/1AbCdEfGhIjKlMnOpQrStUvWxYz/view?usp=sharing
File ID:     1AbCdEfGhIjKlMnOpQrStUvWxYz
Preview URL: https://drive.google.com/file/d/1AbCdEfGhIjKlMnOpQrStUvWxYz/preview
```

Tambahkan File ID, bukan kode iframe atau URL lengkap, ke `portfolioItems` di `app/data.ts`:

```ts
{
  id: "project-slug",
  number: "01",
  category: "motorcycle",
  categoryLabel: "Automotive / Speedramp",
  title: "Judul Karya",
  description: "Deskripsi singkat project.",
  scope: "Edit / Compositing / Color / Sound",
  visualClass: "visual-car",
  mediaSrc: "/portfolio/project-cover.webp",
  mediaAlt: "Deskripsi visual yang spesifik",
  driveFileId: "1AbCdEfGhIjKlMnOpQrStUvWxYz",
  orientation: "portrait"
}
```

Simpan poster WebP atau AVIF di `public/portfolio` dengan target ukuran sekitar 100-250 KB. Jangan gunakan link Drive sebagai `mediaSrc`. Jika poster belum ada, kartu mempertahankan placeholder cinematic. Jika `driveFileId` belum ada, kartu menampilkan status profesional tanpa tombol play palsu.

Player memakai URL Drive `/preview` dan baru membuat iframe setelah tombol `Putar Film` ditekan. Link `/view` tersedia di modal sebagai fallback jika browser memblokir third-party cookies atau preview belum selesai diproses.

Checklist sebelum publikasi:

1. Pastikan link berasal dari file video, bukan folder.
2. Pastikan aksesnya `Anyone with the link` dan perannya `Viewer`.
3. Buka link `/view` dan `/preview` melalui Incognito tanpa login.
4. Tunggu pemrosesan Google Drive selesai jika preview belum dapat diputar.
5. Pastikan `driveFileId` tidak memuat `/view`, query string, atau URL lengkap.

## Aset yang Disarankan

- Hero desktop: WebP/AVIF 16:9, minimal 2560 x 1440.
- Hero mobile: WebP/AVIF 4:5 atau 9:16 dengan crop khusus.
- Poster showreel: WebP/AVIF 16:9 atau 2.35:1.
- Thumbnail portfolio: WebP/AVIF 16:10 desktop dan crop 4:5 mobile.
- Video: disimpan di Google Drive dan diputar melalui Drive preview; jangan masukkan video besar ke repository.

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
- Portfolio image memakai `next/image` dan lazy loading ketika `mediaSrc` diisi.
- Tidak ada request Google Drive atau iframe sebelum pengunjung menekan `Putar Film`.
- Tidak ada informasi penting yang hanya tersedia melalui hover.
- Layout menggunakan `overflow-x: clip` dan breakpoint khusus mobile untuk mencegah horizontal overflow.
