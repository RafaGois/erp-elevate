import {
  ArrowDownRight,
  ArrowUpRight,
  AlertTriangle,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { AlertDatum, AlertSeverity } from "../_lib/types";

const SEVERITY_STYLES: Record<
  AlertSeverity,
  { wrapper: string; icon: React.ComponentType<{ className?: string }> }
> = {
  positive: {
    wrapper: "border-emerald-500/40 bg-emerald-500/10 text-emerald-600",
    icon: ArrowUpRight,
  },
  negative: {
    wrapper: "border-red-500/40 bg-red-500/10 text-red-600",
    icon: ArrowDownRight,
  },
  warning: {
    wrapper: "border-amber-500/40 bg-amber-500/10 text-amber-600",
    icon: AlertTriangle,
  },
  info: {
    wrapper: "border-sky-500/40 bg-sky-500/10 text-sky-600",
    icon: Info,
  },
};

interface Props {
  data: AlertDatum[];
}

export default function AlertsList({ data }: Props) {
  if (data.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        Nenhum alerta para o período.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {data.map((alert, i) => {
        const style = SEVERITY_STYLES[alert.severity] ?? SEVERITY_STYLES.info;
        const Icon = style.icon;
        return (
          <li
            key={`${alert.type}-${i}`}
            className={cn(
              "flex items-start gap-2.5 rounded-md border px-3 py-2.5",
              style.wrapper,
            )}
          >
            <Icon className="mt-0.5 h-4 w-4 shrink-0" />
            <span className="text-sm text-foreground">{alert.message}</span>
          </li>
        );
      })}
    </ul>
  );
}
