"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, Lock, Palette } from "lucide-react";
import type { CustomizacaoBlockData } from "@/types/budget-content";
import { cn } from "@/lib/utils";
import EditableField from "./EditableField";

gsap.registerPlugin(ScrollTrigger);

/*
 * "Feito para você" — palco único (janela de navegador no idioma retrô da
 * proposta) onde 4 identidades de site completamente diferentes se revelam
 * conforme o scroll, num efeito de cortina + scanline.
 *
 * Toda a animação de desktop vive numa ÚNICA timeline com scrub: o estado
 * visual é função pura da posição do scroll. Rolar para trás reverte a
 * transição com exatidão — impossível empilhar telas (bug da versão anterior,
 * que disparava tweens por evento e deixava tweens em voo se sobreporem).
 */

// ─── Identidades ──────────────────────────────────────────────────────────────

interface Identity {
  key: string;
  nome: string;
  tag: string;
  descricao: string;
  accent: string;
  palette: [string, string, string];
  url: string;
}

const IDENTITIES: Identity[] = [
  {
    key: "corporativo",
    nome: "Identidade corporativa",
    tag: "Sóbrio · Confiança",
    descricao:
      "Linhas retas, azul institucional e hierarquia clara. Para marcas que precisam transmitir autoridade desde o primeiro clique.",
    accent: "#1E40AF",
    palette: ["#1E40AF", "#0F1F4A", "#E8EDF5"],
    url: "vettor.com.br",
  },
  {
    key: "criativo",
    nome: "Estúdio criativo",
    tag: "Vibrante · Expressivo",
    descricao:
      "Formas orgânicas, gradientes e movimento. Para marcas que vivem de personalidade e não têm medo de mostrar.",
    accent: "#7C3AED",
    palette: ["#7C3AED", "#EC4899", "#F4EFFF"],
    url: "polvo.art.br",
  },
  {
    key: "luxo",
    nome: "Boutique de luxo",
    tag: "Premium · Exclusivo",
    descricao:
      "Fundo profundo, dourado em fios e muito respiro. Para quem se posiciona no topo e cobra por isso.",
    accent: "#D4AF37",
    palette: ["#D4AF37", "#101010", "#F5F0E0"],
    url: "maisondor.com.br",
  },
  {
    key: "minimal",
    nome: "Minimalismo contemporâneo",
    tag: "Limpo · Essencial",
    descricao:
      "Tipografia grande, espaço em branco e um único acento de cor. O essencial, executado com precisão.",
    accent: "#10B981",
    palette: ["#10B981", "#111827", "#FAFAFA"],
    url: "studio-um.co",
  },
];

const N = IDENTITIES.length;

// ─── Coreografia (tempos da timeline única) ───────────────────────────────────
// Transição i (1..N-1) começa no tempo `i` e dura TRANS_DUR. Entre elas há
// zonas de "descanso" onde a identidade fica parada na tela.

const TRANS_DUR = 0.6;
const TOTAL_TIME = N; // 0..4 (com folga de descanso no fim)
const SCROLL_VH_PER_STEP = 85; // quanto scroll cada identidade ocupa

// ─── Telas (uma composição de layout diferente por identidade) ────────────────

/** 1 · Corporativo — navy, cantos retos, grid rígido */
function ScreenCorporativo() {
  const blue = "#1E40AF";
  const ink = "#0F1F4A";
  return (
    <div className="flex h-full flex-col bg-white">
      {/* Navbar */}
      <div className="flex items-center justify-between px-4 py-2.5 sm:px-6" style={{ background: ink }}>
        <div className="flex items-center gap-2">
          <span className="h-4 w-4 bg-white" />
          <span className="text-[10px] font-bold tracking-[0.25em] text-white">VETTOR</span>
        </div>
        <div className="hidden items-center gap-3 sm:flex">
          {[24, 20, 28, 20].map((w, i) => (
            <span key={i} className="h-1.5 rounded-none bg-white/50" style={{ width: w }} />
          ))}
        </div>
        <span className="px-3 py-1.5 text-[9px] font-bold tracking-wider text-white" style={{ background: blue }}>
          CONTATO
        </span>
      </div>

      {/* Hero */}
      <div className="grid flex-1 grid-cols-[1.1fr_0.9fr] items-center gap-5 px-4 sm:px-6">
        <div className="space-y-3">
          <span className="block h-1.5 w-16" style={{ background: blue }} />
          <div className="space-y-1.5">
            <span className="block h-3.5 w-[92%]" style={{ background: ink }} />
            <span className="block h-3.5 w-[70%]" style={{ background: ink, opacity: 0.85 }} />
          </div>
          <div className="space-y-1">
            <span className="block h-1.5 w-full bg-slate-300" />
            <span className="block h-1.5 w-[78%] bg-slate-300" />
          </div>
          <div className="flex gap-2 pt-1">
            <span className="flex h-7 w-24 items-center justify-center" style={{ background: blue }}>
              <span className="h-1.5 w-12 bg-white/90" />
            </span>
            <span className="flex h-7 w-20 items-center justify-center border" style={{ borderColor: blue }}>
              <span className="h-1.5 w-10" style={{ background: blue, opacity: 0.7 }} />
            </span>
          </div>
        </div>
        <div className="border border-slate-200 bg-slate-50 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="h-1.5 w-14 bg-slate-400" />
            <span className="text-[9px] font-bold" style={{ color: blue }}>
              +32%
            </span>
          </div>
          <div className="flex h-16 items-end gap-1 sm:h-20">
            {[38, 55, 46, 70, 58, 84, 66, 92].map((h, i) => (
              <span
                key={i}
                className="flex-1"
                style={{ height: `${h}%`, background: i >= 6 ? blue : `${blue}30` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-2.5 px-4 pb-4 sm:px-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="border border-slate-200 bg-white p-2.5">
            <span className="mb-2 block h-5 w-5" style={{ background: `${blue}18`, border: `1px solid ${blue}` }} />
            <span className="block h-1.5 w-[70%]" style={{ background: ink, opacity: 0.85 }} />
            <span className="mt-1 block h-1.5 w-full bg-slate-200" />
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2 sm:px-6" style={{ background: ink }}>
        <span className="h-1.5 w-16 bg-white/40" />
        <div className="flex gap-2">
          {[0.6, 0.4, 0.25].map((op, i) => (
            <span key={i} className="h-1.5 w-8 bg-white" style={{ opacity: op }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/** 2 · Criativo — lavanda, blobs, tudo redondo e assimétrico */
function ScreenCriativo() {
  const violet = "#7C3AED";
  const pink = "#EC4899";
  return (
    <div className="relative flex h-full flex-col overflow-hidden" style={{ background: "#F4EFFF" }}>
      {/* Blobs de fundo */}
      <span
        className="pointer-events-none absolute -right-10 -top-12 h-44 w-44 rounded-full opacity-25"
        style={{ background: `radial-gradient(circle, ${pink}, transparent 70%)` }}
      />
      <span
        className="pointer-events-none absolute -bottom-14 -left-10 h-48 w-48 rounded-full opacity-25"
        style={{ background: `radial-gradient(circle, ${violet}, transparent 70%)` }}
      />

      {/* Nav flutuante */}
      <div className="relative z-10 mx-4 mt-3 flex items-center justify-between rounded-full bg-white px-4 py-2 shadow-[0_6px_20px_rgba(124,58,237,0.16)] sm:mx-6">
        <span className="text-[11px] font-black lowercase tracking-tight" style={{ color: violet }}>
          polvo*
        </span>
        <div className="hidden items-center gap-3 sm:flex">
          {[20, 26, 18].map((w, i) => (
            <span key={i} className="h-1.5 rounded-full" style={{ width: w, background: `${violet}45` }} />
          ))}
        </div>
        <span
          className="rounded-full px-3 py-1.5 text-[9px] font-bold text-white"
          style={{ background: `linear-gradient(90deg, ${violet}, ${pink})` }}
        >
          oi! →
        </span>
      </div>

      {/* Hero assimétrico */}
      <div className="relative z-10 grid flex-1 grid-cols-[1fr_0.8fr] items-center gap-4 px-4 sm:px-6">
        <div className="space-y-3">
          <span
            className="inline-block -rotate-2 rounded-full px-2.5 py-1 text-[8px] font-bold uppercase tracking-widest text-white"
            style={{ background: pink }}
          >
            portfólio ✦ 2025
          </span>
          <div className="space-y-1.5">
            <span className="block h-4 w-[95%] rounded-full" style={{ background: "#2E1065" }} />
            <span className="block h-4 w-[62%] rounded-full" style={{ background: `linear-gradient(90deg, ${violet}, ${pink})` }} />
          </div>
          <div className="space-y-1">
            <span className="block h-1.5 w-[90%] rounded-full" style={{ background: `${violet}35` }} />
            <span className="block h-1.5 w-[70%] rounded-full" style={{ background: `${violet}25` }} />
          </div>
          <span
            className="inline-flex h-8 w-28 items-center justify-center rounded-full shadow-[0_8px_20px_rgba(124,58,237,0.35)]"
            style={{ background: violet }}
          >
            <span className="h-1.5 w-14 rounded-full bg-white/90" />
          </span>
        </div>

        <div className="relative">
          <div
            className="rotate-3 overflow-hidden rounded-[24px] p-3 shadow-[0_14px_30px_rgba(236,72,153,0.28)]"
            style={{ background: `linear-gradient(140deg, ${violet}, ${pink})` }}
          >
            <div className="space-y-2 rounded-[16px] bg-white/20 p-3 backdrop-blur-sm">
              <span className="block h-10 rounded-[10px] bg-white/40 sm:h-14" />
              <div className="flex gap-1.5">
                <span className="h-5 flex-1 rounded-[8px] bg-white/30" />
                <span className="h-5 flex-1 rounded-[8px] bg-white/50" />
              </div>
            </div>
          </div>
          <span
            className="absolute -bottom-2 -left-3 flex h-9 w-9 -rotate-12 items-center justify-center rounded-full text-[13px] font-black text-white"
            style={{ background: "#2E1065" }}
          >
            ✦
          </span>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative z-10 flex items-center gap-3 overflow-hidden whitespace-nowrap py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white" style={{ background: violet }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="flex shrink-0 items-center gap-3 pl-3">
            branding <span style={{ color: pink }}>★</span> web <span style={{ color: pink }}>★</span> motion
            <span style={{ color: pink }}>★</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** 3 · Luxo — dark, dourado em hairlines, centrado e sereno */
function ScreenLuxo() {
  const gold = "#D4AF37";
  const cream = "#F5F0E0";
  return (
    <div className="flex h-full flex-col" style={{ background: "#101010" }}>
      {/* Nav */}
      <div
        className="flex items-center justify-between px-4 py-3 sm:px-6"
        style={{ borderBottom: `1px solid ${gold}30` }}
      >
        <span className="h-1 w-10" style={{ background: `${gold}50` }} />
        <span className="font-serif text-[12px] tracking-[0.45em]" style={{ color: gold }}>
          MAISON D&apos;OR
        </span>
        <span className="h-1 w-10" style={{ background: `${gold}50` }} />
      </div>

      {/* Hero centrado */}
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
        <span className="text-[8px] tracking-[0.5em]" style={{ color: gold }}>
          COLLECTION Nº4
        </span>
        <div className="w-full max-w-[280px] space-y-2">
          <span className="mx-auto block h-3 w-[85%]" style={{ background: cream, opacity: 0.92 }} />
          <span className="mx-auto block h-3 w-[55%]" style={{ background: cream, opacity: 0.75 }} />
        </div>
        <span className="block h-px w-14" style={{ background: gold }} />
        <span
          className="flex h-8 w-32 items-center justify-center"
          style={{ border: `1px solid ${gold}`, boxShadow: `0 0 24px ${gold}20` }}
        >
          <span className="text-[8px] tracking-[0.35em]" style={{ color: gold }}>
            DESCOBRIR
          </span>
        </span>
      </div>

      {/* Vitrine */}
      <div className="grid grid-cols-3 gap-3 px-4 pb-4 sm:px-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="p-2" style={{ border: `1px solid ${gold}25`, background: "#161616" }}>
            <div
              className="mb-2 h-12 sm:h-16"
              style={{ background: `linear-gradient(160deg, #1E1E1E, #262626)`, border: `1px solid ${gold}15` }}
            />
            <span className="mx-auto block h-1.5 w-[65%]" style={{ background: cream, opacity: 0.55 }} />
            <span className="mx-auto mt-1.5 block h-1 w-8" style={{ background: gold, opacity: 0.8 }} />
          </div>
        ))}
      </div>

      {/* Footer hairline */}
      <div
        className="flex items-center justify-center gap-3 py-2 text-[7px] tracking-[0.4em]"
        style={{ borderTop: `1px solid ${gold}20`, color: `${gold}80` }}
      >
        PARIS · SÃO PAULO · MILANO
      </div>
    </div>
  );
}

/** 4 · Minimal — branco, tipografia gigante, um acento verde */
function ScreenMinimal() {
  const green = "#10B981";
  const ink = "#111827";
  return (
    <div className="flex h-full flex-col px-5 py-4 sm:px-7" style={{ background: "#FAFAFA" }}>
      {/* Nav enxuta */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold tracking-tight" style={{ color: ink }}>
          studio—um<span style={{ color: green }}>.</span>
        </span>
        <div className="flex items-center gap-4">
          {[16, 22, 14].map((w, i) => (
            <span key={i} className="h-1 rounded-full" style={{ width: w, background: `${ink}30` }} />
          ))}
        </div>
      </div>

      {/* Headline gigante */}
      <div className="flex flex-1 flex-col justify-center gap-2.5">
        <span className="block h-5 w-[88%] rounded-sm sm:h-6" style={{ background: ink }} />
        <div className="flex items-center gap-2.5">
          <span className="block h-5 w-[38%] rounded-sm sm:h-6" style={{ background: ink }} />
          <span className="block h-5 w-14 rounded-sm sm:h-6" style={{ background: green }} />
          <span className="block h-5 w-[16%] rounded-sm sm:h-6" style={{ background: ink, opacity: 0.85 }} />
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: green }} />
          <span className="block h-1.5 w-44 rounded-full" style={{ background: `${ink}25` }} />
        </div>
      </div>

      {/* Divider + stats */}
      <div style={{ borderTop: `1px solid ${ink}12` }} className="grid grid-cols-3 gap-4 pt-3">
        {[
          ["128+", "projetos"],
          ["12", "anos"],
          ["98%", "retenção"],
        ].map(([num, label]) => (
          <div key={label}>
            <div className="text-base font-bold tracking-tight sm:text-lg" style={{ color: ink }}>
              {num}
            </div>
            <div className="mt-0.5 flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full" style={{ background: green }} />
              <span className="text-[8px] uppercase tracking-[0.2em]" style={{ color: `${ink}60` }}>
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const SCREENS = [ScreenCorporativo, ScreenCriativo, ScreenLuxo, ScreenMinimal];

// ─── Componente principal ─────────────────────────────────────────────────────

interface Props {
  data: CustomizacaoBlockData;
  isAdmin?: boolean;
  onChange?: (d: CustomizacaoBlockData) => void;
}

export default function CustomizacaoBlock({ data, isAdmin = false, onChange }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const stepRef = useRef(0);
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  );
  const [reduceMotion, setReduceMotion] = useState(false);

  // Modo estático (sem pin): mobile e prefers-reduced-motion.
  const staticMode = isMobile || reduceMotion;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Auto-avanço no modo estático (reinicia a contagem a cada troca manual)
  useEffect(() => {
    if (!staticMode || reduceMotion) return;
    const id = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % N);
    }, 4500);
    return () => clearInterval(id);
  }, [staticMode, reduceMotion, activeStep]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || staticMode) return;

      ScrollTrigger.getById("customizacao-pin")?.kill();

      const screens = Array.from(section.querySelectorAll<HTMLElement>("[data-cz-screen]"));
      const inners = Array.from(section.querySelectorAll<HTMLElement>("[data-cz-inner]"));
      const texts = Array.from(section.querySelectorAll<HTMLElement>("[data-cz-text]"));
      const urls = Array.from(section.querySelectorAll<HTMLElement>("[data-cz-url]"));
      const scans = Array.from(section.querySelectorAll<HTMLElement>("[data-cz-scan]"));

      // Estado inicial determinístico
      gsap.set(screens, { clipPath: "inset(0% 0% 0% 0%)" });
      gsap.set(screens.slice(1), { clipPath: "inset(0% 0% 100% 0%)" });
      gsap.set(texts, { autoAlpha: 1, y: 0 });
      gsap.set(texts.slice(1), { autoAlpha: 0, y: 18 });
      gsap.set(urls, { autoAlpha: 1, y: 0 });
      gsap.set(urls.slice(1), { autoAlpha: 0, y: 6 });
      gsap.set(scans, { autoAlpha: 0, top: "0%" });
      stepRef.current = 0;
      setActiveStep(0);

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          id: "customizacao-pin",
          trigger: section,
          pin: true,
          anticipatePin: 1,
          start: "top top",
          end: () => `+=${(window.innerHeight * SCROLL_VH_PER_STEP * N) / 100}`,
          // scrub síncrono: imune a refresh de outros blocos (um scrub numérico
          // usa tween de catch-up, que congela se um ScrollTrigger.refresh()
          // externo o matar no meio do caminho)
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const t = self.progress * TOTAL_TIME;
            let idx = 0;
            for (let i = 1; i < N; i++) if (t >= i + TRANS_DUR * 0.5) idx = i;
            if (idx !== stepRef.current) {
              stepRef.current = idx;
              setActiveStep(idx);
            }
            if (progressFillRef.current) {
              gsap.set(progressFillRef.current, { scaleX: self.progress });
            }
          },
        },
      });

      // Uma transição por identidade (a i-ésima tela "varre" por cima da anterior)
      for (let i = 1; i < N; i++) {
        const at = i;

        tl.fromTo(
          screens[i],
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: TRANS_DUR, ease: "power2.inOut" },
          at
        );
        // Conteúdo da tela que entra "assenta" com leve deriva vertical
        tl.fromTo(
          inners[i],
          { yPercent: 5 },
          { yPercent: 0, duration: TRANS_DUR, ease: "power2.inOut" },
          at
        );

        // Scanline acompanha a borda da cortina
        tl.fromTo(scans[i], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.05 }, at)
          .fromTo(
            scans[i],
            { top: "0%" },
            { top: "100%", duration: TRANS_DUR, ease: "power2.inOut" },
            at
          )
          .to(scans[i], { autoAlpha: 0, duration: 0.08 }, at + TRANS_DUR);

        // Texto do painel esquerdo
        tl.to(texts[i - 1], { autoAlpha: 0, y: -14, duration: 0.22, ease: "power2.in" }, at)
          .fromTo(
            texts[i],
            { autoAlpha: 0, y: 18 },
            { autoAlpha: 1, y: 0, duration: 0.32, ease: "power2.out" },
            at + 0.24
          );

        // URL da janela
        tl.to(urls[i - 1], { autoAlpha: 0, y: -6, duration: 0.18 }, at + 0.1)
          .fromTo(
            urls[i],
            { autoAlpha: 0, y: 6 },
            { autoAlpha: 1, y: 0, duration: 0.24 },
            at + 0.28
          );
      }

      // Folga de descanso no fim (última identidade fica parada antes de soltar
      // o pin). Alvo real: tween em objeto vazio não estende a duração da
      // timeline, o que desalinharia o mapeamento scroll → tempo.
      const holdProxy = { t: 0 };
      tl.to(holdProxy, { t: 1, duration: TOTAL_TIME - (N - 1 + TRANS_DUR) }, N - 1 + TRANS_DUR);

      scrollTriggerRef.current = tl.scrollTrigger ?? null;

      return () => {
        scrollTriggerRef.current = null;
      };
    },
    { scope: sectionRef, dependencies: [staticMode] }
  );

  /** Pula para a identidade i (scroll no desktop, troca direta no modo estático) */
  function jumpTo(i: number) {
    if (staticMode) {
      setActiveStep(i);
      return;
    }
    const st = scrollTriggerRef.current;
    if (!st) return;
    // Alvo: meio da zona de descanso da identidade i
    const t = i === 0 ? 0.5 : Math.min(i + TRANS_DUR + 0.2, TOTAL_TIME - 0.2);
    const top = st.start + (st.end - st.start) * (t / TOTAL_TIME);
    window.scrollTo({ top, behavior: "smooth" });
  }

  const active = IDENTITIES[activeStep];

  return (
    <section
      ref={sectionRef}
      id="customizacao"
      className="proposal-section relative overflow-hidden bg-white lg:flex lg:min-h-screen lg:items-center lg:py-10"
    >
      {/* Fundo neutro: off-white + grade pontilhada (mesmo idioma do bloco Incluso) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(180deg, #ffffff 0%, #f7f7f1 55%, #ffffff 100%)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: "radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse 75% 65% at 50% 45%, #000 25%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 50% 45%, #000 25%, transparent 80%)",
        }}
        aria-hidden
      />

      <div className="proposal-container relative z-10 w-full">
        {/* Header */}
        <header className="mb-8 text-center lg:mb-10">
          <span className="preco-pixel-badge">
            <Palette aria-hidden />
            Feito para você
          </span>
          <h2 className="mt-5 text-3xl font-bold leading-[1.1] text-black md:text-4xl lg:text-5xl">
            <EditableField
              value={data.titulo ?? "Seu site, sua identidade"}
              onChange={(v) => onChange?.({ ...data, titulo: v })}
              isAdmin={isAdmin}
              className="block"
            />
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-neutral-500 md:text-lg">
            <EditableField
              value={
                data.subtitulo ??
                "Fazemos cada projeto do zero. Mesma base sólida — estética, tom e identidade únicos para cada marca."
              }
              onChange={(v) => onChange?.({ ...data, subtitulo: v })}
              isAdmin={isAdmin}
              tag="span"
              className="inline"
            />
          </p>
        </header>

        {/* key remonta o palco ao trocar de modo (scroll ↔ estático), descartando
            estilos inline que o GSAP tenha deixado nos elementos */}
        <div
          key={staticMode ? "static" : "scroll"}
          className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)] lg:gap-12"
        >
          {/* ── Painel esquerdo: índice de identidades + texto ── */}
          <div className="order-2 lg:order-1">
            {/* Índice (desktop) / chips (mobile) */}
            <div className="mb-6 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-2.5 lg:overflow-visible lg:pb-0">
              {IDENTITIES.map((idn, i) => {
                const isActive = i === activeStep;
                return (
                  <button
                    key={idn.key}
                    type="button"
                    onClick={() => jumpTo(i)}
                    aria-pressed={isActive}
                    className={cn(
                      "flex shrink-0 items-center gap-3 rounded-sm border-2 px-3 py-2 text-left transition-all duration-300 lg:w-full lg:px-4 lg:py-2.5",
                      isActive
                        ? "border-black bg-white shadow-[4px_4px_0_#000]"
                        : "border-transparent bg-transparent opacity-45 hover:opacity-80"
                    )}
                  >
                    <span
                      className="font-mono text-[11px] font-bold tabular-nums"
                      style={{ color: isActive ? idn.accent : "#9CA3AF" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="truncate text-[13px] font-bold text-black lg:text-sm">{idn.nome}</span>
                      <span className="hidden font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-400 lg:block">
                        {idn.tag}
                      </span>
                    </span>
                    {/* Paleta da identidade */}
                    <span className="ml-auto hidden shrink-0 gap-1 lg:flex">
                      {idn.palette.map((c) => (
                        <span
                          key={c}
                          className="h-3 w-3 rounded-full border border-black/20 transition-transform duration-300"
                          style={{ background: c, transform: isActive ? "scale(1)" : "scale(0.75)" }}
                        />
                      ))}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Texto morfando (empilhado em grid; GSAP anima no desktop, estado no mobile) */}
            <div className="grid">
              {IDENTITIES.map((idn, i) => (
                <div
                  key={idn.key}
                  data-cz-text
                  className="col-start-1 row-start-1"
                  style={
                    staticMode
                      ? {
                          opacity: i === activeStep ? 1 : 0,
                          visibility: i === activeStep ? "visible" : "hidden",
                          transform: i === activeStep ? "translateY(0)" : "translateY(12px)",
                          transition: "opacity 0.45s ease, transform 0.45s ease, visibility 0.45s",
                        }
                      : { opacity: i === 0 ? 1 : 0, visibility: i === 0 ? "visible" : "hidden" }
                  }
                >
                  <div
                    className="font-mono text-[10px] font-bold uppercase tracking-[0.22em]"
                    style={{ color: idn.accent }}
                  >
                    {idn.tag}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-500 md:text-base">{idn.descricao}</p>
                </div>
              ))}
            </div>

            {/* Progresso + dica */}
            <div className="mt-6 space-y-3">
              <div className="hidden h-[3px] overflow-hidden rounded-full bg-black/10 lg:block">
                <div
                  ref={progressFillRef}
                  className="h-full origin-left rounded-full bg-black"
                  style={{ transform: "scaleX(0)" }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] tabular-nums text-neutral-400">
                  {String(activeStep + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
                </span>
                {staticMode ? (
                  <span className="text-[11px] text-neutral-400">Toque para explorar os estilos</span>
                ) : (
                  <span className="flex select-none items-center gap-1.5 text-[11px] text-neutral-400">
                    <ArrowDown size={13} className="animate-bounce" aria-hidden />
                    Role para explorar os estilos
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ── Palco: janela de navegador retrô ── */}
          <div className="order-1 lg:order-2">
            <div
              className="overflow-hidden rounded-sm border-2 border-black bg-white"
              style={{ boxShadow: "10px 10px 0 #0f172a" }}
            >
              {/* Chrome bar (idioma retrô da proposta) */}
              <div
                className="flex items-center gap-2 border-b-2 border-black px-3 py-2"
                style={{ background: "#bdfa3c" }}
              >
                <span className="flex shrink-0 gap-1">
                  <span className="h-3 w-3 rounded-full border border-black/40 bg-white/80" />
                  <span className="h-3 w-3 rounded-full border border-black/40 bg-white/80" />
                  <span className="h-3 w-3 rounded-full border border-black/40 bg-white/80" />
                </span>
                <span className="ml-1 flex flex-1 items-center gap-1.5 rounded-full border border-black/30 bg-white/85 px-2.5 py-1 font-mono text-[11px] text-neutral-700">
                  <Lock size={11} className="shrink-0" aria-hidden />
                  <span className="grid min-w-0 flex-1">
                    {IDENTITIES.map((idn, i) => (
                      <span
                        key={idn.key}
                        data-cz-url
                        className="col-start-1 row-start-1 truncate"
                        style={
                          staticMode
                            ? {
                                opacity: i === activeStep ? 1 : 0,
                                visibility: i === activeStep ? "visible" : "hidden",
                                transition: "opacity 0.4s ease, visibility 0.4s",
                              }
                            : { opacity: i === 0 ? 1 : 0, visibility: i === 0 ? "visible" : "hidden" }
                        }
                      >
                        {idn.url}
                      </span>
                    ))}
                  </span>
                </span>
              </div>

              {/* Viewport: telas empilhadas + scanlines */}
              <div className="relative h-[340px] overflow-hidden sm:h-[420px] lg:h-[min(52vh,520px)]">
                {IDENTITIES.map((idn, i) => {
                  const Screen = SCREENS[i];
                  const isActive = i === activeStep;
                  return (
                    <div
                      key={idn.key}
                      data-cz-screen
                      className="absolute inset-0"
                      style={
                        staticMode
                          ? {
                              opacity: isActive ? 1 : 0,
                              zIndex: isActive ? 2 : 1,
                              transition: "opacity 0.55s ease",
                            }
                          : i === 0
                            ? undefined
                            : { clipPath: "inset(0% 0% 100% 0%)" }
                      }
                    >
                      <div data-cz-inner className="h-full">
                        <Screen />
                      </div>
                    </div>
                  );
                })}

                {/* Scanlines das transições (uma por identidade; a 0 nunca é usada) */}
                {!staticMode &&
                  IDENTITIES.map((idn) => (
                    <div
                      key={idn.key}
                      data-cz-scan
                      aria-hidden
                      className="pointer-events-none absolute left-0 right-0 z-10 h-[3px]"
                      style={{
                        top: "0%",
                        opacity: 0,
                        visibility: "hidden",
                        background: idn.accent,
                        boxShadow: `0 0 18px 2px ${idn.accent}90`,
                      }}
                    />
                  ))}
              </div>
            </div>

            {/* Legenda do palco */}
            <div className="mt-4 flex items-center justify-between px-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                Mesma base · outra identidade
              </span>
              <span className="flex items-center gap-1.5">
                {IDENTITIES.map((idn, i) => (
                  <button
                    key={idn.key}
                    type="button"
                    onClick={() => jumpTo(i)}
                    aria-label={`Ver ${idn.nome}`}
                    className="rounded-full"
                    style={{
                      width: i === activeStep ? 22 : 6,
                      height: 6,
                      background: i === activeStep ? active.accent : "rgba(0,0,0,0.15)",
                      transition: "all 0.4s ease",
                    }}
                  />
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
