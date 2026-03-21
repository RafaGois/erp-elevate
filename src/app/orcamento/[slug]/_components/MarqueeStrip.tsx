"use client";

interface Props {
  lines?: string[];
  dark?: boolean;
}

const DEFAULT_LINES = [
  "Profissionalismo",
  "Autoridade",
  "Resultados",
  "Excelência",
  "Visão",
  "Estratégia",
  "Confiança",
  "Crescimento",
];

export default function MarqueeStrip({ lines = DEFAULT_LINES, dark = true }: Props) {
  const items = [...lines, ...lines];

  return (
    <div
      className={`relative overflow-hidden py-[1.2rem] border-b border-t ${
        dark
          ? "bg-[#0A0A0A] border-[#0A0A0A] text-[#FDFBF7]"
          : "bg-[#F4F1EA] border-[#DCD8D0] text-[#0A0A0A]"
      }`}
    >
      <div className="proposal-marquee-track flex items-center gap-[2.5rem] whitespace-nowrap">
        {items.map((line, i) => (
          <span key={i} className="flex items-center gap-[2.5rem]">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em]">{line}</span>
            <span
              className={`w-[0.3rem] h-[0.3rem] rounded-full flex-shrink-0 ${
                dark ? "bg-[#D9381E]" : "bg-[#D9381E]"
              }`}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
