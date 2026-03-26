"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Crown, Plus, Trash2 } from "lucide-react";
import type { PacoteItem, PrecoBlockData } from "@/lib/types/budget-content";
import { cn } from "@/lib/utils";
import EditableField from "./EditableField";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  data: PrecoBlockData;
  isAdmin?: boolean;
  onChange?: (d: PrecoBlockData) => void;
}

/** Paleta alinhada à proposta + variáveis “CRT” para cards não-destaque */
const PRECO_WINDOW_VARIANTS = [
  { bar: "#15803d", border: "#22c55e", shadow: "#14532d" },
  { bar: "#27272a", border: "#404040", shadow: "#0a0a0a" },
  { bar: "#0f766e", border: "#14b8a6", shadow: "#115e59" },
] as const;

const DESTAQUE_VARIANT = {
  bar: "#bdfa3c",
  border: "#84cc16",
  shadow: "#3f6212",
} as const;

/** Botões 8-bit: classes em orcamento-theme.css (`.preco-pixel-btn`, variantes de cor/tamanho) */

function pkgWindowSlug(nome: string, i: number): string {
  const slug = (nome ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_")
    .toUpperCase()
    .replace(/[^A-Z0-9_]/g, "") || `PLAN_${i + 1}`;
  return `PKG://${slug}`;
}

interface PrecoRetroCardProps {
  pacote: PacoteItem;
  pi: number;
  destaque: boolean;
  isAdmin: boolean;
  setPacote: (i: number, partial: Partial<PacoteItem>) => void;
  setDestaque: (i: number) => void;
  removePacote: (i: number) => void;
  setInclui: (pi: number, ii: number, v: string) => void;
  addInclui: (pi: number) => void;
  removeInclui: (pi: number, ii: number) => void;
}

function PrecoRetroCard({
  pacote,
  pi,
  destaque,
  isAdmin,
  setPacote,
  setDestaque,
  removePacote,
  setInclui,
  addInclui,
  removeInclui,
}: PrecoRetroCardProps) {
  const v = destaque ? DESTAQUE_VARIANT : PRECO_WINDOW_VARIANTS[pi % PRECO_WINDOW_VARIANTS.length];
  const barFg = destaque ? "text-black" : "text-white";

  const barStyle = destaque
    ? {
        backgroundColor: v.bar,
        backgroundImage:
          "repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(0,0,0,0.06) 5px, rgba(0,0,0,0.06) 6px)",
      }
    : { backgroundColor: v.bar };

  const window = (
    <div
      className={cn(
        "retro-window flex min-h-0 flex-1 flex-col overflow-hidden rounded-sm border-2 bg-white text-left",
        destaque && "border-black"
      )}
      style={
        destaque
          ? { borderColor: "#171717", boxShadow: "7px 7px 0 #0f172a" }
          : { borderColor: v.border, boxShadow: `6px 6px 0 ${v.shadow}` }
      }
    >
      <div
        className={`flex items-center justify-between gap-1 px-2 py-1 ${barFg}`}
        style={barStyle}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <span className="truncate font-mono text-[10px] font-bold tracking-wide">
            {pkgWindowSlug(pacote.nome, pi)}
          </span>
        </div>
        {isAdmin && (
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => setDestaque(pi)}
              className="preco-pixel-btn preco-pixel-btn--xs preco-pixel-btn--cyan"
              title="Marcar recomendado"
            >
              <Crown size={11} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => removePacote(pi)}
              className="preco-pixel-btn preco-pixel-btn--xs preco-pixel-btn--pink"
              title="Remover pacote"
            >
              <Trash2 size={11} aria-hidden />
            </button>
          </div>
        )}
        <div className="flex shrink-0 gap-0.5">
          <span className="h-2.5 w-2.5 rounded-sm border border-black/30 bg-white/90" />
          <span className="h-2.5 w-2.5 rounded-sm border border-black/30 bg-white/90" />
          <span className="h-2.5 w-2.5 rounded-sm border border-black/30 bg-red-400/90" />
        </div>
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col border-t-2 border-neutral-300 bg-white p-3 md:p-4",
          destaque && "relative bg-[linear-gradient(180deg,#ffffff_0%,#f7fee7_55%,#ffffff_100%)]"
        )}
      >
        <h3 className="font-mono text-sm font-bold text-neutral-900 md:text-base">
          {"{ "}
          <EditableField
            value={pacote.nome}
            onChange={(v) => setPacote(pi, { nome: v })}
            isAdmin={isAdmin}
            className="inline"
          />
          {" }"}
        </h3>

        {isAdmin ? (
          <div className="mt-1.5 font-mono text-[11px] leading-snug text-neutral-600">
            <span className="text-neutral-400">&gt; </span>
            <EditableField
              value={pacote.descricao ?? ""}
              onChange={(v) => setPacote(pi, { descricao: v })}
              isAdmin={isAdmin}
              multiline
              tag="span"
              className="inline"
              placeholder="Descrição do pacote"
            />
          </div>
        ) : (
          pacote.descricao && (
            <p className="mt-1.5 font-mono text-[11px] leading-snug text-neutral-600">
              <span className="text-neutral-400">&gt;</span> {pacote.descricao}
            </p>
          )
        )}

        <div
          className={cn(
            "mt-4 flex flex-wrap items-baseline gap-1 px-2 py-1.5 font-mono",
            destaque
              ? "border-2 border-black bg-[#ecfccb] shadow-[4px_4px_0_#171717]"
              : "border border-neutral-200 bg-neutral-50"
          )}
        >
          <span className={cn("text-xs", destaque ? "text-neutral-700" : "text-neutral-500")}>
            {pacote.moeda ?? "R$"}
          </span>
          <EditableField
            value={String(pacote.valor)}
            onChange={(v) => setPacote(pi, { valor: parseFloat(v) || 0 })}
            isAdmin={isAdmin}
            className={cn(
              "text-2xl font-bold md:text-3xl",
              destaque ? "text-neutral-950" : "text-neutral-900"
            )}
          />
        </div>
        {isAdmin ? (
          <p className="mt-1 font-mono text-[10px] text-neutral-500">
            [
            <EditableField
              value={pacote.parcelas ?? ""}
              onChange={(v) => setPacote(pi, { parcelas: v ? v : undefined })}
              isAdmin={isAdmin}
              allowEmpty
              tag="span"
              className="inline"
              placeholder="Ex.: ou 3x de R$ 1.000,00"
            />
            ]
          </p>
        ) : (
          pacote.parcelas && (
            <p className="mt-1 font-mono text-[10px] text-neutral-500">[{pacote.parcelas}]</p>
          )
        )}

        <div className="mt-4 flex-1 space-y-1.5">
          {(pacote.inclui ?? []).map((item, ii) => (
            <div key={ii} className="group/item flex items-start gap-2 font-mono text-[11px] text-neutral-700">
              {destaque ? (
                <span className="mt-0.5 flex h-4 w-4 shrink-0 select-none items-center justify-center rounded-sm border border-black bg-[#bdfa3c] text-[10px] font-bold leading-none text-black">
                  ✓
                </span>
              ) : (
                <span className="mt-0.5 shrink-0 select-none text-[#22c55e]">✓</span>
              )}
              <EditableField
                value={item}
                onChange={(v) => setInclui(pi, ii, v)}
                isAdmin={isAdmin}
                className="min-w-0 flex-1"
              />
              {isAdmin && (
                <button
                  type="button"
                  onClick={() => removeInclui(pi, ii)}
                  className={cn(
                    "preco-pixel-btn preco-pixel-btn--xs preco-pixel-btn--outline shrink-0 opacity-0 group-hover/item:opacity-100"
                  )}
                  aria-label="Remover item"
                >
                  <Trash2 size={10} aria-hidden />
                </button>
              )}
            </div>
          ))}
          {isAdmin && (
            <button
              type="button"
              onClick={() => addInclui(pi)}
              className="preco-pixel-btn preco-pixel-btn--sm preco-pixel-btn--peach mt-0.5 gap-1"
            >
              <Plus size={10} aria-hidden /> + incluir
            </button>
          )}
        </div>

        <button
          type="button"
          className={cn(
            "preco-pixel-btn preco-pixel-btn--lg preco-pixel-btn--wide mt-4 cursor-pointer",
            destaque ? "preco-pixel-btn--lime" : "preco-pixel-btn--dark"
          )}
        >
          Escolher plano
        </button>
      </div>
    </div>
  );

  return (
    <div className="mx-0.5 flex h-full min-h-0 flex-col">
      {destaque ? (
        <div className="preco-card-destaque-shell flex min-h-0 flex-1 flex-col rounded-sm bg-linear-to-br from-[#f7fee7] via-[#bdfa96] to-[#166534] p-[3px] shadow-[12px_12px_0_#18181b]">
          {window}
        </div>
      ) : (
        window
      )}
    </div>
  );
}

export default function PrecoBlock({ data, isAdmin = false, onChange }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const pacotes: PacoteItem[] = data.pacotes ?? [];

  function setPacote(i: number, partial: Partial<PacoteItem>) {
    onChange?.({ ...data, pacotes: pacotes.map((p, idx) => (idx === i ? { ...p, ...partial } : p)) });
  }
  function setDestaque(i: number) {
    onChange?.({ ...data, pacotes: pacotes.map((p, idx) => ({ ...p, destaque: idx === i })) });
  }
  function addPacote() {
    onChange?.({
      ...data,
      pacotes: [
        ...pacotes,
        { nome: "Novo", descricao: "...", valor: 0, inclui: ["Item"], destaque: false },
      ],
    });
  }
  function removePacote(i: number) {
    const next = pacotes.filter((_, idx) => idx !== i);
    if (next.length && !next.some((p) => p.destaque)) next[0].destaque = true;
    onChange?.({ ...data, pacotes: next });
  }
  function setInclui(pi: number, ii: number, v: string) {
    setPacote(pi, { inclui: pacotes[pi].inclui.map((it, i) => (i === ii ? v : it)) });
  }
  function addInclui(pi: number) {
    setPacote(pi, { inclui: [...(pacotes[pi].inclui ?? []), "Novo item"] });
  }
  function removeInclui(pi: number, ii: number) {
    setPacote(pi, { inclui: pacotes[pi].inclui.filter((_, i) => i !== ii) });
  }
  function set<K extends keyof PrecoBlockData>(key: K, value: PrecoBlockData[K]) {
    onChange?.({ ...data, [key]: value });
  }

  useGSAP(
    () => {
      if (!container.current || !cardsRef.current) return;
      const cards = cardsRef.current.querySelectorAll("[data-preco-card]");
      gsap.set(cards, { opacity: 0, y: 32 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: container }
  );

  const colClass = pacotes.length <= 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";

  return (
    <section id="preco" ref={container} className="proposal-section bg-white">
      <div className="proposal-container">
        <header className="mb-12 md:mb-16">
          <h2 className="text-4xl font-bold text-black md:text-5xl">
            <EditableField
              value={data.titulo ?? "Escolha seu plano"}
              onChange={(v) => set("titulo", v)}
              isAdmin={isAdmin}
              className="block"
            />
          </h2>
          <p className="mt-2 max-w-xl font-mono text-sm text-[#7D6B58]">
            <EditableField
              value={data.subtitulo ?? "Opções flexíveis para cada momento do seu negócio."}
              onChange={(v) => set("subtitulo", v)}
              isAdmin={isAdmin}
              tag="span"
              className="inline"
            />
          </p>
        </header>

        <div ref={cardsRef} className={`grid grid-cols-1 gap-8 md:gap-10 ${colClass}`}>
          <AnimatePresence>
            {pacotes.map((pacote, pi) => {
              const destaque = !!pacote.destaque;
              return (
                <motion.div
                  key={pi}
                  layout
                  data-preco-card
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={cn("relative h-full overflow-visible", destaque && "z-1")}
                >
                  {destaque && (
                    <div className="preco-pixel-badge pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap">
                      <Crown strokeWidth={2.4} aria-hidden />
                      Plano em destaque
                    </div>
                  )}
                  <PrecoRetroCard
                    pacote={pacote}
                    pi={pi}
                    destaque={destaque}
                    isAdmin={isAdmin}
                    setPacote={setPacote}
                    setDestaque={setDestaque}
                    removePacote={removePacote}
                    setInclui={setInclui}
                    addInclui={addInclui}
                    removeInclui={removeInclui}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {isAdmin && (
          <button
            type="button"
            onClick={addPacote}
            className="preco-pixel-btn preco-pixel-btn--outline-lg preco-pixel-btn--wide mt-8"
          >
            <Plus size={14} aria-hidden /> + Novo pacote
          </button>
        )}

        {data.observacao && (
          <p className="mt-8 text-center font-mono text-xs text-neutral-500">{data.observacao}</p>
        )}
      </div>
    </section>
  );
}
