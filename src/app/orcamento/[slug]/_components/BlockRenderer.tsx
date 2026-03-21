"use client";

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

  /* Insert a marquee strip between certain block transitions */
  function shouldInsertMarquee(prev: BudgetBlock | undefined, curr: BudgetBlock): boolean {
    if (!prev) return false;
    const darkBlocks = new Set(["timeline", "equipe", "cta"]);
    const wasLight = !darkBlocks.has(prev.type);
    const isDark = darkBlocks.has(curr.type);
    return wasLight && isDark;
  }

  return (
    <>
      {blocks.map((block, i) => {
        const prev = blocks[i - 1];
        const marquee = shouldInsertMarquee(prev, block);

        const rendered = (() => {
          switch (block.type) {
            case "hero":
              return (
                <HeroBlock key={i} data={block.data} isAdmin={isAdmin} onChange={change(i)} />
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

        return (
          <>
            {marquee && <MarqueeStrip key={`marquee-${i}`} dark />}
            {rendered}
          </>
        );
      })}
    </>
  );
}
