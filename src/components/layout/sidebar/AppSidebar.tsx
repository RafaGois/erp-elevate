import { Sidebar, SidebarHeader } from "@/components/ui/sidebar";
import {
  ArrowBigUpDash,
  Calendar,
  CalendarRange,
  CircleDashed,
  Goal,
  LayoutDashboard,
  MapPin,
  PackageIcon,
  PencilRuler,
  Siren,
  Table2Icon,
  UserCog2,
  ZapOff,
} from "lucide-react";

import Content from "./Content";
import Footer from "./Footer";

export default function AppSidebar() {

    const data = [
      {
        title: "Movimentações",
        icon: Calendar,
        url: "/Movimentations",
        items: [
          {
            title: "Registros",
            url: "/Registers",
            icon: Table2Icon,
          },
          {
            title: "Linha 2",
            url: "/Line2",
            icon: ArrowBigUpDash,
          },
          {
            title: "Descascador",
            url: "/Peeler",
            icon: CircleDashed,
          },
          {
            title: "Pacotes",
            url: "/Packages",
            icon: PackageIcon,
          },
        ],
      },
      {
        title: "Diário",
        url: "/Daily",
        icon: CalendarRange,
        items: [
          {
            title: "Linha 1",
            url: "/Line1",
            icon: ArrowBigUpDash,
          },
        ],
      },
    ];

    return (
      <Sidebar variant="sidebar" collapsible="icon">
        <SidebarHeader>
          <div className="flex justify-center gap-2">
           <ZapOff /> Controle
          </div>
        </SidebarHeader>
        <Content items={data} />
        <Footer />
      </Sidebar>
    );
  }
