"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import type { ServicosBlockData } from "@/lib/types/budget-content";
import EditableField from "./EditableField";

const cardStyle =
  "rounded-xl border border-black/10 bg-white transition-colors duration-300 hover:border-black/15 [box-shadow:0_-20px_80px_-20px_rgba(0,0,0,0.03)_inset] hover:[box-shadow:0_-20px_80px_-20px_rgba(0,0,0,0.05)_inset]";

interface Props {
  data: ServicosBlockData;
  isAdmin?: boolean;
  onChange?: (d: ServicosBlockData) => void;
}

export default function ServicosBlock({ data, isAdmin = false, onChange }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  function set<K extends keyof ServicosBlockData>(key: K, value: ServicosBlockData[K]) {
    onChange?.({ ...data, [key]: value });
  }

  useGSAP(
    () => {
      if (!container.current || !cardsRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const cards = cardsRef.current.querySelectorAll("[data-service-card]");
      gsap.set(cards, { opacity: 0, y: 32 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: container }
  );

  const servicos = data.itens ?? data.servicos ?? [];

  return (
    <section id="servicos" ref={container} className="proposal-section bg-white">
      <div className="proposal-container">
        <header className="mb-12 md:mb-16">
          <h2 className="text-4xl font-bold text-black md:text-5xl">
            <EditableField
              value={data.titulo ?? "O que está incluso"}
              onChange={(v) => set("titulo", v)}
              isAdmin={isAdmin}
              className="block"
            />
          </h2>
          <p className="mt-2 max-w-xl text-[#7D6B58]">
            <EditableField
              value={data.subtitulo ?? "Tudo que sua empresa precisa para uma presença digital sólida."}
              onChange={(v) => set("subtitulo", v)}
              isAdmin={isAdmin}
              tag="span"
              className="inline"
            />
          </p>
        </header>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2"
        >
          {servicos.map((item, i) => (
            <div
              key={i}
              data-service-card
              className={`flex flex-col p-6 md:p-8 text-left ${cardStyle}`}
            >
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold text-black md:text-2xl">
                  {item.titulo ?? item.nome}
                </h3>
                <p className="text-sm leading-relaxed text-black/60 md:text-base">
                  {item.descricao}
                </p>
              </div>
              <span className="mt-auto flex items-center gap-2 text-sm font-medium text-[#bdfa3c] pt-4">
                Incluso
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
