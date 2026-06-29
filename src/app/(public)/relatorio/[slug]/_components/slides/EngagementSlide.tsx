"use client";

import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import SlideShell, { Item, itemVariants } from "../SlideShell";
import EditableStat from "../EditableStat";
import CountUp from "../CountUp";
import { useReportEdit } from "../report-edit-context";
import { formatNumber, formatPercent } from "../format";

export default function EngagementSlide() {
  const { dados, isAdmin } = useReportEdit();
  const e = dados.engajamento ?? {};

  const items = [
    { key: "curtidas", label: "Curtidas", value: e.curtidas ?? 0, path: "engajamento.curtidas", Icon: Heart, color: "#f43f5e" },
    { key: "comentarios", label: "Comentários", value: e.comentarios ?? 0, path: "engajamento.comentarios", Icon: MessageCircle, color: "#38bdf8" },
    { key: "compartilhamentos", label: "Compart.", value: e.compartilhamentos ?? 0, path: "engajamento.compartilhamentos", Icon: Send, color: "#bdfa3c" },
    { key: "salvamentos", label: "Salvos", value: e.salvamentos ?? 0, path: "engajamento.salvamentos", Icon: Bookmark, color: "#fbbf24" },
  ].filter((i) => isAdmin || i.value > 0);

  const totalInteracoes = items.reduce((sum, i) => sum + i.value, 0);

  const backdrop = (
    <div className="absolute inset-0 overflow-hidden">
      {["❤️", "💬", "🔥", "👏", "✨", "💚"].map((em, i) => (
        <span
          key={i}
          className="report-float-slow absolute text-2xl opacity-30"
          style={{ left: `${10 + i * 14}%`, top: `${20 + (i % 3) * 22}%`, animationDelay: `${i * 0.7}s` }}
        >
          {em}
        </span>
      ))}
    </div>
  );

  return (
    <SlideShell backdrop={backdrop} glow="rgba(244,63,94,0.14)" eyebrow="Engajamento">
      <Item variants={itemVariants} className="text-[clamp(1rem,2vw,1.3rem)] font-light text-white/60">
        A galera interagiu
      </Item>

      <Item variants={itemVariants} className="my-1">
        <CountUp
          value={totalInteracoes}
          format={formatNumber}
          className="text-[clamp(3rem,12vw,8rem)] font-extrabold leading-none tracking-tight text-white"
        />
      </Item>

      <Item variants={itemVariants} className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-white/50">
        interações no total
      </Item>

      <Item variants={itemVariants} className="mt-[clamp(1.5rem,4vh,2.5rem)] grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map(({ key, label, value, path, Icon, color }) => (
          <div key={key} className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-5 backdrop-blur">
            <Icon className="report-bob size-6" style={{ color }} strokeWidth={2.2} />
            <EditableStat
              value={value}
              path={path}
              format={formatNumber}
              duration={1.4}
              className="text-[clamp(1.1rem,2.4vw,1.6rem)] font-bold text-white"
            />
            <p className="font-mono text-[0.5rem] uppercase tracking-[0.18em] text-white/40">{label}</p>
          </div>
        ))}
      </Item>

      {(isAdmin || (e.taxaEngajamento ?? 0) !== 0) && (
        <Item variants={itemVariants} className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#bdfa3c]/30 bg-[#bdfa3c]/10 px-5 py-2">
          <EditableStat
            value={e.taxaEngajamento ?? 0}
            path="engajamento.taxaEngajamento"
            format={formatPercent}
            countUp={false}
            className="text-[clamp(1rem,2vw,1.3rem)] font-bold text-[#bdfa3c]"
          />
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-white/50">taxa de engajamento</span>
        </Item>
      )}
    </SlideShell>
  );
}
