import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

export default function Clients() {

  const container = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current.querySelector(".logo-anacapri"),
            start: "top 95%",
          }
        })
        .from(container.current.querySelectorAll(".logo-anacapri, .logo-thebest, .logo-berto, .logo-record"), {
          scale: 0,
          stagger: 0.2,
          ease: "power1.in"
        });
    },
    { scope: container }
  );

  return (
    <div ref={container} className=" w-full bg-black text-white flex flex-col justify-center items-center">
      <div className="flex justify-center items-center gap-8 flex-wrap p-4">
        <div className="relative w-24 h-16 flex items-center justify-center opacity-70">
          <Image
            src="https://res.cloudinary.com/dn454izoh/image/upload/v1755194592/anacapri_looigo.png"
            alt="logo_anacapri"
            fill
            className="object-contain grayscale logo-anacapri"
          />
        </div>
        <div className="relative w-36 h-18 flex items-center justify-center opacity-70">
          <Image
            src="https://res.cloudinary.com/dn454izoh/image/upload/v1755194592/thebest_by4xvj.webp"
            alt="logo_thebest"
            fill
            className="object-contain grayscale logo-thebest"
          />
        </div>
        <div className="relative w-28 h-24 flex items-center justify-center opacity-70">
          <Image
            src="https://res.cloudinary.com/dn454izoh/image/upload/v1755375444/logoberto_yjra27.avif"
            alt="logo_record"
            fill
            className="object-contain grayscale logo-berto"
          />
        </div>
        <div className="relative w-14 h-16 flex items-center justify-center opacity-70">
          <Image
            src="https://res.cloudinary.com/dn454izoh/image/upload/v1755194592/record_bhncr4.png"
            alt="logo_record"
            fill
            className="object-contain grayscale logo-record"
          />
        </div>
      </div>
    </div>
  );
}
