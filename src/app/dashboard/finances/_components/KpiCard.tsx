import {
  Card,
  CardChrome,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import type { KpiMetric } from "../_lib/types";
import { formatBRL, formatPercent } from "../_lib/format";

interface Props {
  label: string;
  title: string;
  metric: KpiMetric;
  icon: React.ReactNode;
  /** Para o lucro, destaca o valor com a cor accent. */
  highlight?: boolean;
}

export default function KpiCard({
  label,
  title,
  metric,
  icon,
  highlight,
}: Props) {
  const { value, changePercent } = metric;
  const positive = changePercent !== null && changePercent > 0;
  const negative = changePercent !== null && changePercent < 0;

  const TrendIcon = positive ? ArrowUpRight : negative ? ArrowDownRight : Minus;

  return (
    <Card variant="window" scanlines>
      <CardChrome label={label} />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <span className="text-muted-foreground">{icon}</span>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            "text-2xl font-bold tabular-nums",
            highlight && "text-[var(--hero-accent)]",
          )}
        >
          {formatBRL(value)}
        </div>
        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <TrendIcon
            className={cn(
              "h-3 w-3",
              positive && "text-emerald-500",
              negative && "text-red-500",
            )}
          />
          <span
            className={cn(
              positive && "text-emerald-500",
              negative && "text-red-500",
            )}
          >
            {formatPercent(changePercent)}
          </span>
          em relação ao mês anterior
        </p>
      </CardContent>
    </Card>
  );
}
