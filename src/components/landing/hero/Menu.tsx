import { Button } from "@/components/ui/button";
import { ArrowUpRight, MenuIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import MenuItem from "./MenuItem";
import Image from "next/image";

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
  const initTl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true })
        .to(".menu-start-button", {
          rotate: 90,
          duration: 0.2,
          ease: "power4.inOut",
          x: 60,
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

      initTl.current = gsap
        .timeline()
        .from(".navitem", {
          y: -100,
          delay: 1,
          stagger: {
            from: "start",
            each: 0.5,
            amount: 0.5,
          },
        })
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
    <div ref={container} className="justify-between flex w-full p-4">
      <Image
        src="https://res.cloudinary.com/dn454izoh/image/upload/v1755007271/IMG_0854_zii4ia.png"
        alt="logo"
        height={50}
        width={50}
        className="logo-img"
      />
      <div className="flex-row gap-[2rem] hidden sm:flex">
        <a
          key="sobre-nos"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => null}
          className="navitem"
          href="#about-us"
        >
          Sobre nós
        </a>
        <a className="navitem" key="trabalhos" href="#works">
          Trabalhos
        </a>
        <a className="navitem" key="clientes" href="#clients">
          Clinetes
        </a>
        <a className="navitem" key="contato" href="#contact">
          Contato
        </a>
      </div>
      <div className="login-button">
        <Button
          variant="outline"
          className="flex bg-white text-black "
        >
          <Link href="/auth">Entrar</Link>
        </Button>
      </div>
      <div className="flex md:hidden w-full justify-end items-center">
        <p
          className="menu-start-button text-sm text-white underline cursor-pointer"
          onClick={toggleMenu}
        >
          MENU
        </p>
      </div>
      <div
        className={`hidden menu-overlay fixed top-0 left-0 w-lvw h-lvh bg-[#bdfa3c] /bg-black z-50 flex-col items-center justify-center p-4`}
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
