import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./orcamento-theme.css";

const fontPrecoPixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-preco-pixel",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Proposta Comercial",
    default: "Proposta Comercial",
  },
};

export default function OrcamentoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`min-h-screen bg-white text-[#0A0A0A] antialiased selection:bg-black/10 selection:text-[#0A0A0A] ${fontPrecoPixel.variable}`}
    >
      {children}
    </div>
  );
}
