"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

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
} from "../../../ui/sidebar";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../ui/collapsible";

interface SidebarItem {
  title: string;
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

  function toDomId(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  return (
    <SidebarContent>
      {props.items.map((item) => (
        <SidebarGroup key={item.title}>
          <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarGroupContent>
              {item.items?.map((item) => {
                const collapsibleContentId = `sidebar-collapsible-${toDomId(
                  `${item.url}-${item.title}`
                )}`;

                return (
                <Collapsible
                  key={item.url + "-" + item.title}
                  asChild
                  open={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem onClick={() => !open && setOpen(true)}>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        aria-controls={collapsibleContentId}
                      >
                        {item.icon && <item.icon />}
                        <span className="text-[12px]">{item.title}</span>

                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent id={collapsibleContentId}>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem
                            key={
                              item.url + "-" + subItem.url + "-" + subItem.title
                            }
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
                );
              })}
            </SidebarGroupContent>
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </SidebarContent>
  );
}
