import { cookies } from "next/headers";
import Budget from "@/lib/models/Budget";

export type BudgetLookup =
  | { kind: "found"; budget: Budget }
  | { kind: "not_found" }
  | { kind: "error" };

export async function getBudgetServerLookup(slug: string): Promise<BudgetLookup> {
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

    if (bySlug.status === 404) {
      return { kind: "not_found" };
    }

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
