"use client";

import { useGSAP } from "@gsap/react";
import { useRef, useEffect, useCallback } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { gsap } from "gsap";

export default function ScrollText() {
  const container = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const splitTextRef = useRef<SplitText | null>(null);
  const isAnimating = useRef(false);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const windowCenterX = useRef(0);
  const windowCenterY = useRef(0);
  const ticking = useRef(false);

  // Função para atualizar o parallax
  const updateParallax = useCallback(() => {
    if (!container.current) return;

    // Calcular offset do centro
    const offsetX = (mouseX.current - windowCenterX.current) / windowCenterX.current;
    const offsetY = (mouseY.current - windowCenterY.current) / windowCenterY.current;

    // Animar elementos com parallax
    container.current.querySelectorAll(".img-scrolltext").forEach((element, index) => {
      const speed = 0.5 + (index * 0.2); // Velocidade diferente para cada imagem
      const moveX = offsetX * 50 * speed;
      const moveY = offsetY * 50 * speed;

      gsap.to(element, {
        x: moveX,
        y: moveY,
        duration: 1.2,
        ease: "power2.out",
        overwrite: "auto"
      });
    });

    ticking.current = false;
  }, []);

  // Event listener para movimento do mouse
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.current = e.clientX;
    mouseY.current = e.clientY;

    if (!ticking.current) {
      requestAnimationFrame(updateParallax);
      ticking.current = true;
    }
  }, [updateParallax]);

  // Inicializar centro da janela e event listeners
  useEffect(() => {
    windowCenterX.current = window.innerWidth / 2;
    windowCenterY.current = window.innerHeight / 2;

    document.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Atualizar centro da janela no resize
    const handleResize = () => {
      windowCenterX.current = window.innerWidth / 2;
      windowCenterY.current = window.innerHeight / 2;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleMouseMove]);

  useGSAP(
    () => {
      if (!container.current) return;

      gsap.registerPlugin(ScrollTrigger);
      gsap.registerPlugin(SplitText);

      // Configuração inicial
      gsap.set(container.current.querySelector("p"), { opacity: 0 });

      const texto = container.current.querySelector("h1");
      if (!texto) return;

      // Criar SplitText apenas uma vez
      splitTextRef.current = new SplitText(texto, { type: "chars" });

      // Criar timeline apenas uma vez
      if (!tl.current) {
        tl.current = gsap.timeline({ paused: true });

        tl.current.fromTo(
          splitTextRef.current.chars,
          {
            opacity: 0.2,
          },
          {
            duration: 2,
            stagger: 0.05,
            opacity: 1,
            ease: "power2.out",
          }
        );

        tl.current.from(
          container.current.querySelectorAll(".img-scrolltext"),
          {
            scale: 0,
            stagger: 0.6,
            transformOrigin: "50% 50%",
          },
          "<"
        );

        tl.current.to(
          container.current.querySelector("p"),
          {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3"
        );
      }

      // ScrollTrigger otimizado sem scrub
      ScrollTrigger.create({
        trigger: texto,
        start: "top 80%",
        //end: "bottom 20%",
        onEnter: () => {
          if (!isAnimating.current) {
            isAnimating.current = true;
            tl.current?.play();
          }
        },
      });
    },
    { scope: container }
  );

  // Cleanup para evitar memory leaks
  useEffect(() => {
    return () => {
      if (tl.current) {
        tl.current.kill();
      }
      if (splitTextRef.current) {
        splitTextRef.current.revert();
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={container}
      className="w-full h-svh md:h-[50svw] bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden"
    >
      <div className="z-50">
        <h1 className="text-center max-w-6xl text-4xl md:text-7xl font-bold text-white ">
          Desenvolvimento de software com mentalidade industrial
        </h1>
        <div className="w-full flex justify-center">

        <p className="text-white max-w-4xl text-wrap text-center opacity-0">
        Desenvolvimento de soluções para planejamento, controle de produção, automação de processos e gestão industrial customizadas e flexiveis para resolver o seu problema de forma real
        </p>
        </div>
      </div>
      
      {/* Elementos gráficos com efeito parallax - estética programação */}
      <div
        className="img-scrolltext absolute top-[5%] z-40 left-[5%] w-24 h-24 md:w-32 md:h-32 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center hover:border-[#bdfa3c]/50 hover:bg-white/10 transition-colors"
        aria-hidden
      >
        <svg viewBox="0 0 64 64" className="w-12 h-12 md:w-16 md:h-16 text-white/80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M20 16v32M44 16v32M20 24h28M20 40h28" />
          <path d="M28 24v16M36 24v16" strokeWidth="1" opacity="0.7" />
        </svg>
      </div>
      <div
        className="img-scrolltext absolute z-40 top-[15%] right-[12%] w-28 h-20 md:w-36 md:h-24 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm p-2 hover:border-[#bdfa3c]/50 hover:bg-white/10 transition-colors"
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
        className="img-scrolltext absolute z-40 rounded-xl bottom-[12%] left-[12%] w-24 h-24 md:w-32 md:h-32 border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center hover:border-[#bdfa3c]/50 hover:bg-white/10 transition-colors"
        aria-hidden
      >
        <svg viewBox="0 0 64 64" className="w-14 h-14 md:w-20 md:h-20 text-white/80" fill="none" stroke="currentColor" strokeWidth="1.2">
          <circle cx="32" cy="32" r="20" opacity="0.4" />
          <circle cx="32" cy="32" r="12" opacity="0.6" />
          <circle cx="32" cy="20" r="4" />
          <circle cx="44" cy="36" r="4" />
          <circle cx="20" cy="36" r="4" />
          <circle cx="32" cy="48" r="4" />
          <path d="M32 24v8M32 40v4M28 36h-4M40 36h4M26 28l4 4M34 38l4 4M26 44l4-4M34 30l4 4" strokeWidth="1" opacity="0.5" />
        </svg>
      </div>
      <div
        className="img-scrolltext absolute z-40 bottom-[6%] right-[7%] w-28 h-20 md:w-36 md:h-24 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm p-2 font-mono text-[10px] md:text-xs text-white/70 hover:border-[#bdfa3c]/50 hover:bg-white/10 transition-colors"
        aria-hidden
      >
        <div className="flex flex-col gap-0.5">
          <span><span className="text-white/40">0</span> 1011 0010</span>
          <span><span className="text-white/40">1</span> 0100 1110</span>
          <span><span className="text-[#bdfa3c]/70">2</span> 1110 0001</span>
        </div>
      </div>

      {/* Elementos adicionais para preencher a tela */}
      <div
        className="img-scrolltext absolute z-40 left-[6%] top-[32%] w-20 h-20 md:w-24 md:h-24 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center hover:border-[#bdfa3c]/50 hover:bg-white/10 transition-colors"
        aria-hidden
      >
        <svg viewBox="0 0 48 48" className="w-10 h-10 md:w-12 md:h-12 text-white/80" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M16 8v32M32 8v32M16 8h4a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4h-4M32 8h-4a4 4 0 0 0-4 4v24a4 4 0 0 0 4 4h4" />
        </svg>
      </div>
      <div
        className="img-scrolltext absolute z-40 right-[6%] top-[32%] w-20 h-16 md:w-24 md:h-20 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center hover:border-[#bdfa3c]/50 hover:bg-white/10 transition-colors"
        aria-hidden
      >
        <span className="font-mono text-white/80 text-sm md:text-base"><span className="text-[#bdfa3c]/90">&lt;</span>/<span className="text-[#bdfa3c]/90">&gt;</span></span>
      </div>
      <div
        className="img-scrolltext absolute z-40 left-1/2 -translate-x-1/2 bottom-[8%] w-24 h-14 md:w-28 md:h-16 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center gap-1 font-mono text-[9px] md:text-[10px] text-white/60 hover:border-[#bdfa3c]/50 hover:bg-white/10 transition-colors"
        aria-hidden
      >
        <span className="text-white/40">main</span>
        <span className="text-white/30">→</span>
        <span className="text-[#bdfa3c]/80">feat/ui</span>
      </div>
    </section>
  );
}
