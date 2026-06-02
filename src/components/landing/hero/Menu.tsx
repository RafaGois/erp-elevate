"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowUpRight, Menu as MenuIcon, X } from "lucide-react";
import { DotGothic16, Press_Start_2P } from "next/font/google";
import MenuItem from "./MenuItem";
import "./menu.css";

const fontDisplay = DotGothic16({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hero-display",
  display: "swap",
});

const fontPixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hero-pixel",
  display: "swap",
});

const COMPANY_LOGO =
  "https://res.cloudinary.com/dn454izoh/image/upload/v1755007271/IMG_0854_zii4ia.png";

const menuLinks = [
  { key: "about-us", label: "Sobre nós", href: "#about-us" },
  { key: "services", label: "Serviços", href: "#services" },
  { key: "problemas", label: "Problemas", href: "#problemas" },
  { key: "clients", label: "Clientes", href: "#clients" },
  { key: "contact", label: "Contato", href: "#contact" },
] as const;

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/eduardomarketingcraze?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "Dribbble", href: "https://dribbble.com" },
] as const;

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  const navigateTo = useCallback(
    (link: (typeof menuLinks)[number]) => {
      closeMenu();
      window.setTimeout(() => {
        scrollToSection(link.key);
        window.history.replaceState(null, "", link.href);
      }, 320);
    },
    [closeMenu]
  );

  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.top = `-${scrollY}px`;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeMenu]);

  return (
    <header
      className={`landing-menu ${fontDisplay.variable} ${fontPixel.variable}`}
    >
      <div className="landing-menu__header">
        <nav className="landing-menu__pill" aria-label="Navegação principal">
          <Link href="#hero" className="landing-menu__logo">
            <Image
              src={COMPANY_LOGO}
              alt="Elevate"
              width={120}
              height={36}
              className="landing-menu__logo-img"
              priority
            />
          </Link>

          <div className="landing-menu__links">
            {menuLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="landing-menu__link"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.key);
                  window.history.replaceState(null, "", link.href);
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="landing-menu__end">
            <Link href="/auth" className="landing-menu__cta">
              Entrar
            </Link>
            <button
              type="button"
              className="landing-menu__toggle"
              aria-expanded={isOpen}
              aria-controls="landing-menu-overlay"
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
              onClick={() => setIsOpen((open) => !open)}
            >
              {isOpen ? <X size={18} /> : <MenuIcon size={18} />}
            </button>
          </div>
        </nav>
      </div>

      <div
        id="landing-menu-overlay"
        className={`landing-menu__overlay ${isOpen ? "is-open" : ""}`}
        aria-hidden={!isOpen}
      >
        <div className="landing-menu__overlay-scanlines" aria-hidden />

        <div className="landing-menu__overlay-top">
          <span className="landing-menu__overlay-kicker">// Menu</span>
          <button
            type="button"
            className="landing-menu__overlay-close"
            onClick={closeMenu}
          >
            Fechar
          </button>
        </div>

        <nav className="landing-menu__overlay-nav" aria-label="Menu mobile">
          {menuLinks.map((link, i) => (
            <MenuItem
              key={link.key}
              link={link}
              index={i}
              onNavigate={navigateTo}
            />
          ))}
        </nav>

        <div className="landing-menu__overlay-footer">
          <div className="landing-menu__social">
            {socialLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="landing-menu__social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
                <ArrowUpRight size={12} aria-hidden />
              </Link>
            ))}
          </div>
          <Link
            href="/auth"
            className="landing-menu__overlay-cta"
            onClick={closeMenu}
          >
            Iniciar projeto
          </Link>
        </div>
      </div>
    </header>
  );
}
