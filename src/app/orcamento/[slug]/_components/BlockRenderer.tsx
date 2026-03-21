"use client";

import { Fragment } from "react";
import { BudgetBlock } from "@/lib/types/budget-content";
import HeroBlock from "./HeroBlock";
import SobreEmpresaBlock from "./SobreEmpresaBlock";
import ProjetoBlock from "./ProjetoBlock";
import ServicosBlock from "./ServicosBlock";
import TimelineBlock from "./TimelineBlock";
import PrecoBlock from "./PrecoBlock";
import DepoimentosBlock from "./DepoimentosBlock";
import GaleriaBlock from "./GaleriaBlock";
import EquipeBlock from "./EquipeBlock";
import CtaBlock from "./CtaBlock";
import TextoBlock from "./TextoBlock";
import MarqueeStrip from "./MarqueeStrip";
import ProposalNav from "./ProposalNav";

const BLOCK_IDS: Partial<Record<BudgetBlock["type"], string>> = {
  sobre_empresa: "sobre",
  projeto: "projeto",
  servicos: "servicos",
  timeline: "cronograma",
  depoimentos: "depoimentos",
  equipe: "equipe",
  preco: "preco",
  galeria: "galeria",
  cta: "contato",
};

interface BlockRendererProps {
  blocks: BudgetBlock[];
  isAdmin?: boolean;
  onBlockChange?: (index: number, newData: BudgetBlock["data"]) => void;
}

export default function BlockRenderer({
  blocks,
  isAdmin = false,
  onBlockChange,
}: BlockRendererProps) {
  function change(i: number) {
    return (newData: BudgetBlock["data"]) => onBlockChange?.(i, newData);
  }

  /* Marquee após hero — storytelling light */
  function insertMarqueeAfterHero(i: number): boolean {
    return i > 0 && blocks[i - 1].type === "hero";
  }

  return (
    <>
      {blocks.map((block, i) => {
        const marquee = insertMarqueeAfterHero(i);
        const sectionId = BLOCK_IDS[block.type];

        const rendered = (() => {
          switch (block.type) {
            case "hero":
              return (
                <HeroBlock
                  key={i}
                  data={block.data}
                  blocks={blocks}
                  isAdmin={isAdmin}
                  onChange={change(i)}
                />
              );
            case "sobre_empresa":
              return (
                <SobreEmpresaBlock
                  key={i}
                  data={block.data}
                  isAdmin={isAdmin}
                  onChange={change(i)}
                />
              );
            case "projeto":
              return (
                <ProjetoBlock key={i} data={block.data} isAdmin={isAdmin} onChange={change(i)} />
              );
            case "servicos":
              return (
                <ServicosBlock key={i} data={block.data} isAdmin={isAdmin} onChange={change(i)} />
              );
            case "timeline":
              return (
                <TimelineBlock key={i} data={block.data} isAdmin={isAdmin} onChange={change(i)} />
              );
            case "preco":
              return (
                <PrecoBlock key={i} data={block.data} isAdmin={isAdmin} onChange={change(i)} />
              );
            case "depoimentos":
              return (
                <DepoimentosBlock
                  key={i}
                  data={block.data}
                  isAdmin={isAdmin}
                  onChange={change(i)}
                />
              );
            case "galeria":
              return (
                <GaleriaBlock key={i} data={block.data} isAdmin={isAdmin} onChange={change(i)} />
              );
            case "equipe":
              return (
                <EquipeBlock key={i} data={block.data} isAdmin={isAdmin} onChange={change(i)} />
              );
            case "cta":
              return (
                <CtaBlock key={i} data={block.data} isAdmin={isAdmin} onChange={change(i)} />
              );
            case "texto":
              return (
                <TextoBlock key={i} data={block.data} isAdmin={isAdmin} onChange={change(i)} />
              );
            default:
              return null;
          }
        })();

        const wrapped = sectionId ? (
          <div key={i} id={sectionId}>
            {rendered}
          </div>
        ) : (
          rendered
        );

        return (
          <Fragment key={i}>
            {marquee && <MarqueeStrip dark={false} />}
            {wrapped}
          </Fragment>
        );
      })}
    </>
  );
}
