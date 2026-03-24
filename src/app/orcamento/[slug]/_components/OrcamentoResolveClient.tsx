"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import type Budget from "@/lib/models/Budget";
import BudgetViewClient from "./BudgetViewClient";

interface Props {
  slug: string;
  id?: string;
}

export default function OrcamentoResolveClient({ slug, id }: Props) {
  const [loading, setLoading] = useState(true);
  const [budget, setBudget] = useState<Budget | null>(null);

  useEffect(() => {
    let mounted = true;

    async function resolveBudget() {
      try {
        const bySlug = await api.get<Budget>(`/budgets/slug/${encodeURIComponent(slug)}`);
        if (mounted && bySlug?.data?.id) {
          setBudget(bySlug.data);
          setLoading(false);
          return;
        }
      } catch {
        // tenta fallback abaixo
      }

      if (id) {
        try {
          const byId = await api.get<Budget>(`/budgets/${id}`);
          if (mounted && byId?.data?.id) {
            setBudget(byId.data);
            setLoading(false);
            return;
          }
        } catch {
          // sem budget
        }
      }

      if (mounted) setLoading(false);
    }

    resolveBudget();
    return () => {
      mounted = false;
    };
  }, [slug, id]);

  if (loading) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Carregando proposta...</p>
      </main>
    );
  }

  if (!budget) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center space-y-3">
          <h1 className="text-2xl font-semibold">Proposta não encontrada</h1>
          <p className="text-sm text-muted-foreground">
            Não foi possível localizar um orçamento para este link.
          </p>
          <Link href="/dashboard/projects/budgets" className="text-sm underline">
            Voltar para orçamentos
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <BudgetViewClient budget={budget} />

      <footer className="bg-white border-t border-black/10">
        <div className="max-w-[clamp(90rem,95vw,140rem)] mx-auto px-[clamp(1.5rem,4vw,5rem)] py-[clamp(2rem,4vw,3rem)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[0.75rem] text-[#7D6B58]">
            {budget.name}
            {budget.client && <span> · Para {budget.client}</span>}
          </p>
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.15em] text-black/40">
            Proposta confidencial · Não compartilhe sem autorização
          </p>
        </div>
      </footer>
    </main>
  );
}

