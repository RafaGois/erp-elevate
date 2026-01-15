"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { useEffect, useState, useMemo } from "react";

// Dados fictícios para os gráficos - Agência de Audiovisual Pequena
const monthlyData = [
  { month: "Jan", entradas: 25000, saidas: 20000, lucro: 5000 },
  { month: "Fev", entradas: 22000, saidas: 18000, lucro: 4000 },
  { month: "Mar", entradas: 30000, saidas: 22000, lucro: 8000 },
  { month: "Abr", entradas: 28000, saidas: 20000, lucro: 8000 },
  { month: "Mai", entradas: 35000, saidas: 24000, lucro: 11000 },
  { month: "Jun", entradas: 32000, saidas: 22000, lucro: 10000 },
  { month: "Jul", entradas: 28000, saidas: 21000, lucro: 7000 },
  { month: "Ago", entradas: 30000, saidas: 22000, lucro: 8000 },
  { month: "Set", entradas: 33000, saidas: 23000, lucro: 10000 },
  { month: "Out", entradas: 35000, saidas: 24000, lucro: 11000 },
  { month: "Nov", entradas: 38000, saidas: 26000, lucro: 12000 },
  { month: "Dez", entradas: 40000, saidas: 28000, lucro: 12000 },
];

const weeklyComparison = [
  { semana: "Sem 1", entradas: 7500, saidas: 5500 },
  { semana: "Sem 2", entradas: 8500, saidas: 6000 },
  { semana: "Sem 3", entradas: 8000, saidas: 5800 },
  { semana: "Sem 4", entradas: 9000, saidas: 6200 },
];

// Calcular valores totais
const totalEntradas = monthlyData.reduce((acc, item) => acc + item.entradas, 0);
const totalSaidas = monthlyData.reduce((acc, item) => acc + item.saidas, 0);
const totalLucro = totalEntradas - totalSaidas;
const lucroPercentual = ((totalLucro / totalEntradas) * 100).toFixed(1);

// Cores padrão Hex que funcionam imediatamente
// Tons de azul para dados positivos (entradas, lucro, receitas)
// Tons de vermelho para dados negativos (saídas, gastos)
const DEFAULT_CHART_COLORS = {
  chart1: "#3b82f6",   // Azul - Entradas
  chart2: "#ef4444",   // Vermelho - Saídas/Gastos
  chart3: "#60a5fa",   // Azul claro - Lucro
  chart4: "#2563eb",   // Azul médio - Receitas
  chart5: "#1e40af",   // Azul escuro - Receitas
};

// Helper para converter RGB para Hex
function rgbToHex(rgb: string): string {
  const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!match) return rgb;
  
  const r = parseInt(match[1], 10).toString(16).padStart(2, "0");
  const g = parseInt(match[2], 10).toString(16).padStart(2, "0");
  const b = parseInt(match[3], 10).toString(16).padStart(2, "0");
  
  return `#${r}${g}${b}`;
}

// Helper para obter cores CSS resolvidas como Hex (compatível com SVG/Recharts)
function getCSSVariable(variable: string): string {
  if (typeof window === "undefined") return "";
  
  try {
    // Obter o valor da variável CSS
    const cssValue = getComputedStyle(document.documentElement)
      .getPropertyValue(variable)
      .trim();
    
    if (!cssValue) return "";
    
    // Criar elemento temporário para converter oklch para RGB
    const tempEl = document.createElement("div");
    tempEl.style.color = `oklch(${cssValue})`;
    tempEl.style.position = "absolute";
    tempEl.style.visibility = "hidden";
    tempEl.style.opacity = "0";
    tempEl.style.pointerEvents = "none";
    tempEl.style.width = "1px";
    tempEl.style.height = "1px";
    
    // Garantir que o elemento seja adicionado ao DOM antes de ler
    if (!document.body) return "";
    document.body.appendChild(tempEl);
    
    // Forçar reflow
    tempEl.offsetHeight;
    
    const computedColor = window.getComputedStyle(tempEl).color;
    document.body.removeChild(tempEl);
    
    // Converter RGB para Hex para melhor compatibilidade com Recharts
    if (computedColor && computedColor.startsWith("rgb")) {
      return rgbToHex(computedColor);
    }
    
    return computedColor || "";
  } catch (error) {
    console.error(`Error getting CSS variable ${variable}:`, error);
    return "";
  }
}

// Hook para obter cores dos charts
function useChartColors() {
  // Sempre começar com cores padrão válidas
  const [colors, setColors] = useState(DEFAULT_CHART_COLORS);

  useEffect(() => {
    const updateColors = () => {
      try {
        const resolvedColors = {
          chart1: getCSSVariable("--chart-1") || DEFAULT_CHART_COLORS.chart1,
          chart2: getCSSVariable("--chart-2") || DEFAULT_CHART_COLORS.chart2,
          chart3: getCSSVariable("--chart-3") || DEFAULT_CHART_COLORS.chart3,
          chart4: getCSSVariable("--chart-4") || DEFAULT_CHART_COLORS.chart4,
          chart5: getCSSVariable("--chart-5") || DEFAULT_CHART_COLORS.chart5,
        };
        
        // Garantir que todas as cores sejam hex válidas
        const validatedColors = {
          chart1: resolvedColors.chart1.startsWith("#") 
            ? resolvedColors.chart1 
            : DEFAULT_CHART_COLORS.chart1,
          chart2: resolvedColors.chart2.startsWith("#") 
            ? resolvedColors.chart2 
            : DEFAULT_CHART_COLORS.chart2,
          chart3: resolvedColors.chart3.startsWith("#") 
            ? resolvedColors.chart3 
            : DEFAULT_CHART_COLORS.chart3,
          chart4: resolvedColors.chart4.startsWith("#") 
            ? resolvedColors.chart4 
            : DEFAULT_CHART_COLORS.chart4,
          chart5: resolvedColors.chart5.startsWith("#") 
            ? resolvedColors.chart5 
            : DEFAULT_CHART_COLORS.chart5,
        };
        
        setColors(validatedColors);
      } catch (error) {
        // Em caso de erro, usar cores padrão
        setColors(DEFAULT_CHART_COLORS);
      }
    };

    // Aguardar um frame para garantir que o DOM está pronto
    const timeoutId = setTimeout(updateColors, 100);

    // Escutar mudanças de tema
    const observer = new MutationObserver(() => {
      updateColors();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  return colors;
}

export default function FinanceDashboard() {
  const colors = useChartColors();

  // Configuração dos gráficos usando cores resolvidas
  const chartConfig = useMemo(
    () =>
      ({
        entradas: {
          label: "Entradas",
          color: colors.chart1,
        },
        saidas: {
          label: "Saídas",
          color: colors.chart2,
        },
        lucro: {
          label: "Lucro",
          color: colors.chart3,
        },
      }) satisfies ChartConfig,
    [colors.chart1, colors.chart2, colors.chart3]
  );

  // Gráfico de pizza mostra receitas (dados positivos) - todos em tons de azul
  const pieChartConfig = useMemo(
    () =>
      ({
        "Vídeos Comerciais": {
          label: "Vídeos Comerciais",
          color: colors.chart1, // Azul
        },
        "Edição de Vídeo": {
          label: "Edição de Vídeo",
          color: colors.chart3, // Azul claro
        },
        "Fotografia": {
          label: "Fotografia",
          color: colors.chart4, // Azul médio
        },
        "Motion Graphics": {
          label: "Motion Graphics",
          color: colors.chart5, // Azul escuro
        },
        "Outros Serviços": {
          label: "Outros Serviços",
          color: "#1d4ed8", // Azul mais escuro como fallback
        },
      }) satisfies ChartConfig,
    [colors.chart1, colors.chart3, colors.chart4, colors.chart5]
  );

  // Dados do gráfico de pizza com cores dinâmicas - Agência de Audiovisual
  const categoryData = [
    { name: "Vídeos Comerciais", value: 120000 },
    { name: "Edição de Vídeo", value: 85000 },
    { name: "Fotografia", value: 60000 },
    { name: "Motion Graphics", value: 50000 },
    { name: "Outros Serviços", value: 25000 },
  ];

  // Gráfico de pizza mostra receitas (dados positivos) - todos em tons de azul
  const pieColors = useMemo(
    () => [
      colors.chart1 || DEFAULT_CHART_COLORS.chart1, // Azul
      colors.chart3 || DEFAULT_CHART_COLORS.chart3, // Azul claro
      colors.chart4 || DEFAULT_CHART_COLORS.chart4, // Azul médio
      colors.chart5 || DEFAULT_CHART_COLORS.chart5, // Azul escuro
      "#1d4ed8", // Azul mais escuro para o último
    ],
    [colors]
  );

  const categoryDataWithColors = useMemo(
    () =>
      categoryData.map((item, index) => ({
        ...item,
        fill: pieColors[index],
      })),
    [pieColors]
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Financeiro</h1>
        <p className="text-muted-foreground">
          Visão geral das finanças e desempenho financeiro
        </p>
      </div>

      {/* Cards de resumo */}
      <div className="grid gap-4 @xl/main:grid-cols-3 @5xl/main:grid-cols-3 grid-cols-1">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Entradas</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalEntradas.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+15.2%</span> em relação ao ano anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Saídas</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalSaidas.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <ArrowDownRight className="h-3 w-3 text-red-600" />
              <span className="text-red-600">+8.5%</span> em relação ao ano anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {totalLucro.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {lucroPercentual}% de margem de lucro
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Linha - Evolução Mensal */}
      <Card>
        <CardHeader>
          <CardTitle>Evolução Mensal - Entradas vs Saídas</CardTitle>
          <CardDescription>
            Comparativo mensal de entradas e saídas ao longo do ano
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <LineChart
              data={monthlyData}
              margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                className="text-xs"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                className="text-xs"
                tickFormatter={(value) =>
                  value >= 1000 ? `R$ ${(value / 1000).toFixed(0)}k` : `R$ ${value}`
                }
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => `Mês: ${value}`}
                    formatter={(value: number) => [
                      value.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }),
                      "",
                    ]}
                  />
                }
              />
              <Line
                type="monotone"
                dataKey="entradas"
                stroke={colors.chart1}
                strokeWidth={3}
                dot={{ fill: colors.chart1, r: 5 }}
                activeDot={{ r: 7 }}
              />
              <Line
                type="monotone"
                dataKey="saidas"
                stroke={colors.chart2}
                strokeWidth={3}
                dot={{ fill: colors.chart2, r: 5 }}
                activeDot={{ r: 7 }}
              />
              <ChartLegend content={<ChartLegendContent />} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Gráficos lado a lado */}
      <div className="grid gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-2 grid-cols-1">
        {/* Gráfico de Pizza - Distribuição por Categoria */}
        <Card>
          <CardHeader>
            <CardTitle>Receita por Categoria</CardTitle>
            <CardDescription>
              Distribuição das receitas por tipo de serviço de audiovisual
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={pieChartConfig} className="h-[300px] w-full">
              <PieChart>
                <Pie
                  data={categoryDataWithColors}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {categoryDataWithColors.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value: number) => [
                        value.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }),
                        "",
                      ]}
                    />
                  }
                />
                <ChartLegend content={<ChartLegendContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Gráfico de Barras - Comparação Semanal */}
        <Card>
          <CardHeader>
            <CardTitle>Comparação Semanal - Último Mês</CardTitle>
            <CardDescription>
              Entradas e saídas por semana do mês atual
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart
                data={weeklyComparison}
                margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="semana"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  className="text-xs"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  className="text-xs"
                tickFormatter={(value) =>
                  value >= 1000 ? `R$ ${(value / 1000).toFixed(0)}k` : `R$ ${value}`
                }
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value: number) => [
                        value.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }),
                        "",
                      ]}
                    />
                  }
                />
                <Bar
                  dataKey="entradas"
                  fill={colors.chart1}
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="saidas"
                  fill={colors.chart2}
                  radius={[4, 4, 0, 0]}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Área - Lucro Acumulado */}
      <Card>
        <CardHeader>
          <CardTitle>Lucro Acumulado</CardTitle>
          <CardDescription>
            Evolução do lucro acumulado ao longo do ano
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <AreaChart
              data={monthlyData.map((item, index) => ({
                ...item,
                acumulado: monthlyData
                  .slice(0, index + 1)
                  .reduce((acc, curr) => acc + curr.lucro, 0),
              }))}
              margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="fillLucro" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={colors.chart3}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={colors.chart3}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                className="text-xs"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                className="text-xs"
                tickFormatter={(value) =>
                  value >= 1000 ? `R$ ${(value / 1000).toFixed(0)}k` : `R$ ${value}`
                }
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => `Mês: ${value}`}
                    formatter={(value: number) => [
                      value.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }),
                      "Acumulado",
                    ]}
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="acumulado"
                stroke={colors.chart3}
                fillOpacity={1}
                fill="url(#fillLucro)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
