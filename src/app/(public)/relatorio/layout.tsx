import type { Metadata } from "next";
import "./relatorio-theme.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Relatório Mensal",
    default: "Relatório Mensal",
  },
};

export default function RelatorioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#04130b] text-white antialiased selection:bg-[#bdfa3c] selection:text-black">
      {children}
    </div>
  );
}
