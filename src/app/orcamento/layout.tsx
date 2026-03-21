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
    <div className="min-h-screen bg-white text-[#0A0A0A] antialiased selection:bg-black/10 selection:text-[#0A0A0A]">
      {children}
    </div>
  );
}
