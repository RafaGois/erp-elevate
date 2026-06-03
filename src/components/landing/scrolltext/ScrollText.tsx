"use client";

import { useRef } from "react";
import type { LucideIcon } from "lucide-react";
import { DotGothic16, Press_Start_2P } from "next/font/google";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ClipboardList, Cog, Layers } from "lucide-react";

import { cn } from "@/lib/utils";
import "./scroll-text.css";

const fontDisplay = DotGothic16({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-industrial-display",
  display: "swap",
});

const fontPixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-industrial-pixel",
  display: "swap",
});

const COPY = {
  title: "Desenvolvimento de software com mentalidade industrial",
  subtitle:
    "Planejamento, produção, automação e gestão industrial sob medida — flexível e focado no seu processo.",
  stackHeading: "Três frentes, um sistema",
  stackFootLead: "Um único sistema conecta",
  stackFootFlow: "planejamento → produção → automação → gestão",
  stackFootTail: " — sem planilhas paralelas.",
} as const;

type StepItem = {
  step: string;
  chrome: string;
  title: string;
  description: string;
  outcome: string;
  icon: LucideIcon;
};

const STEPS: StepItem[] = [
  {
    step: "01",
    chrome: "PLANEJAR",
    title: "Da ordem ao chão de fábrica",
    description:
      "Programação, filas e apontamentos no mesmo lugar — quem opera e quem planeja enxergam a mesma prioridade.",
    outcome: "Capacidade sob controle",
    icon: ClipboardList,
  },
  {
    step: "02",
    chrome: "AUTOMATIZAR",
    title: "Um fluxo entre os setores",
    description:
      "Pedido, estoque, PCP e expedição conversam no sistema. Menos planilha paralela, menos retrabalho entre áreas.",
    outcome: "Operação sem ruído",
    icon: Cog,
  },
  {
    step: "03",
    chrome: "GERIR",
    title: "Gestão no ritmo da fábrica",
    description:
      "Painéis e indicadores moldados na sua operação — não adaptação forçada a um ERP genérico de prateleira.",
    outcome: "Dado certo, na hora",
    icon: Layers,
  },
];

function StepCard({
  item,
  wide = false,
}: {
  item: StepItem;
  wide?: boolean;
}) {
  const Icon = item.icon;

  return (
    <article className={cn("sf-card", wide && "sf-card--wide")}>
      {/* nameplate */}
      <div className="sf-card__nameplate">
        <span className="sf-card__num">{item.step}</span>
        <span className="sf-card__rule" aria-hidden />
        <span className="sf-card__verb">{item.chrome}</span>
      </div>

      {/* corpo */}
      <div className="sf-card__body">
        <span className="sf-card__ghost" aria-hidden>{item.step}</span>

        {wide ? (
          <>
            <div className="sf-card__wide-left">
              <span className="sf-card__icon-wrap" aria-hidden>
                <Icon className="sf-card__icon" strokeWidth={1.75} />
              </span>
              <h3 className="sf-card__title">{item.title}</h3>
            </div>
            <p className="sf-card__desc">{item.description}</p>
          </>
        ) : (
          <>
            <span className="sf-card__icon-wrap" aria-hidden>
              <Icon className="sf-card__icon" strokeWidth={1.75} />
            </span>
            <h3 className="sf-card__title">{item.title}</h3>
            <p className="sf-card__desc">{item.description}</p>
          </>
        )}
      </div>

      {/* status bar */}
      <div className="sf-card__foot">
        <span className="sf-card__dot" aria-hidden />
        <span className="sf-card__foot-label" aria-hidden>output</span>
        <span className="sf-card__outcome">{item.outcome}</span>
      </div>
    </article>
  );
}

const PIPELINE = ["Planejar", "Produzir", "Automatizar", "Gerir"] as const;

const MARQUEE_ITEMS = [
  "Planejamento",
  "Controle de produção",
  "Automação",
  "Gestão industrial",
  "Customizado",
  "Flexível",
  "Elevate",
] as const;

function MarqueeGroup() {
  return (
    <div className="industrial-fold__marquee-group" aria-hidden>
      {MARQUEE_ITEMS.map((item) => (
        <span key={item} className={item === "Elevate" ? "is-accent" : undefined}>
          ★ {item}
        </span>
      ))}
    </div>
  );
}

export default function ScrollText() {
  const sectionRef = useRef<HTMLElement>(null);
  const pipelineFillRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      gsap.registerPlugin(ScrollTrigger);

      const reveals = section.querySelectorAll("[data-industrial-reveal]");
      gsap.set(reveals, { opacity: 0, y: 28, filter: "blur(6px)" });

      gsap.to(reveals, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.85,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          toggleActions: "play none none none",
        },
      });

      if (pipelineFillRef.current) {
        ScrollTrigger.create({
          trigger: pipelineFillRef.current,
          start: "top 88%",
          onEnter: () => pipelineFillRef.current?.classList.add("is-ready"),
          once: true,
        });
      }

      const glyphs = section.querySelectorAll("[data-industrial-glyph]");
      glyphs.forEach((el) => {
        gsap.to(el, {
          y: -18,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="mentalidade-industrial"
      ref={sectionRef}
      className={`industrial-fold ${fontDisplay.variable} ${fontPixel.variable}`}
      aria-labelledby="industrial-fold-title"
    >
      <div className="industrial-fold__scanlines" aria-hidden />
      <div className="industrial-fold__grid" aria-hidden />
      <div className="industrial-fold__glow industrial-fold__glow--lime" aria-hidden />
      <div className="industrial-fold__glow industrial-fold__glow--emerald" aria-hidden />

      <svg
        className="industrial-fold__blueprint"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <pattern id="industrial-fold-dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="rgba(223,255,0,0.25)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#industrial-fold-dots)" opacity="0.4" />
        <path
          d="M80,400 H1120 M600,80 V720"
          stroke="rgba(242,240,235,0.08)"
          strokeWidth="1"
          strokeDasharray="8 10"
        />
        <path
          d="M200,120 Q600,40 1000,200 T1120,520"
          fill="none"
          stroke="#22c55e"
          strokeWidth="2"
          opacity="0.35"
          strokeDasharray="100 200"
          style={{ animation: "industrial-streak 28s linear infinite" }}
        />
        <path
          d="M120,680 Q480,620 900,700 T1120,400"
          fill="none"
          stroke="#dfff00"
          strokeWidth="2"
          opacity="0.4"
          strokeDasharray="90 210"
          style={{ animation: "industrial-streak 32s linear infinite 4s" }}
        />
      </svg>

      <span className="industrial-fold__glyph industrial-fold__glyph--a" data-industrial-glyph aria-hidden>
        {"{ }"}
      </span>
      <span className="industrial-fold__glyph industrial-fold__glyph--b" data-industrial-glyph aria-hidden>
        ◆
      </span>
      <span className="industrial-fold__glyph industrial-fold__glyph--c" data-industrial-glyph aria-hidden>
        PCP
      </span>

      <div className="industrial-fold__inner">
        <header className="industrial-fold__header" data-industrial-reveal>
          <p className="industrial-fold__kicker">
            <span className="industrial-fold__kicker-accent">// 01</span> — Mentalidade industrial
          </p>
        </header>

        <div className="industrial-fold__bento">
          <div className="industrial-fold__hero-panel" data-industrial-reveal>
            <h2 id="industrial-fold-title" className="industrial-fold__title">
              <span className="industrial-fold__title-line">Desenvolvimento de software</span>
              <span className="industrial-fold__title-line">
                com mentalidade{" "}
                <span className="industrial-fold__title-accent">industrial</span>
              </span>
            </h2>
            <p className="industrial-fold__subtitle">{COPY.subtitle}</p>
          </div>

          <div className="industrial-fold__pipeline" data-industrial-reveal>
            <div className="industrial-fold__pipeline-inner">
              <p className="industrial-fold__pipeline-kicker">
                <span className="industrial-fold__pipeline-kicker-mark">//</span> conexão total
              </p>
              <p className="industrial-fold__pipeline-copy">
                {COPY.stackFootLead}{" "}
                <span className="industrial-fold__pipeline-flow">{COPY.stackFootFlow}</span>
                {COPY.stackFootTail}
              </p>
              <div className="industrial-fold__pipeline-track" aria-hidden>
                <span ref={pipelineFillRef} className="industrial-fold__pipeline-fill" />
              </div>
              <div className="industrial-fold__pipeline-nodes">
                {PIPELINE.map((node) => (
                  <span key={node} className="industrial-fold__pipeline-node is-active">
                    {node}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="industrial-fold__steps-rail" data-industrial-reveal>
            <p className="industrial-fold__stack-heading">{COPY.stackHeading}</p>
            <div className="industrial-fold__steps-duo">
              <StepCard item={STEPS[0]} />
              <StepCard item={STEPS[1]} />
            </div>
          </div>

          <div className="industrial-fold__step-item industrial-fold__step-item--step3" data-industrial-reveal>
            <StepCard item={STEPS[2]} wide />
          </div>
        </div>

        <div className="industrial-fold__marquee-wrap" data-industrial-reveal>
          <div className="industrial-fold__marquee-track">
            <MarqueeGroup />
            <MarqueeGroup />
          </div>
        </div>
      </div>
    </section>
  );
}
