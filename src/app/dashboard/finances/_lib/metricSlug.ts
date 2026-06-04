/** Gera o rótulo SYS:// usado no chrome dos cards retro (mesmo padrão do DataCard). */
export function toMetricSlug(text: string): string {
  const slug = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_")
    .toUpperCase()
    .replace(/[^A-Z0-9_]/g, "");
  return slug || "METRICA";
}
