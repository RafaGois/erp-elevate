export type ServiceSection =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "subtitle"; text: string };

export type ServicePage = {
  slug: string;
  name: string;
  shortDescription: string;
  sections: ServiceSection[];
  listingDescription: string;
};

export const servicesData: ServicePage[] = [
  {
    slug: "digitalizacao",
    name: "Digitalização de Empresas Industriais",
    shortDescription:
      "Estruturamos a transição de processos manuais e planilhas dispersas para sistemas digitais integrados.",
    listingDescription:
      "Apoiamos empresas na transição do papel e planilhas para ambientes digitais integrados: levantamento de processos, desenho de fluxos, escolha de ferramentas e acompanhamento da implantação para que a digitalização gere ganho real de controle e visibilidade.",
    sections: [
      {
        type: "paragraph",
        text: "Estruturamos a transição de processos manuais e planilhas dispersas para sistemas digitais integrados. A digitalização industrial não é apenas trocar papel por tela: é reorganizar a forma como a informação circula, onde ela fica armazenada e quem tem acesso a ela no momento certo.",
      },
      {
        type: "paragraph",
        text: "Mapeamos fluxos produtivos, identificamos gargalos e desenvolvemos soluções sob medida para organizar informações, centralizar dados e aumentar a rastreabilidade operacional. Trabalhamos em conjunto com sua equipe para que cada etapa faça sentido no dia a dia da fábrica.",
      },
      { type: "subtitle", text: "Nossa abordagem" },
      {
        type: "paragraph",
        text: "O trabalho começa com um diagnóstico: como os processos funcionam hoje, onde estão as planilhas, os papéis e os sistemas já em uso. A partir daí desenhamos um plano de transição que prioriza ganhos rápidos e reduz risco operacional.",
      },
      {
        type: "list",
        items: [
          "Levantamento e mapeamento de processos e fontes de dados",
          "Desenho de fluxos digitais alinhados à operação real",
          "Definição de ferramentas e integrações necessárias",
          "Implantação em etapas com treinamento e suporte",
          "Acompanhamento pós-implementação e ajustes finos",
        ],
      },
      { type: "subtitle", text: "Benefícios da digitalização" },
      {
        type: "list",
        items: [
          "Centralização da informação e fim de planilhas dispersas",
          "Rastreabilidade de ordens, materiais e decisões",
          "Redução de retrabalho e erros de transcrição",
          "Visibilidade em tempo real para gestão e chão de fábrica",
          "Base sólida para indicadores e melhorias contínuas",
        ],
      },
      { type: "subtitle", text: "Indicado para" },
      {
        type: "paragraph",
        text: "Indústrias que ainda dependem fortemente de controles manuais, planilhas em rede ou sistemas que não conversam entre si. Também para empresas que já deram os primeiros passos na digitalização mas sentem que a informação continua fragmentada ou pouco confiável.",
      },
      {
        type: "paragraph",
        text: "O resultado esperado é um ambiente onde os dados nascem no ponto certo, fluem de forma controlada e chegam a quem precisa, permitindo decisões mais rápidas e um controle operacional real.",
      },
      { type: "subtitle", text: "Digitalização e Indústria 4.0" },
      {
        type: "paragraph",
        text: "A transformação digital na manufatura dialoga com conceitos da Indústria 4.0: uso de dados em tempo real, conectividade entre processos e, quando faz sentido, tecnologias como IoT industrial (IIoT), análise de dados e automação. Não se trata de adotar tudo de uma vez, e sim de evoluir a maturidade digital da empresa com passos que gerem valor — maior eficiência operacional, melhor qualidade, redução de custos e capacidade de responder mais rápido às mudanças do mercado.",
      },
      { type: "subtitle", text: "Desafios que ajudamos a superar" },
      {
        type: "list",
        items: [
          "Falta de visão clara de por onde começar a digitalizar",
          "Múltiplas ferramentas e planilhas sem integração (silos de informação)",
          "Custos e receio de projetos grandes e disruptivos",
          "Necessidade de capacitação da equipe para usar novos sistemas",
        ],
      },
      {
        type: "paragraph",
        text: "Trabalhamos para que a digitalização seja progressiva, aderente à realidade da sua operação e orientada a resultados mensuráveis.",
      },
    ],
  },
  {
    slug: "pcp",
    name: "Sistemas de Controle de Produção (PCP)",
    shortDescription:
      "Plataformas para gestão de ordens de serviço, acompanhamento de produção, controle de prazos, estoque e desempenho operacional.",
    listingDescription:
      "Desenvolvemos e parametrizamos sistemas de PCP alinhados à realidade da sua fábrica: planejamento de capacidade, sequenciamento, ordens de produção, acompanhamento de chão de fábrica e indicadores de desempenho, com integração a ERP, máquinas e outros sistemas quando necessário.",
    sections: [
      {
        type: "paragraph",
        text: "Desenvolvimento de plataformas para gestão de ordens de serviço, acompanhamento de produção, controle de prazos, estoque e desempenho operacional. Um bom PCP é o cérebro da fábrica: concentra o que precisa ser feito, em que ordem e com quais recursos, e alimenta a tomada de decisão com dados atualizados.",
      },
      {
        type: "paragraph",
        text: "Nossas soluções são pensadas para a realidade do chão de fábrica e da gestão: telas objetivas, fluxos que refletem o modo de trabalho da empresa e integração com ERP, planilhas e, quando aplicável, máquinas e dispositivos de coleta de dados.",
      },
      { type: "subtitle", text: "Soluções pensadas para" },
      {
        type: "list",
        items: [
          "Melhorar previsibilidade de prazos e capacidade",
          "Reduzir atrasos e desvios entre planejado e realizado",
          "Aumentar controle gerencial sobre ordens e prioridades",
          "Dar visibilidade em tempo real do status da produção",
          "Gerar indicadores de desempenho e produtividade",
        ],
      },
      { type: "subtitle", text: "Funcionalidades típicas" },
      {
        type: "list",
        items: [
          "Emissão e gestão de ordens de produção ou serviço",
          "Planejamento de capacidade e sequenciamento",
          "Acompanhamento de andamento (status, etapas, responsáveis)",
          "Controle de prazos e alertas de atraso",
          "Relação com estoque de materiais e consumo",
          "Registro de paradas, motivos e tempos",
          "Relatórios e dashboards para gestão",
        ],
      },
      { type: "subtitle", text: "Integração com o ecossistema" },
      {
        type: "paragraph",
        text: "O PCP ganha força quando conversa com o restante do sistema de informação da empresa: ERP para pedidos e estoque, comercial para prazos prometidos, engenharia para roteiros e BOM. Desenhamos as integrações necessárias para evitar retrabalho e manter uma única fonte de verdade.",
      },
      {
        type: "paragraph",
        text: "Indicado para indústrias de manufatura, metal mecânica, usinagem, montagem e serviços industriais que precisam planejar, acompanhar e medir a produção de forma estruturada e escalável.",
      },
      { type: "subtitle", text: "PCP, PPCP e MES" },
      {
        type: "paragraph",
        text: "O PCP faz parte do PPCP (Planejamento, Programação e Controle da Produção). Quando a operação exige visão em tempo real do chão de fábrica, coleta automática de dados de máquinas e indicadores como OEE (Overall Equipment Effectiveness), entramos no território do MES (Manufacturing Execution System) — a camada que conecta o planejamento (ERP) à execução. Desenhamos soluções que podem ir do PCP mais enxuto até um MES integrado, conforme a necessidade e a maturidade da fábrica.",
      },
      { type: "subtitle", text: "Impactos esperados" },
      {
        type: "list",
        items: [
          "Visibilidade em tempo real do status de produção e das ordens",
          "Redução de lead time e de desvios entre planejado e realizado",
          "Melhor utilização de capacidade e redução de paradas não planejadas",
          "Queda de refugos e retrabalho com registro de causas e ações",
          "Integração entre chão de fábrica, manutenção, qualidade e gestão",
          "Decisões baseadas em dados e indicadores de desempenho (OEE, produtividade, cumprimento de prazos)",
        ],
      },
    ],
  },
  {
    slug: "sistemas-sob-medida",
    name: "Desenvolvimento de Sistemas Sob Medida",
    shortDescription:
      "Softwares personalizados para atender necessidades específicas da operação industrial.",
    listingDescription:
      "Projetamos e construímos sistemas exclusivos para necessidades que soluções prontas não atendem: desde módulos complementares até aplicações completas, com foco em usabilidade, manutenção futura e documentação, sempre em diálogo contínuo com sua equipe.",
    sections: [
      {
        type: "paragraph",
        text: "Criação de softwares personalizados para atender necessidades específicas da operação industrial, integrando setores como produção, engenharia, comercial e administrativo. Quando pacotes prontos não se encaixam no seu processo ou quando você precisa de um diferencial que nenhum produto de prateleira oferece, o caminho é o desenvolvimento sob medida.",
      },
      {
        type: "paragraph",
        text: "Cada sistema é concebido a partir do seu contexto: fluxos reais, vocabulário da empresa, integrações com o que você já usa e espaço para evoluir sem quebrar o que já está no ar. O resultado é uma ferramenta que parece feita para a sua operação — porque é.",
      },
      { type: "subtitle", text: "Cada sistema é projetado com" },
      {
        type: "list",
        items: [
          "Arquitetura escalável, preparada para crescer com a empresa",
          "Modelagem de dados estruturada e documentada",
          "Interface simples e funcional, pensada para quem usa no dia a dia",
          "Código e documentação que permitem manutenção e evolução",
          "Testes e validação antes de ir para produção",
        ],
      },
      { type: "subtitle", text: "Setores e processos atendidos" },
      {
        type: "paragraph",
        text: "Desenvolvemos módulos e sistemas para produção, PCP, qualidade, manutenção, engenharia de produto, comercial, expedição e gestão geral. Podemos criar um sistema do zero, estender um ERP ou um sistema legado com novos módulos, ou substituir planilhas e processos manuais por uma aplicação integrada.",
      },
      { type: "subtitle", text: "Ciclo de desenvolvimento" },
      {
        type: "list",
        items: [
          "Levantamento de requisitos e desenho da solução em conjunto com a equipe",
          "Protótipos e validações antes da construção definitiva",
          "Desenvolvimento em etapas com entregas parciais e feedback",
          "Testes, treinamento e implantação assistida",
          "Documentação técnica e funcional, suporte pós-go-live e evolução contínua",
        ],
      },
      {
        type: "paragraph",
        text: "Indicado para empresas que têm processos únicos, necessidades que nenhum software pronto cobre de forma adequada, ou que desejam consolidar várias ferramentas e planilhas em uma solução única, alinhada à sua estratégia e à sua operação.",
      },
      { type: "subtitle", text: "Especificidades da indústria metalmecânica" },
      {
        type: "paragraph",
        text: "Na indústria metal mecânica, usinagem e manufatura sob encomenda, os sistemas sob medida frequentemente precisam contemplar: planejamento integrado de produção (PCP), configurador de produtos para variações e opções, apontamento de produção em tempo real, gestão de estoque e de terceirização (subcontratação), cálculo de custos industriais e conformidade fiscal (SPED, Bloco K). Quando há necessidade, integramos com softwares de desenho (CAD) e com ERPs já em uso, evitando retrabalho e mantendo uma única fonte de verdade.",
      },
      {
        type: "list",
        items: [
          "Configurador de produtos para itens com muitas variações (opções, medidas, materiais)",
          "Controle parametrizado de itens e listas de materiais (BOM) industriais",
          "Integração com ERP e, quando aplicável, com sistemas de engenharia e comercial",
        ],
      },
    ],
  },
  {
    slug: "dashboards",
    name: "Dashboards e Indicadores Industriais",
    shortDescription:
      "Painéis estratégicos para acompanhamento de KPIs industriais em tempo real.",
    listingDescription:
      "Criamos painéis e relatórios que transformam dados operacionais e gerenciais em visão clara para decisão: acompanhamento de produção, qualidade, entregas, custos e KPIs customizados, com atualização em tempo real ou agendada, conforme a necessidade do negócio.",
    sections: [
      {
        type: "paragraph",
        text: "Desenvolvimento de painéis estratégicos para acompanhamento de KPIs industriais em tempo real. Dados brutos existem em todo lugar; o que falta é transformá-los em informação acionável, no formato certo e no momento em que o gestor precisa decidir. É isso que nossos dashboards entregam.",
      },
      {
        type: "paragraph",
        text: "Trabalhamos a partir das fontes de dados que você já tem — ERPs, planilhas, bancos de dados, sistemas de produção — e desenhamos visualizações que destacam o que importa: tendências, desvios, metas e comparações. Tudo com atualização automática, para que a decisão seja baseada no cenário atual, não em relatórios defasados.",
      },
      { type: "subtitle", text: "Indicadores como" },
      {
        type: "list",
        items: [
          "Eficiência produtiva e utilização de capacidade",
          "Cumprimento de prazos (entregas, ordens, etapas)",
          "Taxa de retrabalho e não conformidade",
          "Performance por setor, máquina, equipe ou período",
          "Consumo de materiais e custos operacionais",
          "Disponibilidade de equipamentos e paradas",
          "Qualidade e indicadores por cliente ou produto",
        ],
      },
      { type: "subtitle", text: "Tipos de painéis" },
      {
        type: "list",
        items: [
          "Painéis operacionais: foco no dia a dia da produção e do chão de fábrica",
          "Painéis gerenciais: visão consolidada para direção e gerência",
          "Relatórios agendados: envio por e-mail ou acesso em portal",
          "Alertas e notificações quando indicadores ultrapassam limites definidos",
        ],
      },
      {
        type: "paragraph",
        text: "Transformamos dados operacionais em informação estratégica para tomada de decisão. Os painéis podem ser acessados por navegador, em TVs no chão de fábrica ou em dispositivos móveis, sempre com cuidado com a segurança da informação e o perfil de cada usuário.",
      },
      {
        type: "paragraph",
        text: "Indicado para indústrias que já geram dados em sistemas ou planilhas mas sentem dificuldade para consolidá-los, visualizá-los e usá-los de forma ágil. O resultado é uma gestão mais baseada em fatos e menos em intuição ou planilhas estáticas.",
      },
      { type: "subtitle", text: "OEE e indicadores de equipamento" },
      {
        type: "paragraph",
        text: "O OEE (Overall Equipment Effectiveness) é um dos indicadores mais usados para medir a eficiência de máquinas e linhas. Ele combina três fatores: disponibilidade (percentual do tempo em que o equipamento está disponível para produzir), desempenho (ritmo real versus ritmo teórico) e qualidade (produtos bons em relação ao total produzido). Nossos painéis podem calcular e exibir OEE por máquina, célula ou planta, além de outros KPIs de produção, qualidade, manutenção e logística, em tempo real ou com histórico para análise de tendências.",
      },
      { type: "subtitle", text: "Da planilha à operação orientada por dados" },
      {
        type: "paragraph",
        text: "A evolução para uma operação data-driven passa por substituir planilhas manuais e relatórios estáticos por plataformas que conectam MES, ERP, qualidade e manutenção em uma visão unificada. Oferecemos coleta automática quando há sensores ou sistemas no chão de fábrica, alertas configuráveis (e-mail, push, integrações) e visualização em múltiplos dispositivos, incluindo TVs no chão de fábrica e painéis gerenciais.",
      },
    ],
  },
  {
    slug: "integracao-automacao",
    name: "Integração e Automação de Processos",
    shortDescription:
      "Integração entre sistemas, ERPs e ferramentas existentes, reduzindo retrabalho e redundância.",
    listingDescription:
      "Conectamos sistemas, máquinas e fontes de dados para eliminar retrabalho e falhas de comunicação: integrações via API, ETL, automação de rotinas e fluxos que reduzem intervenção manual e garantem consistência da informação entre áreas e ferramentas.",
    sections: [
      {
        type: "paragraph",
        text: "Integração entre sistemas internos, ERPs e ferramentas existentes, reduzindo retrabalho manual e eliminando redundância de dados. Em muitas empresas a informação existe, mas está presa em sistemas que não conversam: o comercial lança em um lugar, a produção planeja em outro, o estoque é atualizado em planilha. O resultado é retrabalho, atrasos e erros. Nossa atuação é conectar essas pontas.",
      },
      {
        type: "paragraph",
        text: "Desenhamos e implementamos integrações via APIs, troca de arquivos, ETL e automação de rotinas. O objetivo é que cada dado seja digitado ou gerado uma vez e propague para onde for necessário, com regras claras e tratamento de erros, para que a operação ganhe fluidez e confiabilidade.",
      },
      { type: "subtitle", text: "Automatização de fluxos como" },
      {
        type: "list",
        items: [
          "Atualização de status de produção entre PCP, ERP e painéis",
          "Comunicação entre setores (pedidos, ordens, liberações)",
          "Consolidação de informações de múltiplas fontes em um único painel",
          "Sincronização de cadastros (clientes, produtos, BOM) entre sistemas",
          "Disparo de alertas e notificações com base em regras (prazo, estoque, qualidade)",
          "Geração e envio de relatórios e arquivos de forma agendada",
        ],
      },
      { type: "subtitle", text: "Tecnologias e abordagens" },
      {
        type: "paragraph",
        text: "Utilizamos APIs REST, leitura e escrita em bancos de dados, troca de arquivos (CSV, XML, etc.), webhooks e ferramentas de orquestração quando o fluxo é mais complexo. Priorizamos soluções estáveis, documentadas e que sua equipe consiga manter ou evoluir no futuro.",
      },
      { type: "subtitle", text: "Benefícios" },
      {
        type: "list",
        items: [
          "Eliminação de digitação duplicada e retrabalho entre sistemas",
          "Informação consistente e atualizada em todos os pontos que precisam dela",
          "Redução de erros de transcrição e atrasos de atualização",
          "Mais tempo da equipe para atividades de valor em vez de conciliação manual",
          "Base integrada para indicadores, dashboards e relatórios confiáveis",
        ],
      },
      {
        type: "paragraph",
        text: "Indicado para empresas que usam mais de um sistema (ERP, PCP, planilhas, ferramentas de qualidade, comercial) e sentem o peso da desconexão: retrabalho, dúvidas sobre qual número é o correto e dificuldade para ter uma visão única da operação. A integração e a automação bem desenhadas devolvem confiança e tempo à equipe.",
      },
      { type: "subtitle", text: "APIs e ETL na prática" },
      {
        type: "paragraph",
        text: "A integração via API (Application Programming Interface) permite que sistemas diferentes troquem dados de forma padronizada e segura, sem expor código-fonte. Quando os dados vêm de várias fontes — ERPs, bancos de dados, planilhas, APIs de terceiros — utilizamos abordagens ETL (Extract, Transform, Load): extrair os dados das origens, transformá-los (limpeza, regras de negócio, formato único) e carregá-los no destino desejado (data warehouse, outro sistema, painéis). Assim, pedidos, estoques, status de produção e cadastros permanecem sincronizados sem retrabalho manual.",
      },
      {
        type: "paragraph",
        text: "O resultado é um ecossistema em que o ERP e os demais sistemas funcionam de forma composável: cada módulo ou ferramenta cumpre seu papel, e as integrações garantem que a informação circule de ponta a ponta, permitindo até mesmo dashboards e decisões em tempo real sobre toda a operação.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServicePage | undefined {
  return servicesData.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return servicesData.map((s) => s.slug);
}
