import { Metadata } from "next";
import { notFound } from "next/navigation";
import api from "@/lib/api";
import Budget from "@/lib/models/Budget";
import BudgetViewClient from "./_components/BudgetViewClient";

type Props = { params: Promise<{ slug: string }> };

async function getBudget(slug: string): Promise<Budget | null> {
  try {
    const res = await api.get<Budget>(`/budgets/slug/${slug}`);
    return res.data;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const budget = await getBudget(slug);

  if (!budget) return { title: "Proposta não encontrada" };

  return {
    title: budget.name,
    description: budget.description ?? `Proposta comercial para ${budget.client ?? "você"}.`,
    openGraph: {
      title: budget.name,
      description: budget.description ?? `Proposta comercial para ${budget.client ?? "você"}.`,
      type: "website",
    },
  };
}

export default async function OrcamentoPage({ params }: Props) {
  const { slug } = await params;
  const budget = await getBudget(slug);

  if (!budget) notFound();

  return (
    <main>
      <BudgetViewClient budget={budget} />

      {/* Footer */}
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
