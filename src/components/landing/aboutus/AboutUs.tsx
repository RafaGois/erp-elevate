"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

export default function AboutUs() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      
      if (!container?.current) return;

      gsap.registerPlugin(ScrollTrigger);

      counterAnim("#businessCounter", 50);
      counterAnim("#projectsCounter", 100);
      counterAnim("#clientsApprovalCounter", 90);
      counterAnim("#otherCounter", 60);

      function counterAnim(id: string, value: number) {
        if (!container?.current) return;

        gsap.to(container.current.querySelector(id), {
          innerText: value,
          duration: 1.5,
          snap: {
            innerText: (value > 200) ? 10 : 1,
          },
          scrollTrigger: {
            trigger: container.current.querySelector(id),
            start: "top 85%",
            markers: true,
          }
        });
      }

      
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="about-us"
      className="min-h-lvh flex flex-col p-4"
    >
      <div className="flex flex-col md:flex-row justify-between mb-20">
        <h2 className="text-4xl font-bold text-nowrap">Sobre nós</h2>
        <p className="max-w-md">
          A Elevate Pro Media é uma empresa de marketing digital que oferece
          soluções inovadoras para empresas que desejam se destacar no mercado.
        </p>
      </div>
      <div className="grid grid-cols-1 grid-rows-4 md:grid-cols-3 md:grid-rows-2 gap-4 flex-1">
        <div className="row-span-2 md:col-span-2 md:row-span-2 rounded">1</div>
        <div className="row-start-3 md:col-start-3 rounded">2</div>
        <div className="row-start-4 md:col-start-3 md:row-start-2 min-h-64 rounded">
          3
        </div>
      </div>
      <div className="bg-[#262626] p-4 rounded-lg">
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
              Empresas Atendidas
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
              <h3
                id="projectsCounter"
              >
                0
              </h3>
            </div>
          </div>
          <div className="flex items-center flex-col gap-2 grow-0">
            <p className="text-sm text-[#ababab] opacity-70">
              Aprovaçao de Clientes
            </p>
            <div className="flex text-2xl font-bold text-nowrap">
              <h3
                id="clientsApprovalCounter"
                >d
                0
              </h3>
                <p>%</p>
            </div>
          </div>
          <div className="flex items-center flex-col gap-2 grow-0">
            <p className="text-sm text-[#ababab] opacity-70">
              Projetos Concluídos
            </p>
            <div className="flex text-2xl font-bold text-nowrap">
              <p>+</p>
              <h3
                id="otherCounter"
              >
                0
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
