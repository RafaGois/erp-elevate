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
import Priority from "@/lib/models/task/Priority";
import ConfirmDialog from "@/components/layout/modal/assistants/ConfirmDialog";
import useAppData from "@/data/hooks/useAppData";
import TaskPriorityModal from "@/components/layout/modal/TaskPriorityModal";

export default function TaskPriorities() {
  const [selectedObject, setSelectedObject] = useState<Priority | null>(null);
  const [action, setAction] = useState<ModalAction | null>(null);
  const { setReloading } = useAppData();

  const columns: ColumnDef<Priority>[] = [
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
      accessorKey: "level",
      accessorFn: (row) => row?.level ?? "-",
      cell: ({ row }) => {
        const item = row.original;
        return <span>{item?.level ? item.level == 1 ? "Baixa" : item.level == 2 ? "Média" : "Alta" : "-"}</span>;
      },
    },
    {
      accessorKey: "Opções",
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original;
        return (
          <FloatingMenu<Priority>
            selectedObject={item}
            setSelectedObject={setSelectedObject}
            setAction={setAction}
          />
        );
      },
    },
  ];

  const { data, /* isLoading, isFetching, */ refetch } = useQuery<Priority[]>({
    queryKey: ["data_task_priorities"],
    refetchInterval: 60000,
    staleTime: Infinity,
    refetchOnMount: "always",
    queryFn: async () => {
      try {
        const res = await api.get(
          `/task-priorities`,
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
      `/task-priorities/${uid}`,
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
        ordidaryModal={<TaskPriorityModal />}
        confirmModal={<ConfirmDialog remove={remove} refetch={refetch} />}
      />
    </>
  );
}
