"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import type { ProjetoBlockData } from "@/lib/types/budget-content";
import EditableField from "./EditableField";

interface Props {
  data: ProjetoBlockData;
  isAdmin?: boolean;
  onChange?: (d: ProjetoBlockData) => void;
}

export default function ProjetoBlock({ data, isAdmin = false, onChange }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  function set<K extends keyof ProjetoBlockData>(key: K, value: ProjetoBlockData[K]) {
    onChange?.({ ...data, [key]: value });
  }

  useGSAP(
    () => {
      if (!container.current || !contentRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      gsap.set(contentRef.current.querySelectorAll("[data-projeto-item]"), {
        opacity: 0,
        y: 24,
      });
      gsap.to(contentRef.current.querySelectorAll("[data-projeto-item]"), {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: container }
  );

  const objetivos = data.objetivos ?? [];

  return (
    <section
      id="projeto"
      ref={container}
      className="proposal-section bg-white flex flex-col items-center justify-center min-h-[60vh]"
    >
      <div className="proposal-container w-full">
        <div ref={contentRef} className="max-w-4xl mx-auto text-center">
          <h2
            data-projeto-item
            className="text-3xl font-bold text-black md:text-4xl lg:text-5xl"
          >
            <EditableField
              value={data.titulo ?? "O projeto"}
              onChange={(v) => set("titulo", v)}
              isAdmin={isAdmin}
              multiline
              className="block"
            />
          </h2>
          <p data-projeto-item className="mt-4 text-lg text-[#7D6B58]">
            <EditableField
              value={data.descricao}
              onChange={(v) => set("descricao", v)}
              isAdmin={isAdmin}
              multiline
              tag="span"
              className="inline"
            />
          </p>

          {objetivos.length > 0 && (
            <div
              data-projeto-item
              className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 text-left"
            >
              {objetivos.map((obj, i) => (
                <div
                  key={i}
                  className="flex gap-4 rounded-xl border border-black/10 bg-black/[0.02] p-5 transition-colors hover:border-black/15 md:p-6"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-black/10 bg-[#bdfa3c]/20 text-sm font-bold text-black">
                    {i + 1}
                  </span>
                  <p className="text-black/80">{obj}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
