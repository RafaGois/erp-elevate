"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import type { EquipeBlockData, EquipeItem } from "@/lib/types/budget-content";
import EditableField from "./EditableField";

const cardStyle =
  "rounded-xl border border-black/10 bg-white p-6 transition-colors hover:border-black/15 [box-shadow:0_-20px_80px_-20px_rgba(0,0,0,0.03)_inset]";

interface Props {
  data: EquipeBlockData;
  isAdmin?: boolean;
  onChange?: (d: EquipeBlockData) => void;
}

export default function EquipeBlock({ data, isAdmin = false, onChange }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const membros: EquipeItem[] = data.membros ?? [];

  function setMembro(i: number, partial: Partial<EquipeItem>) {
    onChange?.({ ...data, membros: membros.map((m, idx) => (idx === i ? { ...m, ...partial } : m)) });
  }
  function addMembro() {
    onChange?.({ ...data, membros: [...membros, { nome: "Novo", cargo: "Cargo", bio: "Bio." }] });
  }
  function removeMembro(i: number) {
    onChange?.({ ...data, membros: membros.filter((_, idx) => idx !== i) });
  }
  function set<K extends keyof EquipeBlockData>(key: K, value: EquipeBlockData[K]) {
    onChange?.({ ...data, [key]: value });
  }

  useGSAP(
    () => {
      if (!container.current || !cardsRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const cards = cardsRef.current.querySelectorAll("[data-equipe-card]");
      gsap.set(cards, { opacity: 0, y: 24 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: container }
  );

  return (
    <section id="equipe" ref={container} className="proposal-section bg-white">
      <div className="proposal-container">
        <header className="mb-12 md:mb-16">
          <h2 className="text-4xl font-bold text-black md:text-5xl">
            <EditableField
              value={data.titulo ?? "Quem vai trabalhar no seu projeto"}
              onChange={(v) => set("titulo", v)}
              isAdmin={isAdmin}
              className="block"
            />
          </h2>
          <p className="mt-2 max-w-xl text-[#7D6B58]">
            Conheça o time que vai entregar o seu projeto.
          </p>
        </header>

        <div ref={cardsRef} className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <AnimatePresence>
            {membros.map((membro, i) => (
              <motion.div
                key={i}
                layout
                data-equipe-card
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`group relative ${cardStyle}`}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-black/10 bg-[#bdfa3c]/20 font-serif text-2xl font-bold text-black/70 mb-4">
                  {membro.nome.charAt(0)}
                </div>
                <h3 className="text-xl font-semibold text-black">
                  <EditableField
                    value={membro.nome}
                    onChange={(v) => setMembro(i, { nome: v })}
                    isAdmin={isAdmin}
                    className="inline"
                  />
                </h3>
                <p className="mt-1 font-mono text-sm text-[#bdfa3c]">
                  <EditableField
                    value={membro.cargo ?? ""}
                    onChange={(v) => setMembro(i, { cargo: v })}
                    isAdmin={isAdmin}
                    className="inline"
                    placeholder="Cargo"
                  />
                </p>
                <p className="mt-3 text-sm text-black/60 leading-relaxed">
                  <EditableField
                    value={membro.bio ?? ""}
                    onChange={(v) => setMembro(i, { bio: v })}
                    isAdmin={isAdmin}
                    multiline
                    tag="span"
                    className="inline"
                    placeholder="Bio"
                  />
                </p>
                {isAdmin && (
                  <button
                    onClick={() => removeMembro(i)}
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-black/30 hover:text-black/60"
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
            onClick={addMembro}
            className="mt-6 flex items-center gap-2 rounded-xl border border-dashed border-black/20 bg-black/[0.02] px-6 py-4 text-sm text-black/50 hover:border-black/30 hover:bg-black/[0.04] hover:text-black/70 transition-colors"
          >
            <Plus size={16} />
            Adicionar membro
          </button>
        )}
      </div>
    </section>
  );
}
