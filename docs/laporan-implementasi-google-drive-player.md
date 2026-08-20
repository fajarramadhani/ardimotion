# Laporan Implementasi Google Drive Portfolio Player

Tanggal implementasi awal: 19 Agustus 2026
Pembaruan aktivasi video: 20 Agustus 2026
Project: ARDI MOTION - Cinematic Visual Studio
Repository branch: `main`

## Ringkasan

Sistem portofolio ARDI MOTION telah dimigrasikan agar siap memutar video melalui Google Drive preview tanpa memasukkan file video besar ke repository.

Video tidak dimuat saat halaman pertama dibuka. Halaman hanya menampilkan poster atau placeholder cinematic. Iframe Google Drive baru dibuat setelah pengunjung menekan tombol `Putar Film`, dan iframe dihapus kembali dari DOM ketika modal ditutup.

Implementasi dilakukan pada kondisi repository terbaru tanpa checkout ke commit lama dan tanpa menghapus perubahan milik pengguna.

## 1. Kondisi Repository Sebelum Perubahan

- Branch aktif: `main`.
- Commit terakhir: `5be1df3 fix: improve responsive design for all devices`.
- Branch lokal sinkron dengan `origin/main`.
- Terdapat perubahan pengguna pada `app/components.tsx` dan `app/globals.css` untuk penggunaan logo `/img/LOGO_ARDIUNN.png`.
- Terdapat direktori untracked: `artifacts/`, `docs/`, `img/`, dan `public/`.
- Seluruh perubahan dan file pengguna dipertahankan.
- Tidak dilakukan checkout ke commit lama.
- Konfigurasi Vercel tetap menggunakan framework Next.js dan tidak mengatur Output Directory ke `public`.

Sistem portofolio sebelum migrasi:

- Memiliki filter kategori berbasis tombol.
- Memiliki tiga karya placeholder.
- Menggunakan properti opsional `projectUrl`.
- Menggunakan native `<img>` untuk poster portofolio.
- Belum memiliki `youtubeId` atau iframe YouTube.
- Belum memiliki modal video.
- Belum memiliki lazy Google Drive player.
- Focus restoration, Escape handler, dan scroll locking baru tersedia pada menu mobile, belum pada video.

## 2. Pemeriksaan Awal

Perintah baseline yang dijalankan:

```bash
npm run typecheck
npm run lint
npm run build
```

Hasil baseline:

- `lint` berhasil dengan satu warning native `<img>` pada logo.
- `build` berhasil.
- First Load JS route utama: `91.3 kB`.
- Percobaan `typecheck` awal mengalami race karena dijalankan bersamaan dengan `next build` ketika `.next/types` sedang dibuat ulang.
- `typecheck` kemudian dijalankan ulang secara berurutan dan berhasil.

## 3. File Yang Diubah

- `.gitignore`
- `README.md`
- `app/components.tsx`
- `app/data.ts`
- `app/globals.css`
- `docs/laporan-implementasi-google-drive-player.md`

File konfigurasi berikut tidak diubah:

- `app/layout.tsx`
- `app/page.tsx`
- `next.config.mjs`
- `vercel.json`
- `package.json`

## 4. Migrasi Struktur Data

### Sebelum

```ts
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
```

### Sesudah

```ts
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
```

Perubahan utama:

- `projectUrl` dihapus dari sistem portofolio.
- `mediaAlt` sekarang wajib diisi.
- `driveFileId` ditambahkan sebagai satu-satunya data sumber video.
- `orientation` ditambahkan untuk menentukan rasio player.
- Kode iframe dan URL lengkap tidak disimpan di data.

## 5. Daftar Karya

Enam karya telah disiapkan di `app/data.ts`:

| Nomor | Judul | Status Video | Status Poster |
| --- | --- | --- | --- |
| 01 | Speedramp Krakenn | Aktif | Menunggu poster |
| 02 | JJ Vaby vs Varky | Aktif | Menunggu poster |
| 03 | Speedramp Amarti | Aktif | Menunggu poster |
| 04 | El Neraka | Aktif | Menunggu poster |
| 05 | Speedramp V4 | Aktif | Menunggu poster |
| 06 | Speedramp Casper | Aktif | Menunggu poster |

Enam Google Drive File ID terverifikasi telah dipasang sebagai ID mentah, tanpa URL lengkap atau kode iframe:

| Karya | Google Drive File ID |
| --- | --- |
| Speedramp Krakenn | `188Xcz-fn426xS4ZUv6LYnEi9QizfEWw2` |
| JJ Vaby vs Varky | `1S08Nvg1L3IfWkdE-qpznoAIeZzFtWylz` |
| Speedramp Amarti | `184Atv9yvnffdgYcUwh9JmvTPvRPygV_U` |
| El Neraka | `16r7uxRiYBAiqsP6XVQMAYyqygakKTUeC` |
| Speedramp V4 | `10DAiQUGIt-fKMqsqF1ViWrYsRqlWjSjl` |
| Speedramp Casper | `1fSVlg1IMl_ekWhNsdpwuIIQKfXovzZCZ` |

Kategori, deskripsi, dan scope yang belum dikonfirmasi ditandai dengan komentar `TODO` dan teks status yang eksplisit di `app/data.ts`.

## 6. Helper Google Drive

Helper berikut ditambahkan ke `app/data.ts`:

```ts
export function getDrivePreviewUrl(fileId: string) {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

export function getDriveViewUrl(fileId: string) {
  return `https://drive.google.com/file/d/${fileId}/view`;
}
```

Penggunaan URL:

- `/preview` digunakan oleh iframe modal.
- `/view` digunakan sebagai fallback untuk membuka video langsung di Google Drive.
- Tidak menggunakan direct download URL, `uc?export=download`, atau `uc?id=`.

## 7. Fitur Google Drive Player

Fitur yang telah ditambahkan:

- Iframe tidak dibuat pada initial page load.
- Tombol `Putar Film` hanya dirender jika `driveFileId` tersedia.
- Karya aktif disimpan melalui satu state `activeVideo`.
- Hanya satu modal dan satu iframe yang dapat aktif.
- Iframe menggunakan Google Drive `/preview`.
- Modal menyediakan fallback `Buka video di Google Drive` dengan URL `/view`.
- Menutup modal mengubah `activeVideo` menjadi `null`.
- Iframe benar-benar dihapus dari DOM saat modal ditutup.
- Pemutaran video dan audio berhenti ketika iframe dihapus.
- Tidak ada library video tambahan.

Jika video belum tersedia:

- Tidak ada tombol play aktif.
- Tidak ada link `#` palsu.
- Tidak ada iframe kosong.
- Area media menampilkan `Poster & video segera hadir`.
- Area copy menampilkan `Video sedang disiapkan`.

## 8. Accessibility Modal

Modal mendukung:

- `role="dialog"`.
- `aria-modal="true"`.
- `aria-labelledby` yang mengarah ke judul karya.
- Tombol visual `Tutup`.
- Klik backdrop untuk menutup.
- Tombol Escape untuk menutup.
- Focus trap di dalam dialog.
- Fokus awal ke tombol tutup.
- Focus restoration ke tombol play yang membuka modal.
- Body scroll lock menggunakan class `video-open`.
- Pembersihan body class dan event listener saat modal ditutup atau komponen unmount.
- Focus state yang terlihat.
- Modal berada di atas navigation dan sticky WhatsApp CTA.

Heading halaman tetap memiliki satu elemen `h1`.

## 9. Poster Dan Image Optimization

Poster portofolio telah dimigrasikan dari native `<img>` ke `next/image`:

```tsx
<Image
  src={item.mediaSrc}
  alt={item.mediaAlt}
  fill
  sizes="(max-width: 960px) 100vw, 72vw"
  loading="lazy"
/>
```

Ketentuan implementasi:

- Parent media memiliki `position: relative` dan `overflow: hidden`.
- Gambar menggunakan `object-fit: cover`.
- Poster di bawah fold menggunakan lazy loading.
- Tidak semua poster diberi `priority`.
- Rasio media stabil untuk mencegah layout shift.
- Link Google Drive tidak digunakan sebagai poster.
- Frame Drive tidak digunakan pada initial page load.

Rekomendasi aset:

- Simpan poster di `public/portfolio`.
- Gunakan WebP atau AVIF.
- Target ukuran sekitar 100-250 KB per poster.

Logo pengguna juga dimigrasikan ke `next/image`, sehingga warning lint native `<img>` telah diselesaikan tanpa mengubah tampilan logo.

## 10. Responsivitas

Perbaikan responsif dari commit `5be1df3` tetap dipertahankan.

Desktop:

- Alternating portfolio layout tetap aktif.
- Karya ganjil menampilkan media di kiri dan copy di kanan.
- Karya genap menampilkan copy di kiri dan media di kanan.
- Tombol play diposisikan di tengah media.
- Landscape modal menggunakan rasio `16 / 9`.
- Portrait modal menggunakan rasio `9 / 16`.

Tablet dan mobile:

- Pada breakpoint maksimal `960px`, seluruh karya menjadi satu kolom.
- Media selalu tampil sebelum copy.
- Zig-zag desktop tidak dipertahankan pada layar kecil.
- Filter kategori dapat di-scroll horizontal.
- Tap target filter minimal 44 piksel.
- Modal dibatasi menggunakan `100svh`.
- Header modal sticky agar tombol close tetap terlihat.
- Sticky WhatsApp memiliki z-index lebih rendah daripada modal.
- `overflow-x: clip` tetap digunakan untuk mencegah horizontal overflow.

Motion tetap menghormati `prefers-reduced-motion`.

## 11. Performa

Verifikasi production HTML menghasilkan:

```text
Iframes:         0
DriveUrls:       0
H1s:             1
PortfolioItems:  6
PlayButtons:     6
PreviewStatuses: 6
```

Kesimpulan:

- Initial HTML tidak memiliki iframe.
- Initial HTML tidak memiliki URL Google Drive.
- Tidak ada request video sebelum interaksi.
- Tidak ada autoplay pada initial load.
- Hanya satu iframe yang dapat dibuat.
- Iframe dihapus ketika modal ditutup.
- Tidak ada file MP4 besar yang ditambahkan ke repository.
- Tidak ada link Drive private di metadata SEO.

Pola file video berikut ditambahkan ke `.gitignore`:

```gitignore
*.mp4
*.mov
*.mkv
*.avi
```

Tidak ada file yang sudah dilacak yang dihapus.

## 12. Hasil Verifikasi Akhir

Perintah dijalankan secara berurutan:

```bash
npm run typecheck
npm run lint
npm run build
```

### Typecheck

```text
tsc --noEmit
```

Hasil: berhasil tanpa error.

### Lint

```text
No ESLint warnings or errors
```

Hasil: berhasil tanpa warning atau error.

### Production Build

```text
Compiled successfully
Linting and checking validity of types
Generating static pages
```

Hasil: berhasil.

Terdapat warning Next.js berikut:

```text
Using edge runtime on a page currently disables static generation for that page
```

Warning tersebut berasal dari route edge yang sudah ada dan tidak disebabkan oleh Google Drive player. Route utama tetap tercatat sebagai static.

## 13. First Load JS

Sebelum perubahan:

```text
91.3 kB
```

Setelah perubahan:

```text
Route /: 97.5 kB
Shared: 87.1 kB
```

Tidak ada library player tambahan. Perubahan ukuran berasal dari state/modal client dan integrasi `next/image`.

## 14. Pengujian Mobile Dan Desktop

Yang telah diverifikasi:

- Build produksi berhasil.
- Initial DOM tidak memiliki iframe atau URL Drive.
- Filter tetap menggunakan elemen `button`.
- Initial HTML memiliki tepat satu `h1`.
- Enam karya dirender.
- Enam tombol play dirender untuk enam video aktif.
- Filter data menghasilkan 4 karya Motor, 2 karya Mobil, dan 0 karya Produk.
- Filter Produk memiliki empty state `Karya kategori produk sedang disiapkan.`.
- Struktur CSS mempertahankan alternating layout desktop.
- Struktur CSS mengubah semua karya menjadi satu kolom pada tablet dan mobile.
- Rasio portrait dan landscape tersedia.
- Modal memiliki batas tinggi berdasarkan viewport.
- Tidak ditemukan hydration error saat build.

Playwright, Puppeteer, atau browser automation lain tidak tersedia di dependency repository. Oleh karena itu, pengujian visual interaktif pada seluruh ukuran viewport berikut belum dijalankan melalui browser automation:

```text
320 x 568
360 x 800
390 x 844
430 x 932
768 x 1024
1024 x 768
1366 x 768
1440 x 900
1920 x 1080
```

File ID video telah tersedia. Pengujian interaktif dan screenshot tetap bergantung pada ketersediaan browser automation di repository.

Endpoint `/preview` keenam video merespons dengan nama file yang sesuai:

- `Speedramp Krakenn 4.mp4`.
- `JJ Vaby vs Varky.mp4`.
- `Speedramp Amarti.mp4`.
- `El Neraka.mp4`.
- `Speedramp V4.mp4`.
- `Speedramp Casper.mp4`.

Endpoint fallback `/view` untuk keenam karya juga merespons dengan nama file yang sesuai. Respons Drive masih menampilkan konteks login, sehingga playback visual dan audio penuh tidak diklaim telah diuji tanpa browser automation.

## 15. Cara Menambahkan Video Baru

1. Upload video ke Google Drive.
2. Buka pengaturan share.
3. Gunakan `General access: Anyone with the link`.
4. Gunakan role `Viewer`.
5. Jangan gunakan `Restricted`, `Editor`, atau `Commenter`.
6. Uji link melalui Incognito tanpa login.
7. Ambil File ID di antara `/d/` dan `/view`.
8. Masukkan File ID ke `driveFileId` pada karya terkait di `app/data.ts`.
9. Tentukan `orientation` sebagai `portrait` atau `landscape`.
10. Tambahkan poster WebP/AVIF ke `public/portfolio`.
11. Masukkan path poster ke `mediaSrc`.

Contoh link:

```text
https://drive.google.com/file/d/1AbCdEfGhIjKlMnOpQrStUvWxYz/view?usp=sharing
```

File ID:

```text
1AbCdEfGhIjKlMnOpQrStUvWxYz
```

Contoh data:

```ts
{
  id: "project-slug",
  number: "01",
  category: "car",
  categoryLabel: "Automotive / Speedramp",
  title: "Judul Karya",
  description: "Deskripsi singkat karya.",
  scope: "Edit / Compositing / Color / Sound",
  visualClass: "visual-car",
  mediaSrc: "/portfolio/project-cover.webp",
  mediaAlt: "Deskripsi visual poster karya",
  driveFileId: "1AbCdEfGhIjKlMnOpQrStUvWxYz",
  orientation: "portrait",
}
```

Jangan memasukkan URL lengkap atau kode iframe ke `driveFileId`.

## 16. Data Yang Masih Perlu Diberikan Ardi

Google Drive File ID untuk keenam karya sudah diterima. Data lain yang masih diperlukan:

- Poster WebP/AVIF setiap karya.
- Konfirmasi kategori setiap karya.
- Konfirmasi deskripsi dan scope karya 02-06.
- Konfirmasi orientasi portrait atau landscape setiap video.
- Nomor WhatsApp final.
- Link Instagram final.
- Link TikTok final.
- Nama kota.
- Video showreel jika tersedia.

## 17. Masalah Yang Masih Tersisa

- Poster portofolio asli belum tersedia.
- Deskripsi dan scope final karya 02-06 masih perlu konfirmasi.
- Browser automation belum tersedia untuk pengujian visual seluruh viewport.
- Direktori `public/` masih untracked; logo `public/img/LOGO_ARDIUNN.png` perlu ikut dimasukkan jika perubahan nanti di-commit.

## 18. Peringatan Keamanan Google Drive

Folder `PROJECT ARDI` saat ini terdeteksi menggunakan izin:

```text
Anyone with the link -> Writer
```

Izin tersebut tidak aman untuk folder yang digunakan oleh website publik. Pemilik Google Drive wajib mengubahnya menjadi:

```text
Anyone with the link -> Viewer
```

Kode website tidak mencoba dan tidak boleh mencoba mengubah permission Google Drive. Setup produksi belum dapat dinyatakan sepenuhnya aman selama akses publik folder masih `Writer`.

## 19. Status Commit Dan Deployment

Status perubahan:

- Perubahan masih lokal.
- Belum di-commit.
- Belum di-push.
- Belum di-deploy.

URL website saat ini:

```text
https://ardimotion-weld.vercel.app/
```

URL tersebut belum memuat perubahan lokal ini sampai perubahan di-commit, di-push, dan benar-benar berhasil di-deploy ke Vercel.
