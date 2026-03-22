"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { BudgetBlock, HeroBlockData } from "@/lib/types/budget-content";
import EditableField from "./EditableField";
import ProposalIntro from "./ProposalIntro";

interface Props {
  data: HeroBlockData;
  blocks: BudgetBlock[];
  isAdmin?: boolean;
  onChange?: (d: HeroBlockData) => void;
}

/**
 * Scroll em uma única “trilha”: só este bloco consome altura no documento.
 * Hero + porta ficam `fixed` no viewport o tempo todo — não há sticky soltando
 * nem parallax competindo com o scroll da página.
 *
 * Fases do progresso (0 → 1 ao longo de ~260vh):
 * 1) Porta abre + título central some
 * 2) Platô: hero editorial 100% visível (scroll só avança o progresso, visual estável)
 * 3) Camada fixa some → próxima seção aparece por baixo
 */
const TRACK_VH = 80;

const PARALLAX_INTENSITY = 2.5;
const SCROLL_PARALLAX_MAX = 6;

function EmojiParallax({
  emoji,
  pos,
  delay,
  depth,
  index,
  mouseX,
  mouseY,
  scrollProgress,
}: {
  emoji: string;
  pos: React.CSSProperties;
  delay: number;
  depth: number;
  index: number;
  mouseX: ReturnType<typeof useMotionValue>;
  mouseY: ReturnType<typeof useMotionValue>;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const x = useTransform(mouseX, (v) => v * PARALLAX_INTENSITY * depth);
  const y = useTransform(
    [mouseY, scrollProgress],
    ([my, s]) => (my ?? 0) * PARALLAX_INTENSITY * depth - ((s ?? 0) * SCROLL_PARALLAX_MAX * depth)
  );
  return (
    <motion.span
      className="absolute text-2xl md:text-3xl select-none pointer-events-none opacity-70 inline-block"
      style={{ ...pos, x, y }}
    >
      <motion.span
        className="block"
        animate={{ y: [0, -12, 0], rotate: [0, 5, -5, 0] }}
        transition={{
          repeat: Infinity,
          duration: 6 + index * 0.8,
          ease: "easeInOut",
          delay,
        }}
      >
        {emoji}
      </motion.span>
    </motion.span>
  );
}

export default function HeroBlock({
  data,
  blocks,
  isAdmin = false,
  onChange,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [introDone, setIntroDone] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  /* Fade da camada fixa — começa cedo para revelar as seções com pouco scroll */
  const stageOpacity = useTransform(scrollYProgress, [0.35, 0.7], [1, 0]);

  const [stagePassthrough, setStagePassthrough] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setStagePassthrough(v >= 0.68);
  });

  function set<K extends keyof HeroBlockData>(key: K, value: HeroBlockData[K]) {
    onChange?.({ ...data, [key]: value });
  }

  return (
    <>
      {/* Intro full-screen — aparece ao carregar, some após animação */}
      {!introDone && <ProposalIntro onComplete={() => setIntroDone(true)} />}

      {/*
        Único elemento no fluxo: gera TODO o scroll desta experiência.
        A próxima seção só entra depois que o usuário percorre esta altura.
      */}
      <div
        ref={containerRef}
        className="relative w-full shrink-0"
        style={{ height: `${TRACK_VH}vh` }}
      />

      {/* Palco fixo: ocupa só a viewport; não rola com o documento */}
      <motion.div
        style={{ opacity: stageOpacity }}
        className={`fixed inset-0 z-45 h-dvh w-full overflow-hidden border-b border-black/5 bg-white ${
          stagePassthrough ? "pointer-events-none" : "pointer-events-auto"
        }`}
      >
        {/* SVG — curvas calmas e definidas, borda-a-borda, estilo topográfico */}
        <svg
          className="absolute inset-0 z-[5] h-full w-full pointer-events-none"
          viewBox="0 0 1440 900"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <style>{`
              @keyframes streakFlow { 0% { stroke-dashoffset: 600; } 100% { stroke-dashoffset: -600; } }
              .streak { stroke-linecap: round; }
            `}</style>
          </defs>

          {/* Linhas animadas apenas no superior direito e inferior esquerdo */}
          {/* ── Canto superior direito ── */}
          <path d="M200,0 Q1320,80 1440,180" stroke="#22c55e" strokeWidth="6" fill="none" opacity="0.38" strokeDasharray="100 200" style={{ animation: "streakFlow 28s linear infinite 14s" }} className="streak" />
          <path d="M160,0 Q1300,100 1440,220" stroke="#22c55e" strokeWidth="5.5" fill="none" opacity="0.35" strokeDasharray="90 210" style={{ animation: "streakFlow 32s linear infinite 17s" }} className="streak" />

          {/* ── Canto inferior esquerdo ── */}
          <path d="M240,900 Q120,780 0,620" stroke="#bdfa3c" strokeWidth="6" fill="none" opacity="0.38" strokeDasharray="100 200" style={{ animation: "streakFlow 28s linear infinite 15s" }} className="streak" />
          <path d="M200,900 Q100,820 0,720" stroke="#bdfa3c" strokeWidth="5.5" fill="none" opacity="0.35" strokeDasharray="90 210" style={{ animation: "streakFlow 32s linear infinite 18s" }} className="streak" />
        </svg>

        {/* Efeitos visuais decorativos — gradiente e blur */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Base: gradiente suave do centro para as bordas */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255,255,255,0) 0%, rgba(255,255,255,0.95) 100%), radial-gradient(ellipse 120% 80% at 20% 20%, rgba(189,250,60,0.08) 0%, transparent 50%), radial-gradient(ellipse 100% 60% at 80% 80%, rgba(34,197,94,0.06) 0%, transparent 50%)",
            }}
          />

          {/* Orbs com blur — verde elevate */}
          <div
            className="absolute left-0 top-1/3 h-[min(60vw,500px)] w-[min(60vw,500px)] -translate-y-1/2 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(189,250,60,0.4) 0%, rgba(189,250,60,0.1) 40%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
          <div
            className="absolute right-0 bottom-1/4 h-[min(50vw,400px)] w-[min(50vw,400px)] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(34,197,94,0.35) 0%, rgba(34,197,94,0.08) 40%, transparent 70%)",
              filter: "blur(70px)",
            }}
          />

          {/* Orb verde escuro/esmeralda */}
          <div
            className="absolute right-1/4 top-1/4 h-[min(40vw,320px)] w-[min(40vw,320px)] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(22,163,74,0.3) 0%, rgba(34,197,94,0.08) 45%, transparent 70%)",
              filter: "blur(65px)",
            }}
          />
          <div
            className="absolute left-1/3 bottom-0 h-[min(45vw,360px)] w-[min(45vw,360px)] -translate-x-1/2 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(5,150,105,0.25) 0%, transparent 60%)",
              filter: "blur(55px)",
            }}
          />

          {/* Vignette sutil nas bordas */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.03) 100%)",
            }}
          />
        </div>

        {/* Título — exatamente no meio da viewport */}
        <div
          className="absolute left-1/2 top-1/2 z-10 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 px-[clamp(1.5rem,4vw,6rem)]"
        >
          <div className="relative flex flex-col items-center text-center">
              {/* Emojis verdes flutuantes — parallax sutil com mouse e scroll */}
              {[
                { emoji: "🟢", top: "-10%", left: "-8%", delay: 0, depth: 0.8 },
                { emoji: "✅", top: "5%", right: "-12%", delay: 0.3, depth: 1.2 },
                { emoji: "🌿", top: "-5%", right: "-5%", delay: 0.5, depth: 1 },
                { emoji: "💚", bottom: "10%", left: "-15%", delay: 0.2, depth: 1.1 },
                { emoji: "🟢", bottom: "-8%", right: "-10%", delay: 0.4, depth: 0.9 },
                { emoji: "🌱", bottom: "5%", right: "-18%", delay: 0.6, depth: 1.3 },
              ].map(({ emoji, delay, depth, ...pos }, i) => (
                <EmojiParallax
                  key={i}
                  emoji={emoji}
                  pos={pos as React.CSSProperties}
                  delay={delay}
                  depth={depth}
                  index={i}
                  mouseX={mouseX}
                  mouseY={mouseY}
                  scrollProgress={scrollYProgress}
                />
              ))}
              <span className="relative z-10 mb-3 font-mono text-[0.55rem] uppercase tracking-[0.3em] text-black/40">
                elevate sistemas
              </span>
              <h1 className="relative z-10 text-[clamp(2rem,10vw,5rem)] font-bold leading-[0.9] tracking-tight text-[#0A0A0A]">
                <EditableField
                  value={data.titulo}
                  onChange={(v) => set("titulo", v)}
                  isAdmin={isAdmin}
                  multiline
                  className="block"
                  placeholder="O que estamos propondo"
                />
              </h1>
            </div>
        </div>

        {/* CTA — fixo na parte inferior */}
        <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center">
            <motion.div
              className="flex flex-col items-center gap-2 text-[#7D6B58]/60"
              animate={{ y: [0, 6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
            >
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em]">
                Role para ver o escopo completo
              </span>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5], y: [0, 4, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
              >
                <ChevronDown className="h-5 w-5" strokeWidth={2} />
              </motion.div>
            </motion.div>
        </div>
      </motion.div>
    </>
  );
}
