"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { gsap } from "gsap";

export default function ScrollText() {
  const container = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      gsap.registerPlugin(ScrollTrigger);
      gsap.registerPlugin(SplitText);
      gsap.set(container.current.querySelector("p"), { opacity: 0 });

      const texto = container.current.querySelector("h1");

      const splitText = new SplitText(texto, { type: "chars" });
      tl.current = gsap.timeline();

      tl.current.fromTo(
        splitText.chars,
        {
          //color: "#212121",
          opacity: 0.2,
        },
        {
          //color: "#F1F1F1",
          duration: 1,
          stagger: 1,
          opacity: 1,
          scrollTrigger: {
            trigger: texto,
            start: "top 80%",
            end: "top 55%",
            scrub: true,
            markers: true,
            toggleActions: "play play reverse reverse",
          },
          onComplete: () => {
            gsap.to(container.current.querySelector("p"), {
              opacity: 1,
              delay: 0.5,
            });
console.log(container.current.querySelector(".arte-word"));

            container.current.querySelector(".arte-word").classList.add(
                "bg-gradient-to-r",
                "from-slate-200",
                "to-indigo-600",
                "bg-clip-text",
                "text-transparent"
              );
        },
          onUpdate: () => {
            gsap.to(container.current.querySelector("p"), {
              opacity: 0,
            });
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="w-full h-svh md:h-[50svw] bg-black flex flex-col items-center justify-center p-4"
    >
      <div className="">
        <h1 className="text-center text-7xl font-bold text-white">
          Aqui criamos{" "}
          <span className="arte-word">
            ARTE
          </span>
        </h1>
        <p className="text-white text-wrap text-center opacity-0">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi,
          necessitatibus harum!<br /> Asperiores incidunt saepe blanditiis suscipit 
          molestias neque quaerat! Ab suscipit nesciunt dolorum vitae aliquam
          ullam reiciendis <br />odit amet quae.
        </p>
      </div>
    </section>
  );
}
