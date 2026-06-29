"use client";

/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import { Eye, Heart, MessageCircle, Plus, X } from "lucide-react";
import type { HighlightTipo } from "@/types/report-content";
import SlideShell, { Item, itemVariants } from "../SlideShell";
import EditableStat from "../EditableStat";
import EditableText from "../EditableText";
import { useReportEdit } from "../report-edit-context";
import { formatCompact } from "../format";

const TIPO_LABEL: Record<string, string> = {
  feed: "Feed",
  carrossel: "Carrossel",
  reel: "Reel",
  story: "Story",
};
const TIPO_ORDER: HighlightTipo[] = ["feed", "carrossel", "reel", "story"];

export default function HighlightsSlide() {
  const { dados, isAdmin, setField, addDestaque, removeDestaque } = useReportEdit();
  const destaques = (dados.destaques ?? []).slice(0, 4);

  function cycleTipo(index: number, current?: HighlightTipo) {
    const next = TIPO_ORDER[(TIPO_ORDER.indexOf(current ?? "feed") + 1) % TIPO_ORDER.length];
    setField(`destaques.${index}.tipo`, next);
  }

  return (
    <SlideShell glow="rgba(189,250,60,0.16)" eyebrow="Destaques do mês">
      <Item variants={itemVariants} className="text-[clamp(1.6rem,5vw,3rem)] font-extrabold tracking-tight">
        Os queridinhos ⭐
      </Item>
      <Item variants={itemVariants} className="mt-2 max-w-lg text-[clamp(0.85rem,1.5vw,1.05rem)] text-white/55">
        As publicações que mais brilharam nas redes esse mês.
      </Item>

      <Item
        variants={itemVariants}
        className="mt-[clamp(1.5rem,4vh,2.5rem)] grid w-full gap-4"
        style={{ gridTemplateColumns: `repeat(${Math.min(Math.max(destaques.length, 1), 2)}, minmax(0, 1fr))` }}
      >
        {destaques.map((dst, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30, rotate: i % 2 === 0 ? -2 : 2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 0.4 + i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] text-left backdrop-blur"
          >
            {isAdmin && (
              <button
                onClick={() => removeDestaque(i)}
                aria-label="Remover destaque"
                className="absolute right-2 top-2 z-10 flex size-7 items-center justify-center rounded-full bg-black/60 text-white/70 backdrop-blur transition-colors hover:bg-red-500/80 hover:text-white"
              >
                <X className="size-3.5" />
              </button>
            )}

            <div className="relative h-40 w-full overflow-hidden bg-gradient-to-br from-[#22c55e]/30 to-[#bdfa3c]/10">
              {dst.capaUrl ? (
                <img src={dst.capaUrl} alt={dst.titulo} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-4xl opacity-60">
                  {dst.tipo === "reel" ? "🎬" : dst.tipo === "story" ? "⚡" : "📸"}
                </div>
              )}
              <button
                type="button"
                disabled={!isAdmin}
                onClick={() => cycleTipo(i, dst.tipo)}
                title={isAdmin ? "Clique para trocar o tipo" : undefined}
                className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 font-mono text-[0.5rem] uppercase tracking-[0.18em] text-white backdrop-blur disabled:cursor-default"
              >
                {TIPO_LABEL[dst.tipo ?? "feed"] ?? dst.tipo}
              </button>
            </div>

            <div className="space-y-3 p-4">
              <EditableText
                value={dst.titulo}
                path={`destaques.${i}.titulo`}
                placeholder="Título do destaque"
                className="line-clamp-2 block text-[clamp(0.9rem,1.6vw,1.1rem)] font-semibold text-white"
              />
              <div className="flex flex-wrap gap-4 text-white/60">
                {(isAdmin || typeof dst.visualizacoes === "number") && (
                  <Metric Icon={Eye} value={dst.visualizacoes ?? 0} path={`destaques.${i}.visualizacoes`} />
                )}
                {(isAdmin || typeof dst.curtidas === "number") && (
                  <Metric Icon={Heart} value={dst.curtidas ?? 0} path={`destaques.${i}.curtidas`} />
                )}
                {(isAdmin || typeof dst.comentarios === "number") && (
                  <Metric Icon={MessageCircle} value={dst.comentarios ?? 0} path={`destaques.${i}.comentarios`} />
                )}
              </div>
              {isAdmin && (
                <EditableText
                  value={dst.capaUrl ?? ""}
                  path={`destaques.${i}.capaUrl`}
                  placeholder="Colar URL da capa…"
                  className="block font-mono text-[0.6rem] text-white/40"
                />
              )}
              {(isAdmin || dst.observacao) && (
                <EditableText
                  value={dst.observacao ?? ""}
                  path={`destaques.${i}.observacao`}
                  placeholder="Observação…"
                  multiline
                  className="block text-xs italic text-white/45"
                />
              )}
            </div>
          </motion.div>
        ))}

        {isAdmin && destaques.length < 4 && (
          <button
            onClick={() => addDestaque()}
            className="flex min-h-[14rem] flex-col items-center justify-center gap-2 rounded-3xl border border-dashed border-white/20 text-white/50 transition-colors hover:border-[#bdfa3c]/50 hover:text-[#bdfa3c]"
          >
            <Plus className="size-7" />
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em]">Adicionar destaque</span>
          </button>
        )}
      </Item>
    </SlideShell>
  );
}

function Metric({ Icon, value, path }: { Icon: typeof Eye; value: number; path: string }) {
  return (
    <span className="flex items-center gap-1.5 text-sm font-medium">
      <Icon className="size-3.5" />
      <EditableStat value={value} path={path} format={formatCompact} countUp={false} />
    </span>
  );
}
