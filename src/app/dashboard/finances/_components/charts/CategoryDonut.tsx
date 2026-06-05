"use client";

import { useMemo, useState } from "react";
import * as d3 from "d3";
import type { CategoryDatum } from "../../_lib/types";
import { formatBRL, formatBRLCompact } from "../../_lib/format";
import { categoricalColor } from "./chart-theme";
import { useChartWidth } from "./useChartWidth";
import "./category-donut-legend.css";

/** Largura mínima do card para legenda à direita (cards grandes no grid). */
const WIDE_LAYOUT_MIN = 380;
const CHART_HEIGHT_NARROW = 200;
const CHART_HEIGHT_WIDE = 220;
const MAX_CHART_NARROW = 200;
const MAX_CHART_WIDE = 240;
/** Acima disso a legenda ganha altura máxima e scroll (se o conteúdo ultrapassar). */
const LEGEND_SCROLL_MIN_ITEMS = 6;

interface Props {
  data: CategoryDatum[];
}

function CategoryDonutLegend({
  data,
  hoverIndex,
  onHover,
  maxHeight,
}: {
  data: CategoryDatum[];
  hoverIndex: number | null;
  onHover: (index: number | null) => void;
  maxHeight: number;
}) {
  const enableScroll = data.length >= LEGEND_SCROLL_MIN_ITEMS;

  return (
    <div
      className={enableScroll ? "donut-legend-scroll" : undefined}
      style={
        enableScroll
          ? ({ "--donut-legend-max-h": `${maxHeight}px` } as React.CSSProperties)
          : undefined
      }
    >
    <table className="donut-legend">
      <thead className="donut-legend__head">
        <tr>
          <th scope="col">Categoria</th>
          <th scope="col" className="donut-legend__pct">
            %
          </th>
          <th scope="col" className="donut-legend__val">
            Valor
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((d, i) => (
          <tr
            key={d.name}
            className={
              hoverIndex === i
                ? "donut-legend__row donut-legend__row--active"
                : "donut-legend__row"
            }
            onMouseEnter={() => onHover(i)}
            onMouseLeave={() => onHover(null)}
          >
            <td>
              <span className="donut-legend__cat" title={d.name}>
                <span
                  className="donut-legend__swatch"
                  style={{ backgroundColor: categoricalColor(i) }}
                  aria-hidden
                />
                <span className="donut-legend__name">{d.name}</span>
              </span>
            </td>
            <td className="donut-legend__num donut-legend__pct">
              {d.percent.toFixed(1)}
            </td>
            <td
              className="donut-legend__num donut-legend__val"
              title={formatBRL(d.value)}
            >
              {formatBRLCompact(d.value)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default function CategoryDonut({ data }: Props) {
  const { ref, width } = useChartWidth();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const isWide = width >= WIDE_LAYOUT_MIN;
  const chartHeight = isWide ? CHART_HEIGHT_WIDE : CHART_HEIGHT_NARROW;
  const maxChart = isWide ? MAX_CHART_WIDE : MAX_CHART_NARROW;

  const size = useMemo(() => {
    if (!isWide) {
      return Math.min(width, maxChart, chartHeight);
    }
    const chartBudget = Math.floor(width * 0.58);
    return Math.min(chartBudget, maxChart, chartHeight);
  }, [width, isWide, maxChart, chartHeight]);

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
    return <div ref={ref} className="min-h-[220px] w-full" />;
  }

  const total = d3.sum(data, (d) => d.value);
  const hovered = hoverIndex !== null ? data[hoverIndex] : null;

  const chartSvg = (
    <div
      className="relative shrink-0"
      style={{ width: size, height: chartHeight }}
    >
      <svg
        width={size}
        height={chartHeight}
        role="img"
        aria-label="Distribuição por categoria"
      >
        <g transform={`translate(${size / 2},${chartHeight / 2})`}>
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
  );

  const legend = (
    <CategoryDonutLegend
      data={data}
      hoverIndex={hoverIndex}
      onHover={setHoverIndex}
      maxHeight={chartHeight}
    />
  );

  if (isWide) {
    return (
      <div
        ref={ref}
        className="flex w-full min-h-[220px] items-center gap-2"
      >
        <div className="flex flex-1 items-center justify-center min-w-0">
          {chartSvg}
        </div>
        <div className="min-w-0 shrink-0 w-[min(100%,11.5rem)] self-center">
          {legend}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-2">
      {chartSvg}
      <div className="w-full max-w-[280px] px-1">{legend}</div>
    </div>
  );
}
