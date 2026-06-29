"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle, ChevronDown, Loader2, RotateCcw, Save } from "lucide-react";
import { toast } from "sonner";
import Report from "@/types/models/Report";
import type { DadosRelatorio, ReportHighlight } from "@/types/report-content";
import api from "@/lib/api";
import useAuth from "@/hooks/use-auth";
import { UserLevel } from "@/types/enums/UserLevel";
import { mergeReportDados } from "@/lib/data/report-template";
import ReportEditContext from "./report-edit-context";
import { monthLabel } from "./format";
import IntroSlide from "./slides/IntroSlide";
import FollowersSlide from "./slides/FollowersSlide";
import ReachSlide from "./slides/ReachSlide";
import EngagementSlide from "./slides/EngagementSlide";
import ContentSlide from "./slides/ContentSlide";
import HighlightsSlide from "./slides/HighlightsSlide";
import OutroSlide from "./slides/OutroSlide";

interface Props {
  report: Report;
}

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 90 : -90, scale: 0.95 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -90 : 90, scale: 1.03 }),
};

// Atualização imutável por caminho (suporta índices de array: "destaques.0.titulo").
function setIn(obj: unknown, keys: string[], value: unknown): unknown {
  const [k, ...rest] = keys;
  const assign = (target: unknown, key: string, val: unknown): unknown => {
    if (Array.isArray(target)) {
      const arr = [...target];
      arr[Number(key)] = val;
      return arr;
    }
    return { ...(target as Record<string, unknown>), [key]: val };
  };
  if (rest.length === 0) return assign(obj, k, value);
  const child = (obj as Record<string, unknown> | undefined)?.[k];
  const fallback = Number.isNaN(Number(rest[0])) ? {} : [];
  return assign(obj, k, setIn(child ?? fallback, rest, value));
}

export default function ReportStory({ report }: Props) {
  const { user } = useAuth();
  const isAdmin = !!user && user.level === UserLevel.ADMIN;

  const initialDados = useMemo(() => mergeReportDados(report.dados), [report.dados]);
  const [dados, setDados] = useState<DadosRelatorio>(initialDados);
  const [savedDados, setSavedDados] = useState<DadosRelatorio>(initialDados);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const isDirty = isAdmin && JSON.stringify(dados) !== JSON.stringify(savedDados);

  const setField = useCallback((path: string, value: number | string) => {
    setDados((prev) => setIn(prev, path.split("."), value) as DadosRelatorio);
    setSaved(false);
  }, []);

  const addDestaque = useCallback((highlight?: Partial<ReportHighlight>) => {
    setDados((prev) => ({
      ...prev,
      destaques: [...(prev.destaques ?? []), { titulo: "Novo destaque", ...highlight }],
    }));
    setSaved(false);
  }, []);

  const removeDestaque = useCallback((index: number) => {
    setDados((prev) => ({
      ...prev,
      destaques: (prev.destaques ?? []).filter((_, i) => i !== index),
    }));
    setSaved(false);
  }, []);

  function handleSave() {
    startTransition(async () => {
      try {
        await api.put(`/reports/${report.id}`, { dados });
        setSavedDados(dados);
        setSaved(true);
        toast.success("Relatório salvo com sucesso.");
        setTimeout(() => setSaved(false), 2000);
      } catch {
        toast.error("Erro ao salvar. Tente novamente.");
      }
    });
  }

  function handleReset() {
    setDados(savedDados);
    setSaved(false);
  }

  // Monta a narrativa. Admin vê tudo (para preencher); cliente só o que tem valor.
  const slides = useMemo(() => {
    const list: { key: string; node: React.ReactNode }[] = [];
    list.push({ key: "intro", node: <IntroSlide report={report} /> });

    const p = dados.perfil;
    if (isAdmin || p.seguidoresFim > 0 || (p.novosSeguidores ?? 0) !== 0) {
      list.push({ key: "followers", node: <FollowersSlide /> });
    }

    if (isAdmin || dados.alcanceEVisualizacoes.visualizacoesMensais > 0) {
      list.push({ key: "reach", node: <ReachSlide /> });
    }

    const e = dados.engajamento ?? {};
    const engTotal = (e.curtidas ?? 0) + (e.comentarios ?? 0) + (e.compartilhamentos ?? 0) + (e.salvamentos ?? 0);
    if (isAdmin || engTotal > 0) {
      list.push({ key: "engagement", node: <EngagementSlide /> });
    }

    const c = dados.conteudo ?? {};
    const conteudoTotal =
      (c.totalPublicacoes ?? 0) + Object.values(c.porTipo ?? {}).reduce((s, v) => s + (v ?? 0), 0);
    if (isAdmin || conteudoTotal > 0) {
      list.push({ key: "content", node: <ContentSlide /> });
    }

    if (isAdmin || (dados.destaques?.length ?? 0) > 0) {
      list.push({ key: "highlights", node: <HighlightsSlide /> });
    }

    list.push({ key: "outro", node: <OutroSlide report={report} /> });
    return list;
  }, [report, dados, isAdmin]);

  const total = slides.length;
  const [[index, direction], setNav] = useState<[number, number]>([0, 0]);
  const lockRef = useRef(false);
  const touchX = useRef<number | null>(null);

  // Mantém o índice válido se a quantidade de slides mudar (ex: admin esvazia algo).
  useEffect(() => {
    setNav(([curr, dir]) => (curr >= total ? [total - 1, dir] : [curr, dir]));
  }, [total]);

  const paginate = useCallback(
    (dir: number) => {
      setNav(([curr]) => {
        const next = curr + dir;
        if (next < 0 || next >= total) return [curr, dir];
        return [next, dir];
      });
    },
    [total]
  );

  const goTo = useCallback((target: number) => {
    setNav(([curr]) => [target, target > curr ? 1 : -1]);
  }, []);

  useEffect(() => {
    function onKey(ev: KeyboardEvent) {
      const tag = (ev.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return; // não navegar enquanto edita
      if (["ArrowRight", "ArrowDown", " ", "PageDown", "Enter"].includes(ev.key)) {
        ev.preventDefault();
        paginate(1);
      } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(ev.key)) {
        ev.preventDefault();
        paginate(-1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paginate]);

  function onWheel(ev: React.WheelEvent) {
    if (Math.abs(ev.deltaY) < 24 || lockRef.current) return;
    lockRef.current = true;
    paginate(ev.deltaY > 0 ? 1 : -1);
    window.setTimeout(() => {
      lockRef.current = false;
    }, 850);
  }

  function onTouchStart(ev: React.TouchEvent) {
    touchX.current = ev.touches[0].clientX;
  }
  function onTouchEnd(ev: React.TouchEvent) {
    if (touchX.current === null) return;
    const delta = ev.changedTouches[0].clientX - touchX.current;
    if (Math.abs(delta) > 60) paginate(delta < 0 ? 1 : -1);
    touchX.current = null;
  }

  const safeIndex = Math.min(index, total - 1);
  const isFirst = safeIndex === 0;
  const isLast = safeIndex === total - 1;
  const progress = ((safeIndex + 1) / total) * 100;

  return (
    <ReportEditContext.Provider value={{ isAdmin, dados, setField, addDestaque, removeDestaque }}>
      <main
        className="report-deck fixed inset-0 h-dvh w-full overflow-hidden"
        onWheel={onWheel}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Fundo base */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[#04130b]">
          <div
            className="absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(ellipse 90% 60% at 50% 0%, rgba(34,197,94,0.16) 0%, transparent 55%), radial-gradient(ellipse 80% 50% at 50% 100%, rgba(189,250,60,0.08) 0%, transparent 55%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)",
            }}
          />
        </div>

        {/* Barra de progresso */}
        <div className="absolute left-0 right-0 top-0 z-30 h-[3px] bg-white/10">
          <motion.div
            className="h-full bg-[#bdfa3c]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Cabeçalho */}
        <div className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-[clamp(1.25rem,4vw,3rem)] pt-[clamp(1.25rem,3vh,2rem)]">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-white/50">elevate</span>
          {isAdmin ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-[#bdfa3c]/30 bg-[#bdfa3c]/10 px-3 py-1 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-[#bdfa3c]">
              <span className="size-1.5 animate-pulse rounded-full bg-[#bdfa3c]" />
              Modo edição · clique nos valores
            </span>
          ) : (
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/40">
              {monthLabel(report.competencia)}
            </span>
          )}
        </div>

        {/* Slide atual */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slides[safeIndex].key}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            {slides[safeIndex].node}
          </motion.div>
        </AnimatePresence>

        {/* Pontinhos */}
        <div className="absolute left-1/2 top-[clamp(2.5rem,5vh,3.5rem)] z-30 flex -translate-x-1/2 gap-2">
          {slides.map((s, i) => (
            <button
              key={s.key}
              aria-label={`Ir para o slide ${i + 1}`}
              onClick={() => goTo(i)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === safeIndex ? 26 : 8,
                backgroundColor: i === safeIndex ? "#bdfa3c" : "rgba(255,255,255,0.25)",
              }}
            />
          ))}
        </div>

        {/* Navegação inferior */}
        <div className="absolute bottom-[clamp(1.25rem,4vh,2.5rem)] left-0 right-0 z-30 flex items-center justify-center gap-5">
          <button
            onClick={() => paginate(-1)}
            disabled={isFirst}
            aria-label="Anterior"
            className="flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur transition-all hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-25"
          >
            <ArrowLeft className="size-4" />
          </button>
          <span className="font-mono text-[0.65rem] tabular-nums tracking-[0.2em] text-white/50">
            {String(safeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <button
            onClick={() => paginate(1)}
            disabled={isLast}
            aria-label="Próximo"
            className="flex size-11 items-center justify-center rounded-full border border-[#bdfa3c]/30 bg-[#bdfa3c]/15 text-[#bdfa3c] backdrop-blur transition-all hover:bg-[#bdfa3c]/25 disabled:cursor-not-allowed disabled:opacity-25"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>

        {/* Dica de navegação (primeiro slide) */}
        <AnimatePresence>
          {isFirst && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.4 }}
              className="absolute bottom-[clamp(5rem,11vh,7rem)] left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-1 text-white/40"
            >
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em]">Role ou use as setas</span>
              <ChevronDown className="report-bob size-4" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Barra flutuante de salvar (admin) */}
        <AnimatePresence>
          {isDirty && (
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="fixed bottom-[clamp(1.25rem,4vh,2.5rem)] right-[clamp(1.25rem,4vw,2.5rem)] z-50"
            >
              <div className="flex items-center gap-4 rounded-full border border-white/10 bg-black/80 px-6 py-3 shadow-2xl backdrop-blur">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-white/50 transition-colors hover:text-white/90"
                >
                  <RotateCcw size={12} />
                  Descartar
                </button>
                <div className="h-4 w-px bg-white/20" />
                <button
                  onClick={handleSave}
                  disabled={isPending}
                  className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-[#bdfa3c] transition-colors hover:text-white disabled:opacity-50"
                >
                  {isPending ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : saved ? (
                    <CheckCircle size={12} className="text-emerald-400" />
                  ) : (
                    <Save size={12} />
                  )}
                  {isPending ? "Salvando…" : saved ? "Salvo" : "Salvar alterações"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </ReportEditContext.Provider>
  );
}
