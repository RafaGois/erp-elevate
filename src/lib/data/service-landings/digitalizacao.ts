import type { ServiceLandingPage } from "@/types/service-landing";

/**
 * Presença Digital Corporativa
 * Copy construída com foco em conversão (Jobs to Be Done, contraste antes/depois,
 * aversão à perda, prova social e baixa energia de ativação).
 * Restrição de estilo: sem dois pontos e sem hífen em toda a copy visível.
 */
export const digitalizacaoLanding: ServiceLandingPage = {
  slug: "digitalizacao",
  meta: {
    title: "Presença Digital Corporativa | Sistemas Elevate",
    description:
      "Sua empresa já tem peso no mercado. Construímos o patrimônio digital à altura. Site, identidade online e presença corporativa que transmitem a seriedade da sua marca.",
  },
  hero: {
    badge: "SYS//PRESENCE",
    headline: "Você construiu uma empresa séria. A internet ainda não mostra isso.",
    subheadline:
      "Mostramos sua empresa na internet de um jeito que agrega valor, valoriza sua marca e transmite a seriedade que você já construiu no mercado.",
    microProof:
      "Serviços · Varejo · Indústria · Tecnologia · Saúde",
    primaryCta: "Falar no WhatsApp",
    secondaryCta: "Ver como funciona",
    backgroundImage: "/fundo.jpeg",
    terminalLabel: "PRESENCE.STATUS",
    terminalLines: [
      "$ patrimonio_digital ........ em construção",
      "$ site_institucional ........ no ar",
      "$ identidade_visual ......... alinhada à marca",
      "$ seo_e_busca ............... ativo",
      "$ captacao_de_leads ......... organizada",
      "$ status .................... pronto para escalar",
    ],
  },
  trustBar: [
    "Desenvolvimento sob medida",
    "Site e sistema na mesma base",
    "Integração com seu ERP",
    "Entregas validadas por etapa",
    "Suporte depois da entrega",
  ],
  problem: {
    kicker: "// o problema",
    title: "Cada dia assim custa pedido, tempo e credibilidade.",
    subtitle:
      "Quando a presença online não reflete o tamanho real da empresa, quem pesquisa antes de comprar desconfia. E você perde negócio para quem parece maior só porque investiu no digital.",
    pains: [
      {
        title: "A primeira impressão derruba a venda",
        description:
          "O cliente acha sua empresa no Google, vê um site fraco ou desatualizado e conclui que você é pequeno demais para o pedido dele. A reputação que você construiu na prática some na tela.",
      },
      {
        title: "Marca forte na vida real e genérica na tela",
        description:
          "Sua empresa transmite seriedade pessoalmente, mas o site, as redes e o Google mostram outra coisa. A identidade visual não conversa e o posicionamento se perde na internet.",
      },
      {
        title: "Sem patrimônio digital para sustentar o crescimento",
        description:
          "Não existe site à altura, presença nas buscas é fraca e cada novo canal começa do zero. A empresa cresce no mercado, mas o digital não acompanha.",
      },
    ],
  },
  transformation: {
    kicker: "// antes e depois",
    title: "O mesmo negócio, com presença digital à altura.",
    beforeLabel: "Como está hoje",
    afterLabel: "Como fica com a Elevate",
    before: [
      "Site fraco ou inexistente para o tamanho da empresa",
      "Marca forte no mercado e genérica na internet",
      "Difícil de encontrar e pouco relevante no Google",
      "Redes e canais digitais desconectados da identidade",
      "Concorrente menor parece maior só pelo digital",
    ],
    after: [
      "Site institucional que transmite seriedade e converte",
      "Identidade visual coerente em todo ponto de contato",
      "Presença nas buscas que traz cliente qualificado",
      "Patrimônio digital que cresce junto com a empresa",
      "Marca online à altura do que você entrega na prática",
    ],
  },
  benefits: {
    kicker: "// o que você ganha",
    title: "Não é site bonito. É patrimônio digital que sustenta crescimento.",
    subtitle:
      "Cada entrega resolve um ponto que hoje trava credibilidade, visibilidade ou conversão da sua marca online.",
    items: [
      {
        title: "Credibilidade que fecha negócio",
        description:
          "Site rápido, claro e alinhado ao seu posicionamento. Quem pesquisa encontra uma empresa séria e decide com mais segurança.",
        metric: "Mais confiança na primeira visita",
      },
      {
        title: "Identidade que reforça o posicionamento",
        description:
          "Visual, tom e experiência alinhados à sua marca. Quem chega pelo site, rede ou busca reconhece a mesma empresa séria que você é no mercado.",
        metric: "Marca coerente em todo canal",
      },
      {
        title: "Visibilidade onde o cliente procura",
        description:
          "SEO, performance e estrutura pensados para aparecer quando alguém busca o que você vende. Seu digital trabalha por você 24 horas.",
        metric: "Encontrável no momento certo",
      },
      {
        title: "Escala com plano, não com susto",
        description:
          "Um caminho em fases que começa pela presença online e cresce até integrações e automações, no ritmo da sua empresa.",
        metric: "Evolução contínua e previsível",
      },
    ],
  },
  howItWorks: {
    kicker: "// como funciona",
    title: "Três passos. Você valida cada um antes do próximo.",
    subtitle:
      "Todo projeto pede método e clareza. Nada de entrega gigante que trava o negócio no meio do caminho.",
    steps: [
      {
        step: "01",
        title: "Diagnóstico",
        description:
          "Mapeamos seus canais, processos, sistemas e objetivos. Saímos com um plano que mostra o ganho rápido e o que pode esperar a próxima fase.",
      },
      {
        step: "02",
        title: "Construção",
        description:
          "Site, portal ou sistema com entregas parciais. Você aprova identidade, fluxo e integrações com a sua equipe antes de seguir em frente.",
      },
      {
        step: "03",
        title: "No ar e evoluindo",
        description:
          "Publicação, treinamento e acompanhamento. Você fica com documentação e uma base pronta para crescer quando fizer sentido.",
      },
    ],
    cta: "Quero meu diagnóstico inicial",
  },
  deliverables: {
    kicker: "// o que está incluído",
    title: "Escopo claro desde o começo.",
    subtitle:
      "Você sabe exatamente o que recebe. Sem surpresa na entrega e sem letra miúda na proposta.",
    items: [
      "Levantamento dos processos e canais digitais atuais",
      "Arquitetura da solução entre site, sistema e integrações",
      "Design alinhado à sua marca e ao seu público",
      "Desenvolvimento responsivo com performance e SEO técnico",
      "Integração com ERP, planilhas, APIs e ferramentas que já existem",
      "Ambiente de teste para validar antes de ir para o ar",
      "Documentação funcional e técnica para o time interno",
      "Treinamento da equipe e implantação acompanhada",
      "Suporte depois da entrega e plano de evolução por fases",
    ],
  },
  capabilities: {
    kicker: "// capacidades",
    title: "Tudo na mesma casa, do site ao sistema.",
    subtitle:
      "Para quem precisa entender a fundo antes de decidir o escopo.",
    items: [
      {
        title: "Sites institucionais",
        description:
          "Páginas que convertem, com SEO, performance e formulários ligados ao seu fluxo comercial. Mais que vitrine.",
      },
      {
        title: "Portais e áreas com login",
        description:
          "Espaços para cliente, fornecedor ou equipe, com permissão, histórico e rastreabilidade.",
      },
      {
        title: "Sistemas web sob medida",
        description:
          "Cadastro, pedidos, aprovações e acompanhamento desenhados para o jeito da sua empresa trabalhar.",
      },
      {
        title: "Integração de dados",
        description:
          "APIs e sincronização com ERP, planilhas e ferramentas que já fazem parte do seu dia.",
      },
      {
        title: "Identidade digital unificada",
        description:
          "Mesma linguagem visual do site público até as telas internas. Marca coerente em todo ponto de contato.",
      },
      {
        title: "Base que escala com a marca",
        description:
          "Estrutura pronta para crescer com novos canais, páginas e integrações conforme a empresa evolui.",
      },
    ],
  },
  audience: {
    kicker: "// para quem é",
    title: "Honestidade antes de você gastar seu tempo.",
    forTitle: "Faz muito sentido se",
    forItems: [
      "Sua empresa precisa parecer tão séria online quanto é na prática",
      "Sua empresa cresceu, mas o site e a presença online ficaram para trás",
      "Você quer um patrimônio digital que evolua junto com a marca",
      "Você já tem site, mas ele não representa o tamanho real do negócio",
      "Você precisa ser encontrado e parecer sério antes mesmo da primeira conversa",
    ],
    notForTitle: "Talvez não seja a hora se",
    notForItems: [
      "Você quer só um modelo pronto, sem ajuste nem integração",
      "A equipe não tem tempo para validar fluxos e participar do diagnóstico",
      "O foco é apenas anúncio pago, sem estrutura para atender o que chega",
      "A expectativa é trocar toda a operação em poucas semanas, de uma vez",
    ],
  },
  socialProof: {
    kicker: "// quem já confiou",
    title: "Projeto digital de verdade tem endereço e fica no ar.",
    subtitle:
      "Não é slide de apresentação. É produto em produção, acessível e mantido.",
    cases: [
      {
        label: "CASE_01",
        title: "Sistemas Elevate",
        problem:
          "Precisávamos de um produto próprio que provasse capacidade técnica e organizasse a operação interna.",
        solution:
          "Plataforma completa em Next.js com financeiro, inventário, projetos e propostas, integrada ao dia a dia da fábrica de software.",
        result:
          "Um produto que é vitrine e ferramenta de trabalho ao mesmo tempo.",
        tags: ["Next.js", "Sistema completo", "B2B"],
      },
      {
        label: "CASE_02",
        title: "Codinome Barbearia",
        problem:
          "Marca forte no bairro e presença online fraca, longe do posicionamento premium.",
        solution:
          "Site institucional sob medida, com identidade coerente e experiência pensada para gerar agendamento.",
        result:
          "Presença online que reforça a marca e facilita o contato com novos clientes.",
        tags: ["Institucional", "Marca", "Conversão"],
      },
      {
        label: "CASE_03",
        title: "Pollis Pollen Intelligence",
        problem:
          "Proposta técnica forte e pouca visibilidade digital para abrir novos mercados.",
        solution:
          "Site institucional focado em clareza da oferta, credibilidade e captação de contatos qualificados.",
        result:
          "Canal digital estruturado para apresentar a empresa e abrir conversas comerciais.",
        tags: ["Institucional", "B2B", "Captação"],
      },
    ],
    metrics: [
      { value: "100%", label: "projetos sob medida, do zero" },
      { value: "Next.js", label: "stack moderna em produção" },
      { value: "24h", label: "resposta para iniciar a conversa" },
    ],
  },
  comparison: {
    kicker: "// comparativo",
    title: "Por que não resolver com modelo pronto ou agência genérica.",
    subtitle:
      "Cada atalho resolve um pedaço. A Elevate conecta marca, processo e dado num lugar só.",
    columns: [
      "Modelo pronto",
      "Agência só de marketing",
      "Sistemas Elevate",
    ],
    rows: [
      { label: "Site alinhado à sua marca", values: ["partial", "yes", "yes"] },
      { label: "Integração com a operação interna", values: ["no", "no", "yes"] },
      { label: "Sistema web sob medida", values: ["no", "no", "yes"] },
      { label: "Plano em fases com baixo risco", values: ["no", "partial", "yes"] },
      { label: "Suporte técnico depois da entrega", values: ["no", "partial", "yes"] },
      { label: "Patrimônio digital que evolui com a empresa", values: ["no", "partial", "yes"] },
    ],
  },
  faq: {
    kicker: "// perguntas frequentes",
    title: "As dúvidas que aparecem antes de começar.",
    subtitle: "Se a sua não estiver aqui, é só chamar no WhatsApp.",
    items: [
      {
        question: "Preciso ter tudo definido antes de começar?",
        answer:
          "Não. O diagnóstico existe justamente para organizar as prioridades com você. Trazer o que já sabe sobre processos, dores e referências é o suficiente para a primeira conversa.",
      },
      {
        question: "Vocês fazem só site ou também sistema interno?",
        answer:
          "Os dois, e o ideal é pensar tudo no mesmo plano. Site sem integração gera lead que ninguém consegue atender. Sistema sem presença digital deixa a marca fraca na busca.",
      },
      {
        question: "Quanto tempo leva um projeto?",
        answer:
          "Um site institucional bem feito costuma levar de 4 a 8 semanas, conforme conteúdo e integrações. Projetos com sistema interno são faseados e a primeira entrega sai entre 6 e 12 semanas.",
      },
      {
        question: "A operação precisa parar durante a implantação?",
        answer:
          "Não. Trabalhamos com ambiente de teste, migração gradual e treinamento por etapas. Sua equipe segue trabalhando enquanto validamos cada fase.",
      },
      {
        question: "Já temos ERP. Isso substitui?",
        answer:
          "Não substitui, conecta. A presença digital e os portais alimentam o que já existe, reduzindo digitação dobrada e melhorando a visibilidade.",
      },
      {
        question: "Como funciona o investimento?",
        answer:
          "Escopo fechado por fase, com entregáveis claros. Na conversa inicial mostramos as opções de escopo e prazo. Você só segue quando fizer sentido para você.",
      },
    ],
  },
  finalCta: {
    kicker: "// próximo passo",
    headline: "Sua marca já é grande. Está na hora da internet saber disso.",
    subheadline:
      "Conte como sua empresa aparece hoje na internet e a gente monta a presença digital que finalmente mostra o tamanho real da sua marca.",
    cta: "Falar no WhatsApp",
    riskReversal: "Diagnóstico inicial sem compromisso · resposta em até 24h",
  },
  relatedServices: [
    {
      slug: "pcp",
      label: "SYS//PROD",
      name: "Controle de Produção",
      teaser: "Do pedido digital ao chão de fábrica em tempo real.",
    },
    {
      slug: "sistemas-sob-medida",
      label: "SYS//BUILD",
      name: "Desenvolvimento Sob Medida",
      teaser: "Os fluxos que o sistema pronto nunca cobre.",
    },
    {
      slug: "integracao-automacao",
      label: "SYS//SYNC",
      name: "Integração e Automação",
      teaser: "Seus sistemas finalmente conversando entre si.",
    },
  ],
};
