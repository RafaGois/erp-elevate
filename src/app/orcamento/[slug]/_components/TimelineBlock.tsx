"use client";

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
  const etapas: TimelineEtapa[] = data.etapas ?? [];

  function setEtapa(i: number, partial: Partial<TimelineEtapa>) {
    const next = etapas.map((e, idx) => (idx === i ? { ...e, ...partial } : e));
    onChange?.({ ...data, etapas: next });
  }

  function addEtapa() {
    onChange?.({
      ...data,
      etapas: [
        ...etapas,
        {
          fase: `Fase ${etapas.length + 1}`,
          duracao: "1 semana",
          descricao: "Descrição desta fase do projeto.",
        },
      ],
    });
  }

  function removeEtapa(i: number) {
    onChange?.({ ...data, etapas: etapas.filter((_, idx) => idx !== i) });
  }

  function set<K extends keyof TimelineBlockData>(key: K, value: TimelineBlockData[K]) {
    onChange?.({ ...data, [key]: value });
  }

  return (
    <section className="py-[clamp(6rem,12vw,12rem)] border-b border-[#DCD8D0] bg-[#0A0A0A] text-[#FDFBF7] relative overflow-hidden">
      {/* Subtle dots pattern */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #FDFBF7 1px, transparent 1px)",
          backgroundSize: "35px 35px",
        }}
      />

      <div className="max-w-[clamp(90rem,95vw,140rem)] mx-auto px-[clamp(1.5rem,4vw,5rem)] relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[clamp(2rem,4vw,4rem)] mb-[clamp(5rem,8vw,8rem)]">
          <div className="md:col-span-2 pt-[0.5rem]">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#FDFBF7]/40">
              Cronograma
            </span>
          </div>
          <div className="md:col-span-8 border-t border-white/10 pt-[2rem]">
            <h2
              className="font-serif font-normal text-[#FDFBF7] leading-[0.95] tracking-tighter"
              style={{
                fontSize: "clamp(2.5rem,5vw,5.5rem)",
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              <EditableField
                value={data.titulo ?? "Como vamos chegar lá"}
                onChange={(v) => set("titulo", v)}
                isAdmin={isAdmin}
                multiline
                className="block text-[#FDFBF7]"
              />
            </h2>
          </div>
        </div>

        {/* Timeline rows */}
        <div className="flex flex-col gap-0">
          <AnimatePresence>
            {etapas.map((etapa, i) => (
              <motion.div
                key={i}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-[clamp(1.5rem,3vw,3rem)] py-[clamp(2rem,4vw,3.5rem)] border-t border-white/10 group/row relative"
              >
                {/* Step number */}
                <div className="md:col-span-1 flex items-start">
                  <span className="font-mono text-[0.6rem] text-[#D9381E]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Phase name + duration */}
                <div className="md:col-span-3 flex flex-col gap-[0.5rem]">
                  <EditableField
                    value={etapa.fase}
                    onChange={(v) => setEtapa(i, { fase: v })}
                    isAdmin={isAdmin}
                    className="font-serif font-normal text-[#FDFBF7] leading-[1.1] tracking-tight text-[clamp(1.25rem,1.75vw,1.5rem)]"
                    placeholder="Nome da fase"
                    tag="h3"
                    // @ts-ignore
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  />
                  <div className="flex items-center gap-[0.75rem]">
                    <span className="w-[1.5rem] h-[1px] bg-[#D9381E]" />
                    <EditableField
                      value={etapa.duracao}
                      onChange={(v) => setEtapa(i, { duracao: v })}
                      isAdmin={isAdmin}
                      className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-[#FDFBF7]/50"
                      placeholder="Duração"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="md:col-span-7">
                  <EditableField
                    value={etapa.descricao}
                    onChange={(v) => setEtapa(i, { descricao: v })}
                    isAdmin={isAdmin}
                    multiline
                    tag="p"
                    className="font-sans text-[0.875rem] text-[#FDFBF7]/60 leading-[1.8]"
                    placeholder="Descrição desta fase"
                  />
                </div>

                {/* Admin remove */}
                {isAdmin && (
                  <div className="md:col-span-1 flex items-start justify-end">
                    <button
                      onClick={() => removeEtapa(i)}
                      className="opacity-0 group-hover/row:opacity-100 transition-opacity text-[#FDFBF7]/30 hover:text-[#D9381E] p-1"
                      title="Remover etapa"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Add step */}
          {isAdmin && (
            <button
              onClick={addEtapa}
              className="flex items-center gap-[1rem] py-[2rem] border-t border-white/10 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-[#FDFBF7]/30 hover:text-[#FDFBF7]/70 transition-colors group/add"
            >
              <Plus size={14} className="group-hover/add:text-[#D9381E] transition-colors" />
              Adicionar fase
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
