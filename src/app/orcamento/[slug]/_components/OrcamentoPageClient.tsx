"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import api from "@/lib/api";
import Budget from "@/lib/models/Budget";
import BudgetViewClient from "./BudgetViewClient";

type Props = {
  slug: string;
};

async function fetchBudgetBySlug(slug: string): Promise<Budget | null> {
  try {
    const res = await api.get<Budget>(`/budgets/slug/${encodeURIComponent(slug)}`);
    return res.data?.id ? res.data : null;
  } catch {
    return null;
  }
}

export default function OrcamentoPageClient({ slug }: Props) {
  const { data, isPending } = useQuery({
    queryKey: ["budget", "orcamento", slug],
    queryFn: () => fetchBudgetBySlug(slug),
    staleTime: 60_000,
  });

  if (isPending) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Carregando proposta...</p>
      </main>
    );
  }

  if (!data) {
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

  const budget = data;

  return (
    <main className="overflow-x-clip">
      <BudgetViewClient budget={budget} />

      <footer className="bg-white border-t border-black/10">
        <div className="mx-auto w-full max-w-[140rem] px-[clamp(1.5rem,4vw,5rem)] py-[clamp(2rem,4vw,3rem)] flex flex-col sm:flex-row items-center justify-between gap-4">
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
