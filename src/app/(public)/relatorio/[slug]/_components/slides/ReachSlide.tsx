"use client";

import SlideShell, { Item, itemVariants } from "../SlideShell";
import EditableStat from "../EditableStat";
import { useReportEdit } from "../report-edit-context";
import { formatNumber } from "../format";

export default function ReachSlide() {
  const { dados, isAdmin } = useReportEdit();
  const a = dados.alcanceEVisualizacoes;

  const secondary: { label: string; value: number; path: string }[] = [
    { label: "Alcance", value: a.alcanceMensal ?? 0, path: "alcanceEVisualizacoes.alcanceMensal" },
    { label: "Visitas ao perfil", value: a.visitasPerfil ?? 0, path: "alcanceEVisualizacoes.visitasPerfil" },
    { label: "Impressões", value: a.impressoes ?? 0, path: "alcanceEVisualizacoes.impressoes" },
    { label: "Cliques no link", value: a.cliquesNoLink ?? 0, path: "alcanceEVisualizacoes.cliquesNoLink" },
  ].filter((s) => isAdmin || s.value > 0);

  const backdrop = (
    <div className="absolute inset-0 flex items-center justify-center">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="absolute rounded-full border border-[#22c55e]/40"
          style={{
            width: "40vmin",
            height: "40vmin",
            animation: "report-pulse-ring 4s ease-out infinite",
            animationDelay: `${i}s`,
          }}
        />
      ))}
      <span className="absolute rounded-full bg-[#bdfa3c]/10 blur-2xl" style={{ width: "30vmin", height: "30vmin" }} />
    </div>
  );

  return (
    <SlideShell backdrop={backdrop} glow="rgba(189,250,60,0.16)" eyebrow="Alcance & Visualizações">
      <Item variants={itemVariants} className="text-[clamp(1rem,2vw,1.3rem)] font-light text-white/60">
        Seu conteúdo apareceu nas telas
      </Item>

      <Item variants={itemVariants} className="my-2">
        <EditableStat
          value={a.visualizacoesMensais ?? 0}
          path="alcanceEVisualizacoes.visualizacoesMensais"
          format={formatNumber}
          className="rep-display text-[clamp(3.2rem,14vw,9.5rem)] leading-none tracking-tight text-white"
        />
      </Item>

      <Item variants={itemVariants} className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-[#bdfa3c]">
        visualizações no mês
      </Item>

      {secondary.length > 0 && (
        <Item variants={itemVariants} className="mt-[clamp(2rem,5vh,3rem)] grid grid-cols-2 gap-3 sm:grid-cols-4">
          {secondary.map((s) => (
            <div key={s.path} className="rep-card px-5 py-4">
              <EditableStat
                value={s.value}
                path={s.path}
                format={formatNumber}
                duration={1.4}
                className="rep-display text-[clamp(1.2rem,2.4vw,1.7rem)] text-white"
              />
              <p className="mt-1 font-mono text-[0.5rem] uppercase tracking-[0.18em] text-white/40">{s.label}</p>
            </div>
          ))}
        </Item>
      )}
    </SlideShell>
  );
}
