"use client";

import { useMemo, useState } from "react";
import * as d3 from "d3";
import type { ProfitByMonthDatum } from "../../_lib/types";
import { formatBRL, formatBRLCompact } from "../../_lib/format";
import { SERIES_COLORS, DEFAULT_MARGIN } from "./chart-theme";
import { useChartWidth } from "./useChartWidth";

const HEIGHT = 300;

const SERIES = [
  { key: "entradas", label: "Entradas", color: SERIES_COLORS.positive },
  { key: "saidas", label: "Saídas", color: SERIES_COLORS.negative },
  { key: "lucro", label: "Lucro", color: SERIES_COLORS.accent },
] as const;

interface Props {
  data: ProfitByMonthDatum[];
}

export default function ProfitByMonthChart({ data }: Props) {
  const { ref, width } = useChartWidth();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const m = DEFAULT_MARGIN;
  const innerW = Math.max(0, width - m.left - m.right);
  const innerH = HEIGHT - m.top - m.bottom;

  const { x, y, lines, yTicks } = useMemo(() => {
    const x = d3
      .scalePoint<string>()
      .domain(data.map((d) => d.name))
      .range([0, innerW])
      .padding(0.5);

    const maxValue =
      d3.max(data, (d) => Math.max(d.entradas, d.saidas, d.lucro)) ?? 0;
    const minValue = Math.min(0, d3.min(data, (d) => d.lucro) ?? 0);

    const y = d3
      .scaleLinear()
      .domain([minValue, maxValue === 0 ? 1 : maxValue])
      .nice()
      .range([innerH, 0]);

    const lines = SERIES.map((s) => {
      const line = d3
        .line<ProfitByMonthDatum>()
        .x((d) => x(d.name) ?? 0)
        .y((d) => y(d[s.key]))
        .curve(d3.curveMonotoneX);
      return { ...s, path: line(data) ?? "" };
    });

    return { x, y, lines, yTicks: y.ticks(5) };
  }, [data, innerW, innerH]);

  if (width === 0) {
    return <div ref={ref} className="h-[300px] w-full" />;
  }

  const hovered = hoverIndex !== null ? data[hoverIndex] : null;
  const hoveredX = hovered ? (x(hovered.name) ?? 0) : 0;

  return (
    <div ref={ref} className="relative w-full">
      <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1">
        {SERIES.map((s) => (
          <span
            key={s.key}
            className="flex items-center gap-1.5 text-xs text-muted-foreground"
          >
            <span
              className="inline-block h-2.5 w-2.5 rounded-[2px]"
              style={{ backgroundColor: s.color }}
            />
            {s.label}
          </span>
        ))}
      </div>

      <svg
        width={width}
        height={HEIGHT}
        role="img"
        aria-label="Evolução mensal de entradas, saídas e lucro"
      >
        <g transform={`translate(${m.left},${m.top})`}>
          {/* gridlines + eixo Y */}
          {yTicks.map((t) => (
            <g key={t} transform={`translate(0,${y(t)})`}>
              <line
                x2={innerW}
                className="stroke-border"
                strokeDasharray="2 3"
                strokeWidth={1}
              />
              <text
                x={-10}
                dy="0.32em"
                textAnchor="end"
                className="fill-muted-foreground text-[10px]"
              >
                {formatBRLCompact(t)}
              </text>
            </g>
          ))}

          {/* eixo X */}
          {data.map((d) => (
            <text
              key={d.name}
              x={x(d.name) ?? 0}
              y={innerH + 18}
              textAnchor="middle"
              className="fill-muted-foreground text-[10px]"
            >
              {d.name}
            </text>
          ))}

          {/* linhas */}
          {lines.map((l) => (
            <path
              key={l.key}
              d={l.path}
              fill="none"
              stroke={l.color}
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          ))}

          {/* marcador de hover */}
          {hovered && (
            <g>
              <line
                x1={hoveredX}
                x2={hoveredX}
                y1={0}
                y2={innerH}
                className="stroke-border"
                strokeWidth={1}
              />
              {SERIES.map((s) => (
                <circle
                  key={s.key}
                  cx={hoveredX}
                  cy={y(hovered[s.key])}
                  r={3.5}
                  fill={s.color}
                  className="stroke-card"
                  strokeWidth={1.5}
                />
              ))}
            </g>
          )}

          {/* overlay de captura do mouse */}
          <rect
            width={innerW}
            height={innerH}
            fill="transparent"
            onMouseMove={(e) => {
              const bounds = (e.target as SVGRectElement).getBoundingClientRect();
              const mouseX = e.clientX - bounds.left;
              const step = innerW / Math.max(1, data.length - 1);
              const idx = Math.round(mouseX / step);
              setHoverIndex(Math.min(data.length - 1, Math.max(0, idx)));
            }}
            onMouseLeave={() => setHoverIndex(null)}
          />
        </g>
      </svg>

      {hovered && (
        <div
          className="pointer-events-none absolute top-8 z-10 rounded-md border border-border bg-popover px-3 py-2 text-xs shadow-md"
          style={{
            left: Math.min(
              width - 150,
              Math.max(0, hoveredX + m.left - 60),
            ),
          }}
        >
          <p className="mb-1 font-medium">{hovered.name}</p>
          {SERIES.map((s) => (
            <p key={s.key} className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span
                  className="inline-block h-2 w-2 rounded-[2px]"
                  style={{ backgroundColor: s.color }}
                />
                {s.label}
              </span>
              <span className="font-medium">{formatBRL(hovered[s.key])}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
