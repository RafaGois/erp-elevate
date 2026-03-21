"use client";

import type { SobreEmpresaBlockData } from "@/lib/types/budget-content";
import EditableField from "./EditableField";

interface Props {
  data: SobreEmpresaBlockData;
  isAdmin?: boolean;
  onChange?: (d: SobreEmpresaBlockData) => void;
}

export default function SobreEmpresaBlock({ data, isAdmin = false, onChange }: Props) {
  function set<K extends keyof SobreEmpresaBlockData>(key: K, value: SobreEmpresaBlockData[K]) {
    onChange?.({ ...data, [key]: value });
  }

  return (
    <section className="py-[clamp(6rem,12vw,12rem)] border-b border-[#DCD8D0] bg-[#FDFBF7] relative overflow-hidden">
      {/* Subtle background grid */}
      <div
        aria-hidden
        className="absolute inset-0 grid grid-cols-12 pointer-events-none opacity-[0.05]"
      >
        {Array.from({ length: 11 }).map((_, i) => (
          <div key={i} className="border-r border-[#0A0A0A]" />
        ))}
      </div>

      <div className="max-w-[clamp(90rem,95vw,140rem)] mx-auto px-[clamp(1.5rem,4vw,5rem)] relative z-10">
        {/* Section label */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[clamp(2rem,4vw,4rem)] mb-[clamp(4rem,8vw,8rem)]">
          <div className="md:col-span-2">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#555555]/60">
              Sobre nós
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
                value={data.titulo ?? "Quem está por trás desta proposta"}
                onChange={(v) => set("titulo", v)}
                isAdmin={isAdmin}
                multiline
                className="block"
              />
            </h2>
          </div>
        </div>

        {/* Body content — two columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[clamp(2rem,4vw,4rem)] items-start">
          {/* Sticky aside */}
          <div className="md:col-span-5 md:sticky top-[clamp(5rem,8vw,8rem)]">
            <div className="bg-[#F4F1EA] p-[clamp(2rem,4vw,3.5rem)] relative overflow-hidden group">
              <div className="proposal-line-x" />
              <div className="proposal-line-y" />
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.15em] text-[#555555]/50 block mb-[2rem]">
                Nossa missão
              </span>
              <p
                className="font-serif font-normal text-[#0A0A0A] leading-[1.3] tracking-tight italic"
                style={{
                  fontSize: "clamp(1.5rem,2.5vw,2.25rem)",
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
              >
                <EditableField
                  value={data.missao ?? "Transformamos identidades em ativos estratégicos de negócio."}
                  onChange={(v) => set("missao", v)}
                  isAdmin={isAdmin}
                  multiline
                  className="block"
                />
              </p>
            </div>
          </div>

          {/* Description + differentials */}
          <div className="md:col-span-7 flex flex-col gap-[3rem]">
            <EditableField
              value={data.descricao ?? "Somos uma equipe especializada em criar experiências digitais que convertem e impressionam."}
              onChange={(v) => set("descricao", v)}
              isAdmin={isAdmin}
              multiline
              tag="p"
              className="font-sans text-[clamp(0.9rem,1.1vw,1.05rem)] text-[#555555] leading-[1.8]"
            />

              {((data.diferenciais ?? data.destaques) ?? []).length > 0 && (
              <div className="flex flex-col gap-0">
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.15em] text-[#555555]/60 mb-[1.5rem]">
                  Nossos diferenciais
                </span>
                {(data.diferenciais ?? data.destaques ?? []).map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-[1.5rem] py-[1.25rem] border-t border-[#DCD8D0]"
                  >
                    <span className="font-mono text-[0.55rem] text-[#D9381E] mt-[0.35rem] flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-sans text-[0.9rem] text-[#0A0A0A]">{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
