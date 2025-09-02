import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";

export default function MenuItem(props: {
  link: { href: string; label: string, key: string};
  toggleMenu: () => void;
}) {
  function handleMouseEnter(e: React.MouseEvent<HTMLDivElement>) {
    const tl = gsap.timeline();

    tl.to(e.currentTarget.querySelector(".menu-link"), {
      color: "#bdfa3c",
      scale: 1.1,
      duration: 0.5,
      ease: "power4.inOut",
    })
      .to(
        e.currentTarget.querySelector(".arrow-top-menu-item"),
        {
          scale: 1,
          x: 0,
          duration: 0.5,
          ease: "power4.inOut",
        },
        "<"
      )
      .to(
        e.currentTarget.querySelector(".dot"),
        {
          width: "100%",
          height: 4,
          background: "linear-gradient(to right, #d3d61e, #bdfa3c)",
        },
        "<"
      );
  }

  function handleMouseLeave(e: React.MouseEvent<HTMLDivElement>) {
    const tl = gsap.timeline();

    tl.to(e.currentTarget.querySelector(".menu-link"), {
      color: "#dadada",
      scale: 1,
      duration: 0.5,
      ease: "power4.inOut",
    })
      .to(
        e.currentTarget.querySelector(".arrow-top-menu-item"),
        {
          scale: 0,
          x: -10,
          duration: 0.5,
          ease: "power4.inOut",
        },
        "<"
      )
      .to(
        e.currentTarget.querySelector(".dot"),
        {
          width: 0,
          height: 0,
        },
        "<"
      );
  }

  // Fecha o menu e, após a animação, faz o scroll até a seção
  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    props.toggleMenu();

    // Aguarda o menu fechar e o scroll ser desbloqueado
    setTimeout(() => {
      const targetElement = document.getElementById(props.link.key);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Atualiza o hash na URL sem recarregar
        if (typeof window !== 'undefined') {
          window.history.replaceState(null, '', props.link.href);
        }
      }
    }, 600);
  };

  return (
    <div key={props.link.href} className="menu-item-link-item">
      <div
        className="menu-item-link-item-holder"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <a
          className="menu-link text-5xl font-bold flex items-end cursor-pointer"
          key={props.link.key}
          href={props.link.href}
          onClick={handleItemClick}
        >
          {props.link.label}
          <ArrowUpRight
            className="arrow-top-menu-item scale-0 transform -translate-x-10"
            size={28}
          />
        </a>
        <div className="dot"></div>
      </div>
    </div>
  );
}
