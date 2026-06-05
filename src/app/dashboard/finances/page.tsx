"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  ChartPie,
  CircleDollarSign,
  History,
  LineChart,
  ShieldAlert,
  Wallet,
} from "lucide-react";

import {
  useAlerts,
  useCostByCategory,
  useFixedCostCoverage,
  useProfitByMonth,
  useRecent,
  useRevenueByCategory,
  useSummary,
} from "./_hooks/useFinanceDashboard";
import KpiCard from "./_components/KpiCard";
import FinancePanelCard from "./_components/FinancePanelCard";
import AlertsList from "./_components/AlertsList";
import RecentMovimentations from "./_components/RecentMovimentations";
import ChartState from "./_components/ChartState";
import ProfitByMonthChart from "./_components/charts/ProfitByMonthChart";
import CategoryDonut from "./_components/charts/CategoryDonut";
import CoverageGauge from "./_components/charts/CoverageGauge";
import { Skeleton } from "@/components/ui/skeleton";

export default function FinanceDashboard() {
  const summary = useSummary();
  const profitByMonth = useProfitByMonth();
  const coverage = useFixedCostCoverage();
  const revenue = useRevenueByCategory();
  const cost = useCostByCategory();
  const alerts = useAlerts();
  const recent = useRecent(8);

  const period = summary.data?.period;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard Financeiro
        </h1>
        <p className="text-muted-foreground">
          {period
            ? `Visão geral de ${period.currentMonth} · janela de 12 meses`
            : "Visão geral das finanças e desempenho financeiro"}
        </p>
      </div>

      {/* KPIs — mesmo grid e card da tela de movimentações */}
      <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
        {summary.isLoading || !summary.data ? (
          <>
            <Skeleton className="h-[120px] rounded-sm" />
            <Skeleton className="h-[120px] rounded-sm" />
            <Skeleton className="h-[120px] rounded-sm" />
          </>
        ) : (
          <>
            <KpiCard
              title="Entradas"
              metric={summary.data.entradas}
              icon={<ArrowUpRight />}
            />
            <KpiCard
              title="Saídas"
              metric={summary.data.saidas}
              icon={<ArrowDownRight />}
            />
            <KpiCard
              title="Lucro"
              metric={summary.data.lucro}
              icon={<Wallet />}
              highlight
            />
          </>
        )}
      </div>

      {/* Série anual + cobertura de custos fixos */}
      <div className="grid grid-cols-1 gap-4 @5xl/main:grid-cols-3">
        <FinancePanelCard
          className="@5xl/main:col-span-2"
          title="Evolução dos últimos 12 meses"
          description="Entradas, saídas e lucro mês a mês"
          icon={<LineChart />}
        >
          <ChartState
            isLoading={profitByMonth.isLoading}
            isError={profitByMonth.isError}
            isEmpty={!profitByMonth.data?.data?.length}
          >
            {profitByMonth.data && (
              <ProfitByMonthChart data={profitByMonth.data.data} />
            )}
          </ChartState>
        </FinancePanelCard>

        <FinancePanelCard
          title="Cobertura de custos fixos"
          description="Lucro vs. meta de custos fixos"
          icon={<ShieldAlert />}
        >
          <ChartState
            isLoading={coverage.isLoading}
            isError={coverage.isError}
            height={300}
          >
            {coverage.data && <CoverageGauge coverage={coverage.data} />}
          </ChartState>
        </FinancePanelCard>
      </div>

      {/* Distribuições por categoria */}
      <div className="grid grid-cols-1 gap-4 @5xl/main:grid-cols-2">
        <FinancePanelCard
          title="Receita por categoria"
          description="Distribuição das entradas do mês"
          icon={<ChartPie />}
        >
          <ChartState
            isLoading={revenue.isLoading}
            isError={revenue.isError}
            isEmpty={!revenue.data?.data?.length}
          >
            {revenue.data && <CategoryDonut data={revenue.data.data} />}
          </ChartState>
        </FinancePanelCard>

        <FinancePanelCard
          title="Custos por categoria"
          description="Distribuição das saídas do mês"
          icon={<CircleDollarSign />}
        >
          <ChartState
            isLoading={cost.isLoading}
            isError={cost.isError}
            isEmpty={!cost.data?.data?.length}
          >
            {cost.data && <CategoryDonut data={cost.data.data} />}
          </ChartState>
        </FinancePanelCard>
      </div>

      {/* Alertas + movimentações recentes */}
      <div className="grid grid-cols-1 gap-4 @5xl/main:grid-cols-2">
        <FinancePanelCard
          title="Alertas"
          description="Comparação com o mês anterior"
          icon={<Bell />}
        >
          <ChartState
            isLoading={alerts.isLoading}
            isError={alerts.isError}
            height={160}
          >
            {alerts.data && <AlertsList data={alerts.data.data} />}
          </ChartState>
        </FinancePanelCard>

        <FinancePanelCard
          title="Últimas movimentações"
          description="Registros mais recentes"
          icon={<History />}
        >
          <ChartState
            isLoading={recent.isLoading}
            isError={recent.isError}
            height={160}
          >
            {recent.data && <RecentMovimentations data={recent.data.data} />}
          </ChartState>
        </FinancePanelCard>
      </div>
    </div>
  );
}
