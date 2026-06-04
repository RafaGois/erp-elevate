"use client";

import { useMemo } from "react";
import { Sidebar } from "../../ui/sidebar";
import { Briefcase, DollarSign, ListChecks, Tag, User, Warehouse } from "lucide-react";

import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import useAuth from "@/data/hooks/useAuth";
import { UserLevel } from "@/lib/enums/UserLevel";

export default function AppSidebar() {
  const { user } = useAuth();

  const adminSection = {
    title: "Admin",
    items: [
      {
        title: "Usuários",
        icon: User,
        url: "/dashboard/users",
        items: [
          {
            title: "Usuários",
            url: "/",
          },
        ],
      },
    ],
  };

  const data = useMemo(() => {
    const baseData = [
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

    if (user?.level === UserLevel.ADMIN) {
      baseData.push(adminSection);
    }

    return baseData;
  }, [user?.level]);

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="relative overflow-hidden border-r-2 border-[rgba(223,255,0,0.12)]"
    >
      {/* Subtle scanlines overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(223,255,0,0.04) 2px, rgba(223,255,0,0.04) 3px)",
        }}
      />

      <Header />
      <Content items={data} />
      <Footer />
    </Sidebar>
  );
}
