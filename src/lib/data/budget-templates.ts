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
          titulo: "Sobre o projeto",
          descricao:
            "Este orçamento contempla o desenvolvimento da solução com foco em usabilidade, segurança e evolução contínua.",
          objetivos: [
            "Resolver dores operacionais",
            "Melhorar produtividade do time",
            "Aumentar previsibilidade de processos",
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
              nome: "Plano Proposto",
              valor: budget.value || 0,
              inclui: ["Desenvolvimento", "Testes", "Entrega assistida"],
              destaque: true,
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
          titulo: "Sobre a produção",
          descricao:
            "Planejamento e execução audiovisual com direção criativa, captação e pós-produção.",
          objetivos: [
            "Fortalecer posicionamento da marca",
            "Gerar conteúdo de alto impacto",
            "Melhorar comunicação com o público",
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

