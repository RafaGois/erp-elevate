"use client";

import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import { SplitText } from "gsap/SplitText";
import { gsap } from "gsap";
import { ImageTrail } from "@/components/ui/image-trail";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const services = [
  {
    id: 1,
    name: "INSTITUCIONAL",
    description: "Descrição do serviço 1",
    route: "institutional",
  },
  {
    id: 2,
    name: "ESPORTE",
    route: "sport",
  },
  {
    id: 3,
    name: "GASTRONOMIA",
    route: "food",
  },
  {
    id: 4,
    name: "CASAMENTOS",
    route: "wedding",
  },
  {
    id: 5,
    name: "EVENTOS",
    route: "event",
  },
  {
    id: 7,
    name: "Retratos",
    route: "programming",
  },
  {
    id: 8,
    name: "Programação",
    route: "programming",
  },
];

export default function Services() {
  const container = useRef<HTMLDivElement | null>(null);

  const images = [
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d",
  ].map((url) => `${url}?auto=format&fit=crop&w=300&q=80`);

  useGSAP(
    () => {
      if (!container.current) return;

      gsap.registerPlugin(SplitText);

      const servicesElements = container.current?.querySelectorAll("#service");

      servicesElements?.forEach((serviceElement) => {
        const title = serviceElement.querySelector("#title");
        const barra = serviceElement.querySelector(".barra");
        const arrow = serviceElement.querySelector(".arrow");

        gsap.set(title, { opacity: 0 });
        //gsap.set(title, { opacity: 0.5 });

        gsap.to(title, {
          opacity: 0.5,
          scrollTrigger: {
            trigger: title,
            start: "top 85%",
            toggleActions: "play pause pause pause",
          },
        });

        function hoverAnim() {
          return gsap
            .timeline({ paused: true })
            .to(title, {
              opacity: 1,
              fontWeight: 900,
              letterSpacing: 5,
              duration: 0.3,
            })
            .to(barra, {
              width: "100%",
              ease: "power4.out",
            })
            .to(
              arrow,
              {
                opacity: 1,
              },
              "0.4"
            );
        }

        serviceElement.addEventListener("mouseenter", () => hoverAnim().play());

        function hoverExit() {
          return gsap
            .timeline({ paused: true })
            .to(title, {
              opacity: 0.5,
              fontWeight: 300,
              letterSpacing: 1,
              duration: 0.4,
            })
            .to(barra, {
              width: "0%",
            })
            .to(arrow, {
              opacity: 0,
            });
        }

        serviceElement.addEventListener("mouseleave", () => hoverExit().play());
      });
    },
    { scope: container }
  );

  function renderServices() {
    return services.map((service, i) => (
      <Link
        href={"/galery/" + service.route}
        id="service"
        key={service.id + "-" + i}
        className="flex items-end "
      >
        <div>
          <h2
            id="title"
            className={`text-center text-4xl  text-[#dadada] cursor-pointer select-none uppercase `}
          >
            {service.name}
          </h2>
          <div className="barra h-[1px] w-min bg-white"></div>
        </div>
        <ArrowUpRight size={30} className="text-white arrow opacity-0" />
      </Link>
    ));
  }

  return (
    <div
      id="services"
      ref={container}
      className="flex flex-col items-center justify-center p-4 min-h-svh bg-[radial-gradient(80%_60%_at_50%_50%,rgba(255,255,255,0.12)_0%,rgba(0,0,0,0)_60%),linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,1))] relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 z-0"></div>
      <div className="absolute inset-0 z-10">
        <ImageTrail containerRef={container}>
          {images.map((url, index) => (
            <div
              key={index}
              className="flex relative overflow-hidden w-24 h-24 rounded-lg"
            >
              <Image
                src={url}
                alt={`Trail image ${index + 1}`}
                className="object-cover absolute inset-0 hover:scale-110 transition-transform"
              />
            </div>
          ))}
        </ImageTrail>
      </div>
      <div className="w-full z-20 relative text-white">
        <h2 className="text-4xl font-bold text-left">Serviços</h2>
        <p className="text-left">blablabla</p>
      </div>
      <div className="flex flex-1 flex-col gap-4 justify-center min-h-svh z-20 relative">
        {renderServices()}
      </div>
    </div>
  );
}
