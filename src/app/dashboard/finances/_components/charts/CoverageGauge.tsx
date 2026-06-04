"use client";

import { useMemo } from "react";
import * as d3 from "d3";
import type { FixedCostCoverageResponse } from "../../_lib/types";
import { formatBRL } from "../../_lib/format";
import { SERIES_COLORS } from "./chart-theme";
import { useChartWidth } from "./useChartWidth";

const HEIGHT = 220;
const START_ANGLE = -Math.PI / 2;
const END_ANGLE = Math.PI / 2;

interface Props {
  coverage: FixedCostCoverageResponse;
}

export default function CoverageGauge({ coverage }: Props) {
  const { ref, width } = useChartWidth();

  const { coveragePercent, fixedCostTarget, lucro } = coverage;
  const hasTarget = coveragePercent !== null;
  // Limita o arco preenchido a 150% para manter a leitura do medidor.
  const ratio = hasTarget ? Math.min(coveragePercent / 100, 1.5) / 1.5 : 0;
  const covered = hasTarget && coveragePercent >= 100;
  const color = covered ? SERIES_COLORS.positive : SERIES_COLORS.negative;

  const size = Math.min(width, 280);
  const radius = size / 2;
  const arcWidth = Math.max(14, radius * 0.16);

  const { trackPath, valuePath, targetAngle } = useMemo(() => {
    const arcGen = d3
      .arc<{ start: number; end: number }>()
      .innerRadius(radius - arcWidth)
      .outerRadius(radius)
      .cornerRadius(arcWidth / 2)
      .startAngle((d) => d.start)
      .endAngle((d) => d.end);

    const trackPath = arcGen({ start: START_ANGLE, end: END_ANGLE }) ?? "";
    const valueEnd = START_ANGLE + (END_ANGLE - START_ANGLE) * ratio;
    const valuePath = arcGen({ start: START_ANGLE, end: valueEnd }) ?? "";
    // 100% corresponde a 2/3 do arco (escala vai até 150%).
    const targetAngle = START_ANGLE + (END_ANGLE - START_ANGLE) * (100 / 150);
    return { trackPath, valuePath, targetAngle };
  }, [radius, arcWidth, ratio]);

  if (width === 0) {
    return <div ref={ref} className="h-[220px] w-full" />;
  }

  const tickLen = arcWidth + 6;
  const tickInner = radius - arcWidth;
  const tx1 = Math.cos(targetAngle - Math.PI / 2) * tickInner;
  const ty1 = Math.sin(targetAngle - Math.PI / 2) * tickInner;
  const tx2 = Math.cos(targetAngle - Math.PI / 2) * (tickInner + tickLen);
  const ty2 = Math.sin(targetAngle - Math.PI / 2) * (tickInner + tickLen);

  return (
    <div ref={ref} className="flex w-full flex-col items-center">
      <svg width={size} height={HEIGHT} role="img" aria-label="Cobertura de custos fixos">
        <g transform={`translate(${size / 2},${radius + 12})`}>
          <path d={trackPath} className="fill-muted" />
          {hasTarget && <path d={valuePath} fill={color} />}
          {/* marca da meta (100%) */}
          <line
            x1={tx1}
            y1={ty1}
            x2={tx2}
            y2={ty2}
            className="stroke-foreground"
            strokeWidth={2}
          />
          <text
            x={tx2}
            y={ty2 + 14}
            textAnchor="middle"
            className="fill-muted-foreground text-[9px]"
          >
            meta
          </text>

          <text
            textAnchor="middle"
            dy="-0.1em"
            className="text-2xl font-bold"
            style={{ fill: hasTarget ? color : "var(--muted-foreground)" }}
          >
            {hasTarget ? `${coveragePercent.toFixed(1)}%` : "—"}
          </text>
          <text
            y={18}
            textAnchor="middle"
            className="fill-muted-foreground text-[10px]"
          >
            cobertura
          </text>
        </g>
      </svg>

      <div className="grid w-full grid-cols-2 gap-2 text-center">
        <div className="rounded-md border border-border p-2">
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
            Meta (fixos)
          </p>
          <p className="text-sm font-semibold tabular-nums">
            {formatBRL(fixedCostTarget)}
          </p>
        </div>
        <div className="rounded-md border border-border p-2">
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
            Lucro do mês
          </p>
          <p className="text-sm font-semibold tabular-nums">
            {formatBRL(lucro)}
          </p>
        </div>
      </div>
    </div>
  );
}
