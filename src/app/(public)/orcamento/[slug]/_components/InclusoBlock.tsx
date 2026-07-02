"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import {
  ArrowRight,
  BadgeCheck,
  GraduationCap,
  Layers,
  Lock,
  Mail,
  MapPin,
  Plus,
  QrCode,
  Signature,
  Sparkles,
  Star,
  Trash2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { InclusoAparato, InclusoBlockData } from "@/types/budget-content";
import { cn } from "@/lib/utils";
import EditableField from "./EditableField";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#bdfa3c";
const MUTED = "#7D6B58";

const APARATO_ICONS: Record<string, LucideIcon> = {
  email: Mail,
  arte: Signature,
  google: MapPin,
  avaliacao: QrCode,
  treino: GraduationCap,
  default: BadgeCheck,
};

interface Props {
  data: InclusoBlockData;
  isAdmin?: boolean;
  onChange?: (d: InclusoBlockData) => void;
}

/* Estrelas decorativas (Google / avaliações) */
function Stars() {
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={12} strokeWidth={0} className="fill-[#f5a623]" />
      ))}
    </span>
  );
}

/* Mini-mockup contextual ao lado de cada aparato */
function AparatoDetail({
  item,
  isAdmin,
  onDetalhe,
}: {
  item: InclusoAparato;
  isAdmin: boolean;
  onDetalhe: (v: string) => void;
}) {
  const tipo = item.tipo ?? "default";

  if (tipo === "email") {
    return (
      <div className="mt-2.5 inline-flex max-w-full items-center gap-2 rounded-md border-2 border-black/80 bg-neutral-50 px-2.5 py-1.5 font-mono text-[12px] text-neutral-800 shadow-[3px_3px_0_rgba(0,0,0,0.15)]">
        <Mail size={13} className="shrink-0" style={{ color: "#0a0a0a" }} />
        <span className="truncate">
          {isAdmin ? (
            <EditableField
              value={item.detalhe ?? "contato@suaempresa.com"}
              onChange={onDetalhe}
              isAdmin
              className="inline"
            />
          ) : (
            item.detalhe ?? "contato@suaempresa.com"
          )}
        </span>
      </div>
    );
  }

  if (tipo === "google") {
    return (
      <div className="mt-2.5 inline-flex items-center gap-2 rounded-md border-2 border-black/80 bg-white px-2.5 py-1.5 shadow-[3px_3px_0_rgba(0,0,0,0.15)]">
        <span className="font-mono text-[12px] font-semibold text-neutral-800">Google</span>
        <Stars />
        <span className="font-mono text-[12px] text-neutral-500">4,9</span>
      </div>
    );
  }

  if (tipo === "avaliacao") {
    return (
      <div className="mt-2.5 inline-flex items-center gap-2.5 rounded-md border-2 border-black/80 bg-white px-2.5 py-2 shadow-[3px_3px_0_rgba(0,0,0,0.15)]">
        <span
          className="grid h-9 w-9 place-items-center rounded-sm border-2 border-black text-black"
          style={{ background: ACCENT }}
        >
          <QrCode size={18} />
        </span>
        <span className="leading-tight">
          <span className="block font-mono text-[11px] font-semibold text-neutral-800">
            Avalie-nos no Google
          </span>
          <span className="mt-0.5 flex items-center gap-1">
            <Stars />
          </span>
        </span>
      </div>
    );
  }

  if (tipo === "arte") {
    return (
      <div className="mt-2.5 w-full max-w-[260px] rounded-md border-2 border-black/80 bg-white p-2.5 shadow-[3px_3px_0_rgba(0,0,0,0.15)]">
        <div className="flex items-center gap-2">
          <span className="h-7 w-7 rounded-sm" style={{ background: ACCENT }} />
          <span className="flex-1">
            <span className="block h-2 w-20 rounded-full bg-neutral-800" />
            <span className="mt-1 block h-1.5 w-28 rounded-full bg-neutral-300" />
          </span>
        </div>
        <div className="mt-2 h-px w-full bg-neutral-200" />
        <div className="mt-2 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ background: ACCENT }} />
          <span className="h-1.5 w-24 rounded-full bg-neutral-300" />
        </div>
      </div>
    );
  }

  return null;
}

function AparatoRow({
  item,
  isAdmin,
  onItem,
  onRemove,
}: {
  item: InclusoAparato;
  isAdmin: boolean;
  onItem: (next: InclusoAparato) => void;
  onRemove: () => void;
}) {
  const Icon = APARATO_ICONS[item.tipo ?? "default"] ?? BadgeCheck;

  return (
    <div className="incluso-row relative flex gap-4 pb-8 last:pb-0" data-incluso-item>
      {/* Nó na trilha */}
      <div className="relative z-10 shrink-0">
        <span
          className="grid h-11 w-11 place-items-center rounded-sm border-2 border-black bg-white text-black transition-colors"
          style={{ boxShadow: "3px 3px 0 rgba(0,0,0,0.9)" }}
        >
          <Icon size={20} />
        </span>
      </div>

      <div className="min-w-0 flex-1 pt-0.5">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-base font-bold text-black md:text-lg">
            {isAdmin ? (
              <EditableField
                value={item.titulo}
                onChange={(v) => onItem({ ...item, titulo: v })}
                isAdmin
                className="inline"
              />
            ) : (
              item.titulo
            )}
          </h4>
          {isAdmin && (
            <button
              type="button"
              onClick={onRemove}
              className="shrink-0 rounded border border-neutral-300 p-1 text-neutral-500 hover:bg-red-50 hover:text-red-600"
              title="Remover aparato"
              aria-label="Remover aparato"
            >
              <Trash2 size={13} />
            </button>
          )}
        </div>
        <p className="mt-1 text-sm leading-relaxed" style={{ color: MUTED }}>
          {isAdmin ? (
            <EditableField
              value={item.descricao}
              onChange={(v) => onItem({ ...item, descricao: v })}
              isAdmin
              tag="span"
              multiline
              className="block"
            />
          ) : (
            item.descricao
          )}
        </p>
        <AparatoDetail
          item={item}
          isAdmin={isAdmin}
          onDetalhe={(v) => onItem({ ...item, detalhe: v })}
        />
      </div>
    </div>
  );
}

export default function InclusoBlock({ data, isAdmin = false, onChange }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);

  function set<K extends keyof InclusoBlockData>(key: K, value: InclusoBlockData[K]) {
    onChange?.({ ...data, [key]: value });
  }

  const itens = data.itens ?? [];

  function setItem(i: number, next: InclusoAparato) {
    const arr = [...itens];
    arr[i] = next;
    set("itens", arr);
  }
  function removeItem(i: number) {
    set(
      "itens",
      itens.filter((_, idx) => idx !== i),
    );
  }
  function addItem() {
    set("itens", [
      ...itens,
      { titulo: "Novo item incluso", descricao: "Descreva o que a sua marca recebe junto com o site.", tipo: "default" },
    ]);
  }

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const targets = sectionRef.current.querySelectorAll<HTMLElement>("[data-incluso-reveal]");
      const rows = sectionRef.current.querySelectorAll<HTMLElement>("[data-incluso-item]");
      if (reduce) return;

      gsap.from(targets, {
        opacity: 0,
        y: 28,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
      });
      gsap.from(rows, {
        opacity: 0,
        x: 24,
        duration: 0.55,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 62%", once: true },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id="incluso" ref={sectionRef} className="proposal-section relative overflow-hidden">
      {/* Fundo distinto: off-white + brilho verde + grade pontilhada */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 85% 0%, rgba(189,250,60,0.16), transparent 55%), linear-gradient(180deg, #f7f7f1 0%, #ffffff 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, #000 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, #000 20%, transparent 80%)",
        }}
      />

      <div className="proposal-container relative z-10">
        {/* Header */}
        <header className="mb-12 max-w-3xl md:mb-16" data-incluso-reveal>
          <span className="preco-pixel-badge">
            <Layers aria-hidden />
            Tudo que está incluso
          </span>
          <h2 className="mt-5 text-3xl font-bold leading-[1.1] text-black md:text-4xl lg:text-5xl">
            <EditableField
              value={data.titulo ?? "O site é a base. Mas o que realmente faz diferença vem junto com ele."}
              onChange={(v) => set("titulo", v)}
              isAdmin={isAdmin}
              className="block"
              multiline
            />
          </h2>
          <p className="mt-4 text-lg leading-relaxed" style={{ color: MUTED }}>
            <EditableField
              value={
                data.subtitulo ??
                "Você está contratando um site institucional completo. E junto com ele recebe um conjunto de ferramentas que ajudam sua marca a ser encontrada, parecer profissional e gerar mais confiança desde o primeiro contato."
              }
              onChange={(v) => set("subtitulo", v)}
              isAdmin={isAdmin}
              tag="span"
              multiline
              className="inline"
            />
          </p>
        </header>

        {/* Corpo: núcleo (site) + trilha de aparatos */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14 lg:items-start">
          {/* ── NÚCLEO: o site ── */}
          <div className="lg:sticky lg:top-24" data-incluso-reveal>
            <div className="relative">
              <span
                className="preco-pixel-badge absolute -top-3 left-4 z-20"
                style={{ background: "#0a0a0a", color: ACCENT }}
              >
                <Star aria-hidden className="fill-current" />
                Produto principal
              </span>

              {/* Mock de navegador = o site */}
              <div
                className="retro-window overflow-hidden rounded-sm border-2 border-black bg-white"
                style={{ boxShadow: "8px 8px 0 #0f172a" }}
              >
                <div
                  className="flex items-center gap-2 border-b-2 border-black px-3 py-2"
                  style={{ background: ACCENT }}
                >
                  <span className="flex gap-1">
                    <span className="h-3 w-3 rounded-full border border-black/40 bg-white/80" />
                    <span className="h-3 w-3 rounded-full border border-black/40 bg-white/80" />
                    <span className="h-3 w-3 rounded-full border border-black/40 bg-white/80" />
                  </span>
                  <span className="ml-1 flex flex-1 items-center gap-1.5 rounded-full border border-black/30 bg-white/85 px-2.5 py-1 font-mono text-[11px] text-neutral-700">
                    <Lock size={11} className="shrink-0" />
                    <span className="truncate">
                      {isAdmin ? (
                        <EditableField
                          value={data.urlExemplo ?? "suaempresa.com.br"}
                          onChange={(v) => set("urlExemplo", v)}
                          isAdmin
                          className="inline"
                        />
                      ) : (
                        data.urlExemplo ?? "suaempresa.com.br"
                      )}
                    </span>
                  </span>
                </div>

                {/* Esqueleto estilizado do site */}
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="h-4 w-20 rounded-sm bg-neutral-800" />
                    <span className="hidden items-center gap-2 sm:flex">
                      <span className="h-2 w-8 rounded-full bg-neutral-300" />
                      <span className="h-2 w-8 rounded-full bg-neutral-300" />
                      <span className="h-2 w-8 rounded-full bg-neutral-300" />
                    </span>
                    <span
                      className="h-5 w-14 rounded-sm border-2 border-black"
                      style={{ background: ACCENT }}
                    />
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-[1.2fr_1fr]">
                    <div>
                      <span className="block h-4 w-11/12 rounded-full bg-neutral-800" />
                      <span className="mt-2 block h-4 w-3/4 rounded-full bg-neutral-800" />
                      <span className="mt-3 block h-2 w-full rounded-full bg-neutral-300" />
                      <span className="mt-1.5 block h-2 w-5/6 rounded-full bg-neutral-300" />
                      <span
                        className="mt-4 inline-block h-7 w-24 rounded-sm border-2 border-black"
                        style={{ background: ACCENT }}
                      />
                    </div>
                    <div
                      className="hidden min-h-[92px] rounded-sm border-2 border-black/80 sm:block"
                      style={{
                        background:
                          "repeating-linear-gradient(135deg, #f4f4f5 0 10px, #e7e7e9 10px 20px)",
                      }}
                    />
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-2.5">
                    {[0, 1, 2].map((k) => (
                      <div key={k} className="rounded-sm border border-neutral-200 bg-neutral-50 p-2">
                        <span className="block h-5 w-5 rounded-sm" style={{ background: ACCENT }} />
                        <span className="mt-2 block h-1.5 w-full rounded-full bg-neutral-300" />
                        <span className="mt-1 block h-1.5 w-2/3 rounded-full bg-neutral-200" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Rótulo do produto principal */}
              <div className="mt-5">
                <h3 className="text-xl font-bold text-black md:text-2xl">
                  <EditableField
                    value={data.produtoTitulo ?? "Site Institucional"}
                    onChange={(v) => set("produtoTitulo", v)}
                    isAdmin={isAdmin}
                    className="inline"
                  />
                </h3>
                <p className="mt-1 text-sm" style={{ color: MUTED }}>
                  <EditableField
                    value={
                      data.produtoDescricao ??
                      "A base sólida da sua presença online. Feito sob medida para transmitir quem você é."
                    }
                    onChange={(v) => set("produtoDescricao", v)}
                    isAdmin={isAdmin}
                    tag="span"
                    multiline
                    className="inline"
                  />
                </p>
                <div className="mt-4 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-black">
                  <span className="hidden lg:inline">E vem com muito mais</span>
                  <span className="lg:hidden">Veja o que vem junto</span>
                  <ArrowRight size={16} className="hidden lg:block" style={{ color: "#4d7c0f" }} />
                </div>
              </div>
            </div>
          </div>

          {/* ── TRILHA: o que vem junto ── */}
          <div data-incluso-reveal>
            <p className="mb-6 font-mono text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#4d7c0f" }}>
              Tudo que acompanha o site
            </p>
            <div className="relative">
              {/* Trilha vertical */}
              <span
                className="pointer-events-none absolute top-4 bottom-4 left-[21px] w-0.5"
                style={{
                  background:
                    "linear-gradient(180deg, #bdfa3c 0%, rgba(0,0,0,0.18) 65%, transparent 100%)",
                }}
                aria-hidden
              />
              {itens.map((item, i) => (
                <AparatoRow
                  key={i}
                  item={item}
                  isAdmin={isAdmin}
                  onItem={(next) => setItem(i, next)}
                  onRemove={() => removeItem(i)}
                />
              ))}
            </div>

            {isAdmin && (
              <button
                type="button"
                onClick={addItem}
                className="mt-2 inline-flex items-center gap-2 rounded border border-neutral-300 bg-white px-3 py-1.5 font-mono text-xs text-neutral-700 transition-colors hover:bg-neutral-100"
              >
                <Plus size={14} />
                Adicionar aparato
              </button>
            )}
          </div>
        </div>

        {/* Fechamento: amarra tudo */}
        <div
          className="mt-12 flex items-start gap-3 rounded-sm border-2 border-black bg-white p-4 md:mt-16 md:items-center md:p-5"
          style={{ boxShadow: "6px 6px 0 #0f172a" }}
          data-incluso-reveal
        >
          <span
            className="grid h-10 w-10 shrink-0 place-items-center rounded-sm border-2 border-black text-black"
            style={{ background: ACCENT }}
          >
            <Sparkles size={20} />
          </span>
          <p className={cn("text-sm font-medium text-black md:text-base")}>
            <EditableField
              value={
                data.nota ??
                "O site institucional vem junto com e-mail profissional, perfil otimizado no Google, sistema para captar avaliações e artes para sua comunicação. Tudo pensado para que sua presença digital funcione de verdade."
              }
              onChange={(v) => set("nota", v)}
              isAdmin={isAdmin}
              tag="span"
              multiline
              className="inline"
            />
          </p>
        </div>
      </div>
    </section>
  );
}
