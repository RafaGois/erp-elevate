"use client";

import { DataTable } from "@/components/layout/components/datatable/DataTable";
import FloatingMenu from "@/components/layout/components/datatable/FloatingMenu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ModalAction from "@/types/enums/modalAction";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, TrendingUp } from "lucide-react";
import { useState } from "react";
import ToolkitModal from "@/components/layout/modal/components/ToolkitModal";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Report from "@/types/models/Report";
import ReportStatus from "@/types/enums/ReportStatus";
import ConfirmDialog from "@/components/layout/modal/assistants/ConfirmDialog";
import useAppData from "@/hooks/use-app-data";
import ReportModal from "@/components/layout/modal/ReportModal";

const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

function competenciaLabel(competencia?: string) {
  if (!competencia) return "-";
  const [year, month] = competencia.split("-");
  const idx = Number(month) - 1;
  if (Number.isNaN(idx) || idx < 0 || idx > 11) return competencia;
  return `${MESES[idx]} de ${year}`;
}

export default function ReportsPage() {
  const [selectedObject, setSelectedObject] = useState<Report | null>(null);
  const [action, setAction] = useState<ModalAction | null>(null);
  const { setReloading } = useAppData();

  const columns: ColumnDef<Report>[] = [
    {
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Relatório
          <ArrowUpDown />
        </Button>
      ),
      accessorKey: "name",
      cell: ({ row }) => {
        const { name, slug } = row.original;
        return (
          <div className="flex flex-col gap-0.5">
            <span className="font-medium">{name}</span>
            {slug && <span className="font-mono text-xs text-muted-foreground">/{slug}</span>}
          </div>
        );
      },
    },
    {
      header: "Cliente",
      accessorKey: "client",
      cell: ({ row }) =>
        row.original.client ? (
          <span className="text-sm">{row.original.client}</span>
        ) : (
          <span className="text-muted-foreground">-</span>
        ),
    },
    {
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Competência
          <ArrowUpDown />
        </Button>
      ),
      accessorKey: "competencia",
      cell: ({ row }) => (
        <span className="text-sm">{competenciaLabel(row.original.competencia)}</span>
      ),
    },
    {
      header: "Métricas",
      accessorKey: "dados",
      cell: ({ row }) => {
        const d = row.original.dados;
        const views = d?.alcanceEVisualizacoes?.visualizacoesMensais ?? 0;
        const novos = d?.perfil?.novosSeguidores ?? 0;
        if (views <= 0 && novos === 0) {
          return <span className="text-xs text-muted-foreground">A preencher</span>;
        }
        return (
          <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
            {views > 0 && (
              <span className="flex items-center gap-1">
                <Eye className="size-3" /> {views.toLocaleString("pt-BR")} views
              </span>
            )}
            {novos !== 0 && (
              <span className="flex items-center gap-1">
                <TrendingUp className="size-3" /> {novos > 0 ? "+" : ""}
                {novos.toLocaleString("pt-BR")} seguidores
              </span>
            )}
          </div>
        );
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status;
        if (!status) return <span className="text-muted-foreground">-</span>;
        return (
          <Badge variant={status === ReportStatus.PUBLICADO ? "default" : "outline"} className="text-xs">
            {status === ReportStatus.PUBLICADO ? "Publicado" : "Rascunho"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "Opções",
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original;
        return (
          <FloatingMenu<Report>
            selectedObject={item}
            setSelectedObject={setSelectedObject}
            setAction={setAction}
            viewUrl={item.slug ? `/relatorio/${item.slug}` : undefined}
            viewLabel="Ver relatório"
            showFinish={false}
          />
        );
      },
    },
  ];

  const { data, refetch } = useQuery<Report[]>({
    queryKey: ["data_reports"],
    refetchInterval: 60000,
    staleTime: Infinity,
    refetchOnMount: "always",
    queryFn: async () => {
      try {
        const res = await api.get("/reports");
        return res.data;
      } catch {
        return [];
      }
    },
  });

  async function remove(uid: string) {
    setReloading?.(true);
    await api.delete(`/reports/${uid}`);
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={data ?? []}
        setAction={setAction}
        setSelectedObject={setSelectedObject}
      />
      <ToolkitModal
        action={action}
        setAction={setAction}
        selectedObject={selectedObject}
        setSelectedObject={setSelectedObject}
        refetch={refetch}
        ordidaryModal={<ReportModal />}
        confirmModal={<ConfirmDialog remove={remove} refetch={refetch} />}
      />
    </>
  );
}
