"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import useAppData from "@/data/hooks/useAppData";
import useAuth from "@/data/hooks/useAuth";

export default function Content({
  items,
}: {
  items: {
    title: string;
    icon?: LucideIcon;
    url: string;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
      icon: LucideIcon
    }[];
  }[];
}) {
  const { selectedMenuTab, changeSelectedMenuTab } = useAppData();
  const { open, setOpen} = useSidebar();

  const { user } = useAuth()  

  const handleToggle = (title: string) => {
    if (selectedMenuTab == title) {
      if(open) changeSelectedMenuTab?.(title);
    } else {
      changeSelectedMenuTab?.(title);
    }
  };

  return (
    <SidebarContent>
      {items.map((item: any) => (
        <SidebarGroup key={item.title}>
        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {item.items.map((item: any) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={item.isActive}>
                  <Link href={item.url}>{item.title}</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      ))}
      
    </SidebarContent>
  );
}
