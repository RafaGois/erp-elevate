import type { ServiceLandingPage } from "@/types/service-landing";

/**
 * Integração com Automação Industrial
 * Copy orientada a conversão para indústrias que precisam transformar
 * dado bruto de PLC e sensores em informação acionável.
 * Restrição de estilo: sem dois pontos e sem hífen em toda a copy visível.
 */
export const integracaoAutomacaoLanding: ServiceLandingPage = {
  slug: "integracao-automacao",
  meta: {
    title: "Integração com Automação Industrial | Sistemas Elevate",
    description:
      "Conectamos PLCs, sensores e máquinas para transformar dado bruto em informação. Sistemas completos com painéis, alertas por evento e integração industrial sob medida.",
  },
  hero: {
    badge: "SYS//SYNC",
    headline: "Sua máquina gera dado o tempo todo. Ninguém enxerga o que ele diz.",
    subheadline:
      "Conectamos PLCs e sensores ao seu chão de fábrica e construímos sistemas completos que transformam dado bruto em painel, alerta e ação, não só mais uma planilha.",
    microProof:
      "PLC · Sensores · IIoT · Alertas · Painéis · Tempo real",
    primaryCta: "Falar no WhatsApp",
    secondaryCta: "Ver como funciona",
    backgroundImage: "/fundo.jpeg",
    backgroundVideo: "/ASCII_vegetation_growing_digitally_202606062000.mp4",
    terminalLabel: "SYNC.STATUS",
    terminalLines: [
      "$ plc_maquina_01 ............. conectado",
      "$ dado_bruto ................ capturado",
      "$ eventos_parada ............ monitorados",
      "$ alertas_automaticos ....... ativos",
      "$ painel_tempo_real ......... no ar",
      "$ integracao_sensores ....... sincronizada",
    ],
  },
  trustBar: [
    "Conexão com PLC e sensores",
    "Dado bruto virando informação",
    "Alertas por evento e parada",
    "Entregas validadas por etapa",
    "Suporte depois da implantação",
  ],
  problem: {
    kicker: "// o problema",
    title: "Cada parada invisível custa produção, prazo e margem.",
    subtitle:
      "Quando o dado da máquina fica preso no PLC ou no operador, a gestão descobre o problema tarde. A fábrica produz, mas ninguém ouve o que ela está dizendo.",
    pains: [
      {
        title: "Dado bruto preso na máquina",
        description:
          "PLC registra ciclo, parada e status, mas essa informação não sai do chão de fábrica. Gestão opera no escuro enquanto a máquina já sabe o que acontece.",
      },
      {
        title: "Parada descoberta tarde demais",
        description:
          "Equipamento parou, ninguém viu na hora e o atraso só aparece no apontamento manual ou no fim do turno. Cada minuto parado vira prejuízo que poderia ter sido evitado.",
      },
      {
        title: "Painel bonito sem conexão com a máquina",
        description:
          "Dashboard genérico alimentado na mão ou desatualizado. Não reflete evento real da produção e vira enfeite que ninguém confia para decidir.",
      },
    ],
  },
  transformation: {
    kicker: "// antes e depois",
    title: "A mesma fábrica, com a máquina finalmente falando com a gestão.",
    beforeLabel: "Como está hoje",
    afterLabel: "Como fica com a Elevate",
    before: [
      "Dado de PLC e sensor preso no chão de fábrica",
      "Parada e evento descobertos tarde ou no manual",
      "Apontamento feito depois que o problema já aconteceu",
      "Painel montado na mão ou desatualizado",
      "Automação na planta, informação fora dela",
    ],
    after: [
      "PLC e sensor alimentando sistema em tempo real",
      "Alerta automático quando parada ou evento ocorre",
      "Painel vivo com dado direto da máquina",
      "Histórico de evento para entender causa e padrão",
      "Gestão enxerga produção enquanto ela acontece",
    ],
  },
  benefits: {
    kicker: "// o que você ganha",
    title: "Não é só dashboard. É sistema completo que conversa com a máquina.",
    subtitle:
      "Cada entrega transforma dado bruto de PLC e sensor em informação que alguém usa para agir, não só para olhar.",
    items: [
      {
        title: "Dado bruto que vira informação de verdade",
        description:
          "Capturamos sinal de PLC e sensor e transformamos em status, ciclo, parada e indicador. A máquina deixa de ser caixa preta para quem gerencia.",
        metric: "Produção legível em tempo real",
      },
      {
        title: "Alerta no evento, não no relatório",
        description:
          "Parada, desvio ou condição crítica disparam aviso na hora para quem precisa agir. Você reage no minuto certo, não no dia seguinte.",
        metric: "Ação no momento do evento",
      },
      {
        title: "Painéis conectados à fonte real",
        description:
          "Dashboard operacional e gerencial alimentado pelo chão de fábrica, não por planilha montada na véspera. O número na tela é o que a máquina está fazendo agora.",
        metric: "Indicador que a gestão confia",
      },
      {
        title: "Sistema que cresce com a planta",
        description:
          "Começa com uma máquina ou linha e evolui para mais sensores, regras, integrações e automações. Arquitetura pronta para escalar sem recomeçar.",
        metric: "Base sólida para MES e IIoT",
      },
    ],
  },
  howItWorks: {
    kicker: "// como funciona",
    title: "Três passos. Você valida cada um antes do próximo.",
    subtitle:
      "Projeto de automação industrial pede entender protocolo, evento e quem reage. Nada de integração frágil que ninguém mantém depois.",
    steps: [
      {
        step: "01",
        title: "Diagnóstico",
        description:
          "Mapeamos máquinas, PLCs, sensores, protocolos e o que hoje depende de apontamento manual. Saímos com plano por fase e ponto de captura prioritário.",
      },
      {
        step: "02",
        title: "Construção",
        description:
          "Conectamos fonte de dado, modelamos evento e construímos painel, alerta e regra com entregas parciais. Sua equipe valida sinal e fluxo antes de escalar.",
      },
      {
        step: "03",
        title: "Operação e evolução",
        description:
          "Sistema em produção, monitoramento ativo e ajuste fino. Você fica com arquitetura documentada e base pronta para novas máquinas e novos eventos.",
      },
    ],
    cta: "Quero mapear minhas máquinas",
  },
  deliverables: {
    kicker: "// o que está incluído",
    title: "Do PLC ao alerta, em etapas claras.",
    subtitle:
      "O projeto segue um fluxo simples de mapear, conectar, validar e operar. Você sabe o que vem em cada fase.",
    items: [
      {
        step: "01",
        title: "Reunião de alinhamento e mapeamento",
        description:
          "Entendemos quais máquinas, PLCs e sensores existem, o que cada um registra e o que hoje depende de olho humano ou apontamento tardio.",
      },
      {
        step: "02",
        title: "Desenho de arquitetura e eventos",
        description:
          "Definimos o que capturar, quais eventos geram alerta, quem recebe aviso e como o dado alimenta painel, histórico ou ERP.",
      },
      {
        step: "03",
        title: "Conexão com PLC e sensores",
        description:
          "Implementamos captura de dado bruto, tratamento de sinal e pipeline confiável com log, retry e validação antes de gravar.",
      },
      {
        step: "04",
        title: "Desenvolvimento do sistema",
        description:
          "Construímos painéis, alertas, regras de evento e integrações necessárias num sistema completo, não só visualização solta.",
      },
      {
        step: "05",
        title: "Piloto na linha ou máquina",
        description:
          "Rodamos com equipamento real, validamos sinal, alerta e usabilidade com quem opera e quem gerencia antes de expandir.",
      },
      {
        step: "06",
        title: "Entrega e documentação",
        description:
          "Sistema em operação, monitoramento configurado e documentação para evoluir com novas máquinas, sensores e regras.",
      },
    ],
  },
  capabilities: {
    kicker: "// capacidades",
    title: "O que compõe um sistema industrial conectado à máquina.",
    subtitle:
      "Não é só puxar dado do PLC. É montar cada camada que transforma sinal bruto em decisão na operação.",
    items: [
      {
        title: "Captura de dado via PLC",
        description:
          "Leitura de sinal, ciclo, status e contador direto do controlador lógico. Dado bruto da máquina entra no sistema sem depender de digitação manual.",
      },
      {
        title: "Integração com sensores",
        description:
          "Temperatura, pressão, vibração, contagem ou condição física integrada ao fluxo de informação. Evento do sensor vira dado acionável no painel e no alerta.",
      },
      {
        title: "Alertas por evento e parada",
        description:
          "Parada, desvio ou condição crítica disparam aviso automático por regra definida. Manutenção, produção ou gestão recebem na hora, não no relatório.",
      },
      {
        title: "Painéis em tempo real",
        description:
          "Dashboard operacional e gerencial alimentado pelo chão de fábrica. OEE, disponibilidade, ciclo e andamento visíveis enquanto a produção acontece.",
      },
      {
        title: "Histórico e rastreio de eventos",
        description:
          "Registro de parada, motivo e sequência para análise de causa e padrão. Dado bruto vira histórico que ajuda a melhorar, não só a monitorar.",
      },
      {
        title: "Integração com ERP, PCP e BI",
        description:
          "Dado da máquina alimenta ordem, indicador e gestão sem redigitar. Chão de fábrica, sistema corporativo e painel gerencial finalmente alinhados.",
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
      "Suas máquinas não têm PLC, sensor ou fonte digital de dado",
      "Você busca só um dashboard bonito, sem conexão com a produção",
      "Ninguém tem tempo para validar sinal e evento no piloto",
      "A expectativa é conectar toda a planta de uma vez em poucas semanas",
      "Apontamento manual ainda basta para o nível de controle que vocês precisam",
    ],
    for: [
      "PLC e sensor geram dado que ninguém usa na gestão",
      "Parada e evento crítico são descobertos tarde demais",
      "Você quer alerta automático, não só gráfico estático",
      "Precisa de sistema completo, não integração superficial",
      "Quer evoluir do painel simples para MES e IIoT no mesmo projeto",
    ],
  },
  socialProof: {
    kicker: "// quem já confiou",
    title: "Automação de verdade reage no evento, não no relatório.",
    subtitle:
      "Não é diagrama de arquitetura. É dado da máquina virando alerta, painel e ação na operação.",
    cases: [
      {
        label: "CASE_01",
        title: "Sistemas Elevate",
        problem:
          "Necessidade de plataforma própria com monitoramento operacional e fluxo de informação integrado ao dia a dia.",
        solution:
          "Sistema completo com captura de evento, automação de rotina, painéis e base única para acompanhamento em tempo real.",
        result:
          "Operação interna conectada e prova prática de capacidade em automação sob medida.",
        tags: ["Next.js", "Tempo real", "B2B"],
      },
      {
        label: "CASE_02",
        title: "Linha com parada invisível",
        problem:
          "Equipamento parava e gestão só descobria no apontamento manual ou no fim do turno.",
        solution:
          "Conexão com PLC, alerta automático por evento de parada e painel operacional com status ao vivo.",
        result:
          "Tempo de reação menor e produção deixou de ser caixa preta para supervisão.",
        tags: ["PLC", "Alertas", "Painel"],
      },
      {
        label: "CASE_03",
        title: "Planta com sensores e múltiplas fontes",
        problem:
          "Dado de sensor, máquina e ERP em silos distintos, impossível de consolidar para decisão rápida.",
        solution:
          "Pipeline de captura, tratamento de evento e sistema unificado com painel gerencial e alerta por limite.",
        result:
          "Informação confiável da máquina até a diretoria, sem planilha paralela.",
        tags: ["Sensores", "IIoT", "Consolidação"],
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
    title: "Por que não resolver com apontamento manual ou painel genérico.",
    subtitle:
      "Cada atalho resolve um pedaço. A Elevate conecta máquina, evento e decisão num sistema só.",
    columns: [
      "Apontamento manual",
      "Painel genérico",
      "Sistemas Elevate",
    ],
    rows: [
      { label: "Captura de dado direto do PLC", values: ["no", "partial", "yes"] },
      { label: "Alerta automático por parada ou evento", values: ["no", "partial", "yes"] },
      { label: "Integração com sensores industriais", values: ["no", "partial", "yes"] },
      { label: "Sistema completo, não só visualização", values: ["no", "no", "yes"] },
      { label: "Painel alimentado em tempo real", values: ["no", "partial", "yes"] },
      { label: "Evolução para MES e IIoT no mesmo projeto", values: ["no", "partial", "yes"] },
    ],
  },
  faq: {
    kicker: "// perguntas frequentes",
    title: "As dúvidas que aparecem antes de começar.",
    subtitle: "Se a sua não estiver aqui, é só chamar no WhatsApp.",
    items: [
      {
        question: "Vocês fazem só dashboard ou sistema completo?",
        answer:
          "Sistema completo. Conectamos PLC e sensor, tratamos evento, configuramos alerta e entregamos painéis integrados ao fluxo real da operação. Dashboard é parte do sistema, não o produto inteiro.",
      },
      {
        question: "Quais PLCs e protocolos vocês conectam?",
        answer:
          "Avaliamos no diagnóstico conforme o parque de máquinas da planta. O ponto de partida é entender o que o controlador expõe e qual dado precisa virar informação na gestão.",
      },
      {
        question: "Como funcionam os alertas por evento?",
        answer:
          "Definimos regra junto com sua equipe. Parada, desvio ou condição crítica disparam aviso para quem precisa agir, por canal e horário acordados no projeto.",
      },
      {
        question: "Preciso parar a produção para conectar?",
        answer:
          "Não. Piloto começa em uma máquina ou linha, com validação gradual e operação seguindo enquanto testamos captura, alerta e painel.",
      },
      {
        question: "Isso integra com meu ERP ou PCP?",
        answer:
          "Sim, quando faz sentido. Dado da máquina pode alimentar ordem, apontamento, indicador ou ERP sem redigitar. A arquitetura conecta chão de fábrica ao resto da operação.",
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
    headline: "Sua máquina já fala. Está na hora de alguém ouvir.",
    subheadline:
      "Conte como vocês capturam dado de PLC e sensor hoje e montamos o sistema que transforma sinal bruto em alerta, painel e decisão na hora certa.",
    cta: "Falar no WhatsApp",
    riskReversal: "Diagnóstico inicial sem compromisso · resposta em até 24h",
  },
  relatedServices: [
    {
      slug: "pcp",
      label: "SYS//PROD",
      name: "Controle de Produção",
      teaser: "Ordens e chão de fábrica alimentados pelo dado da máquina.",
    },
    {
      slug: "dashboards",
      label: "SYS//BI_DATA",
      name: "BI Industrial e Análise de Dados",
      teaser: "Indicadores gerenciais com fonte confiável da produção.",
    },
    {
      slug: "sistemas-sob-medida",
      label: "SYS//BUILD",
      name: "Desenvolvimento Sob Medida",
      teaser: "Regras e fluxos que nenhum pacote pronto cobre.",
    },
  ],
};
