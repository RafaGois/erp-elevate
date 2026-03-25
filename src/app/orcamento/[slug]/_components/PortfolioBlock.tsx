"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ExternalLink, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef } from "react";
import type { PortfolioBlockData, PortfolioItem } from "@/lib/types/budget-content";
import { cn } from "@/lib/utils";
import EditableField from "./EditableField";

gsap.registerPlugin(ScrollTrigger);

/* ─── Window palette (same family as PrecoBlock / ProjetoBlock) ─── */
type WinColors = { bar: string; border: string; shadow: string };

const CARD_COLORS: WinColors[] = [
  { bar: "#27272a", border: "#52525b", shadow: "#09090b" },
  { bar: "#15803d", border: "#22c55e", shadow: "#14532d" },
  { bar: "#0f766e", border: "#14b8a6", shadow: "#115e59" },
  { bar: "#1e3a5f", border: "#3b82f6", shadow: "#0c1f3d" },
  { bar: "#7c3aed", border: "#a78bfa", shadow: "#4c1d95" },
  { bar: "#b45309", border: "#f59e0b", shadow: "#78350f" },
];

function cardSlug(titulo: string, i: number): string {
  const slug = titulo
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_")
    .toUpperCase()
    .replace(/[^A-Z0-9_]/g, "")
    .slice(0, 16);
  return slug || `SITE_${String(i + 1).padStart(2, "0")}`;
}

/* ─── Props ────────────────────────────────────────────────────────── */
interface Props {
  data: PortfolioBlockData;
  isAdmin?: boolean;
  onChange?: (d: PortfolioBlockData) => void;
}

export default function PortfolioBlock({ data, isAdmin = false, onChange }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itens = data.itens ?? [];

  function set<K extends keyof PortfolioBlockData>(key: K, v: PortfolioBlockData[K]) {
    onChange?.({ ...data, [key]: v });
  }

  function patchItem(i: number, patch: Partial<PortfolioItem>) {
    const next = itens.map((it, idx) => (idx === i ? { ...it, ...patch } : it));
    onChange?.({ ...data, itens: next });
  }

  function addItem() {
    onChange?.({
      ...data,
      itens: [
        ...itens,
        { titulo: "Novo projeto", descricao: "Breve descrição do projeto entregue.", tags: [] },
      ],
    });
  }

  function removeItem(i: number) {
    onChange?.({ ...data, itens: itens.filter((_, idx) => idx !== i) });
  }

  const prevCount = useRef(itens.length);
  useEffect(() => {
    if (prevCount.current !== itens.length) {
      prevCount.current = itens.length;
      const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => cancelAnimationFrame(raf);
    }
  }, [itens.length]);

  useLayoutEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current || !pinRef.current || !trackRef.current || itens.length === 0) return;

      const section = sectionRef.current;
      const pin = pinRef.current;
      const track = trackRef.current;
      const cards = track.querySelectorAll<HTMLElement>("[data-portfolio-card]");

      gsap.set(cards, { opacity: 0, y: 30 });

      const getScrollAmount = () => {
        const val = track.scrollWidth - section.offsetWidth;
        return val > 0 ? val : 0;
      };

      const scrollTween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          // Pinamos apenas a área dos cards, mantendo-os centralizados na viewport.
          trigger: pin,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          scrub: true,
          pin: pin,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      cards.forEach((card) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            containerAnimation: scrollTween,
            start: "left 85%",
            end: "left 55%",
            scrub: true,
          },
        });
      });
    },
    { scope: sectionRef, dependencies: [itens.length] }
  );

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="proposal-section relative isolate overflow-hidden bg-white"
    >
      <div className="proposal-container">
        {/* Header */}
        <header data-portfolio-header className="mb-10 md:mb-14">
          <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-5xl">
            <EditableField
              value={data.titulo ?? "Portfólio"}
              onChange={(v) => set("titulo", v)}
              isAdmin={isAdmin}
              multiline
              className="block"
            />
          </h2>
          <p className="mt-3 max-w-2xl font-mono text-sm leading-relaxed text-[#7D6B58]">
            <EditableField
              value={data.subtitulo ?? "Alguns dos projetos que já entregamos."}
              onChange={(v) => set("subtitulo", v)}
              isAdmin={isAdmin}
              multiline
              tag="span"
              className="inline"
            />
          </p>

          {/* Scroll hint */}
          <div className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neutral-400">
            <span>Scroll para navegar</span>
            <ArrowRight className="h-3 w-3" strokeWidth={2} />
          </div>
        </header>
      </div>

      {/* Pinned area — keeps cards centered in viewport while scrolling horizontally */}
      <div
        ref={pinRef}
        className="relative z-0 flex h-screen w-full items-center bg-white"
      >
        <div
          ref={trackRef}
          className="flex gap-5 pl-[max(1rem,calc((100%-72rem)/2+1rem))] pr-16 lg:gap-6"
        >
          {itens.length > 0 ? (
            itens.map((item, i) => {
              const colors = CARD_COLORS[i % CARD_COLORS.length];
              const slug = cardSlug(item.titulo, i);

              return (
                <div
                  key={i}
                  data-portfolio-card
                  className="w-[clamp(280px,40vw,420px)] shrink-0"
                >
                  <div
                    className="bento-retro-cell flex h-full flex-col overflow-hidden rounded-sm border-2 bg-white"
                    style={
                      {
                        borderColor: colors.border,
                        "--bento-shadow": colors.shadow,
                      } as React.CSSProperties
                    }
                  >
                    {/* Title bar */}
                    <div
                      className="flex items-center justify-between gap-1.5 px-2.5 py-1 text-white"
                      style={{ backgroundColor: colors.bar }}
                    >
                      <span
                        className="truncate text-[9px] font-bold tracking-wide"
                        style={{
                          fontFamily: "var(--font-preco-pixel),ui-monospace,monospace",
                        }}
                      >
                        {slug}.HTML
                      </span>
                      <div className="flex shrink-0 items-center gap-1">
                        {isAdmin && (
                          <button
                            type="button"
                            onClick={() => removeItem(i)}
                            className="preco-pixel-btn preco-pixel-btn--xs preco-pixel-btn--pink"
                            title="Remover projeto"
                          >
                            <Trash2 size={11} aria-hidden />
                          </button>
                        )}
                        <div className="flex gap-0.5">
                          <span className="h-2.5 w-2.5 rounded-sm border border-black/30 bg-white/90" />
                          <span className="h-2.5 w-2.5 rounded-sm border border-black/30 bg-white/90" />
                          <span className="h-2.5 w-2.5 rounded-sm border border-black/30 bg-red-400/90" />
                        </div>
                      </div>
                    </div>

                    {/* Screenshot */}
                    <div className="relative aspect-16/10 w-full border-t-2 border-neutral-300 bg-neutral-100">
                      {item.imagem ? (
                        <Image
                          src={item.imagem}
                          alt={item.titulo}
                          fill
                          className="object-cover"
                          sizes="(max-width:768px) 80vw, 420px"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center font-mono text-xs text-neutral-400">
                          screenshot
                        </div>
                      )}

                      {/* URL overlay */}
                      {item.url && !isAdmin && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 z-10 flex items-end justify-end bg-linear-to-t from-black/50 to-transparent p-3 opacity-0 transition-opacity hover:opacity-100"
                        >
                          <span className="flex items-center gap-1.5 rounded-sm border-2 border-white/80 bg-black/60 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                            <ExternalLink className="h-3 w-3" />
                            Visitar
                          </span>
                        </a>
                      )}
                    </div>

                    {/* Body */}
                    <div className="flex flex-1 flex-col border-t border-neutral-200 p-4">
                      <h3 className="text-sm font-bold text-black md:text-base">
                        <EditableField
                          value={item.titulo}
                          onChange={(v) => patchItem(i, { titulo: v })}
                          isAdmin={isAdmin}
                          className="block"
                        />
                      </h3>

                      {(item.descricao || isAdmin) && (
                        <div className="mt-1.5 font-mono text-[11px] leading-relaxed text-neutral-600">
                          <span className="select-none text-neutral-400">&gt; </span>
                          <EditableField
                            value={item.descricao ?? ""}
                            onChange={(v) => patchItem(i, { descricao: v })}
                            isAdmin={isAdmin}
                            multiline
                            tag="span"
                            className="inline"
                            placeholder="Breve descrição do projeto"
                          />
                        </div>
                      )}

                      {/* Tags */}
                      {((item.tags?.length ?? 0) > 0 || isAdmin) && (
                        <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
                          {isAdmin ? (
                            <EditableField
                              value={item.tags?.join(", ") ?? ""}
                              onChange={(v) =>
                                patchItem(i, {
                                  tags: v
                                    .split(",")
                                    .map((t) => t.trim())
                                    .filter(Boolean),
                                })
                              }
                              isAdmin
                              className="w-full rounded-sm border border-dashed border-neutral-300 bg-neutral-50 px-2 py-1 font-mono text-[10px] text-neutral-600"
                              placeholder="Tags separadas por vírgula"
                            />
                          ) : (
                            (item.tags ?? []).map((tag, ti) => (
                              <span
                                key={ti}
                                className={cn(
                                  "rounded-sm border-2 border-black px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-black",
                                  "shadow-[2px_2px_0_#000]"
                                )}
                                style={{
                                  fontFamily: "var(--font-preco-pixel),ui-monospace,monospace",
                                }}
                              >
                                {tag}
                              </span>
                            ))
                          )}
                        </div>
                      )}

                      {/* Visit link for admin editing */}
                      {isAdmin && (
                        <div className="mt-3 border-t border-neutral-200 pt-2">
                          <EditableField
                            value={item.url ?? ""}
                            onChange={(v) => patchItem(i, { url: v })}
                            isAdmin
                            className="w-full font-mono text-[10px] text-blue-600 underline"
                            placeholder="https://exemplo.com"
                          />
                          <EditableField
                            value={item.imagem ?? ""}
                            onChange={(v) => patchItem(i, { imagem: v })}
                            isAdmin
                            className="mt-1 w-full font-mono text-[10px] text-neutral-500"
                            placeholder="URL da imagem/screenshot"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : !isAdmin ? (
            <div className="flex h-48 w-full items-center justify-center rounded-sm border-2 border-dashed border-neutral-300 bg-neutral-50 font-mono text-sm text-neutral-400">
              Portfólio em preparação.
            </div>
          ) : null}

          {/* Add button — admin only, always visible */}
          {isAdmin && (
            <div className="flex w-[clamp(280px,40vw,420px)] shrink-0 items-center justify-center">
              <button
                type="button"
                onClick={addItem}
                className="preco-pixel-btn preco-pixel-btn--lg preco-pixel-btn--outline gap-2"
              >
                <Plus size={14} aria-hidden />
                + Novo projeto
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
