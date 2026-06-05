// Paleta e utilitários compartilhados pelos gráficos D3.
// Cores alinhadas ao design system Elevate (monocromático + accent lime).
// Eixos/grades usam classes Tailwind (stroke-border, fill-muted-foreground)
// para acompanhar tema claro/escuro automaticamente.

export const SERIES_COLORS = {
  /** Entradas / receita / variação positiva */
  positive: "#22c55e",
  /** Saídas / custos / variação negativa */
  negative: "#ef4444",
  /** Lucro / destaque da marca */
  accent: "#dfff00",
} as const;

/** Paleta categórica para distribuições (donuts). Distinguível e on-brand. */
export const CATEGORICAL_PALETTE = [
  "#dfff00",
  "#22c55e",
  "#67e8f9",
  "#f9a8d4",
  "#a78bfa",
  "#fbbf24",
  "#38bdf8",
  "#fb7185",
] as const;

export function categoricalColor(index: number): string {
  return CATEGORICAL_PALETTE[index % CATEGORICAL_PALETTE.length];
}

export interface ChartMargin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export const DEFAULT_MARGIN: ChartMargin = {
  top: 16,
  right: 16,
  bottom: 28,
  left: 48,
};
