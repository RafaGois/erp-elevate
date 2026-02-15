import { Sidebar } from "../../ui/sidebar";
import { Briefcase, Calendar, DollarSign, ListChecks, Tag, Warehouse } from "lucide-react";

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
          url: "/dashboard/finances",
          items: [
            {
              title: "Dashboard",
              url: "/",
            },
            {
              title: "Movimentações",
              url: "/movimentations",
            },
            {
              title: "Movimentações Fixas",
              url: "/fixed-movimentations",
            },
            {
              title: "Contas Bancárias",
              url: "/bank-accounts",
            },
            {
              title: "Categorias",
              url: "/categories",
            },
            {
              title: "Tipos",
              url: "/types",
            },

          ],
        },
      ],
    },
    {
      title: "Operacional",
      items: [
        {
          title: "Tarefas",
          icon: ListChecks,
          url: "/dashboard/tasks",
          items: [
            {
              title: "Registros",
              url: "/registers",
            },
            {
              title: "Tipos",
              url: "/types",
            },
            {
              title: "Status",
              url: "/statuses",
            },
            {
              title: "Prioridades",
              url: "/priorities",
            },
          ],
        },
        {
          title: "Projetos",
          icon: Briefcase,
          url: "/dashboard/projects",
          items: [
            {
              title: "Registros",
              url: "/",
            },
            {
              title: "Orçamentos",
              url: "/budgets",
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
          url: "/dashboard",
          items: [
            {
              title: "Registros",
              url: "/equipaments",
            },
            {
              title: "Saídas",
              url: "/exits",
            },
          ],
        },
        {
          title: "Categoria",
          icon: Tag,
          url: "/dashboard",
          items: [
            {
              title: "Categorias",
              url: "/categories",
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
