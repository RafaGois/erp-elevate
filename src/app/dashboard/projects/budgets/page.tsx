"use client";

import { DataTable } from "@/components/layout/components/datatable/DataTable";
import FloatingMenu from "@/components/layout/components/datatable/FloatingMenu";
import { Button } from "@/components/ui/button";
import ModalAction from "@/lib/enums/modalAction";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ExternalLink } from "lucide-react";
import { useState } from "react";
import ToolkitModal from "@/components/layout/modal/components/ToolkitModal";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Budget from "@/lib/models/Budget";
import ConfirmDialog from "@/components/layout/modal/assistants/ConfirmDialog";
import useAppData from "@/data/hooks/useAppData";
import BudgetModal from "@/components/layout/modal/BudgetModal";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function BudgetsPage() {
  const [selectedObject, setSelectedObject] = useState<Budget | null>(null);
  const [action, setAction] = useState<ModalAction | null>(null);
  const { setReloading } = useAppData();

  const columns: ColumnDef<Budget>[] = [
    {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown />
        </Button>
      ),
      accessorKey: "name",
      cell: ({ row }) => {
        const { name, slug } = row.original;
        return (
          <div className="flex flex-col gap-0.5">
            <span className="font-medium">{name}</span>
            {slug && (
              <span className="text-xs text-muted-foreground font-mono">/{slug}</span>
            )}
          </div>
        );
      },
    },
    {
      header: "Cliente",
      accessorKey: "client",
      cell: ({ row }) => {
        const { client, project } = row.original;
        if (!client && !project) return <span className="text-muted-foreground">-</span>;
        return (
          <div className="flex flex-col gap-0.5">
            {client && <span className="text-sm">{client}</span>}
            {project && <span className="text-xs text-muted-foreground">{project}</span>}
          </div>
        );
      },
    },
    {
      header: "Descrição",
      accessorKey: "description",
      cell: ({ row }) => {
        const desc = row.original?.description;
        return (
          <span className="max-w-[200px] truncate block text-sm" title={desc ?? undefined}>
            {desc ?? <span className="text-muted-foreground">-</span>}
          </span>
        );
      },
    },
    {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Valor
          <ArrowUpDown />
        </Button>
      ),
      accessorKey: "value",
      cell: ({ row }) => {
        const value = row.original?.value;
        return (
          <span className="font-mono font-medium">
            {typeof value === "number"
              ? new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(value)
              : "-"}
          </span>
        );
      },
    },
    {
      header: "Proposta",
      accessorKey: "slug",
      cell: ({ row }) => {
        const { slug } = row.original;
        if (!slug) {
          return <Badge variant="outline" className="text-muted-foreground text-xs">Sem slug</Badge>;
        }
        return (
          <Link
            href={`/orcamento/${slug}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-medium"
          >
            Ver proposta
            <ExternalLink className="h-3 w-3" />
          </Link>
        );
      },
    },
    {
      header: "Criado em",
      accessorKey: "createdAt",
      cell: ({ row }) => {
        const date = row.original?.createdAt;
        if (!date) return "-";
        try {
          return (
            <span className="text-sm text-muted-foreground">
              {format(new Date(date), "dd/MM/yyyy HH:mm", { locale: ptBR })}
            </span>
          );
        } catch {
          return "-";
        }
      },
    },
    {
      accessorKey: "Opções",
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original;
        return (
          <FloatingMenu<Budget>
            selectedObject={item}
            setSelectedObject={setSelectedObject}
            setAction={setAction}
            viewUrl={item.slug ? `/orcamento/${item.slug}` : undefined}
          />
        );
      },
    },
  ];

  const { data, refetch } = useQuery<Budget[]>({
    queryKey: ["data_budgets"],
    refetchInterval: 60000,
    staleTime: Infinity,
    refetchOnMount: "always",
    queryFn: async () => {
      try {
        const res = await api.get("/budgets");
        return res.data;
      } catch {
        return [];
      }
    },
  });

  async function remove(uid: string) {
    setReloading?.(true);
    await api.delete(`/budgets/${uid}`);
  }

  return (
    <>
      <DataTable columns={columns} data={data ?? []} setAction={setAction} />
      <ToolkitModal
        action={action}
        setAction={setAction}
        selectedObject={selectedObject}
        setSelectedObject={setSelectedObject}
        refetch={refetch}
        ordidaryModal={<BudgetModal />}
        confirmModal={<ConfirmDialog remove={remove} refetch={refetch} />}
      />
    </>
  );
}
