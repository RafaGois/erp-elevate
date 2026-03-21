"use client";

import { useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Loader2, RotateCcw, Save } from "lucide-react";
import type Budget from "@/lib/models/Budget";
import type { BudgetContent } from "@/lib/types/budget-content";
import useAuth from "@/data/hooks/useAuth";
import { UserLevel } from "@/lib/enums/UserLevel";
import api from "@/lib/api";
import BlockRenderer from "./BlockRenderer";
import OrcamentoEmpty from "./OrcamentoEmpty";

interface Props {
  budget: Budget;
  isDemoMode?: boolean;
}

export default function BudgetViewClient({ budget, isDemoMode = false }: Props) {
  const { user } = useAuth();
  const isAdmin = !!user && user.level === UserLevel.ADMIN;

  const initial = budget.content ?? null;
  const [content, setContent] = useState<BudgetContent | null>(initial);
  const [savedContent, setSavedContent] = useState<BudgetContent | null>(initial);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const isDirty =
    isAdmin && content !== null && JSON.stringify(content) !== JSON.stringify(savedContent);

  function handleBlockChange(index: number, data: BudgetContent["blocks"][number]["data"]) {
    setContent((prev) => {
      if (!prev) return prev;
      const blocks = [...prev.blocks];
      blocks[index] = { ...blocks[index], data } as typeof blocks[number];
      return { ...prev, blocks };
    });
    setSaved(false);
  }

  function handleSave() {
    startTransition(async () => {
      await api.put(`/budgets/${budget.id}`, { content });
      setSavedContent(content);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  function handleReset() {
    setContent(savedContent);
    setSaved(false);
  }

  return (
    <div className="relative">
      {/* Admin ribbon */}
      {isAdmin && (
        <div className="relative z-50 bg-[#0A0A0A] text-[#FDFBF7]">
          <div className="max-w-[clamp(90rem,95vw,140rem)] mx-auto px-[clamp(1.5rem,4vw,5rem)] py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#D9381E] rounded-full animate-pulse" />
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/60">
                Modo edição ativo
                {isDemoMode && " · dados locais"}
              </span>
            </div>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-white/30">
              Clique em qualquer texto para editar
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      {content ? (
        <BlockRenderer
          blocks={content.blocks}
          isAdmin={isAdmin}
          onBlockChange={handleBlockChange}
        />
      ) : (
        <OrcamentoEmpty />
      )}

      {/* Floating save bar */}
      <AnimatePresence>
        {isDirty && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="fixed bottom-[clamp(1.5rem,3vw,2.5rem)] left-1/2 -translate-x-1/2 z-[100]"
          >
            <div className="flex items-center gap-4 bg-[#0A0A0A] text-[#FDFBF7] px-6 py-4 shadow-2xl border border-white/10">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-white/50 hover:text-white/90 transition-colors"
              >
                <RotateCcw size={12} />
                Descartar
              </button>
              <div className="w-px h-4 bg-white/20" />
              <button
                onClick={handleSave}
                disabled={isPending}
                className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-[#FDFBF7] hover:text-white transition-colors disabled:opacity-50"
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
    </div>
  );
}
