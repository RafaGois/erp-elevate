import { Metadata } from "next";
import { getReportServerLookup } from "@/lib/report-lookup";
import ReportPageClient from "./_components/ReportPageClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await getReportServerLookup(slug);

  if (result.kind !== "found") return { title: "Relatório não encontrado" };
  const { report } = result;

  const title = report.client ? `Relatório de ${report.client}` : report.name;
  const description = "O resumo do mês nas redes sociais, feito pela Elevate.";

  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
  };
}

export default async function RelatorioPage({ params }: Props) {
  const { slug } = await params;
  return <ReportPageClient slug={slug} />;
}
