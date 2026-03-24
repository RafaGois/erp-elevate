"use client";

import type { BudgetBlock } from "@/lib/types/budget-content";

const SECTION_LABELS: Partial<Record<BudgetBlock["type"], string>> = {
  sobre_empresa: "Sobre",
  projeto: "Projeto",
  servicos: "Serviços",
  timeline: "Cronograma",
  depoimentos: "Depoimentos",
  equipe: "Equipe",
  preco: "Investimento",
  galeria: "Galeria",
  portfolio: "Portfólio",
  cta: "Contato",
};

const SECTION_IDS: Partial<Record<BudgetBlock["type"], string>> = {
  sobre_empresa: "sobre",
  projeto: "projeto",
  servicos: "servicos",
  timeline: "cronograma",
  depoimentos: "depoimentos",
  equipe: "equipe",
  preco: "preco",
  galeria: "galeria",
  portfolio: "portfolio",
  cta: "contato",
};

interface Props {
  blocks: BudgetBlock[];
}

export default function ProposalNav({ blocks }: Props) {
  const heroIndex = blocks.findIndex((b) => b.type === "hero");
  const navItems = blocks
    .slice(heroIndex + 1)
    .map((block) => ({
      id: SECTION_IDS[block.type],
      label: SECTION_LABELS[block.type],
    }))
    .filter((item): item is { id: string; label: string } => !!item.id && !!item.label);

  if (navItems.length === 0) return null;

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav
      className="flex items-center gap-x-6 gap-y-1 py-4"
      aria-label="Navegação da proposta"
    >
      {navItems.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => scrollToSection(id)}
          className="cursor-pointer font-mono text-[0.6rem] uppercase tracking-[0.15em] text-[#7D6B58]/80 hover:text-black transition-colors whitespace-nowrap"
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
