"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import type { SobreEmpresaBlockData } from "@/lib/types/budget-content";
import EditableField from "./EditableField";

const cardStyle =
  "rounded-xl border border-black/10 bg-gradient-to-br from-white via-zinc-50/50 to-zinc-100/80 [box-shadow:0_-20px_80px_-20px_rgba(0,0,0,0.03)_inset]";

interface Props {
  data: SobreEmpresaBlockData;
  isAdmin?: boolean;
  onChange?: (d: SobreEmpresaBlockData) => void;
}

export default function SobreEmpresaBlock({ data, isAdmin = false, onChange }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  function set<K extends keyof SobreEmpresaBlockData>(key: K, value: SobreEmpresaBlockData[K]) {
    onChange?.({ ...data, [key]: value });
  }

  useGSAP(
    () => {
      if (!container.current || !card1Ref.current || !card2Ref.current) return;
      gsap.registerPlugin(ScrollTrigger);
      gsap.set([card1Ref.current, card2Ref.current], { opacity: 0, y: 40 });

      const tl = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
      tl.to(card1Ref.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }).to(
        card2Ref.current,
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.35"
      );
    },
    { scope: container }
  );

  const diferenciais = data.diferenciais ?? data.destaques ?? [];

  return (
    <section
      ref={container}
      id="sobre"
      className="proposal-section bg-white"
    >
      <div className="proposal-container">
        <header className="mb-12 md:mb-16">
          <h2 className="text-4xl font-bold text-black md:text-5xl">
            <EditableField
              value={data.titulo ?? "Quem somos"}
              onChange={(v) => set("titulo", v)}
              isAdmin={isAdmin}
              className="block"
            />
          </h2>
          <p className="mt-2 max-w-xl text-[#7D6B58] text-lg">
            Conheça quem está por trás desta proposta.
          </p>
        </header>

        <div ref={cardsRef} className="grid grid-cols-1 gap-6 lg:grid-cols-12 mb-16">
          <div
            ref={card1Ref}
            className={`p-6 md:p-8 lg:col-span-7 min-h-[240px] flex flex-col justify-center ${cardStyle}`}
          >
            <div className="text-lg leading-relaxed text-black/80 space-y-4 max-w-2xl">
              <EditableField
                value={data.descricao ?? "Somos uma equipe especializada em transformar ideias em experiências digitais memoráveis."}
                onChange={(v) => set("descricao", v)}
                isAdmin={isAdmin}
                multiline
                tag="p"
                className="block"
              />
            </div>
          </div>
          <div
            ref={card2Ref}
            className={`lg:col-span-5 rounded-xl p-6 md:p-8 min-h-[240px] flex flex-col justify-center ${cardStyle}`}
          >
            <h3 className="text-2xl font-bold text-black mb-6">Nossos diferenciais</h3>
            <ul className="flex flex-col gap-3 text-black/70">
              {diferenciais.length > 0 ? (
                diferenciais.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[#bdfa3c]" />
                    <span>{item}</span>
                  </li>
                ))
              ) : (
                <li className="flex items-center gap-3 text-black/50">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-black/20" />
                  <span>Adicione diferenciais no painel admin</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
