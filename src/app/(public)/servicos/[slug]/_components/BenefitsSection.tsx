import {
  Sparkles,
  Workflow,
  LayoutDashboard,
  TrendingUp,
  Zap,
  Target,
} from "lucide-react";

type BenefitItem = { title: string; description: string; metric?: string };

type Props = {
  kicker: string;
  title: string;
  subtitle: string;
  items: BenefitItem[];
};

const BENEFIT_ICONS = [Sparkles, Workflow, LayoutDashboard, TrendingUp, Zap, Target] as const;

export default function BenefitsSection({ kicker, title, subtitle, items }: Props) {
  return (
    <section
      id="solucao"
      className="slp-section slp-bnf-fold"
      aria-labelledby="slp-bnf-title"
    >
      {/* ── decoration ───────────────────────────────────────── */}
      <div className="slp-bnf-fold__bg" aria-hidden />
      <div className="slp-bnf-fold__grid" aria-hidden />
      <div className="slp-bnf-fold__scanlines" aria-hidden />
      <div className="slp-bnf-fold__glow slp-bnf-fold__glow--lime" aria-hidden />
      <div className="slp-bnf-fold__glow slp-bnf-fold__glow--em" aria-hidden />
      <div className="slp-bnf-fold__rule slp-bnf-fold__rule--top" aria-hidden />
      <div className="slp-bnf-fold__rule slp-bnf-fold__rule--bottom" aria-hidden />
      <span className="slp-bnf-fold__watermark" aria-hidden>GANHO</span>
      <span className="slp-bnf-fold__corner slp-bnf-fold__corner--tl" aria-hidden />
      <span className="slp-bnf-fold__corner slp-bnf-fold__corner--br" aria-hidden />
      <span className="slp-bnf-fold__tag slp-bnf-fold__tag--left" aria-hidden>BENEFITS</span>
      <span className="slp-bnf-fold__tag slp-bnf-fold__tag--right" aria-hidden>VALUE</span>

      <div className="slp-wrap slp-bnf-fold__wrap">
        {/* ── header ─────────────────────────────────────────── */}
        <div className="slp-head slp-head--center" data-slp-reveal>
          <span className="slp-kicker">{kicker}</span>
          <h2 id="slp-bnf-title" className="slp-title">
            {title}
          </h2>
          <p className="slp-subtitle">{subtitle}</p>
        </div>

        {/* ── cards grid — todos visíveis simultaneamente ─────── */}
        <div className="slp-bnf__grid">
          {items.map((item, i) => {
            const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
            const num = String(i + 1).padStart(2, "0");
            return (
              <article
                key={item.title}
                className="slp-bnf__card"
                data-slp-reveal
              >
                {/* accent line top */}
                <div className="slp-bnf__card-accent" aria-hidden />

                {/* glow ao hover */}
                <div className="slp-bnf__card-glow" aria-hidden />

                {/* número watermark grande */}
                <span className="slp-bnf__card-num" aria-hidden>{num}</span>

                {/* conteúdo */}
                <div className="slp-bnf__card-inner">
                  <div className="slp-bnf__card-header">
                    <div className="slp-bnf__card-icon" aria-hidden>
                      <Icon className="size-5" />
                    </div>
                    <span className="slp-bnf__card-label" aria-hidden>
                      GANHO_{num}
                    </span>
                  </div>

                  <h3 className="slp-bnf__card-title">{item.title}</h3>

                  <div className="slp-bnf__card-divider" aria-hidden />

                  <p className="slp-bnf__card-desc">{item.description}</p>

                  {item.metric && (
                    <span className="slp-bnf__card-metric">{item.metric}</span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
