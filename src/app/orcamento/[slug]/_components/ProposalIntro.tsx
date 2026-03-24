"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import SplitText from "gsap-trial/SplitText";

const TITULO = "Seja bem-vindo à nossa proposta comercial";
const SUBTITULO = "Ela foi desenvolvida especialmente para você";

const EXIT_DURATION_S = 1.1;
const EXIT_EASE = [0.25, 0.46, 0.45, 0.94] as const;

export default function ProposalIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"enter" | "exit">("enter");
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const clickRingRef = useRef<HTMLDivElement>(null);
  const clickLabelRef = useRef<HTMLDivElement>(null);
  const splitsRef = useRef<{ title?: { revert: () => void; lines: HTMLElement[] }; subtitle?: { revert: () => void; lines: HTMLElement[] } }>({});

  useGSAP(
    () => {
      gsap.registerPlugin(SplitText);
      const titleEl = titleRef.current;
      const subtitleEl = subtitleRef.current;
      const lineEl = lineRef.current;
      const cursorEl = cursorRef.current;
      const clickRingEl = clickRingRef.current;
      const clickLabelEl = clickLabelRef.current;
      if (!titleEl || !subtitleEl || !lineEl || !cursorEl || !clickRingEl || !clickLabelEl) return;

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

      gsap.set(cursorEl, { opacity: 0, x: "42vw", y: "28vh", scale: 0.9 });
      gsap.set(clickRingEl, { opacity: 0, scale: 0.5 });
      gsap.set(clickLabelEl, { opacity: 0, y: 8 });

      tl.to(cursorEl, { opacity: 1, duration: 0.12 }, "-=0.05");
      tl.to(
        cursorEl,
        {
          x: 0,
          y: 0,
          duration: 0.95,
          ease: "power3.inOut",
        },
        "-=0.1"
      );
      tl.to(cursorEl, { scale: 0.78, duration: 0.08, ease: "power2.out" }, ">");
      tl.to(
        clickRingEl,
        {
          opacity: 1,
          scale: 1.2,
          duration: 0.18,
          ease: "power2.out",
        },
        "<"
      );
      tl.to(
        clickLabelEl,
        {
          opacity: 1,
          y: 0,
          duration: 0.2,
          ease: "power2.out",
        },
        "<0.02"
      );
      tl.to(cursorEl, { scale: 1, duration: 0.14, ease: "back.out(2.2)" }, ">");
      tl.to([clickRingEl, clickLabelEl], { opacity: 0, duration: 0.22, ease: "power2.out" }, ">0.1");
      tl.call(() => setPhase("exit"), undefined, ">0.2");

      return () => {
        titleSplit.revert();
        subtitleSplit.revert();
        splitsRef.current = {};
      };
    },
    { scope: containerRef, dependencies: [] }
  );

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
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-30">
        <div
          ref={clickRingRef}
          className="proposal-intro-click-ring absolute left-0 top-0 z-0 h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-black bg-lime-300/25"
        />
        <div
          ref={clickLabelRef}
          className="proposal-intro-click-label absolute left-[3.25rem] top-2 z-20 -translate-y-1/2 border-[3px] border-black bg-lime-300 px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.12em] text-black md:text-[9px]"
        >
          click
        </div>
        <div ref={cursorRef} className="absolute left-0 top-0 z-10">
          <div className="proposal-intro-cursor-wrap">
            <svg
              className="proposal-intro-cursor-svg"
              viewBox="0 0 22 28"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <title>Cursor</title>
              {/* Sombra sólida (retro) */}
              <path
                d="M3 3v18.5l5.2-4.8 3.2 6.8 2.4-1.6-3-6.2 7.4-3.6z"
                fill="#000"
                transform="translate(2.25 2.25)"
              />
              {/* Corpo */}
              <path
                d="M3 3v18.5l5.2-4.8 3.2 6.8 2.4-1.6-3-6.2 7.4-3.6z"
                fill="#bdfa3c"
                stroke="#000"
                strokeWidth="1.25"
                strokeLinejoin="miter"
              />
              {/* Brilho interno */}
              <path d="M4.5 5.5v9l4-2.2v-4.2z" fill="#fff" opacity="0.42" />
              {/* Bico (pixel) */}
              <rect x="2.25" y="2.25" width="2.5" height="2.5" fill="#fff" stroke="#000" strokeWidth="0.75" />
            </svg>
          </div>
        </div>
      </div>

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
