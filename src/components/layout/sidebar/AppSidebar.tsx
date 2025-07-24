import { Sidebar } from "../../ui/sidebar";
import { Calendar, DollarSign, Warehouse } from "lucide-react";

import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";

export default function AppSidebar() {
  const data = [
    {
      title: "Financeiro",
      items: [
        {
          title: "Financeiro",
          icon: DollarSign,
          url: "/finances",
          items: [
            {
              title: "Dashboard",
              url: "/dashboard",
            },
            {
              title: "Movimentações",
              url: "/movimentations",
            }
          ],
        },
      ],
    },
    {
      title: "Projetos",
      items: [
        {
          title: "Projetos",
          icon: Calendar,
          url: "/projects",
          items: [
            {
              title: "Registros",
              url: "/registers",
            },
          ],
        },
      ],
    },
    {
      title: "Equipamentos",
      items: [
        {
          title: "Inventário",
          icon: Warehouse,
          url: "/equipaments",
          items: [
            {
              title: "Registros",
              url: "/",
            },
            {
              title: "Saídas",
              url: "/exits",
            },
          ],
        },
      ],
    },
  ];

  return (
    <Sidebar variant="inset" collapsible="offcanvas">
      <Header />
      <Content items={data} />
      <Footer />
    </Sidebar>
  );
}
