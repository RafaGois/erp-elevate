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
            markers: true,
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
        <div className="p-8 card-1 md:col-span-2 md:row-span-2 group relative flex flex-col justify-center overflow-hidden rounded-xl transform-gpu bg-black [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] min-h-64">
          {/* Céu noturno com estrelas */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Gradiente de céu noturno */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-indigo-900/10 to-black/30"></div>
            
            {/* Estrelas pequenas fixas */}
            <div className="absolute top-8 left-12 w-1 h-1 bg-white rounded-full animate-pulse"></div>
            <div className="absolute top-16 right-20 w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute top-24 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-32 right-1/4 w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
            <div className="absolute top-40 left-16 w-1 h-1 bg-white rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-48 right-12 w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{animationDelay: '0.8s'}}></div>
            <div className="absolute top-56 left-1/2 w-1 h-1 bg-white rounded-full animate-pulse" style={{animationDelay: '1.2s'}}></div>
            <div className="absolute top-64 right-1/3 w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{animationDelay: '1.8s'}}></div>
            <div className="absolute top-72 left-20 w-1 h-1 bg-white rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
            <div className="absolute top-80 right-16 w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{animationDelay: '1.7s'}}></div>
            
            {/* Estrelas cadentes */}
            <div className="absolute top-12 left-1/4 w-20 h-px bg-gradient-to-r from-white via-blue-200 to-transparent transform -rotate-12 animate-ping" style={{animationDelay: '3s', animationDuration: '2s'}}></div>
            <div className="absolute top-28 right-1/3 w-16 h-px bg-gradient-to-r from-white via-purple-200 to-transparent transform rotate-12 animate-ping" style={{animationDelay: '6s', animationDuration: '1.5s'}}></div>
            <div className="absolute top-44 left-1/2 w-24 h-px bg-gradient-to-r from-white via-cyan-200 to-transparent transform -rotate-6 animate-ping" style={{animationDelay: '9s', animationDuration: '2.5s'}}></div>
            <div className="absolute top-60 right-1/4 w-18 h-px bg-gradient-to-r from-white via-pink-200 to-transparent transform rotate-8 animate-ping" style={{animationDelay: '12s', animationDuration: '1.8s'}}></div>
            
            {/* Estrelas maiores e mais brilhantes */}
            <div className="absolute top-20 right-8 w-2 h-2 bg-white rounded-full animate-pulse shadow-lg shadow-white/50" style={{animationDelay: '2.5s'}}></div>
            <div className="absolute top-36 left-8 w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-lg shadow-white/50" style={{animationDelay: '4s'}}></div>
            <div className="absolute top-52 right-1/2 w-2 h-2 bg-white rounded-full animate-pulse shadow-lg shadow-white/50" style={{animationDelay: '5.5s'}}></div>
            
            {/* Nebulosa sutil */}
            <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-purple-500/5 to-blue-500/5 blur-xl animate-pulse" style={{animationDelay: '7s'}}></div>
            <div className="absolute bottom-1/3 left-1/3 w-24 h-24 rounded-full bg-gradient-to-r from-pink-500/5 to-indigo-500/5 blur-xl animate-pulse" style={{animationDelay: '10s'}}></div>
          </div>
          
          {/* Conteúdo principal */}
          <div className="relative z-10 max-w-2xl">
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
        <div className="card-2 md:col-start-3 md:row-start-1 overflow-hidden rounded-xl p-6 flex flex-col transform-gpu bg-black [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] min-h-64 items-center justify-center relative">
          {/* Céu noturno com estrelas */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Gradiente de céu noturno */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-indigo-900/10 to-black/30"></div>
            
            {/* Estrelas pequenas fixas */}
            <div className="absolute top-6 left-8 w-1 h-1 bg-white rounded-full animate-pulse"></div>
            <div className="absolute top-12 right-12 w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{animationDelay: '0.7s'}}></div>
            <div className="absolute top-18 left-1/2 w-1 h-1 bg-white rounded-full animate-pulse" style={{animationDelay: '1.3s'}}></div>
            <div className="absolute top-24 right-1/3 w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{animationDelay: '0.9s'}}></div>
            <div className="absolute top-30 left-12 w-1 h-1 bg-white rounded-full animate-pulse" style={{animationDelay: '1.8s'}}></div>
            <div className="absolute top-36 right-8 w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{animationDelay: '1.1s'}}></div>
            <div className="absolute top-42 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            <div className="absolute top-48 right-1/4 w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{animationDelay: '1.6s'}}></div>
            
            {/* Estrelas cadentes */}
            <div className="absolute top-8 left-1/3 w-16 h-px bg-gradient-to-r from-white via-blue-200 to-transparent transform -rotate-8 animate-ping" style={{animationDelay: '4s', animationDuration: '1.8s'}}></div>
            <div className="absolute top-20 right-1/4 w-12 h-px bg-gradient-to-r from-white via-purple-200 to-transparent transform rotate-10 animate-ping" style={{animationDelay: '8s', animationDuration: '1.2s'}}></div>
            <div className="absolute top-32 left-1/4 w-14 h-px bg-gradient-to-r from-white via-cyan-200 to-transparent transform -rotate-5 animate-ping" style={{animationDelay: '12s', animationDuration: '2s'}}></div>
            
            {/* Estrelas maiores e mais brilhantes */}
            <div className="absolute top-14 right-6 w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-lg shadow-white/50" style={{animationDelay: '3s'}}></div>
            <div className="absolute top-26 left-6 w-2 h-2 bg-white rounded-full animate-pulse shadow-lg shadow-white/50" style={{animationDelay: '5.5s'}}></div>
            <div className="absolute top-38 right-1/2 w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-lg shadow-white/50" style={{animationDelay: '7.2s'}}></div>
            
            {/* Nebulosa sutil */}
            <div className="absolute top-1/4 right-1/3 w-20 h-20 rounded-full bg-gradient-to-r from-purple-500/5 to-blue-500/5 blur-xl animate-pulse" style={{animationDelay: '9s'}}></div>
            <div className="absolute bottom-1/4 left-1/4 w-16 h-16 rounded-full bg-gradient-to-r from-pink-500/5 to-indigo-500/5 blur-xl animate-pulse" style={{animationDelay: '11s'}}></div>
          </div>
          
          {/* Conteúdo principal */}
          <div className="relative z-10 w-full">
            <h1 className="pb-6 text-start w-full text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Nossos valores</h1>
            <div className="flex flex-col flex-1 w-full leading-8 space-y-3">
              <span className="flex items-center gap-3 text-gray-200">
                <Sparkle fill="#fff" size={18} className="text-blue-300" /> 
                <span>Criatividade em Primeiro Lugar</span>
              </span>
              <span className="flex items-center gap-3 text-gray-200">
                <Sparkle fill="#fff" size={18} className="text-purple-300" /> 
                <span>Entrega Além do Combinado</span>
              </span>
              <span className="flex items-center gap-3 text-gray-200">
                <Sparkle fill="#fff" size={18} className="text-cyan-300" /> 
                <span>Comunicação Clara e Transparente</span>
              </span>
              <span className="flex items-center gap-3 text-gray-200">
                <Sparkle fill="#fff" size={18} className="text-pink-300" /> 
                <span>Dedicação Minuciosa</span>
              </span>
              <span className="flex items-center gap-3 text-gray-200">
                <Sparkle fill="#fff" size={18} className="text-orange-300" /> 
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
