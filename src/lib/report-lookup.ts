import { cookies } from "next/headers";
import Report from "@/types/models/Report";

// Server-side lookup de relatório por slug, espelhando getBudgetServerLookup.
// Usado apenas para gerar metadata (a página em si busca client-side).
export type ReportLookup =
  | { kind: "found"; report: Report }
  | { kind: "not_found" }
  | { kind: "error" };

export async function getReportServerLookup(slug: string): Promise<ReportLookup> {
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
      `https://elevatepromedia.com/api/reports/slug/${safeSlug}`,
      { method: "GET", headers, cache: "no-store" }
    );

    if (bySlug.ok) {
      return { kind: "found", report: (await bySlug.json()) as Report };
    }

    if (bySlug.status === 404) {
      return { kind: "not_found" };
    }

    // Fallback: lista geral e procura pelo slug (mesma resiliência do orçamento).
    const list = await fetch("https://elevatepromedia.com/api/reports", {
      method: "GET",
      headers,
      cache: "no-store",
    });

    if (list.ok) {
      const reports = (await list.json()) as Report[];
      const matched = reports.find((r) => r.slug === slug);
      if (matched) return { kind: "found", report: matched };
      return { kind: "not_found" };
    }

    return { kind: "error" };
  } catch {
    return { kind: "error" };
  }
}
