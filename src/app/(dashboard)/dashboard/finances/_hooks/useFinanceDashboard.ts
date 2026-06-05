import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type {
  AlertsResponse,
  CategoryResponse,
  FixedCostCoverageResponse,
  ProfitByMonthResponse,
  RecentResponse,
  SummaryResponse,
} from "../_lib/types";

const BASE = "/movimentations/dashboard";

const dashboardKey = (
  resource: string,
  params?: Record<string, unknown>,
) => ["finance-dashboard", resource, params ?? null] as const;

/**
 * Opções compartilhadas por todos os hooks do dashboard financeiro:
 * - `refetchOnMount: "always"` — sempre busca dados frescos ao entrar na tela,
 *   independente do cache existente.
 * - `refetchInterval: 60_000` — polling automático a cada 1 minuto.
 */
const DASHBOARD_QUERY_OPTIONS = {
  refetchOnMount: "always" as const,
  refetchInterval: 60_000,
};

export function useSummary(date?: string) {
  return useQuery({
    ...DASHBOARD_QUERY_OPTIONS,
    queryKey: dashboardKey("summary", { date }),
    queryFn: async () => {
      const { data } = await api.get<SummaryResponse>(`${BASE}/summary`, {
        params: { date },
      });
      return data;
    },
  });
}

export function useRevenueByCategory(date?: string) {
  return useQuery({
    ...DASHBOARD_QUERY_OPTIONS,
    queryKey: dashboardKey("revenue-by-category", { date }),
    queryFn: async () => {
      const { data } = await api.get<CategoryResponse>(
        `${BASE}/revenue-by-category`,
        { params: { date } },
      );
      return data;
    },
  });
}

export function useCostByCategory(date?: string) {
  return useQuery({
    ...DASHBOARD_QUERY_OPTIONS,
    queryKey: dashboardKey("cost-by-category", { date }),
    queryFn: async () => {
      const { data } = await api.get<CategoryResponse>(
        `${BASE}/cost-by-category`,
        { params: { date } },
      );
      return data;
    },
  });
}

export function useProfitByMonth(date?: string) {
  return useQuery({
    ...DASHBOARD_QUERY_OPTIONS,
    queryKey: dashboardKey("profit-by-month", { date }),
    queryFn: async () => {
      const { data } = await api.get<ProfitByMonthResponse>(
        `${BASE}/profit-by-month`,
        { params: { date } },
      );
      return data;
    },
  });
}

export function useFixedCostCoverage(date?: string) {
  return useQuery({
    ...DASHBOARD_QUERY_OPTIONS,
    queryKey: dashboardKey("fixed-cost-coverage", { date }),
    queryFn: async () => {
      const { data } = await api.get<FixedCostCoverageResponse>(
        `${BASE}/fixed-cost-coverage`,
        { params: { date } },
      );
      return data;
    },
  });
}

export function useAlerts(date?: string) {
  return useQuery({
    ...DASHBOARD_QUERY_OPTIONS,
    queryKey: dashboardKey("alerts", { date }),
    queryFn: async () => {
      const { data } = await api.get<AlertsResponse>(`${BASE}/alerts`, {
        params: { date },
      });
      return data;
    },
  });
}

export function useRecent(limit = 10, date?: string) {
  return useQuery({
    ...DASHBOARD_QUERY_OPTIONS,
    queryKey: dashboardKey("recent", { date, limit }),
    queryFn: async () => {
      const { data } = await api.get<RecentResponse>(`${BASE}/recent`, {
        params: { date, limit },
      });
      return data;
    },
  });
}
