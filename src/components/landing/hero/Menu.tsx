import { Button } from "@/components/ui/button";
import { ArrowUpRight, MenuIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import MenuItem from "./MenuItem";

const menuLinks = [
  {
    label: "Sobre nós",
    href: "#about",
  },
  {
    label: "Trabalhos",
    href: "#works",
  },
  {
    label: "Clientes",
    href: "#clients",
  },
  {
    label: "Contato",
    href: "#contact",
  },
];

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const container = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      gsap.set(".menu-item-link-item-holder", { xPercent: 100, opacity: 0 });

      tl.current = gsap
        .timeline({ paused: true })
        .to(".menu-overlay", {
          display: "flex",
          duration: 0.7,
          clipPath: "polygon(0% 100%, 0% 0%, 100% 100%, 0% 100%)",
          ease: "power4.inOut",
        })
        .to(".menu-overlay", {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power4.inOut",
        })
        .to(
          ".menu-item-link-item-holder",
          {
            xPercent: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power4.inOut",
            delay: -0.75,
            opacity: 1,
          },
          "+=0.1"
        );
    },
    { scope: container }
  );

  useEffect(() => {
    if (isOpen) {
      tl.current?.play();
    } else {
      tl.current?.reverse();
    }
  }, [isOpen]);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  function handleMouseEnter(e: React.MouseEvent<HTMLAnchorElement>) {
    gsap.to(e.target, {
      scale: 1.1,
      duration: 0.5,
      ease: "power4.inOut",
    });
  }

  return (
    <div ref={container} className="justify-between flex w-full">
      <div>logo</div>
      <div className="flex-row gap-[2rem] hidden sm:flex">
        <a onMouseEnter={handleMouseEnter} onMouseLeave={() => null} href="">
          Sobre nós
        </a>
        <a href="">Trabalhos</a>
        <a href="">Clinetes</a>
        <a href="#contact">Contato</a>
      </div>
      <Button variant="outline" className="hidden sm:flex">
        <Link href="/auth">Entrar</Link>
      </Button>
      <div className="flex sm:hidden w-full justify-end">
        <MenuIcon className="cursor-pointer" onClick={toggleMenu} />
      </div>
      <div
        className={`hidden menu-overlay fixed top-0 left-0 w-lvw h-lvh /bg-[#bdfa3c] bg-black z-50 flex-col items-center justify-center p-4`}
      >
        <div className="flex w-full justify-between">
          <p>ELEVATE PRO MEDIA</p>
          <div>
            <p
              className="text-white text-sm uppercase cursor-pointer underline"
              onClick={toggleMenu}
            >
              FECHAR
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-4 flex-1">
          {menuLinks.map((link) => (
            <MenuItem key={link.href} link={link} toggleMenu={toggleMenu} />
          ))}
        </div>
        <div className="flex flex-col gap-4 w-full">
          <a className="flex items-center gap-1" href="INSTAGRAM">
            INSTAGRAM
            <ArrowUpRight size={14} />
          </a>
          <a className="flex items-center gap-1" href="LINKEDIN">
            LINKEDIN
            <ArrowUpRight size={14} />
          </a>
          <a className="flex items-center gap-1" href="DRIBBLE">
            DRIBBLE
            <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="flex w-full justify-end">
          <Link href="/auth">
            <p className="text-white text-sm uppercase cursor-pointer underline">
              Entrar
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
