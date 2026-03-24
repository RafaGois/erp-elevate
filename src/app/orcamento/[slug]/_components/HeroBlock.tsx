"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, type CSSProperties } from "react";
import { ChevronDown } from "lucide-react";
import type { BudgetBlock, HeroBlockData } from "@/lib/types/budget-content";
import EditableField from "./EditableField";
import ProposalIntro from "./ProposalIntro";

interface Props {
  data: HeroBlockData;
  blocks: BudgetBlock[];
  isAdmin?: boolean;
  onChange?: (d: HeroBlockData) => void;
}

/**
 * Scroll em uma única "trilha": só este bloco consome altura no documento.
 * Hero + porta ficam `fixed` no viewport o tempo todo — não há sticky soltando
 * nem parallax competindo com o scroll da página.
 */
const TRACK_VH = 80;

const MOUSE_PARALLAX_RANGE = 8;
const SCROLL_PARALLAX_MAX = 2.2;
const CURSOR_LERP_FACTOR = 0.035;

const EMOJI_CONFIG = [
  { emoji: "🟢", top: "-10%", left: "-8%", delay: 0, depth: 0.7, mouseX: 0.55, mouseY: 0.4, scrollY: 0.5, driftAmp: 0.8, driftSpeed: 0.45, phase: 0.2, opacity: 0.42 },
  { emoji: "✅", top: "5%", right: "-12%", delay: 0.3, depth: 0.9, mouseX: -0.35, mouseY: 0.6, scrollY: 0.8, driftAmp: 1, driftSpeed: 0.32, phase: 1.1, opacity: 0.44 },
  { emoji: "🌿", top: "-5%", right: "-5%", delay: 0.5, depth: 0.8, mouseX: 0.5, mouseY: -0.45, scrollY: 0.6, driftAmp: 0.7, driftSpeed: 0.5, phase: 2.4, opacity: 0.4 },
  { emoji: "💚", bottom: "10%", left: "-15%", delay: 0.2, depth: 0.85, mouseX: -0.45, mouseY: 0.45, scrollY: 0.65, driftAmp: 0.95, driftSpeed: 0.38, phase: 3.2, opacity: 0.38 },
  { emoji: "🟢", bottom: "-8%", right: "-10%", delay: 0.4, depth: 0.75, mouseX: 0.4, mouseY: -0.35, scrollY: 0.55, driftAmp: 0.75, driftSpeed: 0.55, phase: 4.4, opacity: 0.36 },
  { emoji: "🌱", bottom: "5%", right: "-18%", delay: 0.6, depth: 0.95, mouseX: -0.55, mouseY: 0.35, scrollY: 0.9, driftAmp: 1.1, driftSpeed: 0.3, phase: 5.1, opacity: 0.42 },
] as const;

export default function HeroBlock({
  data,
  blocks,
  isAdmin = false,
  onChange,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const emojisRef = useRef<HTMLDivElement>(null);
  const [introDone, setIntroDone] = useState(false);
  const [stagePassthrough, setStagePassthrough] = useState(false);

  const mouseTargetRef = useRef({ x: 0, y: 0 });
  const mouseCurrentRef = useRef({ x: 0, y: 0 });

  function set<K extends keyof HeroBlockData>(key: K, value: HeroBlockData[K]) {
    onChange?.({ ...data, [key]: value });
  }

  useGSAP(
    () => {
      if (!containerRef.current || !stageRef.current || !emojisRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      const emojiEls = emojisRef.current.querySelectorAll("[data-emoji-item]");
      let scrollProgress = 0;

      const updateParallax = () => {
        mouseCurrentRef.current.x +=
          (mouseTargetRef.current.x - mouseCurrentRef.current.x) * CURSOR_LERP_FACTOR;
        mouseCurrentRef.current.y +=
          (mouseTargetRef.current.y - mouseCurrentRef.current.y) * CURSOR_LERP_FACTOR;

        const mx = mouseCurrentRef.current.x;
        const my = mouseCurrentRef.current.y;
        const t = performance.now() / 1000;

        emojiEls.forEach((el, i) => {
          const cfg = EMOJI_CONFIG[i];
          if (!cfg) return;
          const d = cfg.depth;
          const driftX = Math.sin(t * cfg.driftSpeed + cfg.phase) * cfg.driftAmp;
          const driftY = Math.cos(t * cfg.driftSpeed * 0.9 + cfg.phase) * cfg.driftAmp * 0.7;
          const x = mx * MOUSE_PARALLAX_RANGE * d * cfg.mouseX + driftX;
          const y =
            my * MOUSE_PARALLAX_RANGE * d * cfg.mouseY -
            scrollProgress * SCROLL_PARALLAX_MAX * d * cfg.scrollY +
            driftY;
          gsap.set(el, { x, y });
        });
      };

      const progressTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        onUpdate: () => {
          scrollProgress = progressTrigger.progress;
          setStagePassthrough(progressTrigger.progress >= 0.68);
          updateParallax();
        },
      });

      const stageTween = gsap.to(stageRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "35% top",
          end: "70% top",
          scrub: true,
        },
      });

      const onMove = (e: MouseEvent) => {
        mouseTargetRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouseTargetRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      };

      ScrollTrigger.addEventListener("refresh", updateParallax);
      window.addEventListener("mousemove", onMove);
      gsap.ticker.add(updateParallax);
      updateParallax();

      return () => {
        ScrollTrigger.removeEventListener("refresh", updateParallax);
        window.removeEventListener("mousemove", onMove);
        gsap.ticker.remove(updateParallax);
        progressTrigger.kill();
        stageTween.scrollTrigger?.kill();
      };
    },
    { scope: containerRef }
  );

  return (
    <>
      {!introDone && <ProposalIntro onComplete={() => setIntroDone(true)} />}

      <div
        ref={containerRef}
        className="relative w-full shrink-0"
        style={{ height: `${TRACK_VH}vh` }}
      />

      <div
        ref={stageRef}
        className={`fixed inset-0 z-45 h-dvh w-full overflow-hidden border-b border-black/5 bg-white ${
          stagePassthrough ? "pointer-events-none" : "pointer-events-auto"
        }`}
        style={{ opacity: 1 }}
      >
        <svg
          className="absolute inset-0 z-5 h-full w-full pointer-events-none"
          viewBox="0 0 1440 900"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <style>{`
              @keyframes streakFlow { 0% { stroke-dashoffset: 600; } 100% { stroke-dashoffset: -600; } }
              .streak { stroke-linecap: round; }
            `}</style>
          </defs>
          <path d="M200,0 Q1320,80 1440,180" stroke="#22c55e" strokeWidth="6" fill="none" opacity="0.38" strokeDasharray="100 200" style={{ animation: "streakFlow 28s linear infinite 14s" }} className="streak" />
          <path d="M160,0 Q1300,100 1440,220" stroke="#22c55e" strokeWidth="5.5" fill="none" opacity="0.35" strokeDasharray="90 210" style={{ animation: "streakFlow 32s linear infinite 17s" }} className="streak" />
          <path d="M240,900 Q120,780 0,620" stroke="#bdfa3c" strokeWidth="6" fill="none" opacity="0.38" strokeDasharray="100 200" style={{ animation: "streakFlow 28s linear infinite 15s" }} className="streak" />
          <path d="M200,900 Q100,820 0,720" stroke="#bdfa3c" strokeWidth="5.5" fill="none" opacity="0.35" strokeDasharray="90 210" style={{ animation: "streakFlow 32s linear infinite 18s" }} className="streak" />
        </svg>

        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255,255,255,0) 0%, rgba(255,255,255,0.95) 100%), radial-gradient(ellipse 120% 80% at 20% 20%, rgba(189,250,60,0.08) 0%, transparent 50%), radial-gradient(ellipse 100% 60% at 80% 80%, rgba(34,197,94,0.06) 0%, transparent 50%)",
            }}
          />
          <div
            className="absolute left-0 top-1/3 h-[min(60vw,500px)] w-[min(60vw,500px)] -translate-y-1/2 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(189,250,60,0.4) 0%, rgba(189,250,60,0.1) 40%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
          <div
            className="absolute right-0 bottom-1/4 h-[min(50vw,400px)] w-[min(50vw,400px)] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(34,197,94,0.35) 0%, rgba(34,197,94,0.08) 40%, transparent 70%)",
              filter: "blur(70px)",
            }}
          />
          <div
            className="absolute right-1/4 top-1/4 h-[min(40vw,320px)] w-[min(40vw,320px)] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(22,163,74,0.3) 0%, rgba(34,197,94,0.08) 45%, transparent 70%)",
              filter: "blur(65px)",
            }}
          />
          <div
            className="absolute left-1/3 bottom-0 h-[min(45vw,360px)] w-[min(45vw,360px)] -translate-x-1/2 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(5,150,105,0.25) 0%, transparent 60%)",
              filter: "blur(55px)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.03) 100%)",
            }}
          />
        </div>

        <div className="absolute left-1/2 top-1/2 z-10 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 px-[clamp(1.5rem,4vw,6rem)]">
          <div ref={emojisRef} className="relative flex flex-col items-center text-center">
            {EMOJI_CONFIG.map(({ emoji, delay, depth, opacity, ...pos }, i) => (
              <span
                key={i}
                data-emoji-item
                className="absolute text-xl md:text-2xl select-none pointer-events-none inline-block"
                style={{ ...(pos as CSSProperties), opacity }}
              >
                <span
                  className="hero-emoji-float block"
                  style={{ animationDelay: `${delay}s`, animationDuration: `${10 + i * 1.2}s` }}
                >
                  {emoji}
                </span>
              </span>
            ))}
            <span className="relative z-10 mb-3 font-mono text-[0.55rem] uppercase tracking-[0.3em] text-black/40">
              elevate sistemas
            </span>
            <h1 className="relative z-10 text-[clamp(2rem,10vw,5rem)] font-bold leading-[0.9] tracking-tight text-[#0A0A0A]">
              <EditableField
                value={data.titulo}
                onChange={(v) => set("titulo", v)}
                isAdmin={isAdmin}
                multiline
                className="block"
                placeholder="O que estamos propondo"
              />
            </h1>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center">
          <div className="hero-cta-bounce flex flex-col items-center gap-2 text-[#7D6B58]/60">
            <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em]">
              Role para ver o escopo completo
            </span>
            <div className="hero-cta-pulse">
              <ChevronDown className="h-5 w-5" strokeWidth={2} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
