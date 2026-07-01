"use client";
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CalendarCheck,
  CalendarDays,
  Camera,
  Check,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Code2,
  Film,
  Gift,
  Hash,
  Images,
  LayoutGrid,
  MessageCircle,
  MonitorSmartphone,
  Moon,
  Palette,
  PartyPopper,
  Phone,
  Play,
  Smartphone,
  Star,
  Sun,
  Target,
  TrendingUp,
  UserRound,
  Users,
  Video,
  Workflow,
  Zap,
} from "lucide-react";
import { gsap } from "gsap";

/* ── Meta dos slides (rótulos = índice das dots) ── */
const SLIDE_LABELS = [
  "Capa", "Jornada", "Empresa", "Equipe", "Método", "Serviços",
  "Social Media", "Captação", "Audiovisual", "Eventos", "Site", "Contato",
] as const;
const TOTAL = SLIDE_LABELS.length;
const pad = (n: number) => String(n).padStart(2, "0");

/* ── Planos do Social Media (escopo, sem preço) ── */
const SM_TIERS: Record<string, { items: [LucideIcon, string][] }> = {
  essencial: {
    items: [
      [Video, "3 vídeos por mês"],
      [Smartphone, "2 stories por semana"],
      [Images, "2 artes de feed"],
    ],
  },
  completo: {
    items: [
      [Video, "4 vídeos por mês"],
      [Smartphone, "4 stories por semana"],
      [Images, "4 artes de feed"],
      [CalendarDays, "Opção trimestral"],
    ],
  },
  performance: {
    items: [
      [Video, "6 vídeos por mês"],
      [Smartphone, "5 stories por semana"],
      [Images, "4 artes de feed"],
      [TrendingUp, "Verba de tráfego pago inclusa"],
    ],
  },
};

/* Esconde a imagem quando não existe → revela o placeholder retrô por trás */
const hideOnError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.style.display = "none";
};

function Chrome({ label }: { label: string }) {
  return (
    <div className="card-chrome">
      <span className="card-chrome-label">{label}</span>
      <div className="card-chrome-dots" aria-hidden>
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function Deliver({ icon: Icon, title, desc }: { icon: LucideIcon; title: string; desc?: string }) {
  return (
    <div className="deliver">
      <span className="dot">
        <Icon size={12} strokeWidth={2.4} />
      </span>
      <div>
        <p className="text-sm text-fg font-medium">{title}</p>
        {desc && <p className="text-xs text-muted">{desc}</p>}
      </div>
    </div>
  );
}

export default function PropostaDeck() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [smTier, setSmTier] = useState<keyof typeof SM_TIERS>("essencial");
  const [avPkg, setAvPkg] = useState<number | null>(null);

  /* Tema - restaura preferência */
  useEffect(() => {
    const saved = localStorage.getItem("elevate-theme");
    if (saved === "dark" || saved === "light") setTheme(saved);
  }, []);
  const toggleTheme = () => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      localStorage.setItem("elevate-theme", next);
      return next;
    });
  };

  /* Trava o scroll do documento enquanto o deck está montado */
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
    };
  }, []);

  const go = useCallback((i: number) => {
    setIndex(Math.max(0, Math.min(TOTAL - 1, i)));
  }, []);
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  /* Teclado */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); next(); }
      else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); prev(); }
      else if (e.key === "Home") { e.preventDefault(); go(0); }
      else if (e.key === "End") { e.preventDefault(); go(TOTAL - 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, go]);

  /* Swipe (touch) */
  useEffect(() => {
    const deck = rootRef.current;
    if (!deck) return;
    let sx = 0, sy = 0, touching = false;
    const start = (e: TouchEvent) => { const t = e.changedTouches[0]; sx = t.clientX; sy = t.clientY; touching = true; };
    const end = (e: TouchEvent) => {
      if (!touching) return;
      touching = false;
      const t = e.changedTouches[0];
      const dx = t.clientX - sx, dy = t.clientY - sy;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.3) { if (dx < 0) next(); else prev(); }
    };
    deck.addEventListener("touchstart", start, { passive: true });
    deck.addEventListener("touchend", end, { passive: true });
    return () => {
      deck.removeEventListener("touchstart", start);
      deck.removeEventListener("touchend", end);
    };
  }, [next, prev]);

  /* Reveal + count-up ao entrar no slide */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[index] as HTMLElement | undefined;
    if (!slide) return;
    slide.scrollTop = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = slide.querySelectorAll<HTMLElement>(".r");
    if (reduce) {
      items.forEach((el) => { el.style.opacity = "1"; el.style.transform = "none"; el.style.filter = "none"; });
      return;
    }
    gsap.killTweensOf(items);
    gsap.set(items, { opacity: 0, y: 24, filter: "blur(6px)" });
    gsap.to(items, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out", stagger: 0.07, overwrite: true });
    slide.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
      const endVal = parseFloat(el.dataset.count || "0");
      const suffix = el.dataset.suffix || "";
      const obj = { v: 0 };
      gsap.to(obj, { v: endVal, duration: 1.1, ease: "power2.out", onUpdate: () => { el.textContent = Math.round(obj.v) + suffix; } });
    });
  }, [index]);

  /* Parallax dos glyphs da capa com o mouse */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const glyphs = Array.from(root.querySelectorAll<HTMLElement>("[data-glyph]"));
    if (!glyphs.length) return;
    let mx = 0, my = 0, sx = 0, sy = 0, raf = 0;
    const onMove = (e: PointerEvent) => { mx = (e.clientX / window.innerWidth) * 2 - 1; my = (e.clientY / window.innerHeight) * 2 - 1; };
    const loop = () => {
      sx += (mx - sx) * 0.06; sy += (my - sy) * 0.06;
      glyphs.forEach((g) => {
        const d = parseFloat(g.dataset.depth || "1");
        g.style.marginLeft = `${sx * 16 * d}px`;
        g.style.marginTop = `${sy * 16 * d}px`;
      });
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("pointermove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={rootRef} className="proposta-root" data-theme={theme}>
      <div className="scanlines-global" aria-hidden />
      <div className="deck-progress" style={{ width: `${((index + 1) / TOTAL) * 100}%` }} />

      {/* ── TOP NAV ── */}
      <header className="fixed inset-x-0 top-4 z-[70] px-4">
        <nav
          className="mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-full border px-4 py-2.5 backdrop-blur-2xl"
          style={{ background: "var(--glass)", borderColor: "var(--line-strong)" }}
        >
          <button onClick={() => go(0)} className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center text-black" style={{ background: "#dfff00", boxShadow: "3px 3px 0 #000" }}>
              <Zap size={16} />
            </span>
            <span className="font-display text-lg tracking-tight">ELEVATEPRO</span>
          </button>

          <div className="hidden items-center gap-6 md:flex">
            <button onClick={() => go(2)} className="nav-link">Empresa</button>
            <button onClick={() => go(3)} className="nav-link">Equipe</button>
            <button onClick={() => go(5)} className="nav-link">Serviços</button>
            <button onClick={() => go(11)} className="nav-link">Contato</button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Alternar tema"
              className="icon-btn grid h-9 w-9 place-items-center rounded-full border"
              style={{ borderColor: "var(--line-strong)" }}
            >
              {theme === "dark" ? <Moon size={17} /> : <Sun size={17} />}
            </button>
            <button onClick={() => go(11)} className="pixel-btn is-sm hidden sm:inline-flex">Fale conosco</button>
          </div>
        </nav>
      </header>

      {/* ── DECK ── */}
      <main className="ps-deck" aria-label="Apresentação de serviços">
        <div ref={trackRef} className="ps-track" style={{ transform: `translateX(${-index * 100}vw)` }}>

          {/* ═══ 0 · CAPA ═══ */}
          <section className="slide" aria-label="Capa">
            <video className="absolute inset-0 h-full w-full object-cover opacity-[0.22]" autoPlay muted loop playsInline aria-hidden>
              <source src="/videofundo3.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, var(--bg) 100%)" }} />
            <div className="grid-overlay" />
            <div data-blob className="glow-blob glow-lime left-[8%] top-1/3 h-[min(55vw,460px)] w-[min(55vw,460px)] -translate-y-1/2" />
            <div data-blob className="glow-blob glow-emerald bottom-[12%] right-[6%] h-[min(48vw,400px)] w-[min(48vw,400px)]" />

            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden>
              <path d="M200,0 Q1320,80 1440,180" stroke="#22c55e" strokeWidth="6" fill="none" opacity="0.4" strokeDasharray="100 200" style={{ animation: "ps-streak 28s linear infinite" }} strokeLinecap="round" />
              <path d="M240,900 Q120,780 0,620" stroke="#dfff00" strokeWidth="6" fill="none" opacity="0.42" strokeDasharray="100 200" style={{ animation: "ps-streak 26s linear infinite 1s" }} strokeLinecap="round" />
            </svg>

            <div className="pointer-events-none absolute inset-0 z-[9]">
              <span data-glyph data-depth="0.7" className="absolute left-[12%] top-[24%] text-3xl opacity-40 anim-float">▲</span>
              <span data-glyph data-depth="1.1" className="absolute right-[14%] top-[20%] text-4xl opacity-40 anim-float" style={{ animationDelay: ".6s", color: "#dfff00" }}>◆</span>
              <span data-glyph data-depth="0.9" className="absolute left-[18%] bottom-[22%] text-2xl opacity-40 anim-float" style={{ animationDelay: "1.1s", color: "#22c55e" }}>●</span>
              <span data-glyph data-depth="1.2" className="absolute right-[20%] bottom-[26%] text-3xl opacity-40 anim-float" style={{ animationDelay: ".3s" }}>✦</span>
            </div>

            <div className="slide-inner items-center text-center">
              <div className="r mb-6 flex justify-center">
                <span className="badge-pill"><span className="h-1.5 w-1.5 rounded-full" style={{ background: "#dfff00" }} /> Proposta comercial · Desde 2021</span>
              </div>
              <p className="r font-pixel text-[10px] uppercase tracking-[0.25em] hl-accent mb-4">{"// "}Apresentação de serviços</p>
              <h1 className="r font-display text-[clamp(2.6rem,10vw,6rem)] font-normal leading-[0.9] tracking-tight">
                ELEVATEPRO<br /><span className="hl-accent">MEDIA</span>
                <span className="cursor-blink font-pixel align-middle text-[0.32em]" style={{ color: "#dfff00" }}>_</span>
              </h1>
              <p className="r mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                A ElevatePro Media nasceu para contar histórias que fazem as marcas serem vistas e lembradas. Criamos conteúdo que conecta, que informa e que move o público a agir. Do planejamento à entrega final, cada peça tem um propósito claro.
              </p>
              <div className="r mt-9 flex flex-wrap items-center justify-center gap-4">
                <button onClick={() => go(1)} className="pixel-btn is-lg"><Play size={14} /> Iniciar apresentação</button>
                <button onClick={() => go(5)} className="btn-glass btn-beam">Ver serviços <ArrowRight size={16} /></button>
              </div>
              <div className="r mt-14 flex items-center gap-3 text-muted">
                <ChevronRight size={18} className="anim-float" />
                <span className="font-pixel text-[7px] uppercase tracking-[0.2em]">Navegue com as setas ← →</span>
              </div>
            </div>
          </section>

          {/* ═══ 1 · JORNADA ═══ */}
          <section className="slide" aria-label="Jornada">
            <div className="grid-overlay opacity-60" />
            <div data-blob className="glow-blob glow-lime -left-20 top-10 h-[320px] w-[320px] opacity-60" />
            <div className="slide-inner">
              <header className="r mb-10 max-w-2xl">
                    <p className="kicker kicker-accent">{"// "}01 · O roteiro</p>
                <h2 className="font-display mt-3 text-4xl leading-tight tracking-tight md:text-5xl">A jornada que vamos percorrer juntos</h2>
                <p className="mt-4 text-muted">Conheça quem somos, como pensamos e os caminhos que podemos trilhar para fazer sua marca ganhar mais força e presença.</p>
              </header>
              <div className="grid gap-5 md:grid-cols-3">
                {[
                  { to: 2, n: "01", icon: Building2, title: "Quem somos", desc: "A empresa e as pessoas por trás de cada entrega.", cta: "Conhecer" },
                  { to: 4, n: "02", icon: Workflow, title: "Como trabalhamos", desc: "Um método claro que vai do planejamento até a entrega de resultados.", cta: "Ver método" },
                  { to: 5, n: "03", icon: LayoutGrid, title: "Nossos serviços", desc: "Seis caminhos diferentes para fazer sua marca ser vista e sentida pelo público.", cta: "Explorar" },
                ].map(({ to, n, icon: Icon, title, desc, cta }) => (
                  <button key={n} onClick={() => go(to)} className="r bento-cell p-6 text-left">
                    <span className="font-pixel text-[9px] hl-accent">{n}</span>
                    <div className="mt-4 grid h-12 w-12 place-items-center text-black" style={{ background: "#dfff00", boxShadow: "3px 3px 0 #000" }}><Icon size={24} /></div>
                    <h3 className="mt-4 font-display text-2xl">{title}</h3>
                    <p className="mt-2 text-sm text-muted">{desc}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs hl-accent">{cta} <ArrowRight size={14} /></span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* ═══ 2 · EMPRESA ═══ */}
          <section className="slide" aria-label="Empresa">
            <div data-blob className="glow-blob glow-emerald right-0 top-20 h-[360px] w-[360px] opacity-60" />
            <div className="slide-inner">
              <div className="grid items-center gap-10 lg:grid-cols-2">
                <div>
                  <header className="r mb-6 max-w-xl">
                    <p className="kicker kicker-accent">{"// "}02 · Nossa empresa</p>
                    <h2 className="font-display mt-3 text-4xl leading-tight tracking-tight md:text-5xl">Conteúdo que atrai e converte</h2>
                  </header>
                  <p className="r text-muted leading-relaxed">
                    Desde 2021 a ElevatePro Media trabalha com marcas que querem se comunicar melhor. Começamos observando que muitas empresas tinham dificuldade em manter uma presença consistente nas redes e em outros canais. Decidimos mudar isso.
                  </p>
                  <p className="r mt-4 text-muted leading-relaxed">
                    Acreditamos que conteúdo de qualidade constrói confiança. Quando a marca aparece com clareza e consistência, as pessoas prestam atenção. Nosso trabalho é ajudar você a ocupar esse espaço de forma profissional e estratégica, gerando conexões reais e resultados que importam.
                  </p>
                  <div className="r mt-8 grid grid-cols-4 gap-2.5">
                    <div className="count-box"><div className="count-num">2021</div><div className="mt-2 font-pixel text-[7px] uppercase tracking-[0.1em] text-muted">desde</div></div>
                    <div className="count-box"><div className="count-num" data-count="3">0</div><div className="mt-2 font-pixel text-[7px] uppercase tracking-[0.1em] text-muted">especialistas</div></div>
                    <div className="count-box"><div className="count-num" data-count="6">0</div><div className="mt-2 font-pixel text-[7px] uppercase tracking-[0.1em] text-muted">serviços</div></div>
                    <div className="count-box"><div className="count-num" data-count="4" data-suffix="K">0</div><div className="mt-2 font-pixel text-[7px] uppercase tracking-[0.1em] text-muted">resolução</div></div>
                  </div>
                </div>
                <div className="r">
                  <div className="terminal text-sm">
                    <div className="terminal-bar">
                      <div className="flex items-center gap-2">
                        <div className="terminal-dots" aria-hidden><span style={{ background: "#f87171" }} /><span style={{ background: "#fbbf24" }} /><span style={{ background: "#22c55e" }} /></div>
                        <span className="ml-2 text-[11px] text-muted">elevatepro manifesto</span>
                      </div>
                      <span className="flex items-center gap-1.5 text-[11px]" style={{ color: "#22a06b" }}><span className="h-1.5 w-1.5 rounded-full" style={{ background: "#22c55e" }} /> ONLINE</span>
                    </div>
                    <div>
                      {[
                        ["MISSÃO", "Elevar o nível das marcas com profissionalismo e qualidade."],
                        ["CRENÇA", "Conteúdo bem feito cria conexões que geram resultados."],
                        ["FOCO", "Cuidamos de cada etapa para que sua marca seja percebida com força."],
                        ["META", "Transformar cada projeto em um passo real de crescimento."],
                      ].map(([k, v]) => (
                        <div key={k} className="terminal-row md:grid-cols-[120px_1fr] md:gap-5">
                          <div className="text-xs tracking-widest hl-accent">{k}</div>
                          <div className="text-xs text-fg md:text-sm">{v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══ 3 · EQUIPE ═══ */}
          <section className="slide" aria-label="Equipe">
            <div className="grid-overlay opacity-50" />
            <div data-blob className="glow-blob glow-lime left-1/2 top-0 h-[320px] w-[320px] -translate-x-1/2 opacity-50" />
            <div className="slide-inner">
              <header className="r mb-10 max-w-2xl">
                <p className="kicker kicker-accent">{"// "}03 · Nossa equipe</p>
                <h2 className="font-display mt-3 text-4xl leading-tight tracking-tight md:text-5xl">Pessoas que fazem acontecer</h2>
                <p className="mt-4 text-muted">Somos uma equipe pequena, dedicada e com muita prática. Cada pessoa aqui entende de verdade o que é preciso para fazer conteúdo que funciona.</p>
              </header>
              <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
                {[
                  { sys: "SYS://EQUIPE_01", img: "eduardo", name: "Eduardo dos Santos", role: "Gerente de Marketing", bio: "Tecnólogo em Marketing. Responsável pelas captações, estratégias e planejamentos.", src: "https://res.cloudinary.com/dn454izoh/image/upload/v1782865019/Captura_de_Tela_2026-06-30_a%CC%80s_21.16.14_avnkso.png" },
                  { sys: "SYS://EQUIPE_02", img: "petrick", name: "Petrick Matheus", role: "Editor · Gestor de Tráfego", bio: "Designer gráfico e editor de vídeos desde 2021. Responsável por edições, gestão das páginas e tráfego pago.", src: "https://res.cloudinary.com/dn454izoh/image/upload/v1782865019/Captura_de_Tela_2026-06-30_a%CC%80s_21.16.19_ta9aeg.png" },
                  { sys: "SYS://EQUIPE_03", img: "rafael", name: "Rafael Gois", role: "Programador Full Stack", bio: "Graduando em Engenharia de Software. Atua no desenvolvimento de sites, programas e aplicativos.", src: "https://res.cloudinary.com/dn454izoh/image/upload/v1782865019/Captura_de_Tela_2026-06-30_a%CC%80s_21.16.26_jxdemz.png" },
                ].map((m) => (
                  <article key={m.img} className="r card-window">
                    <Chrome label={m.sys} />
                    <figure className="media-frame is-flush is-contain" style={{ aspectRatio: "3/4" }}>
                      <img src={m.src ?? `/references/img/${m.img}.jpg`} alt={m.name} onError={hideOnError} />
                      <div className="media-ph"><UserRound className="ph-ic" size={46} /></div>
                      <span className="media-tag">Foto</span>
                    </figure>
                    <div className="card-panel p-3">
                      <h3 className="font-display text-base">{m.name}</h3>
                      <p className="mt-1 font-pixel text-[7px] uppercase tracking-[0.1em] hl-accent">{m.role}</p>
                      <p className="mt-2 text-xs text-muted">{m.bio}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ═══ 4 · MÉTODO ═══ */}
          <section className="slide" aria-label="Método">
            <div data-blob className="glow-blob glow-lime right-0 top-10 h-[340px] w-[340px] opacity-50" />
            <div className="slide-inner">
              <header className="r mb-10 max-w-2xl">
                <p className="kicker kicker-accent">{"// "}04 · Como trabalhamos</p>
                <h2 className="font-display mt-3 text-4xl leading-tight tracking-tight md:text-5xl">Do planejamento ao resultado</h2>
                <p className="mt-4 text-muted">Temos um jeito claro de trabalhar. Analisamos, planejamos, captamos, editamos e colocamos a estratégia em prática. Tudo se conecta para que sua marca ganhe força de verdade.</p>
              </header>

              <article className="r card-window mb-8">
                <Chrome label="SYS://PIPELINE" />
                <div className="card-panel">
                  <div className="relative">
                    <div className="pipe-rail hidden md:block" aria-hidden><span className="pipe-signal" /></div>
                    <div className="relative grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
                      {[
                        [BarChart3, "01", "ANÁLISE"],
                        [CalendarCheck, "02", "PLANEJAMENTO"],
                        [CheckCheck, "03", "APROVAÇÃO"],
                        [Video, "04", "CAPTAÇÃO 4K"],
                        [TrendingUp, "05", "ESTRATÉGIA"],
                      ].map(([Icon, n, label]) => {
                        const I = Icon as LucideIcon;
                        return (
                          <div key={n as string} className="pipe-step group flex flex-col items-center gap-3 text-center">
                            <span className="pipe-node"><I size={22} /></span>
                            <span>
                              <span className="block mono text-[10px]" style={{ color: "#84a700" }}>{n as string}</span>
                              <span className="mono text-xs tracking-widest">{label as string}</span>
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </article>

              <div className="grid gap-5 md:grid-cols-3">
                {[
                  { icon: CalendarCheck, title: "Planejamento", desc: "Entendemos o seu mercado, identificamos oportunidades e construímos um plano mensal que faz sentido para a sua marca." },
                  { icon: Camera, title: "Captação", desc: "Gravamos em alta qualidade. Cada imagem e cada movimento são pensados para mostrar o melhor do que você oferece." },
                  { icon: Target, title: "Estratégia", desc: "Colocamos o conteúdo no lugar certo, na hora certa. Medimos o que funciona e ajustamos para gerar mais conexão com o público." },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="r card-glass p-6">
                    <span className="grid h-11 w-11 place-items-center rounded-xl text-black" style={{ background: "#dfff00" }}><Icon size={22} /></span>
                    <h4 className="mt-4 font-display text-lg">{title}</h4>
                    <p className="mt-1.5 text-sm text-muted">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══ 5 · SERVIÇOS ═══ */}
          <section className="slide" aria-label="Serviços">
            <div className="grid-overlay opacity-50" />
            <div data-blob className="glow-blob glow-lime left-1/2 top-0 h-[320px] w-[320px] -translate-x-1/2 opacity-50" />
            <div className="slide-inner">
              <header className="r mb-10 max-w-2xl">
                <p className="kicker kicker-accent">{"// "}05 · Nossos serviços</p>
                <h2 className="font-display mt-3 text-4xl leading-tight tracking-tight md:text-5xl">O que fazemos pela sua marca</h2>
                <p className="mt-4 text-muted">Conheça as seis frentes em que atuamos. Cada uma existe para resolver um tipo de desafio que marcas como a sua enfrentam todos os dias.</p>
              </header>
              <div className="r module-grid grid-cols-2 md:grid-cols-3">
                {[
                  { to: 6, icon: Hash, title: "SOCIAL MEDIA", sub: "gestão contínua" },
                  { to: null, icon: Palette, title: "IDENTIDADE", sub: "marca & branding" },
                  { to: 7, icon: Camera, title: "CAPTAÇÃO", sub: "diária foto/vídeo" },
                  { to: 8, icon: Clapperboard, title: "AUDIOVISUAL", sub: "pacotes de vídeo" },
                  { to: 9, icon: PartyPopper, title: "EVENTOS", sub: "cobertura pro" },
                  { to: 10, icon: Code2, title: "SITE", sub: "presença digital" },
                ].map(({ to, icon: Icon, title, sub }) => (
                  <button key={title} className="module-cell" onClick={to === null ? undefined : () => go(to)}>
                    <Icon className="m-icon" size={28} />
                    <div className="mt-5 mono text-sm tracking-widest">{title}</div>
                    <div className="mt-1 font-pixel text-[7px] uppercase tracking-[0.1em] text-muted">{sub}</div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* ═══ 6 · SOCIAL MEDIA ═══ */}
          <section className="slide" aria-label="Social Media">
            <div data-blob className="glow-blob glow-emerald right-0 top-20 h-[340px] w-[340px] opacity-50" />
            <div className="slide-inner">
              <div className="grid items-center gap-10 lg:grid-cols-2">
                <div>
                  <p className="r kicker kicker-accent">{"// "}Serviço 01 · Gestão contínua</p>
                  <h2 className="r font-display mt-3 text-4xl leading-tight tracking-tight md:text-5xl">Social Media</h2>
                  <p className="r mt-4 text-muted leading-relaxed">
                    Sua marca merece estar presente todos os dias com qualidade. Cuidamos da sua comunicação nas redes de forma contínua. Produzimos vídeos, stories, artes e registramos momentos importantes para que o público sempre veja você de forma profissional e coerente.
                  </p>

                  <div className="r mt-6">
                    <p className="kicker mb-3">Escolha o plano que melhor atende sua marca</p>
                    <div className="flex flex-wrap gap-2">
                      {([["essencial", "Essencial"], ["completo", "Completo"], ["performance", "+ Tráfego"]] as const).map(([key, label]) => (
                        <button
                          key={key}
                          onClick={() => setSmTier(key)}
                          className={`pixel-btn is-sm is-outline${smTier === key ? " is-active" : ""}`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    <div className="mt-5">
                      {SM_TIERS[smTier].items.map(([Icon, txt]) => (
                        <Deliver key={txt} icon={Icon} title={txt} />
                      ))}
                    </div>
                  </div>

                  <div className="r mt-6 flex items-center gap-3">
                    <span className="badge-pixel" style={{ background: "#000", color: "#dfff00" }}><Gift size={10} /> Brinde 6 meses</span>
                    <span className="text-xs text-muted">Fechou 6 meses? Identidade visual por nossa conta.</span>
                  </div>
                </div>

                <div className="r grid grid-cols-2 gap-4">
                  <figure className="media-frame is-tall">
                    <img src="https://res.cloudinary.com/dn454izoh/image/upload/v1756823356/img-11_tcjhvo.jpg" alt="Conteúdo para redes sociais" onError={hideOnError} />
                    <div className="media-ph"><Images className="ph-ic" size={42} /></div>
                    <span className="media-tag">Feed</span>
                  </figure>
                  <div className="grid gap-4">
                    <figure className="media-frame">
                      <img src="https://res.cloudinary.com/dn454izoh/image/upload/v1758203203/site-2_zz3ohw.jpg" alt="Stories" onError={hideOnError} />
                      <div className="media-ph"><Smartphone className="ph-ic" size={34} /></div>
                      <span className="media-tag">Stories</span>
                    </figure>
                    <figure className="media-frame">
                      <img src="https://res.cloudinary.com/dn454izoh/image/upload/v1758328338/conex%C3%A3o_mulher-18_ovisqu.jpg" alt="Reels e vídeos" onError={hideOnError} />
                      <div className="media-ph"><Video className="ph-ic" size={34} /></div>
                      <span className="media-tag">Reels</span>
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══ 7 · DIÁRIA DE CAPTAÇÃO ═══ */}
          <section className="slide" aria-label="Diária de Captação">
            <div data-blob className="glow-blob glow-emerald right-0 top-10 h-[340px] w-[340px] opacity-50" />
            <div className="slide-inner">
              <div className="grid items-center gap-10 lg:grid-cols-2">
                <div>
                  <p className="r kicker kicker-accent">{"// "}Serviço 03 · Produção</p>
                  <h2 className="r font-display mt-3 text-4xl leading-tight tracking-tight md:text-5xl">Diária de Captação</h2>
                  <p className="r mt-4 text-muted leading-relaxed">
                    Às vezes você precisa de alguém para registrar tudo com qualidade durante um dia inteiro. Oferecemos uma diária completa de captação. Chegamos, entendemos o que importa e registramos em foto e vídeo com atenção aos detalhes que fazem diferença.
                  </p>
                  <div className="r mt-6 grid grid-cols-3 gap-3">
                    <div className="count-box"><div className="count-num">7:30</div><div className="mt-2 font-pixel text-[7px] uppercase tracking-[0.1em] text-muted">horas</div></div>
                    <div className="count-box"><div className="count-num" data-count="15">0</div><div className="mt-2 font-pixel text-[7px] uppercase tracking-[0.1em] text-muted">dias entrega</div></div>
                    <div className="count-box"><div className="count-num" data-count="4" data-suffix="K">0</div><div className="mt-2 font-pixel text-[7px] uppercase tracking-[0.1em] text-muted">resolução</div></div>
                  </div>
                  <div className="r mt-6">
                    <Deliver icon={Check} title="7h30 de captação em campo" />
                    <Deliver icon={Check} title="Material editado em até 15 dias" />
                    <Deliver icon={Check} title="Fotos, vídeos ou lives a critério do cliente" />
                  </div>
                </div>
                <div className="r">
                  <figure className="media-frame is-wide">
                    <img src="https://res.cloudinary.com/dn454izoh/image/upload/v1757009566/img-10_p3zhi5.jpg" alt="Diária de captação" onError={hideOnError} />
                    <div className="media-ph"><Camera className="ph-ic" size={48} /></div>
                    <span className="media-tag">Bastidores</span>
                  </figure>
                </div>
              </div>
            </div>
          </section>

          {/* ═══ 9 · AUDIOVISUAL ═══ */}
          <section className="slide" aria-label="Audiovisual">
            <div className="grid-overlay opacity-50" />
            <div data-blob className="glow-blob glow-lime -left-10 top-10 h-[320px] w-[320px] opacity-50" />
            <div className="slide-inner">
              <div className="grid items-center gap-10 lg:grid-cols-2">
                <div className="order-2 lg:order-1">
                  <figure className="media-frame is-wide">
                    <img src="https://res.cloudinary.com/dn454izoh/image/upload/v1764621336/CODINOME-11_slunuw.webp" alt="Produção audiovisual" onError={hideOnError} />
                    <div className="media-ph"><Clapperboard className="ph-ic" size={48} /></div>
                    <span className="media-tag">Edição</span>
                  </figure>
                  <div className="mt-5 grid grid-cols-4 gap-2.5">
                    {[["1", "vídeo"], ["2", "vídeos"], ["3", "vídeos"], ["4+", "vídeos"]].map(([n, unit], i) => {
                      const val = i + 1;
                      const active = avPkg === val;
                      return (
                        <button
                          key={n}
                          className="count-box"
                          onClick={() => setAvPkg(val)}
                          style={active ? { borderColor: "#dfff00", boxShadow: "4px 4px 0 #dfff00" } : undefined}
                        >
                          <div className="count-num">{n}</div>
                          <div className="mt-2 font-pixel text-[7px] uppercase tracking-[0.1em] text-muted">{unit}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <p className="r kicker kicker-accent">{"// "}Serviço 04 · Vídeo</p>
                  <h2 className="r font-display mt-3 text-4xl leading-tight tracking-tight md:text-5xl">Audiovisual</h2>
                  <p className="r mt-4 text-muted leading-relaxed">
                    Quando você precisa de vídeos que realmente contem a história da sua marca, entramos em cena. Planejamos a captação, filmamos com cuidado e editamos cada peça para que o resultado tenha impacto, clareza e personalidade.
                  </p>
                  <div className="r mt-6">
                    <Deliver icon={Check} title="Planejamos a captação com você" desc="Para que cada frame tenha propósito." />
                    <Deliver icon={Check} title="Editamos com cuidado" desc="O material ganha ritmo, cor e mensagem clara." />
                    <Deliver icon={Check} title="Você escolhe o tamanho" desc="Trabalhamos com pacotes que se adaptam ao seu momento." />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══ 10 · COBERTURA DE EVENTO ═══ */}
          <section className="slide" aria-label="Cobertura de Evento">
            <div data-blob className="glow-blob glow-emerald right-0 bottom-10 h-[340px] w-[340px] opacity-50" />
            <div className="slide-inner">
              <div className="grid items-center gap-10 lg:grid-cols-2">
                <div>
                  <p className="r kicker kicker-accent">{"// "}Serviço 05 · Ao vivo</p>
                  <h2 className="r font-display mt-3 text-4xl leading-tight tracking-tight md:text-5xl">Cobertura de Evento</h2>
                  <p className="r mt-4 text-muted leading-relaxed">
                    Eventos são momentos únicos. Nós estamos lá para registrar o que realmente importa. Captamos o clima, as pessoas, os detalhes e transformamos tudo em um material que sua marca pode usar com orgulho por muito tempo.
                  </p>
                  <div className="r mt-6 grid grid-cols-2 gap-3">
                    <div className="count-box"><div className="count-num">1:30</div><div className="mt-2 font-pixel text-[7px] uppercase tracking-[0.1em] text-muted">after movie</div></div>
                    <div className="count-box"><div className="count-num" data-count="100" data-suffix="+">0</div><div className="mt-2 font-pixel text-[7px] uppercase tracking-[0.1em] text-muted">fotos tratadas</div></div>
                  </div>
                  <div className="r mt-6">
                    <Deliver icon={Check} title="After movie curto e impactante" />
                    <Deliver icon={Check} title="Fotos tratadas com qualidade" />
                    <Deliver icon={Check} title="Material pronto para usar nas redes" />
                  </div>
                </div>
                <div className="r grid grid-cols-2 gap-4">
                  <figure className="media-frame is-tall col-span-2">
                    <img src="https://res.cloudinary.com/dn454izoh/image/upload/v1782867002/SG-9_hj98bb.jpg" alt="Cobertura de evento" onError={hideOnError} />
                    <div className="media-ph"><Users className="ph-ic" size={46} /></div>
                    <span className="media-tag">Público</span>
                  </figure>
                  <figure className="media-frame">
                    <img src="https://res.cloudinary.com/dn454izoh/image/upload/v1758328082/eventos-18_rmoozw.jpg" alt="Detalhes do evento" onError={hideOnError} />
                    <div className="media-ph"><Star className="ph-ic" size={32} /></div>
                    <span className="media-tag">Detalhes</span>
                  </figure>
                  <figure className="media-frame">
                    <img src="https://res.cloudinary.com/dn454izoh/image/upload/v1782867147/FORMATURA-56_b8bmnk.jpg" alt="Momentos do evento" onError={hideOnError} />
                    <div className="media-ph"><Film className="ph-ic" size={32} /></div>
                    <span className="media-tag">After movie</span>
                  </figure>
                </div>
              </div>
            </div>
          </section>

          {/* ═══ 11 · SITE INSTITUCIONAL ═══ */}
          <section className="slide" aria-label="Site Institucional">
            <div className="grid-overlay opacity-50" />
            <div data-blob className="glow-blob glow-lime -left-10 top-10 h-[320px] w-[320px] opacity-50" />
            <div className="slide-inner">
              <div className="grid items-center gap-10 lg:grid-cols-2">
                <div className="order-2 lg:order-1 r">
                  <article className="card-window">
                    <Chrome label="HTTPS://SUAMARCA.COM" />
                    <figure className="media-frame is-wide is-bare" style={{ aspectRatio: "16/10" }}>
                      <img src="https://res.cloudinary.com/dn454izoh/image/upload/v1782865521/Captura_de_Tela_2026-06-30_a%CC%80s_21.25.03_ftntrq.png" alt="Site institucional" onError={hideOnError} />
                      <div className="media-ph"><MonitorSmartphone className="ph-ic" size={48} /></div>
                      <span className="media-tag">Preview</span>
                    </figure>
                    <div className="card-panel">
                      <p className="mono text-[11px] text-muted">&gt; Responsivo · rápido · otimizado para o Google</p>
                    </div>
                  </article>
                </div>
                <div className="order-1 lg:order-2">
                  <p className="r kicker kicker-accent">{"// "}Serviço 06 · Presença digital</p>
                  <h2 className="r font-display mt-3 text-4xl leading-tight tracking-tight md:text-5xl">Site Institucional</h2>
                  <p className="r mt-4 text-muted leading-relaxed">
                    O site é muitas vezes o primeiro lugar onde alguém decide se confia em você. Criamos sites institucionais que transmitem seriedade, são fáceis de navegar e ajudam as pessoas a entrarem em contato com sua empresa de forma simples e direta.
                  </p>
                  <div className="r mt-6">
                    <Deliver icon={Check} title="Desenvolvemos pensando na sua marca" desc="O site carrega sua identidade e personalidade." />
                    <Deliver icon={Check} title="E-mails com o seu domínio" desc="Comunicação mais profissional e confiável." />
                    <Deliver icon={Check} title="Preparamos para aparecer nas buscas" desc="Estrutura técnica que ajuda o Google a entender seu negócio." />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══ 12 · CONTATO ═══ */}
          <section className="slide" aria-label="Contato">
            <video className="absolute inset-0 h-full w-full object-cover opacity-[0.18]" autoPlay muted loop playsInline aria-hidden>
              <source src="/videofundo3.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, var(--bg) 100%)" }} />
            <div data-blob className="glow-blob glow-lime left-1/2 bottom-0 h-[360px] w-[440px] -translate-x-1/2 opacity-50" />
            <div className="slide-inner items-center text-center">
              <span className="r grid h-14 w-14 place-items-center text-black" style={{ background: "#dfff00", boxShadow: "5px 5px 0 #000" }}><Zap size={28} /></span>
              <h2 className="r font-display mt-6 text-[clamp(2.2rem,7vw,4rem)] leading-[0.95] tracking-tight">Vamos elevar<br />a sua marca juntos?</h2>
              <p className="r mx-auto mt-5 max-w-xl text-muted">Ficamos felizes em conhecer sua empresa e entender como podemos ajudar. Entre em contato quando quiser. Estamos prontos para conversar.</p>

              <div className="r mt-8 w-full max-w-lg">
                <div className="terminal text-left text-sm">
                  <div className="terminal-bar">
                    <div className="flex items-center gap-2">
                      <div className="terminal-dots" aria-hidden><span style={{ background: "#f87171" }} /><span style={{ background: "#fbbf24" }} /><span style={{ background: "#22c55e" }} /></div>
                      <span className="ml-2 text-[11px] text-muted">contato.card</span>
                    </div>
                    <span className="text-[11px]" style={{ color: "#22a06b" }}>DISPONÍVEL</span>
                  </div>
                  {[
                    ["CONTATO", "Eduardo dos Santos · Gerente de Marketing"],
                    ["TELEFONE", "(49) 98892-0047"],
                    ["ENDEREÇO", "Rua Oricimbo Caetano da Silva, 461, Curitibanos/SC"],
                  ].map(([k, v]) => (
                    <div key={k} className="terminal-row md:grid-cols-[110px_1fr] md:gap-4">
                      <div className="text-xs tracking-widest hl-accent">{k}</div>
                      <div className="text-xs text-fg md:text-sm">{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="r mt-8 flex flex-wrap items-center justify-center gap-4">
                <a className="pixel-btn is-lg" href="https://wa.me/5549988920047" target="_blank" rel="noopener noreferrer"><MessageCircle size={15} /> Chamar no WhatsApp</a>
                <a className="btn-glass" href="tel:+5549988920047"><Phone size={16} /> (49) 98892-0047</a>
              </div>
              <p className="r font-pixel mt-10 text-[8px] uppercase tracking-[0.15em] text-muted">© 2026 ElevatePro Media · feito com pixels &amp; cuidado</p>
            </div>
          </section>

        </div>
      </main>

      {/* ── DOCKBAR ── */}
      <div className="dockbar" role="navigation" aria-label="Navegação de slides">
        <button className="nav-arrow" onClick={prev} disabled={index === 0} aria-label="Slide anterior"><ChevronLeft size={18} /></button>
        <div className="dock-label" aria-hidden>
          <span className="dock-index">{pad(index + 1)}</span>
          <span className="dock-name">{SLIDE_LABELS[index]}</span>
        </div>
        <span className="dock-sep dock-sep--label" aria-hidden />
        <div className="dots">
          {SLIDE_LABELS.map((label, i) => (
            <button
              key={label}
              className={`dot${i === index ? " is-active" : ""}`}
              data-label={label}
              title={label}
              aria-label={label}
              aria-current={i === index ? "true" : undefined}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <span className="dock-sep" aria-hidden />
        <span className="slide-count">{pad(index + 1)} / {pad(TOTAL)}</span>
        <button className="nav-arrow" onClick={next} disabled={index === TOTAL - 1} aria-label="Próximo slide"><ChevronRight size={18} /></button>
      </div>
    </div>
  );
}
