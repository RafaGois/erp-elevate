import {
  Card,
  CardAction,
  CardChrome,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DotGothic16, Press_Start_2P } from "next/font/google";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import type { KpiMetric } from "../_lib/types";
import { formatBRL, formatPercent } from "../_lib/format";
import { toMetricSlug } from "../_lib/metricSlug";
import "@/components/layout/components/card/data-card.css";

const fontDisplay = DotGothic16({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-elevate-display",
  display: "swap",
});

const fontPixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-elevate-pixel",
  display: "swap",
});

interface Props {
  title: string;
  metric: KpiMetric;
  icon: React.ReactNode;
  /** Destaque no valor (ex.: lucro). */
  highlight?: boolean;
}

export default function KpiCard({ title, metric, icon, highlight }: Props) {
  const { value, changePercent } = metric;
  const positive = changePercent !== null && changePercent > 0;
  const negative = changePercent !== null && changePercent < 0;
  const TrendIcon = positive ? ArrowUpRight : negative ? ArrowDownRight : Minus;

  return (
    <Card
      variant="window"
      scanlines
      className={cn(
        "elevate-data-card group",
        fontDisplay.variable,
        fontPixel.variable,
      )}
    >
      <CardChrome label={`SYS://${toMetricSlug(title)}`} />

      <CardHeader className="elevate-data-card__header">
        <CardTitle className="elevate-data-card__title">{title}</CardTitle>
        <CardAction className="elevate-data-card__icon">{icon}</CardAction>
      </CardHeader>

      <CardContent className="elevate-data-card__content">
        <p
          className={cn(
            "elevate-data-card__value",
            highlight && "text-[var(--hero-accent)]",
          )}
        >
          {formatBRL(value)}
        </p>
        <span
          className={cn(
            "elevate-data-card__kicker elevate-data-card__trend",
            positive && "elevate-data-card__trend--up",
            negative && "elevate-data-card__trend--down",
          )}
        >
          <TrendIcon className="elevate-data-card__trend-icon" aria-hidden />
          {formatPercent(changePercent)} vs mês anterior
        </span>
      </CardContent>
    </Card>
  );
}
