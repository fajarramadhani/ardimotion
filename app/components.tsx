"use client";

import { useEffect, useRef, useState } from "react";
import {
  getExternalUrl,
  getWhatsAppUrl,
  portfolioCategories,
  portfolioItems,
  services,
  siteConfig,
  type PortfolioCategory,
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
      <strong>{siteConfig.brandName}</strong>
      <span>{siteConfig.descriptor}</span>
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

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.classList.add("menu-open");
    closeButtonRef.current?.focus();
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", onKeyDown);
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

      <div id="mobile-menu" className={`mobile-menu${open ? " is-open" : ""}`} aria-hidden={!open}>
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
  const visibleItems = portfolioItems.filter(
    (item) => activeCategory === "all" || item.category === activeCategory,
  );

  return (
    <section className="works section-dark" id="works" aria-labelledby="works-title">
      <div className="shell section-heading split-heading">
        <div>
          <p className="eyebrow">Selected Works / 01-03</p>
          <h2 id="works-title">Karya yang berbicara lewat detail.</h2>
        </div>
        <p className="section-intro">
          Project terpilih dengan karakter, ritme, dan visual treatment yang berbeda.
        </p>
      </div>

      <div className="shell portfolio-filters" aria-label="Filter kategori karya">
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

      <div className="shell portfolio-list" aria-live="polite">
        {visibleItems.map((item) => (
          <article className="project" key={item.id}>
            <div className={`project-media media-placeholder ${item.visualClass}`}>
              {item.mediaSrc ? (
                // Native img keeps portfolio data editable without configuring remote image hosts.
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.mediaSrc} alt={item.mediaAlt ?? item.title} loading="lazy" />
              ) : (
                <>
                  <span className="media-label">[DAFTAR_PORTOFOLIO] / {item.number}</span>
                  <div className="visual-object" aria-hidden="true" />
                </>
              )}
            </div>
            <div className="project-copy">
              <p className="project-index">{item.number} / {item.categoryLabel}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p className="project-scope">{item.scope}</p>
              {item.projectUrl ? (
                <a className="text-link" href={item.projectUrl} target="_blank" rel="noreferrer">
                  Lihat Project <ArrowIcon />
                </a>
              ) : (
                <span className="project-pending">Case study coming soon</span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Services() {
  const [active, setActive] = useState(0);

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    const expanded = active === index;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActive(expanded ? -1 : index);
    }
  };

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
              onKeyDown={(e) => handleKeyDown(e, index)}
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
