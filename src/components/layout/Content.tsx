"use client";

import useAppData from "../../data/hooks/useAppData";

//import LoadingLayout from "@/components/screens/loading/LoadingLayout";
import { useEffect } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

import useAuth from "@/data/hooks/useAuth";

export default function Content(props: any) {
  const { reloading } = useAppData();
  const { loading: loadingAuth } = useAuth();

  useEffect(() => {
    if (reloading || loadingAuth) {
      toast("Atualizando dados", {
        description: "Aguarde enquanto os dados são carregados.",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    } else {
      toast.dismiss();
    }
  }, [reloading, loadingAuth]);

  return (
    <div className="flex flex-col flex-1">
      props.children 
      <Toaster />
    </div>
  );
}
