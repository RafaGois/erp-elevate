// Conteúdo do relatório mensal de social media (campo `dados` Json no backend).
// As chaves espelham exatamente a seção 4.2 de docs/monthly-report.md para que o
// JSON salvo/lido seja idêntico ao validado pelo Zod do `elevate_api`.

export type HighlightTipo = "feed" | "carrossel" | "reel" | "story";

/** Publicação de destaque (informada manualmente; NÃO é entidade própria). */
export interface ReportHighlight {
  titulo: string;
  tipo?: HighlightTipo;
  url?: string;
  capaUrl?: string;
  visualizacoes?: number;
  curtidas?: number;
  comentarios?: number;
  observacao?: string;
}

export interface DadosRelatorio {
  /** Período de referência exibido no relatório. */
  periodo: {
    competencia: string; // "YYYY-MM"
    inicio?: string; // ISO 8601
    fim?: string; // ISO 8601
  };

  /** Perfil / audiência. */
  perfil: {
    seguidoresInicio?: number;
    seguidoresFim: number;
    novosSeguidores?: number;
    crescimentoPercentual?: number;
  };

  /** Alcance e visualizações do mês. */
  alcanceEVisualizacoes: {
    visualizacoesMensais: number;
    alcanceMensal?: number;
    impressoes?: number;
    visitasPerfil?: number;
    cliquesNoLink?: number;
  };

  /** Engajamento agregado do mês. */
  engajamento: {
    curtidas?: number;
    comentarios?: number;
    compartilhamentos?: number;
    salvamentos?: number;
    taxaEngajamento?: number; // %
  };

  /** Resumo de produção de conteúdo. */
  conteudo?: {
    totalPublicacoes?: number;
    porTipo?: {
      feed?: number;
      carrossel?: number;
      reel?: number;
      story?: number;
    };
  };

  /** Publicações de destaque. */
  destaques?: ReportHighlight[];

  /** Narrativa / comentários do gestor sobre o mês. */
  observacoes?: string;
}
