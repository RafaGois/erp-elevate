"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Crown, Plus, Trash2 } from "lucide-react";
import type { PacoteItem, PrecoBlockData } from "@/lib/types/budget-content";
import EditableField from "./EditableField";

interface Props {
  data: PrecoBlockData;
  isAdmin?: boolean;
  onChange?: (d: PrecoBlockData) => void;
}

const EMPTY_PACOTE: PacoteItem = {
  nome: "Novo Pacote",
  descricao: "Descrição do pacote.",
  valor: 0,
  parcelas: "",
  inclui: ["Item incluído"],
  destaque: false,
};

export default function PrecoBlock({ data, isAdmin = false, onChange }: Props) {
  const pacotes: PacoteItem[] = data.pacotes ?? [];

  function update(next: PacoteItem[]) {
    onChange?.({ ...data, pacotes: next });
  }

  function setPacote(i: number, partial: Partial<PacoteItem>) {
    update(pacotes.map((p, idx) => (idx === i ? { ...p, ...partial } : p)));
  }

  function setDestaque(i: number) {
    update(pacotes.map((p, idx) => ({ ...p, destaque: idx === i })));
  }

  function addPacote() {
    update([...pacotes, { ...EMPTY_PACOTE }]);
  }

  function removePacote(i: number) {
    const next = pacotes.filter((_, idx) => idx !== i);
    const hasDestaque = next.some((p) => p.destaque);
    if (!hasDestaque && next.length > 0) next[0].destaque = true;
    update(next);
  }

  function setIncluiItem(pi: number, ii: number, value: string) {
    const p = pacotes[pi];
    const inclui = p.inclui.map((it, idx) => (idx === ii ? value : it));
    setPacote(pi, { inclui });
  }

  function addIncluiItem(pi: number) {
    setPacote(pi, { inclui: [...(pacotes[pi].inclui ?? []), "Novo item"] });
  }

  function removeIncluiItem(pi: number, ii: number) {
    setPacote(pi, { inclui: pacotes[pi].inclui.filter((_, idx) => idx !== ii) });
  }

  function set<K extends keyof PrecoBlockData>(key: K, value: PrecoBlockData[K]) {
    onChange?.({ ...data, [key]: value });
  }

  const colClass =
    pacotes.length === 1
      ? "grid-cols-1 max-w-[32rem] mx-auto"
      : pacotes.length === 2
        ? "grid-cols-1 md:grid-cols-2"
        : "grid-cols-1 md:grid-cols-3";

  return (
    <section className="py-[clamp(6rem,12vw,12rem)] border-b border-[#DCD8D0] bg-[#FDFBF7] relative">
      <div className="max-w-[clamp(90rem,95vw,140rem)] mx-auto px-[clamp(1.5rem,4vw,5rem)]">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[clamp(2rem,4vw,4rem)] mb-[clamp(5rem,8vw,8rem)]">
          <div className="md:col-span-2 pt-[0.5rem]">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#555555]/60">
              Investimento
            </span>
          </div>
          <div className="md:col-span-7 border-t border-[#DCD8D0] pt-[2rem]">
            <h2
              className="font-serif font-normal text-[#0A0A0A] leading-[0.95] tracking-tighter"
              style={{
                fontSize: "clamp(2.5rem,5vw,5.5rem)",
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              <EditableField
                value={data.titulo ?? "Escolha seu plano"}
                onChange={(v) => set("titulo", v)}
                isAdmin={isAdmin}
                multiline
                className="block"
              />
            </h2>
          </div>
          <div className="md:col-span-3">
            <EditableField
              value={data.subtitulo ?? "Opções flexíveis para cada momento do seu negócio."}
              onChange={(v) => set("subtitulo", v)}
              isAdmin={isAdmin}
              multiline
              tag="p"
              className="font-sans text-[0.875rem] text-[#555555] leading-[1.7] md:pt-[3rem]"
            />
          </div>
        </div>

        {/* Pricing cards */}
        <div className={`grid ${colClass} gap-[0] border-t border-l border-[#DCD8D0]`}>
          <AnimatePresence>
            {pacotes.map((pacote, pi) => {
              const isDestaque = !!pacote.destaque;
              return (
                <motion.div
                  key={pi}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`relative flex flex-col border-b border-r border-[#DCD8D0] overflow-hidden group/card ${
                    isDestaque ? "bg-[#0A0A0A]" : "bg-[#FDFBF7]"
                  }`}
                >
                  {/* Destaque accent top border */}
                  {isDestaque && (
                    <div className="absolute top-0 inset-x-0 h-[2px] bg-[#D9381E]" />
                  )}

                  <div className="p-[clamp(2rem,3.5vw,3.5rem)] flex flex-col flex-1 gap-[2rem]">
                    {/* Card header */}
                    <div className="flex items-start justify-between gap-[1rem]">
                      <div className="flex flex-col gap-[0.5rem]">
                        {/* Package label */}
                        {isDestaque && (
                          <div className="flex items-center gap-[0.5rem]">
                            <Crown size={10} className="text-[#D9381E]" />
                            <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-[#D9381E]">
                              Recomendado
                            </span>
                          </div>
                        )}
                        <EditableField
                          value={pacote.nome}
                          onChange={(v) => setPacote(pi, { nome: v })}
                          isAdmin={isAdmin}
                          className={`font-serif font-normal leading-[1.1] tracking-tight text-[clamp(1.5rem,2vw,2rem)] ${
                            isDestaque ? "text-[#FDFBF7]" : "text-[#0A0A0A]"
                          }`}
                          tag="h3"
                          placeholder="Nome do pacote"
                        />
                      </div>

                      {/* Admin controls */}
                      {isAdmin && (
                        <div className="flex items-center gap-[0.5rem] opacity-0 group-hover/card:opacity-100 transition-opacity flex-shrink-0 mt-[0.25rem]">
                          <button
                            onClick={() => setDestaque(pi)}
                            title={isDestaque ? "Já é destaque" : "Tornar destaque"}
                            className={`p-1 transition-colors ${
                              isDestaque
                                ? "text-[#D9381E]"
                                : "text-[#555555]/40 hover:text-[#D9381E]"
                            }`}
                          >
                            <Crown size={12} />
                          </button>
                          <button
                            onClick={() => removePacote(pi)}
                            title="Remover pacote"
                            className="p-1 text-[#555555]/40 hover:text-[#D9381E] transition-colors"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <EditableField
                      value={pacote.descricao ?? ""}
                      onChange={(v) => setPacote(pi, { descricao: v })}
                      isAdmin={isAdmin}
                      multiline
                      tag="p"
                      className={`font-sans text-[0.8rem] leading-[1.7] ${
                        isDestaque ? "text-[#FDFBF7]/60" : "text-[#555555]"
                      }`}
                      placeholder="Descrição do pacote"
                    />

                    {/* Price */}
                    <div className="flex flex-col gap-[0.25rem]">
                      <div className="flex items-baseline gap-[0.5rem]">
                        <span
                          className={`font-sans text-[0.75rem] font-light ${
                            isDestaque ? "text-[#FDFBF7]/50" : "text-[#555555]/60"
                          }`}
                        >
                          {pacote.moeda ?? "R$"}
                        </span>
                        <EditableField
                          value={String(pacote.valor)}
                          onChange={(v) => setPacote(pi, { valor: parseFloat(v) || 0 })}
                          isAdmin={isAdmin}
                          className={`font-serif font-normal leading-none tracking-tighter text-[clamp(2.5rem,4vw,3.5rem)] ${
                            isDestaque ? "text-[#FDFBF7]" : "text-[#0A0A0A]"
                          }`}
                          placeholder="0"
                          tag="span"
                        />
                      </div>
                      {pacote.parcelas && (
                        <EditableField
                          value={pacote.parcelas}
                          onChange={(v) => setPacote(pi, { parcelas: v })}
                          isAdmin={isAdmin}
                          className={`font-mono text-[0.6rem] ${
                            isDestaque ? "text-[#FDFBF7]/40" : "text-[#555555]/50"
                          }`}
                          placeholder="Parcelas"
                        />
                      )}
                    </div>

                    {/* Divider */}
                    <div className={`h-[1px] ${isDestaque ? "bg-white/10" : "bg-[#DCD8D0]"}`} />

                    {/* Includes list */}
                    <div className="flex flex-col gap-[0.75rem] flex-1">
                      {(pacote.inclui ?? []).map((item, ii) => (
                        <div key={ii} className="flex items-start gap-[0.75rem] group/item">
                          <Check
                            size={12}
                            className={`flex-shrink-0 mt-[0.25rem] ${
                              isDestaque ? "text-[#D9381E]" : "text-[#D9381E]"
                            }`}
                          />
                          <EditableField
                            value={item}
                            onChange={(v) => setIncluiItem(pi, ii, v)}
                            isAdmin={isAdmin}
                            className={`font-sans text-[0.8rem] leading-[1.6] flex-1 ${
                              isDestaque ? "text-[#FDFBF7]/80" : "text-[#555555]"
                            }`}
                            placeholder="Item incluso"
                          />
                          {isAdmin && (
                            <button
                              onClick={() => removeIncluiItem(pi, ii)}
                              className="opacity-0 group-hover/item:opacity-100 transition-opacity flex-shrink-0 text-[#555555]/30 hover:text-[#D9381E]"
                            >
                              <Trash2 size={10} />
                            </button>
                          )}
                        </div>
                      ))}
                      {isAdmin && (
                        <button
                          onClick={() => addIncluiItem(pi)}
                          className={`flex items-center gap-[0.5rem] font-mono text-[0.55rem] uppercase tracking-[0.15em] transition-colors mt-[0.5rem] ${
                            isDestaque
                              ? "text-[#FDFBF7]/20 hover:text-[#FDFBF7]/50"
                              : "text-[#555555]/30 hover:text-[#555555]/70"
                          }`}
                        >
                          <Plus size={10} />
                          Adicionar item
                        </button>
                      )}
                    </div>

                    {/* CTA */}
                    <div
                      className={`mt-auto pt-[1.5rem] border-t ${
                        isDestaque ? "border-white/10" : "border-[#DCD8D0]"
                      }`}
                    >
                      <div
                        className={`w-full py-[1rem] flex items-center justify-center font-mono text-[0.6rem] uppercase tracking-[0.2em] transition-colors ${
                          isDestaque
                            ? "bg-[#FDFBF7] text-[#0A0A0A] hover:bg-[#F4F1EA]"
                            : "bg-[#0A0A0A] text-[#FDFBF7] hover:bg-[#1a1a1a]"
                        }`}
                      >
                        Escolher plano
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Add package tile */}
          {isAdmin && (
            <button
              onClick={addPacote}
              className="border-b border-r border-[#DCD8D0] border-dashed min-h-[20rem] flex flex-col items-center justify-center gap-[1rem] text-[#555555]/30 hover:text-[#555555]/70 hover:bg-[#F4F1EA] transition-all group/add"
            >
              <Plus
                size={20}
                className="group-hover/add:text-[#D9381E] transition-colors"
              />
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em]">
                Novo pacote
              </span>
            </button>
          )}
        </div>

        {/* Observation note */}
        {data.observacao && (
          <div className="mt-[3rem] flex items-start gap-[1.5rem]">
            <span className="w-[1.5rem] h-[1px] bg-[#DCD8D0] flex-shrink-0 mt-[0.65rem]" />
            <EditableField
              value={data.observacao}
              onChange={(v) => set("observacao", v)}
              isAdmin={isAdmin}
              tag="p"
              className="font-mono text-[0.6rem] text-[#555555]/60 leading-[1.7]"
            />
          </div>
        )}
      </div>
    </section>
  );
}
