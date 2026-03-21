"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import type { EquipeBlockData, EquipeItem } from "@/lib/types/budget-content";
import EditableField from "./EditableField";

interface Props {
  data: EquipeBlockData;
  isAdmin?: boolean;
  onChange?: (d: EquipeBlockData) => void;
}

const EMPTY_MEMBRO: EquipeItem = {
  nome: "Novo Colaborador",
  cargo: "Cargo",
  bio: "Breve descrição sobre este profissional.",
};

export default function EquipeBlock({ data, isAdmin = false, onChange }: Props) {
  const membros: EquipeItem[] = data.membros ?? [];

  function setMembro(i: number, partial: Partial<EquipeItem>) {
    const next = membros.map((m, idx) => (idx === i ? { ...m, ...partial } : m));
    onChange?.({ ...data, membros: next });
  }

  function addMembro() {
    onChange?.({ ...data, membros: [...membros, { ...EMPTY_MEMBRO }] });
  }

  function removeMembro(i: number) {
    onChange?.({ ...data, membros: membros.filter((_, idx) => idx !== i) });
  }

  function set<K extends keyof EquipeBlockData>(key: K, value: EquipeBlockData[K]) {
    onChange?.({ ...data, [key]: value });
  }

  return (
    <section className="py-[clamp(6rem,12vw,12rem)] border-b border-[#DCD8D0] bg-[#0A0A0A] text-[#FDFBF7] relative overflow-hidden">
      {/* Dots pattern */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
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
              Equipe
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
                value={data.titulo ?? "Quem vai trabalhar no seu projeto"}
                onChange={(v) => set("titulo", v)}
                isAdmin={isAdmin}
                multiline
                className="block text-[#FDFBF7]"
              />
            </h2>
          </div>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-white/10">
          <AnimatePresence>
            {membros.map((membro, i) => (
              <motion.div
                key={i}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative border-b border-r border-white/10 p-[clamp(2rem,3vw,3rem)] flex flex-col gap-[1.5rem] group/card overflow-hidden"
              >
                {/* Avatar placeholder */}
                <div className="w-[4rem] h-[4rem] bg-white/[0.06] border border-white/10 flex items-center justify-center">
                  <span className="font-serif text-[1.5rem] text-white/30" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {membro.nome.charAt(0)}
                  </span>
                </div>

                <div className="flex flex-col gap-[0.5rem]">
                  <EditableField
                    value={membro.nome}
                    onChange={(v) => setMembro(i, { nome: v })}
                    isAdmin={isAdmin}
                    className="font-serif font-normal text-[#FDFBF7] leading-[1.1] tracking-tight text-[clamp(1.25rem,1.5vw,1.5rem)]"
                    tag="h3"
                    placeholder="Nome"
                  />
                  <EditableField
                    value={membro.cargo ?? ""}
                    onChange={(v) => setMembro(i, { cargo: v })}
                    isAdmin={isAdmin}
                    className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-[#D9381E]"
                    placeholder="Cargo"
                  />
                </div>

                <EditableField
                  value={membro.bio ?? ""}
                  onChange={(v) => setMembro(i, { bio: v })}
                  isAdmin={isAdmin}
                  multiline
                  tag="p"
                  className="font-sans text-[0.8rem] text-[#FDFBF7]/50 leading-[1.7]"
                  placeholder="Breve bio..."
                />

                {/* Admin remove */}
                {isAdmin && (
                  <button
                    onClick={() => removeMembro(i)}
                    className="absolute top-[1rem] right-[1rem] opacity-0 group-hover/card:opacity-100 transition-opacity text-white/20 hover:text-[#D9381E] p-1"
                    title="Remover membro"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Add member */}
          {isAdmin && (
            <button
              onClick={addMembro}
              className="border-b border-r border-white/10 border-dashed min-h-[16rem] flex flex-col items-center justify-center gap-[1rem] text-white/20 hover:text-white/50 hover:bg-white/[0.03] transition-all group/add"
            >
              <Plus size={18} className="group-hover/add:text-[#D9381E] transition-colors" />
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.15em]">
                Adicionar membro
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
