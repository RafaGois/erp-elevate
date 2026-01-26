import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import MenuItem from "./MenuItem";
import Image from "next/image";

const menuLinks = [
  {
    key: "about-us",
    label: "Sobre nós",
    href: "#about-us",
  },
  {
    key: "services",
    label: "Serviços",
    href: "#services",
  },
  {
    key: "clients",
    label: "Clientes",
    href: "#clients",
  },
  {
    key: "contact",
    label: "Contato",
    href: "#contact",
  },
];

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const container = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const initTl = useRef<gsap.core.Timeline | null>(null);

  // Função para bloquear/desbloquear o scroll
  const toggleScroll = (shouldBlock: boolean) => {
    if (shouldBlock) {
      // Bloquear scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      // Restaurar scroll
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
  };

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
          scale: 0,
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
      toggleScroll(true); // Bloquear scroll quando abrir
    } else {
      tl.current?.reverse();
      toggleScroll(false); // Restaurar scroll quando fechar
    }

    // Cleanup para restaurar scroll quando componente for desmontado
    return () => {
      if (isOpen) {
        toggleScroll(false);
      }
    };
  }, [isOpen]);

  // Cleanup adicional para garantir que o scroll seja restaurado
  useEffect(() => {
    return () => {
      toggleScroll(false);
    };
  }, []);

  //faça com que o box do gráfico de pizza ocupe apenas 1/3 da tela, e o ao seu lado

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  function renderOptions() {
    return menuLinks.map(ml => {
      return (
        <a 
          className="navitem cursor-pointer" 
          key={ml.key}
          href={ml.href}
          onClick={(e) => {
            e.preventDefault();
            const targetElement = document.getElementById(ml.key);
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
        >
          {ml.label}
        </a>
      )
    })
  }

  return (
    <div ref={container} className="flex justify-between w-full p-4 z-50">
      <Image
        src="https://res.cloudinary.com/dn454izoh/image/upload/v1755007271/IMG_0854_zii4ia.png"
        alt="logo"
        height={50}
        width={50}
        className="logo-img"
      />
      <div className="flex-row gap-8 hidden sm:flex">
        {renderOptions()}
      </div>
      <Link href="/auth" className="underline hidden sm:flex">ENTRAR</Link>
      <div className="flex md:hidden w-full justify-end items-center">
        <p
          className="menu-start-button text-sm text-white underline cursor-pointer"
          onClick={toggleMenu}
        >
          MENU
        </p>
      </div>
      <div
        className={`hidden menu-overlay fixed w-full h-svh overflow-hidden top-0 left-0 /bg-[#bdfa3c] bg-black z-[99999] flex-col items-center justify-center p-4`}
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
          <Link
            className="link-menu-item flex items-center gap-1"
            href="https://www.instagram.com/eduardomarketingcraze?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
          >
            INSTAGRAM
            <ArrowUpRight size={14} />
          </Link>
          <Link className="link-menu-item flex items-center gap-1" href="LINKEDIN">
            LINKEDIN
            <ArrowUpRight size={14} />
          </Link>
          <Link className="link-menu-item flex items-center gap-1" href="DRIBBLE">
            DRIBBLE
            <ArrowUpRight size={14} />
          </Link>
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
