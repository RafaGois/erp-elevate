"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Crown, Plus, Trash2 } from "lucide-react";
import type { PacoteItem, PrecoBlockData } from "@/lib/types/budget-content";
import EditableField from "./EditableField";

interface Props {
  data: PrecoBlockData;
  isAdmin?: boolean;
  onChange?: (d: PrecoBlockData) => void;
}

export default function PrecoBlock({ data, isAdmin = false, onChange }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const pacotes: PacoteItem[] = data.pacotes ?? [];

  function setPacote(i: number, partial: Partial<PacoteItem>) {
    onChange?.({ ...data, pacotes: pacotes.map((p, idx) => (idx === i ? { ...p, ...partial } : p)) });
  }
  function setDestaque(i: number) {
    onChange?.({ ...data, pacotes: pacotes.map((p, idx) => ({ ...p, destaque: idx === i })) });
  }
  function addPacote() {
    onChange?.({
      ...data,
      pacotes: [...pacotes, { nome: "Novo", descricao: "...", valor: 0, inclui: ["Item"], destaque: false }],
    });
  }
  function removePacote(i: number) {
    const next = pacotes.filter((_, idx) => idx !== i);
    if (next.length && !next.some((p) => p.destaque)) next[0].destaque = true;
    onChange?.({ ...data, pacotes: next });
  }
  function setInclui(pi: number, ii: number, v: string) {
    setPacote(pi, { inclui: pacotes[pi].inclui.map((it, i) => (i === ii ? v : it)) });
  }
  function addInclui(pi: number) {
    setPacote(pi, { inclui: [...(pacotes[pi].inclui ?? []), "Novo item"] });
  }
  function removeInclui(pi: number, ii: number) {
    setPacote(pi, { inclui: pacotes[pi].inclui.filter((_, i) => i !== ii) });
  }
  function set<K extends keyof PrecoBlockData>(key: K, value: PrecoBlockData[K]) {
    onChange?.({ ...data, [key]: value });
  }

  useGSAP(
    () => {
      if (!container.current || !cardsRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const cards = cardsRef.current.querySelectorAll("[data-preco-card]");
      gsap.set(cards, { opacity: 0, y: 32 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.12,
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

  const colClass = pacotes.length <= 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";

  return (
    <section id="preco" ref={container} className="proposal-section bg-white">
      <div className="proposal-container">
        <header className="mb-12 md:mb-16">
          <h2 className="text-4xl font-bold text-black md:text-5xl">
            <EditableField
              value={data.titulo ?? "Escolha seu plano"}
              onChange={(v) => set("titulo", v)}
              isAdmin={isAdmin}
              className="block"
            />
          </h2>
          <p className="mt-2 max-w-xl text-[#7D6B58]">
            <EditableField
              value={data.subtitulo ?? "Opções flexíveis para cada momento do seu negócio."}
              onChange={(v) => set("subtitulo", v)}
              isAdmin={isAdmin}
              tag="span"
              className="inline"
            />
          </p>
        </header>

        <div ref={cardsRef} className={`grid grid-cols-1 gap-6 md:gap-8 ${colClass}`}>
          <AnimatePresence>
            {pacotes.map((pacote, pi) => {
              const destaque = !!pacote.destaque;
              return (
                <motion.div
                  key={pi}
                  layout
                  data-preco-card
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`group relative flex flex-col rounded-xl border p-6 md:p-8 ${
                    destaque
                      ? "border-[#bdfa3c] bg-[#bdfa3c]/5 [box-shadow:0_-20px_80px_-20px_rgba(189,250,60,0.08)_inset]"
                      : "border-black/10 bg-white [box-shadow:0_-20px_80px_-20px_rgba(0,0,0,0.03)_inset]"
                  }`}
                >
                  {destaque && (
                    <div className="absolute -top-3 left-6 flex items-center gap-1 rounded-full bg-[#bdfa3c] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-black">
                      <Crown size={10} /> Recomendado
                    </div>
                  )}
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-bold text-black md:text-2xl">
                      <EditableField
                        value={pacote.nome}
                        onChange={(v) => setPacote(pi, { nome: v })}
                        isAdmin={isAdmin}
                        className="inline"
                      />
                    </h3>
                    {isAdmin && (
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                        <button onClick={() => setDestaque(pi)} className="p-1 text-black/40 hover:text-[#bdfa3c]">
                          <Crown size={12} />
                        </button>
                        <button onClick={() => removePacote(pi)} className="p-1 text-black/40 hover:text-black/70">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-black/60">{pacote.descricao}</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-sm text-black/50">R$</span>
                    <EditableField
                      value={String(pacote.valor)}
                      onChange={(v) => setPacote(pi, { valor: parseFloat(v) || 0 })}
                      isAdmin={isAdmin}
                      className="text-3xl font-bold text-black md:text-4xl"
                    />
                  </div>
                  {pacote.parcelas && (
                    <p className="mt-1 font-mono text-xs text-black/50">{pacote.parcelas}</p>
                  )}
                  <div className="mt-6 flex-1 space-y-2">
                    {(pacote.inclui ?? []).map((item, ii) => (
                      <div key={ii} className="flex items-start gap-2 group/item">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#bdfa3c]" />
                        <EditableField
                          value={item}
                          onChange={(v) => setInclui(pi, ii, v)}
                          isAdmin={isAdmin}
                          className="text-sm text-black/80"
                        />
                        {isAdmin && (
                          <button
                            onClick={() => removeInclui(pi, ii)}
                            className="opacity-0 group-hover/item:opacity-100 p-0.5 text-black/30 hover:text-black/60"
                          >
                            <Trash2 size={10} />
                          </button>
                        )}
                      </div>
                    ))}
                    {isAdmin && (
                      <button
                        onClick={() => addInclui(pi)}
                        className="flex items-center gap-1 text-xs text-black/40 hover:text-black/60"
                      >
                        <Plus size={10} /> Adicionar item
                      </button>
                    )}
                  </div>
                  <div
                    className={`mt-6 flex items-center justify-center rounded-xl py-3 font-mono text-xs font-bold uppercase tracking-wider ${
                      destaque ? "bg-black text-white" : "bg-black/5 text-black"
                    }`}
                  >
                    Escolher plano
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {isAdmin && (
          <button
            onClick={addPacote}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-black/20 bg-black/[0.02] py-8 text-sm text-black/50 hover:border-black/30 hover:bg-black/[0.04] hover:text-black/70"
          >
            <Plus size={16} /> Novo pacote
          </button>
        )}

        {data.observacao && (
          <p className="mt-8 text-center font-mono text-xs text-black/50">{data.observacao}</p>
        )}
      </div>
    </section>
  );
}
