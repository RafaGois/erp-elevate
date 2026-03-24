import { Metadata } from "next";
import { cookies } from "next/headers";
import Budget from "@/lib/models/Budget";
import BudgetViewClient from "./_components/BudgetViewClient";
import OrcamentoResolveClient from "./_components/OrcamentoResolveClient";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ id?: string }>;
};

type BudgetLookup =
  | { kind: "found"; budget: Budget }
  | { kind: "not_found" }
  | { kind: "error" };

async function getBudget(slug: string): Promise<BudgetLookup> {
  const cookieStore = await cookies();
  const token = cookieStore.get("elevate-token")?.value;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["token"] = token.replace(/^Bearer\s+/i, "") || token;
  }

  try {
    const safeSlug = encodeURIComponent(slug);
    const bySlug = await fetch(
      `https://elevatepromedia.com/api/budgets/slug/${safeSlug}`,
      { method: "GET", headers, cache: "no-store" }
    );

    if (bySlug.ok) {
      return { kind: "found", budget: (await bySlug.json()) as Budget };
    }

    // 404 real => não encontrado
    if (bySlug.status === 404) {
      return { kind: "not_found" };
    }

    // Fallback para evitar falso 404 (ex.: variação de endpoint/ambiente)
    const list = await fetch("https://elevatepromedia.com/api/budgets", {
      method: "GET",
      headers,
      cache: "no-store",
    });

    if (list.ok) {
      const budgets = (await list.json()) as Budget[];
      const matched = budgets.find((b) => b.slug === slug);
      if (matched) return { kind: "found", budget: matched };
      return { kind: "not_found" };
    }

    return { kind: "error" };
  } catch {
    return { kind: "error" };
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await getBudget(slug);

  if (result.kind !== "found") return { title: "Proposta não encontrada" };
  const { budget } = result;

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

export default async function OrcamentoPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { id } = await searchParams;
  const result = await getBudget(slug);

  if (result.kind !== "found") {
    return <OrcamentoResolveClient slug={slug} id={id} />;
  }
  const { budget } = result;

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
