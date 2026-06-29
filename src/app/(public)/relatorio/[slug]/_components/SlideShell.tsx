"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/** Variants reutilizáveis para o stagger interno de cada slide. */
export const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const Item = motion.div;

interface Props {
  /** Camada decorativa (SVG grande) renderizada atrás do conteúdo. */
  backdrop?: ReactNode;
  /** Chip de etiqueta no topo (ex: competência ou nome da seção). */
  eyebrow?: ReactNode;
  /** Cor de brilho ambiente do slide. */
  glow?: string;
  children: ReactNode;
}

export default function SlideShell({ backdrop, eyebrow, glow = "rgba(189,250,60,0.18)", children }: Props) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden px-[clamp(1.5rem,5vw,6rem)] py-[clamp(4rem,8vh,7rem)]">
      {/* Brilho ambiente */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 42%, ${glow} 0%, transparent 65%)`,
        }}
      />

      {/* Camada decorativa (SVGs grandes) */}
      {backdrop && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {backdrop}
        </div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 flex w-full max-w-5xl flex-col items-center text-center"
      >
        {eyebrow && (
          <motion.div variants={itemVariants} className="mb-[clamp(1.5rem,4vh,2.5rem)]">
            <span className="rep-badge">{eyebrow}</span>
          </motion.div>
        )}
        {children}
      </motion.div>
    </div>
  );
}
