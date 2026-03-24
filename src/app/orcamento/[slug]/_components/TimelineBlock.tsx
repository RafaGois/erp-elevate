"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { TimelineBlockData, TimelineEtapa } from "@/lib/types/budget-content";
import EditableField from "./EditableField";

const WINDOW_VARIANTS = [
  { bar: "#A855F7", border: "#A855F7", shadow: "#6B21A8" },
  { bar: "#22D3EE", border: "#22D3EE", shadow: "#0891B2" },
  { bar: "#A855F7", border: "#A855F7", shadow: "#6B21A8" },
  { bar: "#22D3EE", border: "#22D3EE", shadow: "#0891B2" },
  { bar: "#EF4444", border: "#EF4444", shadow: "#B91C1C" },
];

function toSysSlug(text: string, i: number): string {
  const slug = (text ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_")
    .toUpperCase()
    .replace(/[^A-Z0-9_]/g, "") || `PHASE_${i + 1}`;
  return `SYS://${slug}`;
}

interface Props {
  data: TimelineBlockData;
  isAdmin?: boolean;
  onChange?: (d: TimelineBlockData) => void;
}

function getTopicShort(text: string, maxWords = 8) {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "…";
}

function TimelineCard({
  etapa,
  index,
  variant,
  isAdmin,
  onEdit,
  onRemove,
}: {
  etapa: TimelineEtapa;
  index: number;
  variant: { bar: string; border: string; shadow: string };
  isAdmin: boolean;
  onEdit: (p: Partial<TimelineEtapa>) => void;
  onRemove: () => void;
}) {
  const sysLabel = toSysSlug(etapa.fase, index);
  return (
    <div
      data-timeline-card
      className="group relative rounded-sm"
      style={{
        border: `2px solid ${variant.border}`,
        boxShadow: `6px 6px 0 ${variant.shadow}`,
      }}
    >
      <div
        className="flex items-center justify-between gap-2 px-3 py-2 rounded-t-[2px]"
        style={{ backgroundColor: variant.bar }}
      >
        <span className="text-[10px] md:text-xs text-white truncate">
          {sysLabel}
        </span>
        <div className="flex items-center gap-0.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-sm bg-white/30" />
          <span className="w-2.5 h-2.5 rounded-sm bg-white/30" />
          <span className="w-2.5 h-2.5 rounded-sm bg-white/50" />
        </div>
      </div>
      <div className="bg-white p-4 md:p-5 rounded-b-[2px] border-t border-black/5">
        <h3 className="text-sm md:text-base font-bold text-black uppercase tracking-wider mb-2">
          {"{ "}
          <EditableField
            value={etapa.fase}
            onChange={(v) => onEdit({ fase: v })}
            isAdmin={isAdmin}
            className="inline"
            placeholder="Fase"
          />
          {" }"}
        </h3>
        <p className="text-xs md:text-sm text-black/70 leading-relaxed mb-3">
          &gt;{" "}
          <EditableField
            value={etapa.descricao}
            onChange={(v) => onEdit({ descricao: v })}
            isAdmin={isAdmin}
            multiline
            tag="span"
            className="inline"
            placeholder="Descrição"
          />
        </p>
        <div className="pt-2 border-t border-black/10">
          <span className="inline-block px-2 py-1 text-[10px] md:text-xs border border-[#bdfa3c] text-[#7D6B58] bg-[#bdfa3c]/10">
            [X]{" "}
            <EditableField
              value={etapa.duracao}
              onChange={(v) => onEdit({ duracao: v })}
              isAdmin={isAdmin}
              className="inline"
              placeholder="Duração"
            />
          </span>
        </div>
        {isAdmin && (
          <button
            onClick={onRemove}
            className="absolute top-10 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-black/30 hover:text-red-500 p-1 z-10"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

export default function TimelineBlock({ data, isAdmin = false, onChange }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const etapas: TimelineEtapa[] = data.etapas ?? [];

  function setEtapa(i: number, partial: Partial<TimelineEtapa>) {
    onChange?.({ ...data, etapas: etapas.map((e, idx) => (idx === i ? { ...e, ...partial } : e)) });
  }
  function addEtapa() {
    onChange?.({
      ...data,
      etapas: [...etapas, { fase: `Fase ${etapas.length + 1}`, duracao: "1 semana", descricao: "Descrição." }],
    });
  }
  function removeEtapa(i: number) {
    onChange?.({ ...data, etapas: etapas.filter((_, idx) => idx !== i) });
  }
  function set<K extends keyof TimelineBlockData>(key: K, value: TimelineBlockData[K]) {
    onChange?.({ ...data, [key]: value });
  }

  useGSAP(
    () => {
      if (!container.current || !timelineRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      // Evita duplicações em re-render e garante reconstrução quando a lista muda.
      ScrollTrigger.getAll().forEach((trigger) => {
        const triggerEl = trigger.vars.trigger as Element | undefined;
        if (triggerEl && timelineRef.current?.contains(triggerEl)) {
          trigger.kill();
        }
      });

      const cards = timelineRef.current.querySelectorAll("[data-timeline-card]");
      gsap.set(cards, { scale: 0 });
      cards.forEach((el) => {
        gsap.to(el, {
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "top 55%",
            scrub: true,
          },
        });
      });

      const infoLeft = timelineRef.current.querySelectorAll('[data-timeline-info-side="left"]');
      gsap.set(infoLeft, { opacity: 0, x: -56, y: 24, scale: 0.94 });
      infoLeft.forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "top 55%",
            scrub: true,
          },
        });
      });

      const infoRight = timelineRef.current.querySelectorAll('[data-timeline-info-side="right"]');
      gsap.set(infoRight, { opacity: 0, x: 56, y: 24, scale: 0.94 });
      infoRight.forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "top 55%",
            scrub: true,
          },
        });
      });

      // Recalcula medidas após inserir/remover cards para incluir novos elementos na animação.
      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    { scope: container, dependencies: [etapas.length], revertOnUpdate: true }
  );

  return (
    <section
      id="cronograma"
      ref={container}
      className="proposal-section relative min-h-[60vh] bg-white"
    >
      <div className="proposal-container relative z-10">
        <header className="mb-12 md:mb-16 text-center">
          <h2 className="text-3xl font-bold text-black md:text-4xl lg:text-5xl">
            <EditableField
              value={data.titulo ?? "Como vai funcionar"}
              onChange={(v) => set("titulo", v)}
              isAdmin={isAdmin}
              multiline
              className="block"
            />
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-[#7D6B58]">
            Da primeira reunião ao lançamento — cada etapa planejada para você.
          </p>
        </header>

        <div ref={timelineRef} className="relative flex justify-center">
          <div className="relative flex w-full max-w-5xl">
            <div
              className="absolute left-1/2 top-8 bottom-8 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#bdfa3c]/60 via-[#22c55e]/40 to-transparent"
              aria-hidden
            />

            <div className="w-full space-y-14">
              {etapas.length > 0 ? (
                etapas.map((etapa, i) => {
                  const cardLeft = i % 2 === 1;
                  return (
                    <div
                      key={i}
                      className="relative grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-8 md:items-center"
                    >
                      <div
                        data-timeline-left
                        className={`order-2 md:order-1 flex flex-col justify-center ${
                          cardLeft ? "md:pl-8" : "md:pr-8 text-left md:text-right"
                        }`}
                      >
                        {cardLeft ? (
                          <TimelineCard
                            etapa={etapa}
                            index={i}
                            variant={WINDOW_VARIANTS[i % WINDOW_VARIANTS.length]}
                            isAdmin={isAdmin}
                            onEdit={(p) => setEtapa(i, p)}
                            onRemove={() => removeEtapa(i)}
                          />
                        ) : (
                          <div data-timeline-info data-timeline-info-side="left">
                            <span className="text-xs font-medium uppercase tracking-wider text-[#bdfa3c]">
                              Etapa {i + 1}
                            </span>
                            <p className="mt-1 text-sm text-black/60 leading-snug">
                              {etapa.duracao}
                            </p>
                            <p className="mt-2 text-xs text-black/45">
                              {getTopicShort(etapa.descricao)}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="order-1 md:order-2 flex items-center justify-center py-2 shrink-0">
                        <div className="h-3 w-3 shrink-0 rounded-full border-2 border-[#bdfa3c] bg-white ring-4 ring-white" />
                      </div>

                      <div
                        data-timeline-right
                        className={`order-3 ${cardLeft ? "md:pr-8 text-left" : "md:pl-8"}`}
                      >
                        {cardLeft ? (
                          <div data-timeline-info data-timeline-info-side="right">
                            <span className="text-xs font-medium uppercase tracking-wider text-[#bdfa3c]">
                              Etapa {i + 1}
                            </span>
                            <p className="mt-1 text-sm text-black/60 leading-snug">
                              {etapa.duracao}
                            </p>
                            <p className="mt-2 text-xs text-black/45">
                              {getTopicShort(etapa.descricao)}
                            </p>
                          </div>
                        ) : (
                          <TimelineCard
                            etapa={etapa}
                            index={i}
                            variant={WINDOW_VARIANTS[i % WINDOW_VARIANTS.length]}
                            isAdmin={isAdmin}
                            onEdit={(p) => setEtapa(i, p)}
                            onRemove={() => removeEtapa(i)}
                          />
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="relative grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-6">
                  <div className="order-2 md:order-1" data-timeline-left />
                  <div className="order-1 md:order-2 flex items-center justify-center py-2">
                    <div className="h-3 w-3 shrink-0 rounded-full border-2 border-black/20 bg-white ring-4 ring-white" />
                  </div>
                  <div
                    className="order-3 rounded-xl border border-dashed border-black/20 bg-black/[0.02] p-5 text-center text-black/40 md:p-6"
                    data-timeline-right
                  >
                    Adicione etapas no painel admin
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {isAdmin && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={addEtapa}
              className="flex items-center gap-2 rounded-xl border border-dashed border-black/20 bg-black/[0.02] px-6 py-4 text-sm text-black/50 hover:border-black/30 hover:bg-black/[0.04] hover:text-black/70 transition-colors"
            >
              <Plus size={16} />
              Adicionar etapa
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
