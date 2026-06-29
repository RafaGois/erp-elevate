import type { DadosRelatorio } from "@/types/report-content";

/**
 * Template padrão do relatório — espelha getBudgetTemplateByType do orçamento.
 * Na criação salvamos esta estrutura zerada para o registro ser válido; os
 * valores reais são preenchidos depois, clicando direto na tela de apresentação.
 */
export function getReportTemplate(competencia = ""): DadosRelatorio {
  return {
    periodo: { competencia },
    perfil: {
      seguidoresInicio: 0,
      seguidoresFim: 0,
      novosSeguidores: 0,
      crescimentoPercentual: 0,
    },
    alcanceEVisualizacoes: {
      visualizacoesMensais: 0,
      alcanceMensal: 0,
      impressoes: 0,
      visitasPerfil: 0,
      cliquesNoLink: 0,
    },
    engajamento: {
      curtidas: 0,
      comentarios: 0,
      compartilhamentos: 0,
      salvamentos: 0,
      taxaEngajamento: 0,
    },
    conteudo: {
      totalPublicacoes: 0,
      porTipo: { feed: 0, carrossel: 0, reel: 0, story: 0 },
    },
    destaques: [],
    observacoes: "",
  };
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

/**
 * Mescla os dados salvos sobre o template, garantindo que toda a estrutura
 * exista (campos faltantes viram os defaults do template, prontos para edição).
 * Arrays (ex: destaques) são usados como vieram do salvo, se existirem.
 */
export function mergeReportDados(saved?: Partial<DadosRelatorio> | null): DadosRelatorio {
  const base = getReportTemplate(saved?.periodo?.competencia ?? "");

  function deepMerge<T>(template: T, override: unknown): T {
    if (Array.isArray(template)) {
      return (Array.isArray(override) ? override : template) as T;
    }
    if (isPlainObject(template)) {
      const out: Record<string, unknown> = { ...template };
      if (isPlainObject(override)) {
        for (const key of Object.keys(template)) {
          out[key] = deepMerge((template as Record<string, unknown>)[key], override[key]);
        }
      }
      return out as T;
    }
    return (override === undefined || override === null ? template : override) as T;
  }

  return deepMerge(base, saved);
}
