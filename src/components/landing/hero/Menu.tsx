"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu as MenuIcon, X } from "lucide-react";
import { DotGothic16, Press_Start_2P } from "next/font/google";
import { ELEVATE_WHATSAPP_URL } from "@/lib/data/contact-links";
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
    href: "https://www.instagram.com/elevatepromediaoficial/",
  },
  { label: "WhatsApp", href: ELEVATE_WHATSAPP_URL },
] as const;

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Duração da animação de saída do overlay (menu.css) */
const MENU_CLOSE_MS = 400;

const SCROLL_HIDE_THRESHOLD = 48;
const SCROLL_DELTA_MIN = 8;

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const lastScrollYRef = useRef(0);
  const scrollTickingRef = useRef(false);

  const overlayActive = isOpen || isClosing;

  const openMenu = useCallback(() => {
    setIsClosing(false);
    setIsOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    if (!isOpen && !isClosing) return;
    setIsOpen(false);
    setIsClosing(true);
  }, [isOpen, isClosing]);

  const toggleMenu = useCallback(() => {
    if (isOpen) closeMenu();
    else openMenu();
  }, [isOpen, closeMenu, openMenu]);

  const navigateTo = useCallback(
    (link: (typeof menuLinks)[number]) => {
      closeMenu();
      window.setTimeout(() => {
        scrollToSection(link.key);
        window.history.replaceState(null, "", link.href);
      }, MENU_CLOSE_MS);
    },
    [closeMenu]
  );

  useEffect(() => {
    if (!isClosing) return;
    const id = window.setTimeout(() => setIsClosing(false), MENU_CLOSE_MS);
    return () => window.clearTimeout(id);
  }, [isClosing]);

  useEffect(() => {
    if (!overlayActive) return;

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
  }, [overlayActive, closeMenu]);

  useEffect(() => {
    const mobileMq = window.matchMedia("(max-width: 767px)");

    const updateHeaderVisibility = () => {
      scrollTickingRef.current = false;

      if (!mobileMq.matches || overlayActive) {
        setHeaderHidden(false);
        return;
      }

      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollYRef.current;

      if (scrollY < SCROLL_HIDE_THRESHOLD) {
        setHeaderHidden(false);
      } else if (delta > SCROLL_DELTA_MIN) {
        setHeaderHidden(true);
      } else if (delta < -SCROLL_DELTA_MIN) {
        setHeaderHidden(false);
      }

      lastScrollYRef.current = scrollY;
    };

    const onScroll = () => {
      if (scrollTickingRef.current) return;
      scrollTickingRef.current = true;
      requestAnimationFrame(updateHeaderVisibility);
    };

    const onBreakpointChange = () => {
      if (!mobileMq.matches) setHeaderHidden(false);
    };

    lastScrollYRef.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    mobileMq.addEventListener("change", onBreakpointChange);

    return () => {
      window.removeEventListener("scroll", onScroll);
      mobileMq.removeEventListener("change", onBreakpointChange);
    };
  }, [overlayActive]);

  return (
    <header
      className={`landing-menu ${fontDisplay.variable} ${fontPixel.variable}`}
    >
      <div
        className={`landing-menu__header ${headerHidden ? "is-hidden" : ""}`}
      >
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

          <p className="landing-menu__center">Sistemas Elevate</p>

          <div className="landing-menu__end">
            <Link href="/auth" className="landing-menu__cta">
              Entrar
            </Link>
            <button
              type="button"
              className="landing-menu__toggle"
              aria-expanded={overlayActive}
              aria-controls="landing-menu-overlay"
              aria-label={overlayActive ? "Fechar menu" : "Abrir menu"}
              onClick={toggleMenu}
            >
              {isOpen ? <X size={18} /> : <MenuIcon size={18} />}
            </button>
          </div>
        </nav>
      </div>

      <div
        id="landing-menu-overlay"
        className={`landing-menu__overlay ${isOpen ? "is-open" : ""} ${isClosing ? "is-closing" : ""}`}
        aria-hidden={!overlayActive}
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
          <div className="landing-menu__footer-actions">
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
              Entrar
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
