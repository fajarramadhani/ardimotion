import {
  BrandMark,
  Header,
  Portfolio,
  Reveal,
  Services,
  Showreel,
  SocialLink,
  WhatsAppLink,
} from "./components";
import { processSteps, siteConfig } from "./data";

const studioReasons = [
  {
    number: "01",
    title: "Karakter Sebelum Gaya",
    description:
      "Visual treatment dimulai dari karakter kendaraan, produk, brand, dan audiensnya, bukan satu formula yang dipakai berulang.",
  },
  {
    number: "02",
    title: "Detail di Setiap Cut",
    description:
      "Pacing, color, texture, dan sound dirancang sebagai satu kesatuan. Tidak ada efek hanya untuk terlihat ramai.",
  },
  {
    number: "03",
    title: "Satu Arah Visual",
    description:
      "Konsep, production, editing, color, sound, dan delivery bergerak dalam treatment yang konsisten.",
  },
];

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Lewati ke konten utama</a>
      <Header />

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-media media-placeholder" aria-hidden="true">
            <div className="hero-light" />
            <div className="hero-vehicle">
              <span className="wheel wheel-front" />
              <span className="wheel wheel-back" />
            </div>
          </div>
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-inner shell">
            <div className="hero-topline">
              <p className="eyebrow">ARDI MOTION / Cinematic Visual Studio</p>
              <p className="technical-label">Frame 001 / 00:12:08</p>
            </div>
            <div className="hero-copy">
              <h1 id="hero-title">Karakter,<br /><span>dihidupkan</span><br />dalam gerak.</h1>
              <p>
                Film cinematic untuk motor, mobil, produk, dan brand. Dibangun dari konsep terarah, visual presisi, dan post-production yang detail.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#works">
                  Lihat Karya <span aria-hidden="true">↓</span>
                </a>
                <WhatsAppLink className="button button-secondary">Konsultasikan Project</WhatsAppLink>
              </div>
              <small>Custom scope berdasarkan kebutuhan project.</small>
            </div>
            <p className="hero-placeholder">Visual placeholder / [LOGO] / Hero asset</p>
          </div>
        </section>

        <Reveal><Showreel /></Reveal>
        <Reveal><Portfolio /></Reveal>

        <section className="manifesto section-light" id="studio" aria-labelledby="manifesto-title">
          <div className="shell manifesto-grid">
            <p className="eyebrow">Studio Statement / 04</p>
            <h2 id="manifesto-title">Kami tidak membuat semua project terlihat sama.</h2>
            <p>
              Setiap kendaraan, produk, dan brand memiliki karakter berbeda. Tugas kami adalah menemukan bahasa visual yang tepat, lalu membangunnya melalui direction, movement, editing, color, dan sound.
            </p>
            <strong>Bukan template. Bukan sekadar montage.</strong>
          </div>
        </section>

        <Reveal>
          <section className="services section-dark" id="services" aria-labelledby="services-title">
            <div className="shell section-heading split-heading">
              <div>
                <p className="eyebrow">Services / Custom Scope</p>
                <h2 id="services-title">Satu studio.<br />Empat cara untuk memulai.</h2>
              </div>
              <div className="section-intro">
                <p>Datang dengan footage, ide, atau kebutuhan campaign. Scope disusun sesuai tujuan dan output.</p>
                <p className="scope-note">Tidak ada daftar harga terbuka. Setiap estimasi mengikuti kompleksitas project.</p>
              </div>
            </div>
            <div className="shell"><Services /></div>
          </section>
        </Reveal>

        <section className="why section-olive" aria-labelledby="why-title">
          <div className="shell section-heading split-heading">
            <div>
              <p className="eyebrow">Why ARDI MOTION / 05</p>
              <h2 id="why-title">Bukan sekadar bagus. Harus terasa tepat.</h2>
            </div>
            <p className="section-intro">
              Setiap keputusan visual dibuat berdasarkan karakter project dan respons yang ingin dibangun dari penonton.
            </p>
          </div>
          <div className="shell reason-grid">
            {studioReasons.map((reason) => (
              <article key={reason.number}>
                <span>{reason.number}</span>
                <h3>{reason.title}</h3>
                <p>{reason.description}</p>
              </article>
            ))}
          </div>
        </section>

        <Reveal>
          <section className="process section-dark" id="process" aria-labelledby="process-title">
            <div className="shell section-heading split-heading">
              <div>
                <p className="eyebrow">Process / 01-05</p>
                <h2 id="process-title">Setiap frame dimulai dengan arah.</h2>
              </div>
              <p className="section-intro">Proses terstruktur agar konsep, produksi, dan hasil akhir bergerak dalam satu visi.</p>
            </div>
            <ol className="shell process-list">
              {processSteps.map((step) => (
                <li key={step.number}>
                  <div className="process-number">{step.number}</div>
                  <div className="process-name">
                    <span>{step.label}</span>
                    <h3>{step.title}</h3>
                  </div>
                  <div className="process-copy">
                    <p>{step.description}</p>
                    <small>Output / {step.output}</small>
                  </div>
                </li>
              ))}
            </ol>
            <div className="shell process-note">
              <p>Jumlah tahap review dan deliverables disepakati dalam scope sebelum project dimulai.</p>
              <WhatsAppLink className="text-link">Mulai dari Brief</WhatsAppLink>
            </div>
          </section>
        </Reveal>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <div className="contact-visual" aria-hidden="true"><span /></div>
          <div className="shell contact-grid">
            <p className="eyebrow">Start a Project / 06</p>
            <h2 id="contact-title">Punya project yang layak ditampilkan dengan tepat?</h2>
            <div className="contact-copy">
              <p>
                Ceritakan kebutuhan, referensi, timeline, dan output yang Anda inginkan. Kami akan membantu menentukan creative approach dan scope yang sesuai.
              </p>
              <WhatsAppLink className="button button-dark">Konsultasi via WhatsApp</WhatsAppLink>
              <small>Konsultasi awal tanpa komitmen. Respons pada jam operasional.</small>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-top">
          <BrandMark />
          <p>Character, Set in Motion.</p>
        </div>
        <div className="shell footer-wordmark" aria-hidden="true">ARDI MOTION</div>
        <div className="shell footer-grid">
          <p>Cinematic films dan professional post-production untuk motor, mobil, produk, dan brand.</p>
          <nav aria-label="Navigasi footer">
            <a href="#works">Karya</a>
            <a href="#services">Layanan</a>
            <a href="#process">Proses</a>
          </nav>
          <div className="footer-socials">
            <SocialLink href={siteConfig.instagramUrl}>Instagram</SocialLink>
            <SocialLink href={siteConfig.tiktokUrl}>TikTok</SocialLink>
            <WhatsAppLink className="footer-social-link">WhatsApp</WhatsAppLink>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>Based in [NAMA_KOTA] / Available across Indonesia</span>
          <span>Copyright 2026 ARDI MOTION</span>
        </div>
      </footer>

      <WhatsAppLink className="mobile-sticky-cta">Konsultasi Project</WhatsAppLink>
    </>
  );
}
