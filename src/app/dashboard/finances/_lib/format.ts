// Helpers de formatação para o dashboard financeiro.

const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 2,
});

export function formatBRL(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return BRL.format(0);
  }
  return BRL.format(value);
}

/** Versão compacta para eixos de gráfico: R$ 12k, R$ 1.2M, etc. */
export function formatBRLCompact(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1_000_000) return `R$ ${(value / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `R$ ${Math.round(value / 1_000)}k`;
  return `R$ ${value}`;
}

/**
 * Formata `changePercent`. Retorna "—" quando o valor é null
 * (variação indefinida — mês anterior zero), conforme o contrato da API.
 */
export function formatPercent(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "—";
  }
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
}
