"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, Menu as MenuIcon, X } from "lucide-react";
import { DotGothic16, Press_Start_2P } from "next/font/google";
import { ELEVATE_WHATSAPP_URL } from "@/lib/data/contact-links";
import MenuItem from "@/components/landing/hero/MenuItem";
import "@/components/landing/hero/menu.css";
import "./service-landing-menu.css";

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

const SERVICE_NAV_LINKS = [
  { key: "problema", label: "Problema", href: "#problema" },
  { key: "solucao", label: "Solução", href: "#solucao" },
  { key: "entregaveis", label: "Entregáveis", href: "#entregaveis" },
  { key: "cases", label: "Cases", href: "#cases" },
  { key: "faq", label: "FAQ", href: "#faq" },
  { key: "contato", label: "Contato", href: "#contato" },
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

const MENU_CLOSE_MS = 400;
const SCROLL_HIDE_THRESHOLD = 48;
const SCROLL_DELTA_MIN = 8;

type Props = {
  /** Título exibido no centro da pill em mobile */
  title?: string;
};

export default function ServiceLandingMenu({
  title = "Presença Digital",
}: Props) {
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
    (link: (typeof SERVICE_NAV_LINKS)[number]) => {
      closeMenu();
      window.setTimeout(() => {
        scrollToSection(link.key);
        window.history.replaceState(null, "", link.href);
      }, MENU_CLOSE_MS);
    },
    [closeMenu],
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
      className={`landing-menu slp-menu ${fontDisplay.variable} ${fontPixel.variable}`}
    >
      <div
        className={`landing-menu__header ${headerHidden ? "is-hidden" : ""}`}
      >
        <nav
          className="landing-menu__pill slp-menu__pill"
          aria-label="Navegação da página de serviço"
        >
          <Link href="/#services" className="slp-menu__back">
            <ArrowLeft size={16} aria-hidden />
            <span>Voltar</span>
          </Link>

          <div className="landing-menu__links slp-menu__links">
            {SERVICE_NAV_LINKS.map((link) => (
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

          <p className="landing-menu__center">{title}</p>

          <div className="slp-menu__end">
            <button
              type="button"
              className="landing-menu__toggle"
              aria-expanded={overlayActive}
              aria-controls="slp-menu-overlay"
              aria-label={overlayActive ? "Fechar menu" : "Abrir menu"}
              onClick={toggleMenu}
            >
              {isOpen ? <X size={18} /> : <MenuIcon size={18} />}
            </button>
          </div>
        </nav>
      </div>

      <div
        id="slp-menu-overlay"
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
          {SERVICE_NAV_LINKS.map((link, i) => (
            <MenuItem
              key={link.key}
              link={link}
              index={i}
              onNavigate={navigateTo}
            />
          ))}
        </nav>

        <div className="landing-menu__overlay-footer">
          <div className="landing-menu__footer-actions slp-menu__footer">
            <Link
              href="/#services"
              className="landing-menu__social-link"
              onClick={closeMenu}
            >
              Voltar aos serviços
              <ArrowUpRight size={12} aria-hidden />
            </Link>
            <div className="landing-menu__social">
              {socialLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="landing-menu__social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                >
                  {item.label}
                  <ArrowUpRight size={12} aria-hidden />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
