"use client";

import type { TextoBlockData } from "@/lib/types/budget-content";
import EditableField from "./EditableField";

interface Props {
  data: TextoBlockData;
  isAdmin?: boolean;
  onChange?: (d: TextoBlockData) => void;
}

export default function TextoBlock({ data, isAdmin = false, onChange }: Props) {
  function set<K extends keyof TextoBlockData>(key: K, value: TextoBlockData[K]) {
    onChange?.({ ...data, [key]: value });
  }

  return (
    <section className="py-[clamp(6rem,12vw,12rem)] border-b border-[#DCD8D0] bg-[#FDFBF7]">
      <div className="max-w-[clamp(90rem,95vw,140rem)] mx-auto px-[clamp(1.5rem,4vw,5rem)]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[clamp(2rem,4vw,4rem)]">
          {data.titulo && (
            <div className="md:col-span-4">
              <h2
                className="font-serif font-normal text-[#0A0A0A] leading-[1.1] tracking-tight sticky top-[5rem]"
                style={{
                  fontSize: "clamp(1.5rem,2.5vw,2.5rem)",
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
              >
                <EditableField
                  value={data.titulo}
                  onChange={(v) => set("titulo", v)}
                  isAdmin={isAdmin}
                  multiline
                  className="block"
                />
              </h2>
            </div>
          )}
          <div className={data.titulo ? "md:col-span-7 md:col-start-6" : "md:col-span-8 md:col-start-3"}>
            <EditableField
              value={data.conteudo}
              onChange={(v) => set("conteudo", v)}
              isAdmin={isAdmin}
              multiline
              tag="p"
              className="font-sans text-[clamp(0.9rem,1.1vw,1.05rem)] text-[#555555] leading-[1.9]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
