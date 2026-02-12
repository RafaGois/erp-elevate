"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ImageTrail } from "@/components/ui/image-trail";
import { servicesData } from "@/lib/data/services";
import {
  ArrowUpRight,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Terminal,
  Braces,
  Binary,
  Workflow,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";

const cardStyle =
  "rounded-xl border border-white/10 bg-black/60 backdrop-blur-sm [box-shadow:0_-20px_80px_-20px_#ffffff08_inset] hover:border-white/20 hover:bg-black/80 transition-colors duration-300";

const trailIconClass =
  "flex h-24 w-24 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white/70 backdrop-blur-sm";

const trailIcons = [
  Code2,
  Cpu,
  Database,
  GitBranch,
  Terminal,
  Braces,
  Binary,
  Workflow,
  LayoutDashboard,
];

export default function Services() {
  const container = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <div
      id="services"
      ref={container}
      className="relative flex min-h-svh flex-col overflow-hidden bg-[radial-gradient(80%_60%_at_50%_50%,rgba(255,255,255,0.08)_0%,rgba(0,0,0,0)_60%),linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,1))] px-4 py-24 md:px-6 md:py-28"
    >
      <div className="absolute inset-0 z-0">
        <ImageTrail containerRef={container}>
          {trailIcons.map((Icon, index) => (
            <div key={index} className={trailIconClass}>
              <Icon className="h-10 w-10 md:h-12 md:w-12" strokeWidth={1.5} />
            </div>
          ))}
        </ImageTrail>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <header className="mb-12 md:mb-16">
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Serviços
          </h2>
          <p className="mt-2 max-w-xl text-gray-400">
            Desenvolvimento de software, controle de produção, integração e
            automação para a indústria.
          </p>
        </header>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2"
        >
          {servicesData.map((service) => (
            <Link
              key={service.slug}
              href={`/servicos/${service.slug}`}
              data-service-card
              className={`flex flex-col p-6 md:p-8 text-left ${cardStyle}`}
            >
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold text-white md:text-2xl">
                  {service.name}
                </h3>
                <p className="text-sm leading-relaxed text-gray-300 md:text-base">
                  {service.listingDescription}
                </p>
              </div>
              <span className="mt-auto flex items-center gap-2 text-sm font-medium text-[#bdfa3c]">
                Saiba mais
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
