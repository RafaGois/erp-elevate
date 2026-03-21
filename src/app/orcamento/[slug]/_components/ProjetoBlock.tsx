"use client";

import type { ProjetoBlockData } from "@/lib/types/budget-content";
import EditableField from "./EditableField";

interface Props {
  data: ProjetoBlockData;
  isAdmin?: boolean;
  onChange?: (d: ProjetoBlockData) => void;
}

export default function ProjetoBlock({ data, isAdmin = false, onChange }: Props) {
  function set<K extends keyof ProjetoBlockData>(key: K, value: ProjetoBlockData[K]) {
    onChange?.({ ...data, [key]: value });
  }

  const desafios = data.desafios ?? [];
  const objetivos = data.objetivos ?? [];

  return (
    <section className="py-[clamp(6rem,12vw,12rem)] border-b border-[#DCD8D0] bg-[#F4F1EA] relative">
      <div className="max-w-[clamp(90rem,95vw,140rem)] mx-auto px-[clamp(1.5rem,4vw,5rem)]">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[clamp(2rem,4vw,4rem)] mb-[clamp(5rem,10vw,10rem)]">
          <div className="md:col-span-2 pt-[0.5rem]">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#555555]/60">
              O projeto
            </span>
          </div>
          <div className="md:col-span-8 border-t border-[#DCD8D0] pt-[2rem]">
            <h2
              className="font-serif font-normal text-[#0A0A0A] leading-[1] tracking-tighter"
              style={{
                fontSize: "clamp(2.5rem,5vw,5.5rem)",
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              <EditableField
                value={data.titulo ?? "O contexto que nos trouxe até aqui"}
                onChange={(v) => set("titulo", v)}
                isAdmin={isAdmin}
                multiline
                className="block"
              />
            </h2>
          </div>
        </div>

        {/* Two columns: desafios + objetivos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(2rem,4vw,5rem)]">
          {/* Desafios */}
          <div>
            <span className="block font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#D9381E] mb-[2rem]">
              Desafios identificados
            </span>
            <div className="flex flex-col gap-0">
              {desafios.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-[1.5rem] py-[1.5rem] border-t border-[#DCD8D0]"
                >
                  <span className="font-mono text-[0.55rem] text-[#555555]/50 mt-[0.3rem] flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-sans text-[0.875rem] text-[#555555] leading-[1.7]">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Objetivos */}
          <div>
            <span className="block font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#555555]/60 mb-[2rem]">
              Objetivos do projeto
            </span>
            <div className="flex flex-col gap-0">
              {objetivos.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-[1.5rem] py-[1.5rem] border-t border-[#DCD8D0]"
                >
                  <span className="w-[0.4rem] h-[0.4rem] rounded-full bg-[#D9381E] flex-shrink-0 mt-[0.5rem]" />
                  <p className="font-sans text-[0.875rem] text-[#0A0A0A] leading-[1.7] font-medium">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
