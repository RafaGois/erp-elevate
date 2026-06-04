"use client";

import { useMemo, useState } from "react";
import * as d3 from "d3";
import type { CategoryDatum } from "../../_lib/types";
import { formatBRL } from "../../_lib/format";
import { categoricalColor } from "./chart-theme";
import { useChartWidth } from "./useChartWidth";

const CHART_HEIGHT = 200;
const MAX_CHART_SIZE = 200;

interface Props {
  data: CategoryDatum[];
}

export default function CategoryDonut({ data }: Props) {
  const { ref, width } = useChartWidth();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const size = Math.min(width, MAX_CHART_SIZE, CHART_HEIGHT);
  const radius = size / 2;
  const inner = radius * 0.58;

  const { arcs, arcGen } = useMemo(() => {
    const pie = d3
      .pie<CategoryDatum>()
      .value((d) => d.value)
      .sort(null);
    const arcGen = d3
      .arc<d3.PieArcDatum<CategoryDatum>>()
      .innerRadius(inner)
      .outerRadius(radius - 2)
      .padAngle(0.01)
      .cornerRadius(2);
    return { arcs: pie(data), arcGen };
  }, [data, inner, radius]);

  if (width === 0) {
    return <div ref={ref} className="min-h-[260px] w-full" />;
  }

  const total = d3.sum(data, (d) => d.value);
  const hovered = hoverIndex !== null ? data[hoverIndex] : null;

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-2">
      <div
        className="relative shrink-0"
        style={{ width: size, height: CHART_HEIGHT }}
      >
        <svg
          width={size}
          height={CHART_HEIGHT}
          role="img"
          aria-label="Distribuição por categoria"
        >
          <g transform={`translate(${size / 2},${CHART_HEIGHT / 2})`}>
            {arcs.map((arc, i) => (
              <path
                key={arc.data.name}
                d={arcGen(arc) ?? ""}
                fill={categoricalColor(i)}
                opacity={hoverIndex === null || hoverIndex === i ? 1 : 0.35}
                className="cursor-pointer transition-opacity"
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
              />
            ))}
            <text
              textAnchor="middle"
              dy="-0.15em"
              className="fill-muted-foreground text-[9px]"
            >
              {hovered
                ? hovered.name.length > 14
                  ? `${hovered.name.slice(0, 12)}…`
                  : hovered.name
                : "Total"}
            </text>
            <text
              textAnchor="middle"
              dy="1.05em"
              className="fill-foreground text-[11px] font-semibold"
            >
              {formatBRL(hovered ? hovered.value : total)}
            </text>
          </g>
        </svg>
      </div>

      <ul className="grid w-full max-w-[280px] grid-cols-2 gap-x-2 gap-y-0.5 px-1">
        {data.map((d, i) => (
          <li
            key={d.name}
            className="flex min-w-0 items-center gap-1 rounded px-0.5 py-0.5 text-[10px] leading-tight transition-colors"
            style={{
              backgroundColor:
                hoverIndex === i ? "var(--muted)" : "transparent",
            }}
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
            title={`${d.name} — ${d.percent.toFixed(1)}%`}
          >
            <span
              className="inline-block h-1.5 w-1.5 shrink-0 rounded-[1px]"
              style={{ backgroundColor: categoricalColor(i) }}
            />
            <span className="min-w-0 flex-1 truncate text-muted-foreground">
              {d.name}
            </span>
            <span className="shrink-0 tabular-nums text-foreground/80">
              {d.percent.toFixed(0)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
