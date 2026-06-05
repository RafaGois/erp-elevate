"use client";

import "./coverage-gauge.css";
import type { FixedCostCoverageResponse } from "../../_lib/types";
import { formatBRL } from "../../_lib/format";
import { SERIES_COLORS } from "./chart-theme";
import { useChartWidth } from "./useChartWidth";

const CHART_HEIGHT = 88;
const BAR_HEIGHT = 18;
const BAR_RADIUS = 4;
const HERO_PADDING_X = 32;
/** Escala do medidor: 0% → 150% (meta 100% = 2/3 da barra). */
const SCALE_MAX_PERCENT = 150;

interface Props {
  coverage: FixedCostCoverageResponse;
}

export default function CoverageGauge({ coverage }: Props) {
  const { ref, width } = useChartWidth();

  const { coveragePercent, fixedCostTarget, lucro } = coverage;
  const hasTarget = coveragePercent !== null;
  const fillRatio = hasTarget
    ? Math.min(coveragePercent / 100, SCALE_MAX_PERCENT / 100) /
      (SCALE_MAX_PERCENT / 100)
    : 0;
  const covered = hasTarget && coveragePercent >= 100;
  const color = covered ? SERIES_COLORS.positive : SERIES_COLORS.negative;
  const metaRatio = 100 / SCALE_MAX_PERCENT;
  const gapToMeta = hasTarget ? Math.max(0, fixedCostTarget - lucro) : null;
  const metaReached = hasTarget && gapToMeta === 0;

  if (width === 0) {
    return <div ref={ref} className="min-h-[280px] w-full" />;
  }

  const barWidth = Math.max(width - HERO_PADDING_X - 2, 0);
  const fillWidth = barWidth * fillRatio;
  const metaX = barWidth * metaRatio;
  const tickHalf = BAR_HEIGHT / 2 + 5;

  return (
    <div
      ref={ref}
      className="flex min-h-[280px] w-full flex-col justify-end pt-8"
    >
      <div className="coverage-gauge__hero flex w-full flex-col gap-5 px-4 py-6">
        <svg
          width={barWidth}
          height={CHART_HEIGHT}
          role="img"
          aria-label="Cobertura de custos fixos"
          className="coverage-gauge__bar mx-auto block overflow-visible"
        >
          <rect
            x={0}
            y={(CHART_HEIGHT - BAR_HEIGHT) / 2}
            width={barWidth}
            height={BAR_HEIGHT}
            rx={BAR_RADIUS}
            className="fill-muted"
          />
          {hasTarget && fillWidth > 0 && (
            <rect
              x={0}
              y={(CHART_HEIGHT - BAR_HEIGHT) / 2}
              width={fillWidth}
              height={BAR_HEIGHT}
              rx={BAR_RADIUS}
              fill={color}
            />
          )}
          <line
            x1={metaX}
            y1={CHART_HEIGHT / 2 - tickHalf}
            x2={metaX}
            y2={CHART_HEIGHT / 2 + tickHalf}
            className="stroke-foreground"
            strokeWidth={2}
          />
          <text
            x={metaX}
            y={CHART_HEIGHT / 2 + tickHalf + 14}
            textAnchor="middle"
            className="fill-muted-foreground text-[9px]"
          >
            meta
          </text>
        </svg>

        <div className="text-center">
          <p
            className="coverage-gauge__value m-0 tabular-nums"
            style={{ color: hasTarget ? color : "var(--muted-foreground)" }}
          >
            {hasTarget ? `${coveragePercent.toFixed(1)}%` : "—"}
          </p>
          <p className="coverage-gauge__label m-0 mt-3">cobertura</p>
          {hasTarget && (
            <p className="mt-3 text-[11px] leading-snug text-muted-foreground">
              {metaReached ? (
                <span style={{ color: SERIES_COLORS.positive }}>
                  Meta atingida
                </span>
              ) : (
                <>
                  Faltam{" "}
                  <span className="font-semibold tabular-nums text-foreground">
                    {formatBRL(gapToMeta)}
                  </span>{" "}
                  para a meta
                </>
              )}
            </p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="coverage-gauge__stat">
            <p className="coverage-gauge__stat-label">Meta (fixos)</p>
            <p className="coverage-gauge__stat-value">
              {formatBRL(fixedCostTarget)}
            </p>
          </div>
          <div className="coverage-gauge__stat">
            <p className="coverage-gauge__stat-label">Lucro do mês</p>
            <p className="coverage-gauge__stat-value">{formatBRL(lucro)}</p>
          </div>
          <div className="coverage-gauge__stat">
            <p className="coverage-gauge__stat-label">Para a meta</p>
            <p
              className="coverage-gauge__stat-value"
              style={{
                color: !hasTarget
                  ? undefined
                  : metaReached
                    ? SERIES_COLORS.positive
                    : SERIES_COLORS.negative,
              }}
            >
              {!hasTarget
                ? "—"
                : metaReached
                  ? "Atingida"
                  : formatBRL(gapToMeta)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
