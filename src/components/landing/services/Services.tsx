"use client";

import { useState, useRef, useEffect } from "react";
import { DotGothic16, Press_Start_2P } from "next/font/google";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import {
  Globe,
  Factory,
  BarChart3,
  Workflow,
  Code2,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import "./services.css";

/* ─── Fonts ──────────────────────────────────────────────────── */
const fontDisplay = DotGothic16({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-svc-display",
  display: "swap",
});

const fontPixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-svc-pixel",
  display: "swap",
});

/* ─── Data ───────────────────────────────────────────────────── */
type ServiceItem = {
  slug: string;
  index: string;
  sys: string;
  name: string;
  teaser: string;
  description: string;
  features: string[];
  icon: LucideIcon;
};

const SERVICES: ServiceItem[] = [
  {
    slug: "digitalizacao",
    index: "01",
    sys: "PRESENCE",
    name: "Presença Digital Corporativa",
    teaser: "Do papel à tela — presença online integrada",
    description:
      "Estruturamos sua presença digital de ponta a ponta: sistemas web alinhados à identidade da empresa, integração entre canais e processos, e uma base tecnológica que cresce junto com a operação.",
    features: [
      "Sistemas web alinhados à sua marca e processo",
      "Integração entre canais digitais e operação interna",
      "Base escalável — do site ao ERP corporativo",
    ],
    icon: Globe,
  },
  {
    slug: "pcp",
    index: "02",
    sys: "PROD_CTRL",
    name: "Sistemas de Controle de Produção",
    teaser: "PCP, MES e chão de fábrica em um único sistema",
    description:
      "Plataformas para gestão de ordens, planejamento de capacidade e acompanhamento em tempo real do chão de fábrica — com indicadores de OEE, prazos e produtividade integrados.",
    features: [
      "Ordens de produção, capacidade e sequenciamento",
      "Acompanhamento em tempo real do chão de fábrica",
      "KPIs de OEE, lead time e cumprimento de prazos",
    ],
    icon: Factory,
  },
  {
    slug: "dashboards",
    index: "03",
    sys: "BI_DATA",
    name: "BI Industrial e Análise de Dados",
    teaser: "Dados brutos → decisão em tempo real",
    description:
      "Painéis estratégicos que transformam dados de múltiplas fontes em visão clara para decisão: operacional, gerencial e executiva — com alertas automáticos e atualização contínua.",
    features: [
      "Dashboards operacionais e gerenciais unificados",
      "OEE, qualidade e eficiência por máquina ou célula",
      "Alertas configuráveis e relatórios automáticos",
    ],
    icon: BarChart3,
  },
  {
    slug: "integracao-automacao",
    index: "04",
    sys: "INTEGR",
    name: "Integração com Automação Industrial",
    teaser: "Sistemas, máquinas e ERPs em um único fluxo",
    description:
      "Conectamos sistemas, PLCs, ERPs e fontes de dados para eliminar retrabalho e falhas de comunicação — automação de rotinas, ETL e fluxos que reduzem intervenção manual.",
    features: [
      "APIs, ETL e sincronização entre sistemas e máquinas",
      "Automação de rotinas e fluxos manuais repetitivos",
      "Integração com ERPs, PLCs e sensores IIoT",
    ],
    icon: Workflow,
  },
  {
    slug: "sistemas-sob-medida",
    index: "05",
    sys: "CUSTOM",
    name: "Desenvolvimento Sob Medida",
    teaser: "Nenhum software pronto resolve? Criamos o seu",
    description:
      "Softwares exclusivos para necessidades que soluções prontas não atendem — desde módulos complementares até aplicações completas, com arquitetura documentada e ciclo iterativo com sua equipe.",
    features: [
      "Arquitetura escalável e documentada para evolução",
      "Interface desenhada para quem opera no dia a dia",
      "Ciclo iterativo com entregas parciais e validação",
    ],
    icon: Code2,
  },
];

/* ─── Streaks SVG (decorative data-flow lines) ───────────────── */
function StreaksSVG() {
  return (
    <svg
      className="svc__streaks"
      viewBox="0 0 1440 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {[
        { d: "M -50 140 Q 400 80 900 140 T 1600 120", delay: 0, dur: 8 },
        { d: "M -80 310 Q 350 280 820 310 T 1550 290", delay: 1.8, dur: 11 },
        { d: "M -20 520 Q 500 490 1000 520 T 1500 510", delay: 3.5, dur: 9.5 },
        { d: "M 200 680 Q 650 650 1100 675 T 1480 660", delay: 0.9, dur: 13 },
        { d: "M -100 420 Q 600 390 1050 420 T 1600 400", delay: 5, dur: 10 },
      ].map((s, i) => (
        <path
          key={i}
          d={s.d}
          fill="none"
          stroke="rgba(223,255,0,0.35)"
          strokeWidth="1"
          strokeDasharray="120 600"
          style={{
            animationName: "svc-streak",
            animationDuration: `${s.dur}s`,
            animationDelay: `${s.delay}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          }}
        />
      ))}
    </svg>
  );
}

/* ─── Component ──────────────────────────────────────────────── */
export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelBodyRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const isFirstMount = useRef(true);


  /* ── Entrance animation (ScrollTrigger) ───────────────── */
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const header = sectionRef.current?.querySelector("[data-svc-header]");
      const listItems =
        sectionRef.current?.querySelectorAll("[data-svc-item]");
      const panel = sectionRef.current?.querySelector("[data-svc-panel]");
      const panelReveal =
        sectionRef.current?.querySelectorAll("[data-svc-reveal]");

      if (!header || !listItems?.length || !panel) return;

      /* initial states */
      gsap.set(header, { y: -28, opacity: 0, filter: "blur(5px)" });
      gsap.set(listItems, { x: -55, opacity: 0, filter: "blur(4px)" });
      gsap.set(panel, { clipPath: "inset(0 100% 0 0)", opacity: 1 });
      if (panelReveal?.length) gsap.set(panelReveal, { y: 0, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 68%",
          toggleActions: "play none none none",
        },
      });

      tl
        /* 1. header descends */
        .to(header, {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power3.out",
          clearProps: "filter",
        })
        /* 2. list items stagger from left */
        .to(
          listItems,
          {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            stagger: 0.1,
            duration: 0.65,
            ease: "power3.out",
            clearProps: "filter",
          },
          "-=0.25",
        )
        /* 3. panel wipes in from left-to-right */
        .to(
          panel,
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.8,
            ease: "power2.inOut",
          },
          "-=0.5",
        )
        /* 4. panel content items stagger up */
        .to(
          panelReveal ?? [],
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.35",
        );
    },
    { scope: sectionRef },
  );

  /* ── Panel content transition (on service switch) ─────── */
  useEffect(() => {
    /* skip initial mount — entrance animation handles the first reveal */
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (!panelBodyRef.current) return;

    const items =
      panelBodyRef.current.querySelectorAll<HTMLElement>("[data-svc-reveal]");
    if (!items.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { y: 16, opacity: 0, filter: "blur(3px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.07,
          duration: 0.48,
          ease: "power3.out",
          clearProps: "filter",
        },
      );
    }, panelBodyRef);

    return () => ctx.revert();
  }, [active]);

  const service = SERVICES[active];
  const Icon = service.icon;

  return (
    <section
      ref={sectionRef}
      id="services"
      className={`svc ${fontDisplay.variable} ${fontPixel.variable}`}
      aria-labelledby="svc-title"
    >
      {/* atmosphere */}
      <div className="svc__scanlines" aria-hidden />
      <div className="svc__grid" aria-hidden />
      <div className="svc__glow svc__glow--lime" aria-hidden />
      <div className="svc__glow svc__glow--emerald" aria-hidden />
      <StreaksSVG />

      <div className="svc__inner">
        {/* header */}
        <header data-svc-header className="svc__header">
          <p className="svc__kicker">
            <span className="svc__kicker-mark">// </span>03 — Serviços
          </p>
          <h2 id="svc-title" className="svc__title">
            O que fazemos
            <span className="svc__cursor" aria-hidden>
              _
            </span>
          </h2>
          <p className="svc__subtitle">
            Soluções sob medida para cada frente da sua operação — escolha a
            que faz sentido para você.
          </p>
        </header>

        {/* HUD */}
        <div className="svc__hud">
          {/* ── left menu ── */}
          <nav className="svc__menu" aria-label="Serviços disponíveis">
            {SERVICES.map((s, i) => (
              <button
                key={s.slug}
                data-svc-item
                className={`svc__menu-item${i === active ? " is-active" : ""}`}
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                type="button"
              >
                <span className="svc__menu-num" aria-hidden>
                  {s.index}
                </span>
                <div className="svc__menu-text">
                  <span className="svc__menu-name">{s.name}</span>
                  <span className="svc__menu-teaser" aria-hidden>
                    {s.teaser}
                  </span>
                </div>
                <span className="svc__menu-arrow" aria-hidden>
                  →
                </span>
              </button>
            ))}
          </nav>

          {/* ── right panel ── */}
          <div data-svc-panel className="svc__panel">
            {/* chrome bar */}
            <div className="svc__panel-chrome">
              <span className="svc__panel-chrome-label">
                SYS://{service.sys}
              </span>
              <div className="svc__panel-chrome-dots" aria-hidden>
                <span />
                <span />
                <span />
              </div>
            </div>

            {/* body — key forces remount on service change */}
            <div
              ref={panelBodyRef}
              key={`panel-${active}`}
              className="svc__panel-body"
            >
              <span className="svc__panel-ghost" aria-hidden>
                {service.index}
              </span>

              <div
                className="svc__panel-icon-wrap"
                data-svc-reveal
                aria-hidden
              >
                <Icon className="svc__panel-icon" strokeWidth={1.5} />
              </div>

              <h3 className="svc__panel-name" data-svc-reveal>
                {service.name}
              </h3>

              <p className="svc__panel-desc" data-svc-reveal>
                {service.description}
              </p>

              <ul className="svc__panel-features" data-svc-reveal>
                {service.features.map((f) => (
                  <li key={f} className="svc__feature">
                    <span className="svc__feature-mark" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={`/servicos/${service.slug}`}
                className="svc__panel-cta"
                data-svc-reveal
              >
                Explorar serviço
                <ArrowUpRight
                  className="svc__cta-icon"
                  strokeWidth={2}
                  aria-hidden
                />
              </Link>
            </div>
          </div>
        </div>

        {/* index bar */}
        <div
          className="svc__index-bar"
          role="tablist"
          aria-label="Selecionar serviço"
        >
          {SERVICES.map((s, i) => (
            <button
              key={s.slug}
              role="tab"
              type="button"
              aria-selected={i === active}
              className={`svc__index-tab${i === active ? " is-active" : ""}`}
              onClick={() => setActive(i)}
            >
              <span className="svc__index-tab-num">{s.index}</span>
              <span className="svc__index-tab-label">{s.sys}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
