"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, type CSSProperties } from "react";
import { ChevronDown } from "lucide-react";
import type { BudgetBlock, HeroBlockData } from "@/lib/types/budget-content";
import EditableField from "./EditableField";
import ProposalIntro from "./ProposalIntro";

gsap.registerPlugin(ScrollTrigger);

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

const MOUSE_PARALLAX_RANGE = 7;
const MOUSE_SMOOTH_TIME = 0.12;
const SCROLL_PARALLAX_Y_PX = 42;
const SCROLL_PARALLAX_X_PX = 30;

const EMOJI_DRIFT = {
  amp: 0.26,
  speed: 0.21,
} as const;

const EMOJI_CONFIG = [
  { emoji: "🟢", top: "-10%", left: "-8%", delay: 0, depth: 0.7, mouseX: 0.55, mouseY: 0.4, scrollX: -0.55, scrollY: 0.52, driftAmp: 1, driftSpeed: 1, phase: 0.2, opacity: 0.42 },
  { emoji: "✅", top: "5%", right: "-12%", delay: 0.3, depth: 0.9, mouseX: -0.35, mouseY: 0.6, scrollX: 0.48, scrollY: 0.85, driftAmp: 0.95, driftSpeed: 1.05, phase: 1.1, opacity: 0.44 },
  { emoji: "🌿", top: "-5%", right: "-5%", delay: 0.5, depth: 0.8, mouseX: 0.5, mouseY: -0.45, scrollX: 0.62, scrollY: 0.58, driftAmp: 1.05, driftSpeed: 0.92, phase: 2.4, opacity: 0.4 },
  { emoji: "💚", bottom: "10%", left: "-15%", delay: 0.2, depth: 0.85, mouseX: -0.45, mouseY: 0.45, scrollX: -0.5, scrollY: 0.68, driftAmp: 0.92, driftSpeed: 1.08, phase: 3.2, opacity: 0.38 },
  { emoji: "🟢", bottom: "-8%", right: "-10%", delay: 0.4, depth: 0.75, mouseX: 0.4, mouseY: -0.35, scrollX: 0.52, scrollY: 0.5, driftAmp: 1.02, driftSpeed: 0.98, phase: 4.4, opacity: 0.36 },
  { emoji: "🌱", bottom: "5%", right: "-18%", delay: 0.6, depth: 0.95, mouseX: -0.55, mouseY: 0.35, scrollX: -0.58, scrollY: 0.92, driftAmp: 0.98, driftSpeed: 1.02, phase: 5.1, opacity: 0.42 },
] as const;

function emojiShellStyle(cfg: (typeof EMOJI_CONFIG)[number]): CSSProperties {
  const style: CSSProperties = { opacity: cfg.opacity };
  if ("top" in cfg) style.top = cfg.top;
  if ("left" in cfg) style.left = cfg.left;
  if ("right" in cfg) style.right = cfg.right;
  if ("bottom" in cfg) style.bottom = cfg.bottom;
  return style;
}

export default function HeroBlock({
  data,
  blocks,
  isAdmin = false,
  onChange,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [introDone, setIntroDone] = useState(false);
  const [stagePassthrough, setStagePassthrough] = useState(false);

  const mouseTargetRef = useRef({ x: 0, y: 0 });
  const mouseSmoothRef = useRef({ x: 0, y: 0 });
  const scrollProgressRef = useRef(0);

  function set<K extends keyof HeroBlockData>(key: K, value: HeroBlockData[K]) {
    onChange?.({ ...data, [key]: value });
  }

  useGSAP(
    () => {
      const track = containerRef.current;
      const stage = stageRef.current;
      if (!track || !stage) return;

      const emojiEls = gsap.utils.toArray<HTMLElement>("[data-emoji-item]", stage);
      if (emojiEls.length === 0) return;

      let rafId = 0;
      let lastTs = performance.now();

      const applyParallax = () => {
        const mx = mouseSmoothRef.current.x;
        const my = mouseSmoothRef.current.y;
        const sp = scrollProgressRef.current;
        const t = performance.now() / 1000;

        for (let i = 0; i < emojiEls.length; i++) {
          const el = emojiEls[i];
          const cfg = EMOJI_CONFIG[i];
          if (!cfg) continue;

          const d = cfg.depth;
          const driftX =
            Math.sin(t * EMOJI_DRIFT.speed * cfg.driftSpeed + cfg.phase) *
            EMOJI_DRIFT.amp *
            cfg.driftAmp *
            d;
          const driftY =
            Math.cos(t * EMOJI_DRIFT.speed * 0.82 * cfg.driftSpeed + cfg.phase) *
            EMOJI_DRIFT.amp *
            cfg.driftAmp *
            d *
            0.62;

          const scrollX = sp * SCROLL_PARALLAX_X_PX * d * cfg.scrollX;
          const scrollY = sp * SCROLL_PARALLAX_Y_PX * d * cfg.scrollY;
          const x = mx * MOUSE_PARALLAX_RANGE * d * cfg.mouseX + driftX + scrollX;
          const y = my * MOUSE_PARALLAX_RANGE * d * cfg.mouseY - scrollY + driftY;

          gsap.set(el, { x, y, force3D: true });
        }
      };

      const loop = (now: number) => {
        const dt = Math.min((now - lastTs) / 1000, 0.05);
        lastTs = now;
        const k = 1 - Math.exp(-dt / MOUSE_SMOOTH_TIME);
        mouseSmoothRef.current.x +=
          (mouseTargetRef.current.x - mouseSmoothRef.current.x) * k;
        mouseSmoothRef.current.y +=
          (mouseTargetRef.current.y - mouseSmoothRef.current.y) * k;
        applyParallax();
        rafId = requestAnimationFrame(loop);
      };

      const progressTrigger = ScrollTrigger.create({
        trigger: track,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress;
          setStagePassthrough(self.progress >= 0.68);
        },
      });

      const stageTween = gsap.to(stage, {
        opacity: 0,
        scrollTrigger: {
          trigger: track,
          start: "35% top",
          end: "70% top",
          scrub: true,
        },
      });

      const onMove = (e: PointerEvent) => {
        mouseTargetRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouseTargetRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      rafId = requestAnimationFrame(loop);
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        applyParallax();
      });

      return () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener("pointermove", onMove);
        progressTrigger.kill();
        stageTween.scrollTrigger?.kill();
        stageTween.kill();
      };
    },
    { scope: stageRef, dependencies: [introDone] }
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
          <div className="relative flex flex-col items-center text-center">
            {EMOJI_CONFIG.map((cfg, i) => (
              <span
                key={i}
                className="absolute text-xl md:text-2xl select-none pointer-events-none inline-block"
                style={emojiShellStyle(cfg)}
              >
                {/* GSAP anima só este nó — o shell acima mantém top/left e não recebe transform do React */}
                <span
                  data-emoji-item
                  className="inline-block will-change-transform"
                >
                  <span
                    className="hero-emoji-float block"
                    style={{ animationDelay: `${cfg.delay}s`, animationDuration: `${10 + i * 1.2}s` }}
                  >
                    {cfg.emoji}
                  </span>
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
