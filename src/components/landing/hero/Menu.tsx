import { Button } from "@/components/ui/button";
import { ArrowUpRight, MenuIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import MenuItem from "./MenuItem";

const menuLinks = [
  {
    key: "sobre-nos",
    label: "Sobre nós",
    href: "#about",
  },
  {
    key: "trabalhos",
    label: "Trabalhos",
    href: "#works",
  },
  {
    key: "clientes",
    label: "Clientes",
    href: "#clients",
  },
  {
    key: "contato",
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
      gsap.set(".menu-item-link-item-holder, .menu-close, .enter-menu-button", {
        xPercent: 100,
        opacity: 0,
      });

      gsap.set(".link-menu-item", {
        x: -60,
        opacity: 0,
      });

      gsap.set(".menu-logo", { opacity: 0, xPercent: -100 });

      tl.current = gsap
        .timeline({ paused: true })
        .to(".menu-start-button", {
          rotate: 90,
          duration: 0.2,
          ease: "power4.inOut",
        })
        .to(
          ".menu-start-button",
          {
            opacity: 0,
          },
          "<"
        )
        .to(
          ".menu-overlay",
          {
            display: "flex",
            duration: 0.7,
            clipPath: "polygon(0% 100%, 0% 0%, 100% 100%, 0% 100%)",
            ease: "power4.inOut",
          },
          "<"
        )
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
          "-=0.5"
        )
        .to(
          ".menu-logo, .menu-close, .enter-menu-button",
          {
            opacity: 1,
            xPercent: 0,
            duration: 0.2,
            ease: "expo.inOut",
            stagger: 0.1,
          },
          "+=0.3"
        )
        .to(
          ".link-menu-item",
          {
            x: 0,
            duration: 0.2,
            ease: "expo.inOut",
            stagger: 0.15,
            opacity: 1,
          },
          "<"
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
        <a
          key="sobre-nos"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => null}
          href="#about-us"
        >
          Sobre nós
        </a>
        <a key="trabalhos" href="#works">
          Trabalhos
        </a>
        <a key="clientes" href="#clients">
          Clinetes
        </a>
        <a key="contato" href="#contact">
          Contato
        </a>
      </div>
      <Button variant="outline" className="hidden sm:flex">
        <Link href="/auth">Entrar</Link>
      </Button>
      <div className=" flex sm:hidden w-full justify-end">
        <MenuIcon
          className="menu-start-button cursor-pointer"
          onClick={toggleMenu}
        />
      </div>
      <div
        className={`hidden menu-overlay fixed top-0 left-0 w-lvw h-lvh /bg-[#bdfa3c] bg-black z-50 flex-col items-center justify-center p-4`}
      >
        <div className="flex w-full justify-between">
          <p className="menu-logo">ELEVATE PRO MEDIA</p>
          <div>
            <p
              className="menu-close text-white text-sm uppercase cursor-pointer underline"
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
          <a
            className="link-menu-item flex items-center gap-1"
            href="INSTAGRAM"
          >
            INSTAGRAM
            <ArrowUpRight size={14} />
          </a>
          <a className="link-menu-item flex items-center gap-1" href="LINKEDIN">
            LINKEDIN
            <ArrowUpRight size={14} />
          </a>
          <a className="link-menu-item flex items-center gap-1" href="DRIBBLE">
            DRIBBLE
            <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="enter-menu-button flex w-full justify-end">
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
