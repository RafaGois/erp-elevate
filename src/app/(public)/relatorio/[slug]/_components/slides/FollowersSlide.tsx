"use client";

import { motion } from "framer-motion";
import SlideShell, { Item, itemVariants } from "../SlideShell";
import EditableStat from "../EditableStat";
import { useReportEdit } from "../report-edit-context";
import { formatNumber, formatPercent } from "../format";

const signedNumber = (n: number) => `${n > 0 ? "+" : ""}${formatNumber(n)}`;

export default function FollowersSlide() {
  const { dados, isAdmin } = useReportEdit();
  const p = dados.perfil;
  const novos = p.novosSeguidores ?? 0;
  const positivo = novos >= 0;

  const backdrop = (
    <div className="absolute inset-0 flex items-end justify-center">
      <svg
        viewBox="0 0 1000 500"
        preserveAspectRatio="xMidYMax slice"
        className="h-[80vh] w-full opacity-80"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="followFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#bdfa3c" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#bdfa3c" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,430 C180,400 280,300 420,290 C560,280 640,200 780,150 C870,118 940,90 1000,70 L1000,500 L0,500 Z"
          fill="url(#followFill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        />
        <motion.path
          d="M0,430 C180,400 280,300 420,290 C560,280 640,200 780,150 C870,118 940,90 1000,70"
          fill="none"
          stroke="#bdfa3c"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        />
        {[[420, 290], [780, 150], [1000, 70]].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r="7"
            fill="#04130b"
            stroke="#bdfa3c"
            strokeWidth="4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 + i * 0.25, type: "spring", stiffness: 300 }}
          />
        ))}
      </svg>
    </div>
  );

  return (
    <SlideShell backdrop={backdrop} glow="rgba(34,197,94,0.2)" eyebrow="Audiência">
      <Item variants={itemVariants} className="text-[clamp(1rem,2vw,1.3rem)] font-light text-white/60">
        Sua comunidade {positivo ? "cresceu" : "mudou"} esse mês
      </Item>

      <Item variants={itemVariants} className="my-2">
        <EditableStat
          value={novos}
          path="perfil.novosSeguidores"
          format={signedNumber}
          className="rep-display text-[clamp(3.5rem,15vw,10rem)] leading-none tracking-tight text-white"
        />
      </Item>

      <Item variants={itemVariants} className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-white/50">
        novos seguidores
      </Item>

      <Item variants={itemVariants} className="mt-[clamp(1.5rem,4vh,2.5rem)] flex flex-wrap items-center justify-center gap-3">
        {(isAdmin || p.seguidoresFim > 0) && (
          <Stat label="Total de seguidores" value={p.seguidoresFim} path="perfil.seguidoresFim" format={formatNumber} />
        )}
        {(isAdmin || (p.crescimentoPercentual ?? 0) !== 0) && (
          <Stat
            label="Crescimento"
            value={p.crescimentoPercentual ?? 0}
            path="perfil.crescimentoPercentual"
            format={formatPercent}
            highlight
          />
        )}
      </Item>
    </SlideShell>
  );
}

function Stat({
  label,
  value,
  path,
  format,
  highlight,
}: {
  label: string;
  value: number;
  path: string;
  format: (n: number) => string;
  highlight?: boolean;
}) {
  return (
    <div className="rep-card px-6 py-4">
      <EditableStat
        value={value}
        path={path}
        format={format}
        countUp={false}
        className={`rep-display text-[clamp(1.4rem,3vw,2rem)] ${highlight ? "text-[#bdfa3c]" : "text-white"}`}
      />
      <p className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-white/40">{label}</p>
    </div>
  );
}
