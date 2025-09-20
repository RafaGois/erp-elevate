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
            trigger: container.current.querySelector(".card-3"),
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
        <p className="max-w-md">
         
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 flex-1 pb-4">
        <div className="p-4 card-1 md:col-span-2 md:row-span-2 group relative flex flex-col justify-center overflow-hidden rounded-xl transform-gpu bg-black [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] min-h-64">
          <h1 className="text-4xl">A elevate</h1>
          <p>
            Nascemos em 2019 com um propósito claro: entregar sempre mais do que
            o combinado. Desde então, crescemos lado a lado com nossos clientes,
            construindo relações sólidas baseadas em confiança, dedicação e
            resultados. <br />
            Somos especialistas em estratégia de social media, cobertura de
            eventos, desenvolvimento de sistemas e digitalização de empresas,
            oferecendo soluções completas para fortalecer a presença digital e
            impulsionar negócios. <br />
            Nosso diferencial está no cuidado em cada detalhe, unindo técnica,
            criatividade e inovação para transformar ideias em resultados reais.
          </p>
        </div>
        <div className="card-2 md:col-start-3 md:row-start-1 overflow-hidden rounded-xl p-4 flex flex-col transform-gpu bg-black [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] min-h-64 items-center justify-center">
          <h1 className="pb-4 text-start w-full text-4xl">Nossos valores</h1>
          <p className="flex flex-col flex-1 w-full leading-8">
            <span className="flex items-center gap-2">
              <Sparkle fill="#fff" size={18} /> Criatividade em Primeiro Lugar{" "}
              <br />
            </span>
            <span className="flex items-center gap-2">
              <Sparkle fill="#fff" size={18} /> Entrega Além do Combinado <br />
            </span>
            <span className="flex items-center gap-2">
              <Sparkle fill="#fff" size={18} /> Comunicação Clara e Transparente{" "}
              <br />
            </span>
            <span className="flex items-center gap-2">
              <Sparkle fill="#fff" size={18} /> Dedicação Minuciosa <br />
            </span>
            <span className="flex items-center gap-2">
              <Sparkle fill="#fff" size={18} /> Trabalho com Carinho <br />
            </span>
          </p>
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
          <p className="max-w-md text-[#ababab] opacity-70">
            Fornecendo às empresas ferramentas eficazes para melhorar os fluxos
            de trabalho
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
