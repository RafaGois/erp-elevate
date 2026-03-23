"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import type { ServicosBlockData, ServicoItem } from "@/lib/types/budget-content";
import EditableField from "./EditableField";

const CARD_OFFSET = 28;
const STACK_OVERLAP = 12;

const WINDOW_VARIANTS = [
  { bar: "#A855F7", border: "#A855F7", shadow: "#6B21A8" },
  { bar: "#22D3EE", border: "#22D3EE", shadow: "#0891B2" },
  { bar: "#A855F7", border: "#A855F7", shadow: "#6B21A8" },
  { bar: "#22D3EE", border: "#22D3EE", shadow: "#0891B2" },
  { bar: "#EF4444", border: "#EF4444", shadow: "#B91C1C" },
  { bar: "#A855F7", border: "#A855F7", shadow: "#6B21A8" },
];

function toSysSlug(text: string, i: number): string {
  const slug = (text ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_")
    .toUpperCase()
    .replace(/[^A-Z0-9_]/g, "") || `SERVICE_${i + 1}`;
  return `SYS://${slug}`;
}

function ServicoRetroCard({ item, index }: { item: ServicoItem; index: number }) {
  const v = WINDOW_VARIANTS[index % WINDOW_VARIANTS.length];
  const sysLabel = toSysSlug(item.nome ?? item.titulo ?? "", index);

  return (
    <div
      className="retro-window flex flex-col overflow-hidden rounded-sm border-2 bg-white text-left"
      style={{
        borderColor: v.border,
        boxShadow: `6px 6px 0 ${v.shadow}`,
      }}
    >
      <div
        className="flex items-center justify-between px-2 py-1 text-white"
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
      <div className="border-t-2 border-neutral-300 bg-white p-2.5">
        <p className="font-mono text-xs font-semibold text-neutral-800">
          {"{ "}
          {item.titulo ?? item.nome ?? "Item"}
          {" }"}
        </p>
        <p className="mt-1 font-mono text-[11px] text-neutral-600">
          &gt; {(item.descricao ?? "").slice(0, 80)}
          {(item.descricao ?? "").length > 80 ? "..." : ""}
        </p>
        <div className="mt-1.5 flex items-center gap-1">
          <span className="rounded border border-neutral-300 bg-neutral-100 px-1.5 py-0.5 font-mono text-[10px] text-neutral-600">
            [X] INCLUSO
          </span>
        </div>
      </div>
    </div>
  );
}

interface Props {
  data: ServicosBlockData;
  isAdmin?: boolean;
  onChange?: (d: ServicosBlockData) => void;
}

export default function ServicosBlock({ data, isAdmin = false, onChange }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function set<K extends keyof ServicosBlockData>(key: K, value: ServicosBlockData[K]) {
    onChange?.({ ...data, [key]: value });
  }

  const servicos = data.itens ?? data.servicos ?? [];
  const n = Math.max(servicos.length, 1);

  useGSAP(
    () => {
      if (!sectionRef.current || !pinRef.current || !cardsRef.current || servicos.length === 0) return;
      gsap.registerPlugin(ScrollTrigger);

      const cards = cardsRef.current.querySelectorAll("[data-service-card]");
      gsap.set(cards, { scale: 0 });
      const shown = new Set<number>();

      const vhPerItem = 50;
      const scrollDistance = () => `+=${(window.innerHeight * n * vhPerItem) / 100}`;

      const pinTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: pinRef.current,
        start: "top top",
        end: scrollDistance(),
        onUpdate: (self) => {
          const progress = self.progress;
          const step = Math.min(Math.floor(progress * n), n - 1);
          setActiveIndex(step);
          cards.forEach((card, i) => {
            const threshold = (i + 0.2) / n;
            const shouldShow = progress >= threshold;
            if (shouldShow && !shown.has(i)) {
              shown.add(i);
              gsap.to(card, { scale: 1, duration: 0.4, ease: "power2.out", overwrite: true });
            } else if (!shouldShow && shown.has(i)) {
              shown.delete(i);
              gsap.to(card, { scale: 0, duration: 0.3, ease: "power2.in", overwrite: true });
            }
          });
        },
      });

      return () => pinTrigger.kill();
    },
    { scope: sectionRef, dependencies: [servicos.length] }
  );

  const active = servicos[activeIndex] ?? servicos[0];

  return (
    <section id="servicos" ref={sectionRef} className="proposal-section relative bg-white">
      <div ref={pinRef} className="proposal-container relative z-10 bg-white py-20 md:py-28">
        <header className="mb-12 md:mb-16 text-center">
          <h2 className="text-3xl font-bold text-black md:text-4xl lg:text-5xl">
            <EditableField
              value={data.titulo ?? "O que está incluso"}
              onChange={(v) => set("titulo", v)}
              isAdmin={isAdmin}
              className="block"
            />
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-[#7D6B58]">
            <EditableField
              value={data.subtitulo ?? "Tudo que sua empresa precisa para uma presença digital sólida."}
              onChange={(v) => set("subtitulo", v)}
              isAdmin={isAdmin}
              tag="span"
              className="inline"
            />
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_minmax(320px,420px)] lg:gap-12 lg:items-start min-h-[50vh]">
          {/* Coluna esquerda: texto que muda conforme o card ativo */}
          <div className="order-1">
            <ServiceDetail key={activeIndex} item={active} index={activeIndex} />
          </div>

          {/* Coluna direita: cards empilhados */}
          <div
            ref={cardsRef}
            className="relative order-2 min-h-[280px] md:min-h-[320px] lg:min-h-[340px]"
          >
            {servicos.map((item, i) => (
              <div
                key={i}
                data-service-card
                className="absolute right-0 w-full max-w-md"
                style={{
                  top: i * CARD_OFFSET,
                  right: i * STACK_OVERLAP,
                  left: "auto",
                  width: "min(100%, 360px)",
                  zIndex: i,
                }}
              >
                <ServicoRetroCard item={item} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceDetail({ item, index }: { item?: ServicoItem; index: number }) {
  if (!item) return null;

  return (
    <div className="space-y-4">
      <span className="text-xs font-medium uppercase tracking-wider text-[#bdfa3c]">
        Serviço {index + 1} — Incluso
      </span>
      <h3 className="text-2xl font-bold text-black md:text-3xl">
        {item.titulo ?? item.nome}
      </h3>
      <p className="text-base text-black/70 leading-relaxed md:text-lg">
        {item.descricao}
      </p>
    </div>
  );
}
