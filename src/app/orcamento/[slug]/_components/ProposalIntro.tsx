"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import SplitText from "gsap-trial/SplitText";

const TITULO = "Seja bem-vindo à nossa proposta comercial";
const SUBTITULO = "Ela foi desenvolvida especialmente para você";

const INTRO_DURATION_MS = 4200;
const EXIT_DURATION_S = 1.1;
const EXIT_EASE = [0.25, 0.46, 0.45, 0.94] as const;

export default function ProposalIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"enter" | "exit">("enter");
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const splitsRef = useRef<{ title?: { revert: () => void; lines: HTMLElement[] }; subtitle?: { revert: () => void; lines: HTMLElement[] } }>({});

  useGSAP(
    () => {
      gsap.registerPlugin(SplitText);
      const titleEl = titleRef.current;
      const subtitleEl = subtitleRef.current;
      const lineEl = lineRef.current;
      if (!titleEl || !subtitleEl || !lineEl) return;

      const titleSplit = SplitText.create(titleEl, {
        type: "lines",
        linesClass: "intro-line",
      });
      splitsRef.current.title = titleSplit;

      const subtitleSplit = SplitText.create(subtitleEl, {
        type: "lines",
        linesClass: "intro-subline",
      });
      splitsRef.current.subtitle = subtitleSplit;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      /* Linhas do título — de baixo para cima, stagger elegante */
      gsap.set(titleSplit.lines, { opacity: 0, y: 72 });
      tl.to(titleSplit.lines, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        overwrite: "auto",
      });

      /* Subtítulo — linhas de baixo para cima, overlap suave */
      gsap.set(subtitleSplit.lines, { opacity: 0, y: 36 });
      tl.to(
        subtitleSplit.lines,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.4"
      );

      /* Linha decorativa — cresce do centro */
      gsap.set(lineEl, { scaleX: 0, opacity: 0 });
      tl.to(
        lineEl,
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.65,
          ease: "power2.out",
        },
        "-=0.25"
      );

      return () => {
        titleSplit.revert();
        subtitleSplit.revert();
        splitsRef.current = {};
      };
    },
    { scope: containerRef, dependencies: [] }
  );

  useEffect(() => {
    const holdTimer = setTimeout(() => setPhase("exit"), INTRO_DURATION_MS - EXIT_DURATION_S * 1000);
    return () => clearTimeout(holdTimer);
  }, []);

  useEffect(() => {
    if (phase !== "exit") return;
    const doneTimer = setTimeout(onComplete, EXIT_DURATION_S * 1000);
    return () => clearTimeout(doneTimer);
  }, [phase, onComplete]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={
        phase === "exit"
          ? {
              opacity: 0,
              scale: 1.04,
              filter: "blur(14px)",
              transition: {
                duration: EXIT_DURATION_S,
                ease: EXIT_EASE,
              },
            }
          : {}
      }
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-white px-6"
      style={{ willChange: phase === "exit" ? "opacity, transform, filter" : undefined }}
    >
      <div ref={containerRef} className="mx-auto max-w-4xl text-center">
        <h1
          ref={titleRef}
          className="font-sans font-bold uppercase leading-[1.08] tracking-tight text-[#0A0A0A]"
          style={{
            fontSize: "clamp(2rem, 6vw, 4.5rem)",
            lineHeight: 1.1,
          }}
        >
          {TITULO}
        </h1>

        <p
          ref={subtitleRef}
          className="mt-6 font-sans font-light tracking-wide text-[#7D6B58]"
          style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.2rem)" }}
        >
          {SUBTITULO}
        </p>

        <div
          ref={lineRef}
          className="mx-auto mt-10 h-px w-16 origin-center bg-[#bdfa3c]"
        />
      </div>
    </motion.div>
  );
}
