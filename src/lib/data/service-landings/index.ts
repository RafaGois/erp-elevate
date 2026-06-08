import type { ServiceLandingPage } from "@/types/service-landing";
import { dashboardsLanding } from "./dashboards";
import { digitalizacaoLanding } from "./digitalizacao";
import { integracaoAutomacaoLanding } from "./integracao-automacao";
import { pcpLanding } from "./pcp";
import { sistemasSobMedidaLanding } from "./sistemas-sob-medida";

/**
 * Registry de landing pages por serviço.
 * Para adicionar um novo serviço, crie o arquivo de dados e registre aqui.
 */
const serviceLandings: Record<string, ServiceLandingPage> = {
  digitalizacao: digitalizacaoLanding,
  pcp: pcpLanding,
  dashboards: dashboardsLanding,
  "integracao-automacao": integracaoAutomacaoLanding,
  "sistemas-sob-medida": sistemasSobMedidaLanding,
};

export function getServiceLandingBySlug(
  slug: string,
): ServiceLandingPage | undefined {
  return serviceLandings[slug];
}

export function getAllServiceLandingSlugs(): string[] {
  return Object.keys(serviceLandings);
}
