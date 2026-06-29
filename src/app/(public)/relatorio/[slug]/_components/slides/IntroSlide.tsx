"use client";

import { motion } from "framer-motion";
import Report from "@/types/models/Report";
import SlideShell, { Item, itemVariants } from "../SlideShell";
import AuroraJoyBackdrop from "../backdrops/AuroraJoyBackdrop";
import { monthName } from "../format";

export default function IntroSlide({ report }: { report: Report }) {
  const cliente = report.client?.trim() || "você";
  const mes = monthName(report.competencia) || "o mês";

  const backdrop = (
    <div className="absolute inset-0">
      <AuroraJoyBackdrop className="absolute inset-0 h-full w-full" />
    </div>
  );

  return (
    <SlideShell backdrop={backdrop} glow="rgba(189,250,60,0.22)" eyebrow="Relatório mensal">
      <Item variants={itemVariants} className="mb-4 text-[clamp(1rem,2.4vw,1.6rem)] font-light text-white/70">
        Olá, <span className="font-medium text-white">{cliente}</span> 👋
      </Item>

      <Item
        variants={itemVariants}
        className="rep-display text-[clamp(2.4rem,9vw,6rem)] leading-[0.95] tracking-tight"
      >
        Esse foi o seu
        <br />
        <span className="report-shimmer-text">{mes}</span> nas redes
      </Item>

      <Item
        variants={itemVariants}
        className="mt-[clamp(1.5rem,4vh,2.5rem)] max-w-xl text-[clamp(0.95rem,1.6vw,1.15rem)] leading-relaxed text-white/60"
      >
        Preparamos um resumo rápido e visual de tudo que aconteceu por aqui.
        Bora ver os números? 🚀
      </Item>

      {/* Emojis flutuantes */}
      <motion.div
        variants={itemVariants}
        className="pointer-events-none mt-8 flex gap-6 text-3xl"
      >
        {["📈", "❤️", "✨", "🎉"].map((em, i) => (
          <span key={em} className="report-float" style={{ animationDelay: `${i * 0.5}s` }}>
            {em}
          </span>
        ))}
      </motion.div>
    </SlideShell>
  );
}
