"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { EquipeBlockData, EquipeItem } from "@/lib/types/budget-content";
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
    .replace(/[^A-Z0-9_]/g, "") || `MEMBER_${i + 1}`;
  return `SYS://${slug}`;
}

function EquipeRetroCard({
  membro,
  index,
  isAdmin,
  onEdit,
  onRemove,
}: {
  membro: EquipeItem;
  index: number;
  isAdmin: boolean;
  onEdit: (p: Partial<EquipeItem>) => void;
  onRemove: () => void;
}) {
  const v = GREEN_VARIANTS[index % GREEN_VARIANTS.length];
  const sysLabel = toSysSlug(membro.nome ?? "", index);
  const imgSrc = membro.foto || `https://picsum.photos/seed/equipe${index}/400/300`;

  return (
    <div
      className="relative flex flex-col overflow-hidden rounded-sm border-2 bg-white text-left"
      style={{
        borderColor: v.border,
        boxShadow: `6px 6px 0 ${v.shadow}`,
      }}
    >
      <div
        className="flex shrink-0 items-center justify-between px-2 py-1.5 text-black/90"
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
      <div className="relative aspect-[4/3] min-h-[180px] w-full shrink-0 overflow-hidden border-b-2 border-neutral-300 bg-neutral-100">
        <Image
          src={imgSrc}
          alt={membro.nome}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col border-t border-neutral-200 bg-white p-4">
        <h3 className="font-mono text-sm font-bold text-black">
          <EditableField
            value={membro.nome}
            onChange={(v) => onEdit({ nome: v })}
            isAdmin={isAdmin}
            className="inline"
          />
        </h3>
        <p className="mt-0.5 font-mono text-xs text-[#bdfa3c]">
          <EditableField
            value={membro.cargo ?? ""}
            onChange={(v) => onEdit({ cargo: v })}
            isAdmin={isAdmin}
            className="inline"
            placeholder="Cargo"
          />
        </p>
        <p className="mt-3 line-clamp-3 font-mono text-[11px] text-neutral-600 leading-relaxed">
          <EditableField
            value={membro.bio ?? ""}
            onChange={(v) => onEdit({ bio: v })}
            isAdmin={isAdmin}
            multiline
            tag="span"
            className="inline"
            placeholder="Bio"
          />
        </p>
        {isAdmin && (
          <button
            onClick={onRemove}
            className="absolute top-12 right-3 z-10 p-1 text-black/30 opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

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
      gsap.set(cards, { scale: 0 });
      gsap.to(cards, {
        scale: 1,
        duration: 0.4,
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

        <div ref={cardsRef} className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-2 lg:grid-cols-3">
          {membros.map((membro, i) => (
            <div
              key={i}
              data-equipe-card
              className="group overflow-hidden transition-all duration-300 ease-out hover:-translate-y-2 hover:ring-2 hover:ring-[#bdfa3c]/50"
            >
              <EquipeRetroCard
                membro={membro}
                index={i}
                isAdmin={isAdmin}
                onEdit={(p) => setMembro(i, p)}
                onRemove={() => removeMembro(i)}
              />
            </div>
          ))}
        </div>

        {isAdmin && (
          <button
            onClick={addMembro}
            className="mt-6 flex items-center gap-2 rounded-xl border border-dashed border-black/20 bg-black/2 px-6 py-4 text-sm text-black/50 hover:border-black/30 hover:bg-black/4 hover:text-black/70 transition-colors"
          >
            <Plus size={16} />
            Adicionar membro
          </button>
        )}
      </div>
    </section>
  );
}
