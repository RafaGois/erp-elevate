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
            "Um site que mostra sua empresa com clareza e traz clientes mais preparados para falar com você.",
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
            "Somos a Elevate. Fazemos sites institucionais que ajudam empresas a serem encontradas, compreendidas e escolhidas. Combinamos design que transmite confiança, código moderno e atenção aos resultados que o seu negócio precisa.",
          destaques: [
            "Anos de experiência com projetos institucionais",
            "Mais de 80 sites entregues e no ar",
            "Time que une design, desenvolvimento e estratégia",
            "Acompanhamento depois do lançamento",
          ],
        },
      },
      {
        type: "projeto",
        data: {
          titulo: "Por que o site importa para o seu negócio",
          descricao:
            "O site é onde o cliente forma a primeira opinião sobre sua empresa, antes mesmo de qualquer conversa.",
          introducao: `A maioria das pessoas pesquisa antes de entrar em contato. Um site bem feito coloca o ${clientName} na frente quando alguém está procurando exatamente o que vocês oferecem. Ele mostra quem são, o que fazem e por que merecem confiança. Cada parte desta proposta foi pensada para isso.`,
          estatisticas: [
            { valor: "24/7", legenda: "Sua marca disponível a qualquer hora" },
            { valor: "1º", legenda: "Muitos clientes começam pelo site" },
            { valor: "SEO", legenda: "Aparece quando o cliente procura" },
            { valor: "100%", legenda: "Tudo com a cara da sua marca" },
          ],
          capitulos: [
            {
              titulo: "Credibilidade antes da conversa",
              corpo:
                "Quem pesquisa sua empresa antes de ligar ou visitar precisa ver profissionalismo logo de cara. Um site bem feito passa seriedade, organização e atenção aos detalhes. Isso reduz desconfiança e acelera a decisão de entrar em contato.",
              pontos: [
                "A primeira impressão combina com o que você quer transmitir",
                "História, valores e o que torna vocês diferentes ficam fáceis de entender",
                "Telefone, endereço e formas de contato sempre corretos",
              ],
            },
            {
              titulo: "Clareza na oferta",
              corpo:
                "Quando o visitante entende rápido o que vocês fazem e para quem, ele avança com mais confiança. Organizamos as informações para que não sobre dúvida e sobre interesse.",
              pontos: [
                "Textos e seções feitos para quem lê correndo",
                "Pronto para usar em anúncios e materiais",
                "Estrutura que permite crescer sem refazer tudo depois",
              ],
            },
            {
              titulo: "Performance e descoberta",
              corpo:
                "O site carrega rápido no celular, onde a maioria das pessoas acessa. Seguimos práticas que ajudam o Google a mostrar vocês para quem está procurando.",
              pontos: [
                "Carrega rápido em qualquer celular",
                "Preparado para aparecer nas buscas",
                "Você acompanha quantas pessoas chegam e o que fazem",
              ],
            },
            {
              titulo: "Um ativo que acompanha o negócio",
              corpo:
                "O site cresce com o negócio. A estrutura que usamos permite trocar textos, adicionar páginas ou integrar ferramentas novas sem começar do zero toda vez.",
              pontos: [
                "Tecnologia moderna que facilita atualizações",
                "Você recebe tudo organizado para usar ou repassar",
                "Acompanhamento depois do lançamento até tudo estar rodando bem",
              ],
            },
          ],
        },
      },
      {
        type: "portfolio",
        data: {
          titulo: "Projetos que já entregamos",
          subtitulo:
            "Alguns sites institucionais que já colocamos no ar para empresas como a sua.",
          itens: [
            {
              titulo: "Codinome Barbearia",
              descricao:
                "Site que reforçou a presença da marca e ajudou a transmitir profissionalismo para novos clientes.",
              url: "https://codinomebarbearia.com.br/",
              imagem:
                "https://res.cloudinary.com/dn454izoh/image/upload/v1774457306/Captura_de_Tela_2026-03-25_a%CC%80s_13.47.20_i4s3sv.png?q=80&w=800&auto=format",
              tags: ["Institucional", "Posicionamento", "HTML/CSS/JS"],
            },
            {
              titulo: "Sistemas Elevate",
              descricao:
                "Mostra sistemas complexos de forma clara para quem precisa contratar uma solução completa.",
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
                "Apresenta a empresa com clareza e ajuda a atrair clientes novos no mercado.",
              url: "https://pollenintelligence.com/",
              imagem:
                "https://res.cloudinary.com/dn454izoh/image/upload/v1774457306/Captura_de_Tela_2026-03-25_a%CC%80s_13.47.50_kuqjnl.png?q=80&w=800&auto=format",
              tags: ["Institucional", "HTML/CSS/JS", "Captacao"],
            },
            {
              titulo: "CTNine",
              descricao:
                "Posiciona a marca e facilita a captação de novos alunos pela internet.",
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
            "Fazemos cada projeto do zero. Seguimos a história, o estilo e o posicionamento de quem vai usar.",
        },
      },
      {
        type: "timeline",
        data: {
          titulo: "Como vai funcionar",
          etapas: [
            {
              fase: "Reunião de início",
              descricao:
                "Conversamos para entender sua marca, objetivos e referências. Definimos juntos o que vai ser entregue.",
              duracao: "Semana 1",
            },
            {
              fase: "Design e aprovação",
              descricao:
                "Criamos o visual completo. Você aprova cada tela antes de passarmos para o código.",
              duracao: "Semanas 2 a 3",
            },
            {
              fase: "Desenvolvimento",
              descricao:
                "Colocamos o site no ar em versão de testes. Você revisa tudo antes do lançamento.",
              duracao: "Semanas 4 a 5",
            },
            {
              fase: "Testes e ajustes",
              descricao:
                "Testamos em celulares e computadores. Fazemos os ajustes que você pedir.",
              duracao: "Semana 6",
            },
            {
              fase: "Lançamento",
              descricao:
                "Colocamos o site no ar, configuramos o domínio e o certificado de segurança. Você recebe as senhas e o guia de uso.",
              duracao: "Semana 7",
            },
          ],
        },
      },
      {
        type: "incluso",
        data: {
          titulo: "O site é a base. Mas o que realmente faz diferença vem junto com ele.",
          subtitulo:
            "Você está contratando um site institucional completo. E junto com ele recebe um conjunto de ferramentas que ajudam sua marca a ser encontrada, parecer profissional e gerar mais confiança desde o primeiro contato.",
          produtoTitulo: "Site Institucional",
          produtoDescricao:
            "A base sólida da sua presença online. Feito sob medida para transmitir quem você é.",
          urlExemplo: "suaempresa.com.br",
          itens: [
            {
              tipo: "email",
              titulo: "E-mail corporativo",
              descricao:
                "Você passa a ter um endereço de e-mail com o domínio da sua própria marca. Isso transmite muito mais profissionalismo do que usar um e-mail gratuito.",
              detalhe: "contato@suaempresa.com",
            },
            {
              tipo: "arte",
              titulo: "Assinatura e artes de e-mail",
              descricao:
                "Criamos uma assinatura padronizada e artes para seus e-mails. Assim toda comunicação que você envia reforça a identidade da marca de forma consistente.",
            },
            {
              tipo: "google",
              titulo: "Perfil do Google corrigido",
              descricao:
                "Ajustamos e otimizamos seu perfil no Google para que as pessoas te encontrem corretamente nas buscas locais e no mapa.",
            },
            {
              tipo: "avaliacao",
              titulo: "Captação de avaliações",
              descricao:
                "Colocamos uma plaquinha simples que direciona seus clientes para deixar avaliações no Google. Avaliações positivas ajudam muito na hora de gerar confiança.",
            },
            {
              tipo: "treino",
              titulo: "Treinamento da equipe",
              descricao:
                "Quando necessário, mostramos para sua equipe como pedir avaliações e captar leads de forma natural e contínua no dia a dia.",
            },
          ],
          nota: "O site institucional vem junto com e-mail profissional, perfil otimizado no Google, sistema para captar avaliações e artes para sua comunicação. Tudo pensado para que sua presença digital funcione de verdade.",
        },
      },
      {
        type: "preco",
        data: {
          titulo: "Investimento",
          pacotes: [
            {
              nome: "Landing Page",
              descricao: "Uma página focada em apresentar o essencial e gerar contato rápido.",
              valor: 3000,
              parcelas: "ou 3x de R$ 1.000,00",
              inclui: [
                "Design feito sob medida para uma página",
                "Funciona perfeitamente no celular",
                "Seção de serviços e contato direto",
                "Botão que abre o WhatsApp",
                "Preparado para aparecer nas buscas",
              ],
              destaque: false,
            },
            {
              nome: "Site Institucional",
              descricao:
                "O site ideal para mostrar quem são, o que oferecem e por que escolher vocês.",
              valor: 4000,
              parcelas: "ou 4x de R$ 1.000,00",
              inclui: [
                "Design exclusivo com até 5 páginas",
                "⭐ Captação de fotos profissionais, feita só para o seu site",
                "Abre direito no celular e computador",
                "Configurado para ser encontrado nas buscas",
                "Formulário que manda direto para você",
                "Suporte por 30 dias após o lançamento",
              ],
              destaque: true,
            },
            {
              nome: "Site Institucional Completo",
              descricao:
                "Para quem quer um site mais completo, com espaço para crescer e ferramentas para medir resultados.",
              valor: 6000,
              parcelas: "ou 6x de R$ 1.000,00",
              inclui: [
                "Design de até 10 páginas",
                "⭐ Captação de fotos profissionais, feita só para o seu site",
                "SEO configurado de forma completa",
                "Integração com ferramentas de análise",
                "Espaço para conteúdo como blog",
                "Suporte por 60 dias após o lançamento",
              ],
              destaque: false,
            },
          ],
        },
      },
      {
        type: "cta",
        data: {
          titulo: "Pronto para ter o site do seu negócio?",
          subtitulo:
            `Vamos construir o site que representa bem o ${clientName}. Fale com a gente agora e esclareça qualquer ponto antes de aprovar.`,
          botaoTexto: "Falar no WhatsApp",
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
