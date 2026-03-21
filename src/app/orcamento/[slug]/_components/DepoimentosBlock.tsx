"use client";

import type { DepoimentosBlockData } from "@/lib/types/budget-content";
import EditableField from "./EditableField";

interface Props {
  data: DepoimentosBlockData;
  isAdmin?: boolean;
  onChange?: (d: DepoimentosBlockData) => void;
}

export default function DepoimentosBlock({ data, isAdmin = false, onChange }: Props) {
  function set<K extends keyof DepoimentosBlockData>(key: K, value: DepoimentosBlockData[K]) {
    onChange?.({ ...data, [key]: value });
  }

  const itens = data.itens ?? [];

  return (
    <section className="py-[clamp(6rem,12vw,12rem)] border-b border-[#DCD8D0] bg-[#F4F1EA] relative">
      <div className="max-w-[clamp(90rem,95vw,140rem)] mx-auto px-[clamp(1.5rem,4vw,5rem)]">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[clamp(2rem,4vw,4rem)] mb-[clamp(5rem,8vw,8rem)]">
          <div className="md:col-span-2 pt-[0.5rem]">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#555555]/60">
              Depoimentos
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
                value={data.titulo ?? "O que nossos clientes dizem"}
                onChange={(v) => set("titulo", v)}
                isAdmin={isAdmin}
                multiline
                className="block"
              />
            </h2>
          </div>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-[#DCD8D0]">
          {itens.map((item, i) => (
            <div
              key={i}
              className="border-b border-r border-[#DCD8D0] p-[clamp(2rem,3vw,3rem)] flex flex-col gap-[2rem] group relative overflow-hidden"
            >
              <div className="proposal-line-x" />

              {/* Large quote mark */}
              <span
                className="font-serif text-[5rem] leading-none text-[#D9381E]/15 select-none"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                aria-hidden
              >
                "
              </span>

              {/* Quote */}
              <p className="font-serif font-normal text-[#0A0A0A] leading-[1.5] tracking-tight text-[clamp(1rem,1.25vw,1.25rem)]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                "{item.texto}"
              </p>

              {/* Author */}
              <div className="mt-auto flex items-center gap-[1rem] pt-[1.5rem] border-t border-[#DCD8D0]">
                <div className="flex flex-col gap-[0.25rem]">
                  <span className="font-sans text-[0.8rem] font-medium text-[#0A0A0A]">
                    {item.autor}
                  </span>
                  {item.cargo && (
                    <span className="font-mono text-[0.55rem] uppercase tracking-[0.15em] text-[#555555]/60">
                      {item.cargo}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
