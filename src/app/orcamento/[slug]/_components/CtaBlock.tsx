"use client";

import type { CtaBlockData } from "@/lib/types/budget-content";
import EditableField from "./EditableField";

interface Props {
  data: CtaBlockData;
  isAdmin?: boolean;
  onChange?: (d: CtaBlockData) => void;
}

export default function CtaBlock({ data, isAdmin = false, onChange }: Props) {
  function set<K extends keyof CtaBlockData>(key: K, value: CtaBlockData[K]) {
    onChange?.({ ...data, [key]: value });
  }

  const waLink = data.whatsapp
    ? `https://wa.me/${data.whatsapp.replace(/\D/g, "")}`
    : null;

  return (
    <section className="py-[clamp(8rem,16vw,16rem)] border-b border-[#DCD8D0] bg-[#0A0A0A] text-[#FDFBF7] relative overflow-hidden">
      {/* Noise texture overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #FDFBF7 1px, transparent 1px)",
          backgroundSize: "35px 35px",
        }}
      />

      <div className="max-w-[clamp(90rem,95vw,100rem)] mx-auto px-[clamp(1.5rem,4vw,5rem)] relative z-10">
        {/* Accepting badge */}
        <div className="flex items-center gap-[1rem] mb-[3rem]">
          <span className="w-[0.5rem] h-[0.5rem] bg-[#FDFBF7] rounded-full animate-pulse" />
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#FDFBF7]/50">
            Proposta em aberto
          </span>
        </div>

        {/* Main headline */}
        <h2
          className="font-serif font-normal text-[#FDFBF7] leading-[0.95] tracking-tighter mb-[clamp(3rem,6vw,5rem)]"
          style={{
            fontSize: "clamp(3rem,7vw,8rem)",
            fontFamily: "'Playfair Display', Georgia, serif",
          }}
        >
          <EditableField
            value={data.titulo}
            onChange={(v) => set("titulo", v)}
            isAdmin={isAdmin}
            multiline
            className="block text-[#FDFBF7]"
            placeholder="Título do CTA"
          />
        </h2>

        {/* Subtitle + actions */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[clamp(3rem,6vw,5rem)] border-t border-white/10 pt-[clamp(3rem,6vw,4rem)]">
          <div className="md:col-span-6">
            <EditableField
              value={data.subtitulo ?? ""}
              onChange={(v) => set("subtitulo", v)}
              isAdmin={isAdmin}
              multiline
              tag="p"
              className="font-sans text-[clamp(0.9rem,1.1vw,1.1rem)] text-[#FDFBF7]/60 leading-[1.7]"
              placeholder="Subtítulo / chamada para ação"
            />
          </div>

          <div className="md:col-span-6 flex flex-col gap-[2.5rem]">
            {/* Contact info */}
            <div className="flex flex-wrap gap-[3rem]">
              {data.email && (
                <div className="flex flex-col gap-[0.5rem]">
                  <span className="font-mono text-[0.55rem] uppercase tracking-[0.15em] text-[#FDFBF7]/40">
                    E-mail
                  </span>
                  <a
                    href={`mailto:${data.email}`}
                    className="font-sans text-[0.9rem] text-[#FDFBF7]/80 hover:text-[#FDFBF7] transition-colors"
                  >
                    {data.email}
                  </a>
                </div>
              )}
              {data.whatsapp && (
                <div className="flex flex-col gap-[0.5rem]">
                  <span className="font-mono text-[0.55rem] uppercase tracking-[0.15em] text-[#FDFBF7]/40">
                    WhatsApp
                  </span>
                  <a
                    href={waLink ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-[0.9rem] text-[#FDFBF7]/80 hover:text-[#FDFBF7] transition-colors"
                  >
                    {data.whatsapp}
                  </a>
                </div>
              )}
            </div>

            {/* Primary CTA button */}
            <a
              href={data.botaoUrl ?? waLink ?? `mailto:${data.email}`}
              target={data.botaoUrl ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between gap-[2rem] py-[1.25rem] px-[2.5rem] bg-[#FDFBF7] text-[#0A0A0A] font-mono text-[0.65rem] tracking-[0.2em] uppercase hover:bg-[#F4F1EA] transition-colors rounded-full group/btn w-fit"
            >
              <span>{data.botaoTexto ?? "Aceitar proposta"}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                className="transform transition-transform duration-500 group-hover/btn:translate-x-2"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4 12h16m-6-6 6 6-6 6"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
