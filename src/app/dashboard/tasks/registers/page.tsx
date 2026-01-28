"use client";

import { DataTable } from "@/components/layout/components/datatable/DataTable";
import FloatingMenu from "@/components/layout/components/datatable/FloatingMenu";
import { Button } from "@/components/ui/button";
import ModalAction from "@/lib/enums/modalAction";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import ToolkitModal from "@/components/layout/modal/components/ToolkitModal";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Task from "@/lib/models/task/Task";
import ConfirmDialog from "@/components/layout/modal/assistants/ConfirmDialog";
import useAppData from "@/data/hooks/useAppData";
import TaskModal from "@/components/layout/modal/TaskModal";

export default function Tasks() {
  const [selectedObject, setSelectedObject] = useState<Task | null>(null);
  const [action, setAction] = useState<ModalAction | null>(null);
  const { setReloading } = useAppData();

  const columns: ColumnDef<Task>[] = [
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
      accessorKey: "project",
      header: "Projeto",
      accessorFn: (row) => row?.Project?.name ?? "-",
      cell: ({ row }) => {
        const item = row.original;
        return <span>{item?.Project?.name ?? "-"}</span>;
      },
    },
    {
      accessorKey: "type",
      header: "Tipo",
      accessorFn: (row) => row?.Type?.name ?? "-",
      cell: ({ row }) => {
        const item = row.original;
        return <span>{item?.Type?.name ?? "-"}</span>;
      },
    },
    {
      accessorKey: "priority",
      header: "Prioridade",
      accessorFn: (row) => row?.Priority?.name ?? "-",
      cell: ({ row }) => {
        const item = row.original;
        return <span>{item?.Priority?.name ?? "-"}</span>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      accessorFn: (row) => row?.Status?.name ?? "-",
      cell: ({ row }) => {
        const item = row.original;
        return <span>{item?.Status?.name ?? "-"}</span>;
      },
    },
    {
      accessorKey: "responsible",
      header: "Responsável",
      accessorFn: (row) => row?.Responsible?.name ?? "-",
      cell: ({ row }) => {
        const item = row.original;
        return <span>{item?.Responsible?.name ?? "-"}</span>;
      },
    },
    {
      accessorKey: "deadline",
      header: "Prazo",
      accessorFn: (row) => row?.deadline ?? "-",
      cell: ({ row }) => {
        const item = row.original;
        return <span>{item?.deadline ? new Date(item.deadline).toLocaleDateString() : "-"}</span>;
      },
    },
    {
      accessorKey: "createdAt",
      header: "Criação",
      accessorFn: (row) => row?.createdAt ?? "-",
      cell: ({ row }) => {
        const item = row.original;
        return <span>{item?.createdAt ? new Date(item.createdAt).toLocaleDateString() : "-"}</span>;
      },
    },
    {
      accessorKey: "Opções",
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original;
        return (
          <FloatingMenu<Task>
            selectedObject={item}
            setSelectedObject={setSelectedObject}
            setAction={setAction}
          />
        );
      },
    },
  ];

  const { data, /* isLoading, isFetching, */ refetch } = useQuery<Task[]>({
    queryKey: ["data_tasks"],
    refetchInterval: 60000,
    staleTime: Infinity,
    refetchOnMount: "always",
    queryFn: async () => {
      try {
        const res = await axios.get(
          `https://elevatepromedia.com/api/tasks`,
        );
        return res.data;
      } catch (err) {
        return [];
      }
    },
  });

  async function remove(uid: string) {
    setReloading?.(true);
    await axios.delete(
      `https://elevatepromedia.com/api/tasks/${uid}`,
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
        ordidaryModal={<TaskModal />}
        confirmModal={<ConfirmDialog remove={remove} refetch={refetch} />}
      />
    </>
  );
}
