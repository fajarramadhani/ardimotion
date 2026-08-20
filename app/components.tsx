"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  getDrivePreviewUrl,
  getDriveViewUrl,
  getExternalUrl,
  getWhatsAppUrl,
  portfolioCategories,
  portfolioItems,
  services,
  siteConfig,
  type PortfolioCategory,
  type PortfolioItem,
} from "./data";

const navigation = [
  { href: "#works", label: "Karya" },
  { href: "#services", label: "Layanan" },
  { href: "#studio", label: "Studio" },
  { href: "#process", label: "Proses" },
];

export function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <a className={`brand-mark${inverse ? " brand-mark-dark" : ""}`} href="#top" aria-label="ARDI MOTION, kembali ke atas">
      <Image
        src="/img/LOGO_ARDIUNN.png"
        alt="ARDI MOTION"
        className="brand-logo"
        width={1080}
        height={1080}
        sizes="(max-width: 1080px) 8rem, 10rem"
      />
    </a>
  );
}

export function WhatsAppLink({
  children,
  className = "button button-primary",
  message = "Halo ARDI MOTION, saya ingin berkonsultasi mengenai project video. Boleh dibantu menentukan creative approach dan scope yang sesuai?",
}: {
  children: React.ReactNode;
  className?: string;
  message?: string;
}) {
  return (
    <a className={className} href={getWhatsAppUrl(message)} target="_blank" rel="noreferrer">
      {children}
      <ArrowIcon />
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const menuButton = menuButtonRef.current;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = menuRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.classList.add("menu-open");
    closeButtonRef.current?.focus();
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", onKeyDown);
      menuButton?.focus();
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="header-inner shell">
        <BrandMark />
        <nav className="desktop-nav" aria-label="Navigasi utama">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <WhatsAppLink className="header-cta">Konsultasi Project</WhatsAppLink>
        <button
          ref={menuButtonRef}
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          <span>Menu</span>
          <MenuIcon />
        </button>
      </div>

      <div
        ref={menuRef}
        id="mobile-menu"
        className={`mobile-menu${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigasi utama"
        aria-hidden={!open}
      >
        <div className="mobile-menu-top shell">
          <BrandMark />
          <button ref={closeButtonRef} className="menu-close" type="button" onClick={() => setOpen(false)}>
            <span>Tutup</span>
            <CloseIcon />
          </button>
        </div>
        <nav className="mobile-nav shell" aria-label="Navigasi mobile">
          {navigation.map((item, index) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              <span>0{index + 1}</span>
              {item.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            <span>05</span>
            Konsultasi
          </a>
        </nav>
      </div>
    </header>
  );
}

export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  );
}

export function Showreel() {
  return (
    <section className="showreel section-dark" id="showreel" aria-labelledby="showreel-title">
      <div className="shell section-heading split-heading">
        <div>
          <p className="eyebrow">Showreel / Selected Frames</p>
          <h2 id="showreel-title">Satu menit.<br />Seluruh karakter.</h2>
        </div>
        <p className="section-intro">
          Pilihan frame, movement, color, dan sound yang menunjukkan cara kami membangun energi dan atmosfer.
        </p>
      </div>
      <div className="shell">
        <div className="showreel-poster media-placeholder" aria-label="Poster showreel ARDI MOTION">
          <span className="media-label">[VIDEO_SHOWREEL]</span>
          <div className="showreel-object" aria-hidden="true" />
          <div className="showreel-light" aria-hidden="true" />
          <div className="showreel-status">
            <span className="status-dot" aria-hidden="true" />
            {siteConfig.showreelUrl ? (
              <a className="button button-primary" href={siteConfig.showreelUrl} target="_blank" rel="noreferrer">
                Putar Showreel <PlayIcon />
              </a>
            ) : (
              <p>Showreel coming soon</p>
            )}
          </div>
          <p className="showreel-meta">Automotive / Product / Post-production</p>
        </div>
      </div>
    </section>
  );
}

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>("all");
  const [activeVideo, setActiveVideo] = useState<PortfolioItem | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const videoTriggerRef = useRef<HTMLButtonElement | null>(null);
  const visibleItems = portfolioItems.filter(
    (item) => activeCategory === "all" || item.category === activeCategory,
  );

  const openVideo = (item: PortfolioItem, trigger: HTMLButtonElement) => {
    if (!item.driveFileId) return;
    videoTriggerRef.current = trigger;
    setActiveVideo(item);
  };

  const closeVideo = () => setActiveVideo(null);

  useEffect(() => {
    if (!activeVideo?.driveFileId) return;

    const trigger = videoTriggerRef.current;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeVideo();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.classList.add("video-open");
    closeButtonRef.current?.focus();
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("video-open");
      window.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [activeVideo]);

  return (
    <section className="works section-dark" id="works" aria-labelledby="works-title">
      <div className="shell section-heading split-heading">
        <div>
          <p className="eyebrow">Selected Works / 01-06</p>
          <h2 id="works-title">Karya yang berbicara lewat detail.</h2>
        </div>
        <p className="section-intro">
          Project terpilih dengan karakter, ritme, dan visual treatment yang berbeda.
        </p>
      </div>

      <div className="shell portfolio-filters" role="group" aria-label="Filter kategori karya">
        {portfolioCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={activeCategory === category.id ? "is-active" : ""}
            aria-pressed={activeCategory === category.id}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <p className="visually-hidden" role="status" aria-live="polite">
        {visibleItems.length} karya ditampilkan.
      </p>
      <div className="shell portfolio-list">
        {visibleItems.map((item) => (
          <article className="project" key={item.id}>
            <div className={`project-media media-placeholder ${item.visualClass}`}>
              {item.mediaSrc ? (
                <Image
                  src={item.mediaSrc}
                  alt={item.mediaAlt}
                  fill
                  sizes="(max-width: 960px) 100vw, 72vw"
                  loading="lazy"
                />
              ) : (
                <>
                  <span className="media-label">[DAFTAR_PORTOFOLIO] / {item.number}</span>
                  <div className="visual-object" aria-hidden="true" />
                </>
              )}
              {item.driveFileId ? (
                <button
                  className="project-play"
                  type="button"
                  onClick={(event) => openVideo(item, event.currentTarget)}
                  aria-label={`Putar ${item.title}`}
                >
                  <PlayIcon /> <span>Putar Film</span>
                </button>
              ) : (
                <p className="project-media-status">Video sedang disiapkan</p>
              )}
              {!item.mediaSrc && item.driveFileId ? (
                <p className="project-media-status">Preview film tersedia</p>
              ) : null}
            </div>
            <div className="project-copy">
              <p className="project-index">{item.number} / {item.categoryLabel}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p className="project-scope">{item.scope}</p>
              {!item.driveFileId ? <span className="project-pending">Video sedang disiapkan</span> : null}
            </div>
          </article>
        ))}
        {visibleItems.length === 0 ? (
          <div className="portfolio-empty" role="status">
            <p className="eyebrow">Selected Works / Coming Soon</p>
            <h3>Karya kategori produk sedang disiapkan.</h3>
          </div>
        ) : null}
      </div>

      {activeVideo?.driveFileId ? (
        <div
          className="video-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
        >
          <button
            className="video-backdrop"
            type="button"
            onClick={closeVideo}
            aria-label="Tutup video"
          />
          <div
            ref={dialogRef}
            className={`video-dialog video-dialog-${activeVideo.orientation}`}
          >
            <div className="video-dialog-header">
              <div>
                <p>{activeVideo.categoryLabel}</p>
                <h3 id="video-modal-title">{activeVideo.title}</h3>
              </div>
              <button ref={closeButtonRef} type="button" onClick={closeVideo}>
                Tutup <CloseIcon />
              </button>
            </div>
            <div className="video-frame">
              <iframe
                src={getDrivePreviewUrl(activeVideo.driveFileId)}
                title={`Video ${activeVideo.title}`}
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
            <div className="video-fallback">
              <p>Tidak dapat memutar preview?</p>
              <a
                className="text-link"
                href={getDriveViewUrl(activeVideo.driveFileId)}
                target="_blank"
                rel="noreferrer"
              >
                Buka video di Google Drive <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export function Services() {
  const [active, setActive] = useState(0);

  return (
    <div className="services-list">
      {services.map((service, index) => {
        const expanded = active === index;
        return (
          <article className={`service${expanded ? " is-active" : ""}`} key={service.title}>
            <button
              className="service-trigger"
              type="button"
              aria-expanded={expanded}
              aria-controls={`service-panel-${index}`}
              onClick={() => setActive(expanded ? -1 : index)}
            >
              <span className="service-number">{service.number}</span>
              <span className="service-title-wrap">
                <strong>{service.title}</strong>
                <small>{service.lead}</small>
              </span>
              <span className="service-toggle" aria-hidden="true">{expanded ? "-" : "+"}</span>
            </button>
            <div id={`service-panel-${index}`} className="service-panel" hidden={!expanded}>
              <p>{service.description}</p>
              <p className="service-scope">{service.scope}</p>
              <WhatsAppLink className="text-link" message={service.whatsappMessage}>
                {service.whatsappLabel}
              </WhatsAppLink>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function MobileStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const updateVisibility = () => {
      frame = 0;
      const hero = document.getElementById("top");
      const contact = document.getElementById("contact");
      if (!hero || !contact) return;

      setVisible(hero.getBoundingClientRect().bottom <= 0 && contact.getBoundingClientRect().top > window.innerHeight * 0.72);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <WhatsAppLink className={`mobile-sticky-cta${visible ? " is-visible" : ""}`}>
      Konsultasi Project
    </WhatsAppLink>
  );
}

export function SocialLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isPlaceholder = href.startsWith("[");
  return (
    <a
      href={getExternalUrl(href)}
      {...(!isPlaceholder ? { target: "_blank", rel: "noreferrer" } : {})}
      aria-label={isPlaceholder ? `${children} belum dikonfigurasi` : undefined}
    >
      {children}
      <ArrowIcon />
    </a>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 13 13 3M5 3h8v8" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="m5 3 8 5-8 5V3Z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M2 6h16M2 14h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="m4 4 12 12M16 4 4 16" />
    </svg>
  );
}
