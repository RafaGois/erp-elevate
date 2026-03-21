"use client";

import type { ServicosBlockData } from "@/lib/types/budget-content";
import EditableField from "./EditableField";

interface Props {
  data: ServicosBlockData;
  isAdmin?: boolean;
  onChange?: (d: ServicosBlockData) => void;
}

export default function ServicosBlock({ data, isAdmin = false, onChange }: Props) {
  function set<K extends keyof ServicosBlockData>(key: K, value: ServicosBlockData[K]) {
    onChange?.({ ...data, [key]: value });
  }

  // Support both `itens` and legacy `servicos`
  const servicos = data.itens ?? data.servicos ?? [];

  return (
    <section className="py-[clamp(6rem,12vw,12rem)] border-b border-[#DCD8D0] bg-[#FDFBF7] relative">
      <div className="max-w-[clamp(90rem,95vw,140rem)] mx-auto px-[clamp(1.5rem,4vw,5rem)]">
        {/* Header row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[clamp(2rem,4vw,4rem)] mb-[clamp(5rem,8vw,8rem)]">
          <div className="md:col-span-2 flex items-start pt-[0.5rem]">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#555555]/60">
              Escopo de trabalho
            </span>
          </div>
          <div className="md:col-span-7 border-t border-[#DCD8D0] pt-[2rem]">
            <h2
              className="font-serif font-normal text-[#0A0A0A] leading-[1] tracking-tighter"
              style={{
                fontSize: "clamp(2.5rem,5vw,5.5rem)",
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              <EditableField
                value={data.titulo ?? "O que entregamos"}
                onChange={(v) => set("titulo", v)}
                isAdmin={isAdmin}
                multiline
                className="block"
              />
            </h2>
          </div>
          <div className="md:col-span-3">
            <EditableField
              value={data.subtitulo ?? "Cada entrega pensada para gerar impacto real no seu negócio."}
              onChange={(v) => set("subtitulo", v)}
              isAdmin={isAdmin}
              multiline
              tag="p"
              className="font-sans text-[0.875rem] text-[#555555] leading-[1.7] md:pt-[3rem]"
            />
          </div>
        </div>

        {/* Services grid — tiles with line hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-[#DCD8D0]">
          {servicos.map((servico, i) => (
            <div
              key={i}
              className="group relative border-b border-r border-[#DCD8D0] p-[clamp(2rem,3vw,3rem)] overflow-hidden"
            >
              <div className="proposal-line-x" />
              <div className="proposal-line-y" />

              {/* Number */}
              <span className="block font-mono text-[2.5rem] text-[#0A0A0A]/[0.06] leading-none mb-[1.5rem] select-none">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Title */}
              <h3
                className="font-serif font-normal text-[#0A0A0A] leading-[1.1] tracking-tight mb-[1rem]"
                style={{
                  fontSize: "clamp(1.25rem,1.75vw,1.75rem)",
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
              >
                {servico.titulo ?? servico.nome}
              </h3>

              {/* Description */}
              <p className="font-sans text-[0.8rem] text-[#555555] leading-[1.7]">
                {servico.descricao}
              </p>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#D9381E] group-hover:w-full transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
