"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkle } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export default function AboutUs() {
  const container = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      counterAnim("#businessCounter", 1000);
      counterAnim("#projectsCounter", 100);
      counterAnim("#clientsApprovalCounter", 60);
      counterAnim("#otherCounter", 50);

      tl.current = gsap
        .timeline({
          paused: true,

          scrollTrigger: {
            trigger: container.current.querySelector(".card-1"),
            //scrub: true,
            start: "top 90%",
            toggleActions: "play pause pause pause",
            //end: "bottom 90%",
          },
        })
        .from(container.current.querySelector(".card-1"), {
          x: -100,
          opacity: 0,
          //rotate: -20,
        })
        .from(container.current.querySelector(".card-2"), {
          x: -100,
          opacity: 0,
          //rotate: 20,
        })
        .from(container.current.querySelector(".card-3"), {
          y: -100,
          opacity: 0,
          //rotate: -10,
          //y: 10,
        });

      function counterAnim(id: string, value: number) {
        if (!container?.current) return;

        gsap.to(container.current.querySelector(id), {
          innerText: value,
          duration: 1.5,
          snap: {
            innerText: value > 200 ? 10 : 1,
          },
          scrollTrigger: {
            trigger: container.current.querySelector(id),
            start: "top 85%",
            toggleActions: "play pause pause pause",
          },
        });
      }
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="about-us"
      className="min-h-lvh flex flex-col p-4 bg-black text-white pt-32"
    >
      <div className="flex flex-col md:flex-row justify-between mb-20">
        <h2 className="text-4xl font-bold text-nowrap">Sobre nós</h2>
        <p className="max-w-md"></p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 flex-1 pb-4">
        <div className="p-8 card-1 md:col-span-2 md:row-span-2 group flex flex-col justify-center rounded-xl transform-gpu bg-gradient-to-br from-zinc-950 via-black to-zinc-900 [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] min-h-64">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              A elevate
            </h1>
            <p className="text-lg leading-relaxed text-gray-200 space-y-4">
              <span className="block">
                Nascemos em 2024 com um propósito muito claro: <span className="font-bold text-white">transformar cada
                projeto em arte e cada entrega em resultado de verdade</span>.
              </span>
              <span className="block">
                Desde o começo, acreditamos que as melhores conexões nascem da confiança, do
                cuidado e da dedicação em cada detalhe. Nós somos movidos por
                histórias, por pessoas e pela vontade de criar experiências que
                emocionam, unindo estratégia, sensibilidade e criatividade para
                fortalecer marcas e aproximar pessoas.
              </span>
              <span className="block">
                Aqui, cada ideia ganha vida com técnica, propósito e sentimento. Nós transformamos visões em
                histórias e histórias em conquistas. Mais do que uma agência, somos
                um estúdio de criação criativa que entrega presença, resultado e emoção em
                tudo o que faz.
              </span>
            </p>
          </div>
        </div>
        <div className="card-2 md:col-start-3 md:row-start-1 rounded-xl p-6 flex flex-col transform-gpu bg-gradient-to-br from-zinc-950 via-black to-zinc-900 [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] min-h-64 items-center justify-center">
          <div className="w-full">
            <h1 className="pb-6 text-start w-full text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Nossos valores</h1>
            <div className="flex flex-col flex-1 w-full leading-8 space-y-3">
              <span className="flex items-center gap-3 text-gray-200">
                <span className="h-2 w-2 rounded-full bg-gray-500"></span>
                <span>Criatividade em Primeiro Lugar</span>
              </span>
              <span className="flex items-center gap-3 text-gray-200">
                <span className="h-2 w-2 rounded-full bg-gray-500"></span>
                <span>Entrega Além do Combinado</span>
              </span>
              <span className="flex items-center gap-3 text-gray-200">
                <span className="h-2 w-2 rounded-full bg-gray-500"></span>
                <span>Comunicação Clara e Transparente</span>
              </span>
              <span className="flex items-center gap-3 text-gray-200">
                <span className="h-2 w-2 rounded-full bg-gray-500"></span>
                <span>Dedicação Minuciosa</span>
              </span>
              <span className="flex items-center gap-3 text-gray-200">
                <span className="h-2 w-2 rounded-full bg-gray-500"></span>
                <span>Trabalho com Carinho</span>
              </span>
            </div>
          </div>
        </div>
        <div className="card-3 md:col-start-3 md:row-start-2 overflow-hidden rounded-xl transform-gpu bg-black [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] min-h-64 relative">
          <Image
            src="https://res.cloudinary.com/dn454izoh/image/upload/v1755006181/us_agf6k4.png"
            alt="us"
            fill
            className="object-cover rounded-xl hover:scale-95 hover:transition hover:rotate-1"
          />
        </div>
      </div>
      <div className="px-8 pt-8 rounded-xl transform-gpu bg-black [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
        <div>
          <h2 className="text-2xl font-bold text-nowrap">
            Nossas conquistas e números
          </h2>
          <p className="max-w-xl text-[#ababab] opacity-70">
          Transformamos estratégia, criatividade e propósito em resultados que fortalecem marcas e geram conexões reais.
          </p>
        </div>
        <div className="flex flex-row flex-wrap gap-4 justify-evenly py-8">
          <div className="flex items-center flex-col gap-2">
            <p className="text-sm text-[#ababab] opacity-70">
              Clientes Atendidos
            </p>
            <div className="flex text-2xl font-bold text-nowrap">
              <p>+</p>
              <h3 id="businessCounter">0</h3>
            </div>
          </div>
          <div className="flex items-center flex-col gap-2 grow-0">
            <p className="text-sm text-[#ababab] opacity-70">
              Projetos Concluídos
            </p>
            <div className="flex text-2xl font-bold text-nowrap">
              <p>+</p>
              <h3 id="projectsCounter">0</h3>
            </div>
          </div>
          <div className="flex items-center flex-col gap-2 grow-0">
            <p className="text-sm text-[#ababab] opacity-70">
              Eventos Atendidos
            </p>
            <div className="flex text-2xl font-bold text-nowrap">
              <h3 id="clientsApprovalCounter">0</h3>
            </div>
          </div>
          <div className="flex items-center flex-col gap-2 grow-0">
            <p className="text-sm text-[#ababab] opacity-70">
              Cidades Atendidas
            </p>
            <div className="flex text-2xl font-bold text-nowrap">
              <p>+</p>
              <h3 id="otherCounter">0</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
