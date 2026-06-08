import type { ServiceLandingPage } from "@/types/service-landing";

/**
 * BI Industrial e Análise de Dados
 * Copy orientada a conversão para indústrias que geram dado
 * mas ainda decidem com planilha desatualizada.
 * Restrição de estilo: sem dois pontos e sem hífen em toda a copy visível.
 */
export const dashboardsLanding: ServiceLandingPage = {
  slug: "dashboards",
  meta: {
    title: "BI Industrial e Análise de Dados | Sistemas Elevate",
    description:
      "Painéis e indicadores que transformam dado operacional em decisão. BI industrial sob medida para sair da planilha montada na véspera da reunião.",
  },
  hero: {
    badge: "SYS//BI_DATA",
    headline: "Sua fábrica gera dado o dia inteiro. A decisão ainda usa planilha de ontem.",
    subheadline:
      "Construímos painéis e indicadores industriais que consolidam ERP, produção e qualidade numa visão clara para quem opera, gerencia e decide.",
    microProof:
      "Manufatura · Metal mecânica · Usinagem · Logística · Qualidade",
    primaryCta: "Falar no WhatsApp",
    secondaryCta: "Ver como funciona",
    backgroundImage: "/fundo.jpeg",
    backgroundVideo: "/ASCII_vegetation_growing_digitally_202606062000.mp4",
    terminalLabel: "BI.STATUS",
    terminalLines: [
      "$ fontes_de_dado ............ conectadas",
      "$ indicadores_kpi ........... calculados",
      "$ painel_operacional ........ atualizado",
      "$ oee_por_maquina ........... visível",
      "$ alertas_e_limites ......... configurados",
      "$ relatorios_gerenciais ..... no ar",
    ],
  },
  trustBar: [
    "Painéis alinhados à sua operação",
    "Integração com ERP, PCP e planilhas",
    "Indicadores que a gestão usa de verdade",
    "Entregas validadas por etapa",
    "Suporte depois da implantação",
  ],
  problem: {
    kicker: "// o problema",
    title: "Cada decisão no achismo custa eficiência, prazo e margem.",
    subtitle:
      "Quando o indicador só fica pronto na véspera da reunião, a gestão reage tarde. Dado existe, mas não chega na hora certa para quem precisa agir.",
    pains: [
      {
        title: "Planilha que ninguém atualiza a tempo",
        description:
          "ERP, produção e qualidade geram informação, mas cada área monta seu relatório. Na reunião, cada um traz um número diferente e a discussão vira reconciliação.",
      },
      {
        title: "Indicador que chega depois do problema",
        description:
          "OEE, prazo e retrabalho só aparecem quando o mês fechou. Você descobre o desvio quando já perdeu capacidade, cliente ou margem.",
      },
      {
        title: "BI genérico que não fala a língua da fábrica",
        description:
          "Ferramenta pronta com gráfico bonito, mas indicador errado, filtro que não serve e painel que ninguém abre no chão de fábrica.",
      },
    ],
  },
  transformation: {
    kicker: "// antes e depois",
    title: "A mesma operação, com dado claro para decidir na hora.",
    beforeLabel: "Como está hoje",
    afterLabel: "Como fica com a Elevate",
    before: [
      "Indicador montado manualmente na véspera da reunião",
      "Número divergente entre produção, qualidade e financeiro",
      "OEE e eficiência calculados tarde demais",
      "Alerta só quando alguém percebe o problema",
      "Gestão decide no feeling por falta de visão atualizada",
    ],
    after: [
      "Painéis atualizados com dado da operação em tempo real",
      "Uma fonte de verdade para produção, qualidade e prazo",
      "OEE, lead time e retrabalho visíveis por máquina ou setor",
      "Alerta automático quando indicador ultrapassa o limite",
      "Decisão baseada em fato, não em planilha desatualizada",
    ],
  },
  benefits: {
    kicker: "// o que você ganha",
    title: "Não é gráfico bonito. É informação que muda a decisão do dia.",
    subtitle:
      "Cada entrega resolve um ponto que hoje trava visibilidade, comparativo ou ação rápida na sua operação.",
    items: [
      {
        title: "Visão única para operação e diretoria",
        description:
          "Painéis operacionais no chão de fábrica e gerenciais na diretoria, todos alimentados pelas mesmas fontes. Menos reunião para alinhar número.",
        metric: "Um dado, várias visões",
      },
      {
        title: "Indicador certo na hora certa",
        description:
          "OEE, cumprimento de prazo, retrabalho e consumo calculados automaticamente. Você enxerga desvio enquanto ainda dá tempo de corrigir.",
        metric: "Decisão no momento do desvio",
      },
      {
        title: "Alerta antes do problema virar crise",
        description:
          "Limites configurados por indicador, setor ou máquina. Quando algo sai do trilho, a equipe certa recebe aviso sem depender de alguém abrir planilha.",
        metric: "Ação antes do atraso",
      },
      {
        title: "Evolução conforme a maturidade do dado",
        description:
          "Começa consolidando o que já existe e cresce para coleta automática, histórico e previsão conforme a operação amadurece.",
        metric: "Plano em fases, risco controlado",
      },
    ],
  },
  howItWorks: {
    kicker: "// como funciona",
    title: "Três passos. Você valida cada um antes do próximo.",
    subtitle:
      "Projeto de BI industrial pede entender de onde vem o dado e quem decide com ele. Nada de painel que ninguém abre depois da entrega.",
    steps: [
      {
        step: "01",
        title: "Diagnóstico",
        description:
          "Mapeamos fontes de dado, indicadores críticos e quem decide com cada um. Saímos com plano por fase e painel prioritário definido.",
      },
      {
        step: "02",
        title: "Construção",
        description:
          "Conectamos ERP, PCP, planilhas ou banco de dados e construímos painéis com entregas parciais. Sua equipe valida indicador e layout antes de escalar.",
      },
      {
        step: "03",
        title: "No ar e evoluindo",
        description:
          "Publicação, alertas, treinamento e ajuste fino. Você fica com documentação e base pronta para novos indicadores e novas áreas.",
      },
    ],
    cta: "Quero mapear meus indicadores",
  },
  deliverables: {
    kicker: "// o que está incluído",
    title: "Da fonte de dado ao painel, em etapas claras.",
    subtitle:
      "O projeto segue um fluxo simples de mapear, conectar, validar e publicar. Você sabe o que vem em cada fase.",
    items: [
      {
        step: "01",
        title: "Reunião de alinhamento e mapeamento",
        description:
          "Entendemos quais decisões dependem de dado hoje, quais sistemas alimentam a operação e o que precisa aparecer no painel.",
      },
      {
        step: "02",
        title: "Definição de indicadores e fontes",
        description:
          "Escolhemos KPIs, filtros, periodicidade e responsável por cada visão com quem usa a informação no dia a dia.",
      },
      {
        step: "03",
        title: "Integração e modelagem de dados",
        description:
          "Conectamos ERP, PCP, qualidade, planilhas ou API e organizamos o dado para cálculo confiável de indicador.",
      },
      {
        step: "04",
        title: "Desenvolvimento dos painéis",
        description:
          "Construímos dashboards operacionais, gerenciais e alertas com layout pensado para leitura rápida e uso recorrente.",
      },
      {
        step: "05",
        title: "Validação com a equipe",
        description:
          "Rodamos com dado real ou simulado para conferir número, filtro e experiência antes da publicação ampla.",
      },
      {
        step: "06",
        title: "Entrega e treinamento",
        description:
          "Painéis no ar, alertas configurados, capacitação da equipe e documentação para manter e evoluir os indicadores.",
      },
    ],
  },
  capabilities: {
    kicker: "// capacidades",
    title: "O que compõe um BI industrial que a gestão usa de verdade.",
    subtitle:
      "Não é só conectar banco e fazer gráfico. É montar cada peça que transforma dado bruto em decisão na operação.",
    items: [
      {
        title: "Painéis operacionais",
        description:
          "Visão do dia para chão de fábrica e supervisão. Status, fila, parada e andamento legíveis em segundos, inclusive em TV na produção.",
      },
      {
        title: "Painéis gerenciais e executivos",
        description:
          "Consolidado por planta, setor, período ou produto. Diretoria enxerga tendência, meta e desvio sem pedir planilha para cada área.",
      },
      {
        title: "OEE e eficiência de equipamento",
        description:
          "Disponibilidade, desempenho e qualidade por máquina, célula ou linha. Indicador calculado de forma consistente, pronto para comparar e agir.",
      },
      {
        title: "Qualidade, prazo e retrabalho",
        description:
          "Não conformidade, cumprimento de entrega e taxa de refugo visíveis por período, cliente ou produto. Desvio aparece antes de virar prejuízo.",
      },
      {
        title: "Alertas e relatórios automáticos",
        description:
          "Limite ultrapassado dispara aviso para quem precisa agir. Relatório agendado chega pronto, sem montagem manual na véspera.",
      },
      {
        title: "Integração com múltiplas fontes",
        description:
          "ERP, PCP, MES, planilha e banco de dados num fluxo só. Uma base de indicador, sem versão paralela espalhada pela empresa.",
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
      "Você busca ferramenta genérica de BI sem adaptar indicador à fábrica",
      "A operação ainda não gera dado mínimo em sistema ou registro confiável",
      "Ninguém na empresa tem tempo para validar indicador e painel",
      "A expectativa é ter todos os gráficos prontos em poucas semanas",
      "Planilha semanal já basta para o nível de decisão que vocês precisam",
    ],
    for: [
      "Sua gestão decide com dado desatualizado ou número divergente",
      "Indicador crítico ainda depende de planilha montada na véspera",
      "Você precisa de OEE, prazo ou qualidade visíveis em tempo real",
      "Quer alerta automático quando produção ou qualidade saem do trilho",
      "Dado existe em vários sistemas, mas ninguém vê tudo num lugar só",
    ],
  },
  socialProof: {
    kicker: "// quem já confiou",
    title: "BI de verdade muda a reunião, não só a apresentação.",
    subtitle:
      "Não é dashboard de demo. É painel conectado ao dado que a operação usa todo dia.",
    cases: [
      {
        label: "CASE_01",
        title: "Sistemas Elevate",
        problem:
          "Informação operacional espalhada em módulos distintos, sem visão consolidada para priorizar e acompanhar entregas.",
        solution:
          "Painéis internos conectados a projetos, tarefas, inventário e propostas, com indicadores de andamento e capacidade da operação.",
        result:
          "Visão única para gestão interna e prova prática de capacidade em BI sob medida.",
        tags: ["Next.js", "Painéis integrados", "B2B"],
      },
      {
        label: "CASE_02",
        title: "Indústria com múltiplas fontes de dado",
        problem:
          "ERP, planilha e produção gerando número diferente na mesma reunião gerencial.",
        solution:
          "Consolidação de fontes, indicadores de prazo e eficiência e painéis separados para chão de fábrica e diretoria.",
        result:
          "Uma base de dado e decisão mais rápida sem reconciliar planilha toda semana.",
        tags: ["Consolidação", "KPIs", "Gerencial"],
      },
      {
        label: "CASE_03",
        title: "Operação orientada por OEE",
        problem:
          "Eficiência de máquina calculada manualmente, sempre defasada e impossível de comparar por turno.",
        solution:
          "Painel de OEE por equipamento, histórico de parada e alerta quando disponibilidade cai abaixo do limite.",
        result:
          "Desvio visível no turno, não no fechamento do mês.",
        tags: ["OEE", "Alertas", "Chão de fábrica"],
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
    title: "Por que não resolver com planilha ou BI genérico.",
    subtitle:
      "Cada atalho resolve um pedaço. A Elevate conecta fonte, indicador e decisão num lugar só.",
    columns: [
      "Planilha manual",
      "BI genérico",
      "Sistemas Elevate",
    ],
    rows: [
      { label: "Indicadores alinhados à sua operação", values: ["partial", "partial", "yes"] },
      { label: "Integração com ERP, PCP e produção", values: ["no", "partial", "yes"] },
      { label: "Painel operacional para chão de fábrica", values: ["no", "partial", "yes"] },
      { label: "OEE e KPI industrial calculados corretamente", values: ["partial", "partial", "yes"] },
      { label: "Alertas automáticos por limite de indicador", values: ["no", "partial", "yes"] },
      { label: "Evolução conforme novas fontes de dado", values: ["no", "partial", "yes"] },
    ],
  },
  faq: {
    kicker: "// perguntas frequentes",
    title: "As dúvidas que aparecem antes de começar.",
    subtitle: "Se a sua não estiver aqui, é só chamar no WhatsApp.",
    items: [
      {
        question: "Preciso ter todos os sistemas integrados antes de começar?",
        answer:
          "Não. O diagnóstico define por onde começar. Muitas vezes o primeiro ganho vem consolidando ERP e planilha crítica antes de expandir para PCP, qualidade ou MES.",
      },
      {
        question: "Vocês usam ferramenta pronta de BI ou desenvolvem do zero?",
        answer:
          "Desenvolvemos sob medida com stack moderna, conectando suas fontes e desenhando indicador e painel para a operação real. O foco é uso diário, não template genérico.",
      },
      {
        question: "Quanto tempo leva o primeiro painel?",
        answer:
          "Um painel prioritário com fontes já mapeadas costuma levar de 4 a 8 semanas. Projetos maiores com múltiplas áreas e integrações são faseados com entrega parcial.",
      },
      {
        question: "Funciona em TV no chão de fábrica?",
        answer:
          "Sim. Desenhamos visão operacional para leitura rápida em monitor, TV ou dispositivo móvel, conforme quem precisa acompanhar o indicador.",
      },
      {
        question: "Como garantir que o número do painel está certo?",
        answer:
          "Validamos cálculo e filtro com sua equipe antes de publicar. Indicador errado piora a decisão, então conferência com dado real faz parte de cada entrega.",
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
    headline: "Seu dado já existe. Está na hora dele guiar a decisão.",
    subheadline:
      "Conte como vocês acompanham indicadores hoje e montamos o BI industrial que transforma dado operacional em ação na hora certa.",
    cta: "Falar no WhatsApp",
    riskReversal: "Diagnóstico inicial sem compromisso · resposta em até 24h",
  },
  relatedServices: [
    {
      slug: "pcp",
      label: "SYS//PROD",
      name: "Controle de Produção",
      teaser: "Dado de chão de fábrica para alimentar seus painéis.",
    },
    {
      slug: "integracao-automacao",
      label: "SYS//SYNC",
      name: "Integração e Automação",
      teaser: "Fontes conectadas sem planilha paralela.",
    },
    {
      slug: "sistemas-sob-medida",
      label: "SYS//BUILD",
      name: "Desenvolvimento Sob Medida",
      teaser: "Indicador e fluxo que nenhum pacote pronto cobre.",
    },
  ],
};
