// Tipos de resposta do dashboard financeiro.
// Contrato documentado em elevate_api/docs/financial-dashboard-api.md

export interface Period {
  start: string;
  end: string;
  currentMonth: string;
  previousMonth: string;
}

export interface KpiMetric {
  value: number;
  previousValue: number;
  changePercent: number | null;
}

export interface SummaryResponse {
  period: Period;
  entradas: KpiMetric;
  saidas: KpiMetric;
  lucro: KpiMetric;
}

export interface CategoryDatum {
  name: string;
  value: number;
  percent: number;
}

export interface CategoryResponse {
  period: Period;
  data: CategoryDatum[];
}

export interface ProfitByMonthDatum {
  name: string;
  entradas: number;
  saidas: number;
  lucro: number;
}

export interface ProfitByMonthResponse {
  period: Period;
  data: ProfitByMonthDatum[];
}

export interface FixedCostCoverageResponse {
  period: Period;
  fixedCostTarget: number;
  lucro: number;
  coveragePercent: number | null;
}

export type AlertSeverity = "positive" | "negative" | "warning" | "info";

export interface AlertDatum {
  type: string;
  severity: AlertSeverity;
  message: string;
  changePercent: number | null;
}

export interface AlertsResponse {
  period: Period;
  data: AlertDatum[];
}

export type MovimentationType = "ENTRADA" | "SAIDA";

export interface RecentMovimentationDatum {
  id: string;
  description: string | null;
  value: number;
  type: MovimentationType;
  date: string;
  category: string | null;
}

export interface RecentResponse {
  period: Period;
  data: RecentMovimentationDatum[];
}
