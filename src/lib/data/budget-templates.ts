import BudgetType from "@/types/enums/BudgetType";
import type Budget from "@/types/models/Budget";
import type { BudgetContent } from "@/types/budget-content";
import { ELEVATE_WHATSAPP_NUMBER } from "@/lib/data/contact-links";

function brl(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function softwareTemplate(budget: Budget): BudgetContent {
  const clientName = budget.client?.trim() || "seu negócio";

  return {
    blocks: [
      {
        type: "hero",
        data: {
          badge: "Proposta Comercial",
          cliente: budget.client ?? "",
          projeto: budget.project ?? "",
          titulo: budget.name,
          subtitulo:
            budget.description ??
            "Uma presença digital que reflete a excelência da sua marca.",
          investimento: brl(budget.value),
          prazo: "7 semanas",
          entregas: "6 entregas",
        },
      },
      {
        type: "sobre_empresa",
        data: {
          titulo: "Quem somos",
          descricao:
            "Somos a Elevate, uma agência especializada em desenvolvimento de produtos digitais de alta performance. Unimos design estratégico, tecnologia de ponta e experiência do usuário para transformar marcas em experiências memoráveis. Nosso time é formado por designers, desenvolvedores e estrategistas apaixonados por resultados.",
          destaques: [
            "Mais de 5 anos de mercado",
            "80+ projetos entregues",
            "Equipe multidisciplinar certificada",
            "Suporte dedicado pós-lançamento",
          ],
        },
      },
      {
        type: "projeto",
        data: {
          titulo: "Por que este projeto importa",
          descricao:
            "O site é o ponto em que marca, oferta e confiança se encontram — antes mesmo do primeiro contato humano.",
          introducao: `Hoje a maioria das decisões de compra começa online. Um site institucional bem estruturado não é apenas “presença na internet”: é a base para ser encontrado, compreendido e escolhido. Abaixo detalhamos por que esse investimento é estratégico para ${clientName} e como cada entrega desta proposta reforça credibilidade, clareza e resultados.`,
          estatisticas: [
            { valor: "24/7", legenda: "Sua marca disponível a qualquer hora" },
            { valor: "1º", legenda: "Contato muitas vezes acontece no site" },
            { valor: "SEO", legenda: "Ser encontrado no momento certo" },
            { valor: "100%", legenda: "Experiência alinhada à identidade" },
          ],
          capitulos: [
            {
              titulo: "Credibilidade antes da conversa",
              corpo:
                "Clientes e parceiros pesquisam a empresa antes de ligar ou visitar. Um site profissional transmite solidez, organização e cuidado com a imagem — sinais que reduzem o risco percebido e aceleram a confiança.",
              pontos: [
                "Primeira impressão alinhada ao posicionamento da marca",
                "Conteúdo claro sobre história, valores e diferenciais",
                "Canais de contato e informações institucionais sempre atualizadas",
              ],
            },
            {
              titulo: "Clareza na oferta",
              corpo:
                "Produtos e serviços bem apresentados geram menos dúvidas e mais pedidos qualificados. Estruturamos navegação, hierarquia visual e textos para que o visitante entenda rapidamente o que vocês fazem e para quem.",
              pontos: [
                "Páginas pensadas para escaneabilidade e conversão",
                "Suporte a campanhas e materiais de divulgação",
                "Base para futuras expansões (blog, catálogo, área logada)",
              ],
            },
            {
              titulo: "Performance e descoberta",
              corpo:
                "Velocidade e boas práticas de SEO técnico ajudam o Google a indexar bem o site e mantêm a experiência agradável em celular — onde a maior parte do tráfego acontece.",
              pontos: [
                "Carregamento rápido e layout responsivo",
                "Metadados, sitemap e estrutura amigável a buscadores",
                "Integração com analytics para medir o que importa",
              ],
            },
            {
              titulo: "Um ativo que acompanha o negócio",
              corpo:
                "O projeto foi pensado para evoluir: arquitetura moderna facilita ajustes de conteúdo, novas seções e integrações sem recomeçar do zero a cada mudança de estratégia.",
              pontos: [
                "Stack atual (Next.js) com foco em manutenção e escala",
                "Documentação e handoff para o time interno",
                "Suporte pós-lançamento para estabilizar o go-live",
              ],
            },
          ],
        },
      },
      {
        type: "portfolio",
        data: {
          titulo: "Sites que já entregamos",
          subtitulo:
            "Navegue por alguns dos projetos que desenvolvemos — cada um pensado sob medida para o negócio do cliente.",
          itens: [
            {
              titulo: "Codinome Barbearia",
              descricao:
                "Site institucional focado em fortalecer o posicionamento da marca no ambiente digital. Desenvolvido com HTML, CSS e JavaScript.",
              url: "https://codinomebarbearia.com.br/",
              imagem:
                "https://res.cloudinary.com/dn454izoh/image/upload/v1774457306/Captura_de_Tela_2026-03-25_a%CC%80s_13.47.20_i4s3sv.png?q=80&w=800&auto=format",
              tags: ["Institucional", "Posicionamento", "HTML/CSS/JS"],
            },
            {
              titulo: "Sistemas Elevate",
              descricao:
                "Sistema completo em Next.js com controle financeiro, inventário, projetos e propostas — integrando o escopo operacional que envolve a empresa.",
              url: "https://www.sistemaselevate.com/",
              imagem:
                "https://res.cloudinary.com/dn454izoh/image/upload/v1774457305/Captura_de_Tela_2026-03-25_a%CC%80s_13.47.38_fxgvdt.png?q=80&w=800&auto=format",
              tags: [
                "Next.js",
                "Financeiro",
                "Inventário",
                "Projetos",
                "Propostas",
              ],
            },
            {
              titulo: "Pollis Pollen Intelligence",
              descricao:
                "Site institucional em HTML, CSS e JavaScript, pensado para apresentar a empresa ao mercado e captar novos clientes.",
              url: "https://pollenintelligence.com/",
              imagem:
                "https://res.cloudinary.com/dn454izoh/image/upload/v1774457306/Captura_de_Tela_2026-03-25_a%CC%80s_13.47.50_kuqjnl.png?q=80&w=800&auto=format",
              tags: ["Institucional", "HTML/CSS/JS", "Captacao"],
            },
            {
              titulo: "CTNine",
              descricao:
                "Site institucional criado para posicionar a marca na internet e captar novos alunos.",
              url: "https://ctnine.com.br/",
              imagem:
                "https://res.cloudinary.com/dn454izoh/image/upload/v1774457306/Captura_de_Tela_2026-03-25_a%CC%80s_13.48.05_zulve1.png?q=80&w=800&auto=format",
              tags: ["Institucional", "Posicionamento", "Alunos"],
            },
          ],
        },
      },
      {
        type: "customizacao",
        data: {
          titulo: "Seu site, sua identidade",
          subtitulo:
            "Cada projeto é construído do zero — seguindo a história, os gostos e o posicionamento de cada cliente.",
        },
      },
      {
        type: "timeline",
        data: {
          titulo: "Como vai funcionar",
          etapas: [
            {
              fase: "Kickoff e alinhamento",
              descricao:
                "Reunião de início para entender a fundo a marca, objetivos e referências visuais. Definimos o escopo final e as entregas esperadas.",
              duracao: "Semana 1",
            },
            {
              fase: "Design e prototipação",
              descricao:
                "Criação dos wireframes e design de alta fidelidade no Figma. Você aprova tudo antes de começarmos a desenvolver.",
              duracao: "Semanas 2–3",
            },
            {
              fase: "Desenvolvimento",
              descricao:
                "Implementação do site com Next.js, integrando todos os componentes aprovados no design. Ambiente de staging para revisão.",
              duracao: "Semanas 4–5",
            },
            {
              fase: "Testes e revisões",
              descricao:
                "Rodada de testes em diferentes dispositivos e navegadores. Ajustes finais com base no seu feedback.",
              duracao: "Semana 6",
            },
            {
              fase: "Lançamento",
              descricao:
                "Deploy em produção, configuração de domínio, HTTPS e monitoramento inicial. Entrega das credenciais e documentação.",
              duracao: "Semana 7",
            },
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
              descricao:
                "Estrutura completa para apresentar empresa, serviços e diferenciais.",
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
              descricao:
                "Versão robusta com mais páginas, performance e estratégia digital.",
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
          subtitulo:
            "Estamos prontos para transformar a presença digital do seu negócio. Entre em contato agora e tire suas dúvidas.",
          botaoTexto: "Aprovar proposta",
          whatsapp: ELEVATE_WHATSAPP_NUMBER,
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
          subtitulo:
            budget.description ?? "Produção audiovisual para elevar sua marca.",
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
            {
              valor: "Story",
              legenda: "Narrativa clara do problema à solução",
            },
            {
              valor: "4K",
              legenda: "Captação com padrão broadcast quando aplicável",
            },
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
              descricao:
                "Vídeo manifesto de 90s com captação em estúdio e locação externa.",
              tags: ["Institucional", "4K", "Motion"],
            },
            {
              titulo: "Campanha Verão",
              descricao:
                "Série de 6 vídeos curtos para redes sociais com ritmo dinâmico.",
              tags: ["Social Media", "Reels", "Edição"],
            },
            {
              titulo: "Depoimentos Clientes",
              descricao:
                "Captação de depoimentos reais com direção de luz e roteiro guiado.",
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
            {
              titulo: "Pré-produção",
              descricao: "Roteiro, pauta e planejamento.",
            },
            {
              titulo: "Captação",
              descricao: "Gravação com equipe e equipamentos.",
            },
            {
              titulo: "Pós-produção",
              descricao: "Edição, finalização e versões.",
            },
          ],
        },
      },
      {
        type: "timeline",
        data: {
          titulo: "Cronograma",
          etapas: [
            {
              fase: "Pré-produção",
              descricao: "Alinhamento criativo.",
              duracao: "Semana 1",
            },
            {
              fase: "Captação",
              descricao: "Execução de gravações.",
              duracao: "Semana 2",
            },
            {
              fase: "Pós-produção",
              descricao: "Edição e entrega final.",
              duracao: "Semana 3",
            },
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
          whatsapp: ELEVATE_WHATSAPP_NUMBER,
        },
      },
    ],
  };
}

export function getBudgetTemplateByType(
  type: BudgetType | null | undefined,
  budget: Budget,
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
  budget: Budget,
): BudgetContent {
  const template = getBudgetTemplateByType(budget.type, budget);
  if (!template) return content;

  const imagemByTitulo = new Map<string, string>();
  for (const block of template.blocks) {
    if (block.type !== "portfolio") continue;
    for (const it of block.data.itens ?? []) {
      const url = it.imagem?.trim();
      if (url && it.titulo)
        imagemByTitulo.set(normalizePortfolioTitulo(it.titulo), url);
    }
  }
  if (imagemByTitulo.size === 0) return content;

  const blocks = content.blocks.map((block) => {
    if (block.type !== "portfolio") return block;
    const itens = block.data.itens.map((item) => {
      if (item.imagem?.trim()) return item;
      const fallback = imagemByTitulo.get(
        normalizePortfolioTitulo(item.titulo),
      );
      return fallback ? { ...item, imagem: fallback } : item;
    });
    return { ...block, data: { ...block.data, itens } };
  });

  return { ...content, blocks };
}
