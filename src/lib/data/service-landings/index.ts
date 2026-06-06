import type { ServiceLandingPage } from "@/types/service-landing";
import { digitalizacaoLanding } from "./digitalizacao";

/**
 * Registry de landing pages por serviço.
 * Para adicionar um novo serviço, crie o arquivo de dados e registre aqui.
 */
const serviceLandings: Record<string, ServiceLandingPage> = {
  digitalizacao: digitalizacaoLanding,
};

export function getServiceLandingBySlug(
  slug: string,
): ServiceLandingPage | undefined {
  return serviceLandings[slug];
}

export function getAllServiceLandingSlugs(): string[] {
  return Object.keys(serviceLandings);
}
