"use client";

import { useGSAP } from "@gsap/react";
import { useRef, useEffect, useCallback } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { gsap } from "gsap";
import Image from "next/image";

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
        <h1 className="text-center text-7xl font-bold text-white ">
          Aqui criamos <span className="arte-word">ARTE</span>
        </h1>
        <p className="text-white text-wrap text-center opacity-0">
        Unimos sensibilidade e estratégia pra transformar ideias em arte, conexão e resultado. <br />
        Damos vida a histórias reais, com autenticidade e propósito em cada detalhe.
        </p>
      </div>
      
      {/* Imagens com efeito parallax */}
      <Image
        src="https://res.cloudinary.com/dn454izoh/image/upload/v1758206696/site-3_npcltl.jpg"
        alt="Berto"
        height={200}
        width={100}
        className="img-scrolltext absolute rounded-xl top-[5%] z-40 left-[5%] hover:scale-150"
      />
      <Image
        src="https://res.cloudinary.com/dn454izoh/image/upload/v1758203203/site-2_zz3ohw.jpg"
        alt="Corporativas"
        height={200}
        width={100}
        className="img-scrolltext absolute z-40 rounded-xl top-[15%] right-[12%]"
      />
      <Image
        src="https://res.cloudinary.com/dn454izoh/image/upload/v1758203002/site-9_f0blme.jpg"
        alt="Divina"
        height={200}
        width={100}
        className="img-scrolltext absolute z-40 rounded-xl bottom-[12%] left-[12%] "
      />
      <Image
        src="https://res.cloudinary.com/dn454izoh/image/upload/v1756823349/img-5_svixxi.jpg"
        alt="Bruno"
        height={200}
        width={100}
        className="img-scrolltext absolute z-40 rounded-xl bottom-[6%] right-[7%]"
      />
    </section>
  );
}
