"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus } from "lucide-react";
import { useState, useRef } from "react";
import type { ServicosBlockData, ServicoItem } from "@/lib/types/budget-content";
import EditableField from "./EditableField";

const CARD_OFFSET = 28;
const STACK_OVERLAP = 12;

const WINDOW_VARIANTS = [
  { bar: "#A855F7", border: "#A855F7", shadow: "#6B21A8" },
  { bar: "#22D3EE", border: "#22D3EE", shadow: "#0891B2" },
  { bar: "#A855F7", border: "#A855F7", shadow: "#6B21A8" },
  { bar: "#22D3EE", border: "#22D3EE", shadow: "#0891B2" },
  { bar: "#EF4444", border: "#EF4444", shadow: "#B91C1C" },
  { bar: "#A855F7", border: "#A855F7", shadow: "#6B21A8" },
];

function toSysSlug(text: string, i: number): string {
  const slug = (text ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_")
    .toUpperCase()
    .replace(/[^A-Z0-9_]/g, "") || `SERVICE_${i + 1}`;
  return `SYS://${slug}`;
}

function ServicoRetroCard({
  item,
  index,
  editable = false,
  onChange,
  onRemove,
}: {
  item: ServicoItem;
  index: number;
  editable?: boolean;
  onChange?: (next: ServicoItem) => void;
  onRemove?: () => void;
}) {
  const v = WINDOW_VARIANTS[index % WINDOW_VARIANTS.length];
  const sysLabel = toSysSlug(item.nome ?? item.titulo ?? "", index);

  return (
    <div
      className="retro-window flex flex-col overflow-hidden rounded-sm border-2 bg-white text-left"
      style={{
        borderColor: v.border,
        boxShadow: `6px 6px 0 ${v.shadow}`,
      }}
    >
      <div
        className="flex items-center justify-between px-2 py-1 text-white"
        style={{ backgroundColor: v.bar }}
      >
        <span className="font-mono text-[10px] font-bold tracking-wide">
          {sysLabel}
        </span>
        <div className="flex gap-0.5">
          <span className="h-2.5 w-2.5 rounded-sm border border-black/30 bg-white/90" />
          <span className="h-2.5 w-2.5 rounded-sm border border-black/30 bg-white/90" />
          {editable ? (
            <button
              type="button"
              onClick={onRemove}
              className="h-2.5 w-2.5 rounded-sm border border-black/30 bg-red-400 hover:bg-red-500 transition-colors"
              title="Excluir card"
              aria-label="Excluir card"
            />
          ) : (
            <span className="h-2.5 w-2.5 rounded-sm border border-black/30 bg-red-400" />
          )}
        </div>
      </div>
      <div className="border-t-2 border-neutral-300 bg-white p-2.5">
        <div className="font-mono text-xs font-semibold text-neutral-800">
          {"{ "}
          {editable ? (
            <EditableField
              value={item.titulo ?? item.nome ?? "Item"}
              onChange={(v) => onChange?.({ ...item, titulo: v, nome: v })}
              isAdmin
              className="inline"
            />
          ) : (
            <span>{item.titulo ?? item.nome ?? "Item"}</span>
          )}
          {" }"}
        </div>
        <div className="mt-1 font-mono text-[11px] text-neutral-600">
          {editable ? (
            <EditableField
              value={item.descricao ?? "Descrição do serviço"}
              onChange={(v) => onChange?.({ ...item, descricao: v })}
              isAdmin
              className="block"
              multiline
              tag="span"
            />
          ) : (
            <>
              &gt; {(item.descricao ?? "").slice(0, 80)}
              {(item.descricao ?? "").length > 80 ? "..." : ""}
            </>
          )}
        </div>
        <div className="mt-1.5 flex items-center gap-1">
          <span className="rounded border border-neutral-300 bg-neutral-100 px-1.5 py-0.5 font-mono text-[10px] text-neutral-600">
            [X] INCLUSO
          </span>
        </div>
      </div>
    </div>
  );
}

interface Props {
  data: ServicosBlockData;
  isAdmin?: boolean;
  onChange?: (d: ServicosBlockData) => void;
  onSave?: (d: ServicosBlockData) => void;
}

export default function ServicosBlock({ data, isAdmin = false, onChange, onSave }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [crudOpen, setCrudOpen] = useState(false);
  const [draftServices, setDraftServices] = useState<ServicoItem[]>([]);

  function set<K extends keyof ServicosBlockData>(key: K, value: ServicosBlockData[K]) {
    onChange?.({ ...data, [key]: value });
  }

  function setServicos(next: ServicoItem[]) {
    set("itens", next);
  }

  const servicos = data.itens ?? data.servicos ?? [];
  const n = Math.max(servicos.length, 1);
  const transitions = Math.max(n - 1, 1);

  function openCrud() {
    setDraftServices(servicos.length > 0 ? [...servicos] : []);
    setCrudOpen(true);
  }

  function saveCrud() {
    const nextData: ServicosBlockData = { ...data, itens: draftServices };
    onChange?.(nextData);
    onSave?.(nextData);
    setActiveIndex(0);
    setCrudOpen(false);
  }

  useGSAP(
    () => {
      if (!sectionRef.current || !pinRef.current || !cardsRef.current || servicos.length === 0) return;
      gsap.registerPlugin(ScrollTrigger);

      // Evita trigger duplicado (StrictMode/re-render) que duplica a seção pinada.
      ScrollTrigger.getById("servicos-pin")?.kill();

      const cards = cardsRef.current.querySelectorAll("[data-service-card]");
      gsap.set(cards, { scale: 0 });
      const shown = new Set<number>();

      const syncCards = (progress: number) => {
        const step = Math.min(Math.floor(progress * transitions), n - 1);
        setActiveIndex(step);
        const visibleUntil = Math.min(step, n - 1);
        cards.forEach((card, i) => {
          const shouldShow = i <= visibleUntil;
          if (shouldShow && !shown.has(i)) {
            shown.add(i);
            gsap.to(card, { scale: 1, duration: 0.4, ease: "power2.out", overwrite: true });
          } else if (!shouldShow && shown.has(i)) {
            shown.delete(i);
            gsap.to(card, { scale: 0, duration: 0.3, ease: "power2.in", overwrite: true });
          }
        });
      };

      // A primeira janela já está visível; o scroll cobre só as transições entre cards.
      const vhPerTransition = 32;
      const scrollDistance = () =>
        `+=${(window.innerHeight * transitions * vhPerTransition) / 100}`;

      const pinTrigger = ScrollTrigger.create({
        id: "servicos-pin",
        trigger: sectionRef.current,
        pin: pinRef.current,
        start: "top top",
        end: scrollDistance(),
        onUpdate: (self) => {
          syncCards(self.progress);
        },
      });

      // Evita "tela branca" ao recriar os cards sem novo evento de scroll.
      syncCards(pinTrigger.progress);

      return () => {
        pinTrigger.kill();
        ScrollTrigger.getById("servicos-pin")?.kill();
      };
    },
    { scope: sectionRef, dependencies: [servicos.length, transitions] }
  );

  const active = servicos[activeIndex] ?? servicos[0];

  return (
    <section
      id="servicos"
      ref={sectionRef}
      className="proposal-section relative bg-white overflow-x-clip"
    >
      <div
        ref={pinRef}
        className="proposal-container relative z-10 bg-white  overflow-x-clip"
      >
        <header className="mb-12 md:mb-16 text-center">
          <h2 className="text-3xl font-bold text-black md:text-4xl lg:text-5xl">
            <EditableField
              value={data.titulo ?? "O que está incluso"}
              onChange={(v) => set("titulo", v)}
              isAdmin={isAdmin}
              className="block"
            />
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-[#7D6B58]">
            <EditableField
              value={data.subtitulo ?? "Tudo que sua empresa precisa para uma presença digital sólida."}
              onChange={(v) => set("subtitulo", v)}
              isAdmin={isAdmin}
              tag="span"
              className="inline"
            />
          </p>
          {isAdmin && (
            <div className="mt-6">
              <button
                type="button"
                onClick={openCrud}
                className="inline-flex items-center gap-2 rounded border border-neutral-300 bg-white px-3 py-1.5 font-mono text-xs text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                <Plus size={14} />
                Gerenciar cards
              </button>
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_minmax(320px,420px)] lg:gap-12 lg:items-start min-h-[50vh]">
          {/* Coluna esquerda: texto que muda conforme o card ativo */}
          <div className="order-1">
            <ServiceDetail key={activeIndex} item={active} index={activeIndex} />
          </div>

          {/* Coluna direita: cards empilhados */}
          <div
            ref={cardsRef}
            className="relative order-2 min-h-[280px] md:min-h-[320px] lg:min-h-[340px]"
          >
            {servicos.map((item, i) => (
              <div
                key={i}
                data-service-card
                className="absolute left-1/2 w-full max-w-md -translate-x-1/2 lg:left-auto lg:right-(--stack-right) lg:translate-x-0"
                style={{
                  // Usamos vars pra conseguir offsets responsivos via classes (Tailwind arbitrary values).
                  ["--stack-top" as string]: `${i * CARD_OFFSET}px`,
                  ["--stack-right" as string]: `${i * STACK_OVERLAP}px`,
                  top: "var(--stack-top)",
                  zIndex: i,
                }}
              >
                <ServicoRetroCard
                  item={item}
                  index={i}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {crudOpen && (
        <div className="fixed inset-0 z-120 bg-black/60 backdrop-blur-[2px] flex items-center justify-center p-4">
          <div className="w-full max-w-4xl max-h-[85vh] overflow-auto rounded border border-neutral-300 bg-white p-4 md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-mono text-sm uppercase tracking-wider text-neutral-800">
                Gerenciar cards do escopo inicial
              </h3>
              <button
                type="button"
                onClick={() => setCrudOpen(false)}
                className="rounded border border-neutral-300 px-2 py-1 text-xs hover:bg-neutral-100"
              >
                Fechar
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {draftServices.map((item, i) => (
                <ServicoRetroCard
                  key={`${item.titulo ?? item.nome ?? "item"}-${i}`}
                  item={item}
                  index={i}
                  editable
                  onChange={(nextItem) => {
                    const next = [...draftServices];
                    next[i] = nextItem;
                    setDraftServices(next);
                  }}
                  onRemove={() => {
                    setDraftServices(draftServices.filter((_, idx) => idx !== i));
                  }}
                />
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 justify-end">
              <button
                type="button"
                onClick={() =>
                  setDraftServices([
                    ...draftServices,
                    { titulo: "Novo serviço", nome: "Novo serviço", descricao: "Descreva este item." },
                  ])
                }
                className="inline-flex items-center gap-2 rounded border border-neutral-300 bg-white px-3 py-1.5 font-mono text-xs text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                <Plus size={14} />
                Adicionar card
              </button>
              <button
                type="button"
                onClick={saveCrud}
                className="rounded bg-black px-3 py-1.5 font-mono text-xs text-white hover:bg-black/90"
              >
                Salvar alterações
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function ServiceDetail({ item, index }: { item?: ServicoItem; index: number }) {
  if (!item) return null;

  return (
    <div className="space-y-4">
      <span className="text-xs font-medium uppercase tracking-wider text-[#bdfa3c]">
        Serviço {index + 1} — Incluso
      </span>
      <h3 className="text-2xl font-bold text-black md:text-3xl">
        {item.titulo ?? item.nome}
      </h3>
      <p className="text-base text-black/70 leading-relaxed md:text-lg">
        {item.descricao}
      </p>
    </div>
  );
}
