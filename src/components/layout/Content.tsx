"use client";

import useAppData from "@/hooks/use-app-data";

import { useEffect } from "react";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";

import useAuth from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import "@/styles/dashboard-content.css";

export default function Content(props: { children: React.ReactNode }) {
  const { reloading } = useAppData();
  const { loading: loadingAuth } = useAuth();

  useEffect(() => {
    if (reloading || loadingAuth) {
      toast("Carregando...", {
        description: "Aguarde enquanto os dados são carregados.",
      });
    } else {
      toast.dismiss();
    }
  }, [reloading, loadingAuth]);

  return (
    <div className={cn("dashboard-content flex flex-col p-4 @container/main")}>
      {props.children}
      <Toaster />
    </div>
  );
}
