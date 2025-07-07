import { Sidebar, SidebarHeader } from "../../ui/sidebar";
import { Calendar, DollarSign, FolderDot, ZapOff } from "lucide-react";

import Content from "./Content";
import Footer from "./Footer";

export default function AppSidebar() {
  const data = [
    {
      title: "Financeiro",
      url: "/Financeiro",
      items: [
        {
          title: "Movimentações",
          icon: DollarSign,
          url: "/movimentations",

          items: [
            {
              title: "Registros",
              url: "/",
            },
            {
              title: "Saidas",
              url: "/Packages",
            },
          ],
        },
      ],
    },
    {
      title: "Projetos",
      url: "/Projects",
      icon: FolderDot,
      items: [
        {
          title: "Projetos",
          icon: Calendar,
          url: "/",
          items: [
            {
              title: "Registros",
              url: "/Registers",
            },
            {
              title: "Saidas",
              url: "/Packages",
            },
          ],
        },
      ],
    },
  ];

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <div className="flex justify-center gap-2">
          <ZapOff /> Controle Elevate
        </div>
      </SidebarHeader>
      <Content items={data} />
      <Footer />
    </Sidebar>
  );
}
