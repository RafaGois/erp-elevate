"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import type { ProjetoBlockData } from "@/lib/types/budget-content";
import EditableField from "./EditableField";

interface Props {
  data: ProjetoBlockData;
  isAdmin?: boolean;
  onChange?: (d: ProjetoBlockData) => void;
}

export default function ProjetoBlock({ data, isAdmin = false, onChange }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  function set<K extends keyof ProjetoBlockData>(key: K, value: ProjetoBlockData[K]) {
    onChange?.({ ...data, [key]: value });
  }

  useGSAP(
    () => {
      if (!container.current || !timelineRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const leftCols = timelineRef.current.querySelectorAll("[data-timeline-left]");
      const rightCols = timelineRef.current.querySelectorAll("[data-timeline-right]");
      leftCols.forEach((el) => {
        gsap.set(el, { opacity: 0, x: -56, y: 24, scale: 0.94 });
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
      rightCols.forEach((el) => {
        gsap.set(el, { opacity: 0, x: 56, y: 24, scale: 0.94 });
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
    },
    { scope: container }
  );

  const objetivos = data.objetivos ?? [];
  const desafios = data.desafios ?? [];

  const getTopicFromObjective = (text: string) => {
    const words = text.trim().split(/\s+/);
    if (words.length <= 4) return text;
    return words.slice(0, 4).join(" ") + (words.length > 4 ? "…" : "");
  };

  return (
    <section
      id="projeto"
      ref={container}
      className="proposal-section bg-white min-h-[60vh]"
    >
      <div className="proposal-container">
        <header className="mb-12 md:mb-16 text-center">
          <h2 className="text-3xl font-bold text-black md:text-4xl lg:text-5xl">
            <EditableField
              value={data.titulo ?? "O projeto"}
              onChange={(v) => set("titulo", v)}
              isAdmin={isAdmin}
              multiline
              className="block"
            />
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-[#7D6B58]">
            <EditableField
              value={data.descricao}
              onChange={(v) => set("descricao", v)}
              isAdmin={isAdmin}
              multiline
              tag="span"
              className="inline"
            />
          </p>
        </header>

        <div ref={timelineRef} className="relative flex justify-center">
          <div className="relative flex w-full max-w-5xl">
            {/* Linha vertical da timeline — centralizada */}
            <div
              className="absolute left-1/2 top-8 bottom-8 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#bdfa3c]/60 via-[#22c55e]/40 to-transparent"
              aria-hidden
            />

            <div className="w-full space-y-14">
              {objetivos.length > 0 ? (
                objetivos.map((obj, i) => {
                  const cardLeft = i % 2 === 1;
                  return (
                    <div
                      key={i}
                      className="relative grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-8 md:items-center"
                    >
                      {/* Coluna esquerda: card ou tópico — vem da esquerda */}
                      <div
                        data-timeline-left
                        className={`order-2 md:order-1 flex flex-col justify-center ${
                          cardLeft ? "md:pl-8" : "md:pr-8 text-left md:text-right"
                        }`}
                      >
                        {cardLeft ? (
                          <div className="rounded-xl border border-black/10 bg-gradient-to-br from-white to-zinc-50/50 p-5 shadow-sm transition-shadow hover:shadow-md md:p-6">
                            <div className="flex gap-4">
                              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#bdfa3c]/30 text-sm font-bold text-black">
                                {i + 1}
                              </span>
                              <p className="text-black/85 leading-relaxed">{obj}</p>
                            </div>
                          </div>
                        ) : (
                          <>
                            <span className="text-xs font-medium uppercase tracking-wider text-[#bdfa3c]">
                              Objetivo {i + 1}
                            </span>
                            <p className="mt-1 text-sm text-black/60 leading-snug">
                              {getTopicFromObjective(obj)}
                            </p>
                            {desafios[i] && (
                              <p className="mt-2 text-xs text-black/45 italic">
                                {desafios[i]}
                              </p>
                            )}
                          </>
                        )}
                      </div>

                      {/* Centro: nó da timeline */}
                      <div className="order-1 md:order-2 flex items-center justify-center py-2 shrink-0">
                        <div className="h-3 w-3 shrink-0 rounded-full border-2 border-[#bdfa3c] bg-white ring-4 ring-white" />
                      </div>

                      {/* Coluna direita: tópico ou card — vem da direita */}
                      <div
                        data-timeline-right
                        className={`order-3 ${cardLeft ? "md:pr-8 text-left" : "md:pl-8"}`}
                      >
                        {cardLeft ? (
                          <>
                            <span className="text-xs font-medium uppercase tracking-wider text-[#bdfa3c]">
                              Objetivo {i + 1}
                            </span>
                            <p className="mt-1 text-sm text-black/60 leading-snug">
                              {getTopicFromObjective(obj)}
                            </p>
                            {desafios[i] && (
                              <p className="mt-2 text-xs text-black/45 italic">
                                {desafios[i]}
                              </p>
                            )}
                          </>
                        ) : (
                          <div className="rounded-xl border border-black/10 bg-gradient-to-br from-white to-zinc-50/50 p-5 shadow-sm transition-shadow hover:shadow-md md:p-6">
                            <div className="flex gap-4">
                              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#bdfa3c]/30 text-sm font-bold text-black">
                                {i + 1}
                              </span>
                              <p className="text-black/85 leading-relaxed">{obj}</p>
                            </div>
                          </div>
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
                  <div className="order-3 rounded-xl border border-dashed border-black/20 bg-black/[0.02] p-5 text-center text-black/40 md:p-6" data-timeline-right>
                    Adicione objetivos no painel admin
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
