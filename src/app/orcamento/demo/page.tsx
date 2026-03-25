import type { Metadata } from "next";
import demoBudgetJson from "@/lib/data/budget-demo.json";
import type Budget from "@/lib/models/Budget";
import BudgetViewClient from "../[slug]/_components/BudgetViewClient";

export const metadata: Metadata = {
  title: "Demo · Proposta Comercial",
  description: "Visualização de demonstração de uma proposta comercial.",
};

export default function OrcamentoDemoPage() {
  const budget = demoBudgetJson as unknown as Budget;

  return (
    <main className="overflow-x-clip">
      {/* Demo warning banner */}
      <div className="bg-[#FAFAF9] border-b border-black/10">
        <div className="mx-auto w-full max-w-[140rem] px-[clamp(1.5rem,4vw,5rem)] py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#bdfa3c]" />
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#7D6B58]">
              Modo demonstração · dados locais fictícios
            </span>
          </div>
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-black/40 hidden sm:block">
            Nenhuma alteração será salva
          </span>
        </div>
      </div>

      <BudgetViewClient budget={budget} isDemoMode />

      {/* Footer */}
      <footer className="bg-white border-t border-black/10">
        <div className="mx-auto w-full max-w-[140rem] px-[clamp(1.5rem,4vw,5rem)] py-[clamp(2rem,4vw,3rem)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-[0.75rem] text-[#7D6B58]">
            Demo · Proposta para Casa França
          </p>
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.15em] text-black/40">
            Dados fictícios · Apenas para demonstração
          </p>
        </div>
      </footer>
    </main>
  );
}
