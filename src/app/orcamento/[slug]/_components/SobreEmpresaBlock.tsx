"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { SobreEmpresaBlockData } from "@/lib/types/budget-content";
import EditableField from "./EditableField";

const GLOW_RADIUS = 140;
const GLOW_DELAY_MS = 90;
const GLOW_FADE_MS = 320;

const DEFAULT_FOTO =
  "https://res.cloudinary.com/dn454izoh/image/upload/v1755006181/us_agf6k4.png?q=80&w=1200&auto=format&fit=crop";

interface Props {
  data: SobreEmpresaBlockData;
  isAdmin?: boolean;
  onChange?: (d: SobreEmpresaBlockData) => void;
}

export default function SobreEmpresaBlock({ data, isAdmin = false, onChange }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  function set<K extends keyof SobreEmpresaBlockData>(key: K, value: SobreEmpresaBlockData[K]) {
    onChange?.({ ...data, [key]: value });
  }

  useGSAP(
    () => {
      if (!container.current || !leftRef.current || !rightRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      gsap.set([leftRef.current, rightRef.current], { opacity: 0, y: 32 });

      const tl = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
      tl.to(leftRef.current, { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" }).to(
        rightRef.current,
        { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" },
        "-=0.4"
      );
    },
    { scope: container }
  );

  const diferenciais = data.diferenciais ?? data.destaques ?? [];
  const titulo = (data.titulo ?? "Quem somos").trim();
  const partes = titulo.split(/\s+/, 2);
  const linha1 = partes[0] ?? titulo;
  const linha2 = partes[1] ?? "";

  const cx = 1720;
  const cy = 1000;
  const svgRef = useRef<SVGSVGElement>(null);
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);
  const [glowPos, setGlowPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const svg = svgRef.current;
      const section = container.current;
      if (!svg || !section) return;
      const sectionRect = section.getBoundingClientRect();
      const inSection =
        e.clientX >= sectionRect.left &&
        e.clientX <= sectionRect.right &&
        e.clientY >= sectionRect.top &&
        e.clientY <= sectionRect.bottom;
      if (!inSection) {
        setMouse(null);
        return;
      }
      const svgRect = svg.getBoundingClientRect();
      const x = ((e.clientX - svgRect.left) / svgRect.width) * 1440;
      const y = ((e.clientY - svgRect.top) / svgRect.height) * 900;
      const pos = { x, y };
      setMouse(pos);
      setGlowPos(pos);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={container}
      id="sobre"
      className="proposal-section relative overflow-hidden bg-zinc-950"
    >
      {/* Arcos concêntricos — profundidade e identidade elevate */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 85% 95%, rgba(34,197,94,0.04) 0%, transparent 50%), linear-gradient(180deg, transparent 0%, rgba(189,250,60,0.02) 50%, transparent 100%)",
        }}
      />
      <svg
        ref={svgRef}
        className="absolute inset-0 z-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 900"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient
            id="arcGlowGrad"
            gradientUnits="userSpaceOnUse"
            cx={glowPos?.x ?? -1000}
            cy={glowPos?.y ?? -1000}
            r={GLOW_RADIUS}
            fx={glowPos?.x ?? -1000}
            fy={glowPos?.y ?? -1000}
          >
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="60%" stopColor="white" stopOpacity="0.4" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="arcGlowMask">
            <rect width="100%" height="100%" fill="black" />
            <circle
              cx={glowPos?.x ?? -1000}
              cy={glowPos?.y ?? -1000}
              r={GLOW_RADIUS}
              fill="url(#arcGlowGrad)"
            />
          </mask>
        </defs>
        {/* Arcos base: da direita para a esquerda */}
        <g strokeLinecap="round" fill="none">
          {[...Array(24)].map((_, i) => {
            const r = 360 + i * 42;
            const useLime = i % 2 === 0;
            const alpha = Math.max(0.06, 0.2 - i * 0.006);
            const strokeW = Math.max(0.75, 1.1 - i * 0.012);
            return (
              <path
                key={i}
                d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx} ${cy - r}`}
                stroke={useLime ? `rgba(189,250,60,${alpha})` : `rgba(34,197,94,${alpha})`}
                strokeWidth={strokeW}
              />
            );
          })}
        </g>
        {/* Arcos "acesos" — camada brilhante visível apenas perto do cursor, com delay ao apagar */}
        <g
          strokeLinecap="round"
          fill="none"
          mask="url(#arcGlowMask)"
          style={{
            opacity: mouse ? 1 : 0,
            transition: `opacity ${GLOW_FADE_MS}ms ease-out ${GLOW_DELAY_MS}ms`,
          }}
        >
          {[...Array(24)].map((_, i) => {
            const r = 360 + i * 42;
            const useLime = i % 2 === 0;
            const alpha = Math.max(0.5, 0.7 - i * 0.01);
            const strokeW = Math.max(1, 1.8 - i * 0.02);
            return (
              <path
                key={i}
                d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx} ${cy - r}`}
                stroke={useLime ? `rgba(220,255,120,${alpha})` : `rgba(74,222,128,${alpha})`}
                strokeWidth={strokeW}
              />
            );
          })}
        </g>
      </svg>

      <div className="proposal-container relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Coluna esquerda — identidade visual */}
          <div ref={leftRef} className="lg:col-span-5 space-y-8">
            <div className="space-y-0">
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white/95 tracking-tight leading-[0.85]">
                {linha2 ? (
                  <>
                    <EditableField
                      value={linha1}
                      onChange={(v) => set("titulo", `${v} ${linha2}`)}
                      isAdmin={isAdmin}
                      className="block"
                    />
                    <br />
                    <span className="text-[#bdfa3c] block -mt-0.5">
                      <EditableField
                        value={linha2}
                        onChange={(v) => set("titulo", `${linha1} ${v}`)}
                        isAdmin={isAdmin}
                        className="block"
                      />
                    </span>
                  </>
                ) : (
                  <EditableField
                    value={titulo}
                    onChange={(v) => set("titulo", v)}
                    isAdmin={isAdmin}
                    className="block"
                  />
                )}
              </h2>
            </div>

            <div className="flex items-center gap-0">
              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white/20 shrink-0 ring-2 ring-zinc-800/80 z-10">
                <Image
                  src={data.foto ?? DEFAULT_FOTO}
                  alt="Equipe"
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-[#bdfa3c]/50 shrink-0 -ml-4 ring-2 ring-zinc-950 z-20">
                <Image
                  src={data.foto ?? DEFAULT_FOTO}
                  alt="Equipe"
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-[#bdfa3c]/60 shrink-0 -ml-4 ring-2 ring-zinc-950 z-30">
                <Image
                  src={data.foto ?? DEFAULT_FOTO}
                  alt="Equipe"
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
            </div>
          </div>

          {/* Coluna direita — conteúdo */}
          <div ref={rightRef} className="lg:col-span-7 space-y-8">
            <div className="text-lg md:text-xl leading-relaxed text-zinc-300 max-w-2xl space-y-4">
              <EditableField
                value={
                  data.descricao ??
                  "Somos uma equipe especializada em transformar ideias em experiências digitais memoráveis."
                }
                onChange={(v) => set("descricao", v)}
                isAdmin={isAdmin}
                multiline
                tag="p"
                className="block"
              />
            </div>

            <div>
              <h3 className="text-sm font-medium uppercase tracking-widest text-[#bdfa3c] mb-4">
                Nossos diferenciais
              </h3>
              <ul className="flex flex-col gap-3">
                {diferenciais.length > 0 ? (
                  diferenciais.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-zinc-300">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#bdfa3c]" />
                      <span>{item}</span>
                    </li>
                  ))
                ) : (
                  <li className="flex items-center gap-3 text-zinc-500 text-sm">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-600" />
                    <span>Adicione diferenciais no painel admin</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Marcador decorativo de fim de seção */}
            <div className="flex items-center gap-2 pt-4">
              <span className="h-px w-8 bg-[#bdfa3c]/50" />
              <span className="text-[#bdfa3c]/40 text-xs font-mono">elevate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
