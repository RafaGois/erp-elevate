"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import Report from "@/types/models/Report";
import SlideShell, { Item, itemVariants } from "../SlideShell";
import EditableText from "../EditableText";
import { useReportEdit } from "../report-edit-context";
import { ELEVATE_WHATSAPP_URL } from "@/lib/data/contact-links";
import { monthName } from "../format";

const PALETTE = ["#22c55e", "#16a34a", "#4ade80", "#bdfa3c", "#fde047", "#ffffff"];

function celebrate() {
  if (typeof window === "undefined") return;
  const base = { colors: PALETTE, disableForReducedMotion: true, zIndex: 60 };

  void confetti({ ...base, particleCount: 120, spread: 90, startVelocity: 50, ticks: 200, origin: { x: 0.5, y: 0.55 } });
  window.setTimeout(() => {
    void confetti({ ...base, particleCount: 50, angle: 60, spread: 70, origin: { x: 0, y: 0.7 } });
    void confetti({ ...base, particleCount: 50, angle: 120, spread: 70, origin: { x: 1, y: 0.7 } });
  }, 200);
}

export default function OutroSlide({ report }: { report: Report }) {
  const { dados, isAdmin } = useReportEdit();
  const cliente = report.client?.trim();
  const mensagem = dados.observacoes ?? "";
  const mes = monthName(report.competencia);

  useEffect(() => {
    const t = window.setTimeout(celebrate, 400);
    return () => window.clearTimeout(t);
  }, []);

  const backdrop = (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 600 600" className="h-[110vmin] w-[110vmin] opacity-80" xmlns="http://www.w3.org/2000/svg">
        <g className="report-spin-slow" style={{ transformOrigin: "300px 300px" }}>
          {Array.from({ length: 16 }).map((_, i) => (
            <path
              key={i}
              d="M300 120 L312 290 L300 300 L288 290 Z"
              fill="#bdfa3c"
              opacity={i % 2 === 0 ? 0.12 : 0.05}
              transform={`rotate(${(360 / 16) * i} 300 300)`}
            />
          ))}
        </g>
        <circle cx="300" cy="300" r="150" fill="none" stroke="#22c55e" strokeWidth="1.5" opacity="0.2" />
      </svg>
    </div>
  );

  return (
    <SlideShell backdrop={backdrop} glow="rgba(189,250,60,0.24)" eyebrow={`Fechamento de ${mes}`}>
      <motion.div
        className="mb-4 text-[clamp(3rem,9vw,5.5rem)]"
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1, rotate: [0, -8, 8, -8, 0] }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        🎉
      </motion.div>

      <Item
        variants={itemVariants}
        className="text-[clamp(2rem,7vw,4.5rem)] font-extrabold leading-[0.95] tracking-tight"
      >
        Que mês,{" "}
        <span className="report-shimmer-text">{cliente || "incrível"}</span>!
      </Item>

      {(isAdmin || mensagem) && (
        <Item
          variants={itemVariants}
          className="mt-[clamp(1.5rem,4vh,2.5rem)] max-w-2xl rounded-3xl border border-white/10 bg-white/[0.04] px-7 py-6 text-[clamp(0.95rem,1.8vw,1.25rem)] italic leading-relaxed text-white/80 backdrop-blur"
        >
          <EditableText
            value={mensagem}
            path="observacoes"
            multiline
            placeholder="Escreva uma mensagem de fechamento para o cliente…"
            className="block w-full text-center"
          />
        </Item>
      )}

      <Item
        variants={itemVariants}
        className="mt-[clamp(1.5rem,4vh,2.5rem)] max-w-md text-[clamp(0.9rem,1.5vw,1.05rem)] text-white/55"
      >
        Obrigado por construir essa história com a gente. Bora pro próximo? 🚀
      </Item>

      <Item variants={itemVariants} className="mt-7 flex flex-col items-center gap-4">
        <a
          href={ELEVATE_WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-full bg-[#bdfa3c] px-8 py-4 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-black transition-transform hover:scale-105"
        >
          Falar com a Elevate
        </a>
        <span className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-white/35">
          elevate · social media
        </span>
      </Item>
    </SlideShell>
  );
}
