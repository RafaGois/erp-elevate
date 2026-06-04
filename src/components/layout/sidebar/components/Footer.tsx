"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import useAuth from "@/data/hooks/useAuth";
import {
  ChevronsUpDown,
  LogOut,
  Moon,
  Sun,
  User,
  User2Icon,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function Footer() {
  const { user, logout } = useAuth();
  const { isMobile } = useSidebar();
  const { theme, setTheme } = useTheme();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "EU";

  const accountLabel = user?.name ?? "Conta";

  return (
    <SidebarFooter className="border-t-2 border-[rgba(223,255,0,0.15)] p-3 group-data-[collapsible=icon]:px-1.5 group-data-[collapsible=icon]:py-2">
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                tooltip={accountLabel}
                className="h-11 cursor-pointer gap-3 rounded-none px-2 hover:bg-[rgba(223,255,0,0.08)] data-[state=open]:bg-[rgba(223,255,0,0.08)] group-data-[collapsible=icon]:size-10! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-1!"
              >
                <Avatar
                  className="h-7 w-7 shrink-0 rounded-none group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8"
                  style={{
                    border: "2px solid #dfff00",
                    boxShadow: "2px 2px 0 rgba(223,255,0,0.35)",
                  }}
                >
                  <AvatarFallback className="rounded-none bg-[#dfff00] font-pixel text-[7px] text-black group-data-[collapsible=icon]:text-[6px]">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div className="grid min-w-0 flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
                  <span className="truncate font-mono text-[11px] font-medium text-sidebar-foreground">
                    {user?.name}
                  </span>
                  <span className="truncate font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                    {user?.username}
                  </span>
                </div>

                <ChevronsUpDown className="ml-auto h-3.5 w-3.5 shrink-0 opacity-40 group-data-[collapsible=icon]:hidden" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-52 overflow-hidden rounded-none border-2 border-foreground p-0"
              style={{ boxShadow: "4px 4px 0 oklch(0.145 0 0)" }}
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg">
                      <User2Icon size={16} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.name}</span>
                    <span className="truncate text-xs">{user?.username}</span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem className="h-8 cursor-pointer gap-2 rounded-none px-3 font-mono text-[11px]">
                  <Link href="/User" className="flex w-full items-center gap-2">
                    <User size={13} />
                    Conta
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="my-0" />

              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="h-8 cursor-pointer gap-2 rounded-none px-3 font-mono text-[11px]"
                  onClick={() =>
                    setTheme(theme === "light" ? "dark" : "light")
                  }
                >
                  {theme === "light" ? <Moon size={13} /> : <Sun size={13} />}
                  Tema
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="my-0" />

              <DropdownMenuItem
                className="h-8 cursor-pointer gap-2 rounded-none px-3 font-mono text-[11px] text-red-500 focus:bg-red-500/10 focus:text-red-500"
                onClick={logout}
              >
                <LogOut size={13} />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
