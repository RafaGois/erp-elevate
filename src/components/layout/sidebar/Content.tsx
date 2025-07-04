"use client";

import { ChevronDown, ChevronRight, type LucideIcon } from "lucide-react";

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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SidebarItem {
  title: string;
  url: string;
  items?: SidebarSubItem[];
}

interface SidebarSubItem {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  items?: SidebarSubSubItem[];
}

interface SidebarSubSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
}

interface ContentProps {
  items: SidebarItem[];
}

export default function Content(props: ContentProps) {
  const { open, setOpen } = useSidebar();

  return (
    <SidebarContent>
      {props.items.map((item) => (
        <SidebarGroup key={item.title}>
          <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarGroupContent>
              {item.items?.map((item) => (
                <Collapsible
                  //onOpenChange={() => handleToggle(item.url)}
                  key={item.url}
                  asChild
                  open={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem onClick={() => !open && setOpen(true)}>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>

                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem
                            key={subItem.title}
                            onClick={() => setOpen(false)}
                          >
                            <SidebarMenuSubButton asChild>
                              <Link href={item.url + subItem.url}>
                                <small>{subItem.title}</small>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarGroupContent>
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </SidebarContent>
  );
}
