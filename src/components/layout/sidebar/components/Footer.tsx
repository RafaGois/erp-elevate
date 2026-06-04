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
import { ChevronsUpDown, LogOut, Moon, Sun, User } from "lucide-react";
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

  return (
    <SidebarFooter className="p-3 border-t-2 border-[rgba(223,255,0,0.15)]">
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="rounded-none h-11 gap-3 px-2 cursor-pointer
                           hover:bg-[rgba(223,255,0,0.08)]
                           data-[state=open]:bg-[rgba(223,255,0,0.08)]"
              >
                <Avatar
                  className="h-7 w-7 rounded-none shrink-0"
                  style={{
                    border: "2px solid #dfff00",
                    boxShadow: "2px 2px 0 rgba(223,255,0,0.35)",
                  }}
                >
                  <AvatarFallback className="rounded-none bg-[#dfff00] text-black font-pixel text-[7px]">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate text-[11px] font-medium font-mono text-sidebar-foreground">
                    {user?.name}
                  </span>
                  <span className="truncate text-[9px] font-mono uppercase tracking-wider text-muted-foreground">
                    {user?.username}
                  </span>
                </div>

                <ChevronsUpDown className="ml-auto h-3.5 w-3.5 shrink-0 opacity-40" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-52 rounded-none border-2 border-foreground p-0 overflow-hidden"
              style={{ boxShadow: "4px 4px 0 oklch(0.145 0 0)" }}
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              {/* Card-chrome header */}
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center justify-between gap-2 px-3 py-2 bg-[#dfff00]">
                  <div className="flex items-center gap-2 min-w-0">
                    <Avatar className="h-6 w-6 rounded-none shrink-0" style={{ border: "1.5px solid rgba(0,0,0,0.3)" }}>
                      <AvatarFallback className="rounded-none bg-[#dfff00] text-black font-pixel text-[6px]">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid leading-tight min-w-0">
                      <span className="truncate font-pixel text-[8px] text-black font-bold">
                        {user?.name}
                      </span>
                      <span className="truncate font-mono text-[8px] text-black/60 uppercase tracking-wide">
                        {user?.username}
                      </span>
                    </div>
                  </div>
                  {/* Window chrome dots */}
                  <div className="flex gap-0.5 shrink-0">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className={`h-2.5 w-2.5 rounded-[1px] border border-black/25 ${
                          i === 2 ? "bg-red-400" : "bg-white/90"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator className="my-0" />

              <DropdownMenuGroup>
                <DropdownMenuItem className="rounded-none h-8 gap-2 font-mono text-[11px] cursor-pointer px-3">
                  <Link href="/User" className="flex items-center gap-2 w-full">
                    <User size={13} />
                    Conta
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="my-0" />

              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="rounded-none h-8 gap-2 font-mono text-[11px] cursor-pointer px-3"
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
                className="rounded-none h-8 gap-2 font-mono text-[11px] cursor-pointer px-3 text-red-500 focus:text-red-500 focus:bg-red-500/10"
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
