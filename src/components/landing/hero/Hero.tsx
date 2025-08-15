"use client";

import { useEffect, useRef } from "react";
import Menu from "./Menu";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { LavaLamp } from "@/components/ui/fluid-blob";

export default function Hero() {
  const container = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const elementos = container.current?.querySelectorAll("h1");

      if (elementos && elementos.length > 0) {
        tl.current = gsap.timeline();

        elementos.forEach((el, i) => {
          tl.current
            ?.fromTo(
              el.querySelector(".barra"),
              { width: "0%" },
              {
                delay: 1,
                duration: 0.6,
                width: "100%",
                ease: "power4.inOut",
                transformOrigin: "0% 50%",
                yoyo: true,
                repeat: 1,
              },
              i * 0.3 // começa cada animação 0.3s depois da anterior
            )
            .to(
              el.querySelector(".texto"),
              {
                opacity: 1,
                duration: 0.6,
                ease: "power4.inOut",
              },
              "<0.5"
            );

          //todo texto aparece dai
        });

        tl.current.from(".texto-titulo", {
          y: 80,
          opacity: 0,
        });
      }
    },
    { scope: container }
  );

  useEffect(() => {
    tl.current?.play();
  }, []);

  return (
    <section
      ref={container}
      className={`flex flex-col items-center h-screen text-white bg-black relative`}
      id="hero"
    >
      <LavaLamp />
      <Menu />
      <div className="flex flex-col items-start justify-end h-full w-full p-8">
        <small className="text-[#7D6B58] tracking-widest texto-titulo">
          Transformando sua presença digital em autoridade
        </small>
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold titulo relative tracking-tight mix-blend-exclusion text-white">
          <span className="h-full bg-white absolute barra"></span>
          <span className="texto opacity-0">ELEVATE PRO</span>
        </h1>
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold titulo tracking-tight mix-blend-exclusion text-white relative">
          <span className="h-full bg-white absolute barra"></span>
          <span className="texto opacity-0">MEDIA</span>
        </h1>
      </div>
    </section>
  );
}

//https://www.youtube.com/watch?v=Tyt2Sq1UMAY&ab_channel=Codegrid
