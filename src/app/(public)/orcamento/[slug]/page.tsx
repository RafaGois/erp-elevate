import { Metadata } from "next";
import { getBudgetServerLookup } from "@/lib/budget-lookup";
import OrcamentoPageClient from "./_components/OrcamentoPageClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await getBudgetServerLookup(slug);

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

export default async function OrcamentoPage({ params }: Props) {
  const { slug } = await params;

  return <OrcamentoPageClient slug={slug} />;
}
