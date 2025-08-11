"use client";

import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import { SplitText } from "gsap/SplitText";
import { gsap } from "gsap";

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
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      gsap.registerPlugin(SplitText);

      gsap.set(".wrapper", { autoAlpha: 1 });

      const servicesElements = container.current?.querySelectorAll("#service");

      servicesElements?.forEach((serviceElement) => {
        const title = serviceElement.querySelector("#title");
        const description = serviceElement.querySelector("#description");

        //gsap.set(description, { opacity: 0 });
        gsap.set(title, { opacity: 0.5 });

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
          className={` text-3xl text-[#dadada] cursor-pointer select-none uppercase`}
        >
          {service.name}
        </h2>
        <blockquote className="wrapper">
          <small id="description">
            {service.description}
          </small>
        </blockquote>
      </div>
    ));
  }

  return (
    <div
      ref={container}
      className="flex flex-col items-center justify-center p-4 min-h-svh"
    >
      <div className="w-full">
        <h2 className="text-4xl font-bold text-left">Serviços</h2>
        <p className="text-left">blablabla</p>
      </div>
      <div className="flex flex-1 flex-col gap-4 justify-center min-h-svh">
        {renderServices()}
      </div>
    </div>
  );
}
