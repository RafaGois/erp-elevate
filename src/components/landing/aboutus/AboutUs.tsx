"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

const cardStyle =
  "rounded-xl transform-gpu bg-gradient-to-br from-zinc-950 via-black to-zinc-900 [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]";

export default function AboutUs() {
  const container = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const card1Ref = useRef<HTMLDivElement | null>(null);
  const card2Ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!container.current || !card1Ref.current || !card2Ref.current) return;

      gsap.registerPlugin(ScrollTrigger);

      // Animação de entrada dos cards: visíveis só quando o bloco entra na viewport
      gsap.set([card1Ref.current, card2Ref.current], { opacity: 0, y: 40 });

      const tl = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      tl.to(card1Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      }).to(
        card2Ref.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.35"
      );

      // Contadores
      function counterAnim(id: string, value: number) {
        const el = container.current?.querySelector(id);
        if (!el) return;
        gsap.to(el, {
          innerText: value,
          duration: 1.5,
          snap: { innerText: value > 200 ? 10 : 1 },
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      counterAnim("#businessCounter", 1000);
      counterAnim("#projectsCounter", 100);
      counterAnim("#clientsApprovalCounter", 50);
      counterAnim("#otherCounter", 20);
    },
    { scope: container, dependencies: [] }
  );

  return (
    <section
      ref={container}
      id="about-us"
      className="min-h-screen flex flex-col p-6 md:p-8 bg-black text-white pt-28 pb-16"
    >
      <header className="mb-12 md:mb-16">
        <h2 className="text-4xl md:text-5xl font-bold">Sobre nós</h2>
        <p className="mt-2 max-w-xl text-gray-400 text-lg">
          Conheça a Elevate e o que nos move.
        </p>
      </header>

      <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
        <div
          ref={card1Ref}
          className={`p-6 md:p-8 lg:col-span-7 min-h-[280px] flex flex-col justify-center ${cardStyle}`}
        >
          <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            A elevate
          </h3>
          <div className="text-lg leading-relaxed text-gray-200 space-y-4 max-w-2xl">
            <p>
              Somos uma empresa especializada no desenvolvimento de sistemas sob medida para a indústria metal mecânica. Nosso trabalho nasce da união entre conhecimento técnico em desenvolvimento de software e experiência prática em planejamento, controle de processos e engenharia de automação industrial.
            </p>
            <p>
              Entendemos a realidade do chão de fábrica, os desafios do PCP, a complexidade dos fluxos produtivos e a necessidade de integração entre setores. Mais do que desenvolver aplicações, projetamos soluções que organizam processos, reduzem retrabalho e aumentam a eficiência operacional.
            </p>
            <p>
              Acreditamos que um software industrial deve ser simples, intencional e funcional. Simples para quem opera. Estruturado para quem gerencia. Escalável para quem cresce.
            </p>
          </div>
        </div>
        <div
          ref={card2Ref}
          className={`lg:col-span-5 rounded-xl p-6 md:p-8 min-h-[280px] flex flex-col justify-center ${cardStyle}`}
        >
          <h3 className="text-3xl md:text-4xl font-bold pb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Nossos valores
          </h3>
          <ul className="flex flex-col gap-3 text-gray-200">
            {[
              "Simplicidade com Propósito",
              "Visão de Processo",
              "Eficiência Operacional",
              "Precisão Técnica",
              "Compromisso com Resultado",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="h-2 w-2 shrink-0 rounded-full bg-gray-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={`px-6 md:px-8 py-8 rounded-xl ${cardStyle}`}>
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            Nossas conquistas e números
          </h2>
          <p className="mt-2 max-w-xl text-gray-400">
            Transformamos estratégia, criatividade e propósito em resultados que fortalecem marcas e geram conexões reais.
          </p>
        </div>
        <div className="flex flex-row flex-wrap gap-8 md:gap-12 justify-evenly md:justify-between py-6">
          <div className="flex items-center flex-col gap-2">
            <p className="text-sm text-[#ababab] opacity-70">
              Usuários Impactados
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
              Sistemas Desenvolvidos
            </p>
            <div className="flex text-2xl font-bold text-nowrap">
              <h3 id="clientsApprovalCounter">0</h3>
            </div>
          </div>
          <div className="flex items-center flex-col gap-2 grow-0">
            <p className="text-sm text-[#ababab] opacity-70">
              Cidades com Sistemas
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
