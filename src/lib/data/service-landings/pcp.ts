import type { ServiceLandingPage } from "@/types/service-landing";

/**
 * Sistemas de Controle de Produção (PCP)
 * Copy orientada a conversão para indústrias que precisam sair da planilha
 * e ganhar visibilidade real do chão de fábrica.
 * Restrição de estilo: sem dois pontos e sem hífen em toda a copy visível.
 */
export const pcpLanding: ServiceLandingPage = {
  slug: "pcp",
  meta: {
    title: "Sistemas de Controle de Produção | Sistemas Elevate",
    description:
      "Ordens, capacidade e chão de fábrica em um só lugar. Sistema de PCP sob medida para sua operação parar de depender de planilha e WhatsApp.",
  },
  hero: {
    badge: "SYS//PROD",
    headline: "Sua fábrica produz todo dia. O controle ainda está na planilha.",
    subheadline:
      "Construímos o sistema de PCP que sua operação precisa para planejar ordens, acompanhar o chão de fábrica e entregar prazo com dados reais, não com achismo.",
    microProof:
      "Metal mecânica · Usinagem · Montagem · Manufatura · Serviços industriais",
    primaryCta: "Falar no WhatsApp",
    secondaryCta: "Ver como funciona",
    backgroundImage: "/fundo.jpeg",
    backgroundVideo: "/ASCII_vegetation_growing_digitally_202606062000.mp4",
    terminalLabel: "PROD.STATUS",
    terminalLines: [
      "$ ordens_producao ............ sincronizadas",
      "$ capacidade_fabrica ........ mapeada",
      "$ chao_de_fabrica ........... em tempo real",
      "$ prazos_e_alertas .......... ativos",
      "$ estoque_materiais ......... integrado",
      "$ indicadores_oee ........... no ar",
    ],
  },
  trustBar: [
    "PCP alinhado ao chão de fábrica",
    "Integração com ERP e planilhas",
    "Telas objetivas para quem opera",
    "Entregas validadas por etapa",
    "Suporte depois da implantação",
  ],
  problem: {
    kicker: "// o problema",
    title: "Cada ordem no escuro custa prazo, retrabalho e cliente.",
    subtitle:
      "Quando ninguém sabe o status real da produção, o atraso aparece tarde demais. A gestão decide no feeling e a fábrica apaga incêndio o dia inteiro.",
    pains: [
      {
        title: "Planilha que ninguém confia",
        description:
          "Ordens espalhadas em Excel, grupos de WhatsApp e anotações na bancada. Cada setor vê um número diferente e ninguém sabe o que realmente está em produção.",
      },
      {
        title: "Atraso que só aparece quando já perdeu o prazo",
        description:
          "Sem visibilidade por etapa, gargalo ou máquina, o problema estoura na expedição. Você descobre o atraso quando o cliente liga cobrando.",
      },
      {
        title: "Capacidade no chute e fila mal sequenciada",
        description:
          "Pedidos entram sem critério claro de prioridade. Máquina ociosa num setor e sobrecarga no outro. O PCP existe no papel, mas não na prática.",
      },
    ],
  },
  transformation: {
    kicker: "// antes e depois",
    title: "A mesma fábrica, com produção visível de ponta a ponta.",
    beforeLabel: "Como está hoje",
    afterLabel: "Como fica com a Elevate",
    before: [
      "Ordens em planilha, WhatsApp e papel na bancada",
      "Status da produção descoberto tarde demais",
      "Prioridade definida no feeling do dia",
      "ERP desconectado do que acontece na fábrica",
      "Indicador montado na véspera da reunião",
    ],
    after: [
      "Ordens centralizadas com status claro por etapa",
      "Chão de fábrica acompanhado em tempo real",
      "Sequenciamento e capacidade com critério definido",
      "Integração com ERP, estoque e comercial",
      "OEE, lead time e prazo disponíveis quando precisa",
    ],
  },
  benefits: {
    kicker: "// o que você ganha",
    title: "Não é ERP genérico. É controle de produção que a fábrica usa de verdade.",
    subtitle:
      "Cada entrega resolve um ponto que hoje trava prazo, capacidade ou visibilidade na sua operação.",
    items: [
      {
        title: "Visibilidade que evita surpresa na expedição",
        description:
          "Status por ordem, etapa e responsável atualizado na hora. Gestão e chão de fábrica enxergam a mesma produção, sem reunião para alinhar número.",
        metric: "Produção clara em tempo real",
      },
      {
        title: "Prazo prometido com base no que cabe na fábrica",
        description:
          "Capacidade, fila e sequenciamento visíveis antes de comprometer data. Você promete o que consegue entregar e explica o porquê com dado.",
        metric: "Menos atraso por promessa errada",
      },
      {
        title: "Chão de fábrica que registra sem travar o trabalho",
        description:
          "Telas simples para apontamento, parada e andamento. Quem opera registra rápido e o dado alimenta indicador sem planilha paralela.",
        metric: "Apontamento que vira informação",
      },
      {
        title: "Evolução do PCP ao MES no seu ritmo",
        description:
          "Começa pelo essencial e cresce para coleta automática, OEE e integração com máquina quando a operação estiver pronta.",
        metric: "Plano em fases, risco controlado",
      },
    ],
  },
  howItWorks: {
    kicker: "// como funciona",
    title: "Três passos. Você valida cada um antes do próximo.",
    subtitle:
      "Projeto de PCP pede entender a fábrica de verdade. Nada de sistema bonito que ninguém usa no chão de fábrica.",
    steps: [
      {
        step: "01",
        title: "Diagnóstico",
        description:
          "Mapeamos fluxo produtivo, gargalos, sistemas atuais e como a produção é controlada hoje. Saímos com plano por fase e ganho rápido definido.",
      },
      {
        step: "02",
        title: "Construção",
        description:
          "Desenvolvemos ordens, apontamentos, capacidade e integrações com entregas parciais. Sua equipe valida tela e fluxo antes de ir para a fábrica.",
      },
      {
        step: "03",
        title: "Implantação e evolução",
        description:
          "Piloto no chão de fábrica, treinamento e ajuste fino. Você fica com documentação e base pronta para crescer para MES e automação.",
      },
    ],
    cta: "Quero mapear minha operação",
  },
  deliverables: {
    kicker: "// o que está incluído",
    title: "Do chão de fábrica ao painel, em etapas claras.",
    subtitle:
      "O projeto segue um fluxo simples de mapear, construir, validar e implantar. Você sabe o que vem em cada fase.",
    items: [
      {
        step: "01",
        title: "Reunião de alinhamento e mapeamento",
        description:
          "Entendemos como a produção funciona hoje, quais sistemas existem e o que precisa ser controlado antes de desenhar o PCP.",
      },
      {
        step: "02",
        title: "Desenho de fluxo e requisitos",
        description:
          "Definimos ordens, etapas, apontamentos, integrações e indicadores com quem vive a operação no dia a dia.",
      },
      {
        step: "03",
        title: "Desenvolvimento",
        description:
          "Construímos o sistema com telas objetivas, performance e integração com ERP, estoque ou planilhas conforme o escopo.",
      },
      {
        step: "04",
        title: "Ambiente de validação",
        description:
          "Mostramos o PCP funcionando com dados reais ou simulados para sua equipe testar antes do piloto na fábrica.",
      },
      {
        step: "05",
        title: "Piloto e ajustes",
        description:
          "Rodamos com um recorte da operação, coletamos feedback do chão de fábrica e refinamos fluxo e tela até ficar natural.",
      },
      {
        step: "06",
        title: "Entrega e treinamento",
        description:
          "Implantação completa, capacitação da equipe e documentação para operar e evoluir o sistema com segurança.",
      },
    ],
  },
  capabilities: {
    kicker: "// capacidades",
    title: "O que compõe um PCP que a fábrica adota de verdade.",
    subtitle:
      "Não é só cadastrar ordem. É montar cada peça que conecta planejamento, execução e indicador na sua operação.",
    items: [
      {
        title: "Gestão de ordens de produção",
        description:
          "Emissão, priorização e acompanhamento de OP ou OS com status claro. Tudo centralizado, sem versão paralela em planilha.",
      },
      {
        title: "Planejamento de capacidade",
        description:
          "Visão de carga por máquina, célula ou setor. Sequenciamento com critério definido para usar a fábrica com menos ociosidade.",
      },
      {
        title: "Apontamento no chão de fábrica",
        description:
          "Registro de início, fim, parada e motivo em telas pensadas para quem opera. Dado nasce no ponto certo, na hora certa.",
      },
      {
        title: "Controle de prazos e alertas",
        description:
          "Prazo prometido versus andamento real, com alerta antes do atraso virar crise. Gestão age com antecedência, não no desespero.",
      },
      {
        title: "Integração com ERP e estoque",
        description:
          "Pedido, material e consumo conversando com o que já existe. Menos digitação dobrada e uma fonte de verdade para produção.",
      },
      {
        title: "Indicadores e painéis gerenciais",
        description:
          "OEE, lead time, cumprimento de prazo e produtividade disponíveis para reunião e decisão diária, sem montar planilha na véspera.",
      },
    ],
  },
  audience: {
    kicker: "// para quem é",
    title: "Honestidade antes de você gastar seu tempo.",
    subtitle:
      "Cada linha é uma situação real. Veja em qual lado você está.",
    notLabel: "Talvez não seja a hora",
    forLabel: "Faz muito sentido",
    notFor: [
      "Você busca ERP genérico de prateleira sem adaptar ao chão de fábrica",
      "A operação não tem tempo para validar fluxo e participar do mapeamento",
      "O volume de produção ainda não justifica sair do controle manual",
      "A expectativa é implantar tudo de uma vez sem piloto",
      "Planilha e WhatsApp já dão visibilidade suficiente para o seu tamanho",
    ],
    for: [
      "Sua fábrica perde prazo porque ninguém vê a produção em tempo real",
      "Ordens espalhadas em planilha geram retrabalho e número divergente",
      "Você precisa integrar chão de fábrica, estoque e ERP num fluxo só",
      "Quer evoluir do PCP enxuto para MES conforme a operação amadurece",
      "Indicador de produção hoje depende de planilha montada na véspera",
    ],
  },
  socialProof: {
    kicker: "// quem já confiou",
    title: "Sistema de produção de verdade roda na operação, não no slide.",
    subtitle:
      "Não é promessa de software. É plataforma em uso, integrada ao dia a dia de quem produz.",
    cases: [
      {
        label: "CASE_01",
        title: "Sistemas Elevate",
        problem:
          "Operação interna espalhada em ferramentas desconectadas, sem visão única de projetos, tarefas e entregas.",
        solution:
          "Plataforma própria com gestão de projetos, inventário, propostas e acompanhamento operacional integrado ao fluxo da fábrica de software.",
        result:
          "Um sistema que organiza a produção interna e prova capacidade técnica na prática.",
        tags: ["Next.js", "Operação integrada", "B2B"],
      },
      {
        label: "CASE_02",
        title: "Indústria metal mecânica",
        problem:
          "Ordens em planilha, fila mal sequenciada e atraso descoberto só na expedição.",
        solution:
          "PCP sob medida com ordens centralizadas, apontamento por etapa e painel de prazo para gestão e chão de fábrica.",
        result:
          "Visibilidade da produção em tempo real e prazo prometido com base na capacidade real.",
        tags: ["PCP", "Chão de fábrica", "Prazo"],
      },
      {
        label: "CASE_03",
        title: "Operação com alto mix de produtos",
        problem:
          "Muitas ordens simultâneas, prioridade definida no feeling e ERP desconectado da fábrica.",
        solution:
          "Sequenciamento por capacidade, integração com pedido e indicadores de lead time e cumprimento.",
        result:
          "Fila organizada, menos ociosidade e decisão baseada em dado, não em achismo.",
        tags: ["Capacidade", "Sequenciamento", "KPIs"],
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
    title: "Por que não resolver com planilha ou ERP genérico.",
    subtitle:
      "Cada atalho resolve um pedaço. A Elevate conecta chão de fábrica, dado e decisão num lugar só.",
    columns: [
      "Planilha e WhatsApp",
      "ERP genérico",
      "Sistemas Elevate",
    ],
    rows: [
      { label: "Visibilidade em tempo real do chão de fábrica", values: ["no", "partial", "yes"] },
      { label: "Fluxo desenhado para sua operação", values: ["no", "partial", "yes"] },
      { label: "Apontamento simples para quem opera", values: ["partial", "partial", "yes"] },
      { label: "Integração com ERP e estoque", values: ["no", "yes", "yes"] },
      { label: "Plano em fases com piloto na fábrica", values: ["no", "partial", "yes"] },
      { label: "Evolução de PCP para MES no mesmo projeto", values: ["no", "no", "yes"] },
    ],
  },
  faq: {
    kicker: "// perguntas frequentes",
    title: "As dúvidas que aparecem antes de começar.",
    subtitle: "Se a sua não estiver aqui, é só chamar no WhatsApp.",
    items: [
      {
        question: "Preciso parar a produção para implantar?",
        answer:
          "Não. Começamos com piloto em um recorte da operação, ambiente de teste e treinamento gradual. A fábrica segue produzindo enquanto validamos cada fase.",
      },
      {
        question: "Vocês substituem nosso ERP?",
        answer:
          "Não substituímos. O PCP se conecta ao ERP, comercial e estoque que você já usa. Reduzimos digitação dobrada e damos visibilidade que o ERP sozinho não entrega no chão de fábrica.",
      },
      {
        question: "Funciona para operação pequena?",
        answer:
          "Sim, desde que o controle manual já esteja gerando atraso, retrabalho ou número divergente. No diagnóstico definimos o escopo mínimo que já gera ganho real.",
      },
      {
        question: "Quanto tempo leva um projeto de PCP?",
        answer:
          "Um PCP enxuto com ordens e apontamento costuma levar de 8 a 14 semanas, conforme integrações e complexidade da operação. Projetos com MES e automação são faseados.",
      },
      {
        question: "A equipe do chão de fábrica vai usar mesmo?",
        answer:
          "Esse é o critério central do projeto. Telas e fluxo são validados com quem opera antes do piloto. Sistema que ninguém usa no chão de fábrica não é entrega nossa.",
      },
      {
        question: "Como funciona o investimento?",
        answer:
          "Escopo fechado por fase, com entregáveis claros. Na conversa inicial mostramos opções de escopo e prazo. Você só segue quando fizer sentido para a operação.",
      },
    ],
  },
  finalCta: {
    kicker: "// próximo passo",
    headline: "Sua fábrica já produz. Está na hora de enxergar o que está acontecendo.",
    subheadline:
      "Conte como vocês controlam a produção hoje e montamos o PCP que conecta chão de fábrica, prazo e indicador num só lugar.",
    cta: "Falar no WhatsApp",
    riskReversal: "Diagnóstico inicial sem compromisso · resposta em até 24h",
  },
  relatedServices: [
    {
      slug: "digitalizacao",
      label: "SYS//PRESENCE",
      name: "Presença Digital Corporativa",
      teaser: "Marca online à altura do que você entrega na prática.",
    },
    {
      slug: "integracao-automacao",
      label: "SYS//SYNC",
      name: "Integração e Automação",
      teaser: "PCP, ERP e máquina finalmente conversando entre si.",
    },
    {
      slug: "sistemas-sob-medida",
      label: "SYS//BUILD",
      name: "Desenvolvimento Sob Medida",
      teaser: "Os fluxos que nenhum pacote pronto cobre.",
    },
  ],
};
