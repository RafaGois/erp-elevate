const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

/** "2026-06" -> "Junho de 2026". Sem Date para evitar timezone. */
export function monthLabel(competencia?: string): string {
  if (!competencia) return "";
  const [year, month] = competencia.split("-");
  const idx = Number(month) - 1;
  if (Number.isNaN(idx) || idx < 0 || idx > 11) return competencia;
  return `${MESES[idx]} de ${year}`;
}

/** "2026-06" -> "Junho". */
export function monthName(competencia?: string): string {
  if (!competencia) return "";
  const idx = Number(competencia.split("-")[1]) - 1;
  if (Number.isNaN(idx) || idx < 0 || idx > 11) return competencia;
  return MESES[idx];
}

export function formatNumber(n: number): string {
  return Math.round(n).toLocaleString("pt-BR");
}

/** 188900 -> "188,9 mil"; 1250000 -> "1,3 mi". */
export function formatCompact(n: number): string {
  return new Intl.NumberFormat("pt-BR", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(Math.round(n));
}

export function formatPercent(n: number): string {
  const fixed = Math.abs(n % 1) < 0.05 ? n.toFixed(0) : n.toFixed(1);
  return `${n > 0 ? "+" : ""}${fixed.replace(".", ",")}%`;
}
