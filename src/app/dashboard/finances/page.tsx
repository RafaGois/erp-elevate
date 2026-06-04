"use client";

import {
  Card,
  CardChrome,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";

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

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-3">
        {summary.isLoading || !summary.data ? (
          <>
            <Skeleton className="h-[140px] rounded-md" />
            <Skeleton className="h-[140px] rounded-md" />
            <Skeleton className="h-[140px] rounded-md" />
          </>
        ) : (
          <>
            <KpiCard
              label="SYS://ENTRADAS"
              title="Entradas"
              metric={summary.data.entradas}
              icon={<ArrowUpCircle className="h-4 w-4" />}
            />
            <KpiCard
              label="SYS://SAIDAS"
              title="Saídas"
              metric={summary.data.saidas}
              icon={<ArrowDownCircle className="h-4 w-4" />}
            />
            <KpiCard
              label="SYS://LUCRO"
              title="Lucro"
              metric={summary.data.lucro}
              icon={<Wallet className="h-4 w-4" />}
              highlight
            />
          </>
        )}
      </div>

      {/* Série anual + cobertura de custos fixos */}
      <div className="grid grid-cols-1 gap-4 @5xl/main:grid-cols-3">
        <Card scanlines className="@5xl/main:col-span-2">
          <CardChrome label="SYS://EVOLUCAO_12M" />
          <CardHeader>
            <CardTitle>Evolução dos últimos 12 meses</CardTitle>
            <CardDescription>
              Entradas, saídas e lucro mês a mês
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartState
              isLoading={profitByMonth.isLoading}
              isError={profitByMonth.isError}
              isEmpty={!profitByMonth.data?.data?.length}
            >
              {profitByMonth.data && (
                <ProfitByMonthChart data={profitByMonth.data.data} />
              )}
            </ChartState>
          </CardContent>
        </Card>

        <Card>
          <CardChrome label="SYS://CUSTOS_FIXOS" />
          <CardHeader>
            <CardTitle>Cobertura de custos fixos</CardTitle>
            <CardDescription>Lucro vs. meta de custos fixos</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartState
              isLoading={coverage.isLoading}
              isError={coverage.isError}
              height={300}
            >
              {coverage.data && <CoverageGauge coverage={coverage.data} />}
            </ChartState>
          </CardContent>
        </Card>
      </div>

      {/* Distribuições por categoria */}
      <div className="grid grid-cols-1 gap-4 @5xl/main:grid-cols-2">
        <Card>
          <CardChrome label="SYS://RECEITA_CAT" />
          <CardHeader>
            <CardTitle>Receita por categoria</CardTitle>
            <CardDescription>
              Distribuição das entradas do mês
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartState
              isLoading={revenue.isLoading}
              isError={revenue.isError}
              isEmpty={!revenue.data?.data?.length}
            >
              {revenue.data && <CategoryDonut data={revenue.data.data} />}
            </ChartState>
          </CardContent>
        </Card>

        <Card>
          <CardChrome label="SYS://CUSTO_CAT" />
          <CardHeader>
            <CardTitle>Custos por categoria</CardTitle>
            <CardDescription>Distribuição das saídas do mês</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartState
              isLoading={cost.isLoading}
              isError={cost.isError}
              isEmpty={!cost.data?.data?.length}
            >
              {cost.data && <CategoryDonut data={cost.data.data} />}
            </ChartState>
          </CardContent>
        </Card>
      </div>

      {/* Alertas + movimentações recentes */}
      <div className="grid grid-cols-1 gap-4 @5xl/main:grid-cols-2">
        <Card>
          <CardChrome label="SYS://ALERTAS" />
          <CardHeader>
            <CardTitle>Alertas</CardTitle>
            <CardDescription>
              Comparação com o mês anterior
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartState
              isLoading={alerts.isLoading}
              isError={alerts.isError}
              height={160}
            >
              {alerts.data && <AlertsList data={alerts.data.data} />}
            </ChartState>
          </CardContent>
        </Card>

        <Card>
          <CardChrome label="SYS://RECENTES" />
          <CardHeader>
            <CardTitle>Últimas movimentações</CardTitle>
            <CardDescription>Registros mais recentes</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartState
              isLoading={recent.isLoading}
              isError={recent.isError}
              height={160}
            >
              {recent.data && <RecentMovimentations data={recent.data.data} />}
            </ChartState>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
