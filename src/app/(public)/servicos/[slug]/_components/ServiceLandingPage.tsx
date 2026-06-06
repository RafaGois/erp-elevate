"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import ServiceLandingMenu from "./ServiceLandingMenu";
import { DotGothic16, Press_Start_2P } from "next/font/google";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronDown,
  Globe,
  Layers,
  Link2,
  LayoutDashboard,
  Lock,
  MessageCircle,
  Minus,
  Monitor,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import type {
  ComparisonValue,
  ServiceLandingPage,
} from "@/types/service-landing";
import { ELEVATE_WHATSAPP_URL } from "@/lib/data/contact-links";
import Footer from "@/components/landing/footer/Footer";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
const BENEFIT_ICONS = [Sparkles, Workflow, LayoutDashboard, TrendingUp] as const;
const CAP_ICONS = [Globe, Lock, Monitor, Link2, ShieldCheck, Zap] as const;

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

export default function ServiceLandingPage({ data }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

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
        data.hero.backgroundImage && "slp--hero-image",
      )}
    >
      <div className="slp__scanlines" aria-hidden />
      <div className="slp__grid-bg" aria-hidden />
      <div className="slp__glow slp__glow--lime" aria-hidden />
      <div className="slp__glow slp__glow--em" aria-hidden />

      <ServiceLandingMenu title="Presença Digital" />

      {/* 01 Hero */}
      <section
        id="inicio"
        className={cn(
          "slp-section slp-hero",
          data.hero.backgroundImage && "slp-hero--image",
        )}
        style={
          data.hero.backgroundImage
            ? ({
                "--slp-hero-bg": `url("${data.hero.backgroundImage}")`,
              } as CSSProperties)
            : undefined
        }
        aria-labelledby="slp-hero-title"
      >
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
              <a href="#como-funciona" className="slp-btn slp-btn--lg slp-btn--outline">
                {data.hero.secondaryCta}
                <ArrowRight className="size-3.5" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 02 Trust bar */}
      <div className="slp-trust" data-slp-reveal>
        <ul className="slp-trust__list">
          {data.trustBar.map((item) => (
            <li key={item} className="slp-trust__item">
              <Check className="size-3.5" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* 03 Problema */}
      <section
        id="problema"
        className="slp-section"
        aria-labelledby="slp-problem-title"
      >
        <div className="slp-wrap">
          <div className="slp-head" data-slp-reveal>
            <span className="slp-kicker">{data.problem.kicker}</span>
            <h2 id="slp-problem-title" className="slp-title">
              {data.problem.title}
            </h2>
            <p className="slp-subtitle">{data.problem.subtitle}</p>
          </div>
          <div className="slp-grid slp-grid--3">
            {data.problem.pains.map((pain, i) => {
              const Icon = PAIN_ICONS[i] ?? AlertTriangle;
              return (
                <Window
                  key={pain.title}
                  label={`ALERTA_0${i + 1}`}
                  data-slp-reveal
                >
                  <span className="slp-pain__icon">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="slp-pain__title">{pain.title}</h3>
                  <p className="slp-card__desc">{pain.description}</p>
                </Window>
              );
            })}
          </div>
        </div>
      </section>

      {/* 04 Transformação */}
      <section className="slp-section" aria-labelledby="slp-transform-title">
        <div className="slp-wrap">
          <div className="slp-head slp-head--center" data-slp-reveal>
            <span className="slp-kicker">{data.transformation.kicker}</span>
            <h2 id="slp-transform-title" className="slp-title">
              {data.transformation.title}
            </h2>
          </div>
          <div className="slp-transform">
            <Window
              label={data.transformation.beforeLabel}
              className="slp-transform__col--before"
              data-slp-reveal
            >
              <ul className="slp-transform__list">
                {data.transformation.before.map((item) => (
                  <li key={item}>
                    <X className="size-4 text-red-400" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </Window>
            <Window
              label={data.transformation.afterLabel}
              className="slp-transform__col--after"
              data-slp-reveal
            >
              <ul className="slp-transform__list">
                {data.transformation.after.map((item) => (
                  <li key={item}>
                    <Check className="size-4 text-[#dfff00]" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </Window>
          </div>
        </div>
      </section>

      {/* 05 Benefícios */}
      <section
        id="solucao"
        className="slp-section"
        aria-labelledby="slp-benefits-title"
      >
        <div className="slp-wrap">
          <div className="slp-head" data-slp-reveal>
            <span className="slp-kicker">{data.benefits.kicker}</span>
            <h2 id="slp-benefits-title" className="slp-title">
              {data.benefits.title}
            </h2>
            <p className="slp-subtitle">{data.benefits.subtitle}</p>
          </div>
          <div className="slp-grid slp-grid--4">
            {data.benefits.items.map((item, i) => {
              const Icon = BENEFIT_ICONS[i] ?? Sparkles;
              return (
                <Window key={item.title} label={`GANHO_0${i + 1}`} data-slp-reveal>
                  <Icon className="slp-benefit__icon size-5" aria-hidden />
                  <h3 className="slp-pain__title">{item.title}</h3>
                  <p className="slp-card__desc">{item.description}</p>
                  {item.metric ? (
                    <span className="slp-benefit__metric">{item.metric}</span>
                  ) : null}
                </Window>
              );
            })}
          </div>
        </div>
      </section>

      {/* 06 Como funciona */}
      <section
        id="como-funciona"
        className="slp-section"
        aria-labelledby="slp-how-title"
      >
        <div className="slp-wrap">
          <div className="slp-head slp-head--center" data-slp-reveal>
            <span className="slp-kicker">{data.howItWorks.kicker}</span>
            <h2 id="slp-how-title" className="slp-title">
              {data.howItWorks.title}
            </h2>
            <p className="slp-subtitle">{data.howItWorks.subtitle}</p>
          </div>
          <div className="slp-steps">
            {data.howItWorks.steps.map((step) => (
              <Window key={step.step} label={`STEP_${step.step}`} data-slp-reveal>
                <p className="slp-step__num">{step.step}</p>
                <h3 className="slp-step__title">{step.title}</h3>
                <p className="slp-step__desc">{step.description}</p>
              </Window>
            ))}
          </div>
          <div className="slp-mid-cta" data-slp-reveal>
            <WhatsappButton size="lg">{data.howItWorks.cta}</WhatsappButton>
          </div>
        </div>
      </section>

      {/* 07 Entregáveis */}
      <section className="slp-section" aria-labelledby="slp-deliver-title">
        <div className="slp-wrap">
          <div className="slp-head" data-slp-reveal>
            <span className="slp-kicker">{data.deliverables.kicker}</span>
            <h2 id="slp-deliver-title" className="slp-title">
              {data.deliverables.title}
            </h2>
            <p className="slp-subtitle">{data.deliverables.subtitle}</p>
          </div>
          <div className="slp-deliver">
            {data.deliverables.items.map((item) => (
              <div key={item} className="slp-deliver__item" data-slp-reveal>
                <Check className="size-4" aria-hidden />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08 Capacidades */}
      <section className="slp-section" aria-labelledby="slp-cap-title">
        <div className="slp-wrap">
          <div className="slp-head" data-slp-reveal>
            <span className="slp-kicker">{data.capabilities.kicker}</span>
            <h2 id="slp-cap-title" className="slp-title">
              {data.capabilities.title}
            </h2>
            <p className="slp-subtitle">{data.capabilities.subtitle}</p>
          </div>
          <div className="slp-grid slp-grid--3">
            {data.capabilities.items.map((cap, i) => {
              const Icon = CAP_ICONS[i] ?? Layers;
              return (
                <Window key={cap.title} label={`MOD_0${i + 1}`} data-slp-reveal>
                  <Icon className="slp-cap__icon size-4" aria-hidden />
                  <h3 className="slp-cap__title">{cap.title}</h3>
                  <p className="slp-cap__desc">{cap.description}</p>
                </Window>
              );
            })}
          </div>
        </div>
      </section>

      {/* 09 Para quem é */}
      <section className="slp-section" aria-labelledby="slp-audience-title">
        <div className="slp-wrap">
          <div className="slp-head slp-head--center" data-slp-reveal>
            <span className="slp-kicker">{data.audience.kicker}</span>
            <h2 id="slp-audience-title" className="slp-title">
              {data.audience.title}
            </h2>
          </div>
          <div className="slp-audience">
            <Window
              label={data.audience.forTitle}
              className="slp-audience__col--for"
              data-slp-reveal
            >
              <ul className="slp-audience__list">
                {data.audience.forItems.map((item) => (
                  <li key={item}>
                    <Check className="size-4 text-emerald-400" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </Window>
            <Window
              label={data.audience.notForTitle}
              className="slp-audience__col--not"
              data-slp-reveal
            >
              <ul className="slp-audience__list">
                {data.audience.notForItems.map((item) => (
                  <li key={item}>
                    <X className="size-4 text-red-400" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </Window>
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
      <section className="slp-section" aria-labelledby="slp-compare-title">
        <div className="slp-wrap">
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
                  {data.comparison.columns.map((col) => (
                    <th key={col} scope="col">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.comparison.rows.map((row) => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    {row.values.map((val, i) => (
                      <td key={`${row.label}-${i}`}>
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
      <section id="faq" className="slp-section" aria-labelledby="slp-faq-title">
        <div className="slp-wrap">
          <div className="slp-head slp-head--center" data-slp-reveal>
            <span className="slp-kicker">{data.faq.kicker}</span>
            <h2 id="slp-faq-title" className="slp-title">
              {data.faq.title}
            </h2>
            <p className="slp-subtitle">{data.faq.subtitle}</p>
          </div>
          <div className="slp-faq">
            {data.faq.items.map((item) => (
              <Collapsible
                key={item.question}
                className="slp-faq__item"
                data-slp-reveal
              >
                <CollapsibleTrigger className="slp-faq__trigger">
                  {item.question}
                  <ChevronDown className="size-4" aria-hidden />
                </CollapsibleTrigger>
                <CollapsibleContent className="slp-faq__content">
                  <p className="slp-faq__answer">{item.answer}</p>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
      </section>

      {/* 13 CTA final */}
      <section
        id="contato"
        className="slp-section slp-final"
        aria-labelledby="slp-final-title"
      >
        <div className="slp-wrap" data-slp-reveal>
          <span className="slp-kicker">{data.finalCta.kicker}</span>
          <h2 id="slp-final-title" className="slp-title">
            {data.finalCta.headline}
          </h2>
          <p className="slp-subtitle">{data.finalCta.subheadline}</p>
          <div
            className="slp-hero__actions"
            style={{ justifyContent: "center", marginTop: "2rem" }}
          >
            <WhatsappButton size="lg">{data.finalCta.cta}</WhatsappButton>
          </div>
          <p className="slp-final__risk">{data.finalCta.riskReversal}</p>
        </div>
      </section>

      {/* 14 Relacionados */}
      <section className="slp-section slp-related" aria-labelledby="slp-related-title">
        <div className="slp-wrap">
          <div className="slp-head" data-slp-reveal>
            <span className="slp-kicker">// explore</span>
            <h2 id="slp-related-title" className="slp-title">
              Serviços que combinam com esse
            </h2>
          </div>
          <div className="slp-grid slp-grid--3">
            {data.relatedServices.map((svc) => (
              <Link
                key={svc.slug}
                href={`/servicos/${svc.slug}`}
                data-slp-reveal
              >
                <Window label={svc.label} bodyClassName="flex flex-col h-full">
                  <h3 className="slp-related__name">{svc.name}</h3>
                  <p className="slp-related__teaser">{svc.teaser}</p>
                  <span className="slp-related__link">
                    Ver solução
                    <ArrowRight className="size-3" aria-hidden />
                  </span>
                </Window>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer homePrefix="/" />
    </div>
  );
}
