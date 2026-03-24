"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import type {
  ProjetoBlockData,
  ProjetoCapitulo,
  ProjetoEstatistica,
} from "@/lib/types/budget-content";
import { cn } from "@/lib/utils";
import EditableField from "./EditableField";

gsap.registerPlugin(ScrollTrigger);

/* ─── Window palettes ─────────────────────────────────────────────── */
type WinColors = { bar: string; border: string; shadow: string };

const HERO_C: WinColors = { bar: "#bdfa3c", border: "#84cc16", shadow: "#3f6212" };

const STAT_C: WinColors[] = [
  { bar: "#15803d", border: "#22c55e", shadow: "#14532d" },
  { bar: "#0f766e", border: "#14b8a6", shadow: "#115e59" },
  { bar: "#b45309", border: "#f59e0b", shadow: "#78350f" },
  { bar: "#7c3aed", border: "#a78bfa", shadow: "#4c1d95" },
];

const CAP_C: WinColors[] = [
  { bar: "#27272a", border: "#52525b", shadow: "#09090b" },
  { bar: "#1e3a5f", border: "#3b82f6", shadow: "#0c1f3d" },
  { bar: "#15803d", border: "#22c55e", shadow: "#14532d" },
  { bar: "#0f766e", border: "#14b8a6", shadow: "#115e59" },
];

/* ─── Helpers ─────────────────────────────────────────────────────── */
interface Props {
  data: ProjetoBlockData;
  isAdmin?: boolean;
  onChange?: (d: ProjetoBlockData) => void;
}

function getChapters(data: ProjetoBlockData): ProjetoCapitulo[] {
  if (data.capitulos?.length) return data.capitulos;
  const objs = data.objetivos ?? [];
  return objs.map((corpo, i) => {
    const first = corpo.trim().split(/[.!?\n]/)[0]?.trim() ?? "";
    return {
      titulo: first.length > 0 && first.length <= 80 ? first : `Capítulo ${i + 1}`,
      corpo,
      pontos: data.desafios?.[i]?.trim() ? [data.desafios[i]] : undefined,
    };
  });
}

function patchChapter(
  data: ProjetoBlockData,
  i: number,
  patch: Partial<ProjetoCapitulo>
): ProjetoBlockData {
  const chs = getChapters(data).map((c, idx) => (idx === i ? { ...c, ...patch } : c));
  return { ...data, capitulos: chs };
}

function patchStat(
  data: ProjetoBlockData,
  i: number,
  patch: Partial<ProjetoEstatistica>
): ProjetoBlockData {
  const base = Array.from({ length: 4 }, (_, idx) =>
    data.estatisticas?.[idx] ? { ...data.estatisticas[idx] } : { valor: "", legenda: "" }
  );
  base[i] = { ...base[i], ...patch };
  return { ...data, estatisticas: base };
}

function slugify(s: string): string {
  return (
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "_")
      .toUpperCase()
      .replace(/[^A-Z0-9_]/g, "")
      .slice(0, 14) || "DATA"
  );
}

const COL_SPAN: Record<number, string> = {
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  6: "lg:col-span-6",
};

function chapterSpans(count: number): number[] {
  const pattern = [2, 4, 4, 2, 3, 3];
  const spans: number[] = [];
  let pi = 0;
  let left = count;
  while (left > 0) {
    if (left === 1) {
      spans.push(6);
      left = 0;
    } else {
      spans.push(pattern[pi % pattern.length]);
      pi++;
      left--;
    }
  }
  return spans;
}

/* ─── RetroWindow ─────────────────────────────────────────────────── */
function RetroWindow({
  title,
  colors,
  hero,
  className,
  children,
}: {
  title: string;
  colors: WinColors;
  hero?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const barFg = hero ? "text-black" : "text-white";
  const barBg = hero
    ? {
        backgroundColor: colors.bar,
        backgroundImage:
          "repeating-linear-gradient(-45deg,transparent,transparent 5px,rgba(0,0,0,0.06) 5px,rgba(0,0,0,0.06) 6px)",
      }
    : { backgroundColor: colors.bar };

  return (
    <div
      className="bento-retro-cell flex h-full flex-col overflow-hidden rounded-sm border-2 bg-white"
      style={
        { borderColor: colors.border, "--bento-shadow": colors.shadow } as React.CSSProperties
      }
    >
      <div
        className={cn("flex items-center justify-between gap-1.5 px-2.5 py-1", barFg)}
        style={barBg}
      >
        <span
          className="truncate text-[9px] font-bold tracking-wide"
          style={{ fontFamily: "var(--font-preco-pixel),ui-monospace,monospace" }}
        >
          {title}
        </span>
        <div className="flex shrink-0 gap-0.5">
          <span className="h-2.5 w-2.5 rounded-sm border border-black/30 bg-white/90" />
          <span className="h-2.5 w-2.5 rounded-sm border border-black/30 bg-white/90" />
          <span className="h-2.5 w-2.5 rounded-sm border border-black/30 bg-red-400/90" />
        </div>
      </div>
      <div className={cn("flex-1 border-t-2 border-neutral-300", className)}>{children}</div>
    </div>
  );
}

/* ─── Main ────────────────────────────────────────────────────────── */
export default function ProjetoBlock({ data, isAdmin = false, onChange }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const chapters = getChapters(data);
  const stats: ProjetoEstatistica[] = isAdmin
    ? Array.from({ length: 4 }, (_, i) => data.estatisticas?.[i] ?? { valor: "", legenda: "" })
    : (data.estatisticas ?? []).filter((s) => s.valor.trim() && s.legenda.trim());
  const hasStats = stats.length > 0;
  const showHero = isAdmin || Boolean(data.introducao?.trim());

  function set<K extends keyof ProjetoBlockData>(key: K, v: ProjetoBlockData[K]) {
    onChange?.({ ...data, [key]: v });
  }

  useLayoutEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, []);

  useGSAP(
    () => {
      if (!gridRef.current) return;

      const cells = gridRef.current.querySelectorAll<HTMLElement>("[data-bento]");

      cells.forEach((cell) => {
        const isHero = cell.hasAttribute("data-bento-hero");
        const isStat = cell.hasAttribute("data-bento-stat");

        gsap.fromTo(
          cell,
          {
            opacity: 0,
            y: isHero ? 48 : isStat ? 32 : 56,
            scale: isStat ? 0.92 : 0.96,
            rotateX: isHero ? 4 : 0,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            ease: "none",
            scrollTrigger: {
              trigger: cell,
              start: "top bottom-=40",
              end: "top 60%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      const statInners = gridRef.current.querySelectorAll<HTMLElement>("[data-bento-stat-value]");
      statInners.forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.6, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom-=20",
              end: "top 70%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      const checkmarks = gridRef.current.querySelectorAll<HTMLElement>("[data-bento-check]");
      checkmarks.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -12 },
          {
            opacity: 1,
            x: 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: `top bottom-=${10 + i * 4}`,
              end: "top 75%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      const header = sectionRef.current?.querySelector<HTMLElement>("[data-bento-header]");
      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: header,
              start: "top bottom-=60",
              end: "top 70%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [chapters.length, stats.length] }
  );

  const spans = chapterSpans(chapters.length);

  return (
    <section id="projeto" ref={sectionRef} className="proposal-section bg-white">
      <div className="proposal-container">
        {/* Header */}
        <header data-bento-header className="mb-10 md:mb-14">
          <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-5xl">
            <EditableField
              value={data.titulo ?? "Por que investir"}
              onChange={(v) => set("titulo", v)}
              isAdmin={isAdmin}
              multiline
              className="block"
            />
          </h2>
          <p className="mt-3 max-w-2xl font-mono text-sm leading-relaxed text-[#7D6B58]">
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

        {/* ── Bento ── */}
        <div ref={gridRef} className="space-y-3 lg:space-y-4">
          {/* Top band — Hero + Stats */}
          {(showHero || hasStats) && (
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-6 lg:gap-4">
              {showHero && (
                <div
                  data-bento
                  data-bento-hero
                  className={cn(
                    "col-span-2",
                    hasStats ? "lg:col-span-4 lg:row-span-2" : "lg:col-span-6"
                  )}
                >
                  <RetroWindow
                    title="PROPOSTA.EXE"
                    colors={HERO_C}
                    hero
                    className="bg-linear-to-b from-white via-[#f7fee7]/60 to-white"
                  >
                    <div className="flex h-full flex-col p-4 md:p-6 lg:p-8">
                      {/* Terminal prompt */}
                      <div className="mb-4 select-none font-mono text-[11px] text-neutral-500">
                        <span className="text-[#15803d]">elevate</span>
                        <span className="text-neutral-400">@proposta</span>
                        <span className="text-neutral-300"> ~ </span>
                        <span>cat README.md</span>
                      </div>

                      <div className="flex-1">
                        <EditableField
                          value={data.introducao ?? ""}
                          onChange={(v) => set("introducao", v)}
                          isAdmin={isAdmin}
                          multiline
                          placeholder="Texto de abertura: por que este investimento importa…"
                          className="text-sm leading-[1.85] text-black/80 md:text-[0.95rem]"
                        />
                      </div>

                      <span
                        className="mt-4 inline-block h-4 w-2 bg-[#15803d] bento-cursor-blink"
                        aria-hidden
                      />
                    </div>
                  </RetroWindow>
                </div>
              )}

              {hasStats &&
                stats.map((stat, i) => (
                  <div key={`s${i}`} data-bento data-bento-stat className="col-span-1">
                    <RetroWindow
                      title={`STAT://${slugify(stat.valor || `N${i}`)}`}
                      colors={STAT_C[i % STAT_C.length]}
                    >
                      <div className="flex h-full flex-col justify-between p-3 md:p-4">
                        {isAdmin ? (
                          <>
                            <EditableField
                              value={stat.valor}
                              onChange={(v) => onChange?.(patchStat(data, i, { valor: v }))}
                              isAdmin
                              className="font-mono text-2xl font-bold tracking-tight text-black md:text-3xl"
                              placeholder="—"
                            />
                            <div className="bento-stat-divider my-2" />
                            <EditableField
                              value={stat.legenda}
                              onChange={(v) => onChange?.(patchStat(data, i, { legenda: v }))}
                              isAdmin
                              multiline
                              className="font-mono text-[9px] uppercase leading-snug tracking-wide text-neutral-500"
                              placeholder="Legenda"
                            />
                          </>
                        ) : (
                          <>
                            <span data-bento-stat-value className="bento-stat-glow font-mono text-2xl font-bold tracking-tight text-black md:text-3xl">
                              {stat.valor}
                            </span>
                            <div className="bento-stat-divider my-2" />
                            <span className="font-mono text-[9px] uppercase leading-snug tracking-wide text-neutral-500">
                              {stat.legenda}
                            </span>
                          </>
                        )}
                      </div>
                    </RetroWindow>
                  </div>
                ))}
            </div>
          )}

          {/* Bottom band — Chapters */}
          {chapters.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-6 lg:gap-4">
              {chapters.map((cap, i) => {
                const pts = cap.pontos?.filter((p) => p.trim()) ?? [];
                const num = String(i + 1).padStart(2, "0");

                return (
                  <div
                    key={`c${i}`}
                    data-bento
                    className={cn("col-span-2", COL_SPAN[spans[i]] ?? "lg:col-span-3")}
                  >
                    <RetroWindow
                      title={`C:\\BENEFICIO_${num}`}
                      colors={CAP_C[i % CAP_C.length]}
                    >
                      <div className="bento-scanlines relative p-4 md:p-5 lg:p-6">
                        {/* Chapter number — pixel font */}
                        <span
                          className="mb-2 inline-block text-[8px] font-bold uppercase tracking-widest text-neutral-400"
                          style={{
                            fontFamily: "var(--font-preco-pixel),ui-monospace,monospace",
                          }}
                        >
                          [{num}]
                        </span>

                        <h3 className="text-base font-bold text-black md:text-lg">
                          <EditableField
                            value={cap.titulo}
                            onChange={(v) => onChange?.(patchChapter(data, i, { titulo: v }))}
                            isAdmin={isAdmin}
                            multiline
                            className="block"
                          />
                        </h3>

                        <div className="mt-3 font-mono text-[11px] leading-relaxed text-neutral-600 md:text-xs">
                          <span className="select-none text-neutral-400">&gt; </span>
                          <EditableField
                            value={cap.corpo}
                            onChange={(v) => onChange?.(patchChapter(data, i, { corpo: v }))}
                            isAdmin={isAdmin}
                            multiline
                            tag="span"
                            className="inline"
                          />
                        </div>

                        {(pts.length > 0 || isAdmin) && (
                          <div className="mt-4 space-y-1.5 border-t border-neutral-200 pt-3">
                            {isAdmin ? (
                              <EditableField
                                value={cap.pontos?.join("\n") ?? ""}
                                onChange={(v) =>
                                  onChange?.(
                                    patchChapter(data, i, {
                                      pontos: v
                                        .split("\n")
                                        .map((l) => l.trim())
                                        .filter(Boolean),
                                    })
                                  )
                                }
                                isAdmin
                                multiline
                                placeholder="Um bullet por linha"
                                className="block w-full rounded-sm border border-dashed border-neutral-300 bg-neutral-50 px-3 py-2 font-mono text-[11px] text-neutral-700"
                              />
                            ) : (
                              pts.map((p, j) => (
                                <div
                                  key={j}
                                  data-bento-check
                                  className="flex items-start gap-2 font-mono text-[11px] text-neutral-700"
                                >
                                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-black bg-[#bdfa3c] text-[9px] font-bold leading-none text-black">
                                    ✓
                                  </span>
                                  <span>{p}</span>
                                </div>
                              ))
                            )}
                          </div>
                        )}
                      </div>
                    </RetroWindow>
                  </div>
                );
              })}
            </div>
          ) : (
            <div data-bento>
              <RetroWindow title="EMPTY.DAT" colors={CAP_C[0]}>
                <div className="p-6 text-center font-mono text-sm text-neutral-400">
                  {isAdmin
                    ? "Adicione capítulos no JSON ou preencha objetivos (legado)."
                    : "Conteúdo desta seção em definição."}
                </div>
              </RetroWindow>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
