"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import Report from "@/types/models/Report";
import SlideShell, { Item, itemVariants } from "../SlideShell";
import EditableText from "../EditableText";
import HeartsBackdrop from "../backdrops/HeartsBackdrop";
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
    <div className="absolute inset-0">
      <HeartsBackdrop className="absolute inset-0 h-full w-full opacity-90" />
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
        className="rep-display text-[clamp(2rem,7vw,4.5rem)] leading-[0.95] tracking-tight"
      >
        Que mês,{" "}
        <span className="report-shimmer-text">{cliente || "incrível"}</span>!
      </Item>

      {(isAdmin || mensagem) && (
        <Item
          variants={itemVariants}
          className="rep-card mt-[clamp(1.5rem,4vh,2.5rem)] max-w-2xl px-7 py-6 text-[clamp(0.95rem,1.8vw,1.25rem)] italic leading-relaxed text-white/80"
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

      <Item variants={itemVariants} className="mt-8 flex flex-col items-center gap-4">
        <a
          href={ELEVATE_WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rep-btn rep-btn--primary px-8 py-4 text-[0.6rem] tracking-[0.12em]"
        >
          Falar com a Elevate
        </a>
        <span className="rep-pixel text-[0.5rem] uppercase tracking-[0.15em] text-white/35">
          elevate · social media
        </span>
      </Item>
    </SlideShell>
  );
}
