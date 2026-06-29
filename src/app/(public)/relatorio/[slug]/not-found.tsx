import Link from "next/link";

export default function RelatorioNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#04130b] px-[clamp(1.5rem,4vw,5rem)]">
      <div className="flex max-w-[40rem] flex-col items-center gap-8 text-center">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#bdfa3c]">
          404
        </span>
        <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
          Relatório não<br />
          <span className="text-white/50">encontrado.</span>
        </h1>
        <p className="text-base leading-relaxed text-white/60">
          Este relatório pode ter sido removido ou o link pode estar incorreto.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-4 rounded-2xl border border-white/10 bg-[#bdfa3c] px-8 py-4 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-black transition-colors hover:bg-[#a8e635]"
        >
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}
