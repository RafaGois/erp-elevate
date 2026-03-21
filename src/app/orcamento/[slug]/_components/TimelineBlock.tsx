"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import type { TimelineBlockData, TimelineEtapa } from "@/lib/types/budget-content";
import EditableField from "./EditableField";

interface Props {
  data: TimelineBlockData;
  isAdmin?: boolean;
  onChange?: (d: TimelineBlockData) => void;
}

export default function TimelineBlock({ data, isAdmin = false, onChange }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const etapas: TimelineEtapa[] = data.etapas ?? [];

  function setEtapa(i: number, partial: Partial<TimelineEtapa>) {
    onChange?.({ ...data, etapas: etapas.map((e, idx) => (idx === i ? { ...e, ...partial } : e)) });
  }
  function addEtapa() {
    onChange?.({
      ...data,
      etapas: [...etapas, { fase: `Fase ${etapas.length + 1}`, duracao: "1 semana", descricao: "Descrição." }],
    });
  }
  function removeEtapa(i: number) {
    onChange?.({ ...data, etapas: etapas.filter((_, idx) => idx !== i) });
  }
  function set<K extends keyof TimelineBlockData>(key: K, value: TimelineBlockData[K]) {
    onChange?.({ ...data, [key]: value });
  }

  useGSAP(
    () => {
      if (!container.current || !itemsRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const items = itemsRef.current.querySelectorAll("[data-timeline-item]");
      gsap.set(items, { opacity: 0, x: -20 });
      gsap.to(items, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: itemsRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: container }
  );

  return (
    <section id="cronograma" ref={container} className="proposal-section bg-white">
      <div className="proposal-container">
        <h2 className="text-center text-3xl font-bold text-black md:text-4xl lg:text-5xl">
          <EditableField
            value={data.titulo ?? "Como vai funcionar"}
            onChange={(v) => set("titulo", v)}
            isAdmin={isAdmin}
            multiline
            className="block"
          />
        </h2>
        <p className="mt-4 text-center text-lg text-[#7D6B58]">
          Da primeira reunião ao lançamento — cada etapa planejada para você.
        </p>

        <div ref={itemsRef} className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
          <AnimatePresence>
            {etapas.map((etapa, i) => (
              <motion.div
                key={i}
                layout
                data-timeline-item
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="group flex gap-4 rounded-xl border border-black/10 bg-black/[0.02] p-5 transition-colors hover:border-black/15 hover:bg-black/[0.03] md:p-6"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-black/10 bg-[#bdfa3c]/20 text-[#7D6B58] font-mono text-xs">
                  {etapa.duracao}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-black">
                    <EditableField
                      value={etapa.fase}
                      onChange={(v) => setEtapa(i, { fase: v })}
                      isAdmin={isAdmin}
                      className="inline"
                      placeholder="Fase"
                    />
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-black/60">
                    <EditableField
                      value={etapa.descricao}
                      onChange={(v) => setEtapa(i, { descricao: v })}
                      isAdmin={isAdmin}
                      multiline
                      tag="span"
                      className="inline"
                      placeholder="Descrição"
                    />
                  </p>
                </div>
                {isAdmin && (
                  <button
                    onClick={() => removeEtapa(i)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-black/30 hover:text-black/60 p-1"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {isAdmin && (
          <button
            onClick={addEtapa}
            className="mt-6 flex items-center gap-2 rounded-xl border border-dashed border-black/20 bg-black/[0.02] px-6 py-4 text-sm text-black/50 hover:border-black/30 hover:bg-black/[0.04] hover:text-black/70 transition-colors"
          >
            <Plus size={16} />
            Adicionar fase
          </button>
        )}
      </div>
    </section>
  );
}
