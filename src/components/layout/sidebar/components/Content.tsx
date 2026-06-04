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
    <SidebarContent className="px-2 gap-0 scrollbar-hide">
      {props.items.map((item) => (
        <SidebarGroup key={item.title} className="px-0 py-2">
          <SidebarGroupLabel className="px-2 mb-1 h-5 flex items-center gap-1.5 font-pixel text-[7px] uppercase tracking-[0.15em] text-muted-foreground/70">
            <span className="text-[#dfff00] opacity-80">//</span>
            {item.title}
          </SidebarGroupLabel>

          <SidebarMenu>
            <SidebarGroupContent>
              {item.items?.map((navItem) => {
                const collapsibleContentId = `sidebar-collapsible-${toDomId(
                  `${navItem.url}-${navItem.title}`
                )}`;

                return (
                  <Collapsible
                    key={navItem.url + "-" + navItem.title}
                    asChild
                    open={navItem.isActive}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem onClick={() => !open && setOpen(true)}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={navItem.title}
                          aria-controls={collapsibleContentId}
                          className="rounded-none h-9 px-3 gap-2.5
                                     group-data-[state=open]/collapsible:bg-[rgba(223,255,0,0.08)]
                                     group-data-[state=open]/collapsible:text-[#dfff00]
                                     group-data-[state=open]/collapsible:border-l-2
                                     group-data-[state=open]/collapsible:border-[#dfff00]"
                        >
                          {navItem.icon && (
                            <navItem.icon className="h-4 w-4 shrink-0" />
                          )}
                          <span className="text-[11px] font-medium tracking-wide">
                            {navItem.title}
                          </span>
                          <ChevronRight className="ml-auto h-3.5 w-3.5 shrink-0 opacity-60 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-data-[state=open]/collapsible:opacity-100 group-data-[state=open]/collapsible:text-[#dfff00]" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      <CollapsibleContent id={collapsibleContentId}>
                        <SidebarMenuSub
                          className="ml-5 mr-0 pl-0 border-l-2 border-[rgba(223,255,0,0.2)] py-0.5"
                        >
                          {navItem.items?.map((subItem) => (
                            <SidebarMenuSubItem
                              key={
                                navItem.url +
                                "-" +
                                subItem.url +
                                "-" +
                                subItem.title
                              }
                              onClick={() => setOpen(false)}
                            >
                              <SidebarMenuSubButton
                                asChild
                                className="rounded-none h-7 pl-3 font-mono text-[10px] tracking-wide
                                           hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                              >
                                <Link href={navItem.url + subItem.url}>
                                  {subItem.title}
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
