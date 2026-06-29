"use client";

import { motion } from "framer-motion";
import Report from "@/types/models/Report";
import SlideShell, { Item, itemVariants } from "../SlideShell";
import { monthName } from "../format";

export default function IntroSlide({ report }: { report: Report }) {
  const cliente = report.client?.trim() || "você";
  const mes = monthName(report.competencia) || "o mês";

  const backdrop = (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg
        viewBox="0 0 600 600"
        className="h-[120vmin] w-[120vmin] opacity-90"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Raios girando */}
        <g className="report-spin-slow" style={{ transformOrigin: "300px 300px" }}>
          {Array.from({ length: 24 }).map((_, i) => (
            <rect
              key={i}
              x="298"
              y="40"
              width="4"
              height="120"
              rx="2"
              fill="#bdfa3c"
              opacity={i % 2 === 0 ? 0.16 : 0.07}
              transform={`rotate(${(360 / 24) * i} 300 300)`}
            />
          ))}
        </g>
        {/* Anéis pulsando */}
        <circle cx="300" cy="300" r="120" fill="none" stroke="#22c55e" strokeWidth="1.5" opacity="0.25" />
        <circle cx="300" cy="300" r="170" fill="none" stroke="#bdfa3c" strokeWidth="1" opacity="0.15" />
        {/* Estrelinhas */}
        {[
          [120, 140], [480, 160], [150, 460], [470, 440], [300, 90], [90, 300], [510, 300], [300, 510],
        ].map(([cx, cy], i) => (
          <g key={i} className="report-twinkle" style={{ animationDelay: `${i * 0.4}s`, transformOrigin: `${cx}px ${cy}px` }}>
            <path
              d={`M${cx} ${cy - 9} L${cx + 2.4} ${cy - 2.4} L${cx + 9} ${cy} L${cx + 2.4} ${cy + 2.4} L${cx} ${cy + 9} L${cx - 2.4} ${cy + 2.4} L${cx - 9} ${cy} L${cx - 2.4} ${cy - 2.4} Z`}
              fill="#ffffff"
            />
          </g>
        ))}
      </svg>
    </div>
  );

  return (
    <SlideShell backdrop={backdrop} glow="rgba(189,250,60,0.22)" eyebrow="Relatório mensal">
      <Item variants={itemVariants} className="mb-4 text-[clamp(1rem,2.4vw,1.6rem)] font-light text-white/70">
        Olá, <span className="font-medium text-white">{cliente}</span> 👋
      </Item>

      <Item
        variants={itemVariants}
        className="text-[clamp(2.4rem,9vw,6rem)] font-extrabold leading-[0.95] tracking-tight"
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
