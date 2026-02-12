"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import {
  FileSpreadsheet,
  ClipboardList,
  Search,
  GitBranch,
  Lock,
} from "lucide-react";

const problems = [
  {
    icon: FileSpreadsheet,
    title: "Planilhas desorganizadas",
    description: "Informação espalhada em várias abas e arquivos, sem single source of truth.",
  },
  {
    icon: ClipboardList,
    title: "Controle manual de produção",
    description: "Apontamentos no papel ou em planilhas que atrasam e geram retrabalho.",
  },
  {
    icon: Search,
    title: "Falta de rastreabilidade",
    description: "Dificuldade para saber onde está cada ordem, lote ou decisão tomada.",
  },
  {
    icon: GitBranch,
    title: "Dificuldade de integração entre setores",
    description: "Comercial, PCP, produção e estoque sem falar a mesma língua nem os mesmos dados.",
  },
  {
    icon: Lock,
    title: "Sistemas engessados",
    description: "Ferramentas que não se adaptam ao seu processo ou não conversam entre si.",
  },
];

export default function Problems() {
  const container = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const itemsRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!container.current || !titleRef.current || !itemsRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      gsap.set(titleRef.current, { opacity: 0, y: 24 });
      gsap.set(itemsRef.current.querySelectorAll("[data-problem-item]"), {
        opacity: 0,
        x: -20,
      });

      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      gsap.to(itemsRef.current.querySelectorAll("[data-problem-item]"), {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: itemsRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: container }
  );

  return (
    <section
      id="problemas"
      ref={container}
      className="relative bg-black px-4 py-20 md:px-6 md:py-28"
    >
      <div className="mx-auto max-w-4xl">
        <h2
          ref={titleRef}
          className="text-center text-3xl font-bold text-white md:text-4xl lg:text-5xl"
        >
          Sua indústria ainda depende de planilhas e processos manuais?
        </h2>
        <p className="mt-4 text-center text-lg text-gray-400">
          A indústria metal mecânica sofre com dores que atrasam resultados e
          geram retrabalho. Se alguma delas é familiar, podemos ajudar.
        </p>

        <div
          ref={itemsRef}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6"
        >
          {problems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                data-problem-item
                className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/[0.07] md:p-6"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-[#bdfa3c]">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-400">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
