import { DadosRelatorio } from "@/types/report-content";
import ReportStatus from "@/types/enums/ReportStatus";

// Relatório mensal de social media. Espelha o módulo de Orçamento: um registro
// com metadados de listagem + o conteúdo guardado em `dados` (Json no backend).
export default interface Report {
  id: string;
  /** Slug público usado em /relatorio/[slug] (gerado a partir do cliente + competência). */
  slug?: string | null;
  /** Título exibido na listagem do dashboard. */
  name: string;
  /** Nome do cliente exibido no relatório. */
  client?: string | null;
  /** Mês de referência "YYYY-MM" (redundante com dados.periodo.competencia). */
  competencia: string;
  status?: ReportStatus | null;
  dados: DadosRelatorio;
  createdAt: string;
  updatedAt: string;
}
