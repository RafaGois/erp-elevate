"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useCallback } from "react";
import type { CustomizacaoBlockData } from "@/lib/types/budget-content";
import EditableField from "./EditableField";

// ─── Theme definitions ────────────────────────────────────────────────────────

interface Theme {
  key: string;
  label: string;
  description: string;
  tag: string;
  // Browser chrome
  chromeBg: string;
  chromeText: string;
  // Nav
  navBg: string;
  navText: string;
  navRadius: string;
  navBorder: string;
  // Hero section
  heroBg: string;
  heroAccent: string;
  heroHeading: string;
  heroSub: string;
  // CTA Button
  btnBg: string;
  btnText: string;
  btnRadius: string;
  btnBorder: string;
  btnShadow: string;
  // Cards
  cardBg: string;
  cardBorder: string;
  cardRadius: string;
  cardShadow: string;
  cardIconBg: string;
  cardIconColor: string;
  cardTitle: string;
  cardBody: string;
  // Decorative shape
  shapeBg: string;
  shapeRadius: string;
  shapeOpacity: string;
  shape2Bg: string;
  shape2Radius: string;
  // Footer strip
  footerBg: string;
  footerText: string;
  // Page background
  pageBg: string;
  // Accent bar (indicator dots)
  accentColor: string;
}

const THEMES: Theme[] = [
  {
    key: "corporativo",
    label: "Identidade corporativa",
    description: "Transmite autoridade e credibilidade para o seu segmento.",
    tag: "Formal · Confiança",
    chromeBg: "#E8ECF0",
    chromeText: "#4A5568",
    navBg: "#1E3A8A",
    navText: "#FFFFFF",
    navRadius: "0px",
    navBorder: "none",
    heroBg: "#FFFFFF",
    heroAccent: "#1E3A8A",
    heroHeading: "#0F1F4A",
    heroSub: "#64748B",
    btnBg: "#1E3A8A",
    btnText: "#FFFFFF",
    btnRadius: "0px",
    btnBorder: "none",
    btnShadow: "none",
    cardBg: "#F8FAFC",
    cardBorder: "#CBD5E1",
    cardRadius: "0px",
    cardShadow: "none",
    cardIconBg: "#EFF6FF",
    cardIconColor: "#1E3A8A",
    cardTitle: "#0F1F4A",
    cardBody: "#64748B",
    shapeBg: "#DBEAFE",
    shapeRadius: "0px",
    shapeOpacity: "0.8",
    shape2Bg: "#1E3A8A",
    shape2Radius: "0px",
    footerBg: "#1E3A8A",
    footerText: "#BFDBFE",
    pageBg: "#FFFFFF",
    accentColor: "#1E3A8A",
  },
  {
    key: "criativo",
    label: "Presença criativa",
    description: "Cores e formas que traduzem a personalidade única da sua marca.",
    tag: "Vibrante · Expressivo",
    chromeBg: "#EDE9FE",
    chromeText: "#5B21B6",
    navBg: "#7C3AED",
    navText: "#FFFFFF",
    navRadius: "16px",
    navBorder: "none",
    heroBg: "#F5F0FF",
    heroAccent: "#7C3AED",
    heroHeading: "#3B0764",
    heroSub: "#6D28D9",
    btnBg: "#7C3AED",
    btnText: "#FFFFFF",
    btnRadius: "9999px",
    btnBorder: "none",
    btnShadow: "0 8px 24px rgba(124,58,237,0.35)",
    cardBg: "#FFFFFF",
    cardBorder: "#DDD6FE",
    cardRadius: "20px",
    cardShadow: "0 4px 20px rgba(124,58,237,0.12)",
    cardIconBg: "#F3EFFE",
    cardIconColor: "#7C3AED",
    cardTitle: "#3B0764",
    cardBody: "#6D28D9",
    shapeBg: "#C4B5FD",
    shapeRadius: "9999px",
    shapeOpacity: "0.6",
    shape2Bg: "#A855F7",
    shape2Radius: "9999px",
    footerBg: "#7C3AED",
    footerText: "#EDE9FE",
    pageBg: "#F5F0FF",
    accentColor: "#7C3AED",
  },
  {
    key: "luxo",
    label: "Toque de luxo",
    description: "Elegância e sofisticação para quem quer se posicionar no topo.",
    tag: "Premium · Exclusivo",
    chromeBg: "#1C1C1C",
    chromeText: "#D4AF37",
    navBg: "#0F0F0F",
    navText: "#D4AF37",
    navRadius: "8px",
    navBorder: "1px solid rgba(212,175,55,0.3)",
    heroBg: "#141414",
    heroAccent: "#D4AF37",
    heroHeading: "#F5F0E0",
    heroSub: "#A89060",
    btnBg: "transparent",
    btnText: "#D4AF37",
    btnRadius: "4px",
    btnBorder: "1px solid #D4AF37",
    btnShadow: "0 0 20px rgba(212,175,55,0.2)",
    cardBg: "#1C1C1C",
    cardBorder: "rgba(212,175,55,0.35)",
    cardRadius: "6px",
    cardShadow: "0 4px 24px rgba(0,0,0,0.6)",
    cardIconBg: "rgba(212,175,55,0.1)",
    cardIconColor: "#D4AF37",
    cardTitle: "#F5F0E0",
    cardBody: "#A89060",
    shapeBg: "#D4AF37",
    shapeRadius: "4px",
    shapeOpacity: "0.15",
    shape2Bg: "#B8860B",
    shape2Radius: "50%",
    footerBg: "#0A0A0A",
    footerText: "#D4AF37",
    pageBg: "#141414",
    accentColor: "#D4AF37",
  },
  {
    key: "moderno",
    label: "Modernidade minimalista",
    description: "Clareza e foco: o essencial, com design que encanta.",
    tag: "Limpo · Contemporâneo",
    chromeBg: "#E8F5F0",
    chromeText: "#047857",
    navBg: "#FFFFFF",
    navText: "#047857",
    navRadius: "12px",
    navBorder: "1px solid #D1FAE5",
    heroBg: "#F8FAFC",
    heroAccent: "#10B981",
    heroHeading: "#064E3B",
    heroSub: "#6B7280",
    btnBg: "#10B981",
    btnText: "#FFFFFF",
    btnRadius: "9999px",
    btnBorder: "none",
    btnShadow: "0 4px 16px rgba(16,185,129,0.3)",
    cardBg: "#FFFFFF",
    cardBorder: "#D1FAE5",
    cardRadius: "12px",
    cardShadow: "0 2px 12px rgba(16,185,129,0.08)",
    cardIconBg: "#ECFDF5",
    cardIconColor: "#10B981",
    cardTitle: "#064E3B",
    cardBody: "#6B7280",
    shapeBg: "#A7F3D0",
    shapeRadius: "12px",
    shapeOpacity: "0.5",
    shape2Bg: "#10B981",
    shape2Radius: "50%",
    footerBg: "#064E3B",
    footerText: "#A7F3D0",
    pageBg: "#F8FAFC",
    accentColor: "#10B981",
  },
];

const VH_PER_STEP = 90;
const TOTAL_SCROLL_VH = VH_PER_STEP * (THEMES.length - 1);

// ─── Refs bag ─────────────────────────────────────────────────────────────────

interface MockupRefs {
  chrome: HTMLDivElement | null;
  nav: HTMLDivElement | null;
  navLinks: HTMLSpanElement | null;
  hero: HTMLDivElement | null;
  heroHeading: HTMLDivElement | null;
  heroSub: HTMLDivElement | null;
  btn: HTMLButtonElement | null;
  shape1: HTMLDivElement | null;
  shape2: HTMLDivElement | null;
  cardsSection: HTMLDivElement | null;
  cards: HTMLDivElement[];
  cardIcons: HTMLDivElement[];
  cardTitles: HTMLSpanElement[];
  cardBodies: HTMLSpanElement[];
  footerStrip: HTMLDivElement | null;
  footerText: HTMLSpanElement | null;
  page: HTMLDivElement | null;
}

function emptyRefs(): MockupRefs {
  return {
    chrome: null,
    nav: null,
    navLinks: null,
    hero: null,
    heroHeading: null,
    heroSub: null,
    btn: null,
    shape1: null,
    shape2: null,
    cardsSection: null,
    cards: [],
    cardIcons: [],
    cardTitles: [],
    cardBodies: [],
    footerStrip: null,
    footerText: null,
    page: null,
  };
}

// ─── Apply theme instantly (no tween) ────────────────────────────────────────

function applyThemeInstant(refs: MockupRefs, t: Theme) {
  const { chrome, nav, navLinks, hero, heroHeading, heroSub, btn, shape1, shape2,
    cardsSection, cards, cardIcons, cardTitles, cardBodies, footerStrip, footerText, page } = refs;

  if (chrome) { chrome.style.background = t.chromeBg; chrome.style.color = t.chromeText; }
  if (nav) { nav.style.background = t.navBg; nav.style.color = t.navText; nav.style.borderRadius = t.navRadius; nav.style.border = t.navBorder; }
  if (navLinks) navLinks.style.color = t.navText;
  if (hero) hero.style.background = t.heroBg;
  if (cardsSection) cardsSection.style.background = t.heroBg;
  if (heroHeading) heroHeading.style.color = t.heroHeading;
  if (heroSub) heroSub.style.color = t.heroSub;
  if (btn) {
    btn.style.background = t.btnBg;
    btn.style.color = t.btnText;
    btn.style.borderRadius = t.btnRadius;
    btn.style.border = t.btnBorder;
    btn.style.boxShadow = t.btnShadow;
  }
  if (shape1) { shape1.style.background = t.shapeBg; shape1.style.borderRadius = t.shapeRadius; shape1.style.opacity = t.shapeOpacity; }
  if (shape2) { shape2.style.background = t.shape2Bg; shape2.style.borderRadius = t.shape2Radius; }
  cards.forEach((card) => {
    card.style.background = t.cardBg;
    card.style.borderColor = t.cardBorder;
    card.style.borderRadius = t.cardRadius;
    card.style.boxShadow = t.cardShadow;
  });
  cardIcons.forEach((icon) => {
    icon.style.background = t.cardIconBg;
    icon.style.color = t.cardIconColor;
    icon.style.borderRadius = t.cardRadius;
  });
  cardTitles.forEach((el) => { el.style.color = t.cardTitle; });
  cardBodies.forEach((el) => { el.style.color = t.cardBody; });
  if (footerStrip) footerStrip.style.background = t.footerBg;
  if (footerText) footerText.style.color = t.footerText;
  if (page) page.style.background = t.pageBg;
}

// ─── Animate theme (smooth tween) ────────────────────────────────────────────

function morphToTheme(refs: MockupRefs, t: Theme) {
  const dur = 0.75;
  const ease = "power2.inOut";
  const { chrome, nav, navLinks, hero, heroHeading, heroSub, btn, shape1, shape2,
    cardsSection, cards, cardIcons, cardTitles, cardBodies, footerStrip, footerText, page } = refs;

  if (chrome) gsap.to(chrome, { backgroundColor: t.chromeBg, color: t.chromeText, duration: dur, ease });
  if (nav) gsap.to(nav, { backgroundColor: t.navBg, color: t.navText, borderRadius: t.navRadius, duration: dur, ease });
  if (navLinks) gsap.to(navLinks, { color: t.navText, duration: dur, ease });
  if (hero) gsap.to(hero, { backgroundColor: t.heroBg, duration: dur, ease });
  if (cardsSection) gsap.to(cardsSection, { backgroundColor: t.heroBg, duration: dur, ease });
  if (heroHeading) gsap.to(heroHeading, { color: t.heroHeading, duration: dur, ease });
  if (heroSub) gsap.to(heroSub, { color: t.heroSub, duration: dur, ease });
  if (btn) {
    gsap.to(btn, {
      backgroundColor: t.btnBg,
      color: t.btnText,
      borderRadius: t.btnRadius,
      boxShadow: t.btnShadow,
      duration: dur,
      ease,
    });
    btn.style.border = t.btnBorder;
  }
  if (shape1) gsap.to(shape1, { backgroundColor: t.shapeBg, borderRadius: t.shapeRadius, opacity: parseFloat(t.shapeOpacity), duration: dur, ease });
  if (shape2) gsap.to(shape2, { backgroundColor: t.shape2Bg, borderRadius: t.shape2Radius, duration: dur, ease });
  cards.forEach((card) => gsap.to(card, { backgroundColor: t.cardBg, borderColor: t.cardBorder, borderRadius: t.cardRadius, boxShadow: t.cardShadow, duration: dur, ease }));
  cardIcons.forEach((icon) => gsap.to(icon, { backgroundColor: t.cardIconBg, color: t.cardIconColor, borderRadius: t.cardRadius, duration: dur, ease }));
  cardTitles.forEach((el) => gsap.to(el, { color: t.cardTitle, duration: dur, ease }));
  cardBodies.forEach((el) => gsap.to(el, { color: t.cardBody, duration: dur, ease }));
  if (footerStrip) gsap.to(footerStrip, { backgroundColor: t.footerBg, duration: dur, ease });
  if (footerText) gsap.to(footerText, { color: t.footerText, duration: dur, ease });
  if (page) gsap.to(page, { backgroundColor: t.pageBg, duration: dur, ease });
}

// ─── MockupWindow component ───────────────────────────────────────────────────

const CARD_LABELS = ["Design", "Performance", "Conversão"];
const CARD_ICONS = ["◈", "◎", "◉"];

function MockupWindow({ refs }: { refs: MockupRefs }) {
  return (
    <div
      ref={(el) => { refs.page = el; }}
      className="relative w-full overflow-hidden rounded-xl shadow-2xl"
      style={{ background: THEMES[0].pageBg }}
    >
      {/* Browser chrome */}
      <div
        ref={(el) => { refs.chrome = el; }}
        className="flex items-center gap-2 px-3 py-2.5"
        style={{ background: THEMES[0].chromeBg }}
      >
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </div>
        <div
          className="mx-2 flex-1 rounded px-2 py-0.5 text-center font-mono"
          style={{ fontSize: "9px", background: "rgba(0,0,0,0.08)", color: "inherit" }}
        >
          seumercado.com.br
        </div>
      </div>

      {/* Nav bar */}
      <div
        ref={(el) => { refs.nav = el; }}
        className="mx-3 mt-3 flex items-center justify-between px-4 py-2.5"
        style={{
          background: THEMES[0].navBg,
          borderRadius: THEMES[0].navRadius,
          border: THEMES[0].navBorder,
        }}
      >
        {/* Logo placeholder */}
        <div className="flex items-center gap-2">
          <div
            className="h-5 w-5 rounded-sm"
            style={{ background: "currentColor", opacity: 0.9 }}
          />
          <span className="text-[10px] font-bold tracking-wide" style={{ color: "inherit" }}>
            MARCA
          </span>
        </div>
        {/* Nav links */}
        <span
          ref={(el) => { refs.navLinks = el; }}
          className="hidden gap-4 text-[9px] font-medium tracking-wide sm:flex"
          style={{ color: THEMES[0].navText }}
        >
          <span>Sobre</span>
          <span>Serviços</span>
          <span>Contato</span>
        </span>
      </div>

      {/* Hero section */}
      <div
        ref={(el) => { refs.hero = el; }}
        className="relative overflow-hidden px-5 pt-6 pb-5"
        style={{ background: THEMES[0].heroBg, minHeight: "160px" }}
      >
        {/* Decorative shapes */}
        <div
          ref={(el) => { refs.shape1 = el; }}
          className="pointer-events-none absolute right-4 top-2 h-24 w-24"
          style={{
            background: THEMES[0].shapeBg,
            borderRadius: THEMES[0].shapeRadius,
            opacity: parseFloat(THEMES[0].shapeOpacity),
          }}
        />
        <div
          ref={(el) => { refs.shape2 = el; }}
          className="pointer-events-none absolute right-12 top-10 h-10 w-10"
          style={{
            background: THEMES[0].shape2Bg,
            borderRadius: THEMES[0].shape2Radius,
            opacity: 0.4,
          }}
        />

        <div className="relative z-10 max-w-[55%]">
          <div
            ref={(el) => { refs.heroHeading = el; }}
            className="font-bold leading-tight"
            style={{ fontSize: "clamp(14px, 2.5vw, 22px)", color: THEMES[0].heroHeading }}
          >
            Feito para<br />você crescer.
          </div>
          <div
            ref={(el) => { refs.heroSub = el; }}
            className="mt-1.5 leading-snug"
            style={{ fontSize: "clamp(9px, 1.2vw, 11px)", color: THEMES[0].heroSub }}
          >
            Soluções digitais sob medida para o seu negócio.
          </div>
          <button
            ref={(el) => { refs.btn = el; }}
            className="mt-3 px-4 py-1.5 text-[10px] font-semibold tracking-wide transition-none"
            style={{
              background: THEMES[0].btnBg,
              color: THEMES[0].btnText,
              borderRadius: THEMES[0].btnRadius,
              border: THEMES[0].btnBorder,
              boxShadow: THEMES[0].btnShadow,
            }}
          >
            Falar com a gente
          </button>
        </div>
      </div>

      {/* Cards row */}
      <div
        ref={(el) => { refs.cardsSection = el; }}
        className="grid grid-cols-3 gap-2 px-3 pb-3 pt-2"
        style={{ background: THEMES[0].heroBg }}
      >
        {CARD_LABELS.map((label, i) => (
          <div
            key={label}
            ref={(el) => { if (el) refs.cards[i] = el; }}
            className="flex flex-col gap-1 border p-2.5"
            style={{
              background: THEMES[0].cardBg,
              borderColor: THEMES[0].cardBorder,
              borderRadius: THEMES[0].cardRadius,
              boxShadow: THEMES[0].cardShadow,
            }}
          >
            <div
              ref={(el) => { if (el) refs.cardIcons[i] = el; }}
              className="flex h-7 w-7 items-center justify-center text-base font-bold"
              style={{
                background: THEMES[0].cardIconBg,
                color: THEMES[0].cardIconColor,
                borderRadius: THEMES[0].cardRadius,
              }}
            >
              {CARD_ICONS[i]}
            </div>
            <span
              ref={(el) => { if (el) refs.cardTitles[i] = el; }}
              className="text-[9px] font-bold leading-none"
              style={{ color: THEMES[0].cardTitle }}
            >
              {label}
            </span>
            <span
              ref={(el) => { if (el) refs.cardBodies[i] = el; }}
              className="text-[8px] leading-snug"
              style={{ color: THEMES[0].cardBody }}
            >
              Estratégia para resultado real.
            </span>
          </div>
        ))}
      </div>

      {/* Footer strip */}
      <div
        ref={(el) => { refs.footerStrip = el; }}
        className="flex items-center justify-between px-5 py-2"
        style={{ background: THEMES[0].footerBg }}
      >
        <span
          ref={(el) => { refs.footerText = el; }}
          className="font-mono"
          style={{ fontSize: "8px", color: THEMES[0].footerText, letterSpacing: "0.12em" }}
        >
          © 2026 MARCA · Todos os direitos reservados
        </span>
        <span
          className="font-mono"
          style={{ fontSize: "8px", color: THEMES[0].footerText, opacity: 0.6 }}
        >
          ↑ Topo
        </span>
      </div>
    </div>
  );
}

// ─── Step indicator ───────────────────────────────────────────────────────────

function StepIndicator({ active, themes, accentColor }: { active: number; themes: Theme[]; accentColor: string }) {
  return (
    <div className="flex items-center gap-2">
      {themes.map((t, i) => (
        <div
          key={t.key}
          className="rounded-full transition-all duration-500"
          style={{
            width: i === active ? "24px" : "6px",
            height: "6px",
            background: i === active ? accentColor : "rgba(0,0,0,0.15)",
          }}
        />
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface Props {
  data: CustomizacaoBlockData;
  isAdmin?: boolean;
  onChange?: (d: CustomizacaoBlockData) => void;
}

export default function CustomizacaoBlock({ data, isAdmin = false, onChange }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const textLabelRef = useRef<HTMLDivElement>(null);
  const textDescRef = useRef<HTMLDivElement>(null);
  const textTagRef = useRef<HTMLDivElement>(null);
  const mockupRefs = useRef<MockupRefs>(emptyRefs());
  const currentStepRef = useRef(-1);
  const [activeStep, setActiveStep] = useState(0);

  const updateTextContent = useCallback((step: number) => {
    const t = THEMES[step];
    if (textLabelRef.current) textLabelRef.current.textContent = t.label;
    if (textDescRef.current) textDescRef.current.textContent = t.description;
    if (textTagRef.current) textTagRef.current.textContent = t.tag;
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current || !pinRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      ScrollTrigger.getById("customizacao-pin")?.kill();

      // Apply initial theme without animation
      applyThemeInstant(mockupRefs.current, THEMES[0]);
      currentStepRef.current = 0;

      const totalScroll = `+=${(window.innerHeight * TOTAL_SCROLL_VH) / 100}`;

      const pinTrigger = ScrollTrigger.create({
        id: "customizacao-pin",
        trigger: sectionRef.current,
        pin: pinRef.current,
        start: "top top",
        end: totalScroll,
        onUpdate: (self) => {
          const raw = self.progress * (THEMES.length - 1);
          const step = Math.min(Math.floor(raw + 0.15), THEMES.length - 1);

          if (step !== currentStepRef.current) {
            currentStepRef.current = step;
            setActiveStep(step);

            // Fade out text, swap, fade in
            const tl = gsap.timeline();
            tl.to([textLabelRef.current, textDescRef.current, textTagRef.current], {
              opacity: 0,
              y: -8,
              duration: 0.2,
              ease: "power2.in",
            })
              .call(() => { updateTextContent(step); })
              .to([textLabelRef.current, textDescRef.current, textTagRef.current], {
                opacity: 1,
                y: 0,
                duration: 0.35,
                ease: "power2.out",
              });

            // Morph mockup
            morphToTheme(mockupRefs.current, THEMES[step]);
          }
        },
      });

      return () => {
        pinTrigger.kill();
        ScrollTrigger.getById("customizacao-pin")?.kill();
      };
    },
    { scope: sectionRef, dependencies: [] }
  );

  const currentTheme = THEMES[activeStep];

  return (
    <section
      ref={sectionRef}
      id="customizacao"
      className="proposal-section relative overflow-x-clip bg-white"
    >
      <div
        ref={pinRef}
        className="proposal-container relative z-10 overflow-x-clip bg-white"
      >
        {/* Section header */}
        <header className="mb-10 md:mb-14 text-center">
          <span className="mb-3 inline-block rounded-full bg-black px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
            Feito para você
          </span>
          <h2 className="text-3xl font-bold text-black md:text-4xl lg:text-5xl">
            <EditableField
              value={data.titulo ?? "Seu site, sua identidade"}
              onChange={(v) => onChange?.({ ...data, titulo: v })}
              isAdmin={isAdmin}
              className="block"
            />
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-500 md:text-lg">
            <EditableField
              value={
                data.subtitulo ??
                "Cada projeto é construído do zero — seguindo a história, os gostos e o posicionamento de cada cliente."
              }
              onChange={(v) => onChange?.({ ...data, subtitulo: v })}
              isAdmin={isAdmin}
              tag="span"
              className="inline"
            />
          </p>
        </header>

        {/* Main area: text left + mockup right */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          {/* Left: morphing text */}
          <div className="flex flex-col gap-6 lg:order-1">
            <StepIndicator
              active={activeStep}
              themes={THEMES}
              accentColor={currentTheme.accentColor}
            />

            <div className="space-y-2">
              <div
                ref={textTagRef}
                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: currentTheme.accentColor, transition: "color 0.5s ease" }}
              >
                {THEMES[0].tag}
              </div>
              <div
                ref={textLabelRef}
                className="text-2xl font-bold text-black md:text-3xl lg:text-4xl leading-tight"
              >
                {THEMES[0].label}
              </div>
              <div
                ref={textDescRef}
                className="text-base text-neutral-500 leading-relaxed md:text-lg"
              >
                {THEMES[0].description}
              </div>
            </div>

            {/* Scroll hint */}
            <div className="flex items-center gap-2 text-[11px] text-neutral-400 select-none">
              <svg
                className="animate-bounce"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Role para explorar os estilos</span>
            </div>

            {/* Style counter */}
            <div className="text-[11px] text-neutral-400 font-mono tabular-nums">
              {activeStep + 1} / {THEMES.length}
            </div>
          </div>

          {/* Right: morphing mockup */}
          <div className="relative lg:order-2">
            {/* Glow behind mockup */}
            <div
              className="pointer-events-none absolute inset-0 -z-10 rounded-2xl blur-3xl transition-colors duration-700"
              style={{
                background: currentTheme.accentColor,
                opacity: 0.1,
                transform: "scale(1.15)",
              }}
            />
            <MockupWindow refs={mockupRefs.current} />
          </div>
        </div>

        {/* Bottom: all 4 styles shown as mini pills */}
        <div className="mt-12 flex flex-wrap justify-center gap-3 border-t border-neutral-100 pt-8">
          {THEMES.map((t, i) => (
            <div
              key={t.key}
              className="flex items-center gap-2 rounded-full border px-3 py-1.5 transition-all duration-300"
              style={{
                borderColor: i === activeStep ? t.accentColor : "#E5E7EB",
                background: i === activeStep ? t.accentColor + "12" : "transparent",
              }}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: t.accentColor }}
              />
              <span
                className="text-[11px] font-medium"
                style={{ color: i === activeStep ? t.accentColor : "#9CA3AF" }}
              >
                {t.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
