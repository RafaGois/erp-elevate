"use client";

import { useRef } from "react";
import { DotGothic16, Press_Start_2P } from "next/font/google";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FileSpreadsheet,
  ClipboardList,
  ScanSearch,
  RadioTower,
  Blocks,
  Globe,
  BarChart3,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import "./problems.css";

/* ─── Fonts ──────────────────────────────────────────────────── */
const fontDisplay = DotGothic16({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pb-display",
  display: "swap",
});

const fontPixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pb-pixel",
  display: "swap",
});

/* ─── Data ───────────────────────────────────────────────────── */
type Severity = "critical" | "warn";

type ProblemEntry = {
  code: string;
  sys: string;
  icon: LucideIcon;
  title: string;
  description: string;
  severity: Severity;
  severityLabel: string;
  tags: string[];
  ghost: string;
  causeLabel: string;
};

const PROBLEMS: ProblemEntry[] = [
  {
    code: "ERR::001",
    sys: "PLAN",
    icon: FileSpreadsheet,
    title: "Planilhas como sistema de gestão",
    description:
      "Seis abas, três versões do mesmo arquivo, ninguém sabe qual é o atual. Cada setor mantém sua própria 'verdade' — e as decisões são tomadas com dados que já nasceram errados.",
    severity: "warn",
    severityLabel: "Alerta",
    tags: ["Alta recorrência", "Fonte de retrabalho"],
    ghost: "PLAN",
    causeLabel: "sem base confiável, tudo downstream desanda",
  },
  {
    code: "ERR::002",
    sys: "WEB",
    icon: Globe,
    title: "Marca invisível para quem pesquisa",
    description:
      "O cliente acha sua empresa no Google e encontra site fraco, desatualizado ou ausência digital. A reputação que você construiu na prática não aparece na tela — e o pedido vai para quem parece maior online.",
    severity: "critical",
    severityLabel: "Crítico",
    tags: ["Perda de credibilidade", "Lead que não chega"],
    ghost: "WEB",
    causeLabel: "sem presença digital, o mercado decide antes da conversa",
  },
  {
    code: "ERR::003",
    sys: "DATA",
    icon: BarChart3,
    title: "Indicador montado na véspera da reunião",
    description:
      "ERP, produção e qualidade geram dado, mas o painel nasce na planilha na noite anterior. A gestão decide com número defasado — e descobre o desvio quando já perdeu prazo ou margem.",
    severity: "warn",
    severityLabel: "Alerta",
    tags: ["Decisão tardia", "Dado que não vira ação"],
    ghost: "DATA",
    causeLabel: "sem visão em tempo real, o problema aparece tarde demais",
  },
  {
    code: "ERR::004",
    sys: "CTRL",
    icon: ClipboardList,
    title: "Produção controlada no papel",
    description:
      "Apontamentos em folhas que somem, chegam atrasados ou têm letra ilegível. O planejamento vive um passo atrás do chão de fábrica — e a fábrica trabalha sem saber o que o planejamento precisa.",
    severity: "warn",
    severityLabel: "Alerta",
    tags: ["Impacto direto em prazos", "Retrabalho de dados"],
    ghost: "CTRL",
    causeLabel: "sem rastreamento, nenhuma ordem tem histórico confiável",
  },
  {
    code: "ERR::005",
    sys: "MACH",
    icon: RadioTower,
    title: "Máquina gera dado que ninguém usa",
    description:
      "PLC e sensor registram ciclo, parada e status, mas a informação não chega à gestão. Automação existe na planta — e a produção continua sendo caixa preta para quem decide.",
    severity: "critical",
    severityLabel: "Crítico",
    tags: ["Parada invisível", "IIoT sem valor"],
    ghost: "MACH",
    causeLabel: "sem captura de evento, alerta só chega tarde",
  },
  {
    code: "ERR::006",
    sys: "SYNC",
    icon: ScanSearch,
    title: "Setores que falam línguas diferentes",
    description:
      "Comercial prometeu prazo com base em dados que a produção não conhecia. PCP planejou sem saber do estoque real. O resultado é sempre o mesmo: atraso, conflito e cliente insatisfeito.",
    severity: "critical",
    severityLabel: "Crítico",
    tags: ["Silos de informação", "Conflito operacional"],
    ghost: "SYNC",
    causeLabel: "quando os setores falham, o sistema inteiro trava",
  },
  {
    code: "ERR::007",
    sys: "LOCK",
    icon: Blocks,
    title: "Ferramentas que aprisionam o processo",
    description:
      "O ERP foi configurado há dez anos para um processo diferente. Mudar é caro, o fornecedor demora meses, e a operação foi se adaptando à ferramenta — quando deveria ser o contrário.",
    severity: "critical",
    severityLabel: "Crítico",
    tags: ["Rigidez sistêmica", "Alto custo de mudança"],
    ghost: "LOCK",
    causeLabel: "",
  },
];

/* ─── Component ──────────────────────────────────────────────── */
export default function Problems() {
  const sectionRef = useRef<HTMLElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const header = sectionRef.current?.querySelector("[data-pb-header]");
      const entries =
        sectionRef.current?.querySelectorAll("[data-pb-entry]");
      const connectors =
        sectionRef.current?.querySelectorAll("[data-pb-connector]");
      const footer = sectionRef.current?.querySelector("[data-pb-footer]");
      const scanner = scannerRef.current;

      if (!header || !entries?.length) return;

      /* initial states */
      gsap.set(header, { y: -32, opacity: 0, filter: "blur(6px)" });
      gsap.set(entries, { opacity: 0, x: 24, filter: "blur(3px)" });
      if (connectors?.length) gsap.set(connectors, { opacity: 0 });
      if (footer) gsap.set(footer, { opacity: 0, y: 24 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none none",
        },
      });

      /* 1 — header descends */
      tl.to(header, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.75,
        ease: "power3.out",
        clearProps: "filter",
      });

      /* 2 — scanner sweeps down the log */
      if (scanner && logRef.current) {
        const logH = logRef.current.scrollHeight;
        tl.fromTo(
          scanner,
          { y: 0, opacity: 1 },
          {
            y: logH,
            duration: 2.4,
            ease: "power1.inOut",
            onComplete: () => gsap.to(scanner, { opacity: 0, duration: 0.4 }),
          },
          "-=0.1",
        );
      }

      /* 3 — entries reveal, staggered & timed with scanner sweep */
      tl.to(
        entries,
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          stagger: 0.42,
          duration: 0.6,
          ease: "power2.out",
          clearProps: "filter",
        },
        0.45,
      );

      /* 4 — causal connectors */
      if (connectors?.length) {
        tl.to(
          connectors,
          {
            opacity: 1,
            stagger: 0.42,
            duration: 0.3,
            ease: "power1.out",
          },
          0.9,
        );
      }

      /* 5 — footer */
      if (footer) {
        tl.to(
          footer,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
          },
          "-=0.2",
        );
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="problemas"
      className={`pb ${fontDisplay.variable} ${fontPixel.variable}`}
      aria-labelledby="pb-title"
    >
      {/* atmosphere */}
      <div className="pb__scanlines" aria-hidden />
      <div className="pb__grid" aria-hidden />
      <div className="pb__glow pb__glow--red" aria-hidden />
      <div className="pb__glow pb__glow--amber" aria-hidden />

      <div className="pb__inner">

        {/* ── Header ─────────────────────────────────────────── */}
        <header data-pb-header className="pb__header">
          <div className="pb__header-top">
            <p className="pb__kicker">
              <span className="pb__kicker-mark">// </span>SYS — Diagnóstico
              operacional
            </p>
            <span className="pb__status-badge">
              <span className="pb__status-dot" aria-hidden />
              Sistema em estado crítico
            </span>
          </div>

          <h2 id="pb-title" className="pb__title">
            Reconhece
            <span className="pb__title-break"> esses sintomas?</span>
          </h2>

          <p className="pb__subtitle">
            Não são falhas isoladas — são sintomas de uma empresa que cresceu
            além das ferramentas que usava. Da internet ao chão de fábrica,
            cada um alimenta o próximo.
          </p>
        </header>

        {/* ── Error log ──────────────────────────────────────── */}
        <div ref={logRef} className="pb__log">
          {/* animated scanner line */}
          <div ref={scannerRef} className="pb__scanner" aria-hidden />

          {PROBLEMS.map((p, i) => {
            const Icon = p.icon;
            const isLast = i === PROBLEMS.length - 1;
            return (
              <div key={p.code} className="pb__entry-wrap">
                <article data-pb-entry className="pb__entry">
                  {/* ── Rail ── */}
                  <div className="pb__rail">
                    <span className="pb__err-code" aria-label={`Código de erro ${p.code}`}>
                      {p.code}
                    </span>
                    <div className="pb__rail-icon" aria-hidden>
                      <Icon strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* ── Content ── */}
                  <div className="pb__content">
                    <span className="pb__ghost" aria-hidden>
                      {p.ghost}
                    </span>

                    <div className="pb__entry-header">
                      <h3 className="pb__entry-title">{p.title}</h3>
                      <span
                        className={`pb__severity pb__severity--${p.severity}`}
                      >
                        <span className="pb__severity-dot" aria-hidden />
                        {p.severityLabel}
                      </span>
                    </div>

                    <p className="pb__entry-desc">{p.description}</p>

                    <div className="pb__tags" aria-label="Tags">
                      {p.tags.map((tag) => (
                        <span key={tag} className="pb__tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>

                {/* causal connector between entries */}
                {!isLast && (
                  <div
                    data-pb-connector
                    className="pb__connector"
                    aria-hidden
                  >
                    <span className="pb__connector-label">
                      <ArrowRight
                        style={{
                          width: "0.55rem",
                          height: "0.55rem",
                          flexShrink: 0,
                        }}
                        strokeWidth={2}
                      />
                      {p.causeLabel}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Footer resolution ──────────────────────────────── */}
        <footer data-pb-footer className="pb__footer">
          <div className="pb__footer-text">
            <p className="pb__footer-kicker">// resolução disponível</p>
            <p className="pb__footer-lead">
              Cada linha desse log tem solução.
            </p>
            <p className="pb__footer-sub">
              É o que fazemos — sistemas que eliminam esses erros de vez, na
              medida do seu processo.
            </p>
          </div>

          <div className="pb__footer-tally" aria-hidden>
            <div className="pb__tally-item">
              <span className="pb__tally-val">{PROBLEMS.length}</span>
              <span className="pb__tally-label">Falhas<br />detectadas</span>
            </div>
            <div className="pb__tally-item">
              <span className="pb__tally-val">1</span>
              <span className="pb__tally-label">Causa<br />raiz</span>
            </div>
          </div>

          <Link href="#services" className="pb__footer-arrow">
            Ver soluções
            <ArrowRight
              style={{ width: "0.75rem", height: "0.75rem" }}
              strokeWidth={2}
            />
          </Link>
        </footer>

      </div>
    </section>
  );
}
