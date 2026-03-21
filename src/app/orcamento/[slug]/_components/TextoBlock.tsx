"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import type { TextoBlockData } from "@/lib/types/budget-content";
import EditableField from "./EditableField";

interface Props {
  data: TextoBlockData;
  isAdmin?: boolean;
  onChange?: (d: TextoBlockData) => void;
}

export default function TextoBlock({ data, isAdmin = false, onChange }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  function set<K extends keyof TextoBlockData>(key: K, value: TextoBlockData[K]) {
    onChange?.({ ...data, [key]: value });
  }

  useGSAP(
    () => {
      if (!container.current || !contentRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      gsap.set(contentRef.current, { opacity: 0, y: 24 });
      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: contentRef.current, start: "top 88%", toggleActions: "play none none none" },
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="proposal-section bg-white">
      <div ref={contentRef} className="proposal-container max-w-3xl">
        <div className="space-y-8">
          {data.titulo && (
            <h2 className="text-2xl font-bold text-black md:text-3xl">
              <EditableField
                value={data.titulo}
                onChange={(v) => set("titulo", v)}
                isAdmin={isAdmin}
                multiline
                className="block"
              />
            </h2>
          )}
          <EditableField
            value={data.conteudo}
            onChange={(v) => set("conteudo", v)}
            isAdmin={isAdmin}
            multiline
            tag="p"
            className="text-base text-[#7D6B58] leading-relaxed md:text-lg"
          />
        </div>
      </div>
    </section>
  );
}
