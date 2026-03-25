import BudgetType from "@/lib/enums/BudgetType";
import type Budget from "@/lib/models/Budget";
import type { BudgetContent } from "@/lib/types/budget-content";

function brl(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function softwareTemplate(budget: Budget): BudgetContent {
  return {
    blocks: [
      {
        type: "hero",
        data: {
          badge: "Proposta Comercial",
          cliente: budget.client ?? "",
          projeto: budget.project ?? "",
          titulo: budget.name,
          subtitulo: budget.description ?? "Solução sob medida para o seu negócio.",
          investimento: brl(budget.value),
          prazo: "A definir",
          entregas: "A definir",
        },
      },
      {
        type: "sobre_empresa",
        data: {
          titulo: "Quem somos",
          descricao:
            "Somos especialistas em desenvolvimento de software com foco em performance, previsibilidade e resultado de negócio.",
          destaques: [
            "Arquitetura escalável",
            "Processo transparente",
            "Entrega incremental",
          ],
        },
      },
      {
        type: "projeto",
        data: {
          titulo: "Por que este projeto importa",
          descricao:
            "Alinhamos tecnologia aos objetivos do negócio para que cada investimento em produto digital gere retorno mensurável.",
          introducao:
            "Uma solução bem desenhada reduz atrito operacional, fortalece a confiança dos usuários e prepara o terreno para escalar sem retrabalho. Abaixo resumimos o valor estratégico que este trabalho entrega — do primeiro acesso ao crescimento contínuo.",
          estatisticas: [
            { valor: "360°", legenda: "Visão completa do problema e da solução" },
            { valor: "ROI", legenda: "Decisões guiadas por métricas e uso real" },
            { valor: "UX", legenda: "Experiência pensada para conversão e retenção" },
            { valor: "Dev", legenda: "Base técnica sustentável e evolutiva" },
          ],
          capitulos: [
            {
              titulo: "Clareza para quem decide",
              corpo:
                "Propostas comerciais fortes não começam pelo código: começam por uma narrativa que conecta dor, oportunidade e entrega. Este projeto estrutura essa narrativa em interfaces e fluxos que o time pode apresentar com segurança a stakeholders e clientes.",
              pontos: [
                "Menos idas e vindas por escopo mal definido",
                "Demonstração visual do valor antes do investimento total",
                "Alinhamento entre negócio, produto e tecnologia",
              ],
            },
            {
              titulo: "Operação e crescimento",
              corpo:
                "Soluções enxutas e bem arquitetadas custam menos para manter e evoluir. Priorizamos padrões que permitem novas funcionalidades sem reescrever o que já funciona — essencial para roadmap vivo.",
              pontos: [
                "Redução de débito técnico em decisões conscientes",
                "Entregas incrementais com validação contínua",
                "Segurança e boas práticas desde o primeiro sprint",
              ],
            },
            {
              titulo: "Confiança e profissionalismo",
              corpo:
                "Em mercados competitivos, a percepção de seriedade e qualidade influencia conversão e parcerias. Um produto polido transmite maturidade e reduz o risco percebido na compra.",
              pontos: [
                "Identidade visual e interação coerentes com a marca",
                "Performance e acessibilidade como padrão, não extra",
                "Documentação e handoff que facilitam o time interno",
              ],
            },
          ],
        },
      },
      {
        type: "portfolio",
        data: {
          titulo: "Projetos entregues",
          subtitulo: "Conheça alguns dos produtos digitais que já desenvolvemos.",
          itens: [
            {
              titulo: "Codinome Barbearia",
              descricao: "Site institucional com foco em branding, serviços e captação de contatos.",
              url: "https://codinomebarbearia.com.br/",
              imagem:
                "https://res.cloudinary.com/dn454izoh/image/upload/v1774457306/Captura_de_Tela_2026-03-25_a%CC%80s_13.47.20_i4s3sv.png?q=80&w=800&auto=format",
              tags: ["Institucional", "Branding", "Conversao"],
            },
            {
              titulo: "Sistemas Elevate",
              descricao: "Website institucional para software industrial com narrativa técnica e seções de serviços.",
              url: "https://www.sistemaselevate.com/",
              imagem:
                "https://res.cloudinary.com/dn454izoh/image/upload/v1774457305/Captura_de_Tela_2026-03-25_a%CC%80s_13.47.38_fxgvdt.png?q=80&w=800&auto=format",
              tags: ["Software", "Industria", "Institucional"],
            },
            {
              titulo: "Pollis Pollen Intelligence",
              descricao: "Plataforma institucional com apresentação de tecnologia, processo e diferenciais de IA.",
              url: "https://pollenintelligence.com/",
              imagem:
                "https://res.cloudinary.com/dn454izoh/image/upload/v1774457306/Captura_de_Tela_2026-03-25_a%CC%80s_13.47.50_kuqjnl.png?q=80&w=800&auto=format",
              tags: ["IA", "Agtech", "Tecnologia"],
            },
            {
              titulo: "CTNine",
              descricao: "Site institucional com foco em serviços, metodologia e captação para matrículas.",
              url: "https://ctnine.com.br/",
              imagem:
                "https://res.cloudinary.com/dn454izoh/image/upload/v1774457306/Captura_de_Tela_2026-03-25_a%CC%80s_13.48.05_zulve1.png?q=80&w=800&auto=format",
              tags: ["Esporte", "Institucional", "Captacao"],
            },
          ],
        },
      },
      {
        type: "servicos",
        data: {
          titulo: "Escopo inicial",
          itens: [
            { titulo: "Discovery", descricao: "Levantamento de requisitos e escopo." },
            { titulo: "Implementação", descricao: "Desenvolvimento das funcionalidades." },
            { titulo: "Homologação", descricao: "Validação e ajustes finais." },
          ],
        },
      },
      {
        type: "timeline",
        data: {
          titulo: "Cronograma",
          etapas: [
            { fase: "Planejamento", descricao: "Kickoff e definição do escopo.", duracao: "Semana 1" },
            { fase: "Execução", descricao: "Implementação e revisões.", duracao: "Semanas 2-4" },
            { fase: "Entrega", descricao: "Homologação e publicação.", duracao: "Semana 5" },
          ],
        },
      },
      {
        type: "preco",
        data: {
          titulo: "Investimento",
          pacotes: [
            {
              nome: "Landing Page",
              descricao: "Para presença digital objetiva e conversão rápida.",
              valor: 3000,
              parcelas: "ou 3x de R$ 1.000,00",
              inclui: [
                "Design de 1 página",
                "Desenvolvimento responsivo",
                "Seção de serviços e contato",
                "Integração com WhatsApp",
                "SEO básico",
              ],
              destaque: false,
            },
            {
              nome: "Site Institucional",
              descricao: "Estrutura completa para apresentar empresa, serviços e diferenciais.",
              valor: 4000,
              parcelas: "ou 4x de R$ 1.000,00",
              inclui: [
                "Design de até 5 páginas",
                "Desenvolvimento em Next.js",
                "Responsividade total",
                "SEO técnico inicial",
                "Formulário de contato",
                "30 dias de suporte",
              ],
              destaque: true,
            },
            {
              nome: "Site Institucional Completo",
              descricao: "Versão robusta com mais páginas, performance e estratégia digital.",
              valor: 6000,
              parcelas: "ou 6x de R$ 1.000,00",
              inclui: [
                "Design de até 10 páginas",
                "Arquitetura e conteúdo estratégico",
                "SEO técnico completo",
                "Integração com Analytics",
                "Blog/CMS básico",
                "60 dias de suporte",
              ],
              destaque: false,
            },
          ],
        },
      },
      {
        type: "cta",
        data: {
          titulo: "Vamos começar?",
          subtitulo: "Podemos iniciar assim que aprovar esta proposta.",
          botaoTexto: "Aprovar proposta",
        },
      },
    ],
  };
}

function audiovisualTemplate(budget: Budget): BudgetContent {
  return {
    blocks: [
      {
        type: "hero",
        data: {
          badge: "Proposta Audiovisual",
          cliente: budget.client ?? "",
          projeto: budget.project ?? "",
          titulo: budget.name,
          subtitulo: budget.description ?? "Produção audiovisual para elevar sua marca.",
          investimento: brl(budget.value),
          prazo: "A definir",
          entregas: "A definir",
        },
      },
      {
        type: "projeto",
        data: {
          titulo: "Impacto da produção na sua marca",
          descricao:
            "Audiovisual é hoje a principal forma de humanizar a marca, explicar ofertas complexas e gerar conexão emocional em poucos segundos.",
          introducao:
            "Um roteiro sólido e uma execução cuidadosa transformam mensagens genéricas em histórias que as pessoas lembram e compartilham. Esta proposta organiza cada etapa — da ideia à entrega final — para maximizar alcance, qualidade percebida e consistência com o posicionamento da empresa.",
          estatisticas: [
            { valor: "Vídeo", legenda: "Formato preferido em redes e sites" },
            { valor: "Story", legenda: "Narrativa clara do problema à solução" },
            { valor: "4K", legenda: "Captação com padrão broadcast quando aplicável" },
            { valor: "Prazo", legenda: "Cronograma transparente por fase" },
          ],
          capitulos: [
            {
              titulo: "Presença que converte",
              corpo:
                "Conteúdo em vídeo aumenta o tempo de permanência e a compreensão da oferta. Direcionamos estética, ritmo e chamadas à ação para que cada peça cumpra um papel na jornada do cliente — awareness, consideração ou fechamento.",
              pontos: [
                "Roteiro alinhado ao tom de voz da marca",
                "Versões adaptadas para redes e site",
                "Indicadores sugeridos para medir desempenho",
              ],
            },
            {
              titulo: "Credibilidade e diferenciação",
              corpo:
                "Em mercados saturados, produções bem acabadas separam quem apenas anuncia de quem é lembrado. Iluminação, som e edição profissionais elevam a percepção de valor do produto ou serviço.",
              pontos: [
                "Direção de arte coerente com guidelines",
                "Tratamento de cor e áudio em padrão profissional",
                "Depoimentos e bastidores que geram confiança",
              ],
            },
            {
              titulo: "Processo previsível",
              corpo:
                "Definimos entregas por fase (pré, captação, pós) com aprovações explícitas. Isso reduz retrabalho, evita surpresas de escopo e mantém o projeto dentro do cronograma combinado.",
              pontos: [
                "Checkpoints de aprovação em cada etapa",
                "Arquivos finais organizados para uso omnichannel",
                "Suporte claro para ajustes dentro do escopo",
              ],
            },
          ],
        },
      },
      {
        type: "portfolio",
        data: {
          titulo: "Produções anteriores",
          subtitulo: "Alguns projetos audiovisuais que já realizamos.",
          itens: [
            {
              titulo: "Institucional Elevate",
              descricao: "Vídeo manifesto de 90s com captação em estúdio e locação externa.",
              tags: ["Institucional", "4K", "Motion"],
            },
            {
              titulo: "Campanha Verão",
              descricao: "Série de 6 vídeos curtos para redes sociais com ritmo dinâmico.",
              tags: ["Social Media", "Reels", "Edição"],
            },
            {
              titulo: "Depoimentos Clientes",
              descricao: "Captação de depoimentos reais com direção de luz e roteiro guiado.",
              tags: ["Depoimento", "Storytelling"],
            },
          ],
        },
      },
      {
        type: "servicos",
        data: {
          titulo: "Escopo inicial",
          itens: [
            { titulo: "Pré-produção", descricao: "Roteiro, pauta e planejamento." },
            { titulo: "Captação", descricao: "Gravação com equipe e equipamentos." },
            { titulo: "Pós-produção", descricao: "Edição, finalização e versões." },
          ],
        },
      },
      {
        type: "timeline",
        data: {
          titulo: "Cronograma",
          etapas: [
            { fase: "Pré-produção", descricao: "Alinhamento criativo.", duracao: "Semana 1" },
            { fase: "Captação", descricao: "Execução de gravações.", duracao: "Semana 2" },
            { fase: "Pós-produção", descricao: "Edição e entrega final.", duracao: "Semana 3" },
          ],
        },
      },
      {
        type: "preco",
        data: {
          titulo: "Investimento",
          pacotes: [
            {
              nome: "Plano Proposto",
              valor: budget.value || 0,
              inclui: ["Pré-produção", "Captação", "Pós-produção"],
              destaque: true,
            },
          ],
        },
      },
      {
        type: "cta",
        data: {
          titulo: "Vamos produzir?",
          subtitulo: "Após aprovação, iniciamos o planejamento detalhado.",
          botaoTexto: "Aprovar proposta",
        },
      },
    ],
  };
}

export function getBudgetTemplateByType(
  type: BudgetType | null | undefined,
  budget: Budget
): BudgetContent | null {
  if (type === BudgetType.SOFTWARE) return softwareTemplate(budget);
  if (type === BudgetType.AUDIOVISUAL) return audiovisualTemplate(budget);
  return null;
}

function normalizePortfolioTitulo(titulo: string): string {
  return titulo
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/**
 * Orçamentos salvos sem `imagem` nos itens do portfólio exibem só o placeholder "screenshot".
 * Preenche URLs faltando a partir do template do mesmo tipo (match por título).
 */
export function enrichBudgetPortfolioImages(
  content: BudgetContent,
  budget: Budget
): BudgetContent {
  const template = getBudgetTemplateByType(budget.type, budget);
  if (!template) return content;

  const imagemByTitulo = new Map<string, string>();
  for (const block of template.blocks) {
    if (block.type !== "portfolio") continue;
    for (const it of block.data.itens ?? []) {
      const url = it.imagem?.trim();
      if (url && it.titulo) imagemByTitulo.set(normalizePortfolioTitulo(it.titulo), url);
    }
  }
  if (imagemByTitulo.size === 0) return content;

  const blocks = content.blocks.map((block) => {
    if (block.type !== "portfolio") return block;
    const itens = block.data.itens.map((item) => {
      if (item.imagem?.trim()) return item;
      const fallback = imagemByTitulo.get(normalizePortfolioTitulo(item.titulo));
      return fallback ? { ...item, imagem: fallback } : item;
    });
    return { ...block, data: { ...block.data, itens } };
  });

  return { ...content, blocks };
}
