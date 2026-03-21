"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import type { DepoimentosBlockData } from "@/lib/types/budget-content";
import EditableField from "./EditableField";

const cardStyle =
  "rounded-xl border border-black/10 bg-gradient-to-br from-white to-zinc-50/50 p-6 md:p-8 [box-shadow:0_-20px_80px_-20px_rgba(0,0,0,0.03)_inset]";

interface Props {
  data: DepoimentosBlockData;
  isAdmin?: boolean;
  onChange?: (d: DepoimentosBlockData) => void;
}

export default function DepoimentosBlock({ data, isAdmin = false, onChange }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  function set<K extends keyof DepoimentosBlockData>(key: K, value: DepoimentosBlockData[K]) {
    onChange?.({ ...data, [key]: value });
  }

  useGSAP(
    () => {
      if (!container.current || !cardsRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const cards = cardsRef.current.querySelectorAll("[data-depoimento-card]");
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

  const itens = data.itens ?? [];

  return (
    <section id="depoimentos" ref={container} className="proposal-section bg-white">
      <div className="proposal-container">
        <header className="mb-12 md:mb-16">
          <h2 className="text-4xl font-bold text-black md:text-5xl">
            <EditableField
              value={data.titulo ?? "O que nossos clientes dizem"}
              onChange={(v) => set("titulo", v)}
              isAdmin={isAdmin}
              className="block"
            />
          </h2>
          <p className="mt-2 max-w-xl text-[#7D6B58]">
            Depoimentos de quem já confiou no nosso trabalho.
          </p>
        </header>

        <div ref={cardsRef} className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {itens.map((item, i) => (
            <div key={i} data-depoimento-card className={cardStyle}>
              <span className="text-5xl font-serif leading-none text-[#bdfa3c]/30 select-none">
                "
              </span>
              <p className="mt-2 text-black/80 leading-relaxed">{item.texto}</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-black/5 flex items-center justify-center font-bold text-black/60 text-sm">
                  {item.autor.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-black">{item.autor}</p>
                  {item.cargo && (
                    <p className="text-sm text-[#7D6B58]">{item.cargo}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
