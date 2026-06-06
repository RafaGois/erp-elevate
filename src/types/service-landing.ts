export type ComparisonValue = "yes" | "partial" | "no";

/**
 * Modelo único de landing page por serviço.
 * Serve de molde para todos os serviços da Elevate.
 * Toda a copy é definida nos arquivos de dados (src/lib/data/service-landings).
 */
export type ServiceLandingPage = {
  slug: string;
  meta: {
    title: string;
    description: string;
  };
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    microProof: string;
    primaryCta: string;
    secondaryCta: string;
    terminalLabel: string;
    terminalLines: string[];
    /** Caminho público da imagem de fundo ou poster do vídeo (ex. /fundo.jpeg) */
    backgroundImage?: string;
    /** Caminho público do vídeo de fundo do hero (ex. /video.mp4) */
    backgroundVideo?: string;
  };
  trustBar: string[];
  problem: {
    kicker: string;
    title: string;
    subtitle: string;
    pains: { title: string; description: string }[];
  };
  transformation: {
    kicker: string;
    title: string;
    beforeLabel: string;
    afterLabel: string;
    before: string[];
    after: string[];
  };
  benefits: {
    kicker: string;
    title: string;
    subtitle: string;
    items: { title: string; description: string; metric?: string }[];
  };
  howItWorks: {
    kicker: string;
    title: string;
    subtitle: string;
    steps: { step: string; title: string; description: string }[];
    cta: string;
  };
  deliverables: {
    kicker: string;
    title: string;
    subtitle: string;
    items: string[];
  };
  capabilities: {
    kicker: string;
    title: string;
    subtitle: string;
    items: { title: string; description: string }[];
  };
  audience: {
    kicker: string;
    title: string;
    forTitle: string;
    forItems: string[];
    notForTitle: string;
    notForItems: string[];
  };
  socialProof: {
    kicker: string;
    title: string;
    subtitle: string;
    cases: {
      label: string;
      title: string;
      problem: string;
      solution: string;
      result: string;
      tags: string[];
    }[];
    metrics: { value: string; label: string }[];
  };
  comparison: {
    kicker: string;
    title: string;
    subtitle: string;
    columns: string[];
    rows: { label: string; values: ComparisonValue[] }[];
  };
  faq: {
    kicker: string;
    title: string;
    subtitle: string;
    items: { question: string; answer: string }[];
  };
  finalCta: {
    kicker: string;
    headline: string;
    subheadline: string;
    cta: string;
    riskReversal: string;
  };
  relatedServices: {
    slug: string;
    label: string;
    name: string;
    teaser: string;
  }[];
};
