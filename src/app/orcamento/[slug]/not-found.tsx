import Link from "next/link";

export default function OrcamentoNotFound() {
  return (
    <main className="min-h-[calc(100vh-clamp(0.8rem,1.6vw,1.6rem))] bg-[#FDFBF7] flex items-center justify-center px-[clamp(1.5rem,4vw,5rem)]">
      <div className="flex flex-col items-center text-center gap-[2rem] max-w-[40rem]">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#D9381E]">
          404
        </span>
        <h1
          className="font-serif font-normal text-[#0A0A0A] leading-[0.95] tracking-tighter"
          style={{
            fontSize: "clamp(3rem,6vw,6rem)",
            fontFamily: "'Playfair Display', Georgia, serif",
          }}
        >
          Proposta não<br />
          <span className="italic text-[#555555]">encontrada.</span>
        </h1>
        <p className="font-sans text-[0.9rem] text-[#555555] leading-[1.7]">
          Esta proposta pode ter expirado, sido removida ou o link pode estar incorreto.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-[1rem] py-[1rem] px-[2rem] border border-[#DCD8D0] hover:bg-[#F4F1EA] font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#0A0A0A] transition-colors"
        >
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}
