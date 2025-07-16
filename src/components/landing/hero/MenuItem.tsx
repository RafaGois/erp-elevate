import Link from "next/link";
import { gsap } from "gsap";

export default function MenuItem(props: {
  link: { href: string; label: string };
  toggleMenu: () => void;
}) {
  function handleMouseEnter(e: React.MouseEvent<HTMLDivElement>) {
    const tl = gsap.timeline();

    tl.to(e.currentTarget.querySelector(".menu-link"), {
      color: "#bdfa3c",
      scale: 1.1,
      duration: 0.5,
    }).to(
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
    }).to(
      e.currentTarget.querySelector(".dot"),
      {
        width: 0,
        height: 0,
      },
      "<"
    );
  }

  return (
    <div key={props.link.href} className="menu-item-link-item">
      <div
        key={props.link.href}
        className="menu-item-link-item-holder"
        onClick={props.toggleMenu}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          className="menu-link  text-5xl font-bold"
          key={props.link.href}
          href={props.link.href}
        >
          {props.link.label}
        </Link>
        <div className="dot"></div>
      </div>
    </div>
  );
}
