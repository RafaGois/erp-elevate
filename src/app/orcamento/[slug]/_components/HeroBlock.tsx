"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import type { HeroBlockData } from "@/lib/types/budget-content";
import EditableField from "./EditableField";

interface Props {
  data: HeroBlockData;
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

/** Verde do overlay do menu mobile — `Menu.tsx` (`bg-[#bdfa3c]`) */
const DOOR_GREEN = "#bdfa3c";

export default function HeroBlock({ data, isAdmin = false, onChange }: Props) {
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
        className={`fixed inset-0 z-[45] flex h-[100dvh] w-full flex-col border-b border-[#DCD8D0] bg-[#FDFBF7] ${
          stagePassthrough ? "pointer-events-none" : "pointer-events-auto"
        }`}
      >
        {/* Hero editorial — sempre preenche o palco; sem translateY por scroll */}
        <div className="relative z-0 flex min-h-0 flex-1 flex-col overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 grid grid-cols-12 opacity-[0.06]"
          >
            {Array.from({ length: 11 }).map((_, i) => (
              <div key={i} className="border-r border-[#0A0A0A]" />
            ))}
          </div>

          <div className="relative z-10 mx-auto grid h-full min-h-0 max-w-[clamp(90rem,95vw,140rem)] grid-cols-1 px-[clamp(1.5rem,4vw,5rem)] md:grid-cols-12">
            <div className="flex min-h-0 flex-col justify-between gap-[3rem] border-[#DCD8D0] py-[clamp(4rem,10vh,8rem)] md:col-span-4 md:border-r md:pr-[clamp(1.5rem,3vw,4rem)]">
              <div className="flex flex-col gap-[2rem]">
                <div className="inline-flex items-center gap-[0.75rem]">
                  <span className="h-[0.4rem] w-[0.4rem] flex-shrink-0 rounded-full bg-[#D9381E]" />
                  <EditableField
                    value={badge}
                    onChange={(v) => set("badge", v)}
                    isAdmin={isAdmin}
                    className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#555555]"
                  />
                </div>

                <div>
                  <span className="mb-[0.5rem] block font-mono text-[0.55rem] uppercase tracking-[0.15em] text-[#555555]/60">
                    Preparado para
                  </span>
                  <EditableField
                    value={cliente}
                    onChange={(v) => set("cliente", v)}
                    isAdmin={isAdmin}
                    className="font-sans text-[clamp(1.25rem,1.5vw,1.75rem)] font-medium leading-tight text-[#0A0A0A]"
                  />
                </div>

                <div className="flex flex-col gap-[0.75rem] border-t border-[#DCD8D0] pt-[1.5rem]">
                  <div>
                    <span className="mb-[0.25rem] block font-mono text-[0.55rem] uppercase tracking-[0.15em] text-[#555555]/60">
                      Projeto
                    </span>
                    <EditableField
                      value={data.projeto ?? "Nome do Projeto"}
                      onChange={(v) => set("projeto", v)}
                      isAdmin={isAdmin}
                      className="font-sans text-[0.875rem] text-[#555555]"
                    />
                  </div>
                  <div>
                    <span className="mb-[0.25rem] block font-mono text-[0.55rem] uppercase tracking-[0.15em] text-[#555555]/60">
                      Data
                    </span>
                    <EditableField
                      value={data.data ?? new Date().toLocaleDateString("pt-BR")}
                      onChange={(v) => set("data", v)}
                      isAdmin={isAdmin}
                      className="font-mono text-[0.75rem] text-[#555555]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-[0.75rem] text-[#555555]/50">
                <div className="h-[1px] w-[2rem] bg-current" />
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.15em]">
                  Role para continuar a proposta
                </span>
              </div>
            </div>

            <div className="flex min-h-0 flex-col justify-between py-[clamp(4rem,10vh,8rem)] pl-0 md:col-span-8 md:pl-[clamp(1.5rem,4vw,5rem)]">
              <div className="flex flex-col gap-[clamp(2rem,5vw,4rem)]">
                <h1
                  className="font-serif font-normal leading-[0.9] tracking-tighter text-[#0A0A0A]"
                  style={{
                    fontSize: "clamp(3.5rem,8vw,9rem)",
                    fontFamily: "'Playfair Display', Georgia, serif",
                  }}
                >
                  <EditableField
                    value={title}
                    onChange={(v) => set("titulo", v)}
                    isAdmin={isAdmin}
                    multiline
                    className="block"
                    placeholder="Título principal"
                  />
                </h1>

                <div className="flex max-w-[38rem] items-start gap-[1.5rem]">
                  <div className="mt-[0.65rem] h-[1px] w-[2rem] flex-shrink-0 bg-[#D9381E]" />
                  <EditableField
                    value={
                      data.subtitulo ??
                      "Desenvolvida com cuidado e visão estratégica para transformar sua marca."
                    }
                    onChange={(v) => set("subtitulo", v)}
                    isAdmin={isAdmin}
                    multiline
                    className="font-sans text-[clamp(0.9rem,1.2vw,1.1rem)] leading-[1.7] text-[#555555]"
                    placeholder="Subtítulo / descrição breve"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-[2rem] border-t border-[#DCD8D0] pt-[clamp(2rem,4vw,3rem)]">
                {(
                  [
                    { label: "Investimento", key: "investimento", fallback: "Sob consulta" },
                    { label: "Prazo", key: "prazo", fallback: "A definir" },
                    { label: "Entregas", key: "entregas", fallback: "Ver proposta" },
                  ] as const
                ).map(({ label, key, fallback }) => (
                  <div key={label} className="flex flex-col gap-[0.5rem]">
                    <span className="font-mono text-[0.55rem] uppercase tracking-[0.15em] text-[#555555]/60">
                      {label}
                    </span>
                    <EditableField
                      value={data[key] ?? fallback}
                      onChange={(v) => set(key, v)}
                      isAdmin={isAdmin}
                      className="font-sans text-[0.9rem] font-medium text-[#0A0A0A]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Porta por cima do hero — referência minimalista (fundo sólido + tipografia central) */}
        <div className="pointer-events-none absolute inset-0 z-10">
          <motion.div
            style={{ x: leftX, backgroundColor: DOOR_GREEN }}
            className="absolute inset-y-0 left-0 w-1/2 shadow-[4px_0_32px_rgba(0,0,0,0.12)] will-change-transform"
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: "radial-gradient(circle, #0a0a0a 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
          </motion.div>

          <motion.div
            style={{ x: rightX, backgroundColor: DOOR_GREEN }}
            className="absolute inset-y-0 right-0 w-1/2 shadow-[-4px_0_32px_rgba(0,0,0,0.12)] will-change-transform"
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: "radial-gradient(circle, #0a0a0a 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
          </motion.div>

          {/* Título grande branco (sans) + cliente fino em preto abaixo — como o print */}
          <motion.div
            style={{ opacity: titleOpacity, y: titleY }}
            className="absolute inset-0 flex flex-col items-center justify-center px-[clamp(1.25rem,5vw,4rem)] select-none"
          >
            <h1
              className="max-w-[min(100%,56rem)] text-center font-sans font-bold uppercase leading-[0.95] tracking-[-0.02em] text-white"
              style={{
                fontSize: "clamp(2.25rem,10vw,6.5rem)",
              }}
            >
              {title.trim().endsWith(".") ? title.trim() : `${title.trim()}.`}
            </h1>

            <p
              className="mt-[clamp(0.75rem,2vw,1.25rem)] max-w-[min(100%,28rem)] text-center font-sans font-light text-[#0A0A0A]"
              style={{ fontSize: "clamp(0.8rem,1.8vw,1.05rem)" }}
            >
              {cliente}
            </p>

            <div className="absolute bottom-[clamp(2rem,4vw,3.5rem)] flex flex-col items-center gap-[1rem]">
              <span className="font-sans text-[0.65rem] font-light uppercase tracking-[0.2em] text-[#0A0A0A]/45">
                Role para abrir
              </span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="h-[2.5rem] w-[1px] bg-gradient-to-b from-[#0A0A0A]/35 to-transparent"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
