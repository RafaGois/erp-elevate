"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import type { CtaBlockData } from "@/lib/types/budget-content";
import EditableField from "./EditableField";

interface Props {
  data: CtaBlockData;
  isAdmin?: boolean;
  onChange?: (d: CtaBlockData) => void;
}

export default function CtaBlock({ data, isAdmin = false, onChange }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  function set<K extends keyof CtaBlockData>(key: K, value: CtaBlockData[K]) {
    onChange?.({ ...data, [key]: value });
  }

  useGSAP(
    () => {
      if (!container.current || !contentRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      gsap.set(contentRef.current, { opacity: 0, y: 32 });
      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
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

  const ctaHref =
    data.botaoUrl ??
    (data.whatsapp
      ? `https://wa.me/${data.whatsapp.replace(/\D/g, "")}`
      : data.email
        ? `mailto:${data.email}`
        : "#");

  return (
    <section
      id="contato"
      ref={container}
      className="proposal-section bg-white flex flex-col items-center justify-center min-h-[70vh]"
    >
      <div ref={contentRef} className="proposal-container text-center max-w-3xl">
        <h2 className="text-4xl font-bold text-black md:text-5xl lg:text-6xl">
          <EditableField
            value={data.titulo}
            onChange={(v) => set("titulo", v)}
            isAdmin={isAdmin}
            multiline
            className="block"
          />
        </h2>
        <p className="mt-4 text-lg text-[#7D6B58]">
          <EditableField
            value={data.subtitulo ?? ""}
            onChange={(v) => set("subtitulo", v)}
            isAdmin={isAdmin}
            multiline
            tag="span"
            className="inline"
          />
        </p>

        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-black px-8 py-4 font-mono text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-black/90 hover:border-black/20"
        >
          {data.botaoTexto ?? "Aceitar proposta"}
          <ArrowUpRight className="h-4 w-4" />
        </a>

        {(data.email || data.whatsapp) && (
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-black/50">
            {data.email && (
              <a href={`mailto:${data.email}`} className="hover:text-black transition-colors">
                {data.email}
              </a>
            )}
            {data.whatsapp && (
              <a href={ctaHref} className="hover:text-black transition-colors">
                WhatsApp
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
