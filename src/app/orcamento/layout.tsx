import type { Metadata } from "next";
import "./orcamento-theme.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Proposta Comercial",
    default: "Proposta Comercial",
  },
};

export default function OrcamentoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;1,14..32,300&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Space+Mono:wght@400;700&display=swap"
        rel="stylesheet"
      />
      {/*
        Aura architectural frame — thin border inset around the whole viewport,
        inner content sits on warm cream #FDFBF7.
      */}
      <div
        className="min-h-screen bg-[#DCD8D0] p-[clamp(0.4rem,0.8vw,0.8rem)]"
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        {/* Fixed frame border (pointer-events none so it never blocks clicks) */}
        <div
          aria-hidden
          className="fixed inset-[clamp(0.4rem,0.8vw,0.8rem)] z-[200] border border-[#DCD8D0] pointer-events-none"
        />
        {/* Content wrapper */}
        <div className="relative z-10 min-h-[calc(100vh-clamp(0.8rem,1.6vw,1.6rem))] bg-[#FDFBF7] text-[#0A0A0A] font-light overflow-x-hidden selection:bg-[#0A0A0A] selection:text-[#FDFBF7]">
          {children}
        </div>
      </div>
    </>
  );
}
