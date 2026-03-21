"use client";

import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import type { GaleriaBlockData } from "@/lib/types/budget-content";
import EditableField from "./EditableField";

interface Props {
  data: GaleriaBlockData;
  isAdmin?: boolean;
  onChange?: (d: GaleriaBlockData) => void;
}

export default function GaleriaBlock({ data, isAdmin = false, onChange }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  function set<K extends keyof GaleriaBlockData>(key: K, value: GaleriaBlockData[K]) {
    onChange?.({ ...data, [key]: value });
  }

  const imagens = data.imagens ?? [];

  useGSAP(
    () => {
      if (!container.current) return;
      gsap.registerPlugin(ScrollTrigger);
      if (headerRef.current) {
        gsap.set(headerRef.current, { opacity: 0, y: 24 });
        gsap.to(headerRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 88%", toggleActions: "play none none none" },
        });
      }
      if (gridRef.current && imagens.length > 0) {
        const items = gridRef.current.querySelectorAll(".gallery-item");
        gsap.set(items, { opacity: 0, y: 20 });
        gsap.to(items, {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 85%", toggleActions: "play none none none" },
        });
      }
    },
    { scope: container, dependencies: [imagens.length] }
  );

  return (
    <section ref={container} className="proposal-section bg-white">
      <div className="proposal-container">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#7D6B58]/70">
            Portfólio
          </span>
          <h2 className="mt-3 text-3xl font-bold text-black md:text-4xl lg:text-5xl">
            <EditableField
              value={data.titulo ?? "Trabalhos selecionados"}
              onChange={(v) => set("titulo", v)}
              isAdmin={isAdmin}
              multiline
              className="block"
            />
          </h2>
        </div>

        {/* Masonry-ish grid */}
        {imagens.length > 0 && (
          <div ref={gridRef} className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {imagens.map((img, i) => (
              <div key={i} className="gallery-item break-inside-avoid group relative overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={img.url}
                    alt={img.legenda ?? `Imagem ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                </div>
                {img.legenda && (
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.15em] text-[#7D6B58]/70 px-4 py-3">
                    {img.legenda}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
