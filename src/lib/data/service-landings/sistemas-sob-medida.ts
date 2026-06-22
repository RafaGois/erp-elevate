import type { ServiceLandingPage } from "@/types/service-landing";

/**
 * Desenvolvimento Sob Medida
 * Copy orientada a conversão para empresas com processo único
 * que nenhum software pronto cobre de forma adequada.
 * Restrição de estilo: sem dois pontos e sem hífen em toda a copy visível.
 */
export const sistemasSobMedidaLanding: ServiceLandingPage = {
  slug: "sistemas-sob-medida",
  meta: {
    title: "Desenvolvimento Sob Medida | Sistemas Elevate",
    description:
      "Software exclusivo para a operação que nenhum pacote pronto atende. Sistemas sob medida com arquitetura escalável, entregas por fase e documentação para evoluir.",
  },
  hero: {
    badge: "SYS//BUILD",
    headline: "Seu processo é único. O software pronto nunca encaixa de verdade.",
    subheadline:
      "Desenvolvemos sistemas exclusivos para a operação industrial, alinhados ao fluxo real da sua empresa, com entregas parciais e base pronta para crescer.",
    microProof:
      "Metal mecânica · Manufatura · Qualidade · Comercial · Engenharia",
    primaryCta: "Falar no WhatsApp",
    secondaryCta: "Ver como funciona",
    backgroundImage: "/fundo.jpeg",
    backgroundVideo: "/ASCII_vegetation_growing_digitally_202606062000.mp4",
    terminalLabel: "BUILD.STATUS",
    terminalLines: [
      "$ requisitos_operacao ....... mapeados",
      "$ arquitetura_sistema ....... definida",
      "$ modulos_criticos .......... em desenvolvimento",
      "$ integracao_erp ............ conectada",
      "$ validacao_equipe .......... aprovada",
      "$ status .................... pronto para escalar",
    ],
  },
  trustBar: [
    "Sistema desenhado para seu fluxo",
    "Entregas parciais validadas por etapa",
    "Integração com ERP e ferramentas atuais",
    "Código documentado para evoluir",
    "Suporte depois da implantação",
  ],
  problem: {
    kicker: "// o problema",
    title: "Cada adaptação forçada custa tempo, erro e oportunidade.",
    subtitle:
      "Quando o software pronto manda na operação, a equipe contorna, planilha paralela nasce e o diferencial da empresa vira gambiarra.",
    pains: [
      {
        title: "Pacote pronto que nunca fala a língua da fábrica",
        description:
          "Você compra licença, parametriza o que dá e contorna o resto. O fluxo real da operação fica pela metade no sistema e pela metade em planilha.",
      },
      {
        title: "Planilha virou sistema paralelo",
        description:
          "Qualidade, engenharia ou expedição criaram controle próprio porque a ferramenta oficial não serve. Cada área vive num mundo e ninguém confia no número.",
      },
      {
        title: "Legado que ninguém ousa mexer",
        description:
          "Sistema antigo faz parte do trabalho, mas evoluir dá medo. Cada mudança pedida vira projeto caro, lento e sem documentação clara.",
      },
    ],
  },
  transformation: {
    kicker: "// antes e depois",
    title: "A mesma operação, com software que segue o processo.",
    beforeLabel: "Como está hoje",
    afterLabel: "Como fica com a Elevate",
    before: [
      "Fluxo real dividido entre ERP, planilha e controle manual",
      "Parametrização forçada de processo único em software genérico",
      "Módulo crítico inexistente ou feito em planilha paralela",
      "Mudança pequena vira projeto longo e arriscado",
      "Equipe contorna o sistema para conseguir trabalhar",
    ],
    after: [
      "Aplicação desenhada em torno do fluxo real da operação",
      "Telas e regras que refletem como a fábrica trabalha",
      "Módulos críticos construídos e integrados ao ecossistema",
      "Evolução em fases com documentação e base sustentável",
      "Equipe adota porque o sistema ajuda, não atrapalha",
    ],
  },
  benefits: {
    kicker: "// o que você ganha",
    title: "Não é software genérico adaptado. É ferramenta feita para sua operação.",
    subtitle:
      "Cada entrega resolve um ponto que hoje trava fluxo, controle ou crescimento do que você já faz na prática.",
    items: [
      {
        title: "Fluxo que espelha a operação real",
        description:
          "Telas, regras e etapas desenhadas com quem usa no dia a dia. Menos contorno, menos planilha paralela e menos resistência na implantação.",
        metric: "Sistema que a equipe adota",
      },
      {
        title: "Módulo que o pacote pronto nunca teve",
        description:
          "Configurador, PCP, qualidade, engenharia ou expedição construídos para o que é específico da sua indústria, não do mercado genérico.",
        metric: "Funcionalidade que faz diferença",
      },
      {
        title: "Arquitetura pronta para crescer",
        description:
          "Código estruturado, documentado e integrável ao ERP e às ferramentas que você já usa. Evoluir deixa de ser recomeçar do zero.",
        metric: "Base sustentável no longo prazo",
      },
      {
        title: "Entrega em fases com risco controlado",
        description:
          "Protótipo, módulo crítico e expansão gradual. Você valida valor antes de investir na próxima etapa, sem projeto gigante parado no meio.",
        metric: "Evolução previsível e validada",
      },
    ],
  },
  howItWorks: {
    kicker: "// como funciona",
    title: "Três passos. Você valida cada um antes do próximo.",
    subtitle:
      "Projeto sob medida pede entender processo antes de escrever código. Nada de sistema bonito que ninguém usa depois da entrega.",
    steps: [
      {
        step: "01",
        title: "Diagnóstico",
        description:
          "Mapeamos fluxo, dor, sistemas atuais e o que precisa existir de verdade. Saímos com escopo por fase e módulo prioritário definido.",
      },
      {
        step: "02",
        title: "Construção",
        description:
          "Protótipo, desenvolvimento e integração com entregas parciais. Sua equipe valida tela, regra e dado antes de expandir o escopo.",
      },
      {
        step: "03",
        title: "Implantação e evolução",
        description:
          "Testes, treinamento, go live assistido e documentação. Você fica com sistema em produção e caminho claro para novos módulos.",
      },
    ],
    cta: "Quero mapear meu escopo",
  },
  deliverables: {
    kicker: "// o que está incluído",
    title: "Do requisito ao sistema no ar, em etapas claras.",
    subtitle:
      "O projeto segue um fluxo simples de entender, prototipar, construir e implantar. Você sabe o que vem em cada fase.",
    items: [
      {
        step: "01",
        title: "Reunião de alinhamento e levantamento",
        description:
          "Entendemos processo, usuários, integrações e o que hoje vive em planilha, ERP ou controle manual.",
      },
      {
        step: "02",
        title: "Desenho da solução e protótipo",
        description:
          "Definimos arquitetura, fluxo e telas críticas. Validamos a direção antes de construir o módulo completo.",
      },
      {
        step: "03",
        title: "Desenvolvimento",
        description:
          "Construímos funcionalidade, integração e regra de negócio com entregas parciais e revisão contínua com sua equipe.",
      },
      {
        step: "04",
        title: "Ambiente de homologação",
        description:
          "Testamos com cenário real ou simulado para conferir fluxo, dado e usabilidade antes do go live.",
      },
      {
        step: "05",
        title: "Ajustes e refinamento",
        description:
          "Corrigimos detalhe de tela, regra e integração com base no feedback de quem vai operar o sistema todo dia.",
      },
      {
        step: "06",
        title: "Entrega e documentação",
        description:
          "Sistema em produção, treinamento da equipe e documentação técnica e funcional para manter e evoluir.",
      },
    ],
  },
  capabilities: {
    kicker: "// capacidades",
    title: "O que compõe um sistema sob medida que sustenta a operação.",
    subtitle:
      "Não é só programar tela. É montar cada peça que transforma processo único em software confiável.",
    items: [
      {
        title: "Módulos operacionais exclusivos",
        description:
          "PCP, qualidade, manutenção, engenharia ou expedição desenhados para o fluxo que nenhum pacote pronto cobre bem.",
      },
      {
        title: "Configurador e regras de produto",
        description:
          "Variação, opção, medida e BOM industrial modelados para manufatura sob encomenda e alto mix de itens.",
      },
      {
        title: "Integração com ERP e legado",
        description:
          "Novo módulo conversando com o que já existe. Uma fonte de verdade, sem redigitar pedido, cadastro ou status.",
      },
      {
        title: "Substituição de planilha crítica",
        description:
          "Controle que hoje vive em Excel vira aplicação com regra, histórico e acesso por perfil. Menos versão paralela escondida.",
      },
      {
        title: "Interface pensada para quem opera",
        description:
          "Telas objetivas para chão de fábrica, supervisão e gestão. Software bonito que ninguém usa não é entrega nossa.",
      },
      {
        title: "Documentação e evolução contínua",
        description:
          "Código, modelo de dado e fluxo documentados para manter, corrigir e expandir sem depender de memória oral.",
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
      "Um ERP pronto já cobre seu processo com pequeno ajuste",
      "Você busca o menor preço de licença, não solução para fluxo único",
      "A equipe não tem tempo para validar requisito e protótipo",
      "A expectativa é substituir tudo de uma vez em poucas semanas",
      "Planilha e processo manual ainda funcionam bem para o volume atual",
    ],
    for: [
      "Seu processo é diferente e software pronto vira contorno constante",
      "Planilha crítica sustenta área que deveria estar no sistema",
      "Você precisa de módulo que nenhum pacote oferece de forma adequada",
      "Quer consolidar ferramentas dispersas numa solução única",
      "Precisa evoluir legado ou ERP com extensão sob medida",
    ],
  },
  socialProof: {
    kicker: "// quem já confiou",
    title: "Software sob medida de verdade roda na operação, não na apresentação.",
    subtitle:
      "Não é mockup de vendas. É sistema em produção, usado pela equipe todo dia.",
    cases: [
      {
        label: "CASE_01",
        title: "Sistemas Elevate",
        problem:
          "Necessidade de plataforma própria que organizasse operação interna e provasse capacidade técnica de ponta a ponta.",
        solution:
          "Sistema completo em Next.js com financeiro, inventário, projetos, propostas e fluxos integrados ao dia a dia da fábrica de software.",
        result:
          "Um sistema que a própria equipe usa todo dia há anos, e serve de vitrine ao mesmo tempo.",
        tags: ["Next.js", "Em produção", "B2B"],
      },
      {
        label: "CASE_02",
        title: "Processo único em manufatura",
        problem:
          "ERP genérico não cobria roteiro, configuração de produto e controle de expedição da operação.",
        solution:
          "Módulos sob medida integrados ao ERP existente, com fluxo validado pela equipe de produção e comercial.",
        result:
          "Menos planilha paralela e processo crítico finalmente dentro do sistema.",
        tags: ["Módulos", "ERP", "Manufatura"],
      },
      {
        label: "CASE_03",
        title: "Substituição de controle manual",
        problem:
          "Qualidade e engenharia dependiam de planilhas críticas sem histórico, perfil ou integração confiável.",
        solution:
          "Aplicação web exclusiva com regra de negócio, trilha de alteração e conexão com cadastro mestre.",
        result:
          "Controle confiável, rastreável e pronto para crescer com novas áreas.",
        tags: ["Qualidade", "Engenharia", "Web app"],
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
    title: "Por que não resolver com ERP pronto ou planilha eterna.",
    subtitle:
      "Cada atalho resolve um pedaço. A Elevate constrói software que encaixa no processo inteiro.",
    columns: [
      "ERP genérico",
      "Planilha e macro",
      "Sistemas Elevate",
    ],
    rows: [
      { label: "Fluxo desenhado para sua operação", values: ["partial", "no", "yes"] },
      { label: "Módulo exclusivo para processo único", values: ["no", "partial", "yes"] },
      { label: "Integração com ERP e legado", values: ["partial", "no", "yes"] },
      { label: "Entregas parciais com validação", values: ["partial", "no", "yes"] },
      { label: "Documentação para evoluir depois", values: ["partial", "no", "yes"] },
      { label: "Interface pensada para quem opera", values: ["partial", "partial", "yes"] },
    ],
  },
  faq: {
    kicker: "// perguntas frequentes",
    title: "As dúvidas que aparecem antes de começar.",
    subtitle: "Se a sua não estiver aqui, é só chamar no WhatsApp.",
    items: [
      {
        question: "Vocês substituem meu ERP?",
        answer:
          "Na maioria dos casos, não. Construímos módulo, extensão ou aplicação que complementa o ERP e substitui planilha ou controle manual que hoje sustenta o que o pacote pronto não cobre.",
      },
      {
        question: "Preciso fechar todo o escopo antes de começar?",
        answer:
          "Não. O diagnóstico organiza prioridade e fases. Muitos projetos começam por um módulo crítico e evoluem conforme a operação valida valor.",
      },
      {
        question: "Quanto tempo leva o primeiro módulo?",
        answer:
          "Depende da complexidade, mas um módulo prioritário bem mapeado costuma levar de 8 a 16 semanas. Projetos maiores são faseados com entrega parcial.",
      },
      {
        question: "Quem mantém o sistema depois?",
        answer:
          "Entregamos documentação e podemos continuar em evolução e suporte. Você não fica refém de código sem explicação ou sem caminho para manter.",
      },
      {
        question: "Como garantir que a equipe vai usar?",
        answer:
          "Validamos protótipo e fluxo com quem opera antes do go live. Sistema sob medida só faz sentido se a fábrica adota, então usabilidade faz parte do escopo.",
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
    headline: "Seu processo é único. Está na hora do software acompanhar.",
    subheadline:
      "Conte o que hoje vive em planilha, contorno ou módulo inexistente e montamos o sistema sob medida que sua operação precisa para crescer com segurança.",
    cta: "Falar no WhatsApp",
    riskReversal: "Diagnóstico inicial sem compromisso · resposta em até 24h",
  },
  relatedServices: [
    {
      slug: "pcp",
      label: "SYS//PROD",
      name: "Controle de Produção",
      teaser: "PCP sob medida quando produção é o coração do sistema.",
    },
    {
      slug: "integracao-automacao",
      label: "SYS//SYNC",
      name: "Integração e Automação",
      teaser: "Novo módulo conectado ao ERP e ao resto da operação.",
    },
    {
      slug: "digitalizacao",
      label: "SYS//PRESENCE",
      name: "Presença Digital Corporativa",
      teaser: "Marca e operação digital alinhadas ao que você entrega.",
    },
  ],
};
