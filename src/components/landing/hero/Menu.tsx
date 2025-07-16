import { Button } from "@/components/ui/button";
import { MenuIcon, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

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
  const tl = useRef(null);

  useGSAP(
    () => {
      gsap.set(".menu-item-link-item-holder", { y: 75 });

      tl.current = gsap
        .timeline({ paused: true })
        .to(".menu-overlay", {
          display: "flex",
          duration: 1.25,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power4.inOut",
        })
        .to(".menu-item-link-item-holder", {
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power4.inOut",
          delay: -0.75,
        });
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

    return (
      <div ref={container} className="justify-between flex w-full">
        <div>logo</div>
        <div className="flex-row gap-[2rem] hidden sm:flex">
          <a href="">Sobre nós</a>
          <a href="">Trabalhos</a>
          <a href="">Clinetes</a>
          <a href="#contact">Contato</a>
        </div>
        <Button variant="outline" className="hidden sm:flex">
          <Link href="/auth">Entrar</Link>
        </Button>
        <div className="flex sm:hidden w-full justify-end">
          <MenuIcon
            className="cursor-pointer"
            onClick={toggleMenu}
          />
        </div>
        <div
          className={`hidden menu-overlay fixed top-0 left-0 w-lvw h-lvh bg-[#bdfa3c] z-50 flex-col items-center justify-center p-4`}
        >
          <div className="flex w-full justify-end">
            <X className="cursor-pointer" onClick={toggleMenu} />
          </div>
          <div className="flex flex-col justify-center gap-4 flex-1">
            {menuLinks.map((link) => (
              <div key={link.href} className="menu-item-link-item">
                <div key={link.href} className="menu-item-link-item-holder" onClick={toggleMenu}>
                  <Link
                    className="menu-link  text-5xl font-bold"
                    key={link.href}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="flex w-full justify-end">
            <Button variant="outline">
              <Link href="/auth">Entrar</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

