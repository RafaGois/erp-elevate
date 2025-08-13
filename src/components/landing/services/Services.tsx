"use client";

import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import { SplitText } from "gsap/SplitText";
import { gsap } from "gsap";
import { ImageTrail } from "@/components/ui/image-trail";

const services = [
  {
    id: 1,
    name: "INSTITUCIONAL",
    description: "Descrição do serviço 1",
  },
  {
    id: 2,
    name: "ESPORTE",
    description: "Descrição do serviço 2",
  },
  {
    id: 3,
    name: "GASTRONOMIA",
    description: "Descrição do serviço 3",
  },
  {
    id: 4,
    name: "CASAMENTOS",
    description: "Descrição do serviço 4",
  },
  {
    id: 5,
    name: "EVENTOS",
    description: "Descrição do serviço 5",
  },
  {
    id: 6,
    name: "INAUGURAÇÕES",
    description: "Descrição do serviço 5",
  },
  {
    id: 7,
    name: "Programação",
    description:
      "Desenvolvimento de soluções digitais sob medida para o seu negócio",
  },
];

export default function Services() {
  const container = useRef<HTMLDivElement | null>(null);
  //const tl = useRef<gsap.core.Timeline | null>(null);

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

      gsap.set(".wrapper", { autoAlpha: 1 });

      const servicesElements = container.current?.querySelectorAll("#service");

      servicesElements?.forEach((serviceElement) => {
        const title = serviceElement.querySelector("#title");
        const description = serviceElement.querySelector("#description");

        gsap.set(title, { opacity: 0 });
        //gsap.set(title, { opacity: 0.5 });

        gsap.to(title, {
          opacity: 0.5,
          scrollTrigger: {
            trigger: title,
            start: "top 85%",
            toggleActions: "play reverse reverse reverse",
          },
        });

        const splitWord = new SplitText(description, {
          type: "chars",
          linesClass: "ts-line",
        });

        splitWord.chars.forEach((word) => gsap.set(word, { opacity: 0 }));

        function hoverAnim() {
          return gsap
            .timeline({ paused: true })
            .to(title, {
              opacity: 1,
              fontWeight: 500,
            })
            .fromTo(
              splitWord.chars,
              {
                y: -20,
                opacity: 0,
                stagger: 0.05,
                ease: "power2.out",
              },
              {
                opacity: 1,
                y: 0,
                stagger: {
                  each: 1, //intervalo de 1 segundo entre as animações de forma individual
                  amount: 1, //intervalo de 1 segundo entre as animações de forma de grupo
                  from: "end", //começa as animações no final (start/end/center/edges)
                },
              },
              0
            );
        }

        serviceElement.addEventListener("mouseenter", () => hoverAnim().play());

        function hoverExit() {
          return gsap
            .timeline({ paused: true })
            .to(title, {
              opacity: 0.5,
              //fontWeight: 500,
            })
            .to(
              splitWord.chars,
              {
                opacity: 0,
                //transformOrigin: "top center",
              },
              0
            );
        }

        serviceElement.addEventListener("mouseleave", () => hoverExit().play());
      });
    },
    { scope: container }
  );

  function renderServices() {
    return services.map((service, i) => (
      <div id="service" key={service.id + "-" + i}>
        <h2
          id="title"
          className={`text-center text-4xl tracking-wider text-[#dadada] cursor-pointer select-none uppercase `}
        >
          {service.name}
        </h2>
        <blockquote className="wrapper text-center">
          <small id="description">{service.description}</small>
        </blockquote>
      </div>
    ));
  }

  return (
    <div
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
              <img
                src={url}
                alt={`Trail image ${index + 1}`}
                className="object-cover absolute inset-0 hover:scale-110 transition-transform"
              />
            </div>
          ))}
        </ImageTrail>
      </div>
      <div className="w-full z-20 relative">
        <h2 className="text-4xl font-bold text-left">Serviços</h2>
        <p className="text-left">blablabla</p>
      </div>
      <div className="flex flex-1 flex-col gap-4 justify-center min-h-svh z-20 relative">
        {renderServices()}
      </div>
    </div>
  );
}
