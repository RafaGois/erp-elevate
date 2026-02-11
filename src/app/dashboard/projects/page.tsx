"use client";

import { DataTable } from "@/components/layout/components/datatable/DataTable";
import FloatingMenu from "@/components/layout/components/datatable/FloatingMenu";
import { Button } from "@/components/ui/button";
import ModalAction from "@/lib/enums/modalAction";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import ToolkitModal from "@/components/layout/modal/components/ToolkitModal";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Project from "@/lib/models/Project";
import ConfirmDialog from "@/components/layout/modal/assistants/ConfirmDialog";
import useAppData from "@/data/hooks/useAppData";
import ProjectModal from "@/components/layout/modal/ProjectModal";

export default function Projects() {
  const [selectedObject, setSelectedObject] = useState<Project | null>(null);
  const [action, setAction] = useState<ModalAction | null>(null);
  const { setReloading } = useAppData();

  const columns: ColumnDef<Project>[] = [
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nome
            <ArrowUpDown />
          </Button>
        );
      },
      accessorKey: "name",
    },
    {
      accessorKey: "active",
      accessorFn: (row) => row?.active ?? "-",
      cell: ({ row }) => {
        const item = row.original;
        return <span>{item?.active ? "Ativo" : "Inativo"}</span>;
      },
    },
    {
      accessorKey: "Opções",
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original;
        return (
          <FloatingMenu<Project>
            selectedObject={item}
            setSelectedObject={setSelectedObject}
            setAction={setAction}
          />
        );
      },
    },
  ];

  const { data, /* isLoading, isFetching, */ refetch } = useQuery<Project[]>({
    queryKey: ["data_projects"],
    refetchInterval: 60000,
    staleTime: Infinity,
    refetchOnMount: "always",
    queryFn: async () => {
      try {
        const res = await api.get(
          `/projects`,
        );
        return res.data;
      } catch (err) {
        return [];
      }
    },
  });

  async function remove(uid: string) {
    setReloading?.(true);
    await api.delete(
      `/projects/${uid}`,
    );
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
        ordidaryModal={<ProjectModal />}
        confirmModal={<ConfirmDialog remove={remove} refetch={refetch} />}
      />
    </>
  );
}
