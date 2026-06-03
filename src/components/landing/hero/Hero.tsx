"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { DotGothic16, Press_Start_2P } from "next/font/google";
import { ArrowRight, ChevronDown, Gamepad2 } from "lucide-react";
import { ELEVATE_WHATSAPP_URL } from "@/lib/data/contact-links";
import Menu from "./Menu";
import "./hero.css";

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

type HeroGlyph = {
  char: string;
  className: string;
  depth: number;
  delay: string;
  pixel?: boolean;
};

const GLYPHS: HeroGlyph[] = [
  { char: "▲", className: "left-[12%] top-[22%] text-3xl opacity-40", depth: 0.7, delay: "0s" },
  {
    char: "◆",
    className: "right-[14%] top-[18%] text-4xl opacity-40 text-[#dfff00]",
    depth: 1.1,
    delay: "0.6s",
  },
  {
    char: "{ }",
    className: "left-[18%] bottom-[20%] text-xl opacity-50 text-[#22c55e] landing-hero__float",
    depth: 0.9,
    delay: "1.1s",
    pixel: true,
  },
  { char: "●", className: "right-[20%] bottom-[24%] text-3xl opacity-40", depth: 1.2, delay: "0.3s" },
  {
    char: "✦",
    className: "left-[44%] top-[12%] text-2xl opacity-30 text-[#dfff00]",
    depth: 0.8,
    delay: "1.4s",
  },
  {
    char: "</>",
    className: "right-[40%] bottom-[12%] text-base opacity-40 landing-hero__float",
    depth: 1,
    delay: "0.9s",
    pixel: true,
  },
];

export default function Hero() {
  const glyphLayerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const layer = glyphLayerRef.current;
    if (!layer) return;

    const glyphs = layer.querySelectorAll<HTMLElement>("[data-glyph-depth]");

    const onMove = (e: PointerEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const loop = () => {
      smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * 0.06;
      smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * 0.06;

      glyphs.forEach((el) => {
        const depth = Number(el.dataset.glyphDepth) || 1;
        const x = smoothRef.current.x * 18 * depth;
        const y = smoothRef.current.y * 18 * depth;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      id="hero"
      className={`landing-hero relative flex min-h-[100svh] flex-col overflow-hidden ${fontDisplay.variable} ${fontPixel.variable}`}
    >
      <Menu />

      <video
        className="landing-hero__video"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      >
        <source src="/videofundo3.mp4" type="video/mp4" />
      </video>

      <div className="landing-hero__scrim" aria-hidden />
      <div className="landing-hero__grid" aria-hidden />
      <div className="landing-hero__blob landing-hero__blob--lime" aria-hidden />
      <div className="landing-hero__blob landing-hero__blob--emerald" aria-hidden />

      <svg
        className="landing-hero__streaks"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <path
          className="landing-hero__streak"
          d="M200,0 Q1320,80 1440,180"
          stroke="#22c55e"
          strokeWidth="6"
          opacity="0.4"
          strokeDasharray="100 200"
          style={{ animation: "landing-hero-streak 28s linear infinite" }}
        />
        <path
          className="landing-hero__streak"
          d="M160,0 Q1300,100 1440,220"
          stroke="#22c55e"
          strokeWidth="5"
          opacity="0.32"
          strokeDasharray="90 210"
          style={{ animation: "landing-hero-streak 32s linear infinite 4s" }}
        />
        <path
          className="landing-hero__streak"
          d="M240,900 Q120,780 0,620"
          stroke="#dfff00"
          strokeWidth="6"
          opacity="0.42"
          strokeDasharray="100 200"
          style={{ animation: "landing-hero-streak 26s linear infinite 1s" }}
        />
        <path
          className="landing-hero__streak"
          d="M200,900 Q100,820 0,720"
          stroke="#dfff00"
          strokeWidth="5"
          opacity="0.32"
          strokeDasharray="90 210"
          style={{ animation: "landing-hero-streak 30s linear infinite 6s" }}
        />
      </svg>

      <div ref={glyphLayerRef} className="landing-hero__glyphs" aria-hidden>
        {GLYPHS.map((g, i) => (
          <span
            key={i}
            data-glyph-depth={g.depth}
            className={`landing-hero__glyph landing-hero__float ${g.className} ${g.pixel ? fontPixel.className : ""}`}
            style={{ animationDelay: g.delay }}
          >
            {g.char}
          </span>
        ))}
      </div>

      <div className="landing-hero__scanlines" aria-hidden />

      <div className="landing-hero__content mx-auto flex min-h-[100svh] w-full max-w-4xl flex-col items-center justify-center px-6 pb-16 pt-24 text-center">
        <div className="landing-hero__rise landing-hero__rise--1 mb-6 flex justify-center">
          <span className="landing-hero__badge">
            <span className="landing-hero__badge-dot" />
            Fábrica de software · Usuário em primeiro lugar
          </span>
        </div>

        <h1 className="landing-hero__title landing-hero__rise landing-hero__rise--2">
          Construímos seu <span className="landing-hero__title-accent">futuro</span> digital
          <span className="landing-hero__cursor">_</span>
        </h1>

        <p className="landing-hero__rise landing-hero__rise--3 mx-auto mt-6 max-w-xl text-base leading-relaxed text-[var(--hero-muted)] md:text-lg">
          Digitalização de empresas, Sistemas de Controle Industrial com adaptabilidade e
           <span className="landing-hero__arcade">personalização</span> para o seu problema e negócio.
        </p>

        <div className="landing-hero__actions landing-hero__rise landing-hero__rise--4 mt-9">
          <Link
            href={ELEVATE_WHATSAPP_URL}
            className="landing-hero__pixel-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Gamepad2 size={14} strokeWidth={2.5} aria-hidden />
            Iniciar projeto
          </Link>
          <Link
            href="#services"
            className="landing-hero__pixel-btn landing-hero__pixel-btn--secondary"
          >
            Ver serviços
            <ArrowRight size={14} strokeWidth={2.5} aria-hidden />
          </Link>
        </div>

        <div className="landing-hero__rise landing-hero__rise--5 mt-16 flex flex-col items-center gap-2 text-[var(--hero-muted)]">
          <span className="landing-hero__scroll-label">Role para explorar</span>
          <ChevronDown size={20} className="landing-hero__float opacity-70" aria-hidden />
        </div>
      </div>
    </section>
  );
}
