"use client";

import Image from "next/image";
import type { GaleriaBlockData } from "@/lib/types/budget-content";
import EditableField from "./EditableField";

interface Props {
  data: GaleriaBlockData;
  isAdmin?: boolean;
  onChange?: (d: GaleriaBlockData) => void;
}

export default function GaleriaBlock({ data, isAdmin = false, onChange }: Props) {
  function set<K extends keyof GaleriaBlockData>(key: K, value: GaleriaBlockData[K]) {
    onChange?.({ ...data, [key]: value });
  }

  const imagens = data.imagens ?? [];

  return (
    <section className="py-[clamp(6rem,12vw,12rem)] border-b border-[#DCD8D0] bg-[#FDFBF7]">
      <div className="max-w-[clamp(90rem,95vw,140rem)] mx-auto px-[clamp(1.5rem,4vw,5rem)]">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[clamp(2rem,4vw,4rem)] mb-[clamp(4rem,6vw,6rem)]">
          <div className="md:col-span-2 pt-[0.5rem]">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#555555]/60">
              Portfólio
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
                value={data.titulo ?? "Trabalhos selecionados"}
                onChange={(v) => set("titulo", v)}
                isAdmin={isAdmin}
                multiline
                className="block"
              />
            </h2>
          </div>
        </div>

        {/* Masonry-ish grid */}
        {imagens.length > 0 && (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-[1px] space-y-[1px]">
            {imagens.map((img, i) => (
              <div key={i} className="break-inside-avoid group relative overflow-hidden">
                <div className="relative aspect-[4/3] bg-[#F4F1EA]">
                  <Image
                    src={img.url}
                    alt={img.legenda ?? `Imagem ${i + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[#0A0A0A]/0 group-hover:bg-[#0A0A0A]/20 transition-colors duration-500" />
                </div>
                {img.legenda && (
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.15em] text-[#555555]/60 mt-[0.75rem] pb-[0.75rem]">
                    {img.legenda}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
