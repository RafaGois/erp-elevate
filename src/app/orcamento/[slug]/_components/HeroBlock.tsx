"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import type { BudgetBlock, HeroBlockData } from "@/lib/types/budget-content";
import EditableField from "./EditableField";
import ProposalNav from "./ProposalNav";

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
const TRACK_VH = 260;

/** Tema claro — fundo branco inspirado na landing */
const DOOR_BG = "#FAFAF9";

export default function HeroBlock({ data, blocks, isAdmin = false, onChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  /* Fase 1 — portas */
  const leftX = useTransform(scrollYProgress, [0, 0.28], ["0%", "-100%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.28], ["0%", "100%"]);

  /* Título central da porta */
  const titleOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.12], [0, -28]);

  /* Fase 3 — retira toda a camada fixa (hero + restos) para não bloquear o restante */
  const stageOpacity = useTransform(scrollYProgress, [0.82, 0.98], [1, 0]);

  const [stagePassthrough, setStagePassthrough] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setStagePassthrough(v >= 0.97);
  });

  function set<K extends keyof HeroBlockData>(key: K, value: HeroBlockData[K]) {
    onChange?.({ ...data, [key]: value });
  }

  const title = data.titulo ?? "Site Institucional Casa França";
  const cliente = data.cliente ?? "Nome do Cliente";
  const badge = data.badge ?? "Proposta Comercial";

  return (
    <>
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
        className={`fixed inset-0 z-[45] flex h-[100dvh] w-full flex-col border-b border-black/5 bg-white ${
          stagePassthrough ? "pointer-events-none" : "pointer-events-auto"
        }`}
      >
        {/* Hero editorial — sempre preenche o palco; sem translateY por scroll */}
        <div className="relative z-0 flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="relative z-10 mx-auto flex h-full min-h-0 w-full max-w-[clamp(100rem,98vw,160rem)] flex-col justify-between px-[clamp(1.5rem,4vw,6rem)] py-[clamp(3rem,8vh,6rem)]">
            {/* Navegação — links para seções da proposta */}
            <ProposalNav blocks={blocks} />

            {/* 1. Abertura — contexto em uma linha */}
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <EditableField
                value={badge}
                onChange={(v) => set("badge", v)}
                isAdmin={isAdmin}
                className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#7D6B58]"
              />
              <span className="text-black/20" aria-hidden>
                ·
              </span>
              <span className="font-sans text-[0.875rem] text-[#7D6B58]">
                Proposta para{" "}
                <EditableField
                  value={cliente}
                  onChange={(v) => set("cliente", v)}
                  isAdmin={isAdmin}
                  className="font-medium text-[#0A0A0A]"
                />
              </span>
              {(data.projeto ?? data.data ?? isAdmin) && (
                <>
                  <span className="text-black/20" aria-hidden>
                    ·
                  </span>
                  <span className="font-sans text-[0.75rem] text-[#7D6B58]/80">
                    <EditableField
                      value={data.projeto ?? ""}
                      onChange={(v) => set("projeto", v)}
                      isAdmin={isAdmin}
                      className="inline"
                      placeholder="Projeto"
                    />
                    <span className="mx-1 text-black/20" aria-hidden>
                      ·
                    </span>
                    <EditableField
                      value={data.data ?? new Date().toLocaleDateString("pt-BR")}
                      onChange={(v) => set("data", v)}
                      isAdmin={isAdmin}
                      className="inline"
                      placeholder="Data"
                    />
                  </span>
                </>
              )}
            </div>

            {/* 2. Título — o que estamos propondo */}
            <div className="flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]">
              <h1
                className="max-w-[58rem] font-serif font-normal leading-[0.92] tracking-tight text-[#0A0A0A]"
                style={{
                  fontSize: "clamp(2.5rem,6vw,6rem)",
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
              >
                <EditableField
                  value={title}
                  onChange={(v) => set("titulo", v)}
                  isAdmin={isAdmin}
                  multiline
                  className="block"
                  placeholder="O que estamos propondo"
                />
              </h1>

              <EditableField
                value={
                  data.subtitulo ??
                  "Uma presença digital que reflete a excelência da sua marca."
                }
                onChange={(v) => set("subtitulo", v)}
                isAdmin={isAdmin}
                multiline
                tag="p"
                className="max-w-[52rem] font-sans text-[clamp(1rem,1.25vw,1.25rem)] font-light leading-[1.6] text-[#7D6B58]"
                placeholder="Benefício principal em uma frase"
              />
            </div>

            {/* 3. Números — o que o cliente precisa saber para decidir */}
            <div className="flex flex-col gap-[clamp(1.5rem,3vw,2rem)]">
              <div className="h-px w-12 bg-[#D9381E]" />
              <div className="flex flex-wrap gap-x-8 gap-y-4 md:gap-x-12">
                {(
                  [
                    {
                      label: "Investimento",
                      key: "investimento",
                      fallback: "Sob consulta",
                      emphasis: true,
                    },
                    { label: "Prazo", key: "prazo", fallback: "A definir", emphasis: false },
                    {
                      label: "Entregas",
                      key: "entregas",
                      fallback: "Ver proposta",
                      emphasis: false,
                    },
                  ] as const
                ).map(({ label, key, fallback, emphasis }) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <span className="font-mono text-[0.55rem] uppercase tracking-[0.15em] text-[#7D6B58]/70">
                      {label}
                    </span>
                    <EditableField
                      value={data[key] ?? fallback}
                      onChange={(v) => set(key, v)}
                      isAdmin={isAdmin}
                      className={`font-sans font-medium text-[#0A0A0A] ${
                        emphasis ? "text-[clamp(1.25rem,2vw,1.75rem)]" : "text-[1rem]"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* 4. CTA visual */}
            <div className="flex items-center gap-3 text-[#7D6B58]/60">
              <div className="h-px w-8 bg-current" />
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em]">
                Role para ver o escopo completo
              </span>
            </div>
          </div>
        </div>

        {/* Porta — tema claro inspirado na landing (Hero, ScrollText) */}
        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
          <motion.div
            style={{ x: leftX, backgroundColor: DOOR_BG }}
            className="absolute inset-y-0 left-0 w-1/2 will-change-transform [box-shadow:4px_0_40px_-8px_rgba(0,0,0,0.08)]"
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: "radial-gradient(circle, #0a0a0a 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            {/* Card flutuante — estilo ScrollText invertido */}
            <div
              className="door-float-card absolute top-[12%] left-[8%] w-20 h-20 md:w-28 md:h-28 rounded-xl border border-black/10 bg-black/[0.02] flex items-center justify-center"
              aria-hidden
            >
              <svg
                viewBox="0 0 64 64"
                className="w-10 h-10 md:w-14 md:h-14 text-black/20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M20 16v32M44 16v32M20 24h28M20 40h28" />
              </svg>
            </div>
            <div
              className="door-float-card absolute bottom-[18%] left-[10%] w-16 h-16 md:w-24 md:h-24 rounded-xl border border-black/10 bg-black/[0.02] flex items-center justify-center font-mono text-[8px] md:text-[10px] text-black/25"
              style={{ animationDelay: "1.5s" }}
              aria-hidden
            >
              &lt;/&gt;
            </div>
          </motion.div>

          <motion.div
            style={{ x: rightX, backgroundColor: DOOR_BG }}
            className="absolute inset-y-0 right-0 w-1/2 will-change-transform [box-shadow:-4px_0_40px_-8px_rgba(0,0,0,0.08)]"
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: "radial-gradient(circle, #0a0a0a 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div
              className="door-float-card absolute top-[20%] right-[10%] w-20 h-16 md:w-28 md:h-20 rounded-xl border border-black/10 bg-black/[0.02] p-2 font-mono text-[9px] md:text-[10px] text-black/30"
              style={{ animationDelay: "2s" }}
              aria-hidden
            >
              <span className="text-black/20">&gt;</span> proposta
            </div>
            <div
              className="door-float-card absolute bottom-[12%] right-[8%] w-24 h-24 md:w-32 md:h-32 rounded-xl border border-black/10 bg-black/[0.02] flex items-center justify-center"
              style={{ animationDelay: "0.5s" }}
              aria-hidden
            >
              <svg
                viewBox="0 0 64 64"
                className="w-12 h-12 md:w-16 md:h-16 text-black/15"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              >
                <circle cx="32" cy="32" r="20" opacity="0.4" />
                <circle cx="32" cy="32" r="12" opacity="0.6" />
              </svg>
            </div>
          </motion.div>

          {/* Tipografia central — Hero.tsx: small tracking-widest + bold title */}
          <motion.div
            style={{ opacity: titleOpacity, y: titleY }}
            className="absolute inset-0 flex flex-col items-center justify-center px-[clamp(1.25rem,5vw,4rem)] select-none"
          >
            <small className="text-[#7D6B58] tracking-[0.2em] text-[clamp(0.65rem,1.2vw,0.8rem)] uppercase font-medium mb-[clamp(0.75rem,2vw,1.25rem)]">
              Proposta Comercial
            </small>

            <h1
              className="max-w-[min(100%,56rem)] text-center font-sans font-bold uppercase leading-[0.92] tracking-tight text-[#0A0A0A]"
              style={{
                fontSize: "clamp(2.25rem,9vw,6rem)",
              }}
            >
              {title.trim().endsWith(".") ? title.trim() : `${title.trim()}.`}
            </h1>

            <p
              className="mt-[clamp(0.75rem,2vw,1.25rem)] max-w-[min(100%,28rem)] text-center font-sans font-light text-[#7D6B58] tracking-wide"
              style={{ fontSize: "clamp(0.8rem,1.6vw,1rem)" }}
            >
              Para {cliente}
            </p>

            <div className="absolute bottom-[clamp(2rem,4vw,3.5rem)] flex flex-col items-center gap-[1rem]">
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-[#7D6B58]/70">
                Role para abrir
              </span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="h-[2.5rem] w-[1px] bg-gradient-to-b from-black/25 to-transparent"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
