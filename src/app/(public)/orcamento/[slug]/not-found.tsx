import Link from "next/link";

export default function OrcamentoNotFound() {
  return (
    <main className="min-h-[calc(100vh-clamp(0.8rem,1.6vw,1.6rem))] bg-white flex items-center justify-center px-[clamp(1.5rem,4vw,5rem)]">
      <div className="flex flex-col items-center text-center gap-8 max-w-[40rem]">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#bdfa3c]">
          404
        </span>
        <h1 className="text-4xl font-bold text-black leading-tight md:text-5xl lg:text-6xl">
          Proposta não<br />
          <span className="text-[#7D6B58]">encontrada.</span>
        </h1>
        <p className="text-base text-[#7D6B58] leading-relaxed">
          Esta proposta pode ter expirado, sido removida ou o link pode estar incorreto.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-4 rounded-2xl border border-black/10 bg-black px-8 py-4 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white transition-colors hover:bg-black/90"
        >
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}
