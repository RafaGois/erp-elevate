"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import ServiceLandingMenu from "./ServiceLandingMenu";
import HeroBackgroundVideo from "./HeroBackgroundVideo";
import DeliverablesSection from "./DeliverablesSection";
import BenefitsSection from "./BenefitsSection";
import { DotGothic16, Press_Start_2P } from "next/font/google";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  Globe,
  Layers,
  Link2,
  Lock,
  MessageCircle,
  Minus,
  Monitor,
  ScanSearch,
  ShieldCheck,
  X,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type {
  ComparisonValue,
  ServiceLandingPage,
} from "@/types/service-landing";
import { ELEVATE_WHATSAPP_URL } from "@/lib/data/contact-links";
import Footer from "@/components/landing/footer/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion-01";
import "./service-landing.css";

const fontDisplay = DotGothic16({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-slp-display",
  display: "swap",
});

const fontPixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-slp-pixel",
  display: "swap",
});

const PAIN_ICONS = [ScanSearch, Layers, AlertTriangle] as const;
const CAP_ICONS = [Globe, Lock, Monitor, Link2, ShieldCheck, Zap] as const;
const RELATED_ICONS: Record<string, LucideIcon> = {
  digitalizacao: Globe,
  pcp: Layers,
  dashboards: BarChart3,
  "sistemas-sob-medida": Monitor,
  "integracao-automacao": Link2,
};
function TrustMarqueeGroup({ items }: { items: string[] }) {
  return (
    <div className="slp-trust__group" aria-hidden>
      {items.map((item, index) => (
        <span key={`${item}-${index}`}>
          <span className="slp-trust__star">★</span> {item}
        </span>
      ))}
    </div>
  );
}

function WhatsappButton({
  children,
  size,
}: {
  children: ReactNode;
  size?: "sm" | "lg";
}) {
  const cls =
    size === "sm" ? "slp-btn slp-btn--sm" : size === "lg" ? "slp-btn slp-btn--lg" : "slp-btn";
  return (
    <a
      href={ELEVATE_WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cls}
    >
      <MessageCircle className="size-3.5" aria-hidden />
      {children}
    </a>
  );
}

function Window({
  label,
  className,
  bodyClassName,
  children,
  ...rest
}: {
  label: string;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
} & React.ComponentProps<"div">) {
  return (
    <div className={`slp-win ${className ?? ""}`} {...rest}>
      <div className="slp-win__chrome">
        <span className="slp-win__label">{label}</span>
        <div className="slp-win__dots" aria-hidden>
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className={`slp-win__body ${bodyClassName ?? ""}`}>{children}</div>
    </div>
  );
}

function ComparisonCell({ value }: { value: ComparisonValue }) {
  if (value === "yes") {
    return <Check className="slp-compare__yes mx-auto size-4" aria-label="Sim" />;
  }
  if (value === "partial") {
    return (
      <Minus className="slp-compare__partial mx-auto size-4" aria-label="Parcial" />
    );
  }
  return <X className="slp-compare__no mx-auto size-4" aria-label="Não" />;
}

type Props = {
  data: ServiceLandingPage;
};

function getFeaturedCompareColumnIndex(columns: string[]) {
  const idx = columns.findIndex((col) => /elevate/i.test(col));
  return idx >= 0 ? idx : columns.length - 1;
}

function splitCtaHeadline(headline: string) {
  const breakAt = headline.search(/[.!?]\s+/);
  if (breakAt === -1) {
    return { lead: headline, accent: null as string | null };
  }
  return {
    lead: headline.slice(0, breakAt + 1),
    accent: headline.slice(breakAt + 2).trim(),
  };
}

export default function ServiceLandingPage({ data }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const featuredCompareCol = getFeaturedCompareColumnIndex(data.comparison.columns);
  const ctaHeadline = splitCtaHeadline(data.finalCta.headline);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const reveals = rootRef.current?.querySelectorAll("[data-slp-reveal]");
      if (!reveals?.length) return;

      reveals.forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className={cn(
        "slp",
        fontDisplay.variable,
        fontPixel.variable,
        (data.hero.backgroundVideo || data.hero.backgroundImage) && "slp--hero-image",
      )}
    >
      <div className="slp__scanlines" aria-hidden />
      <div className="slp__grid-bg" aria-hidden />
      <div className="slp__glow slp__glow--lime" aria-hidden />
      <div className="slp__glow slp__glow--em" aria-hidden />

      <ServiceLandingMenu
        title={
          data.hero.badge
            .replace(/^SYS\/\//, "")
            .replace("PRESENÇA DIGITAL", "Presença Digital")
            .replace("PROD", "Produção")
            .replace("BI_DATA", "BI Industrial")
            .replace("INTEGR", "Integração")
            .replace("CUSTOM", "Sob Medida")
        }
      />

      {/* 01 Hero */}
      <section
        id="inicio"
        className={cn(
          "slp-section slp-hero",
          (data.hero.backgroundVideo || data.hero.backgroundImage) && "slp-hero--media",
          data.hero.backgroundVideo && "slp-hero--video",
        )}
        style={
          data.hero.backgroundImage && !data.hero.backgroundVideo
            ? ({
                "--slp-hero-bg": `url("${data.hero.backgroundImage}")`,
              } as CSSProperties)
            : undefined
        }
        aria-labelledby="slp-hero-title"
      >
        {data.hero.backgroundVideo ? (
          <HeroBackgroundVideo
            src={data.hero.backgroundVideo}
            poster={data.hero.backgroundImage}
          />
        ) : null}
        <div className="slp-wrap slp-hero__content">
          <div className="slp-hero__inner" data-slp-reveal>
            <span className="slp-hero__badge">{data.hero.badge}</span>
            <h1 id="slp-hero-title" className="slp-hero__headline">
              {data.hero.headline}
            </h1>
            <p className="slp-hero__sub">{data.hero.subheadline}</p>
            <p className="slp-hero__proof">{data.hero.microProof}</p>
            <div className="slp-hero__actions">
              <WhatsappButton size="lg">{data.hero.primaryCta}</WhatsappButton>
              <a href="#entregaveis" className="slp-btn slp-btn--lg slp-btn--outline">
                {data.hero.secondaryCta}
                <ArrowRight className="size-3.5" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 02 Trust bar — marquee infinito */}
      <div className="slp-trust" data-slp-reveal>
        <div className="slp-trust__track">
          <TrustMarqueeGroup items={data.trustBar} />
          <TrustMarqueeGroup items={data.trustBar} />
        </div>
      </div>

      {/* 03 Problema */}
      <section
        id="problema"
        className="slp-section slp-problem"
        aria-labelledby="slp-problem-title"
      >
        <div className="slp-problem__bg" aria-hidden />
        <div className="slp-problem__grid" aria-hidden />
        <div className="slp-problem__scanlines" aria-hidden />
        <div className="slp-problem__glow slp-problem__glow--red" aria-hidden />
        <div className="slp-problem__glow slp-problem__glow--lime" aria-hidden />
        <div className="slp-problem__rule slp-problem__rule--top" aria-hidden />
        <div className="slp-problem__rule slp-problem__rule--bottom" aria-hidden />
        <span className="slp-problem__watermark" aria-hidden>
          PROBLEMA
        </span>
        <span className="slp-problem__corner slp-problem__corner--tl" aria-hidden />
        <span className="slp-problem__corner slp-problem__corner--br" aria-hidden />
        <span className="slp-problem__tag slp-problem__tag--left" aria-hidden>
          SYS.DIAG
        </span>
        <span className="slp-problem__tag slp-problem__tag--right" aria-hidden>
          ERR_LOG
        </span>
        <div className="slp-wrap slp-problem__wrap">

          {/* cabeçalho */}
          <div className="slp-problem__head" data-slp-reveal>
            <span className="slp-kicker">{data.problem.kicker}</span>
            <h2 id="slp-problem-title" className="slp-problem__title">
              {data.problem.title}
            </h2>
            <p className="slp-problem__subtitle">{data.problem.subtitle}</p>
          </div>

          {/* cards de dor */}
          <div className="slp-problem__cards">
            {data.problem.pains.map((pain, i) => {
              const Icon = PAIN_ICONS[i] ?? AlertTriangle;
              return (
                <article
                  key={pain.title}
                  className="slp-problem__card"
                  data-slp-reveal
                >
                  <div className="slp-problem__card-num" aria-hidden>
                    0{i + 1}
                  </div>
                  <div className="slp-problem__card-body">
                    <div className="slp-problem__card-icon" aria-hidden>
                      <Icon className="size-5" />
                    </div>
                    <h3 className="slp-problem__card-title">{pain.title}</h3>
                    <p className="slp-problem__card-desc">{pain.description}</p>
                  </div>
                </article>
              );
            })}
          </div>

        </div>
      </section>

      {/* 04 Transformação */}
      <section
        id="transformacao"
        className="slp-section slp-tx slp-tx--transform"
        aria-labelledby="slp-transform-title"
      >
        <div className="slp-tx__bg" aria-hidden />
        <div className="slp-tx__grid" aria-hidden />
        <div className="slp-tx__scanlines" aria-hidden />
        <div className="slp-tx__glow slp-tx__glow--red" aria-hidden />
        <div className="slp-tx__glow slp-tx__glow--green" aria-hidden />
        <div className="slp-tx__rule slp-tx__rule--top" aria-hidden />
        <div className="slp-tx__rule slp-tx__rule--bottom" aria-hidden />
        <span className="slp-tx__watermark slp-tx__watermark--before" aria-hidden>
          ANTES
        </span>
        <span className="slp-tx__watermark slp-tx__watermark--after" aria-hidden>
          DEPOIS
        </span>
        <span className="slp-tx__corner slp-tx__corner--bl" aria-hidden />
        <span className="slp-tx__corner slp-tx__corner--tr" aria-hidden />
        <span className="slp-tx__tag slp-tx__tag--left" aria-hidden>
          PRE_STATE
        </span>
        <span className="slp-tx__tag slp-tx__tag--right" aria-hidden>
          POST_STATE
        </span>
        <div className="slp-wrap slp-tx__wrap">

          {/* cabeçalho */}
          <div className="slp-head slp-head--center slp-tx__head" data-slp-reveal>
            <span className="slp-kicker">{data.transformation.kicker}</span>
            <h2 id="slp-transform-title" className="slp-title">
              {data.transformation.title}
            </h2>
          </div>

          {/* labels de coluna */}
          <div className="slp-tx__labels" aria-hidden data-slp-reveal>
            <span className="slp-tx__label slp-tx__label--before">
              <X className="size-3" />
              {data.transformation.beforeLabel}
            </span>
            <div className="slp-tx__divider-label" />
            <span className="slp-tx__label slp-tx__label--after">
              <Check className="size-3" />
              {data.transformation.afterLabel}
            </span>
          </div>

          {/* linhas de comparação */}
          <div className="slp-tx__rows">
            {data.transformation.before.map((beforeItem, i) => {
              const afterItem = data.transformation.after[i];
              return (
                <div key={beforeItem} className="slp-tx__row" data-slp-reveal>
                  <div className="slp-tx__cell slp-tx__cell--before">
                    <span className="slp-tx__cell-icon" aria-hidden>
                      <X className="size-3.5" />
                    </span>
                    <span className="slp-tx__cell-text">{beforeItem}</span>
                  </div>

                  <div className="slp-tx__divider" aria-hidden>
                    <span className="slp-tx__arrow" aria-hidden>→</span>
                  </div>

                  <div className="slp-tx__cell slp-tx__cell--after">
                    <span className="slp-tx__cell-icon" aria-hidden>
                      <Check className="size-3.5" />
                    </span>
                    <span className="slp-tx__cell-text">{afterItem}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 05 Benefícios — interactive split-panel showcase */}
      <BenefitsSection
        kicker={data.benefits.kicker}
        title={data.benefits.title}
        subtitle={data.benefits.subtitle}
        items={data.benefits.items}
      />

      {/* 06 Entregáveis — timeline scroll */}
      <DeliverablesSection deliverables={data.deliverables} />

      {/* 08 Capacidades */}
      <section className="slp-section slp-cap-fold" aria-labelledby="slp-cap-title">
        {/* decoration */}
        <div className="slp-cap-fold__bg" aria-hidden />
        <div className="slp-cap-fold__grid" aria-hidden />
        <div className="slp-cap-fold__scanlines" aria-hidden />
        <div className="slp-cap-fold__glow slp-cap-fold__glow--lime" aria-hidden />
        <div className="slp-cap-fold__glow slp-cap-fold__glow--em" aria-hidden />
        <div className="slp-cap-fold__rule slp-cap-fold__rule--top" aria-hidden />
        <div className="slp-cap-fold__rule slp-cap-fold__rule--bottom" aria-hidden />
        <span className="slp-cap-fold__watermark" aria-hidden>CAP</span>
        <span className="slp-cap-fold__corner slp-cap-fold__corner--tl" aria-hidden />
        <span className="slp-cap-fold__corner slp-cap-fold__corner--br" aria-hidden />
        <span className="slp-cap-fold__tag slp-cap-fold__tag--left" aria-hidden>MODULES</span>
        <span className="slp-cap-fold__tag slp-cap-fold__tag--right" aria-hidden>ACTIVE</span>

        <div className="slp-wrap slp-cap-fold__wrap">
          <div className="slp-head" data-slp-reveal>
            <span className="slp-kicker">{data.capabilities.kicker}</span>
            <h2 id="slp-cap-title" className="slp-title">
              {data.capabilities.title}
            </h2>
            <p className="slp-subtitle">{data.capabilities.subtitle}</p>
          </div>

          <div className="slp-cap__grid">
            {data.capabilities.items.map((cap, i) => {
              const Icon = CAP_ICONS[i] ?? Layers;
              const num = String(i + 1).padStart(2, "0");
              return (
                <article key={cap.title} className="slp-cap__card" data-slp-reveal>
                  {/* accent line top */}
                  <div className="slp-cap__card-accent" aria-hidden />
                  {/* radial glow on hover */}
                  <div className="slp-cap__card-glow" aria-hidden />
                  {/* big watermark number */}
                  <span className="slp-cap__card-wm" aria-hidden>{num}</span>

                  {/* meta row: module id + status */}
                  <div className="slp-cap__card-meta">
                    <span className="slp-cap__card-modlabel">MOD_{num}</span>
                    <span className="slp-cap__card-status" aria-label="Módulo ativo">
                      <span className="slp-cap__card-dot" aria-hidden />
                      ATIVO
                    </span>
                  </div>

                  {/* icon */}
                  <div className="slp-cap__card-icon" aria-hidden>
                    <Icon className="size-5" />
                  </div>

                  {/* title */}
                  <h3 className="slp-cap__card-title">{cap.title}</h3>

                  {/* divider */}
                  <div className="slp-cap__card-divider" aria-hidden />

                  {/* description */}
                  <p className="slp-cap__card-desc">{cap.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 09 Para quem é */}
      <section
        id="para-quem"
        className="slp-section slp-tx slp-tx--transform"
        aria-labelledby="slp-audience-title"
      >
        <div className="slp-tx__bg" aria-hidden />
        <div className="slp-tx__grid" aria-hidden />
        <div className="slp-tx__scanlines" aria-hidden />
        <div className="slp-tx__glow slp-tx__glow--red" aria-hidden />
        <div className="slp-tx__glow slp-tx__glow--green" aria-hidden />
        <div className="slp-tx__rule slp-tx__rule--top" aria-hidden />
        <div className="slp-tx__rule slp-tx__rule--bottom" aria-hidden />
        <span className="slp-tx__watermark slp-tx__watermark--before" aria-hidden>
          NAO
        </span>
        <span className="slp-tx__watermark slp-tx__watermark--after" aria-hidden>
          SIM
        </span>
        <span className="slp-tx__corner slp-tx__corner--bl" aria-hidden />
        <span className="slp-tx__corner slp-tx__corner--tr" aria-hidden />
        <span className="slp-tx__tag slp-tx__tag--left" aria-hidden>
          NOT_FOR
        </span>
        <span className="slp-tx__tag slp-tx__tag--right" aria-hidden>
          FOR_YOU
        </span>
        <div className="slp-wrap slp-tx__wrap">
          <div className="slp-head slp-head--center slp-tx__head" data-slp-reveal>
            <span className="slp-kicker">{data.audience.kicker}</span>
            <h2 id="slp-audience-title" className="slp-title">
              {data.audience.title}
            </h2>
            {data.audience.subtitle ? (
              <p className="slp-subtitle">{data.audience.subtitle}</p>
            ) : null}
          </div>

          <div className="slp-tx__labels" aria-hidden data-slp-reveal>
            <span className="slp-tx__label slp-tx__label--before">
              <X className="size-3" />
              {data.audience.notLabel}
            </span>
            <div className="slp-tx__divider-label" />
            <span className="slp-tx__label slp-tx__label--after">
              <Check className="size-3" />
              {data.audience.forLabel}
            </span>
          </div>

          <div className="slp-tx__rows">
            {data.audience.notFor.map((notItem, i) => {
              const forItem = data.audience.for[i];
              return (
                <div key={notItem} className="slp-tx__row" data-slp-reveal>
                  <div className="slp-tx__cell slp-tx__cell--before">
                    <span className="slp-tx__cell-icon" aria-hidden>
                      <X className="size-3.5" />
                    </span>
                    <span className="slp-tx__cell-text">{notItem}</span>
                  </div>

                  <div className="slp-tx__divider" aria-hidden>
                    <span className="slp-tx__arrow" aria-hidden>→</span>
                  </div>

                  <div className="slp-tx__cell slp-tx__cell--after">
                    <span className="slp-tx__cell-icon" aria-hidden>
                      <Check className="size-3.5" />
                    </span>
                    <span className="slp-tx__cell-text">{forItem}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10 Prova social */}
      <section
        id="cases"
        className="slp-section"
        aria-labelledby="slp-proof-title"
      >
        <div className="slp-wrap">
          <div className="slp-head" data-slp-reveal>
            <span className="slp-kicker">{data.socialProof.kicker}</span>
            <h2 id="slp-proof-title" className="slp-title">
              {data.socialProof.title}
            </h2>
            <p className="slp-subtitle">{data.socialProof.subtitle}</p>
          </div>
          <div className="slp-grid slp-grid--3">
            {data.socialProof.cases.map((c) => (
              <Window
                key={c.title}
                label={c.label}
                bodyClassName="flex flex-col h-full"
                data-slp-reveal
              >
                <h3 className="slp-case__title">{c.title}</h3>
                <div className="slp-case__block">
                  <strong>Desafio</strong>
                  {c.problem}
                </div>
                <div className="slp-case__block">
                  <strong>Solução</strong>
                  {c.solution}
                </div>
                <div className="slp-case__block">
                  <strong>Resultado</strong>
                  {c.result}
                </div>
                <div className="slp-case__tags">
                  {c.tags.map((tag) => (
                    <span key={tag} className="slp-case__tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </Window>
            ))}
          </div>
          <div className="slp-metrics" data-slp-reveal>
            {data.socialProof.metrics.map((m) => (
              <div key={m.label} className="slp-metric">
                <div className="slp-metric__value">{m.value}</div>
                <div className="slp-metric__label">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11 Comparativo */}
      <section
        className="slp-section slp-compare-fold"
        aria-labelledby="slp-compare-title"
      >
        <div className="slp-compare-fold__bg" aria-hidden />
        <div className="slp-compare-fold__grid" aria-hidden />
        <div className="slp-compare-fold__scanlines" aria-hidden />
        <div className="slp-compare-fold__glow slp-compare-fold__glow--muted" aria-hidden />
        <div className="slp-compare-fold__glow slp-compare-fold__glow--lime" aria-hidden />
        <div className="slp-compare-fold__rule slp-compare-fold__rule--top" aria-hidden />
        <div className="slp-compare-fold__rule slp-compare-fold__rule--bottom" aria-hidden />
        <span className="slp-compare-fold__watermark" aria-hidden>
          VS
        </span>
        <span className="slp-compare-fold__corner slp-compare-fold__corner--tl" aria-hidden />
        <span className="slp-compare-fold__corner slp-compare-fold__corner--br" aria-hidden />
        <span className="slp-compare-fold__tag slp-compare-fold__tag--left" aria-hidden>
          ALT_OPTS
        </span>
        <span className="slp-compare-fold__tag slp-compare-fold__tag--right" aria-hidden>
          BEST_PICK
        </span>
        <div className="slp-wrap slp-compare-fold__wrap">
          <div className="slp-head slp-head--center" data-slp-reveal>
            <span className="slp-kicker">{data.comparison.kicker}</span>
            <h2 id="slp-compare-title" className="slp-title">
              {data.comparison.title}
            </h2>
            <p className="slp-subtitle">{data.comparison.subtitle}</p>
          </div>
          <div className="slp-compare-wrap" data-slp-reveal>
            <table className="slp-compare">
              <thead>
                <tr>
                  <th scope="col">Critério</th>
                  {data.comparison.columns.map((col, i) => (
                    <th
                      key={col}
                      scope="col"
                      className={cn(
                        i === featuredCompareCol && "slp-compare__col--featured",
                      )}
                    >
                      {i === featuredCompareCol ? (
                        <span className="slp-compare__col-tag">★ recomendado</span>
                      ) : null}
                      <span className="slp-compare__col-head">
                        <span className="slp-compare__col-name">{col}</span>
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.comparison.rows.map((row) => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    {row.values.map((val, i) => (
                      <td
                        key={`${row.label}-${i}`}
                        className={cn(
                          i === featuredCompareCol && "slp-compare__col--featured",
                        )}
                      >
                        <ComparisonCell value={val} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 12 FAQ */}
      <section
        id="faq"
        className="slp-section slp-faq-fold"
        aria-labelledby="slp-faq-title"
      >
        <div className="slp-faq-fold__bg" aria-hidden />
        <div className="slp-faq-fold__grid" aria-hidden />
        <div className="slp-faq-fold__scanlines" aria-hidden />
        <div className="slp-faq-fold__glow slp-faq-fold__glow--lime" aria-hidden />
        <div className="slp-faq-fold__glow slp-faq-fold__glow--em" aria-hidden />
        <div className="slp-faq-fold__rule slp-faq-fold__rule--top" aria-hidden />
        <div className="slp-faq-fold__rule slp-faq-fold__rule--bottom" aria-hidden />
        <span className="slp-faq-fold__watermark" aria-hidden>
          FAQ
        </span>
        <span className="slp-faq-fold__corner slp-faq-fold__corner--tl" aria-hidden />
        <span className="slp-faq-fold__corner slp-faq-fold__corner--br" aria-hidden />
        <span className="slp-faq-fold__tag slp-faq-fold__tag--left" aria-hidden>
          HELP_SYS
        </span>
        <span className="slp-faq-fold__tag slp-faq-fold__tag--right" aria-hidden>
          ANSWERS
        </span>
        <div className="slp-wrap slp-faq-fold__wrap">
          <div className="slp-head slp-head--center" data-slp-reveal>
            <span className="slp-kicker">{data.faq.kicker}</span>
            <h2 id="slp-faq-title" className="slp-title">
              {data.faq.title}
            </h2>
            <p className="slp-subtitle">{data.faq.subtitle}</p>
          </div>
          <Window
            label="FAQ_SYS.exe"
            className="slp-faq-win"
            bodyClassName="slp-faq-win__body"
            data-slp-reveal
          >
            <Accordion
              type="single"
              collapsible
              className="slp-faq-accordion"
            >
              {data.faq.items.map((item, index) => (
                <AccordionItem
                  key={item.question}
                  value={`faq-${index}`}
                  className="slp-faq-accordion__item"
                >
                  <AccordionTrigger className="slp-faq-accordion__trigger">
                    <span className="slp-faq-accordion__q">
                      <span className="slp-faq-accordion__num" aria-hidden>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="slp-faq-accordion__content">
                    <p className="slp-faq-accordion__answer">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Window>
        </div>
      </section>

      {/* 13 CTA final */}
      <section
        id="contato"
        className="slp-section slp-final-fold"
        aria-labelledby="slp-final-title"
      >
        <div className="slp-final-fold__bg" aria-hidden />
        <div className="slp-final-fold__grid" aria-hidden />
        <div className="slp-final-fold__scanlines" aria-hidden />
        <div className="slp-final-fold__glow slp-final-fold__glow--lime" aria-hidden />
        <div className="slp-final-fold__glow slp-final-fold__glow--em" aria-hidden />
        <div className="slp-final-fold__rule slp-final-fold__rule--top" aria-hidden />
        <div className="slp-final-fold__rule slp-final-fold__rule--bottom" aria-hidden />
        <span className="slp-final-fold__watermark" aria-hidden>
          GO
        </span>
        <span className="slp-final-fold__corner slp-final-fold__corner--tl" aria-hidden />
        <span className="slp-final-fold__corner slp-final-fold__corner--tr" aria-hidden />
        <span className="slp-final-fold__corner slp-final-fold__corner--bl" aria-hidden />
        <span className="slp-final-fold__corner slp-final-fold__corner--br" aria-hidden />
        <span className="slp-final-fold__tag slp-final-fold__tag--left" aria-hidden>
          NEXT_STEP
        </span>
        <span className="slp-final-fold__tag slp-final-fold__tag--right" aria-hidden>
          CONTACT
        </span>

        <div className="slp-wrap slp-final-fold__wrap">
          <div className="slp-final-fold__gate" data-slp-reveal>
            <svg
              className="slp-final-fold__sonar"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden
            >
              {[0, 1, 2].map((i) => (
                <circle
                  key={i}
                  className="slp-final-fold__sonar-ring"
                  cx="50"
                  cy="50"
                  r="0"
                />
              ))}
            </svg>

            <div className="slp-final-fold__inner">
              <span className="slp-final-fold__kicker">{data.finalCta.kicker}</span>

              <h2 id="slp-final-title" className="slp-final-fold__title">
                <span className="slp-final-fold__title-lead">{ctaHeadline.lead}</span>
                {ctaHeadline.accent ? (
                  <span className="slp-final-fold__title-accent">{ctaHeadline.accent}</span>
                ) : null}
              </h2>

              <hr className="slp-final-fold__divider" aria-hidden />

              <p className="slp-final-fold__subtitle">{data.finalCta.subheadline}</p>

              <div className="slp-final-fold__actions">
                <WhatsappButton size="lg">{data.finalCta.cta}</WhatsappButton>
              </div>

              <p className="slp-final-fold__trust">
                <span className="slp-final-fold__trust-dot" aria-hidden />
                {data.finalCta.riskReversal}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 14 Relacionados — explore fold */}
      <section className="slp-section slp-exp-fold" aria-labelledby="slp-related-title">
        <div className="slp-exp-fold__bg" aria-hidden />
        <div className="slp-exp-fold__grid" aria-hidden />
        <div className="slp-exp-fold__scanlines" aria-hidden />
        <div className="slp-exp-fold__glow slp-exp-fold__glow--lime" aria-hidden />
        <div className="slp-exp-fold__glow slp-exp-fold__glow--em" aria-hidden />
        <div className="slp-exp-fold__rule slp-exp-fold__rule--top" aria-hidden />
        <div className="slp-exp-fold__rule slp-exp-fold__rule--bottom" aria-hidden />
        <span className="slp-exp-fold__watermark" aria-hidden>
          EXP
        </span>
        <span className="slp-exp-fold__corner slp-exp-fold__corner--tl" aria-hidden />
        <span className="slp-exp-fold__corner slp-exp-fold__corner--br" aria-hidden />
        <span className="slp-exp-fold__tag slp-exp-fold__tag--left" aria-hidden>
          SERVICES
        </span>
        <span className="slp-exp-fold__tag slp-exp-fold__tag--right" aria-hidden>
          OPEN
        </span>

        <div className="slp-wrap slp-exp-fold__wrap">
          <div className="slp-head" data-slp-reveal>
            <span className="slp-kicker">// explore</span>
            <h2 id="slp-related-title" className="slp-title">
              Serviços que combinam com esse
            </h2>
            <p className="slp-subtitle">
              Clique em uma solução complementar para ver como ela se encaixa na
              sua operação.
            </p>
          </div>

          <div className="slp-exp__grid">
            {data.relatedServices.map((svc, i) => {
              const Icon = RELATED_ICONS[svc.slug] ?? Layers;
              const num = String(i + 1).padStart(2, "0");

              return (
                <Link
                  key={svc.slug}
                  href={`/servicos/${svc.slug}`}
                  className="slp-exp__link"
                  data-slp-reveal
                  aria-label={`Explorar ${svc.name}: ${svc.teaser}`}
                >
                  <article className="slp-exp__card">
                    <div className="slp-exp__card-accent" aria-hidden />
                    <div className="slp-exp__card-glow" aria-hidden />
                    <span className="slp-exp__card-wm" aria-hidden>
                      {num}
                    </span>
                    <span className="slp-exp__card-corner" aria-hidden>
                      <ArrowRight className="size-3" />
                    </span>

                    <div className="slp-exp__card-meta">
                      <span className="slp-exp__card-syslabel">{svc.label}</span>
                      <span className="slp-exp__card-status">
                        <span className="slp-exp__card-dot" aria-hidden />
                        ABRIR
                      </span>
                    </div>

                    <div className="slp-exp__card-icon" aria-hidden>
                      <Icon className="size-5" />
                    </div>

                    <h3 className="slp-exp__card-title">{svc.name}</h3>
                    <div className="slp-exp__card-divider" aria-hidden />
                    <p className="slp-exp__card-teaser">{svc.teaser}</p>

                    <div className="slp-exp__card-foot">
                      <span className="slp-exp__card-cta">Ver solução</span>
                      <span className="slp-exp__card-arrow" aria-hidden>
                        <ArrowRight className="size-4" />
                      </span>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
