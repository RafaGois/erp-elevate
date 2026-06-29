"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import api from "@/lib/api";
import Report from "@/types/models/Report";
import ReportStory from "./ReportStory";

type Props = {
  slug: string;
};

async function fetchReportBySlug(slug: string): Promise<Report | null> {
  try {
    const res = await api.get<Report>(`/reports/slug/${encodeURIComponent(slug)}`);
    return res.data?.id ? res.data : null;
  } catch {
    // Fallback: lista e procura pelo slug (mesma resiliência do orçamento).
    try {
      const list = await api.get<Report[]>("/reports");
      return list.data?.find((r) => r.slug === slug) ?? null;
    } catch {
      return null;
    }
  }
}

export default function ReportPageClient({ slug }: Props) {
  const { data, isPending } = useQuery({
    queryKey: ["report", "relatorio", slug],
    queryFn: () => fetchReportBySlug(slug),
    staleTime: 60_000,
  });

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="size-10 animate-spin rounded-full border-2 border-white/15 border-t-[#bdfa3c]" />
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/40">
            Preparando seu relatório…
          </p>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="space-y-3 text-center">
          <h1 className="text-2xl font-semibold">Relatório não encontrado</h1>
          <p className="text-sm text-white/50">
            Não foi possível localizar um relatório para este link.
          </p>
          <Link href="/dashboard/reports" className="text-sm text-[#bdfa3c] underline">
            Voltar para relatórios
          </Link>
        </div>
      </main>
    );
  }

  return <ReportStory report={data} />;
}
