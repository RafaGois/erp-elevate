"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import type { ServicosBlockData, ServicoItem } from "@/lib/types/budget-content";
import EditableField from "./EditableField";

const CARD_OFFSET = 28;
const STACK_OVERLAP = 12;

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
      gsap.set(cards, { opacity: 0, y: 32 });
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
              gsap.to(card, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" });
            } else if (!shouldShow && shown.has(i)) {
              shown.delete(i);
              gsap.to(card, { opacity: 0, y: 32, duration: 0.3 });
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
                className="absolute right-0 w-full max-w-md rounded-xl border border-black/10 bg-white p-5 shadow-md transition-shadow hover:shadow-lg md:p-6"
                style={{
                  top: i * CARD_OFFSET,
                  right: i * STACK_OVERLAP,
                  left: "auto",
                  width: "min(100%, 360px)",
                  zIndex: i,
                }}
              >
                <div className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#bdfa3c]/30 text-sm font-bold text-black">
                    {i + 1}
                  </span>
                  <div className="flex flex-col gap-1 min-w-0">
                    <h3 className="text-lg font-semibold text-black md:text-xl">
                      {item.titulo ?? item.nome}
                    </h3>
                    <span className="text-xs font-medium uppercase tracking-wider text-[#bdfa3c]">
                      Incluso
                    </span>
                  </div>
                </div>
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
