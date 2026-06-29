"use client";

import { motion } from "framer-motion";
import SlideShell, { Item, itemVariants } from "../SlideShell";
import EditableStat from "../EditableStat";
import { useReportEdit } from "../report-edit-context";

const TIPOS: { key: "feed" | "carrossel" | "reel" | "story"; label: string; emoji: string; color: string }[] = [
  { key: "reel", label: "Reels", emoji: "🎬", color: "#bdfa3c" },
  { key: "carrossel", label: "Carrossel", emoji: "🖼️", color: "#22c55e" },
  { key: "feed", label: "Feed", emoji: "📸", color: "#38bdf8" },
  { key: "story", label: "Stories", emoji: "⚡", color: "#fbbf24" },
];

export default function ContentSlide() {
  const { dados, isAdmin } = useReportEdit();
  const c = dados.conteudo ?? {};
  const porTipo = c.porTipo ?? {};

  const bars = TIPOS.map((t) => ({ ...t, value: porTipo[t.key] ?? 0 })).filter((t) => isAdmin || t.value > 0);
  const max = Math.max(1, ...bars.map((b) => b.value));
  const total = c.totalPublicacoes ?? 0;

  return (
    <SlideShell glow="rgba(56,189,248,0.14)" eyebrow="Conteúdo publicado">
      <Item variants={itemVariants} className="text-[clamp(1rem,2vw,1.3rem)] font-light text-white/60">
        Quanta coisa a gente produziu
      </Item>

      <Item variants={itemVariants} className="my-1 flex items-baseline justify-center gap-3">
        <EditableStat
          value={total}
          path="conteudo.totalPublicacoes"
          className="text-[clamp(3rem,12vw,8rem)] font-extrabold leading-none tracking-tight text-white"
        />
        <span className="text-[clamp(1rem,2.4vw,1.6rem)] font-medium text-white/50">
          {total === 1 ? "publicação" : "publicações"}
        </span>
      </Item>

      {bars.length > 0 && (
        <Item
          variants={itemVariants}
          className="mt-[clamp(2rem,5vh,3.5rem)] flex w-full max-w-2xl items-end justify-center gap-[clamp(0.75rem,3vw,2rem)]"
        >
          {bars.map((b, i) => (
            <div key={b.key} className="flex flex-1 flex-col items-center gap-3">
              <EditableStat
                value={b.value}
                path={`conteudo.porTipo.${b.key}`}
                countUp={false}
                className="text-[clamp(1rem,2.2vw,1.5rem)] font-bold text-white"
              />
              <div className="flex h-[clamp(8rem,22vh,14rem)] w-full items-end justify-center">
                <motion.div
                  className="w-full max-w-[5rem] rounded-t-xl"
                  style={{ backgroundColor: b.color }}
                  initial={{ height: 0 }}
                  animate={{ height: `${(b.value / max) * 100}%` }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 + i * 0.12 }}
                />
              </div>
              <span className="text-xl">{b.emoji}</span>
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-white/45">{b.label}</span>
            </div>
          ))}
        </Item>
      )}
    </SlideShell>
  );
}
