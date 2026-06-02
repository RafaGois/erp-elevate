import { ArrowUpRight } from "lucide-react";

type MenuLink = {
  href: string;
  label: string;
  key: string;
};

export default function MenuItem({
  link,
  index,
  onNavigate,
}: {
  link: MenuLink;
  index: number;
  onNavigate: (link: MenuLink) => void;
}) {
  return (
    <a
      href={link.href}
      className="landing-menu__overlay-link"
      style={{ "--menu-i": index } as React.CSSProperties}
      onClick={(e) => {
        e.preventDefault();
        onNavigate(link);
      }}
    >
      <span className="landing-menu__overlay-link-label">{link.label}</span>
      <span className="flex items-center gap-2">
        <span className="landing-menu__overlay-link-index">
          {String(index + 1).padStart(2, "0")}
        </span>
        <ArrowUpRight size={18} aria-hidden />
      </span>
    </a>
  );
}
