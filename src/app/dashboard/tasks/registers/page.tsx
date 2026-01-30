"use client";

import { DataTable } from "@/components/layout/components/datatable/DataTable";
import FloatingMenu from "@/components/layout/components/datatable/FloatingMenu";
import { Button } from "@/components/ui/button";
import ModalAction from "@/lib/enums/modalAction";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Circle } from "lucide-react";
import { useMemo, useState } from "react";
import ToolkitModal from "@/components/layout/modal/components/ToolkitModal";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Task from "@/lib/models/task/Task";
import ConfirmDialog from "@/components/layout/modal/assistants/ConfirmDialog";
import useAppData from "@/data/hooks/useAppData";
import TaskModal from "@/components/layout/modal/TaskModal";
import Status from "@/lib/models/task/Status";
import { useForm, useWatch } from "react-hook-form";
import { endOfDay, startOfDay, subDays, addDays } from "date-fns";

export default function Tasks() {
  const [selectedObject, setSelectedObject] = useState<Task | null>(null);
  const [action, setAction] = useState<ModalAction | null>(null);
  const { setReloading } = useAppData();

  const form = useForm({
    defaultValues: {
      ranges: {
        from: subDays(new Date(), 30),
        to: addDays(new Date(), 90),
      },
      select: "all",
    },
  });

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
        return returnStatusFormated(item?.Status);
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
        return (
          <span>
            {item?.deadline
              ? new Date(item.deadline).toLocaleDateString()
              : "-"}
          </span>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Criação",
      accessorFn: (row) => row?.createdAt ?? "-",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <span>
            {item?.createdAt
              ? new Date(item.createdAt).toLocaleDateString()
              : "-"}
          </span>
        );
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

  function returnStatusFormated(status: Status) {
    if (status.level == 1)
      return (
        <p className="flex items-center gap-1">
          <Circle fill="#a31818" stroke="#a31818" className="w-3 h-3" />{" "}
          {status.name}{" "}
        </p>
      );
    if (status.level == 2)
      return (
        <p className="flex items-center gap-1">
          <Circle fill="#a31818" stroke="#a31818" className="w-3 h-3" />
          {status.name}{" "}
        </p>
      );
    if (status.level == 3)
      return (
        <p className="flex items-center gap-1">
          <Circle fill="#fcba03" stroke="#fcba03" className="w-3 h-3" />
          {status.name}{" "}
        </p>
      );
  }

  const { data, /* isLoading, isFetching, */ refetch } = useQuery<Task[]>({
    queryKey: ["data_tasks"],
    refetchInterval: 60000,
    staleTime: Infinity,
    refetchOnMount: "always",
    queryFn: async () => {
      try {
        const res = await axios.get(`https://elevatepromedia.com/api/tasks`);
        return res.data;
      } catch (err) {
        return [];
      }
    },
  });

  const params = useWatch({ control: form.control });

  const filteredData = useMemo(() => {
    const selectedStatus = params?.select ?? "all";
    const from = params?.ranges?.from
      ? startOfDay(new Date(params.ranges.from))
      : undefined;
    const toBase = params?.ranges?.to ?? params?.ranges?.from;
    const to = toBase ? endOfDay(new Date(toBase)) : undefined;

    return (data ?? []).filter((item) => {
      if (selectedStatus !== "all" && item?.Status?.id !== selectedStatus) {
        return false;
      }

      if (!from && !to) return true;

      const itemDate = item?.deadline ? new Date(item.deadline) : undefined;
      if (!itemDate || Number.isNaN(itemDate.getTime())) return false;

      if (from && itemDate < from) return false;
      if (to && itemDate > to) return false;

      return true;
    });
    
  }, [data, params?.select, params?.ranges?.from, params?.ranges?.to]);

  

  const { data: statuses } = useQuery<Status[]>({
    queryKey: ["data_task_statuses"],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `https://elevatepromedia.com/api/task-statuses`
        );
        return res.data;
      } catch (err) {
        return [];
      }
    },
  });

  async function remove(uid: string) {
    setReloading?.(true);
    await axios.delete(`https://elevatepromedia.com/api/tasks/${uid}`);
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={filteredData ?? []}
        setAction={setAction}
        form={form}
        options={[
          { id: "all", name: "Todos" },
          ...(statuses ?? []).map((status) => ({
            id: status.id,
            name: status.name,
          })),
        ]}
      />
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
