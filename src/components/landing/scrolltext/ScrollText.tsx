"use client";

export default function ScrollText() {
  return (
    <section className="w-full h-svh md:h-[50svw] bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Texto principal */}
      <div className="z-10 relative">
        <h1 className="text-wrap text-center max-w-6xl text-4xl md:text-7xl font-bold text-white">
          Desenvolvimento de software com mentalidade industrial
        </h1>
        <div className="w-full flex justify-center mt-4">
          <p className="text-white/80 max-w-4xl text-wrap text-center text-sm md:text-base">
            Desenvolvimento de soluções para planejamento, controle de produção,
            automação de processos e gestão industrial customizadas e flexíveis
            para resolver o seu problema de forma real
          </p>
        </div>
      </div>

      {/* Cards flutuantes — puro CSS */}
      <div
        className="absolute top-[5%] left-[5%] w-24 h-24 md:w-32 md:h-32 rounded-xl border border-white/20 bg-white/5 flex items-center justify-center anim-float"
        style={{ animationDelay: "0s" }}
        aria-hidden
      >
        <svg
          viewBox="0 0 64 64"
          className="w-12 h-12 md:w-16 md:h-16 text-white/80"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M20 16v32M44 16v32M20 24h28M20 40h28" />
          <path d="M28 24v16M36 24v16" strokeWidth="1" opacity="0.7" />
        </svg>
      </div>

      <div
        className="absolute top-[15%] right-[12%] w-28 h-20 md:w-36 md:h-24 rounded-xl border border-white/20 bg-white/5 p-2 anim-float"
        style={{ animationDelay: "1s" }}
        aria-hidden
      >
        <div className="h-full w-full rounded border border-white/10 flex flex-col overflow-hidden">
          <div className="flex gap-1.5 px-2 py-1.5 border-b border-white/10">
            <span className="w-2 h-2 rounded-full bg-white/30" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
          </div>
          <div className="flex-1 font-mono text-[8px] md:text-[10px] text-[#bdfa3c]/90 p-1.5 leading-tight">
            <span className="text-white/50">&gt;</span> run dev
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-[12%] left-[12%] w-24 h-24 md:w-32 md:h-32 rounded-xl border border-white/20 bg-white/5 flex items-center justify-center anim-float"
        style={{ animationDelay: "2s" }}
        aria-hidden
      >
        <svg
          viewBox="0 0 64 64"
          className="w-14 h-14 md:w-20 md:h-20 text-white/80"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <circle cx="32" cy="32" r="20" opacity="0.4" />
          <circle cx="32" cy="32" r="12" opacity="0.6" />
          <circle cx="32" cy="20" r="4" />
          <circle cx="44" cy="36" r="4" />
          <circle cx="20" cy="36" r="4" />
          <circle cx="32" cy="48" r="4" />
          <path
            d="M32 24v8M32 40v4M28 36h-4M40 36h4M26 28l4 4M34 38l4 4M26 44l4-4M34 30l4 4"
            strokeWidth="1"
            opacity="0.5"
          />
        </svg>
      </div>

      <div
        className="absolute bottom-[6%] right-[7%] w-28 h-20 md:w-36 md:h-24 rounded-xl border border-white/20 bg-white/5 p-2 font-mono text-[10px] md:text-xs text-white/70 anim-float"
        style={{ animationDelay: "0.5s" }}
        aria-hidden
      >
        <div className="flex flex-col gap-0.5">
          <span>
            <span className="text-white/40">0</span> 1011 0010
          </span>
          <span>
            <span className="text-white/40">1</span> 0100 1110
          </span>
          <span>
            <span className="text-[#bdfa3c]/70">2</span> 1110 0001
          </span>
        </div>
      </div>

      <div
        className="absolute left-[6%] top-[32%] w-20 h-20 md:w-24 md:h-24 rounded-xl border border-white/20 bg-white/5 flex items-center justify-center anim-float"
        style={{ animationDelay: "1.5s" }}
        aria-hidden
      >
        <svg
          viewBox="0 0 48 48"
          className="w-10 h-10 md:w-12 md:h-12 text-white/80"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <path d="M16 8v32M32 8v32M16 8h4a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4h-4M32 8h-4a4 4 0 0 0-4 4v24a4 4 0 0 0 4 4h4" />
        </svg>
      </div>

      <div
        className="absolute right-[6%] top-[32%] w-20 h-16 md:w-24 md:h-20 rounded-xl border border-white/20 bg-white/5 flex items-center justify-center anim-float"
        style={{ animationDelay: "2.5s" }}
        aria-hidden
      >
        <span className="font-mono text-white/80 text-sm md:text-base">
          <span className="text-[#bdfa3c]/90">&lt;</span>/
          <span className="text-[#bdfa3c]/90">&gt;</span>
        </span>
      </div>

      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-[8%] w-24 h-14 md:w-28 md:h-16 rounded-xl border border-white/20 bg-white/5 flex items-center justify-center gap-1 font-mono text-[9px] md:text-[10px] text-white/60 anim-float"
        style={{ animationDelay: "3s" }}
        aria-hidden
      >
        <span className="text-white/40">main</span>
        <span className="text-white/30">→</span>
        <span className="text-[#bdfa3c]/80">feat/ui</span>
      </div>

      {/* Flutuação pura CSS */}
      <style jsx>{`
        .anim-float {
          animation: float 6s ease-in-out infinite;
          will-change: transform;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }
      `}</style>
    </section>
  );
}
