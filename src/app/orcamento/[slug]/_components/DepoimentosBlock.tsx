"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import type { DepoimentosBlockData, DepoimentoItem } from "@/lib/types/budget-content";
import EditableField from "./EditableField";

const GREEN_VARIANTS = [
  { bar: "#bdfa3c", border: "#22c55e", shadow: "#166534" },
  { bar: "#86efac", border: "#16a34a", shadow: "#15803d" },
  { bar: "#4ade80", border: "#22c55e", shadow: "#166534" },
  { bar: "#bdfa3c", border: "#16a34a", shadow: "#15803d" },
  { bar: "#86efac", border: "#22c55e", shadow: "#166534" },
  { bar: "#4ade80", border: "#16a34a", shadow: "#15803d" },
];

function toSysSlug(text: string, i: number): string {
  const slug = (text ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_")
    .toUpperCase()
    .replace(/[^A-Z0-9_]/g, "") || `CLIENT_${i + 1}`;
  return `SYS://${slug}`;
}

function DepoimentoRetroCard({ item, index }: { item: DepoimentoItem; index: number }) {
  const v = GREEN_VARIANTS[index % GREEN_VARIANTS.length];
  const sysLabel = toSysSlug(item.autor ?? "", index);

  return (
    <div
      className="retro-window flex flex-col overflow-hidden rounded-sm border-2 bg-white text-left"
      style={{
        borderColor: v.border,
        boxShadow: `6px 6px 0 ${v.shadow}`,
      }}
    >
      <div
        className="flex items-center justify-between px-2 py-1.5 text-black/90"
        style={{ backgroundColor: v.bar }}
      >
        <span className="font-mono text-[10px] font-bold tracking-wide">
          {sysLabel}
        </span>
        <div className="flex gap-0.5">
          <span className="h-2.5 w-2.5 rounded-sm border border-black/30 bg-white/90" />
          <span className="h-2.5 w-2.5 rounded-sm border border-black/30 bg-white/90" />
          <span className="h-2.5 w-2.5 rounded-sm border border-black/30 bg-red-400" />
        </div>
      </div>
      <div className="flex flex-1 flex-col border-t-2 border-neutral-300 bg-white p-4 md:p-5">
        <span className="text-3xl font-serif leading-none text-[#22c55e]/30 select-none">"</span>
        <p className="mt-2 font-mono text-[13px] text-neutral-700 leading-relaxed md:text-sm">
          {item.texto}
        </p>
        <div className="mt-5 flex items-center gap-3 border-t border-neutral-200 pt-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-neutral-300 bg-neutral-100 font-mono text-xs font-bold text-neutral-600">
            {(item.autor ?? "?").charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="font-mono text-xs font-semibold text-black">{item.autor}</p>
            {item.cargo && (
              <p className="font-mono text-[11px] text-neutral-500">{item.cargo}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface Props {
  data: DepoimentosBlockData;
  isAdmin?: boolean;
  onChange?: (d: DepoimentosBlockData) => void;
}

export default function DepoimentosBlock({ data, isAdmin = false, onChange }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  function set<K extends keyof DepoimentosBlockData>(key: K, value: DepoimentosBlockData[K]) {
    onChange?.({ ...data, [key]: value });
  }

  useGSAP(
    () => {
      if (!container.current || !cardsRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const cards = cardsRef.current.querySelectorAll("[data-depoimento-card]");
      gsap.set(cards, { scale: 0 });
      gsap.to(cards, {
        scale: 1,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: container }
  );

  const itens = data.itens ?? [];

  return (
    <section id="depoimentos" ref={container} className="proposal-section bg-white">
      <div className="proposal-container">
        <header className="mb-12 md:mb-16">
          <h2 className="text-4xl font-bold text-black md:text-5xl">
            <EditableField
              value={data.titulo ?? "O que nossos clientes dizem"}
              onChange={(v) => set("titulo", v)}
              isAdmin={isAdmin}
              className="block"
            />
          </h2>
          <p className="mt-2 max-w-xl text-[#7D6B58]">
            Depoimentos de quem já confiou no nosso trabalho.
          </p>
        </header>

        <div ref={cardsRef} className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {itens.map((item, i) => (
            <div
              key={i}
              data-depoimento-card
            >
              <DepoimentoRetroCard item={item} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
