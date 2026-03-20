import MovimentationType from "@/lib/enums/MovimentationType";
import type { MovimentationsFilterValues } from "./movimentations-filter-types";

export const MOVIMENTATIONS_FILTERS_STORAGE_KEY =
  "erp-elevate-movimentations-filters";

type StoredShape = {
  ranges?: { from?: string | null; to?: string | null };
  types?: string[];
  categoryIds?: string[];
  bankAccountIds?: string[];
  userIds?: string[];
};

function parseIsoDate(s: string | null | undefined): Date | undefined {
  if (s == null || s === "") return undefined;
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

const VALID_TYPES = new Set<string>([
  MovimentationType.ENTRADA,
  MovimentationType.SAIDA,
]);

export function parseMovimentationsFiltersFromStorage(
  raw: string | null,
): MovimentationsFilterValues | null {
  if (raw == null || raw === "") return null;
  try {
    const data = JSON.parse(raw) as StoredShape;
    const types = (data.types ?? []).filter(
      (t): t is MovimentationType => VALID_TYPES.has(t),
    );
    return {
      ranges: {
        from: parseIsoDate(data.ranges?.from ?? undefined),
        to: parseIsoDate(data.ranges?.to ?? undefined),
      },
      types,
      categoryIds: Array.isArray(data.categoryIds)
        ? data.categoryIds.map(String)
        : [],
      bankAccountIds: Array.isArray(data.bankAccountIds)
        ? data.bankAccountIds.map(String)
        : [],
      userIds: Array.isArray(data.userIds) ? data.userIds.map(String) : [],
    };
  } catch {
    return null;
  }
}

export function serializeMovimentationsFilters(
  v: MovimentationsFilterValues,
): string {
  return JSON.stringify({
    ranges: {
      from: v.ranges?.from?.toISOString?.() ?? null,
      to: v.ranges?.to?.toISOString?.() ?? null,
    },
    types: v.types,
    categoryIds: v.categoryIds,
    bankAccountIds: v.bankAccountIds,
    userIds: v.userIds,
  });
}
